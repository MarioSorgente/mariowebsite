import { useRef, useEffect, useState } from 'react';
import AmberCascades from './AmberCascades';
import LiquidGlassButton from '../components/LiquidGlassButton';
import SocialIcons from '../components/SocialIcons';
import RetroGrid from '../components/RetroGrid';
import { heroConfig } from '../config';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleWidth, setTitleWidth] = useState<number>(0);

  useEffect(() => {
    const measure = () => {
      if (titleRef.current) setTitleWidth(titleRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  if (!heroConfig.title) {
    return null;
  }

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <AmberCascades />
      <RetroGrid />
      <SocialIcons />

      <div
        className="relative z-10 flex flex-col justify-between pointer-events-none"
        style={{
          height: '100%',
          padding: '22vh 5vw 8vh',
        }}
      >
        <div>
          <h1
            ref={titleRef}
            className="text-white"
            style={{
              fontFamily: "'GeistMono', monospace",
              fontWeight: 400,
              fontSize: 'clamp(48px, 6vw, 96px)',
              lineHeight: 1.0,
              letterSpacing: '-3px',
              textShadow: '0 4px 24px rgba(0,0,0,0.8)',
              marginBottom: 'clamp(16px, 2vw, 24px)',
              width: 'fit-content',
            }}
          >
            {heroConfig.title}
          </h1>

          <div
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#60a5fa',
              opacity: 0.9,
              width: titleWidth || 'auto',
              maxWidth: '100%',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            Senior Product Builder
          </div>

          {heroConfig.subtitleLine1 && (
            <p
              style={{
                fontFamily: "'GeistMono', monospace",
                fontWeight: 200,
                fontSize: 'clamp(14px, 1.4vw, 20px)',
                lineHeight: 1.8,
                letterSpacing: '-0.3px',
                color: '#e5e5e5',
                margin: '0 0 16px 0',
                width: titleWidth || 'auto',
                maxWidth: '100%',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              {heroConfig.subtitleLine1}
            </p>
          )}
          {heroConfig.subtitleLine2 && (
            <p
              style={{
                fontFamily: "'GeistMono', monospace",
                fontWeight: 300,
                fontSize: 'clamp(15px, 1.5vw, 22px)',
                lineHeight: 1.7,
                letterSpacing: '-0.3px',
                color: '#ffffff',
                margin: 0,
                width: titleWidth || 'auto',
                maxWidth: '100%',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(96, 165, 250, 0.5)', textUnderlineOffset: '4px' }}>
                {heroConfig.subtitleLine2.split('.')[0]}.
              </span>
              {heroConfig.subtitleLine2.split('.').slice(1).join('.')}
            </p>
          )}
        </div>

        {heroConfig.ctaText && (
          <div style={{ display: 'flex', justifyContent: 'center' }} className="pointer-events-auto">
            <LiquidGlassButton
              onClick={() => {
                document.querySelector('#curriculum')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heroConfig.ctaText}
            </LiquidGlassButton>
          </div>
        )}
      </div>
    </section>
  );
}
