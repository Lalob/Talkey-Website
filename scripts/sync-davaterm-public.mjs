import { cp, lstat, mkdir, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(rootDir, "sites", "davaterm");
const publicHtml = join(rootDir, "public", "davaterm.html");
const legacyPublicDir = join(rootDir, "public", "davaterm");
const publicAssetsDir = join(rootDir, "public", "davaterm-assets");

function isWithin(root, candidate) {
  const pathFromRoot = relative(root, candidate);
  return pathFromRoot === "" || (!pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== ".." && !pathFromRoot.startsWith(sep));
}

async function assertSafeTree(root) {
  const rootRealPath = await realpath(root);

  async function visit(path) {
    const metadata = await lstat(path);
    if (metadata.isSymbolicLink()) throw new Error(`Unsafe symbolic link in Davaterm content: ${path}`);

    const resolvedPath = await realpath(path);
    if (!isWithin(rootRealPath, resolvedPath)) throw new Error(`Davaterm content escapes its source root: ${path}`);

    if (metadata.isDirectory()) {
      for (const entry of await readdir(path)) await visit(join(path, entry));
      return;
    }
    if (!metadata.isFile()) throw new Error(`Unsupported Davaterm content type: ${path}`);
  }

  await visit(root);
}

await assertSafeTree(sourceDir);

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
