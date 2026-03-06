// Supabase Edge Function: fetch inventory from external API and upsert into inventory_history
// Deploy: supabase functions deploy fetch-inventory
// Invoke: POST https://<project-ref>.supabase.co/functions/v1/fetch-inventory
//        with Authorization: Bearer <SUPABASE_ANON_KEY or SERVICE_ROLE_KEY>

/// <reference path="../deno.d.ts" />
/// <reference path="../url-modules.d.ts" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.10";

const INVENTORY_API_URL =
  Deno.env.get("INVENTORY_API_URL") ??
  "https://leaderboard.sagarfab.com/api/v1/ready_made_products/get_inventory";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InventoryItem {
  sku: string;
  stock: number;
}

interface ApiResponse {
  success: boolean;
  status_code: number;
  message: string;
  data?: {
    inventory: InventoryItem[];
  };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Fetch inventory from external API (POST)
    const apiResponse = await fetch(INVENTORY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      console.error("Inventory API error:", apiResponse.status, text);
      return new Response(
        JSON.stringify({
          success: false,
          error: "inventory_api_failed",
          message: `API returned ${apiResponse.status}`,
          details: text,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const json: ApiResponse = await apiResponse.json();
    if (!json.success || !json.data?.inventory?.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "invalid_response",
          message: json.message ?? "No inventory data in response",
        }),
        {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const inventory = json.data.inventory;
    const inventoryDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // 2. Build rows for inventory_history (sku, stock, inventory_date)
    const rows = inventory.map((item: InventoryItem) => ({
      sku: String(item.sku).trim(),
      stock: Number(item.stock) ?? 0,
      inventory_date: inventoryDate,
    }));

    // 3. Supabase client (uses SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from env)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(
        JSON.stringify({
          success: false,
          error: "config_error",
          message: "Server configuration error",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 4. Upsert into inventory_history (unique on sku, inventory_date)
    const { error } = await supabase
      .from("inventory_history")
      .upsert(rows, {
        onConflict: "sku,inventory_date",
        ignoreDuplicates: false,
      });

    if (error) {
      console.error("Supabase upsert error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "database_error",
          message: error.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Inventory synced",
        inventory_date: inventoryDate,
        rows_processed: rows.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("fetch-inventory error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "internal_error",
        message: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
