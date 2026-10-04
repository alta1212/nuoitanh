import assert from "node:assert/strict";
import test from "node:test";
import products from "../src/products.json" with { type: "json" };

test("contains metadata for all 17 Shopee products", () => {
  assert.equal(products.length, 17);
  for (const product of products) {
    assert.equal(new URL(product.url).hostname, "s.shopee.vn");
    assert.ok(product.title);
    assert.ok(product.description);
    assert.match(product.image, /^https:\/\//);
  }
});
