#!/usr/bin/env node
/**
 * Pre-deploy check — ensures required static assets exist.
 * Vercel runs this as the build command; no compilation needed.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const requiredPages = [
  "index.html",
  "about.html",
  "know-your-rights.html",
  "projects.html",
  "programs.html",
  "register.html",
  "resources.html",
  "press.html",
  "shop.html",
  "youth-manifesto.html",
  "404.html",
];

const requiredAssets = [
  "css/styles.css",
  "js/app.js",
  "js/tailwind-config.js",
  "js/press.js",
  "js/links.js",
  "images/logo.png",
  "vercel.json",
  "robots.txt",
  "sitemap.xml",
];

const missing = [];

for (const file of [...requiredPages, ...requiredAssets]) {
  if (!fs.existsSync(path.join(root, file))) {
    missing.push(file);
  }
}

if (missing.length) {
  console.error("Build verification failed. Missing files:\n", missing.join("\n "));
  process.exit(1);
}

console.log("✓ Static site verified —", requiredPages.length, "pages,", requiredAssets.length, "core assets");
process.exit(0);
