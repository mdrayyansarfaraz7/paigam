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
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <!-- Outer Wrapper -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Content Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:20px 30px; text-align:left;">
              <img src="${logoUrl}" alt="${companyName} logo" style="max-width:150px; height:auto; display:block;">
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 40px 40px; text-align:center;">
              <p style="font-size:18px; color:#333333; font-weight:600; margin:0 0 15px 0;">
                Email Verification Code
              </p>
              <p style="font-size:15px; color:#555555; margin:0 0 20px 0;">
                Hello <strong>${username}</strong>, please use the following code to verify your email address:
              </p>
              <p style="font-size:34px; font-weight:bold; color:${color}; margin:20px 0;">
                ${verificationCode}
              </p>
              <p style="font-size:14px; color:#777777; line-height:1.6; margin:20px 0 0 0;">
                This code will expire in ${expirationTime} minutes.<br>
                If you did not request this, please ignore this email.${supportHtml ? ` For help, ${supportHtml}` : ""}
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="margin-top:25px; text-align:center;">
          <tr>
            <td style="font-size:12px; color:#999999; line-height:1.5; padding:10px 0;">
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
