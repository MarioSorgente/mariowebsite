import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import { navigationConfig } from '../config';
import Logo from '../components/Logo';
import { useEngagement } from '../lib/engagement';
import { useActiveSection, useScrollProgress } from '../hooks/useReveal';
import { scrollToSection } from '../lib/scroll';

/**
 * The site's one navigation bar. It shows the same links on every route, so
 * moving between the home page, the background page and a service page never
 * changes what is on offer. Sub-pages with sections of their own carry a
 * separate, subordinate strip instead; see components/SectionStrip.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const progressRef = useScrollProgress();
  const { mode, withEngagement } = useEngagement();

  const { links } = navigationConfig;
  const ctaText = navigationConfig.ctaText[mode];
  const onHome = location.pathname === '/';

  // Section highlighting only means anything on the page that owns those
  // sections, so away from home no hash link is tracked or highlighted.
  const hashIds = onHome
    ? links.filter((link) => link.href.startsWith('#')).map((link) => link.href.slice(1))
    : [];
  const activeId = useActiveSection(hashIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A locked page behind an open sheet stops the background from scrolling away.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (event: React.MouseEvent<HTMLElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);

    if (href.startsWith('/')) {
      navigate(withEngagement(href));
      return;
    }
    if (!onHome) {
      // Carry the hash (and a full-time mode) across the route change; App
      // scrolls to the hash on arrival.
      navigate(withEngagement(`/${href}`));
      return;
    }
    scrollToSection(document.querySelector(href));
  };

  const isLinkActive = (href: string) =>
    href.startsWith('/') ? location.pathname === href : onHome && href.slice(1) === activeId;

  const renderLinks = (inSheet: boolean) =>
    links.map((link, index) => {
      const isActive = isLinkActive(link.href);
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(event) => go(event, link.href)}
          className={`nav-link${isActive ? ' is-active' : ''}`}
          style={inSheet ? ({ '--i': index } as React.CSSProperties) : undefined}
          aria-current={isActive ? 'page' : undefined}
        >
          <span>{mode === 'full-time' && link.fullTimeLabel ? link.fullTimeLabel : link.label}</span>
          {inSheet && <ArrowUpRight size={16} aria-hidden="true" />}
        </a>
      );
    });

  const ctaHref = '#contact';

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="shell site-nav__inner">
        <a
          href={onHome ? '#hero' : '/'}
          onClick={(event) => go(event, onHome ? '#hero' : '/')}
          className="site-nav__brand"
          aria-label="Zero2Hero home"
        >
          <Logo />
        </a>

        <div className="site-nav__links">{renderLinks(false)}</div>

        <Button
          href={ctaHref}
          onClick={(event) => go(event, ctaHref)}
          className="site-nav__cta"
          icon={<ArrowUpRight size={16} />}
        >
          {ctaText}
        </Button>

        <button
          type="button"
          className={`site-nav__burger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
          <i />
        </button>
      </div>

      <div className={`site-nav__sheet${menuOpen ? ' is-open' : ''}`}>
        <div>
          <div className="shell site-nav__sheet-inner">
            {renderLinks(true)}
            <Button href={ctaHref} onClick={(event) => go(event, ctaHref)} icon={<ArrowUpRight size={16} />}>
              {ctaText}
            </Button>
          </div>
        </div>
      </div>

      <div ref={progressRef} className="site-nav__progress" style={{ transform: 'scaleX(0)' }} />
    </nav>
  );
}
