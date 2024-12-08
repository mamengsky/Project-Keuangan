export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  recorderName: string;
  purpose: string;
  customPurpose?: string;
  notes: string;
  date: string;
}

export const transactionPurposes = [
  'Operational Expenses',
  'Employee Salary',
  'Office Supplies',
  'Maintenance',
  'Investment',
  'Other'
] as const;

export type TransactionPurpose = typeof transactionPurposes[number] | 'Other';