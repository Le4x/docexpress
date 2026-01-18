import { Resend } from 'resend'

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY

export const resend = resendApiKey ? new Resend(resendApiKey) : null

export const isResendConfigured = (): boolean => {
  return resend !== null
}

interface SendDocumentEmailParams {
  to: string
  documentTitle: string
  pdfBuffer: Buffer
  fileName: string
}

export async function sendDocumentEmail({
  to,
  documentTitle,
  pdfBuffer,
  fileName,
}: SendDocumentEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend is not configured. Set RESEND_API_KEY environment variable.')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { error } = await resend.emails.send({
      from: 'DocExpress.fr <noreply@docexpress.fr>',
      to: [to],
      subject: `Votre document : ${documentTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">
              <span style="color: #1e3a8a;">Doc</span><span style="color: #f97316;">Express</span><span style="color: #22c55e;">.fr</span>
            </h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Votre document est prêt !</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Bonjour,<br><br>
              Vous trouverez en pièce jointe votre document : <strong>${documentTitle}</strong>.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              Ce document a été généré par DocExpress.fr et est conforme à la législation française.
            </p>
            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                <strong>Conseils :</strong><br>
                - Imprimez le document ou envoyez-le par email<br>
                - Conservez une copie pour vos archives<br>
                - Pour un envoi recommandé, gardez le récépissé
              </p>
            </div>
            <p style="color: #9ca3af; font-size: 12px;">
              Merci d'avoir utilisé DocExpress.fr !
            </p>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 DocExpress.fr - Tous droits réservés
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error sending email:', err)
    return { success: false, error: 'Failed to send email' }
  }
}
