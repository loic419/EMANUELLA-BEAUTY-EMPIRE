#!/usr/bin/env python3
"""
Script pour corriger les messages du formulaire de contact dans App.tsx
"""

def fix_app_tsx():
    # Lire le fichier
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remplacement 1: Message de succès en anglais -> français
    content = content.replace(
        '"Thank you for your interest! We will contact you soon. 💇‍♀️\\n\\nFor immediate assistance:\\n📞 240 781 8109"',
        '"Merci pour votre demande ! 💇‍♀️\\n\\nNous vous contacterons très bientôt.\\n\\nPour une assistance immédiate:\\n📞 240 781 8109"'
    )
    
    # Remplacement 2: Message d'erreur en anglais -> français
    content = content.replace(
        '"Please contact us directly at:\\n📞 240 781 8109\\n📧 terastyle1@gmail.com"',
        '"Veuillez nous contacter directement:\\n📞 240 781 8109\\n📧 terastyle1@gmail.com"'
    )
    
    # Remplacement 3: Console error message
    content = content.replace(
        'console.error("Error submitting form:", error);',
        'console.error("❌ Erreur:", error);'
    )
    
    # Remplacement 4: Comment "Reset form" -> "Réinitialiser le formulaire"
    content = content.replace(
        '      // Reset form\n      setFormData({',
        '      // Réinitialiser le formulaire\n      setFormData({'
    )
    
    # Remplacement 5: Corriger l'indentation et ajouter la fermeture du bloc else
    old_block = '''        console.log("✅ Email envoyé avec succès!", data);
        toast.success(
        "Merci pour votre demande ! 💇‍♀️\\n\\nNous vous contacterons très bientôt.\\n\\nPour une assistance immédiate:\\n📞 240 781 8109",
        { duration: 6000 }
      );
      
      // Réinitialiser le formulaire'''
    
    new_block = '''        console.log("✅ Email envoyé avec succès!", data);
        toast.success(
          "Merci pour votre demande ! 💇‍♀️\\n\\nNous vous contacterons très bientôt.\\n\\nPour une assistance immédiate:\\n📞 240 781 8109",
          { duration: 6000 }
        );
      }
      
      // Réinitialiser le formulaire'''
    
    content = content.replace(old_block, new_block)
    
    # Écrire le fichier modifié
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Fichier App.tsx corrigé avec succès!")
    print("Les messages du formulaire de contact sont maintenant en français.")

if __name__ == '__main__':
    fix_email_messages()
