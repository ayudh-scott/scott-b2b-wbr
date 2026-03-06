# GitHub Actions workflows

## Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **deploy-edge-functions** | Push to `main` (when `supabase/functions/**` changes), or manual | Deploys Supabase Edge Functions (e.g. `fetch-inventory`) to your linked project. |
| **sync-inventory** | Daily at 02:00 UTC, or manual | Invokes the `fetch-inventory` Edge Function to sync inventory from the external API into `inventory_history`. |

## Required GitHub secrets

Add these in **Settings → Secrets and variables → Actions**:

### Deploy Edge Functions

| Secret | Where to get it |
|--------|------------------|
| `SUPABASE_ACCESS_TOKEN` | [Supabase Dashboard](https://supabase.com/dashboard/account/tokens) → Account → **Access Tokens** → Generate new token. |
| `SUPABASE_PROJECT_REF` | Your project URL: `https://<PROJECT_REF>.supabase.co` → use the `<PROJECT_REF>` part (e.g. `zrwnsitayjtgibgrhkqx`). |

### Sync inventory

| Secret | Where to get it |
|--------|------------------|
| `SUPABASE_URL` | Project URL, e.g. `https://zrwnsitayjtgibgrhkqx.supabase.co`. |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard → **Project Settings** → **API** → `service_role` key (keep secret). |
