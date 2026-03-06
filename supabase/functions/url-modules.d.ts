// Type declarations for URL imports used by Supabase Edge Functions (Deno).
// The IDE cannot resolve these URLs; this file tells TypeScript the module shape.

declare module "https://esm.sh/@supabase/supabase-js@2.47.10" {
  export function createClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: Record<string, unknown>
  ): {
    from: (table: string) => {
      upsert: (
        data: unknown,
        options?: { onConflict?: string; ignoreDuplicates?: boolean }
      ) => Promise<{ error: { message: string } | null }>;
    };
    [key: string]: unknown;
  };
}
