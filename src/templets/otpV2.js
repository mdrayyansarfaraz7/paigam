/**
 * Generates HTML for an one time password email.
 *
 * @param {Object} options
 * @param {string} options.color - Primary color of the email (optional, default "#000000")
 * @param {string|number} options.otp - otp (mandatory)
 * @param {number} options.expirationTime - Expiration time in minutes (mandatory)
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.supportEmail - Support email (optional, default "")
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.companyWebsite - URL of company website (optional, default "")
 * @returns {string} HTML string of the email
 */

export default function otpEmailV2({
    color = "#000000",
    otp,
    expirationTime,
    companyName,
    supportEmail = "",
    logoUrl,
    companyWebsite = ""
}) {
    if (!otp) throw new Error("Missing mandatory argument: otp");
    if (!expirationTime) throw new Error("Missing mandatory argument: expirationTime");
    if (!companyName) throw new Error("Missing mandatory argument: companyName");
    if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");

    const websiteHtml = companyWebsite
        ? `<a href="${companyWebsite}" style="color:${color}; text-decoration:none;">Visit our website</a>`
        : "";

    const supportHtml = supportEmail
        ? `<p style="font-size:13px; color:#888888; margin:0 0 8px 0;">
             Need help? <a href="mailto:${supportEmail}" style="color:${color}; text-decoration:none;">Contact Support</a>
           </p>`
        : "";

    const footerHtml = `
      <p style="font-size:12px; color:#aaaaaa; margin:0;">
        © ${new Date().getFullYear()} ${companyName}. All rights reserved.
        ${websiteHtml ? ` &nbsp;|&nbsp; ${websiteHtml}` : ""}
      </p>
    `;

    return `
    <!DOCTYPE html>
<html lang="en">
<body style="margin:0; padding:0; background-color:#f4f5f7; font-family:Arial, sans-serif;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <table width="640" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.06); overflow:hidden;">
          <tr>
            <td style="padding:20px 30px; border-bottom:1px solid #e6e6e6; text-align:left;">
              <img src="${logoUrl}" 
                   alt="${companyName} Logo" style="max-width:160px; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px 50px; text-align:center;">

              <h2 style="font-size:22px; color:#222222; margin:0 0 20px 0; font-weight:600;">
                Your One-Time Password
              </h2>
              <p style="font-size:15px; color:#555555; margin:0 0 30px 0; line-height:1.6;">
                Use the following One-Time Password (OTP) to complete your verification process.  
                This code is valid for the next <strong>${expirationTime} minutes</strong>.
              </p>

              <div style="margin:30px 0;">
                <span style="display:inline-block; font-size:32px; font-weight:bold; letter-spacing:10px; 
                             color:${color}; padding:18px 40px; border-radius:6px; 
                             background-color:#fafafa; border:1px solid #e0e0e0;">
                  ${otp}
                </span>
              </div>

              <p style="font-size:14px; color:#777777; margin:20px 0 0 0; line-height:1.6;">
                If you did not request this OTP, please change your password or contact our support team immediately.  
                For your security, do not share this code with anyone.
              </p>

            </td>
          </tr>

          <tr>
            <td style="background-color:#f9f9f9; padding:20px 30px; text-align:center; border-top:1px solid #e6e6e6;">
              ${supportHtml}
              ${footerHtml}
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
