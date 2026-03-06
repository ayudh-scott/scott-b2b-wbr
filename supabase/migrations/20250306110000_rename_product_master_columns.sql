-- Rename product_master columns to correct names (if you applied the earlier migration with class_n / parent_sku)
-- Safe to run: only renames if the old columns exist.

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'product_master' and column_name = 'class_n'
  ) then
    alter table public.product_master rename column class_n to class_name;
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'product_master' and column_name = 'parent_sku'
  ) then
    alter table public.product_master rename column parent_sku to parent_brand;
  end if;
end $$;
