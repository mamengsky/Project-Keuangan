import { supabase } from '../../lib/supabase/client';

export const calculateBalance = async (): Promise<number> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('type, amount');

  if (error) throw error;

  return data.reduce((acc, transaction) => {
    return acc + (transaction.type === 'deposit' ? transaction.amount : -transaction.amount);
  }, 0);
};