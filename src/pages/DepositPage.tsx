import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../types/transaction';
import DepositForm from '../components/deposit/DepositForm';
import { DepositHeader } from '../components/deposit/DepositHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const DepositPage = () => {
  const { addTransaction, loading, error } = useTransactions();

  const handleSubmit = async (formData: Omit<Transaction, 'id' | 'type'>) => {
    try {
      await addTransaction({
        type: 'deposit',
        ...formData,
      });
    } catch (error) {
      console.error('Failed to record deposit:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <DepositHeader />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <DepositForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DepositPage;