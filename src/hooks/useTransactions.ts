import { useState, useEffect } from 'react';
import { Transaction } from '../types/transaction';
import { supabase } from '../lib/supabase/client';
import { toast } from 'react-hot-toast';
import type { DatabaseSchema } from '../lib/supabase/schema';
import { sendDiscordNotification } from '../services/notifications';

type TransactionInsert = DatabaseSchema['transactions']['Insert'];

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setTransactions(data.map(transformDatabaseTransaction) || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const transformDatabaseTransaction = (dbTransaction: DatabaseSchema['transactions']['Row']): Transaction => ({
    id: dbTransaction.id,
    type: dbTransaction.type,
    amount: Number(dbTransaction.amount),
    recorderName: dbTransaction.recorder_name,
    purpose: dbTransaction.purpose,
    notes: dbTransaction.notes || '',
    date: dbTransaction.date,
  });

  const addTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    try {
      const dbTransaction: TransactionInsert = {
        type: newTransaction.type,
        amount: newTransaction.amount,
        recorder_name: newTransaction.recorderName,
        purpose: newTransaction.purpose,
        notes: newTransaction.notes || null,
        date: newTransaction.date,
      };

      const { data, error } = await supabase
        .from('transactions')
        .insert([dbTransaction])
        .select()
        .single();

      if (error) throw error;

      // Send Discord notification
      await sendDiscordNotification(newTransaction);

      const transformedTransaction = transformDatabaseTransaction(data);
      setTransactions(prev => [transformedTransaction, ...prev]);
      toast.success(`${newTransaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} recorded successfully`);
      return transformedTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add transaction';
      toast.error(errorMessage);
      throw err;
    }
  };

  return { 
    transactions, 
    addTransaction,
    loading,
    error,
    refresh: fetchTransactions
  };
};