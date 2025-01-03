import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useTransactionPeriod } from '../hooks/useTransactionPeriod';
import { AnalyticsHeader } from '../components/analytics/AnalyticsHeader';
import { MonthSummary } from '../components/analytics/MonthSummary';
import { MonthlyComparison } from '../components/analytics/MonthlyComparison';
import { PurposeDistribution } from '../components/analytics/PurposeDistribution';
import { DateRangePicker } from '../components/common/DateRangePicker';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AnalyticsPage = () => {
  const { transactions, loading, error } = useTransactions();
  const defaultPeriod = useTransactionPeriod();
  const [dateRange, setDateRange] = useState({
    startDate: defaultPeriod.startDate,
    endDate: defaultPeriod.endDate,
  });

  const totalBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'deposit' ? transaction.amount : -transaction.amount);
  }, 0);

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
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
              onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
              className="grid grid-cols-2 gap-3"
            />
          </div>

          {/* Summary Cards */}
          <MonthSummary stats={{
            ...currentMonthStats,
            balance: totalBalance
          }} />
          
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