import { useMemo } from 'react';
import { Transaction } from '../types/transaction';

export const useAnalyticsData = (transactions: Transaction[]) => {
  return useMemo(() => {
    const monthly = {};
    const purposes = {};
    let runningBalance = 0;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentMonthStats = {
      deposits: 0,
      withdrawals: 0,
      netChange: 0,
      transactionCount: 0
    };

    // Get last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      months.push(monthYear);
      monthly[monthYear] = {
        month: monthYear,
        deposits: 0,
        withdrawals: 0,
        netChange: 0,
        transactionCount: 0
      };
    }

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      const amount = transaction.amount;

      if (monthly[monthYear]) {
        if (transaction.type === 'deposit') {
          monthly[monthYear].deposits += amount;
          runningBalance += amount;
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            currentMonthStats.deposits += amount;
          }
        } else {
          monthly[monthYear].withdrawals += amount;
          runningBalance -= amount;
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            currentMonthStats.withdrawals += amount;
          }
        }

        monthly[monthYear].netChange = monthly[monthYear].deposits - monthly[monthYear].withdrawals;
        monthly[monthYear].transactionCount++;
      }

      if (!purposes[transaction.purpose]) {
        purposes[transaction.purpose] = 0;
      }
      purposes[transaction.purpose] += amount;
    });

    currentMonthStats.netChange = currentMonthStats.deposits - currentMonthStats.withdrawals;
    currentMonthStats.transactionCount = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    return {
      monthlyData: months.map(month => monthly[month]),
      purposeDistribution: Object.entries(purposes)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6), // Top 6 purposes
      currentMonthStats
    };
  }, [transactions]);
};