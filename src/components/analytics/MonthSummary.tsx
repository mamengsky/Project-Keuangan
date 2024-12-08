import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface MonthStats {
  deposits: number;
  withdrawals: number;
  netChange: number;
  transactionCount: number;
}

interface MonthSummaryProps {
  stats: MonthStats;
}

export const MonthSummary: React.FC<MonthSummaryProps> = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Pemasukan</h3>
      <p className="text-lg font-bold text-green-600">{formatCurrency(stats.deposits)}</p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Pengeluaran</h3>
      <p className="text-lg font-bold text-red-600">{formatCurrency(stats.withdrawals)}</p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Perubahan</h3>
      <p className={`text-lg font-bold ${stats.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatCurrency(stats.netChange)}
      </p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">Transaksi</h3>
      <p className="text-lg font-bold text-blue-600">{stats.transactionCount}</p>
    </div>
  </div>
);