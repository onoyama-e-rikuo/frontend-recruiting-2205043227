import { Payment } from './charge';

export function calcDeposit(payments: Payment[], total: number): number {
  let deposit = 0;

  payments.forEach((payment) => {
    if (isCouponPayment(payment)) {
      deposit += calcCouponAmount(payment, total);
      return;
    }
    checkOvercharge(deposit, total);
    deposit += payment.amount || 0;
  });

  checkShortage(deposit, total);

  return deposit;
}

function checkShortage(deposit: number, total: number): void {
  if (total > deposit) {
    throw new Error('Shortage');
  }
}

function checkOvercharge(deposit: number, total: number): void {
  if (deposit >= total) {
    throw new Error('OverCharge');
  }
}

function isCouponPayment(payment: Payment): boolean {
  return payment.type === 'COUPON';
}

function calcCouponAmount(payment: Payment, total: number): number {
  if (payment.percentage != undefined) {
    return Math.floor(total * (payment.percentage / 100));
  }

  return payment.amount || 0;
}
