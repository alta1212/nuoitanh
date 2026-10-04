import assert from "node:assert/strict";
import test from "node:test";
import {
  formatAmountInput,
  normalizeAmountInput,
  parseAmount,
} from "../src/amount.ts";

test("formats Vietnamese currency input", () => {
  assert.equal(formatAmountInput("321312213"), "321.312.213");
  assert.equal(formatAmountInput("2.000"), "2.000");
  assert.equal(normalizeAmountInput("12a.345đ"), "12345");
  assert.equal(formatAmountInput(""), "");
});

test("accepts safe amounts of at least 2.000đ", () => {
  assert.equal(parseAmount("2000"), 2000);
  assert.equal(parseAmount("35.000"), 35000);
  assert.equal(parseAmount("1999"), null);
  assert.equal(parseAmount(String(Number.MAX_SAFE_INTEGER + 1)), null);
});
