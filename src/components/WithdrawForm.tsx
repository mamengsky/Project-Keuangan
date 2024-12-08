import React, { useState } from 'react';
import { Transaction, transactionPurposes } from '../types/transaction';

interface WithdrawFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'type'>) => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ onSubmit }) => {
  const [recorderName, setRecorderName] = useState('');
  const [purpose, setPurpose] = useState<string>(transactionPurposes[0]);
  const [customPurpose, setCustomPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      recorderName,
      purpose: purpose === 'Other' ? customPurpose : purpose,
      notes,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    });
    
    // Reset form
    setRecorderName('');
    setPurpose(transactionPurposes[0]);
    setCustomPurpose('');
    setNotes('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="recorderName" className="block text-sm font-medium text-gray-700">
          Nama Pencatat
        </label>
        <input
          type="text"
          id="recorderName"
          value={recorderName}
          onChange={(e) => setRecorderName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Keperluan
        </label>
        <select
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          {transactionPurposes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {purpose === 'Other' && (
          <input
            type="text"
            value={customPurpose}
            onChange={(e) => setCustomPurpose(e.target.value)}
            placeholder="Specify purpose"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
        Submit Withdrawal
      </button>
    </form>
  );
};

export default WithdrawForm;