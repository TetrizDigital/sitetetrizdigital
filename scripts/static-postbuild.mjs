// Post-build step for fully static hosting (cPanel / shared hosting, no Node).
// TanStack Start's SPA build emits `_shell.html`; a plain static host needs
// `index.html` (and a `404.html` fallback so deep links still boot the app).
import { copyFile, rm, access } from "node:fs/promises";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const shell = join(clientDir, "_shell.html");

await access(shell);
await copyFile(shell, join(clientDir, "index.html"));
await copyFile(shell, join(clientDir, "404.html"));

// Server bundle / nitro metadata are useless on a static host.
await rm(join(process.cwd(), "dist", "server"), { recursive: true, force: true });
for (const f of ["nitro.json", "package.json", "package-lock.json"]) {
  await rm(join(process.cwd(), "dist", f), { force: true });
}

console.log("[static] dist/client is ready to upload (index.html + assets).");
