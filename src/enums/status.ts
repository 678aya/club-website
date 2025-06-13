export enum Status{
  PENDING = 'PENDING',        // In user's cart, awaiting final checkout
  CONFIRMED = 'CONFIRMED',    // Order confirmed, potentially awaiting payment
  PAID = 'PAID',              // Payment received
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}