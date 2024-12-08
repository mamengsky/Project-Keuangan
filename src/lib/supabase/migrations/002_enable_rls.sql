-- Reset existing policies
DROP POLICY IF EXISTS "Enable read access" ON public.transactions;
DROP POLICY IF EXISTS "Enable insert access" ON public.transactions;
DROP POLICY IF EXISTS "Enable update access" ON public.transactions;
DROP POLICY IF EXISTS "Enable delete access" ON public.transactions;

-- Create new policies with proper authentication
CREATE POLICY "Enable read access"
ON public.transactions FOR SELECT
USING (true);

CREATE POLICY "Enable insert access"
ON public.transactions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable update access"
ON public.transactions FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete access"
ON public.transactions FOR DELETE
USING (true);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;