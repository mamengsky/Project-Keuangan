import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { AnalyticsHeader } from '../components/analytics/AnalyticsHeader';
import { MonthSummary } from '../components/analytics/MonthSummary';
import { MonthlyComparison } from '../components/analytics/MonthlyComparison';
import { PurposeDistribution } from '../components/analytics/PurposeDistribution';
import { DateRangePicker } from '../components/common/DateRangePicker';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AnalyticsPage = () => {
  const { transactions, loading, error } = useTransactions();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const { monthlyData, purposeDistribution, currentMonthStats } = useAnalyticsData(filteredTransactions);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-none p-4">
        <AnalyticsHeader transactions={filteredTransactions} />
      </div>
      
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="space-y-4">
          {/* Date Range Filter */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Filter Periode</h3>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
              onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
            />
          </div>

          {/* Summary Cards */}
          <MonthSummary stats={currentMonthStats} />
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md">
              <MonthlyComparison data={monthlyData} />
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <PurposeDistribution data={purposeDistribution} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;