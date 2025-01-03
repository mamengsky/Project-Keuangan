import { useMemo } from 'react';
import { Transaction } from '../types/transaction';
import { TransactionFilters } from '../components/transactions/TransactionFilters';

export const useFilteredTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters
) => {
  return useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      // Type filter
      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false;
      }

      // Purpose filter
      if (filters.purpose && filters.purpose !== 'Semua' && transaction.purpose !== filters.purpose) {
        return false;
      }

      // Date range filter
      if (startDate && transactionDate < startDate) {
        return false;
      }
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        if (transactionDate > endOfDay) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);
};