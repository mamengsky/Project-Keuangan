interface Environment {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const validateEnvironment = (): Environment => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL is not defined in environment variables');
  }

  if (!supabaseAnonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is not defined in environment variables');
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
};