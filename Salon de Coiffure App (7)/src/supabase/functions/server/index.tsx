import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f5588fff/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint - créer un nouvel utilisateur
app.post("/make-server-f5588fff/signup", async (c) => {
  try {
    const { email, password, name, telephone } = await c.req.json();

    // Validation des données
    if (!email || !password || !name) {
      return c.json(
        { error: "Email, mot de passe et nom sont requis" },
        400
      );
    }

    // Créer le client Supabase avec la clé de service
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const userExists = existingUser?.users?.some(u => u.email === email);
    
    if (userExists) {
      return c.json({ 
        error: "Un compte avec cet email existe déjà. Veuillez vous connecter." 
      }, 409);
    }

    // Créer l'utilisateur via l'API Admin
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: name },
      // Confirmer automatiquement l'email car aucun serveur email n'a été configuré
      email_confirm: true,
    });

    if (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      
      // Gérer les différentes erreurs possibles
      if (error.message.includes("already been registered") || error.code === "email_exists") {
        return c.json({ 
          error: "Un compte avec cet email existe déjà. Veuillez vous connecter." 
        }, 409);
      }
      
      return c.json({ error: error.message }, 400);
    }

    // Créer l'enregistrement dans la table clients
    const { error: clientError } = await supabase
      .from("clients")
      .insert({
        user_id: data.user.id,
        nom_complet: name,
        email: email,
        telephone: telephone || null,
      });

    if (clientError) {
      console.error("Erreur lors de la création du client:", clientError);
      // Ne pas bloquer l'inscription si la table clients échoue
      console.warn("L'utilisateur Auth a été créé mais pas le profil client");
    } else {
      console.log(`[SIGNUP] ✅ Profil client créé pour ${email} avec nom: ${name} et téléphone: ${telephone || 'non fourni'}`);
    }

    return c.json({ 
      success: true, 
      user: { id: data.user.id, email: data.user.email, name: name } 
    });
  } catch (error: any) {
    console.error("Erreur serveur lors de l'inscription:", error);
    return c.json({ error: error.message || "Erreur serveur" }, 500);
  }
});

// Login endpoint - connexion avec vérification de mot de passe manuelle
app.post("/make-server-f5588fff/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Validation des données
    if (!email || !password) {
      return c.json(
        { error: "Email et mot de passe sont requis" },
        400
      );
    }

    console.log(`[LOGIN] Tentative de connexion pour: ${email}`);

    // D'abord, vérifier si l'utilisateur existe
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    
    const { data: allUsers } = await adminSupabase.auth.admin.listUsers();
    const userExists = allUsers?.users?.find(u => u.email === email);
    
    if (!userExists) {
      console.log(`[LOGIN] ❌ Utilisateur non trouvé: ${email}`);
      return c.json({ 
        error: "Aucun compte trouvé avec cet email. Veuillez vous inscrire d'abord." 
      }, 404);
    }
    
    console.log(`[LOGIN] ✅ Utilisateur trouvé: ${email}, Email confirmé: ${userExists.email_confirmed_at ? 'Oui' : 'Non'}`);

    // Créer le client Supabase avec la clé publique pour la connexion normale
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    // Tenter la connexion
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(`[LOGIN] ❌ Erreur lors de la connexion pour ${email}:`, error);
      
      // Si l'erreur est due à un email non confirmé, on force la confirmation
      if (error.message.includes("Email not confirmed") || error.message.includes("not confirmed")) {
        console.log(`[LOGIN] 🔧 Email non confirmé, tentative de confirmation automatique...`);
        
        // Confirmer l'email de l'utilisateur
        await adminSupabase.auth.admin.updateUserById(userExists.id, {
          email_confirm: true,
        });
        
        console.log(`[LOGIN] ✅ Email confirmé, nouvelle tentative de connexion...`);
        
        // Réessayer la connexion
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (retryError) {
          console.error(`[LOGIN] ❌ Échec après confirmation d'email:`, retryError);
          return c.json({ 
            error: "Mot de passe incorrect. Veuillez réessayer ou créer un nouveau compte." 
          }, 400);
        }
        
        console.log(`[LOGIN] ✅ Connexion réussie après confirmation d'email`);
        
        return c.json({
          success: true,
          session: retryData.session,
          user: {
            id: retryData.user.id,
            email: retryData.user.email,
            name: retryData.user.user_metadata?.name,
          },
        });
      }
      
      // Message d'erreur plus clair
      if (error.message.includes("Invalid login credentials")) {
        console.log(`[LOGIN] ❌ Identifiants invalides pour ${email}`);
        return c.json({ 
          error: "Mot de passe incorrect. Vérifiez votre mot de passe ou créez un nouveau compte avec un autre email." 
        }, 400);
      }
      
      return c.json({ error: error.message }, 400);
    }

    console.log(`[LOGIN] ✅ Connexion réussie pour ${email}`);

    return c.json({
      success: true,
      session: data.session,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
    });
  } catch (error: any) {
    console.error("Erreur serveur lors de la connexion:", error);
    return c.json({ error: error.message || "Erreur serveur" }, 500);
  }
});

// DEBUG endpoint - lister les utilisateurs (À SUPPRIMER EN PRODUCTION!)
app.get("/make-server-f5588fff/debug-users", async (c) => {
  try {
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    
    const { data: users } = await adminSupabase.auth.admin.listUsers();
    
    // Ne retourner que les infos essentielles pour debug
    const usersList = users?.users?.map(u => ({
      id: u.id,
      email: u.email,
      email_confirmed: u.email_confirmed_at ? true : false,
      created_at: u.created_at,
      name: u.user_metadata?.name,
    })) || [];
    
    return c.json({ users: usersList, count: usersList.length });
  } catch (error: any) {
    console.error("Erreur lors du debug:", error);
    return c.json({ error: error.message }, 500);
  }
});

// DEBUG endpoint - Réinitialiser le mot de passe d'un utilisateur (À SUPPRIMER EN PRODUCTION!)
app.post("/make-server-f5588fff/reset-password", async (c) => {
  try {
    const { email, new_password } = await c.req.json();
    
    if (!email || !new_password) {
      return c.json({ error: "Email et nouveau mot de passe requis" }, 400);
    }
    
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    
    // Trouver l'utilisateur
    const { data: users } = await adminSupabase.auth.admin.listUsers();
    const user = users?.users?.find(u => u.email === email);
    
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Mettre à jour le mot de passe
    const { error } = await adminSupabase.auth.admin.updateUserById(user.id, {
      password: new_password,
      email_confirm: true,
    });
    
    if (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      return c.json({ error: error.message }, 400);
    }
    
    console.log(`[RESET] ✅ Mot de passe réinitialisé pour ${email}`);
    
    return c.json({ 
      success: true, 
      message: "Mot de passe réinitialisé avec succès" 
    });
  } catch (error: any) {
    console.error("Erreur lors de la réinitialisation:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);