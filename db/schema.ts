import { mysqlTable, mysqlEnum, serial, varchar, text, timestamp, bigint, int, json, index } from "drizzle-orm/mysql-core";

// ─── ORDERS ─────────────────────────────────────────
export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  status: mysqlEnum("status", [
    "draft", "pending", "confirmed", "preparing", "ready",
    "out_for_delivery", "delivered", "cancelled", "refunded"
  ]).notNull().default("draft"),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  deliveryAddress: text("delivery_address").notNull(),
  deliveryInstructions: text("delivery_instructions"),
  // Price breakdown in kopecks
  subtotal: bigint("subtotal", { mode: "number" }).notNull(),
  deliveryFee: bigint("delivery_fee", { mode: "number" }).notNull().default(0),
  discount: bigint("discount", { mode: "number" }).notNull().default(0),
  total: bigint("total", { mode: "number" }).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => ({
  statusIdx: index("order_status_idx").on(t.status),
}));

// ─── ORDER ITEMS ────────────────────────────────────
export const orderItems = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: bigint("order_id", { mode: "number", unsigned: true }).notNull(),
  menuItemId: bigint("menu_item_id", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: bigint("unit_price", { mode: "number" }).notNull(),
  totalPrice: bigint("total_price", { mode: "number" }).notNull(),
}, (t) => ({
  orderIdx: index("item_order_idx").on(t.orderId),
}));

// ─── PAYMENTS ───────────────────────────────────────
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  orderId: bigint("order_id", { mode: "number", unsigned: true }).notNull(),
  // ЮKassa fields
  yookassaPaymentId: varchar("yookassa_payment_id", { length: 255 }),
  yookassaConfirmationUrl: text("yookassa_confirmation_url"),
  // Amount in kopecks
  amount: bigint("amount", { mode: "number" }).notNull(),
  // Payment method info (no PAN/CVV!)
  paymentMethod: varchar("payment_method", { length: 50 }),
  last4: varchar("last4", { length: 4 }),
  cardType: varchar("card_type", { length: 20 }),
  // Status
  status: mysqlEnum("payment_status", [
    "pending", "waiting_for_capture", "succeeded",
    "cancelled", "refunded", "partially_refunded"
  ]).notNull().default("pending"),
  // Metadata
  description: varchar("description", { length: 255 }),
  metadata: json("metadata"),
  // Idempotency
  idempotencyKey: varchar("idempotency_key", { length: 255 }).unique(),
  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => ({
  orderIdx: index("payment_order_idx").on(t.orderId),
  yookassaIdx: index("yookassa_idx").on(t.yookassaPaymentId),
}));
