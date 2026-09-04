import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import { navigationConfig } from '../config';
import Logo from '../components/Logo';
import { useActiveSection, useScrollProgress } from '../hooks/useReveal';

const backgroundLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Experience', href: '#experience' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const progressRef = useScrollProgress();

  const onBackground = location.pathname === '/background';
  const links = onBackground ? backgroundLinks : navigationConfig.links;
  const activeId = useActiveSection(
    links.filter((link) => link.href.startsWith('#')).map((link) => link.href.slice(1))
  );

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
      navigate(href);
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ctaHref = onBackground ? 'https://www.linkedin.com/in/mario-sorgente' : '#footer';
  const ctaLabel = onBackground ? 'Connect on LinkedIn' : navigationConfig.ctaText;

  const renderLinks = (inSheet: boolean) =>
    links.map((link, index) => {
      const isActive = link.href.startsWith('#') && link.href.slice(1) === activeId;
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(event) => go(event, link.href)}
          className={`nav-link${isActive ? ' is-active' : ''}`}
          style={inSheet ? ({ '--i': index } as React.CSSProperties) : undefined}
          aria-current={isActive ? 'true' : undefined}
        >
          <span>{link.label}</span>
          {inSheet && <ArrowUpRight size={16} aria-hidden="true" />}
        </a>
      );
    });

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="shell site-nav__inner">
        <a
          href={onBackground ? '/' : '#hero'}
          onClick={(event) => go(event, onBackground ? '/' : '#hero')}
          className="site-nav__brand"
          aria-label="Zero2Hero home"
        >
          <Logo />
        </a>

        <div className="site-nav__links">{renderLinks(false)}</div>

        <Button
          href={ctaHref}
          onClick={onBackground ? undefined : (event) => go(event, ctaHref)}
          target={onBackground ? '_blank' : undefined}
          rel={onBackground ? 'noopener noreferrer' : undefined}
          className="site-nav__cta"
          icon={<ArrowUpRight size={16} />}
        >
          {ctaLabel}
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
            <Button
              href={ctaHref}
              onClick={onBackground ? undefined : (event) => go(event, ctaHref)}
              target={onBackground ? '_blank' : undefined}
              rel={onBackground ? 'noopener noreferrer' : undefined}
              icon={<ArrowUpRight size={16} />}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>

      <div ref={progressRef} className="site-nav__progress" style={{ transform: 'scaleX(0)' }} />
    </nav>
  );
}
