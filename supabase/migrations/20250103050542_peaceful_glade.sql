/*
  # Initial Schema Setup

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `type` (enum: deposit/withdrawal)
      - `amount` (decimal)
      - `recorder_name` (varchar)
      - `purpose` (varchar)
      - `notes` (text, nullable)
      - `date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on transactions table
    - Add policies for CRUD operations
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
    date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_transactions_date ON public.transactions(date);
CREATE INDEX idx_transactions_type ON public.transactions(type);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;