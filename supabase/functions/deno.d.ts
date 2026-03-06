// Minimal Deno type declarations for Supabase Edge Functions.
// Edge Functions run on Deno; this file fixes "Cannot find name 'Deno'" in the IDE.

declare namespace Deno {
  export function serve(
    handler: (req: Request) => Response | Promise<Response>,
    options?: { port?: number; hostname?: string; onListen?: (params: { hostname: string; port: number }) => void }
  ): void;

  export const env: {
    get(key: string): string | undefined;
    toObject(): { [key: string]: string };
  };
}
