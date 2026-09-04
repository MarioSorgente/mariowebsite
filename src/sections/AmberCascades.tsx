import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  pulse: number;
}

const LINK_DISTANCE = 185;

/**
 * The drifting constellation behind the hero: a slow node network, a few
 * signal waves and a horizon line. Sized from its own box rather than the
 * window so it always matches the section it fills.
 */
export default function AmberCascades() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999 };

    const seedNodes = () => {
      const count = Math.min(40, Math.max(14, Math.round(width / 52)));
      nodes = Array.from({ length: count }, () => {
        const depth = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * width,
          y: Math.random() * height * 0.82,
          vx: (Math.random() - 0.5) * 0.12 * depth,
          vy: (Math.random() - 0.5) * 0.08 * depth,
          radius: (0.8 + Math.random() * 1.9) * depth,
          depth,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const drawWaves = (time: number) => {
      for (let i = 0; i < 5; i++) {
        const baseY = height * (0.18 + i * 0.12);
        const amplitude = 7 + i * 2.4;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const y = baseY + Math.sin(x * 0.0038 + time * 0.14 + i * 0.85) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(120, 190, 255, ${0.075 - i * 0.011})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawHorizon = (time: number) => {
      const baseY = height * 0.8;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.011 + time * 0.4) * 1.7 +
          Math.sin(x * 0.024 + time * 0.26) * 0.9;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const glow = ctx.createLinearGradient(0, 0, width, 0);
      glow.addColorStop(0, 'rgba(138, 205, 255, 0.04)');
      glow.addColorStop(0.5, 'rgba(255, 154, 84, 0.3)');
      glow.addColorStop(1, 'rgba(138, 205, 255, 0.04)');
      ctx.strokeStyle = glow;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(255, 138, 61, 0.3)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const render = (timestamp: number) => {
      const time = timestamp * 0.001;
      ctx.clearRect(0, 0, width, height);

      drawWaves(time);

      // Links first so the nodes sit on top of their own web.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance >= LINK_DISTANCE) continue;
          const alpha = (1 - distance / LINK_DISTANCE) * 0.11;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(132, 196, 255, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        if (!prefersReduced) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.012;

          // A gentle lean toward the pointer, strongest for the near layer.
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 220 && distance > 0.01) {
            const pull = ((220 - distance) / 220) * 0.35 * node.depth;
            node.x += (dx / distance) * pull;
            node.y += (dy / distance) * pull;
          }

          if (node.x < -30) node.x = width + 30;
          if (node.x > width + 30) node.x = -30;
          if (node.y < 24) node.y = 24;
          if (node.y > height * 0.84) node.y = height * 0.84;
        }

        const brightness = 0.18 + (Math.sin(node.pulse) + 1) * 0.16 * node.depth;
        // The warm accent is reserved for the nearest, brightest nodes.
        const warm = node.depth > 0.86;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = warm
          ? `rgba(255, 176, 112, ${brightness})`
          : `rgba(158, 214, 255, ${brightness})`;
        ctx.shadowColor = warm ? 'rgba(255, 138, 61, 0.55)' : 'rgba(108, 198, 255, 0.5)';
        ctx.shadowBlur = 9 * node.depth;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      drawHorizon(time);
      raf = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    raf = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
