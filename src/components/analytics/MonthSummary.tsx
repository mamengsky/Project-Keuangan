import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface MonthStats {
  deposits: number;
  withdrawals: number;
  netChange: number;
  transactionCount: number;
  balance: number; // Added total balance
}

interface MonthSummaryProps {
  stats: MonthStats;
}

export const MonthSummary: React.FC<MonthSummaryProps> = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
      <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.balance)}</p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Period Deposits</h3>
      <p className="text-lg font-bold text-green-600">{formatCurrency(stats.deposits)}</p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Period Withdrawals</h3>
      <p className="text-lg font-bold text-red-600">{formatCurrency(stats.withdrawals)}</p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Period Net Change</h3>
      <p className={`text-lg font-bold ${stats.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatCurrency(stats.netChange)}
      </p>
    </div>
  </div>
);