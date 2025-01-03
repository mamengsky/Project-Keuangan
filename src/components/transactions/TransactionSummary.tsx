import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Transaction } from '../../types/transaction';

interface TransactionSummaryProps {
  transactions: Transaction[];
  totalBalance: number;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({ 
  transactions,
  totalBalance
}) => {
  const summary = transactions.reduce(
    (acc, transaction) => {
      const amount = transaction.amount;
      if (transaction.type === 'deposit') {
        acc.totalDeposits += amount;
      } else {
        acc.totalWithdrawals += amount;
      }
      return acc;
    },
    { totalDeposits: 0, totalWithdrawals: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Period Deposits</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalDeposits)}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-full">
            <ArrowDownCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Period Withdrawals</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalWithdrawals)}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-full">
            <ArrowUpCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};