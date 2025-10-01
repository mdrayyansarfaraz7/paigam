/**
 * Generates HTML for a payment receipt email with quantity support.
 *
 * @param {Object} options
 * @param {string} options.companyName - Name of the company (mandatory)
 * @param {string} options.logoUrl - Company logo URL (mandatory)
 * @param {string} options.orderNumber - Order number (mandatory)
 * @param {string} options.orderDate - Order date (mandatory)
 * @param {Array} options.items - Array of items [{ name: string, price: number|string, quantity: number }] (mandatory)
 * @param {number|string} options.subtotal - Subtotal amount (mandatory)
 * @param {number|string} options.shipping - Shipping cost (optional, default 0)
 * @param {number|string} options.tax - Tax amount (optional, default 0)
 * @param {number|string} options.discount - Discount amount (optional, default 0)
 * @param {string} options.currency - Currency symbol (default: "$")
 * @param {string} options.billingAddress - Billing address (mandatory)
 * @param {string} options.shippingAddress - Shipping address (mandatory)
 * @returns {string} HTML string of the receipt
 */
export default function paymentReceiptEmail({
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
  billingAddress,
  shippingAddress,
}) {
  if (!companyName) throw new Error("Missing mandatory argument: companyName");
  if (!logoUrl) throw new Error("Missing mandatory argument: logoUrl");
  if (!orderNumber) throw new Error("Missing mandatory argument: orderNumber");
  if (!orderDate) throw new Error("Missing mandatory argument: orderDate");
  if (!items || !Array.isArray(items) || items.length === 0)
    throw new Error("Missing mandatory argument: items (must be a non-empty array)");
  if (!subtotal) throw new Error("Missing mandatory argument: subtotal");
  if (!billingAddress) throw new Error("Missing mandatory argument: billingAddress");
  if (!shippingAddress) throw new Error("Missing mandatory argument: shippingAddress");

  const itemsHtml = items
    .map((item, idx) => {
      const itemTotal = parseFloat(item.price) * (item.quantity || 1);
      return `
        <tr style="${idx % 2 === 0 ? "background-color:#f9f9f9;" : ""}">
          <td style="padding:8px 12px;">${item.name}</td>
          <td style="padding:8px 12px; text-align:center;">${item.quantity || 1}</td>
          <td style="padding:8px 12px; text-align:right;">${currency}${itemTotal.toFixed(2)}</td>
        </tr>
      `;
    })
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
      <title>Payment Receipt</title>
  </head>
  <body style="margin:0; padding:0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color:#f4f5f7; color:#4a4a4a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0; background-color:#f4f5f7;">
          <tr>
              <td align="center">
                  <table width="620" cellpadding="0" cellspacing="0"
                      style="background-color:#ffffff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); overflow:hidden;">

                      <!-- Logo -->
                      <tr>
                          <td align="center" style="padding:15px 0 5px 0;">
                              <img src="${logoUrl}" alt="${companyName} Logo" style="max-width:120px; height:auto; display:block;">
                          </td>
                      </tr>

                      <!-- Header -->
                      <tr>
                          <td align="center" style="padding:10px 40px 20px 40px;">
                              <h1 style="margin:0; font-size:26px; color:#333333;">Payment Successful!</h1>
                              <p style="margin:5px 0 0 0; font-size:15px; color:#666666; line-height:1.4;">
                                  Thank you for your payment. Here’s a summary of your order for your reference.
                              </p>
                          </td>
                      </tr>

                      <!-- Order Summary -->
                      <tr>
                          <td style="padding:0 40px 20px 40px;">
                              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px; color:#555555;">
                                  <tr>
                                      <td style="font-weight:bold; padding-bottom:8px; font-size:15px;">Order ${orderNumber}</td>
                                      <td style="text-align:right; font-weight:bold; padding-bottom:8px; font-size:15px;">Date: ${orderDate}</td>
                                  </tr>
                                  <tr><td colspan="3" style="border-bottom:1px solid #e0e0e0;"></td></tr>

                                  <!-- Items Header -->
                                  <tr style="background-color:#efefef; font-weight:bold;">
                                    <td style="padding:8px 12px;">Item</td>
                                    <td style="padding:8px 12px; text-align:center;">Qty</td>
                                    <td style="padding:8px 12px; text-align:right;">Price</td>
                                  </tr>

                                  <!-- Items -->
                                  ${itemsHtml}

                                  <tr><td colspan="3" style="border-bottom:1px solid #e0e0e0;"></td></tr>

                                  <!-- Subtotals and Taxes -->
                                  <tr>
                                      <td style="padding:6px 12px;" colspan="2">Subtotal</td>
                                      <td style="padding:6px 12px; text-align:right;">${currency}${subtotal}</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:6px 12px;" colspan="2">Shipping</td>
                                      <td style="padding:6px 12px; text-align:right;">${currency}${shipping}</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:6px 12px;" colspan="2">Tax</td>
                                      <td style="padding:6px 12px; text-align:right;">${currency}${tax}</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:6px 12px;" colspan="2">Discount</td>
                                      <td style="padding:6px 12px; text-align:right;">-${currency}${discount}</td>
                                  </tr>

                                  <tr><td colspan="3" style="border-top:1px solid #e0e0e0;"></td></tr>

                                  <!-- Grand Total -->
                                  <tr>
                                      <td style="padding:10px 12px; font-weight:bold; font-size:16px; color:#333333;" colspan="2">Grand Total</td>
                                      <td style="padding:10px 12px; text-align:right; font-weight:bold; font-size:16px; color:#333333;">${currency}${grandTotal.toFixed(2)}</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>

                      <!-- Addresses -->
                      <tr>
                          <td style="padding:0 40px 30px 40px;">
                              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#555555; border-collapse:collapse;">
                                  <tr>
                                      <td style="background-color:#f9f9f9; padding:12px 15px; border-radius:8px; border:1px solid #e0e0e0;">
                                          <strong style="display:block; margin-bottom:5px; color:#333333;">Billing Address</strong>
                                          ${billingAddress}
                                      </td>
                                  </tr>
                                  <tr><td style="height:10px;"></td></tr>
                                  <tr>
                                      <td style="background-color:#f9f9f9; padding:12px 15px; border-radius:8px; border:1px solid #e0e0e0;">
                                          <strong style="display:block; margin-bottom:5px; color:#333333;">Shipping Address</strong>
                                          ${shippingAddress}
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td align="center" style="padding:0 40px 20px 40px; font-size:12px; color:#999999;">
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

