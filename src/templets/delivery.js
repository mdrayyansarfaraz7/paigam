/**
 * Generates HTML for a dynamic delivery notification email.
 *
 * @param {Object} options
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.logoUrl - Company logo URL (mandatory)
 * @param {string} options.orderNumber - Order number (mandatory)
 * @param {string} options.deliveryTime - Expected delivery time (mandatory)
 * @param {string} options.shippingAddress - Shipping address (mandatory)
 * @param {string} options.trackLink - Tracking link URL (mandatory)
 * @param {string} options.primaryColor - Primary brand color (default: "#000000")
 * @param {string} options.deliveryIconUrl - Icon URL for delivery (optional, default is package icon)
 * @returns {string} HTML string
 */
export default function deliveryNotificationEmail({
  companyName,
  logoUrl,
  orderNumber,
  deliveryTime,
  shippingAddress,
  trackLink,
  primaryColor = "#000000",
  deliveryIconUrl = "https://img.icons8.com/ios-filled/50/000000/delivery--v1.png"
}) {
  if (!companyName) throw new Error("Missing mandatory argument: companyName");
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");
  if (!orderNumber) throw new Error("Missing mandatory argument: orderNumber");
  if (!deliveryTime) throw new Error("Missing mandatory argument: deliveryTime");
  if (!shippingAddress) throw new Error("Missing mandatory argument: shippingAddress");
  if (!trackLink) throw new Error("Missing mandatory argument: trackLink");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Delivery Notification</title>
  </head>
  <body style="margin:0; padding:0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color:#f4f5f7; color:#4a4a4a;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 0; background-color:#f4f5f7;">
      <tr>
        <td align="center">

          <table width="620" cellpadding="0" cellspacing="0"
                 style="background-color:#ffffff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); overflow:hidden;">

            <!-- Header Icon -->
            <tr>
              <td align="center" style="padding:50px 0 20px 0;">
                <div style="width:80px; height:80px; border-radius:50%; background-color:#e6f0ff; display:flex; align-items:center; justify-content:center;">
                  <img src="${deliveryIconUrl}" alt="Delivery Icon" style="width:40px; height:40px;">
                </div>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" style="padding:0 50px 30px 50px;">
                <h1 style="margin:0; font-size:26px; color:#333333;">Your Order is Out for Delivery!</h1>
                <p style="margin:10px 0 0 0; font-size:15px; color:#666666; line-height:1.6;">
                  Good news! Your order <strong>${orderNumber}</strong> is on its way and will reach you soon.
                </p>
              </td>
            </tr>

            <!-- Delivery Details -->
            <tr>
              <td style="padding:0 50px 30px 50px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px; color:#555555;">
                  <tr>
                    <td style="padding:15px; background-color:#f9f9f9; border-radius:8px; border:1px solid #e0e0e0;">
                      <strong>Expected Delivery Time:</strong><br>
                      <span style="font-size:16px; color:#333333;">${deliveryTime}</span>
                    </td>
                  </tr>
                  <tr><td style="height:15px;"></td></tr>
                  <tr>
                    <td style="padding:15px; background-color:#f9f9f9; border-radius:8px; border:1px solid #e0e0e0;">
                      <strong>Shipping Address:</strong><br>
                      ${shippingAddress}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Track Order Button -->
            <tr>
              <td align="center" style="padding-bottom:50px;">
                <a href="${trackLink}" style="background-color:${primaryColor}; color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:6px; font-weight:bold; font-size:15px; display:inline-block;">
                  Track Your Order
                </a>
              </td>
            </tr>

            <!-- Company Logo -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:120px; height:auto; display:inline-block;">
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:0 50px 30px 50px; font-size:12px; color:#999999;">
                © ${new Date().getFullYear()} ${companyName}. All Rights Reserved.
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
