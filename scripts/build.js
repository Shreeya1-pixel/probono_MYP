#!/usr/bin/env node
/**
 * Vercel build — copy static site into dist/ for deployment output.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "dist");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

// Clean output
if (fs.existsSync(out)) fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// HTML pages
for (const file of fs.readdirSync(root)) {
  if (file.endsWith(".html")) {
    fs.copyFileSync(path.join(root, file), path.join(out, file));
  }
}

// Static assets
for (const dir of ["css", "js", "images"]) {
  copyDir(path.join(root, dir), path.join(out, dir));
}

// Root files
for (const file of ["robots.txt", "sitemap.xml"]) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

const pages = fs.readdirSync(out).filter((f) => f.endsWith(".html")).length;
console.log(`✓ Built static site → dist/ (${pages} pages)`);
