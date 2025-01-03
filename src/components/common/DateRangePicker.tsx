import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full pl-8 pr-2 py-2 text-sm rounded-lg border border-gray-300
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-colors"
          />
          <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate}
            className="w-full pl-8 pr-2 py-2 text-sm rounded-lg border border-gray-300
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-colors"
          />
          <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};