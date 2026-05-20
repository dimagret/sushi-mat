// ЮKassa API Integration Service
// Docs: https://yookassa.ru/developers/api

import { env } from "../lib/env";

const YOOKASSA_API_URL = "https://api.yookassa.ru/v3";

// Base64 auth header
function getAuthHeader(): string {
  const shopId = env.yookassaShopId;
  const secretKey = env.yookassaSecretKey;
  if (!shopId || !secretKey) {
    throw new Error("YOOKASSA_SHOP_ID или YOOKASSA_SECRET_KEY не настроены в .env");
  }
  return "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64");
}

// Create payment in ЮKassa
export async function createYookassaPayment(data: {
  amount: number; // kopecks
  description: string;
  orderId: number;
  returnUrl: string;
  customerEmail?: string;
  customerPhone?: string;
  metadata?: Record<string, string>;
}) {
  const idempotenceKey = `${Date.now()}_${data.orderId}`;

  const body = {
    amount: {
      value: (data.amount / 100).toFixed(2),
      currency: "RUB",
    },
    capture: true, // single-stage payment
    confirmation: {
      type: "redirect",
      return_url: data.returnUrl,
    },
    description: data.description,
    metadata: {
      orderId: String(data.orderId),
      ...data.metadata,
    },
    receipt: {
      customer: {
        email: data.customerEmail || "customer@example.com",
        phone: data.customerPhone,
      },
      items: [], // populated from order items
    },
  };

  const response = await fetch(`${YOOKASSA_API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader(),
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json() as any;
    throw new Error(`Yookassa error: ${error?.description || response.statusText}`);
  }

  return await response.json();
}

// Get payment status from ЮKassa
export async function getYookassaPayment(paymentId: string) {
  const response = await fetch(`${YOOKASSA_API_URL}/payments/${paymentId}`, {
    headers: {
      "Authorization": getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get payment: ${response.statusText}`);
  }

  return await response.json();
}

// Cancel payment (before capture)
export async function cancelYookassaPayment(paymentId: string) {
  const idempotenceKey = `${Date.now()}_cancel_${paymentId}`;

  const response = await fetch(`${YOOKASSA_API_URL}/payments/${paymentId}/cancel`, {
    method: "POST",
    headers: {
      "Authorization": getAuthHeader(),
      "Idempotence-Key": idempotenceKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel payment: ${response.statusText}`);
  }

  return await response.json();
}

// Refund payment
export async function refundYookassaPayment(data: {
  paymentId: string;
  amount: number; // kopecks
  description?: string;
}) {
  const idempotenceKey = `${Date.now()}_refund_${data.paymentId}`;

  const body = {
    payment_id: data.paymentId,
    amount: {
      value: (data.amount / 100).toFixed(2),
      currency: "RUB",
    },
    description: data.description || "Refund",
  };

  const response = await fetch(`${YOOKASSA_API_URL}/refunds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader(),
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to refund: ${response.statusText}`);
  }

  return await response.json();
}

// Webhook signature verification
export function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const crypto = require("crypto");
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}

// Map ЮKassa status to our status
export function mapYookassaStatus(yookassaStatus: string): string {
  const statusMap: Record<string, string> = {
    "pending": "pending",
    "waiting_for_capture": "waiting_for_capture",
    "succeeded": "succeeded",
    "canceled": "cancelled",
    "refunded": "refunded",
    "partially_refunded": "partially_refunded",
  };
  return statusMap[yookassaStatus] || "pending";
}
