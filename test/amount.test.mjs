import assert from "node:assert/strict";
import test from "node:test";
import { parseAmount } from "../src/amount.ts";

test("accepts valid amounts and rejects invalid ones", () => {
  assert.equal(parseAmount("2000"), 2000);
  assert.equal(parseAmount("35000.9"), 35000);
  assert.equal(parseAmount("1999"), null);
  assert.equal(parseAmount("không phải số"), null);
});
