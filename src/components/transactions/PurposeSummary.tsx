import React from 'react';
import { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/formatters';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface PurposeSummaryProps {
  transactions: Transaction[];
}

export const PurposeSummary: React.FC<PurposeSummaryProps> = ({ transactions }) => {
  const purposeSummary = transactions.reduce((acc, transaction) => {
    const key = transaction.purpose;
    if (!acc[key]) {
      acc[key] = {
        deposits: 0,
        withdrawals: 0,
        count: 0
      };
    }
    
    if (transaction.type === 'deposit') {
      acc[key].deposits += transaction.amount;
    } else {
      acc[key].withdrawals += transaction.amount;
    }
    acc[key].count++;
    
    return acc;
  }, {} as Record<string, { deposits: number; withdrawals: number; count: number }>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan per Keperluan</h3>
      <div className="grid gap-4">
        {Object.entries(purposeSummary).map(([purpose, data]) => (
          <div key={purpose} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-700">{purpose}</h4>
              <span className="text-sm text-gray-500">
                {data.count} transaksi
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <ArrowDownCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Pemasukan</p>
                  <p className="font-semibold text-green-600">
                    {formatCurrency(data.deposits)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Pengeluaran</p>
                  <p className="font-semibold text-red-600">
                    {formatCurrency(data.withdrawals)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm text-gray-600">
                Net: <span className={data.deposits - data.withdrawals >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data.deposits - data.withdrawals)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};