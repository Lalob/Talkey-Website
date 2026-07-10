import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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

const html = await readFile(join(sourceDir, "index.html"), "utf8");
const mountedHtml = html
  .replaceAll('content="assets/', 'content="/davaterm-assets/assets/')
  .replaceAll('href="assets/', 'href="/davaterm-assets/assets/')
  .replaceAll('src="assets/', 'src="/davaterm-assets/assets/')
  .replaceAll('href="styles.css', 'href="/davaterm-assets/styles.css')
  .replaceAll('src="script.js', 'src="/davaterm-assets/script.js');

await writeFile(publicHtml, mountedHtml);
await mkdir(publicAssetsDir, { recursive: true });
await cp(join(sourceDir, "assets"), join(publicAssetsDir, "assets"), { recursive: true });
await cp(join(sourceDir, "styles.css"), join(publicAssetsDir, "styles.css"));
await cp(join(sourceDir, "script.js"), join(publicAssetsDir, "script.js"));
