import { calcChange } from './calcChange';
import { calcDeposit } from './calcDeposit';

export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

type PaymentTypes = 'CASH' | 'COUPON';

export type Payment = {
  type: PaymentTypes;
  percentage?: number;
  amount?: number;
};

export function charge(invoice: Invoice, payments: Payment[]): Receipt {
  const sortedPayments = [...payments].sort((payment) => (payment.type !== 'CASH' ? -1 : 1));
  const deposit = calcDeposit(sortedPayments, invoice.total);
  const change = calcChange(sortedPayments, deposit, invoice.total);

  return { total: invoice.total, deposit, change };
}
