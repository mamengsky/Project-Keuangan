import React from 'react';
import { Transaction } from '../../types/transaction';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import { RECORDERS, TRANSACTION_PURPOSES } from '../../config/constants';
import { useTransactionContext } from '../../contexts/TransactionContext';

interface TransactionFormProps {
  type: 'deposit' | 'withdrawal';
  onSubmit: (transaction: Omit<Transaction, 'id' | 'type'>) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ type, onSubmit }) => {
  const { recorderName, purpose, setRecorderName, setPurpose } = useTransactionContext();
  const {
    formData,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useTransactionForm(type, onSubmit, { recorderName, purpose });

  const purposes = type === 'deposit' 
    ? TRANSACTION_PURPOSES.DEPOSIT 
    : TRANSACTION_PURPOSES.WITHDRAWAL;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e, () => {
      // Only reset the amount field
      resetForm(['amount']);
    });
  };

  const handleRecorderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRecorderName(value);
    handleInputChange(e);
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPurpose(value);
    handleInputChange(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <label htmlFor="recorderName" className="block text-sm font-medium text-gray-700">
          Nama Pencatat
        </label>
        <select
          id="recorderName"
          name="recorderName"
          value={formData.recorderName}
          onChange={handleRecorderChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select recorder</option>
          {Object.values(RECORDERS).map((recorder) => (
            <option key={recorder} value={recorder}>
              {recorder}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Keperluan
        </label>
        <select
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handlePurposeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select purpose</option>
          {purposes.map((purpose) => (
            <option key={purpose} value={purpose}>
              {purpose}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Jumlah Uang
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit {type === 'deposit' ? 'Deposit' : 'Withdrawal'}
      </button>
    </form>
  );
};

export default TransactionForm;