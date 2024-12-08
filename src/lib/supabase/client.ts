import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { env } from '../../config/env';

export const supabase = createClient<Database>(
  env.supabaseUrl,
  env.supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

export const initializeSupabase = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    const { data, error } = await supabase
      .from('transactions')
      .select('id')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') { // Table doesn't exist
        throw new Error(`Database tables not found. Please run the setup migrations:
1. Go to your Supabase dashboard (${env.supabaseUrl})
2. Navigate to the SQL editor
3. Run the migration files in order:
   - src/lib/supabase/migrations/001_create_transactions.sql
   - src/lib/supabase/migrations/002_enable_rls.sql
   
Make sure to run them in the correct order and check for any error messages.`);
      }
      throw error;
    }

    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase initialization failed:', error);
    throw error;
  }
};