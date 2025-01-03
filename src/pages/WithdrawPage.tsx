import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../types/transaction';
import WithdrawForm from '../components/withdraw/WithdrawForm';
import { WithdrawHeader } from '../components/withdraw/WithdrawHeader';
import { TaxCalculator } from '../components/tax/TaxCalculator';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const WithdrawPage = () => {
  const { transactions, addTransaction, loading, error } = useTransactions();

  // Calculate current balance for tax calculation
  const currentBalance = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'deposit' ? transaction.amount : -transaction.amount);
  }, 0);

  const handleSubmit = async (formData: Omit<Transaction, 'id' | 'type'>) => {
    try {
      await addTransaction({
        type: 'withdrawal',
        ...formData,
      });
    } catch (error) {
      console.error('Failed to record withdrawal:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <WithdrawHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <WithdrawForm onSubmit={handleSubmit} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <TaxCalculator balance={currentBalance} />
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;