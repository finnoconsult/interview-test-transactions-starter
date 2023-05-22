export interface TransactionType {
  id: number;
  title: string;
  amount: number;
  currency: string;
  date: Date;
}

export interface TransactionProps {
  transaction: TransactionType;
}

export interface TransactionDetailsType {
  transactionAmount: number;
  transactions: TransactionType[];
}
