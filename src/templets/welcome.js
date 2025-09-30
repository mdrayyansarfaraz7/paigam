/**
 * Generates HTML for a welcome email.
 *
 * @param {Object} options
 * @param {string} options.username - Recipient's name (optional, default "User")
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.logoUrl - URL of company logo (mandatory)
 * @param {string} options.ctaLink - URL for the CTA button (mandatory)
 * @param {string} options.ctaText - CTA button text (optional, default "Get Started")
 * @param {string} options.color - primary color default would be #000000
 * @param {Object} options.socialLinks - Object with social URLs (only those provided will show)
 * @returns {string} HTML string of the email
 */

export default function welcomeEmail({
    color = "#000000",
    username = "User",
    companyName,
    logoUrl,
    ctaLink,
    ctaText = "Get Started",
    socialLinks = {}
}) {
    if (!companyName) throw new Error("Missing mandatory argument: companyName");
    if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");
    if (!ctaLink) throw new Error("Missing mandatory argument: ctaLink");

    const iconMap = {
        facebook: "https://cdn-icons-png.flaticon.com/24/733/733547.png",
        instagram: "https://cdn-icons-png.flaticon.com/24/2111/2111463.png",
        x: "https://cdn-icons-png.flaticon.com/24/733/733579.png",
        linkedin: "https://cdn-icons-png.flaticon.com/24/145/145807.png",
        github: "https://cdn-icons-png.flaticon.com/24/733/733553.png",
        discord: "https://cdn-icons-png.flaticon.com/24/2111/2111370.png",
        youtube: "https://cdn-icons-png.flaticon.com/24/1384/1384060.png",
        reddit: "https://cdn-icons-png.flaticon.com/24/2111/2111589.png",
        whatsapp: "https://cdn-icons-png.flaticon.com/24/733/733585.png",
        telegram: "https://cdn-icons-png.flaticon.com/24/2111/2111646.png"
    };

    const socialIcons = Object.entries(socialLinks)
        .filter(([name]) => iconMap[name.toLowerCase()]) 
        .map(
            ([name, url]) => `
      <a href="${url}" style="margin:0 8px; display:inline-block;">
        <img src="${iconMap[name.toLowerCase()]}" alt="${name}" width="24" height="24" style="display:block;">
      </a>
    `
        )
        .join("");

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Welcome Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:Arial, sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:40px 0;">
          <tr>
              <td align="center">
                  <!-- Content Container -->
                  <table width="600" border="0" cellspacing="0" cellpadding="0"
                      style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
                      <tr>
                          <td style="padding:24px; text-align:center; background-color:#ffffff; border-bottom:1px solid #e6e6e6;">
                              <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:120px; height:auto;">
                          </td>
                      </tr>
                      <!-- Main Body -->
                      <tr>
                          <td style="padding:48px 40px 40px 40px; text-align:center;">
                              <!-- Title -->
                              <h2 style="font-size:24px; color:#1a1a1a; font-weight:600; margin:0 0 18px 0;">
                                  Welcome to <span style="color:${color};">${companyName}</span>
                              </h2>
                              <!-- Message -->
                              <p style="font-size:15px; color:#555555; margin:0 0 28px 0; line-height:1.7;">
                                  Hi <strong>${username}</strong>,<br>
                                  We’re delighted to have you onboard. Get started with your new account and unlock tools
                                  designed to make your journey simple, efficient, and powerful.
                              </p>
                              <!-- CTA Button -->
                              <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin:28px auto;">
                                  <tr>
                                      <td align="center">
                                          <a href="${ctaLink}" style="background-color:${color}; color:#ffffff; font-size:16px; font-weight:600; 
                                            text-decoration:none; padding:14px 36px; border-radius:6px; display:inline-block;">
                                              ${ctaText}
                                          </a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                          <td style="background-color:#f9f9f9; padding:24px 30px; text-align:center; border-top:1px solid #e6e6e6;">
                              ${socialIcons
            ? `<p style="font-size:13px; color:#777777; margin:0 0 14px 0; font-weight:500;">Stay Connected</p>
                                     ${socialIcons}`
            : ""
        }
                              <p style="font-size:12px; color:#999999; line-height:1.6; margin:20px 0 0 0;">
                                  © ${new Date().getFullYear()} ${companyName}. All rights reserved.<br>
                              </p>
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

