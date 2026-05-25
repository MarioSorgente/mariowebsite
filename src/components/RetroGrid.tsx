import { useRef, useEffect } from 'react';

export default function RetroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const horizonY = height * 0.12;
      const centerX = width / 2;

      ctx.clearRect(0, 0, width, height);

      // Subtle one-direction motion loop: phase only increases and wraps.
      phase = (phase + 0.0035) % 1;

      ctx.strokeStyle = 'rgba(96, 165, 250, 0.14)';
      ctx.lineWidth = 1;

      // Perspective verticals.
      const columns = 36;
      const spread = width * 0.95;
      for (let i = -columns; i <= columns; i++) {
        const xNorm = i / columns;
        const xBase = centerX + xNorm * spread;
        const xFar = centerX + xNorm * spread * 0.06;

        ctx.beginPath();
        ctx.moveTo(xBase, height);
        ctx.lineTo(xFar, horizonY);
        ctx.stroke();
      }

      // Infinite forward-moving horizontals (never reverse).
      const rows = 34;
      for (let i = 0; i <= rows; i++) {
        const depth = ((i / rows) + phase) % 1;
        const eased = depth * depth;
        const y = horizonY + (height - horizonY) * eased;
        if (y <= horizonY + 1 || y >= height) continue;

        const alpha = 0.03 + depth * 0.12;
        ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const gradient = ctx.createLinearGradient(0, horizonY, 0, height);
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.03)');
      gradient.addColorStop(0.45, 'rgba(96, 165, 250, 0.05)');
      gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '45vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
