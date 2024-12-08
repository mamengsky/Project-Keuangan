-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.transactions;

-- Drop existing types if they exist
DROP TYPE IF EXISTS transaction_type;

-- Create enum for transaction types
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal');

-- Create transactions table
CREATE TABLE public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type transaction_type NOT NULL,
    amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
    recorder_name VARCHAR(255) NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    notes TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_purpose ON public.transactions(purpose);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_transactions_updated_at ON public.transactions;
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO anon;

-- Add some initial test data
INSERT INTO public.transactions (type, amount, recorder_name, purpose, notes, date)
VALUES 
    ('deposit', 1000000, 'Alvin Abhinaya Harmony (Komisaris Utama)', 'Deposit Anggota Baru', 'Initial deposit', CURRENT_TIMESTAMP),
    ('withdrawal', 500000, 'Nathalia L Kusuma (Bendahara)', 'Reimburse', 'Office supplies', CURRENT_TIMESTAMP - INTERVAL '1 day');