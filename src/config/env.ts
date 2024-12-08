const requiredEnvVars = {
  VITE_SUPABASE_URL: 'Supabase URL',
  VITE_SUPABASE_ANON_KEY: 'Supabase Anonymous Key',
} as const;

interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const validateEnv = (): EnvConfig => {
  const missingVars = Object.entries(requiredEnvVars).filter(
    ([key]) => !import.meta.env[key]
  );

  if (missingVars.length > 0) {
    const missing = missingVars
      .map(([key, name]) => `${name} (${key})`)
      .join('\n');
    
    throw new Error(`Missing required environment variables:\n${missing}`);
  }

  return {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
};

export const env = validateEnv();