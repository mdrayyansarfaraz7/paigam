/**
 * Generates HTML for a dynamic order confirmation email.
 *
 * @param {Object} options
 * @param {string} options.companyName - Company name (mandatory)
 * @param {string} options.logoUrl - Company logo URL (mandatory)
 * @param {string} options.orderNumber - Order number (mandatory)
 * @param {string} options.orderDate - Order date (mandatory)
 * @param {Array} options.items - Array of items [{ name: string, price: number|string }] (mandatory)
 * @param {number|string} options.subtotal - Subtotal amount (mandatory)
 * @param {number|string} options.shipping - Shipping cost (optional, default 0)
 * @param {number|string} options.tax - Tax amount (optional, default 0)
 * @param {number|string} options.discount - Discount amount (optional, default 0)
 * @param {string} options.currency - Currency symbol (default: "$")
 * @param {string} options.primaryColor - Primary brand color (default: "#4a90e2")
 * @param {string} options.viewOrderLink - Link to view the order (mandatory)
 * @returns {string} HTML string of the email
 */
export default function orderConfirmationEmail({
  companyName,
  logoUrl,
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  currency = "$",
  primaryColor = "#4a90e2",
  viewOrderLink
}) {
  if (!companyName) throw new Error("Missing mandatory argument: companyName");
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");
  if (!orderNumber) throw new Error("Missing mandatory argument: orderNumber");
  if (!orderDate) throw new Error("Missing mandatory argument: orderDate");
  if (!items || !Array.isArray(items) || items.length === 0)
    throw new Error("Missing mandatory argument: items (must be a non-empty array)");
  if (!subtotal) throw new Error("Missing mandatory argument: subtotal");
  if (!viewOrderLink) throw new Error("Missing mandatory argument: viewOrderLink");

  const itemsHtml = items
    .map((item, idx) => `
      <tr style="${idx % 2 === 0 ? "background-color:#f9f9f9;" : ""}">
        <td style="padding:12px;">${item.name}</td>
        <td style="padding:12px; text-align:right;">${currency}${item.price}</td>
      </tr>
    `)
    .join("");

  const grandTotal =
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax) -
    parseFloat(discount);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
  </head>
  <body style="margin:0; padding:0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color:#f5f6f8; color:#4a4a4a;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 0; background-color:#f5f6f8;">
      <tr>
        <td align="center">

          <table width="650" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.06);">

            <!-- Header -->
            <tr>
              <td align="center" style="padding:50px 40px 20px 40px;">
                <div style="width:70px; height:70px; border-radius:50%; background-color:${primaryColor}33; display:flex; align-items:center; justify-content:center;">
                  <img src="https://img.icons8.com/ios-filled/50/${primaryColor.replace("#","")} shopping-cart.png" alt="Cart Icon" style="width:40px; height:40px;">
                </div>
                <h1 style="margin:20px 0 10px 0; font-size:28px; color:#333333;">Order Confirmed!</h1>
                <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
              </td>
            </tr>

            <!-- Order Summary -->
            <tr>
              <td style="padding:0 40px 30px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px; color:#555555;">
                  <tr>
                    <td style="font-weight:bold; padding-bottom:12px; font-size:15px;">Order ${orderNumber}</td>
                    <td style="text-align:right; font-weight:bold; padding-bottom:12px; font-size:15px;">Date: ${orderDate}</td>
                  </tr>
                  <tr><td colspan="2" style="border-bottom:1px solid #e0e0e0;"></td></tr>

                  ${itemsHtml}

                  <tr><td colspan="2" style="border-top:1px solid #e0e0e0;"></td></tr>

                  <tr>
                    <td style="padding:8px 0;">Subtotal</td>
                    <td style="padding:8px 0; text-align:right;">${currency}${subtotal}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">Shipping</td>
                    <td style="padding:8px 0; text-align:right;">${currency}${shipping}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">Tax</td>
                    <td style="padding:8px 0; text-align:right;">${currency}${tax}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">Discount</td>
                    <td style="padding:8px 0; text-align:right;">-${currency}${discount}</td>
                  </tr>

                  <tr><td colspan="2" style="border-top:1px solid #e0e0e0;"></td></tr>

                  <tr>
                    <td style="padding:15px 0; font-weight:bold; font-size:16px; color:#333333;">Grand Total</td>
                    <td style="padding:15px 0; text-align:right; font-weight:bold; font-size:16px; color:#333333;">${currency}${grandTotal.toFixed(2)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:50px;">
                <a href="${viewOrderLink}" style="background-color:${primaryColor}; color:#ffffff; text-decoration:none; padding:14px 36px; border-radius:6px; font-weight:bold; font-size:15px; display:inline-block;">
                  View Order
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:120px; height:auto;">
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:0 40px 30px 40px; font-size:12px; color:#999999;">
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
