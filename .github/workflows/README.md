# GitHub Actions workflows

## Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **deploy-edge-functions** | Push to `main` (when `supabase/functions/**` changes), or manual | Deploys Supabase Edge Functions (e.g. `fetch-inventory`) to your linked project. |
| **sync-inventory** | Daily at 9:00 AM IST (03:30 UTC), or manual | Invokes the `fetch-inventory` Edge Function to sync inventory into `inventory_history`. Retries up to 3 times on 5xx/timeouts; job timeout 10 min. |

## Required GitHub secrets

Add these in **Settings → Secrets and variables → Actions**:

### Deploy Edge Functions

| Secret | Where to get it |
|--------|------------------|
| `SUPABASE_ACCESS_TOKEN` | [Supabase Dashboard](https://supabase.com/dashboard/account/tokens) → Account → **Access Tokens** → Generate new token. |
| `SUPABASE_PROJECT_REF` | Your project URL: `https://<PROJECT_REF>.supabase.co` → use the `<PROJECT_REF>` part (e.g. `zrwnsitayjtgibgrhkqx`). |

### Sync inventory

Use **Secrets** (not Variables) so the service role key is not exposed in logs.

| Secret | Where to get it |
|--------|------------------|
| `SUPABASE_URL` | Project URL, e.g. `https://zrwnsitayjtgibgrhkqx.supabase.co`. |
| `SUPABASE_SERVICE_ROLE_KEY` | In the Supabase Dashboard: your **project** → **Project Settings** → **API** → copy the **`service_role`** key (secret). **Do not** use the Account **Access Token** from Account → Access Tokens; that is only for the deploy workflow. |
