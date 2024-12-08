import { useState, FormEvent, ChangeEvent } from 'react';
import { Transaction } from '../types/transaction';

interface FormData {
  recorderName: string;
  purpose: string;
  notes: string;
  amount: string;
}

interface InitialValues {
  recorderName: string;
  purpose: string;
}

export const useTransactionForm = (
  type: 'deposit' | 'withdrawal',
  onSubmit: (transaction: Omit<Transaction, 'id' | 'type'>) => void,
  initialValues: InitialValues
) => {
  const [formData, setFormData] = useState<FormData>({
    recorderName: initialValues.recorderName,
    purpose: initialValues.purpose,
    notes: '',
    amount: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (fieldsToReset: (keyof FormData)[] = ['recorderName', 'purpose', 'notes', 'amount']) => {
    setFormData((prev) => {
      const newData = { ...prev };
      fieldsToReset.forEach((field) => {
        newData[field] = '';
      });
      return newData;
    });
  };

  const handleSubmit = async (e: FormEvent, onSuccess: () => void) => {
    e.preventDefault();
    await onSubmit({
      recorderName: formData.recorderName,
      purpose: formData.purpose,
      notes: formData.notes,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
    });
    onSuccess();
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};