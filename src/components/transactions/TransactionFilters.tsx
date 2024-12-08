import React from 'react';
import { DateRangePicker } from '../common/DateRangePicker';

interface TransactionFiltersProps {
  onFilterChange: (filters: TransactionFilters) => void;
  filters: TransactionFilters;
  purposes: string[];
}

export interface TransactionFilters {
  type: 'all' | 'deposit' | 'withdrawal';
  purpose: string;
  startDate: string;
  endDate: string;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onFilterChange,
  filters,
  purposes,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Transaksi
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value as TransactionFilters['type'] })}
            >
              <option value="all">Semua</option>
              <option value="deposit">Pemasukan</option>
              <option value="withdrawal">Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keperluan
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.purpose}
              onChange={(e) => onFilterChange({ ...filters, purpose: e.target.value })}
            >
              <option value="">Semua</option>
              {purposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onStartDateChange={(date) => onFilterChange({ ...filters, startDate: date })}
          onEndDateChange={(date) => onFilterChange({ ...filters, endDate: date })}
        />
      </div>
    </div>
  );
};