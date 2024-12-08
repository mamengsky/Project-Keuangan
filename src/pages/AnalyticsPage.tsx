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
    <div className="p-4 max-w-7xl mx-auto">
      <AnalyticsHeader transactions={filteredTransactions} />
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Periode</h3>
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
          onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
        />
      </div>
      
      <div className="space-y-4">
        <MonthSummary stats={currentMonthStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MonthlyComparison data={monthlyData} />
          <PurposeDistribution data={purposeDistribution} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;