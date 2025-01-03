import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionHeader } from '../components/transactions/TransactionHeader';
import { TransactionSummary } from '../components/transactions/TransactionSummary';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionFilters, TransactionFilters as FilterType } from '../components/transactions/TransactionFilters';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import { useTransactionPeriod } from '../hooks/useTransactionPeriod';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const TransactionsPage = () => {
  const { transactions, loading, error } = useTransactions();
  const defaultPeriod = useTransactionPeriod();
  const [filters, setFilters] = useState<FilterType>({
    type: 'all',
    purpose: 'Semua',
    ...defaultPeriod
  });

  const filteredTransactions = useFilteredTransactions(transactions, filters);
  const purposes = [...new Set(transactions.map(t => t.purpose))];

  const totalBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'deposit' ? transaction.amount : -transaction.amount);
  }, 0);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col overflow-hidden">
      <div className="flex-none p-4">
        <TransactionHeader transactions={filteredTransactions} />
        <TransactionSummary 
          transactions={filteredTransactions}
          totalBalance={totalBalance}
        />
        <TransactionFilters
          filters={filters}
          onFilterChange={setFilters}
          purposes={purposes}
        />
      </div>
      
      <div className="flex-1 overflow-auto px-4 pb-4">
        <TransactionList transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;