import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export const initializeSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Supabase initialization failed:', error);
    return false;
  }
};