import { useEffect, useRef } from 'react';

const LINES = 26;
const STEP = 14;

/**
 * A slow field of contour lines that drift like silk behind the statement.
 *
 * Displacement comes from summed sine waves rather than a noise library, which
 * keeps the whole effect dependency-free and cheap enough to run at 60fps. The
 * loop only runs while the canvas is on screen.
 */
export default function SilkFlow() {
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
    let visible = false;
    let time = prefersReduced ? 8 : 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const stroke = ctx.createLinearGradient(0, 0, width, height);
      stroke.addColorStop(0, 'rgba(108, 198, 255, 0.7)');
      stroke.addColorStop(0.5, 'rgba(255, 138, 61, 0.95)');
      stroke.addColorStop(1, 'rgba(108, 198, 255, 0.52)');

      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      for (let i = 0; i < LINES; i++) {
        const t = i / (LINES - 1);
        const baseY = height * (0.12 + t * 0.76);

        // Three sines at different scales read as organic drift without noise.
        const amp = 26 + Math.sin(t * Math.PI) * 54;
        const phase = t * 2.6 + time * 0.16;

        ctx.beginPath();
        for (let x = 0; x <= width + STEP; x += STEP) {
          const n =
            Math.sin(x * 0.0016 + phase) * 0.6 +
            Math.sin(x * 0.0041 - phase * 1.35) * 0.28 +
            Math.sin(x * 0.0093 + phase * 0.65) * 0.12;
          const y = baseY + n * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Lines fade towards the top and bottom edges of the band.
        ctx.globalAlpha = 0.14 + Math.sin(t * Math.PI) * 0.5;
        ctx.strokeStyle = stroke;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      time += 0.006;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || prefersReduced) return;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    // Idle while the section is nowhere near the viewport.
    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: '20% 0px' }
    );
    seen.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="silk-flow" aria-hidden="true" />;
}
