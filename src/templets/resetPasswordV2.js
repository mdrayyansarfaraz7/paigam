/**
 * Generates HTML for a password reset email.
 *
 * @param {Object} options
 * @param {string} options.color - Primary color of the email (optional, default "#000000")
 * @param {string} options.resetPasswordLink - Reset Password Link (mandatory)
 * @param {number} options.expirationTime - Expiration time in minutes (mandatory)
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.supportEmail - Support email (optional, default "")
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.companyWebsite - URL of company website (optional, default "")
 * @returns {string} HTML string of the email
 */

export default function resetPasswordEmailV2({
  color = "#000000",
  resetPasswordLink,
  expirationTime,
  companyName,
  supportEmail = "",
  logoUrl,
  companyWebsite = ""
}) {
  if (!resetPasswordLink) throw new Error("Missing mandatory argument: resetPasswordLink");
  if (!expirationTime) throw new Error("Missing mandatory argument: expirationTime");
  if (!companyName) throw new Error("Missing mandatory argument: companyName");
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");

  const supportHtml = supportEmail
    ? ` contact <a href="mailto:${supportEmail}" style="color:${color}; text-decoration:none;">Contact Now</a>.`
    : "";

  const logoHtml = companyWebsite
    ? `<a href="${companyWebsite}" target="_blank" style="text-decoration:none;">
         <img src="${logoUrl}" alt="${companyName} logo" style="max-width:150px; height:auto;">
       </a>`
    : `<img src="${logoUrl}" alt="${companyName} logo" style="max-width:150px; height:auto;">`;

  return `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:20px 30px; text-align:left;">
              ${logoHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 40px 40px; text-align:center;">
              <p style="font-size:18px; color:#333333; font-weight:600; margin:0 0 15px 0;">
                Reset Your Password
              </p>
              <p style="font-size:15px; color:#555555; margin:0 0 25px 0;">
                We received a request to reset your password. Click the button below to choose a new one:
              </p>
              <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin:20px auto;">
                <tr>
                  <td align="center">
                    <a href="${resetPasswordLink}"
                       style="background-color:${color}; color:#ffffff; font-size:16px; font-weight:bold; 
                              text-decoration:none; padding:14px 32px; border-radius:4px; display:inline-block;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size:14px; color:#777777; line-height:1.6; margin:25px 0 0 0;">
                This link will expire in ${expirationTime} minutes.<br>
                If you did not request a password reset, you can safely ignore this email.
              </p>
              <p style="font-size:13px; color:#777777; margin:20px 0 0 0;">
                Or copy and paste this link into your browser: <br>
                <a href="${resetPasswordLink}" style="color:${color}; text-decoration:none;">
                  ${resetPasswordLink}
                </a>
              </p>
            </td>
          </tr>
        </table>
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="margin-top:25px; text-align:center;">
          <tr>
            <td style="font-size:12px; color:#999999; line-height:1.5; padding:10px 0;">
              © ${new Date().getFullYear()} ${companyName}. All rights reserved.<br>
              ${companyWebsite ? `<a href="${companyWebsite}" style="color:${color}; text-decoration:none;">Visit ${companyName}</a><br>` : ""}
              Need help?${supportHtml}
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
