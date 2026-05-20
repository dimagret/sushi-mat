import crypto from "crypto";

// Generate unique order number: SM-YYYYMMDD-XXXX
export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomInt(1000, 9999);
  return `SM-${dateStr}-${random}`;
}

// Calculate order totals
export function calculateOrderTotals(
  items: Array<{ unitPrice: number; quantity: number }>,
  deliveryFee: number = 0,
  discount: number = 0
): { subtotal: number; deliveryFee: number; discount: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = subtotal + deliveryFee - discount;
  return { subtotal, deliveryFee, discount, total: Math.max(0, total) };
}
