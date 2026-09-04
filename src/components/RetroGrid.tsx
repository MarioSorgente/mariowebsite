import { useEffect, useRef } from 'react';

/**
 * The perspective floor under the hero. Horizontals travel toward the viewer on
 * an eased depth curve so the motion reads as forward travel, never a rewind.
 */
export default function RetroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let phase = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const horizonY = height * 0.1;
      const centerX = width / 2;

      ctx.clearRect(0, 0, width, height);
      if (!prefersReduced) phase = (phase + 0.0028) % 1;

      // Vanishing-point verticals, brighter toward the centre of the floor.
      const columns = 34;
      const spread = width * 0.98;
      for (let i = -columns; i <= columns; i++) {
        const norm = i / columns;
        const fade = 1 - Math.abs(norm) * 0.75;
        ctx.strokeStyle = `rgba(120, 178, 255, ${0.03 + fade * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + norm * spread, height);
        ctx.lineTo(centerX + norm * spread * 0.05, horizonY);
        ctx.stroke();
      }

      const rows = 32;
      for (let i = 0; i <= rows; i++) {
        const depth = (i / rows + phase) % 1;
        const eased = depth * depth;
        const y = horizonY + (height - horizonY) * eased;
        if (y <= horizonY + 1 || y >= height) continue;

        // Rows warm up as they approach, tying the floor to the accent.
        const alpha = 0.025 + depth * 0.13;
        ctx.strokeStyle =
          depth > 0.74
            ? `rgba(255, 154, 84, ${alpha * 0.8})`
            : `rgba(120, 178, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const wash = ctx.createLinearGradient(0, horizonY, 0, height);
      wash.addColorStop(0, 'rgba(108, 198, 255, 0.05)');
      wash.addColorStop(0.5, 'rgba(108, 198, 255, 0.04)');
      wash.addColorStop(1, 'rgba(255, 138, 61, 0.03)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      raf = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '46vh',
        pointerEvents: 'none',
        maskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)',
      }}
    />
  );
}
