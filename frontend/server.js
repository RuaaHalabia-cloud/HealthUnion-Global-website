/**
 * Minimal static file server for the production build.
 *
 * Uses only the Node standard library, so it cannot be broken by dependency
 * resolution conflicts. Serves ./build, falls back to index.html for client
 * side routes, and listens on the port provided by the host.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "build");
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
  ".map": "application/json; charset=utf-8",
};

function sendFile(res, filePath, status = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const type = TYPES[ext] || "application/octet-stream";
  // Hashed assets are immutable, index.html must never be cached.
  const cache = filePath.includes(`${path.sep}static${path.sep}`)
    ? "public, max-age=31536000, immutable"
    : "no-cache";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Internal server error");
    }
    res.writeHead(status, {
      "Content-Type": type,
      "Content-Length": data.length,
      "Cache-Control": cache,
      "X-Content-Type-Options": "nosniff",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Bad request");
  }

  const target = path.join(ROOT, pathname);
  // Block any attempt to escape the build directory.
  if (!target.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("Forbidden");
  }

  fs.stat(target, (err, stat) => {
    if (!err && stat.isFile()) return sendFile(res, target);
    // Anything else is a client side route: hand back the app shell.
    sendFile(res, path.join(ROOT, "index.html"), err ? 200 : 200);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Static server listening on port ${PORT}`);
});
