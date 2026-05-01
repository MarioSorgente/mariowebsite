import { useRef, useEffect } from 'react';

export default function RetroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const horizonY = height * 0.55;

      ctx.clearRect(0, 0, width, height);

      // Grid parameters
      const gridSize = 60;
      const speed = 0.02;
      time += speed;

      // Draw vertical lines with perspective
      const centerX = width / 2;
      const vanishingPointY = horizonY - height * 0.15;

      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
      ctx.lineWidth = 1;

      // Vertical perspective lines
      for (let i = -20; i <= 20; i++) {
        const xBase = centerX + i * gridSize;
        const xFar = centerX + i * gridSize * 0.15;

        ctx.beginPath();
        ctx.moveTo(xBase, height);
        ctx.lineTo(xFar, vanishingPointY);
        ctx.stroke();
      }

      // Horizontal lines with perspective spacing
      const horizontalLines = 25;
      for (let i = 0; i < horizontalLines; i++) {
        const t = i / horizontalLines;
        const y = height - (height - vanishingPointY) * (t * t);
        const offset = ((time * 2) % 1) * ((height - vanishingPointY) / horizontalLines);
        const yWithOffset = y - offset;

        if (yWithOffset > vanishingPointY && yWithOffset < height) {
          ctx.beginPath();
          ctx.moveTo(0, yWithOffset);
          ctx.lineTo(width, yWithOffset);
          ctx.stroke();
        }
      }

      // Draw horizon glow
      const gradient = ctx.createLinearGradient(0, vanishingPointY, 0, height);
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.05)');
      gradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.02)');
      gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, vanishingPointY, width, height - vanishingPointY);

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
