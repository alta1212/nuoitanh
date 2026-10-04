import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { formatCurrency, resolveLocale } from "../src/utils/locale.ts";

const localeFiles = ["vi", "en"].map(
  (locale) => new URL(`../src/locales/${locale}.json`, import.meta.url),
);

function flatten(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === "object" && child !== null
      ? flatten(child, path)
      : [[path, child]];
  });
}

test("locale files have matching non-empty messages", async () => {
  const [vi, en] = await Promise.all(
    localeFiles.map(async (file) => JSON.parse(await readFile(file, "utf8"))),
  );
  const viEntries = flatten(vi);
  const enEntries = flatten(en);

  assert.deepEqual(
    enEntries.map(([key]) => key),
    viEntries.map(([key]) => key),
  );
  for (const [, value] of [...viEntries, ...enEntries]) {
    assert.equal(typeof value, "string");
    assert.ok(value.trim());
  }
});

test("stored locale wins, otherwise Vietnamese follows the browser", () => {
  assert.equal(resolveLocale("vi", "en-US"), "vi");
  assert.equal(resolveLocale("en", "vi-VN"), "en");
  assert.equal(resolveLocale(null, "vi-VN"), "vi");
  assert.equal(resolveLocale(null, "en-US"), "en");
  assert.equal(resolveLocale("unsupported", "fr-FR"), "en");
});

test("currency formatting follows the selected locale", () => {
  assert.equal(formatCurrency(50_000, "vi"), "50.000đ");
  assert.equal(formatCurrency(50_000, "en"), "₫50,000");
});
