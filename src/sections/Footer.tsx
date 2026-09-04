import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { footerConfig } from '../config';
import { LogoStacked } from '../components/Logo';
import { useReveal } from '../hooks/useReveal';

export default function Footer() {
  const footerRef = useReveal<HTMLElement>({ stagger: 80, threshold: 0.05 });

  if (!footerConfig.heading && footerConfig.columns.length === 0) return null;

  const [headingHead, ...headingRest] = footerConfig.heading.split(' ');

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" ref={footerRef} className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div>
            <p className="eyebrow" data-reveal="up">
              {footerConfig.eyebrow}
            </p>
            <h2 className="site-footer__heading" data-reveal="up">
              {headingHead} <em>{headingRest.join(' ')}</em>
            </h2>
            <p className="site-footer__blurb" data-reveal="up">
              {footerConfig.blurb}
            </p>
          </div>

          <a href={footerConfig.ctaHref} className="contact-plate" data-reveal="scale">
            <span className="contact-plate__label">Write to me</span>
            <span className="contact-plate__value">
              {footerConfig.ctaText}
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="site-footer__columns">
          {footerConfig.columns.map((column) => (
            <div key={column.title} className="footer-col" data-reveal="up" data-reveal-group="cols">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href}>
                        {link.label}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <small>{footerConfig.copyright}</small>
          <div className="site-footer__bottom-links">
            {footerConfig.bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href || '#'}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
            <button type="button" className="to-top" onClick={toTop}>
              <ArrowUp size={13} aria-hidden="true" />
              Top
            </button>
          </div>
        </div>

        <div className="site-footer__sign" aria-hidden="true">
          <LogoStacked />
        </div>
      </div>
    </footer>
  );
}
