# Paigam

**Paigam** is an npm package providing **ready-to-use, customizable email templates** for common use cases such as verification, password resets, OTPs, welcome emails, receipts, and promotional messages.

It’s designed for **Node.js projects** and helps you integrate email templates quickly without writing HTML from scratch.

---

## Installation

```bash
npm install paigam
```

---

## Usage

Import Paigam and use any template by calling it as a function.
Each template returns an **HTML string** that you can send using your preferred email service (e.g., **Nodemailer, Resend, AWS SES**).

```js
import paigam from "paigam";

// Example: Verification email with code
const verifyEmailHTML = paigam.verificationEmailWithCodeV1({
  color: "#000000",
  username: "Rayyan Sarfaraz",
  verificationCode: "143946",
  expirationTime: "10",
  companyName: "Paigam Inc.",
  logoUrl: "https://res.cloudinary.com/ddo15zw7d/image/upload/v1759297480/paigam_admlfl.png",
  // supportEmail: "support@paigam.com",
  // companyWebsite: "https://paigam.com"
});

console.log(verifyEmailHTML);
```

---

## Available Templates

Paigam includes **16 ready-to-use templates**:

### Verification Templates

| Template                      | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `verificationEmailWithCodeV1` | Verification email using a code (circular logo style)    |
| `verificationEmailWithCodeV2` | Verification email using a code (rectangular logo style) |
| `verificationEmailWithLinkV1` | Verification email using a link (circular logo style)    |
| `verificationEmailWithLinkV2` | Verification email using a link (rectangular logo style) |

**Arguments for all Verification Templates:**

| Parameter          | Description                                | Default   |
| ------------------ | ------------------------------------------ | --------- |
| `color`            | Theme color (hex code)                     | `#000000` |
| `username`         | Recipient’s name                           | `"user"`  |
| `companyName`      | Your company/brand name                    | —         |
| `supportEmail`     | Support contact email                      | `""`      |
| `logoUrl`          | Company logo URL                           | —         |
| `companyWebsite`   | Company website link                       | `""`      |
| `verificationCode` | Code for verification (for code templates) | —         |
| `verificationLink` | Link for verification (for link templates) | —         |
| `expirationTime`   | Expiry time for code/link                  | —         |

---

### Password & OTP Templates

| Template               | Description                                   |
| ---------------------- | --------------------------------------------- |
| `resetPasswordEmailV1` | Password reset email (circular logo style)    |
| `resetPasswordEmailV2` | Password reset email (rectangular logo style) |
| `otpEmailV1`           | OTP email (circular logo style)               |
| `otpEmailV2`           | OTP email (rectangular logo style)            |

**Arguments for Password & OTP Templates:**

| Parameter           | Description              | Default   |
| ------------------- | ------------------------ | --------- |
| `color`             | Theme color (hex code)   | `#000000` |
| `username`          | Recipient’s name         | `"user"`  |
| `companyName`       | Your company/brand name  | —         |
| `supportEmail`      | Support contact email    | `""`      |
| `logoUrl`           | Company logo URL         | —         |
| `companyWebsite`    | Company website link     | `""`      |
| `resetPasswordLink` | Link for password reset  | —         |
| `otp`               | OTP code                 | —         |
| `expirationTime`    | Expiry time for code/OTP | —         |

---

### Feedback & Engagement Templates

| Template            | Description                             |
| ------------------- | --------------------------------------- |
| `feedbackEmailV1`   | Feedback email (circular logo style)    |
| `feedbackEmailV2`   | Feedback email (rectangular logo style) |
| `weMissYouEmail`    | Re-engagement email for inactive users  |
| `specialOfferEmail` | Promotional/special offer email         |
| `welcomeEmail`      | Personalized welcome email              |

**Arguments for Feedback & Engagement Templates:**

| Parameter        | Description                                | Default           |
| ---------------- | ------------------------------------------ | ----------------- |
| `color`          | Theme color (hex code)                     | `#000000`         |
| `companyName`    | Your company/brand name                    | —                 |
| `logoUrl`        | Company logo URL                           | —                 |
| `companyWebsite` | Company website link                       | `""`              |
| `feedbackLink`   | Link for feedback (for feedback templates) | —                 |
| `navLink`        | Navigation link (for weMissYouEmail)       | —                 |
| `bgImageUrl`     | Background image URL (optional)            | Default cat image |

---

### Orders & Transactions Templates

| Template                    | Description                 |
| --------------------------- | --------------------------- |
| `orderConfirmationEmail`    | Order confirmation email    |
| `deliveryNotificationEmail` | Delivery notification email |
| `paymentReceiptEmail`       | Payment receipt email       |


