const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function safeFilePath(requestPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(requestPath);
  } catch {
    return null;
  }

  const cleanPath = decoded.split("?")[0].replace(/\\/g, "/");
  const relative = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const resolved = path.resolve(PUBLIC_DIR, relative);

  if (resolved !== PUBLIC_DIR && !resolved.startsWith(PUBLIC_DIR + path.sep)) {
    return null;
  }
  return resolved;
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-cache"
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || "/");
  const pathname = parsed.pathname || "/";

  // Simple health endpoint for deployment checks.
  if (pathname === "/health") {
    return send(res, 200, JSON.stringify({
      status: "ok",
      app: "Campus Club",
      timestamp: new Date().toISOString()
    }), "application/json; charset=utf-8");
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, "Method Not Allowed");
  }

  let filePath = safeFilePath(pathname);
  if (!filePath) return send(res, 400, "Bad Request");

  // SPA-style fallback for application routes.
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(PUBLIC_DIR, "index.html");
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return send(res, 404, "Not Found");

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400"
    });

    if (req.method === "HEAD") return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Campus Club is running on ${HOST}:${PORT}`);
});
