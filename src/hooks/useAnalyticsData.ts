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
      const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
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
    
    return Array.from(purposeMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const currentMonthStats = useMemo(() => {
    const now = new Date();
    const currentMonthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      );
    });

    return currentMonthTransactions.reduce(
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