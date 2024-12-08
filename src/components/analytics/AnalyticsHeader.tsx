import React from 'react';
import { Download } from 'lucide-react';
import { Transaction } from '../../types/transaction';
import { exportToExcel } from '../../utils/exportToExcel';

interface AnalyticsHeaderProps {
  transactions: Transaction[];
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ transactions }) => {
  const handleExport = () => {
    exportToExcel(transactions, 'financial-report');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold text-gray-800">Laporan Keuangan</h1>
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