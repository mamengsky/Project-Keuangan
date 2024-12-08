import React from 'react';
import TransactionForm from '../components/transactions/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction } from '../types/transaction';
import { PageHeader } from '../components/ui/PageHeader';

const DepositPage = () => {
  const { addTransaction } = useTransactions();

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

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Deposit Uang Brangkas"
        description="Record a new deposit transaction"
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <TransactionForm type="deposit" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DepositPage;