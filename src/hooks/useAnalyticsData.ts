import { useMemo } from 'react';
import { Transaction } from '../types/transaction';

interface MonthlyData {
  month: string;
  deposits: number;
  withdrawals: number;
}

interface PurposeData {
  name: string;
  value: number;
}

interface MonthStats {
  deposits: number;
  withdrawals: number;
  netChange: number;
  transactionCount: number;
}

export const useAnalyticsData = (transactions: Transaction[]) => {
  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, MonthlyData>();
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      // Format as "MMM YYYY (6th - 5th)"
      const year = date.getDate() < 6 ? 
        (date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()) :
        date.getFullYear();
      const month = date.getDate() < 6 ? 
        (date.getMonth() === 0 ? 11 : date.getMonth() - 1) :
        date.getMonth();
      const monthKey = `${new Date(year, month).toLocaleString('default', { month: 'short' })} ${year}`;
      
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, {
          month: monthKey,
          deposits: 0,
          withdrawals: 0,
        });
      }
      
      const monthData = monthMap.get(monthKey)!;
      if (transaction.type === 'deposit') {
        monthData.deposits += transaction.amount;
      } else {
        monthData.withdrawals += transaction.amount;
      }
    });
    
    return Array.from(monthMap.values());
  }, [transactions]);

  const purposeDistribution = useMemo(() => {
    const purposeMap = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const currentAmount = purposeMap.get(transaction.purpose) || 0;
      purposeMap.set(
        transaction.purpose,
        currentAmount + transaction.amount
      );
    });
    
    return Array.from(purposeMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Sort by value descending
  }, [transactions]);

  const currentMonthStats = useMemo(() => {
    return transactions.reduce(
      (stats, transaction) => {
        if (transaction.type === 'deposit') {
          stats.deposits += transaction.amount;
        } else {
          stats.withdrawals += transaction.amount;
        }
        stats.netChange = stats.deposits - stats.withdrawals;
        stats.transactionCount++;
        return stats;
      },
      { deposits: 0, withdrawals: 0, netChange: 0, transactionCount: 0 }
    );
  }, [transactions]);

  return {
    monthlyData,
    purposeDistribution,
    currentMonthStats,
  };
};