import React from 'react';
import TransactionForm from '../components/transactions/TransactionForm';
import { TaxCalculator } from '../components/tax/TaxCalculator';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../types/transaction';
import { PageHeader } from '../components/ui/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const WithdrawPage = () => {
  const { transactions, addTransaction, loading, error } = useTransactions();

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
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Withdraw Uang Brangkas"
        description="Record a new withdrawal transaction"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TransactionForm type="withdrawal" onSubmit={handleSubmit} />
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