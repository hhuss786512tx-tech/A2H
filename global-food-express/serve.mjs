/** Serves the production build on http://localhost:3000 (run `npm run build` first). */
import { spawn } from "node:child_process";
const port = process.env.PORT ?? "3000";
const p = spawn("npx", ["next", "start", "-p", port], { stdio: "inherit", shell: true });
p.on("exit", (c) => process.exit(c ?? 0));
