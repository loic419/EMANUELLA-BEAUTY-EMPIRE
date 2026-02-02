/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EDGE FUNCTION SUPABASE - ENVOI D'EMAIL AVEC RESEND
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Cette fonction envoie les demandes de rendez-vous par email en utilisant Resend.
 * 
 * INSTRUCTIONS DE DÉPLOIEMENT:
 * 
 * 1. Installez Supabase CLI si ce n'est pas déjà fait:
 *    npm install -g supabase
 * 
 * 2. Connectez-vous à votre projet Supabase:
 *    supabase login
 *    supabase link --project-ref nsbbcxbuzzpkeztcizow
 * 
 * 3. Créez le dossier pour les Edge Functions:
 *    mkdir -p supabase/functions/send-appointment-email
 * 
 * 4. Copiez ce code dans le fichier:
 *    supabase/functions/send-appointment-email/index.ts
 * 
 * 5. Configurez votre clé API Resend comme secret:
 *    supabase secrets set RESEND_API_KEY=re_votre_cle_api_resend
 * 
 * 6. Déployez la fonction:
 *    supabase functions deploy send-appointment-email
 * 
 * OBTENIR UNE CLÉ API RESEND:
 * - Allez sur https://resend.com
 * - Créez un compte gratuit
 * - Dans le dashboard, allez dans "API Keys"
 * - Créez une nouvelle clé API
 * - Copiez la clé (elle commence par "re_")
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

serve(async (req) => {
  // Gérer les requêtes OPTIONS (CORS preflight)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Vérifier que la clé API Resend est configurée
    if (!RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY n'est pas configurée");
      return new Response(
        JSON.stringify({
          error: "Configuration manquante",
          message: "La clé API Resend n'est pas configurée. Veuillez exécuter: supabase secrets set RESEND_API_KEY=votre_cle"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Récupérer les données de la demande
    const appointmentData: AppointmentRequest = await req.json();
    const { name, email, phone, message } = appointmentData;

    // Validation des données
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont requis" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("📧 Envoi d'email via Resend...");
    console.log(`👤 Nom: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📞 Téléphone: ${phone}`);

    // Préparer le contenu de l'email en HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #FFB6C1;
              border-top: none;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #FFF0F5;
              border-left: 4px solid #FF69B4;
              border-radius: 5px;
            }
            .field-label {
              font-weight: bold;
              color: #FF69B4;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
            }
            .footer {
              margin-top: 20px;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .icon {
              display: inline-block;
              margin-right: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>💇‍♀️ EMANUELLA BEAUTY EMPIRE</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Nouvelle demande de rendez-vous</p>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; margin-bottom: 25px;">
              Vous avez reçu une nouvelle demande de rendez-vous via votre site web.
            </p>
            
            <div class="field">
              <div class="field-label">
                <span class="icon">👤</span> Nom complet
              </div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">
                <span class="icon">📧</span> Email
              </div>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #FF69B4; text-decoration: none;">${email}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">
                <span class="icon">📞</span> Téléphone
              </div>
              <div class="field-value">
                <a href="tel:${phone}" style="color: #FF69B4; text-decoration: none;">${phone}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">
                <span class="icon">💬</span> Message
              </div>
              <div class="field-value" style="white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #FFF0F5; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #FF69B4; font-weight: bold;">
                ⏰ Répondez rapidement pour confirmer le rendez-vous !
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 5px 0;">
              📍 13833 Outlet Drive, Silver Spring, MD 20904
            </p>
            <p style="margin: 5px 0;">
              📞 240 781 8109
            </p>
            <p style="margin: 15px 0 5px 0;">
              <a href="https://www.instagram.com/terastyle1" style="color: #FF69B4; text-decoration: none; margin: 0 10px;">
                Instagram @terastyle1
              </a>
              |
              <a href="https://www.tiktok.com/@emanuellabeautyempire3" style="color: #FF69B4; text-decoration: none; margin: 0 10px;">
                TikTok @emanuellabeautyempire3
              </a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Envoyer l'email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Emanuella Beauty Empire <onboarding@resend.dev>", // Remplacez par votre email vérifié
        to: ["loicodovi@gmail.com"],
        subject: `💇‍♀️ Nouveau rendez-vous - ${name}`,
        html: htmlContent,
        reply_to: email, // Pour pouvoir répondre directement au client
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("❌ Erreur Resend:", resendData);
      return new Response(
        JSON.stringify({
          error: "Erreur lors de l'envoi de l'email",
          details: resendData,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("✅ Email envoyé avec succès via Resend!");
    console.log("📬 ID de l'email:", resendData.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email envoyé avec succès",
        emailId: resendData.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Erreur:", error);
    return new Response(
      JSON.stringify({
        error: "Erreur serveur",
        message: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
