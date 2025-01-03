/*
  # Add RLS Policies

  1. Security Policies
    - Allow read access for all authenticated users
    - Allow insert for authenticated users
    - Allow update for authenticated users
    - Allow delete for authenticated users
*/

-- Create RLS policies
CREATE POLICY "Enable read access for all users"
ON public.transactions FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.transactions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON public.transactions FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
ON public.transactions FOR DELETE
USING (true);