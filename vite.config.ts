// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages project sites are served from /<repo>/, so the base path is
// injected at build time (see .github/workflows/deploy-pages.yml).
const basePath = process.env.BASE_PATH || "/";
// Static export for GitHub Pages: prerender the site to plain HTML/assets.
const isStatic = process.env.STATIC_EXPORT === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isStatic ? { prerender: { enabled: true, crawlLinks: true }, pages: [{ path: "/" }] } : {}),
  },
  vite: {
    base: basePath,
  },
});
