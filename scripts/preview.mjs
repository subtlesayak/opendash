import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { resolve, sep } from "node:path"

const dist = resolve("dist")
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png" }
createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname)
    if (pathname === "/") {
        response.writeHead(302, { Location: "/opendash/" }).end()
        return
    }
    if (!pathname.startsWith("/opendash/")) {
        response.writeHead(404).end("Page not found")
        return
    }
    let file = resolve(dist, pathname.slice("/opendash/".length))
    if (file !== dist && !file.startsWith(dist + sep)) {
        response.writeHead(404).end("Page not found")
        return
    }
    try {
        if ((await stat(file)).isDirectory()) file = resolve(file, "index.html")
        const content = await readFile(file)
        const extension = file.slice(file.lastIndexOf("."))
        response.writeHead(200, { "Content-Type": contentTypes[extension] ?? "application/octet-stream" }).end(content)
    } catch {
        response.writeHead(404).end("Page not found")
    }
}).listen(4173, "127.0.0.1", () => console.log("Open Dash preview at http://127.0.0.1:4173/opendash/"))