**orderConfirmationEmail usage:**

```js
import paigam from paigam;

const orderConfiramtionEmailHTML=paigam.orderConfirmationEmail({
 companyName: "AquaMart",
  logoUrl: "https://res.cloudinary.com/ddo15zw7d/image/upload/v1759311731/AquaKart_babj6u.png",
  orderNumber: "ORD123456",
  orderDate: "2025-10-01",
  items: [
    { name: "Oceanic Aquarium Plant", price: 25.99, quantity: 2 },
    { name: "Coral Reef Decoration", price: 49.5, quantity: 1 },
    { name: "Fish Food Pack", price: 12.75,quantity:1 } 
  ],
  subtotal: 114.23,
  shipping: 10.0,
  tax: 8.64,
  discount: 5.0,
  currency: "$",
  primaryColor: "#ff601cff",
  viewOrderLink: "https://example.com/orders/ORD123456"
});

consple.log(orderConfiramtionEmailHTML);
```

**deliveryNotificationEmail usage:**

```js
import paigam from paigam;

const deliveryNotificationEmailHTML=paigam.deliveryNotificationEmail({
  {
  companyName: "AquaMart",
  logoUrl: "https://res.cloudinary.com/ddo15zw7d/image/upload/v1759311731/AquaKart_babj6u.png",
  orderNumber: "ORD123456",
  deliveryTime: "October 5, 2025, between 2:00 PM - 5:00 PM",
  shippingAddress: "123 Coral Street, Oceanview City, CA 90210, USA",
  trackLink: "https://example.com/track/ORD123456",
  primaryColor: "#ff601cff"
}
})
```
**paymentReceiptEmail usage**

```js
import paigam from paigam

const paymentReceiptEmailHTML=paigam.paymentReceiptEmail({
   companyName: "AquaMart",
  logoUrl: "https://example.com/logo.png",
  orderNumber: "AM-20251001",
  orderDate: "October 1, 2025",
  items: [
    { name: "Oceanic Aquarium Plant", price: 25.99, quantity: 2 },
    { name: "Coral Reef Decoration", price: 49.5, quantity: 1 },
    { name: "Fish Food Pack", price: 12.75, quantity: 3 }
  ],
  subtotal: 139.74,
  shipping: 10.0,
  tax: 8.64,
  discount: 5.0,
  currency: "$",
  billingAddress: "123 Coral Street, Oceanview City, CA 90210, USA",
  shippingAddress: "123 Coral Street, Oceanview City, CA 90210, USA"
})
```

**Arguments for Orders & Transactions Templates:**

| Parameter         | Description                                   | Default   |
| ----------------- | --------------------------------------------- | --------- |
| `companyName`     | Your company/brand name                       | —         |
| `logoUrl`         | Company logo URL                              | —         |
| `orderNumber`     | Order number                                  | —         |
| `orderDate`       | Order date                                    | —         |
| `items`           | Array of items with name, price, quantity     | —         |
| `subtotal`        | Subtotal amount                               | —         |
| `shipping`        | Shipping amount                               | 0         |
| `tax`             | Tax amount                                    | 0         |
| `discount`        | Discount amount                               | 0         |
| `currency`        | Currency symbol                               | `$`       |
| `primaryColor`    | Theme color                                   | `#4a90e2` |
| `viewOrderLink`   | Link to view order                            | —         |
| `billingAddress`  | Billing address (for paymentReceiptEmail)     | —         |
| `shippingAddress` | Shipping address                              | —         |
| `trackLink`       | Tracking link (for deliveryNotificationEmail) | —         |

---

## V1 vs V2 Templates

| Template Type       | V1 (Circular Logo)            | V2 (Rectangular Logo)         |
| ------------------- | ----------------------------- | ----------------------------- |
| Verification (Code) | `verificationEmailWithCodeV1` | `verificationEmailWithCodeV2` |
| Verification (Link) | `verificationEmailWithLinkV1` | `verificationEmailWithLinkV2` |
| Reset Password      | `resetPasswordEmailV1`        | `resetPasswordEmailV2`        |
| OTP Email           | `otpEmailV1`                  | `otpEmailV2`                  |
| Feedback            | `feedbackEmailV1`             | `feedbackEmailV2`             |

> **Note:** V1 templates are best for circular/square logos (favicon-style), while V2 templates are ideal for rectangular/banner-style logos.

---

## Contributing

Contributions are welcome!

* Open an [issue](https://github.com/mdrayyansarfaraz7/paigam/issues) for bug reports or feature requests.
* Submit PRs to improve templates or add new ones.

---

## License

MIT © [Md Rayyan Sarfaraz](https://github.com/mdrayyansarfaraz7)
