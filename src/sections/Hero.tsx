import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import AmberCascades from './AmberCascades';
import RetroGrid from '../components/RetroGrid';
import SocialIcons from '../components/SocialIcons';
import Button from '../components/Button';
import { heroConfig } from '../config';
import { scrollToSection } from '../lib/scroll';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  // The hero owns the first screen, so it plays on load rather than on scroll.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Pointer parallax nudges the aurora blooms without moving the type.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      frame = 0;
      section.style.setProperty('--pointer-x', `${targetX.toFixed(2)}px`);
      section.style.setProperty('--pointer-y', `${targetY.toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      const { width, height } = section.getBoundingClientRect();
      targetX = (event.clientX / width - 0.5) * 40;
      targetY = (event.clientY / height - 0.5) * 30;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    section.addEventListener('pointermove', onMove);
    return () => {
      section.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!heroConfig.title) return null;

  const titleLines = heroConfig.title.split(' ');
  const [claimHead, ...claimRest] = heroConfig.subtitleLine2.split('.');

  const scrollTo = (selector: string) => scrollToSection(document.querySelector(selector));

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div className="hero__canvas">
        <AmberCascades />
        <RetroGrid />
      </div>

      <div
        className="hero__aurora hero__aurora--ember"
        style={{ translate: 'var(--pointer-x, 0) var(--pointer-y, 0)' }}
        aria-hidden="true"
      />
      <div
        className="hero__aurora hero__aurora--azure"
        style={{ translate: 'calc(var(--pointer-x, 0) * -1) calc(var(--pointer-y, 0) * -1)' }}
        aria-hidden="true"
      />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="shell hero__shell">
        <div className="hero__grid">
          <div className="hero__copy">
            {heroConfig.status && (
              <div className={`hero__status line-mask${entered ? ' is-in' : ''}`}>
                <span>
                  <span className="status-pill">
                    <i aria-hidden="true" />
                    {heroConfig.status}
                  </span>
                </span>
              </div>
            )}

            <h1 className="hero__title">
              {titleLines.map((word, index) => (
                <span
                  key={word}
                  className={`line-mask${entered ? ' is-in' : ''}`}
                  style={{ '--reveal-delay': `${120 + index * 110}ms` } as React.CSSProperties}
                >
                  <span className="hero__title-word">{word}</span>
                </span>
              ))}
            </h1>

            {heroConfig.role && (
              <span
                className={`hero__role line-mask${entered ? ' is-in' : ''}`}
                style={{ '--reveal-delay': '480ms' } as React.CSSProperties}
              >
                <span>{heroConfig.role}</span>
              </span>
            )}

            {heroConfig.subtitleLine1 && <p className="hero__lede">{heroConfig.subtitleLine1}</p>}

            {heroConfig.subtitleLine2 && (
              <p className="hero__claim">
                <mark>{claimHead}.</mark>
                {claimRest.join('.')}
              </p>
            )}

            <SocialIcons />

            <div className="hero__actions">
              <Button onClick={() => scrollTo('#curriculum')} icon={<ArrowRight size={16} />}>
                {heroConfig.ctaText}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollTo('#blog')}
                icon={<ArrowRight size={16} />}
              >
                {heroConfig.secondaryCtaText}
              </Button>
            </div>
          </div>

          {heroConfig.stats.length > 0 && (
            <div className="hero__stats">
              {heroConfig.stats.map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="hero__cue"
        onClick={() => scrollTo('#curriculum')}
        aria-label="Scroll to services"
      >
        <i aria-hidden="true" />
        <ArrowDown size={14} aria-hidden="true" />
      </button>
    </section>
  );
}
