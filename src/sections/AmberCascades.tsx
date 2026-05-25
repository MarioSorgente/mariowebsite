import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
};

export default function AmberCascades() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let nodes: Node[] = [];

    const createNodes = () => {
      const count = Math.max(12, Math.floor(width / 180));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.75,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.05,
        radius: 1 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const drawPaths = (time: number) => {
      const pathCount = 5;
      for (let i = 0; i < pathCount; i++) {
        const baseY = height * (0.2 + i * 0.11);
        const amp = 8 + i * 2;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y = baseY + Math.sin(x * 0.004 + time * 0.1 + i * 0.8) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(96, 208, 255, ${0.08 - i * 0.01})`;
        ctx.lineWidth = 1.1;
        ctx.shadowColor = 'rgba(96, 208, 255, 0.15)';
        ctx.shadowBlur = 10;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    };

    const render = (t: number) => {
      const time = t * 0.001;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(width * 0.85, height * 0.05, 50, width * 0.6, height * 0.45, width * 0.9);
      bg.addColorStop(0, 'rgba(84, 147, 255, 0.12)');
      bg.addColorStop(0.45, 'rgba(26, 46, 86, 0.08)');
      bg.addColorStop(1, 'rgba(12, 18, 30, 0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      drawPaths(time);

      for (const node of nodes) {
        if (!prefersReduced) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.01;

          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < 30) node.y = 30;
          if (node.y > height * 0.78) node.y = height * 0.78;
        }

        const glow = 0.2 + (Math.sin(node.pulse) + 1) * 0.15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(151, 223, 255, ${glow})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Keep a subtle horizontal animated line near grid horizon for continuity.
      const lineYBase = height * 0.78;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const y = lineYBase + Math.sin(x * 0.012 + time * 0.45) * 1.6 + Math.sin(x * 0.026 + time * 0.28) * 0.9;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(138, 205, 255, 0.24)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(104, 194, 255, 0.24)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(124, 204, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
