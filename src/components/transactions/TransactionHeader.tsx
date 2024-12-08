import React from 'react';
import { Download } from 'lucide-react';
import { Transaction } from '../../types/transaction';
import { exportToExcel } from '../../utils/exportToExcel';

interface TransactionHeaderProps {
  transactions: Transaction[];
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ transactions }) => {
  const handleExport = () => {
    exportToExcel(transactions, 'transactions');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Brangkas Trans</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of all transactions and current balance
        </p>
      </div>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export to Excel
      </button>
    </div>
  );
};