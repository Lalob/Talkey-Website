import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(rootDir, "sites", "davaterm");
const publicHtml = join(rootDir, "public", "davaterm.html");
const legacyPublicDir = join(rootDir, "public", "davaterm");
const publicAssetsDir = join(rootDir, "public", "davaterm-assets");

await rm(publicHtml, { force: true });
await rm(legacyPublicDir, { recursive: true, force: true });
await rm(publicAssetsDir, { recursive: true, force: true });

await cp(join(sourceDir, "index.html"), publicHtml);
await mkdir(publicAssetsDir, { recursive: true });
await cp(join(sourceDir, "assets"), join(publicAssetsDir, "assets"), { recursive: true });
await cp(join(sourceDir, "styles.css"), join(publicAssetsDir, "styles.css"));
await cp(join(sourceDir, "script.js"), join(publicAssetsDir, "script.js"));
