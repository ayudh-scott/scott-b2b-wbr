# fetch-inventory Edge Function

Fetches inventory from the external API and upserts into `inventory_history`.

- **API:** `POST` to `INVENTORY_API_URL` (default: `https://leaderboard.sagarfab.com/api/v1/ready_made_products/get_inventory`)
- **Table:** `inventory_history` with columns `sku`, `stock`, `inventory_date` (today). Unique on `(sku, inventory_date)`.

## Deploy

```bash
# From project root
supabase functions deploy fetch-inventory
```

## Optional secret

- `INVENTORY_API_URL` – override the inventory API URL (default is the sagarfab URL).

Supabase injects `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` automatically.

## GitHub Actions

The workflow `.github/workflows/sync-inventory.yml` calls this function on a schedule (daily 02:00 UTC) and on manual trigger.

**Secrets to set in the repo:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
