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
      style={{ minHeight: '100vh' }}
    >
      <AmberCascades />
      <RetroGrid />

      <div className="absolute inset-0 z-[2] pointer-events-none" style={{background: 'linear-gradient(90deg, rgba(10,18,33,0.68) 0%, rgba(10,18,33,0.52) 34%, rgba(10,18,33,0.16) 64%, rgba(10,18,33,0.06) 100%)'}} />

      <div
        className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-10 pb-16 md:px-[5vw] md:pt-[max(110px,16vh)] md:pb-[8vh] pointer-events-none"
      >
        <div className="w-full md:max-w-[min(92vw,760px)] md:pr-[clamp(0px,8vw,120px)]">
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'GeistMono', monospace",
              fontWeight: 400,
              fontSize: 'clamp(34px, 10vw, 96px)',
              lineHeight: 1.0,
              letterSpacing: 'clamp(-1px, -0.25vw, -3px)',
              color: '#ecf3ff',
              textShadow: '0 4px 24px rgba(0,0,0,0.35)',
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
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#7fb4ff',
              opacity: 1,
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
                lineHeight: 1.6,
                letterSpacing: '-0.3px',
                color: '#c0d1ee',
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
                fontSize: 'clamp(14px, 4.2vw, 22px)',
                lineHeight: 1.55,
                letterSpacing: '-0.3px',
                color: '#d7e6ff',
                margin: 0,
                width: titleWidth || 'auto',
                maxWidth: '100%',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(143, 176, 244, 0.55)', textUnderlineOffset: '4px' }}>
                {heroConfig.subtitleLine2.split('.')[0]}.
              </span>
              {heroConfig.subtitleLine2.split('.').slice(1).join('.')}
            </p>
          )}
        </div>

        {heroConfig.ctaText && (
          <div style={{ display: 'flex', justifyContent: 'center' }} className="pointer-events-auto mt-8 md:mt-0">
            <LiquidGlassButton
              onClick={() => {
                document.querySelector('#curriculum')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heroConfig.ctaText}
            </LiquidGlassButton>
          </div>
        )}

        <SocialIcons />
      </div>
    </section>
  );
}
