-- Create table for quote requests
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  modelo_carro TEXT NOT NULL,
  nome TEXT,
  telefone TEXT,
  email TEXT,
  mensagem TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quote requests (public form)
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view/update quote requests (admin)
CREATE POLICY "Authenticated users can view quote requests"
ON public.quote_requests
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quote requests"
ON public.quote_requests
FOR UPDATE
USING (auth.role() = 'authenticated');

-- Create table for button click tracking
CREATE TABLE public.button_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  button_type TEXT NOT NULL,
  button_label TEXT,
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.button_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert clicks (for tracking)
CREATE POLICY "Anyone can track button clicks"
ON public.button_clicks
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view clicks (admin analytics)
CREATE POLICY "Authenticated users can view button clicks"
ON public.button_clicks
FOR SELECT
USING (auth.role() = 'authenticated');

-- Add trigger for quote_requests updated_at
CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_car_deals_updated_at();