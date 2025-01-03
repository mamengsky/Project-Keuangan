import React from 'react';
import { CreditCard, User, FileText, DollarSign } from 'lucide-react';
import { Transaction } from '../../types/transaction';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import { RECORDERS, TRANSACTION_PURPOSES } from '../../config/constants';
import { Select } from '../ui/Select';
import { formatCurrency } from '../../utils/formatters';

interface DepositFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'type'>) => void;
}

const DepositForm: React.FC<DepositFormProps> = ({ onSubmit }) => {
  const { formData, handleInputChange, handleSubmit, resetForm } = useTransactionForm(
    'deposit',
    onSubmit,
    { recorderName: '', purpose: '' }
  );

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e, () => resetForm(['amount']));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, '');
    handleInputChange({
      target: {
        name: 'amount',
        value
      }
    } as any);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recorder Name Field */}
        <Select
          label="Nama Pencatat"
          value={formData.recorderName}
          onChange={(value) => handleInputChange({
            target: { name: 'recorderName', value }
          } as any)}
          options={Object.values(RECORDERS)}
          placeholder="Select recorder"
          icon={<User className="w-4 h-4" />}
          required
        />

        {/* Purpose Field */}
        <Select
          label="Keperluan"
          value={formData.purpose}
          onChange={(value) => handleInputChange({
            target: { name: 'purpose', value }
          } as any)}
          options={TRANSACTION_PURPOSES.DEPOSIT}
          placeholder="Select purpose"
          icon={<CreditCard className="w-4 h-4" />}
          required
        />
      </div>

      {/* Amount Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
          Jumlah Uang
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleAmountChange}
            className="block w-full rounded-lg border-gray-300 pl-12 pr-4 py-2.5
                     focus:border-blue-500 focus:ring-blue-500 transition-colors"
            placeholder="0"
            required
          />
        </div>
        {formData.amount && (
          <p className="text-sm text-gray-500 mt-1">
            {formatCurrency(Number(formData.amount))}
          </p>
        )}
      </div>

      {/* Notes Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <FileText className="w-4 h-4 mr-2 text-gray-400" />
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className="block w-full rounded-lg border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 transition-colors"
          placeholder="Add any additional notes here..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-3 
                 border border-transparent text-sm font-medium rounded-lg 
                 text-white bg-blue-600 hover:bg-blue-700 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                 transition-colors shadow-sm"
      >
        Submit Deposit
      </button>
    </form>
  );
};

export default DepositForm;