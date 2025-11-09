# Integração E-commerce com Lovable Cloud

Este documento contém instruções para criar um subdomínio de e-commerce integrado ao backend Lovable Cloud atual.

## 📋 Informações do Backend Atual

**Projeto Supabase ID:** `hwatgrvtodbmvqrmpzpx`  
**URL da API:** `https://hwatgrvtodbmvqrmpzpx.supabase.co`  
**Anon Key:** Disponível em `.env` como `VITE_SUPABASE_PUBLISHABLE_KEY`

## 🔗 Como Conectar o E-commerce ao Mesmo Backend

### 1. Configuração no Projeto E-commerce

No seu projeto de e-commerce (novo subdomínio), instale o cliente Supabase:

```bash
npm install @supabase/supabase-js
```

### 2. Criar Cliente Supabase

Crie um arquivo `supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hwatgrvtodbmvqrmpzpx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YXRncnZ0b2RibXZxcm1wenB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTQ1ODMsImV4cCI6MjA3ODIzMDU4M30.zWsWDWAXVgcBH-n6XkJycjEsuS2voJwKRN7BUwXgvco';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## 🗄️ Estrutura de Tabelas Sugerida para E-commerce

### Tabela: `products`
```sql
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  stock_quantity integer not null default 0,
  image_url text,
  category text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.products enable row level security;

create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

create policy "Authenticated admins can manage products"
  on public.products for all
  using (auth.uid() in (select user_id from public.user_roles where role = 'admin'));
```

### Tabela: `orders`
```sql
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  status text not null default 'pending', -- pending, processing, completed, cancelled
  total_amount numeric not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null,
  payment_method text,
  payment_status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all orders"
  on public.orders for select
  using (auth.uid() in (select user_id from public.user_roles where role = 'admin'));
```

### Tabela: `order_items`
```sql
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  quantity integer not null,
  unit_price numeric not null,
  subtotal numeric not null,
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.order_items enable row level security;

create policy "Users can view items of their orders"
  on public.order_items for select
  using (
    order_id in (
      select id from public.orders where user_id = auth.uid()
    )
  );

create policy "Admins can view all order items"
  on public.order_items for select
  using (auth.uid() in (select user_id from public.user_roles where role = 'admin'));
```

### Tabela: `cart_items` (opcional - carrinho temporário)
```sql
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text, -- para usuários não autenticados
  product_id uuid references public.products(id) not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, product_id),
  unique(session_id, product_id)
);

-- RLS Policies
alter table public.cart_items enable row level security;

create policy "Users can manage their own cart"
  on public.cart_items for all
  using (
    auth.uid() = user_id or 
    (auth.uid() is null and session_id is not null)
  );
```

## 🔐 Sistema de Roles para E-commerce

### Criar roles necessários:
```sql
-- Enum de roles
create type public.app_role as enum ('admin', 'customer', 'manager');

-- Tabela de roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Função helper para verificar role
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Policy para visualizar roles
create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can manage all roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'));
```

## 📦 Storage Buckets Necessários

### Bucket: `product-images`
```sql
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);

-- Policies para product-images
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images' and
    auth.uid() in (select user_id from public.user_roles where role = 'admin')
  );

create policy "Admins can update product images"
  on storage.objects for update
  using (
    bucket_id = 'product-images' and
    auth.uid() in (select user_id from public.user_roles where role = 'admin')
  );

create policy "Admins can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images' and
    auth.uid() in (select user_id from public.user_roles where role = 'admin')
  );
```

## ⚡ Edge Functions Sugeridas

### 1. `process-payment`
Função para processar pagamentos (integração com Stripe/PagSeguro/etc)

### 2. `send-order-confirmation`
Enviar email de confirmação de pedido

### 3. `update-inventory`
Atualizar estoque após compra

### 4. `calculate-shipping`
Calcular frete (integração com Correios/Melhor Envio)

## 🔄 Compartilhamento de Autenticação

Os usuários autenticados no site principal podem acessar o e-commerce automaticamente, pois ambos usam o mesmo backend Supabase.

### No E-commerce, verificar autenticação:
```typescript
import { supabase } from './supabase/client';

// Verificar usuário logado
const { data: { user } } = await supabase.auth.getUser();

if (user) {
  console.log('Usuário autenticado:', user.email);
}

// Escutar mudanças de autenticação
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('Usuário fez login');
  }
  if (event === 'SIGNED_OUT') {
    console.log('Usuário fez logout');
  }
});
```

## 📊 Queries Úteis para E-commerce

### Buscar produtos com estoque:
```typescript
const { data: products } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true)
  .gt('stock_quantity', 0)
  .order('created_at', { ascending: false });
```

### Criar pedido com itens:
```typescript
// 1. Criar pedido
const { data: order, error } = await supabase
  .from('orders')
  .insert({
    user_id: user.id,
    total_amount: 299.90,
    customer_name: 'João Silva',
    customer_email: 'joao@email.com',
    shipping_address: { street: '...', city: '...', state: '...', zip: '...' }
  })
  .select()
  .single();

// 2. Adicionar itens do pedido
if (order) {
  await supabase
    .from('order_items')
    .insert([
      { order_id: order.id, product_id: '...', quantity: 2, unit_price: 99.90, subtotal: 199.80 },
      { order_id: order.id, product_id: '...', quantity: 1, unit_price: 100.10, subtotal: 100.10 }
    ]);
}
```

### Buscar pedidos do usuário:
```typescript
const { data: orders } = await supabase
  .from('orders')
  .select(`
    *,
    order_items (
      *,
      products (name, image_url)
    )
  `)
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

## 🌐 CORS e Domínios

Certifique-se de configurar os domínios permitidos nas configurações do Supabase:
- Site principal: `seu-dominio.com`
- E-commerce: `loja.seu-dominio.com` ou `ecommerce.seu-dominio.com`

## 📝 Próximos Passos

1. ✅ Criar as tabelas necessárias no banco de dados
2. ✅ Configurar policies RLS adequadas
3. ✅ Criar buckets de storage para imagens de produtos
4. ✅ Implementar edge functions para pagamentos e emails
5. ✅ Desenvolver frontend do e-commerce no novo subdomínio
6. ✅ Testar integração de autenticação entre domínios
7. ✅ Configurar gateway de pagamento
8. ✅ Implementar sistema de envio/frete

## 🔒 Segurança

- **Sempre use RLS policies** em todas as tabelas
- **Nunca exponha service_role_key** no frontend
- **Valide dados no backend** através de edge functions
- **Use roles** para controle de acesso administrativo
- **Sanitize inputs** do usuário
- **Implemente rate limiting** nas edge functions críticas

---

**Nota:** Este backend já está ativo e compartilhado. Qualquer alteração nas tabelas ou policies afetará ambos os projetos (site atual e futuro e-commerce).
