/** 
 * Generates HTML for a feedback email.
 *
 * @param {Object} options
 * @param {string} options.color - Primary color of the email (optional, default "#000000")
 * @param {string} options.username - Recipient's name (optional, default "user")
 * @param {string} options.feedbacklink - feedback link (mandatory)
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.companyWebsite - URL of company website (optional, default "")
 * @returns {string} HTML string of the email
 */

export default function feedbackEmailV1({
    color = "#000000",
    username = "user",
    feedbacklink,
    companyName,
    logoUrl,
    companyWebsite = ""
}) {
    if (!feedbacklink) throw new Error("Missing mandatory argument: feedbacklink");
    if (!companyName) throw new Error("Missing mandatory argument: companyName");
    if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");

    const websiteHtml = companyWebsite
        ? `<a href="${companyWebsite}" style="color:${color}; text-decoration:none;">Visit our website</a>`
        : "";

    return `
<html lang="en">
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f2f3f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f3f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.08); overflow:hidden;">
          <tr>
            <td style="padding:0; border-bottom:1px solid #e0e0e0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="150" valign="middle" style="padding:18px 20px;">
                    <img src="${logoUrl}"
                         alt="${companyName} Logo"
                         style="display:block; max-width:130px; height:auto; border:0; outline:none;">
                  </td>
                  <td valign="middle" style="padding:0 20px 0 0;">
                    <div style="font-size:20px; font-weight:700; color:#111111; line-height:1.2;">
                      We Value Your Feedback
                    </div>
                    <div style="font-size:14px; color:#555555; margin-top:6px; line-height:1.4;">
                      Your opinion helps us improve and serve you better
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px 40px; color:#333333; line-height:1.6;">
              <p style="font-size:16px; margin:0 0 16px 0;">Hello <strong>${username}</strong>,</p>
              <p style="font-size:15px; margin:0 0 24px 0; color:#555555;">
                We’d love to hear your thoughts on your recent experience with us. Your feedback is invaluable and will help us make our services even better.
              </p>

              <!-- Feedback Button -->
              <div style="text-align:center; margin:32px 0;">
                <a href="${feedbacklink}"
                   style="display:inline-block; background-color:${color}; color:#ffffff; font-size:16px; font-weight:bold; 
                          text-decoration:none; padding:16px 36px; border-radius:8px;">
                  Share Feedback
                </a>
              </div>

              <p style="font-size:14px; color:#777777; margin:24px 0 0 0;">
                If the button doesn’t work, copy and paste this link into your browser:<br>
                <a href="${feedbacklink}" 
                   style="color:${color}; text-decoration:none;">${feedbacklink}</a>
              </p>

              <p style="font-size:14px; color:#777777; margin:24px 0 0 0;">
                Thank you for helping us improve!<br>
                – The ${companyName} Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f9f9f9; padding:20px 24px; text-align:center; font-size:12px; color:#999999;">
              © ${new Date().getFullYear()} ${companyName}. All rights reserved.
              ${websiteHtml ? ` &nbsp;|&nbsp; ${websiteHtml}` : ""}
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
