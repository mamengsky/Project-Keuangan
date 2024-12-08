import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionHeader } from '../components/transactions/TransactionHeader';
import { TransactionSummary } from '../components/transactions/TransactionSummary';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionFilters, TransactionFilters as FilterType } from '../components/transactions/TransactionFilters';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const TransactionsPage = () => {
  const { transactions, loading, error } = useTransactions();
  const [filters, setFilters] = useState<FilterType>({
    type: 'all',
    purpose: '',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const filteredTransactions = useFilteredTransactions(transactions, filters);
  const purposes = [...new Set(transactions.map(t => t.purpose))];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto">
      <TransactionHeader transactions={filteredTransactions} />
      
      <TransactionSummary transactions={filteredTransactions} />
      
      <TransactionFilters
        filters={filters}
        onFilterChange={setFilters}
        purposes={purposes}
      />
      
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default TransactionsPage;