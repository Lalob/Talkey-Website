import { access, cp, lstat, mkdir, readdir, realpath, rm } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const documentsDir = dirname(rootDir);

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function resetDir(path) {
  await rm(path, { recursive: true, force: true });
  await mkdir(path, { recursive: true });
}

function isWithin(root, candidate) {
  const pathFromRoot = relative(root, candidate);
  return pathFromRoot === "" || (!pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== ".." && !pathFromRoot.startsWith(sep));
}

async function assertSafeTree(root, candidate = root) {
  const rootRealPath = await realpath(root);

  async function visit(path) {
    const metadata = await lstat(path);
    if (metadata.isSymbolicLink()) throw new Error(`Unsafe symbolic link in synchronized content: ${path}`);

    const resolvedPath = await realpath(path);
    if (!isWithin(rootRealPath, resolvedPath)) throw new Error(`Synchronized content escapes its source root: ${path}`);

    if (metadata.isDirectory()) {
      for (const entry of await readdir(path)) await visit(join(path, entry));
      return;
    }
    if (!metadata.isFile()) throw new Error(`Unsupported synchronized content type: ${path}`);
  }

  await visit(candidate);
}

async function syncClimax() {
  const externalRoot = join(documentsDir, "Climax Website");
  const externalSource = join(externalRoot, "src", "climax");
  const externalPublic = join(externalRoot, "public", "climax");

  if (!(await exists(externalSource))) return;
  await assertSafeTree(externalSource);

  const repoSource = join(rootDir, "sites", "climax");
  await resetDir(repoSource);
  await cp(externalSource, repoSource, { recursive: true });

  if (await exists(externalPublic)) {
    await assertSafeTree(externalPublic);
    const repoPublic = join(rootDir, "public", "climax");
    await resetDir(repoPublic);
    await cp(externalPublic, repoPublic, { recursive: true });
  }
}

async function syncDavaterm() {
  const externalRoot = join(documentsDir, "Davaterm Website");
  const expectedFiles = [
    ".assetsignore",
    "README.md",
    "index.html",
    "robots.txt",
    "script.js",
    "sitemap.xml",
    "styles.css"
  ];

  if (!(await exists(join(externalRoot, "index.html")))) return;

  const repoSource = join(rootDir, "sites", "davaterm");
  await resetDir(repoSource);

  for (const file of expectedFiles) {
    const source = join(externalRoot, file);
    if (await exists(source)) {
      await assertSafeTree(externalRoot, source);
      await cp(source, join(repoSource, file));
    }
  }

  const assets = join(externalRoot, "assets");
  if (await exists(assets)) {
    await assertSafeTree(assets);
    await cp(assets, join(repoSource, "assets"), { recursive: true });
  }
}

if (process.env.SYNC_EXTERNAL_SITES === "1") {
  await syncClimax();
  await syncDavaterm();
} else {
  console.log("External site import skipped. Set SYNC_EXTERNAL_SITES=1 to refresh reviewed in-repository copies.");
}

