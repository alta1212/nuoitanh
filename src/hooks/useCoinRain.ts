import { useCallback, useEffect, useRef } from "react";

export interface BurstOrigin {
  clientX: number;
  clientY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  s: number;
  e: string;
  life: number;
}

const emojis = ["🪙", "💸", "💰", "🪙", "✨", "🍜", "🧋"];
const MAX_PARTICLES = 60;
const BURST_COOLDOWN_MS = 300;

export function useCoinRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parts = useRef<Particle[]>([]);
  const raf = useRef<number | null>(null);
  const lastBurst = useRef(-Infinity);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const size = () => {
      const scale = Math.min(devicePixelRatio, 1.5);
      canvas.width = innerWidth * scale;
      canvas.height = innerHeight * scale;
      canvas
        .getContext("2d")!
        .setTransform(scale, 0, 0, scale, 0, 0);
    };
    size();
    addEventListener("resize", size);
    return () => {
      removeEventListener("resize", size);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
      parts.current = [];
      lastBurst.current = -Infinity;
    };
  }, []);

  const loop = useCallback(() => {
    const cx = canvasRef.current!.getContext("2d")!;
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts.current.forEach((p) => {
      p.vy += 0.25;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life++;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate((p.r * Math.PI) / 180);
      cx.font = `${p.s}px serif`;
      cx.textAlign = "center";
      cx.fillText(p.e, 0, 0);
      cx.restore();
    });
    parts.current = parts.current.filter(
      (p) => p.y < innerHeight + 60 && p.life < 400,
    );
    if (parts.current.length) {
      raf.current = requestAnimationFrame(loop);
    } else {
      cx.clearRect(0, 0, innerWidth, innerHeight);
      raf.current = null;
    }
  }, []);

  const burst = useCallback(
    (count: number, origin?: BurstOrigin | null) => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const now = performance.now();
      const available = Math.min(Math.floor(count), MAX_PARTICLES - parts.current.length);
      if (!Number.isFinite(available) || available <= 0 || now - lastBurst.current < BURST_COOLDOWN_MS) return;
      lastBurst.current = now;
      const ox = origin?.clientX ?? innerWidth / 2;
      const oy = origin?.clientY ?? innerHeight / 2;
      for (let i = 0; i < available; i++) {
        const fromTop = i % 2 === 0;
        parts.current.push({
          x: fromTop ? Math.random() * innerWidth : ox,
          y: fromTop ? -30 - Math.random() * 200 : oy,
          vx: fromTop ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 12,
          vy: fromTop ? 2 + Math.random() * 3 : -6 - Math.random() * 8,
          r: Math.random() * 360,
          vr: (Math.random() - 0.5) * 10,
          s: 18 + Math.random() * 16,
          e: emojis[Math.floor(Math.random() * emojis.length)],
          life: 0,
        });
      }
      if (raf.current === null) loop();
    },
    [loop],
  );

  return { canvasRef, burst };
}
