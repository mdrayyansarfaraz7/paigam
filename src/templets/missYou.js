/**
 * Generates HTML for a "We Miss You" email.
 *
 * @param {Object} options
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.color - Primary color for button and gradient (optional, default "#000000")
 * @param {string} options.navLink - URL for the CTA button (mandatory)
 * @param {string} options.bgImageUrl - Background image URL (optional)
 * @param {string} options.companyName - Company name (mandatory)
 * @returns {string} HTML string of the email
 */
export default function weMissYouEmail({
  logoUrl,
  color = "#000000",
  navLink,
  bgImageUrl,
  companyName
}) {
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");
  if (!navLink) throw new Error("Missing mandatory argument: navLink");
  if (!companyName) throw new Error("Missing mandatory argument: companyName");

  const defaultBgImage = "https://media.istockphoto.com/id/623368750/photo/sacred-birma-cat-in-interior.jpg?s=612x612&w=0&k=20&c=KfNi_sRwTCtXTnnUvEYVBnRg9arrA3JBC7SppRtSRzs=";
  const backgroundImage = bgImageUrl || defaultBgImage;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>We Miss You</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f6f8; font-family:Arial, sans-serif;">

    <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="640" cellspacing="0" cellpadding="0"
            style="background-color:#ffffff; border-radius:8px; box-shadow:0 3px 8px rgba(0,0,0,0.05); overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:20px; border-bottom:1px solid #eaeaea; text-align:center;">
                <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:100px; height:auto; display:inline-block;">
              </td>
            </tr>

            <!-- Hero Section -->
            <tr>
              <td style="position:relative;">
                <div style="position:relative; text-align:center; color:white; font-family:Arial, sans-serif;">
                  <!-- Background image -->
                  <img src="${backgroundImage}" alt="We Miss You Banner" width="640" height="320" style="display:block; width:100%; height:auto;">

                  <!-- Gradient overlay using the color argument -->
                  <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(to bottom right, #000000A6, #000000b9);"></div>

                  <!-- Text content -->
                  <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:80%;">
                    <h1 style="margin:0 0 15px 0; font-size:48px; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:#ffffff; line-height:1.2;">
                      We Miss You
                    </h1>
                    <p style="margin:0 0 25px 0; font-size:18px; color:#f1f1f1; line-height:1.6;">
                      It’s been a while since your last visit. Come see what’s new — fresh updates, exciting features, and more just for you.
                    </p>
                    <a href="${navLink}" style="background-color:#ffffff; color:${color}; padding:14px 36px; text-decoration:none; font-weight:bold; font-size:16px; border-radius:6px; box-shadow:0 4px 10px rgba(0,0,0,0.25);">
                      Come Back
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px; font-size:12px; color:#888; text-align:center; border-top:1px solid #eaeaea;">
                © ${new Date().getFullYear()} ${companyName}. All rights reserved.<br>
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
