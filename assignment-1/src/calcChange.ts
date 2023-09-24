import { Payment } from './charge';

export function calcChange(payments: Payment[], deposit: number, total: number): number {
  const allAreCoupons = payments.every((payment) => payment.type === 'COUPON');
  return allAreCoupons ? 0 : deposit - total;
}
