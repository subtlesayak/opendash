import { build } from "esbuild"
import { cp, mkdir, readdir, unlink, writeFile } from "node:fs/promises"
import { basename, resolve } from "node:path"
import { pathToFileURL } from "node:url"

const siteRoot = "/opendash"
const origin = "https://subtlesayak.github.io"
const sharedOptions = {
    bundle: true,
    jsx: "automatic",
    alias: { framer: resolve("pages/framer-controls.ts") },
    logLevel: "info",
}

await mkdir("dist/assets", { recursive: true })
await cp("public", "dist", { recursive: true })
await mkdir(".build", { recursive: true })
const clientBuild = await build({
    ...sharedOptions,
    entryPoints: ["pages/client.tsx"],
    outdir: "dist/assets",
    entryNames: "site-[hash]",
    minify: true,
    metafile: true,
    format: "esm",
    target: "es2022",
    define: { "process.env.NODE_ENV": '"production"' },
})
await build({
    ...sharedOptions,
    entryPoints: ["pages/render.tsx"],
    outfile: ".build/render.cjs",
    platform: "node",
    format: "cjs",
    define: { "process.env.NODE_ENV": '"production"' },
})

const { render } = await import(pathToFileURL(resolve(".build/render.cjs")).href)
const clientOutput = Object.entries(clientBuild.metafile.outputs).find(([, output]) => output.entryPoint === "pages/client.tsx")
const clientFile = clientOutput && basename(clientOutput[0])
if (!clientFile) throw new Error("The browser bundle is missing.")
const assetDirectory = resolve("dist/assets")
for (const name of await readdir(assetDirectory)) {
    if (/^site-[A-Z0-9]+\.js$/.test(name) && name !== clientFile) {
        await unlink(resolve(assetDirectory, name))
    }
}

const pages = [
    { path: "", title: "Open Dash | Android motorcycle app", description: "Preview routes, track rides, and manage your motorcycles with the open-source Open Dash Android project.", caseStudy: false },
    { path: "case-study/", title: "Open Dash | Case study", description: "How Open Dash began on the Royal Enfield Tripper Dash, what builds through v1.3.5 showed, and how riders responded.", caseStudy: true },
]
for (const page of pages) {
    const url = origin + siteRoot + "/" + page.path
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f6f8f3">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:url" content="${url}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='13' fill='%23f6f8f3' stroke='%2315241a' stroke-width='2'/%3E%3Cpath d='m16 16 6-7' stroke='%2315241a' stroke-width='2'/%3E%3C/svg%3E">
<style>html{scroll-behavior:smooth}body{margin:0;background:#f6f8f3}button,select{font:inherit}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}</style>
</head>
<body>
<div id="root" data-page="${page.caseStudy ? "case-study" : "product"}">${render(page.caseStudy)}</div>
<script type="module" src="${siteRoot}/assets/${clientFile}"></script>
</body>
</html>`
    await mkdir("dist/" + page.path, { recursive: true })
    await writeFile("dist/" + page.path + "index.html", html)
}
await writeFile("dist/.nojekyll", "")
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${origin}${siteRoot}/${page.path}</loc></url>`).join("")}</urlset>`)
console.log("Built the product showcase and case study for /opendash/.")
