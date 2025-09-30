/**
 * Generates HTML for a dynamic special offer email.
 *
 * @param {Object} options
 * @param {string} options.logoUrl - Company logo URL (mandatory)
 * @param {string} options.companyName - Company name (mandatory)
 * @param {string} options.offerTitle - Offer main title (mandatory)
 * @param {string} options.offerSubtitle - Offer subtitle/description (mandatory)
 * @param {string} options.offerDetails - Main offer details (mandatory)
 * @param {string} options.offerCode - Promo code (optional)
 * @param {string} options.ctaText - Call-to-action button text (default: "Redeem My Offer")
 * @param {string} options.ctaLink - Call-to-action link (mandatory)
 * @param {string} options.ctaColor - Button color (default: "#DC143C")
 * @param {string} options.bgImageUrl - Banner image URL (optional)
 * @param {string} options.expiryText - Expiry text (optional, e.g., "expires in 7 days")
 * @returns {string} HTML string
 */
export default function specialOfferEmail({
  logoUrl,
  companyName,
  offerTitle,
  offerSubtitle,
  offerDetails,
  offerCode,
  ctaText = "Redeem My Offer",
  ctaLink,
  ctaColor = "#DC143C",
  bgImageUrl,
  expiryText
}) {
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");
  if (!companyName) throw new Error("Missing mandatory argument: companyName");
  if (!offerTitle) throw new Error("Missing mandatory argument: offerTitle");
  if (!offerSubtitle) throw new Error("Missing mandatory argument: offerSubtitle");
  if (!offerDetails) throw new Error("Missing mandatory argument: offerDetails");
  if (!ctaLink) throw new Error("Missing mandatory argument: ctaLink");

  const defaultBgImage = "https://res.cloudinary.com/ddo15zw7d/image/upload/v1759215440/uploads/offer_p4rhtm.png";
  const bannerImage = bgImageUrl || defaultBgImage;

  const offerCodeHtml = offerCode
    ? `<div style="font-size:14px; color:#666; margin:10px 0;">Use code: <strong>${offerCode}</strong> at checkout</div>`
    : "";

  const expiryHtml = expiryText
    ? `<p style="font-size:13px; color:#777; margin:25px 0 0 0;">Hurry! This exclusive offer <strong>${expiryText}</strong>.</p>`
    : "";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${offerTitle}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f8f8f8; font-family:Arial, sans-serif;">

    <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0; background-color:#f8f8f8;">
      <tr>
        <td align="center">

          <table width="640" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 12px rgba(0,0,0,0.08); overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:20px; border-bottom:1px solid #eaeaea; text-align:center;">
                <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:120px; height:auto; border-radius:50%; display:inline-block;">
              </td>
            </tr>

            <!-- Hero Banner with background -->
            <tr>
              <td background="${bannerImage}" bgcolor="#000000" width="640" height="280" valign="middle" style="text-align:center; vertical-align:middle; color:#ffffff; font-family:Arial, sans-serif;">
                <!-- Fallback for non-supporting email clients -->
                <div style="width:100%; height:480px; background-image:url('${bannerImage}'); background-size:cover; background-position:center; text-align:center; display:flex; align-items:center; justify-content:center; padding:0 20px;">
                  <div>
                    <h1 style="margin:5px 5px 10px 2px; font-size:42px; font-weight:700; text-transform:uppercase; color:#ffffff; line-height:1.2;">
                      ${offerTitle}
                    </h1>
                    <p style="margin:0; font-size:16px; color:#f1f1f1; line-height:1.5;">
                      ${offerSubtitle}
                    </p>
                  </div>
                </div>
              </td>
            </tr>

            <!-- Offer Section -->
            <tr>
              <td style="padding:40px; text-align:center;">
                <h2 style="color:#222; margin:0 0 15px 0; font-size:22px;">${offerDetails}</h2>
                ${offerCodeHtml}
                <a href="${ctaLink}" 
                   style="display:inline-block; background-color:${ctaColor}; color:#ffffff; padding:14px 40px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:16px; box-shadow:0 4px 12px rgba(0,0,0,0.15); margin-top:10px;">
                  ${ctaText}
                </a>
                ${expiryHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px; font-size:12px; color:#999; text-align:center; border-top:1px solid #eee;">
                © ${new Date().getFullYear()} ${companyName}. All rights reserved.
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

