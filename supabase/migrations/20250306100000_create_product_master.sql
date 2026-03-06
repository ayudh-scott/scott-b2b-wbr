-- product_master: master table for products (sku is referenced by inventory_history)
-- Run: supabase db push (or apply via Dashboard SQL editor)

create table if not exists public.product_master (
  sku text primary key,
  size text,
  class_name text,
  color text,
  product_name text,
  category text,
  parent_category text,
  brand text,
  parent_brand text,
  hbt text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.product_master is 'Product master data; sku is used in inventory_history for stock snapshots';

-- Optional: if inventory_history exists and you want to enforce referential integrity, uncomment:
-- alter table public.inventory_history
--   add constraint inventory_history_sku_fkey
--   foreign key (sku) references public.product_master(sku);

-- Updated_at trigger (optional)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger product_master_updated_at
  before update on public.product_master
  for each row execute function public.set_updated_at();
