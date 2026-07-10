import { access, cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
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

async function syncClimax() {
  const externalRoot = join(documentsDir, "Climax Website");
  const externalSource = join(externalRoot, "src", "climax");
  const externalPublic = join(externalRoot, "public", "climax");

  if (!(await exists(externalSource))) return;

  const repoSource = join(rootDir, "sites", "climax");
  await resetDir(repoSource);
  await cp(externalSource, repoSource, { recursive: true });

  if (await exists(externalPublic)) {
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
      await cp(source, join(repoSource, file));
    }
  }

  const assets = join(externalRoot, "assets");
  if (await exists(assets)) {
    await cp(assets, join(repoSource, "assets"), { recursive: true });
  }
}

await syncClimax();
await syncDavaterm();

