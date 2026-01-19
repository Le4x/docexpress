import { resend, isResendConfigured } from './resend'

// Email de vérification avec code
export async function sendVerificationEmail(to: string, code: string): Promise<boolean> {
  if (!isResendConfigured() || !resend) {
    console.warn('Resend non configuré - simulation envoi code:', code)
    return true // En dev, on simule le succès
  }

  try {
    const { error } = await resend.emails.send({
      from: 'DocExpress.fr <noreply@docexpress.fr>',
      to: [to],
      subject: `Votre code de vérification DocExpress : ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">DocExpress.fr</h1>
          </div>
          <div style="padding: 40px 30px; background: #ffffff;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Vérifiez votre email</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
              Pour obtenir votre document gratuit, entrez ce code de vérification :
            </p>
            <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
              <span style="font-size: 36px; font-weight: bold; color: white; letter-spacing: 8px;">${code}</span>
            </div>
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              Ce code expire dans <strong>10 minutes</strong>
            </p>
            <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">
                <strong>Pourquoi ce code ?</strong><br>
                Nous vérifions votre email pour vous offrir votre premier document gratuit.
                Cette offre est limitée à un document par adresse email.
              </p>
            </div>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Si vous n'avez pas demandé ce code, ignorez cet email.<br>
              © 2025 DocExpress.fr - Tous droits réservés
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Erreur envoi email vérification:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Erreur sendVerificationEmail:', err)
    return false
  }
}

// Email de relance après document gratuit
export async function sendFollowUpEmail(to: string, documentTitle: string): Promise<boolean> {
  if (!isResendConfigured() || !resend) {
    console.warn('Resend non configuré - pas d\'envoi email relance')
    return false
  }

  try {
    const { error } = await resend.emails.send({
      from: 'DocExpress.fr <noreply@docexpress.fr>',
      to: [to],
      subject: '🎉 Offre spéciale : Pack 3 documents à -40%',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">DocExpress.fr</h1>
          </div>
          <div style="padding: 40px 30px; background: #ffffff;">
            <h2 style="color: #1f2937; margin-bottom: 10px;">Merci d'avoir utilisé DocExpress !</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Vous avez téléchargé : <strong>${documentTitle}</strong>
            </p>

            <div style="background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
              <p style="color: white; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase;">Offre limitée</p>
              <h3 style="color: white; font-size: 28px; margin: 0 0 10px 0;">Pack 3 Documents</h3>
              <div style="display: inline-block; background: white; border-radius: 8px; padding: 15px 30px;">
                <span style="color: #9ca3af; text-decoration: line-through; font-size: 18px;">11,97€</span>
                <span style="color: #ea580c; font-size: 32px; font-weight: bold; margin-left: 10px;">6,99€</span>
              </div>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 15px 0 0 0;">
                Économisez 22% sur vos prochains documents
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://docexpress.fr/pack" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Profiter de l'offre
              </a>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin-top: 30px;">
              <h4 style="color: #166534; margin: 0 0 10px 0;">Pourquoi choisir le Pack ?</h4>
              <ul style="color: #4b5563; font-size: 14px; margin: 0; padding-left: 20px;">
                <li>3 documents au choix parmi +30 modèles</li>
                <li>Valable 1 an, sans engagement</li>
                <li>Conformes à la législation française</li>
                <li>Téléchargement instantané en PDF</li>
              </ul>
            </div>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Vous recevez cet email car vous avez utilisé DocExpress.fr<br>
              <a href="https://docexpress.fr" style="color: #60a5fa;">Se désabonner</a> | © 2025 DocExpress.fr
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Erreur envoi email relance:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Erreur sendFollowUpEmail:', err)
    return false
  }
}

// Email de bienvenue après achat
export async function sendWelcomeEmail(to: string, packName: string): Promise<boolean> {
  if (!isResendConfigured() || !resend) {
    return false
  }

  try {
    const { error } = await resend.emails.send({
      from: 'DocExpress.fr <noreply@docexpress.fr>',
      to: [to],
      subject: '✅ Bienvenue ! Votre achat DocExpress est confirmé',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">DocExpress.fr</h1>
          </div>
          <div style="padding: 40px 30px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-block; background: #d1fae5; border-radius: 50%; padding: 20px;">
                <span style="font-size: 40px;">✓</span>
              </div>
            </div>
            <h2 style="color: #1f2937; text-align: center; margin-bottom: 20px;">Merci pour votre achat !</h2>
            <p style="color: #4b5563; line-height: 1.6; text-align: center;">
              Vous avez acheté : <strong>${packName}</strong>
            </p>

            <div style="background: #f3f4f6; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
              <p style="color: #6b7280; margin: 0 0 15px 0;">Vos documents sont disponibles immédiatement</p>
              <a href="https://docexpress.fr/documents" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Accéder à mes documents
              </a>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px;">
                <strong>Besoin d'aide ?</strong><br>
                Répondez simplement à cet email, notre équipe vous répondra sous 24h.
              </p>
            </div>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 DocExpress.fr - Tous droits réservés
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Erreur envoi email bienvenue:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Erreur sendWelcomeEmail:', err)
    return false
  }
}
