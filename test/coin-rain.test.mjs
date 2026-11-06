import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/hooks/useCoinRain.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

function setup(reducedMotion = false) {
  let now = 0;
  let draws = 0;
  let cleanup;
  let nextId = 0;
  const frames = new Map();
  const context = {
    clearRect() {}, setTransform() {}, save() {}, translate() {},
    rotate() {}, restore() {}, fillText() { draws++; },
  };
  const canvas = { getContext: () => context };
  const effects = [];
  let refIndex = 0;
  const sandbox = {
    exports: {},
    require: () => ({
      useRef: (value) => ({ current: refIndex++ === 0 ? canvas : value }),
      useCallback: (fn) => fn,
      useEffect: (fn) => effects.push(fn),
    }),
    innerWidth: 390, innerHeight: 844, devicePixelRatio: 3,
    performance: { now: () => now },
    matchMedia: () => ({ matches: reducedMotion }),
    addEventListener() {}, removeEventListener() {},
    requestAnimationFrame: (fn) => { frames.set(++nextId, fn); return nextId; },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  vm.runInNewContext(source, sandbox);
  const { burst } = sandbox.exports.useCoinRain();
  for (const effect of effects) cleanup = effect();
  return {
    burst, canvas, frames,
    advance(ms) { now += ms; },
    frame() {
      draws = 0;
      const pending = [...frames.values()];
      frames.clear();
      for (const fn of pending) fn();
      return draws;
    },
    cleanup: () => cleanup(),
  };
}

test("rapid clicks keep particle work bounded and use a single animation loop", () => {
  const fx = setup();
  fx.burst(20);
  for (let i = 0; i < 1000; i++) fx.burst(90);
  assert.equal(fx.frames.size, 1);
  assert.equal(fx.frame(), 20);
  fx.advance(300);
  fx.burst(90);
  assert.equal(fx.frame(), 60);
  for (let i = 0; i < 1000; i++) { fx.advance(300); fx.burst(90); }
  assert.equal(fx.frames.size, 1);
  assert.equal(fx.frame(), 60);
  for (let i = 0; i < 401; i++) fx.frame();
  assert.equal(fx.frames.size, 0);
  fx.burst(20);
  assert.equal(fx.frames.size, 1);
  fx.cleanup();
  assert.equal(fx.frames.size, 0);
  assert.equal(fx.canvas.width, 585);
});

test("reduced motion skips particle animations", () => {
  const fx = setup(true);
  fx.burst(90);
  assert.equal(fx.frames.size, 0);
  fx.cleanup();
});
