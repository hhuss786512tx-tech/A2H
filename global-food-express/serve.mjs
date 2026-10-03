/** Serves the production build on http://localhost:3000 (run `npm run build` first). Safe to run from any cwd. */
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT ?? "3000";
const p = spawn(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "start", "-p", port], { stdio: "inherit", cwd: root });
p.on("exit", (c) => process.exit(c ?? 0));
