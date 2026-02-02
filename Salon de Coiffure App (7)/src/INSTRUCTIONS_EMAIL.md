# 📧 Instructions pour activer l'envoi automatique d'emails

## ✅ Statut actuel

Le code a été modifié pour appeler l'Edge Function Supabase. Il reste 3 petites modifications à faire dans `/App.tsx` aux lignes 699-713.

## 🔧 Modifications à faire dans /App.tsx

### Remplacer les lignes 699-713 par :

```typescript
      } else {
        console.log("✅ Email envoyé avec succès!", data);
        toast.success(
          "Merci pour votre demande ! 💇‍♀️\n\nNous vous contacterons très bientôt.\n\nPour une assistance immédiate:\n📞 240 781 8109",
          { duration: 6000 }
        );
      }
      
      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("❌ Erreur:", error);
      toast.error("Veuillez nous contacter directement:\n📞 240 781 8109\n📧 terastyle1@gmail.com");
```

## 📋 Étapes pour déployer l'Edge Function

### 1. Installer Supabase CLI

```bash
npm install -g supabase
```

### 2. Se connecter à Supabase

```bash
supabase login
supabase link --project-ref nsbbcxbuzzpkeztcizow
```

### 3. Obtenir une clé API Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit
3. Dans le dashboard, allez dans "API Keys"
4. Créez une nouvelle clé API
5. Copiez la clé (elle commence par "re_")

### 4. Configurer la clé API Resend dans Supabase

```bash
supabase secrets set RESEND_API_KEY=re_votre_cle_api_resend
```

### 5. Déployer l'Edge Function

```bash
supabase functions deploy send-appointment-email
```

## 📬 Configuration de l'email d'envoi

Par défaut, l'Edge Function utilise `onboarding@resend.dev` comme adresse d'envoi. Pour utiliser votre propre domaine :

1. Dans Resend, ajoutez et vérifiez votre domaine
2. Modifiez la ligne 237 de `/supabase/functions/send-appointment-email/index.ts` :

```typescript
from: "Emanuella Beauty Empire <noreply@votredomaine.com>",
```

## ✉️ Adresse de réception actuelle

Les emails sont envoyés à : **loicodovi@gmail.com** (ligne 238 de l'Edge Function)

Pour changer l'adresse de réception, modifiez la ligne 238 :

```typescript
to: ["nouvelle@adresse.com"],
```

## 🧪 Tester l'envoi d'emails

1. Une fois l'Edge Function déployée avec la clé API Resend configurée
2. Allez sur votre site web
3. Remplissez le formulaire de contact
4. Soumettez le formulaire
5. Vérifiez la console pour voir les logs
6. Vérifiez loicodovi@gmail.com pour recevoir l'email

## ⚠️ Messages d'erreur

- **"La fonction d'envoi d'email n'est pas encore déployée"** : L'Edge Function n'est pas déployée ou la clé API n'est pas configurée
- **"Erreur lors de l'envoi"** : Problème avec Resend (vérifiez la clé API et les limites)

## 📞 Support

En cas de problème :
- Téléphone : 240 781 8109
- Email : terastyle1@gmail.com
- Instagram : @terastyle1
- TikTok : @emanuellabeautyempire3
