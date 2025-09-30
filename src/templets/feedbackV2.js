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
export default function feedbackEmailV2({
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
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Feedback Request</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <!-- Outer Wrapper -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Content Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding:20px 30px; text-align:left;">
              <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:150px; height:auto;">
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:20px 40px 40px 40px; text-align:center;">
              
              <!-- Title -->
              <p style="font-size:18px; color:#333333; font-weight:600; margin:0 0 15px 0;">
                We Value Your Feedback
              </p>

              <!-- Greeting -->
              <p style="font-size:15px; color:#555555; margin:0 0 20px 0;">
                Hello <strong>${username}</strong>,
              </p>

              <!-- Message -->
              <p style="font-size:15px; color:#555555; margin:0 0 25px 0;">
                We’d love to hear your thoughts on your recent experience with us. Your feedback helps us improve and serve you better.
              </p>

              <!-- Button -->
              <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin:20px auto;">
                <tr>
                  <td align="center">
                    <a href="${feedbacklink}"
                       style="background-color:${color}; color:#ffffff; font-size:16px; font-weight:bold; 
                              text-decoration:none; padding:14px 32px; border-radius:4px; display:inline-block;">
                      Give Feedback
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Note -->
              <p style="font-size:14px; color:#777777; line-height:1.6; margin:25px 0 0 0;">
                Your feedback is completely anonymous and will help us improve our services.<br>
                Thank you for taking the time to share your thoughts with us!
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="margin-top:25px; text-align:center;">
          <tr>
            <td style="font-size:12px; color:#999999; line-height:1.5; padding:10px 0;">
              © ${new Date().getFullYear()} ${companyName}. All rights reserved.
              ${websiteHtml ? `<br>${websiteHtml}` : ""}
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
