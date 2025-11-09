-- Create storage bucket for car images
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-deals', 'car-deals', true);

-- Create car deals table for social proof
CREATE TABLE public.car_deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  preco_original NUMERIC(10, 2) NOT NULL,
  preco_venda NUMERIC(10, 2) NOT NULL,
  imagem_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.car_deals ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view car deals (public social proof)
CREATE POLICY "Anyone can view car deals"
ON public.car_deals
FOR SELECT
USING (true);

-- Allow authenticated users to insert car deals
CREATE POLICY "Authenticated users can insert car deals"
ON public.car_deals
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update car deals
CREATE POLICY "Authenticated users can update car deals"
ON public.car_deals
FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete car deals
CREATE POLICY "Authenticated users can delete car deals"
ON public.car_deals
FOR DELETE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_car_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_car_deals_timestamp
BEFORE UPDATE ON public.car_deals
FOR EACH ROW
EXECUTE FUNCTION public.update_car_deals_updated_at();

-- Storage policies for car images
CREATE POLICY "Anyone can view car images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'car-deals');

CREATE POLICY "Authenticated users can upload car images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'car-deals');

CREATE POLICY "Authenticated users can update car images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'car-deals');

CREATE POLICY "Authenticated users can delete car images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'car-deals');