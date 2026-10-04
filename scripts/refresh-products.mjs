import { readFile, rename, writeFile } from "node:fs/promises";
import { lookup } from "node:dns/promises";
import { getLinkPreview } from "link-preview-js";

const file = new URL("../src/products.json", import.meta.url);
const temporaryFile = new URL("../src/products.json.tmp", import.meta.url);
const products = JSON.parse(await readFile(file, "utf8"));

const refreshed = [];
for (const product of products) {
  if (new URL(product.url).hostname !== "s.shopee.vn") {
    throw new Error(`Link không thuộc s.shopee.vn: ${product.url}`);
  }

  const metadata = await getLinkPreview(product.url, {
    followRedirects: "manual",
    handleRedirects: (_from, to) => {
      const hostname = new URL(to).hostname;
      return hostname === "shopee.vn" || hostname.endsWith(".shopee.vn");
    },
    resolveDNSHost: async (url) =>
      (await lookup(new URL(url).hostname)).address,
    headers: {
      "user-agent": "Twitterbot/1.0",
      "accept-language": "vi-VN",
    },
    imagesPropertyType: "og",
    timeout: 15_000,
  });

  const title = "title" in metadata ? metadata.title?.trim() : "";
  const description =
    "description" in metadata ? metadata.description?.trim() : "";
  const image = "images" in metadata ? metadata.images[0] : "";

  if (!title || !description || !image) {
    throw new Error(`Thiếu metadata cho ${product.url}`);
  }

  refreshed.push({ url: product.url, title, description, image });
  console.log(`✓ ${title}`);
}

await writeFile(temporaryFile, `${JSON.stringify(refreshed, null, 2)}\n`);
await rename(temporaryFile, file);
console.log(`Đã cập nhật ${refreshed.length} sản phẩm.`);
