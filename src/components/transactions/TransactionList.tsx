import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Recorder
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Purpose
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="hidden md:table-cell px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Notes
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 whitespace-nowrap">
                  {transaction.type === 'deposit' ? (
                    <ArrowDownCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5 text-red-500" />
                  )}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="truncate max-w-[120px]" title={transaction.recorderName}>
                    {transaction.recorderName}
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="truncate max-w-[120px]" title={transaction.purpose}>
                    {transaction.purpose}
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm">
                  <span className={transaction.type === 'deposit' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="hidden md:table-cell px-2 py-4 text-sm text-gray-500">
                  <div className="truncate max-w-[200px]" title={transaction.notes}>
                    {transaction.notes}
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};