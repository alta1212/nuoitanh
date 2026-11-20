import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
}

/** Mưa ngoài hiên: nền của cả trang, tắt khi khách chọn giảm chuyển động. */
export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let drops: Drop[] = [];
    let width = 0;
    let height = 0;
    const size = () => {
      width = canvas.width = innerWidth;
      height = canvas.height = innerHeight;
      const count = Math.min(240, Math.floor((width * height) / 6500));
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 8 + Math.random() * 16,
        speed: 6 + Math.random() * 8,
      }));
    };
    size();
    addEventListener("resize", size);

    let frame = requestAnimationFrame(function loop() {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(170,185,205,.28)";
      context.lineWidth = 1;
      context.beginPath();
      for (const drop of drops) {
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x - 1.5, drop.y + drop.length);
        drop.y += drop.speed;
        drop.x -= 0.4;
        if (drop.y > height) {
          drop.y = -20;
          drop.x = Math.random() * width;
        }
      }
      context.stroke();
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", size);
    };
  }, []);

  return (
    <>
      <canvas id="rain" ref={canvasRef} aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
