// Sau `vite build`: render từng trang thành HTML tĩnh để bot (Google, Facebook,
// AdSense) đọc được nội dung mà không cần chạy JavaScript.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist`;
const ssrEntry = `${root}dist-ssr/entry-server.js`;
const site = "https://nuoitanh.com";

// path -> file trong dist. Dùng free-feed.html (không phải free-feed/index.html)
// để host tĩnh phục vụ đúng /free-feed mà không redirect thêm dấu "/".
const pages = [
  { path: "/", file: "index.html" },
  { path: "/free-feed", file: "free-feed.html" },
];

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: không tìm thấy ${label} trong index.html`);
  return html.replace(pattern, replacement);
}

const { render } = await import(pathToFileURL(ssrEntry).href);
const template = await readFile(`${dist}/index.html`, "utf8");

for (const page of pages) {
  const { html, title } = render(page.path);
  if (!html.includes("<main")) throw new Error(`prerender: ${page.path} render rỗng`);

  const url = `${site}${page.path}`;
  const safeTitle = escapeHtml(title);
  let out = template;
  out = replaceOnce(out, /<div id="root"><\/div>/, `<div id="root">${html}</div>`, "#root");
  out = replaceOnce(out, /<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`, "<title>");
  out = replaceOnce(out, /(<link rel="canonical" href=")[^"]*/, `$1${url}`, "canonical");
  out = replaceOnce(out, /(<meta property="og:url" content=")[^"]*/, `$1${url}`, "og:url");
  out = replaceOnce(out, /(<meta property="og:title" content=")[^"]*/, `$1${safeTitle}`, "og:title");
  out = replaceOnce(out, /(<meta name="twitter:title" content=")[^"]*/, `$1${safeTitle}`, "twitter:title");

  await writeFile(`${dist}/${page.file}`, out);
  console.log(`prerender: ${page.path} -> dist/${page.file} (${html.length} ký tự)`);
}

await rm(`${root}dist-ssr`, { recursive: true, force: true });
