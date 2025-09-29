/**
 * Generates HTML for a verification email with a code.
 *
 * @param {Object} options
 * @param {string} options.color - Primary color of the email (optional, default "#000000")
 * @param {string} options.username - Recipient's name (optional, default "user")
 * @param {string|number} options.verificationCode - Verification code (mandatory)
 * @param {number} options.expirationTime - Expiration time in minutes (mandatory)
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.supportEmail - Support email (optional, default "")
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.companyWebsite - URL of company website (optional, default "")
 * @returns {string} HTML string of the email
 */

export default function verificationEmailWithCodeV1({
  color = "#000000",
  username = "user",
  verificationCode,
  expirationTime,
  companyName,
  supportEmail = "",
  logoUrl,
  companyWebsite = ""
}) {
  if (!verificationCode) throw new Error("Missing mandatory argument: verificationCode");
  if (!expirationTime) throw new Error("Missing mandatory argument: expirationTime");
  if (!companyName) throw new Error("Missing mandatory argument: companyName");
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");

  const supportHtml = supportEmail
    ? `<a href="mailto:${supportEmail}" style="color:${color}; text-decoration:none;">Contact Support</a>`
    : "";

  const websiteHtml = companyWebsite
    ? `<a href="${companyWebsite}" style="color:${color}; text-decoration:none;">Visit our website</a>`
    : "";

  // Footer links with proper separator
  const footerLinks = [supportHtml, websiteHtml].filter(Boolean).join(" &nbsp;|&nbsp; ");

  return `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
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
                    <img src="${logoUrl}" alt="${companyName} Logo" style="display:block; max-width:130px; height:auto; border:0;">
                  </td>
                  <td valign="middle" style="padding:0 20px 0 0;">
                    <div style="font-size:18px; font-weight:600; color:#111111; line-height:1;">
                      Verify Your Email
                    </div>
                    <div style="font-size:13px; color:#777777; margin-top:4px;">
                      Secure your account — one-time code inside
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
                Use the verification code below to confirm your email address. The code will expire in <strong>${expirationTime} minutes</strong>.
              </p>

              <div style="text-align:center; margin:28px 0;">
                <span style="display:inline-block; font-size:30px; font-weight:700; letter-spacing:6px;
                             color:${color}; padding:16px 28px; border-radius:8px;
                             border:1px solid rgba(26,115,232,0.12); background-color:#ffffff;">
                  ${verificationCode}
                </span>
              </div>

              <p style="font-size:14px; color:#666666; margin:18px 0 0 0;">
                If you did not request this, simply ignore this email.${supportHtml ? ` For help, ${supportHtml}` : ""}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#fafafa; padding:18px 24px; text-align:center; font-size:12px; color:#888888;">
              © ${new Date().getFullYear()} ${companyName}. All rights reserved.${footerLinks ? `<br>${footerLinks}` : ""}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}
