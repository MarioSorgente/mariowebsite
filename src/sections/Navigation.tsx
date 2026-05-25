import { useEffect, useState } from 'react';
import { siteConfig, navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (!siteConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(8, 15, 28, 0.78)' : 'rgba(8, 15, 28, 0.42)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(167, 186, 223, 0.18)',
      }}
    >
      <div className="flex items-center justify-between" style={{ minHeight: 80, padding: '0 5vw' }}>
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="no-underline"
          style={{
            fontFamily: "'GeistMono', monospace",
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: '-0.5px',
            color: '#f0f6ff',
          }}
        >
          {siteConfig.brandName}
        </a>

        <div className="hidden md:flex items-center" style={{ gap: 40 }}>
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </div>

        {navigationConfig.ctaText && (
          <a
            href="#footer"
            onClick={(e) => handleClick(e, '#footer')}
            className="nav-cta hidden md:inline-flex"
          >
            {navigationConfig.ctaText}
          </a>
        )}

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          style={{ color: '#d4e4ff', fontSize: 26, lineHeight: 1 }}
        >
          {mobileMenuOpen ? '×' : '☰'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col" style={{ padding: '0 5vw 20px', gap: 14 }}>
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-link"
              style={{ width: 'fit-content' }}
            >
              {link.label}
            </a>
          ))}
          {navigationConfig.ctaText && (
            <a
              href="#footer"
              onClick={(e) => handleClick(e, '#footer')}
              className="nav-cta inline-flex"
              style={{ width: 'fit-content', marginTop: 4 }}
            >
              {navigationConfig.ctaText}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
