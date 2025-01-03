import React from 'react';
import { Filter } from 'lucide-react';
import { DateRangePicker } from '../common/DateRangePicker';
import { Select } from '../ui/Select';

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

const transactionTypes = [
  { value: 'all', label: 'Semua' },
  { value: 'deposit', label: 'Pemasukan' },
  { value: 'withdrawal', label: 'Pengeluaran' },
];

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onFilterChange,
  filters,
  purposes,
}) => {
  const allPurposes = ['Semua', ...purposes];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Select
            label="Tipe Transaksi"
            value={filters.type === 'all' ? 'Semua' : filters.type === 'deposit' ? 'Pemasukan' : 'Pengeluaran'}
            onChange={(value) => onFilterChange({ 
              ...filters, 
              type: value === 'Semua' ? 'all' : value === 'Pemasukan' ? 'deposit' : 'withdrawal'
            })}
            options={transactionTypes.map(t => t.label)}
            placeholder="Semua"
            icon={<Filter className="w-5 h-5" />}
          />
        </div>

        <div>
          <Select
            label="Keperluan"
            value={filters.purpose}
            onChange={(value) => onFilterChange({ ...filters, purpose: value })}
            options={allPurposes}
            placeholder="Semua"
            icon={<Filter className="w-5 h-5" />}
          />
        </div>

        <div className="col-span-2">
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartDateChange={(date) => onFilterChange({ ...filters, startDate: date })}
            onEndDateChange={(date) => onFilterChange({ ...filters, endDate: date })}
          />
        </div>
      </div>
    </div>
  );
};