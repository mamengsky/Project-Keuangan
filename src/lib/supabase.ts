import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

export const initializeSupabase = async () => {
  try {
    const { error } = await supabase
      .from('transactions')
      .select('count')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return false;
  }
};