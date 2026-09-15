import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import AmberCascades from './AmberCascades';
import RetroGrid from '../components/RetroGrid';
import SocialIcons from '../components/SocialIcons';
import Button from '../components/Button';
import EngagementSelector from '../components/EngagementSelector';
import ModePanels from '../components/ModePanels';
import { heroConfig, type HeroModeCopy } from '../config';
import { useEngagement } from '../lib/engagement';
import { scrollToSection } from '../lib/scroll';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();
  const { withEngagement } = useEngagement();

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

  const scrollTo = (selector: string) => scrollToSection(document.querySelector(selector));

  const follow = (href: string) => {
    if (href.startsWith('/')) navigate(withEngagement(href));
    else scrollTo(href);
  };

  const mask = entered ? ' is-in' : '';

  const renderCopy = (copy: HeroModeCopy) => {
    const words = copy.headline.split(' ');
    return (
      <>
        <div className={`hero__status line-mask${mask}`}>
          <span>
            <span className="status-pill">
              <i aria-hidden="true" />
              {copy.availability}
            </span>
          </span>
        </div>

        <span
          className={`hero__role line-mask${mask}`}
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          <span>{copy.eyebrow}</span>
        </span>

        <h1 className="hero__title hero__title--sentence">
          {words.map((word, index) => (
            // Headlines repeat words ("a", "your"), so the index is the key. The
            // trailing space is a real text node, so the line wraps and reads as prose.
            <span key={index}>
              <span
                className={`line-mask${mask}`}
                style={{ '--reveal-delay': `${140 + index * 45}ms` } as React.CSSProperties}
              >
                <span className="hero__title-word">{word}</span>
              </span>
              {index < words.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <p className="hero__lede">{copy.body}</p>
        <p className="hero__claim">{copy.supporting}</p>

        <SocialIcons />

        <div className="hero__actions">
          <Button onClick={() => scrollTo('#contact')} icon={<ArrowRight size={16} />}>
            {copy.primaryCta}
          </Button>
          <Button
            variant="ghost"
            href={copy.secondaryHref.startsWith('/') ? withEngagement(copy.secondaryHref) : copy.secondaryHref}
            onClick={(event) => {
              event.preventDefault();
              follow(copy.secondaryHref);
            }}
            icon={<ArrowRight size={16} />}
          >
            {copy.secondaryCta}
          </Button>
        </div>
      </>
    );
  };

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
            {/* Outside the mode panels, so a change never removes the focused radio. */}
            <EngagementSelector />

            <ModePanels
              fractional={renderCopy(heroConfig.modes.fractional)}
              fullTime={renderCopy(heroConfig.modes['full-time'])}
            />
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
        onClick={() => scrollTo('#services')}
        aria-label="Scroll to services"
      >
        <i aria-hidden="true" />
        <ArrowDown size={14} aria-hidden="true" />
      </button>
    </section>
  );
}
