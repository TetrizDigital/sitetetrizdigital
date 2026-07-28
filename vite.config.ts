// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside the Lovable sandbox/preview the app is served from the domain root and the
// hosting build is forced to the Cloudflare preset — we keep that untouched.
// Outside of it (your machine / CI, via `bun run build:static`) we produce a 100% static
// site meant to live in a subdirectory of another domain, e.g. https://minhaempresa.com/sitenovo/.
const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" || !!process.env.DEV_SERVER__PROJECT_PATH;

// Override the subdirectory at build time: SITE_BASE=/outrapasta/ bun run build:static
export const SITE_BASE = process.env.SITE_BASE ?? (isLovableSandbox ? "/" : "/sitenovo/");

export default defineConfig({
  // Static hosting (cPanel, no Node): skip the Nitro server bundle entirely and
  // emit prerendered HTML + assets only.
  nitro: isLovableSandbox ? undefined : false,
  vite: { base: SITE_BASE },
  tanstackStart: {
    ...(isLovableSandbox
      ? {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        }
      : {
          spa: { enabled: true },
          prerender: { enabled: true, crawlLinks: true },
        }),
  },
});
