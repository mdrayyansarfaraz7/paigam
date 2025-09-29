/**
 * Generates HTML for a verification email through link.
 *
 * @param {Object} options
 * @param {string} options.color - Primary color of the email (optional, default "#000000")
 * @param {string} options.username - Recipient's name (optional, default "user")
 * @param {string} options.verificationLink - Verification code (mandatory)
 * @param {number} options.expirationTime - Expiration time in minutes (mandatory)
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.supportEmail - Support email (optional, default "")
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.companyWebsite - URL of company website (optional, default "")
 * @returns {string} HTML string of the email
 */

export default function verificationEmailWithLinkV1({
    color = "#000000",
    username = "user",
    verificationLink,
    expirationTime,
    companyName,
    supportEmail = "",
    logoUrl,
    companyWebsite = ""
}) {

    if (!verificationLink) throw new Error("Missing mandatory argument: verificationLink");
    if (!expirationTime) throw new Error("Missing mandatory argument: expirationTime");
    if (!companyName) throw new Error("Missing mandatory argument: companyName");
    if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");

    const supportHtml = supportEmail
        ? ` For help, contact <a href="mailto:${supportEmail}" style="color:${color}; text-decoration:none;">${supportEmail}</a>.`
        : "";

    const websiteHtml = companyWebsite
        ? `&nbsp;|&nbsp;<a href="${companyWebsite}" style="color:${color}; text-decoration:none;">Visit our website</a>`
        : "";

    return `
<html lang="en">
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 6px 18px rgba(16,24,40,0.06); overflow:hidden;">
          
          <tr>
            <td style="padding:0; border-bottom:1px solid #ebebeb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="150" valign="middle" style="padding:18px 20px;">
                    <img src=${logoUrl}
                         alt=${companyName}
                         style="display:block; max-width:130px; height:auto; border:0; outline:none;">
                  </td>
                  <td valign="middle" style="padding:0 20px 0 0;">
                    <div style="font-size:18px; font-weight:600; color:#111111; line-height:1;">
                      Verify Your Email
                    </div>
                    <div style="font-size:13px; color:#777777; margin-top:4px;">
                      Secure your account — click the link below
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 40px 32px 40px; color:#333333;">
              <p style="font-size:16px; margin:0 0 12px 0;">Hello <strong>${username}</strong>,</p>
              <p style="font-size:15px; margin:0 0 24px 0; color:#444444;">
                Please click the button below to confirm your email address. The link will expire in <strong>${expirationTime} minutes</strong>.
              </p>

              <div style="text-align:center; margin:32px 0;">
                <a href=${verificationLink}
                   style="display:inline-block; background-color:${color}; color:#ffffff; font-size:16px; font-weight:bold; 
                          text-decoration:none; padding:14px 32px; border-radius:6px;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px; color:#666666; margin:24px 0 0 0;">
                If the button doesn’t work, copy and paste this link into your browser: <br>
                <a href=${verificationLink}
                   style="color:${color}; text-decoration:none;">${verificationLink}</a>
              </p>

              <p style="font-size:14px; color:#666666; margin:18px 0 0 0;">
                If you did not request this, please change your password immediately. For help, contact
                ${supportHtml}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#fafafa; padding:18px 24px; text-align:center; font-size:12px; color:#888888;">
              © ${new Date().getFullYear()} ${companyName}. All rights reserved. &nbsp;|&nbsp;
              ${websiteHtml}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html> 
    `
}