import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import ModePanels from '../components/ModePanels';
import { contactConfig, footerConfig, type ContactModeCopy } from '../config';
import { findService } from '../data/services';
import { LogoStacked } from '../components/Logo';
import { useReveal } from '../hooks/useReveal';
import { track } from '../lib/analytics';
import { BOOKING_URL, buildContactHref, CONTACT_EMAIL } from '../lib/contact';
import { useEngagement, type EngagementMode } from '../lib/engagement';

const isOfferPage = (href: string) => href.startsWith('/services/') || href.startsWith('/capability/');

export default function Footer() {
  const footerRef = useReveal<HTMLElement>({ stagger: 80, threshold: 0.05 });
  const { serviceId, withEngagement } = useEngagement();
  const service = findService(serviceId);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const renderContact = (panelMode: EngagementMode, copy: ContactModeCopy) => {
    // Both panels stay mounted, so each builds the intent for its own mode. The
    // service only ever reaches the fractional enquiry.
    const serviceTitle = panelMode === 'fractional' ? service?.title ?? '' : '';
    const group = `contact-${panelMode}`;
    const onContact = (channel: 'email' | 'booking') =>
      track('contact_clicked', {
        mode: panelMode,
        service_id: panelMode === 'fractional' ? service?.id ?? null : null,
        location: 'contact',
        channel,
      });

    return (
      <div className="site-footer__top">
        <div>
          <p className="eyebrow" data-reveal="up" data-reveal-group={group}>
            {contactConfig.eyebrow}
          </p>
          <h2 className="site-footer__heading site-footer__heading--contact" data-reveal="up" data-reveal-group={group}>
            {copy.heading}
          </h2>
          <p className="site-footer__blurb" data-reveal="up" data-reveal-group={group}>
            {copy.body}
          </p>
          {(copy.secondaryAction || BOOKING_URL) && (
            <p className="site-footer__actions" data-reveal="up" data-reveal-group={group}>
              {BOOKING_URL && panelMode === 'fractional' && (
                <a
                  className="link-underline"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onContact('booking')}
                >
                  {contactConfig.bookingLabel}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {copy.secondaryAction && (
                <Link className="link-underline" to={withEngagement(copy.secondaryAction.href)}>
                  {copy.secondaryAction.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              )}
            </p>
          )}
        </div>

        <div data-reveal="scale" data-reveal-group={group}>
          <a
            href={buildContactHref(panelMode, serviceTitle)}
            className="contact-plate"
            onClick={() => onContact('email')}
          >
            <span className="contact-plate__label">{copy.primaryAction}</span>
            <span className="contact-plate__value">
              {CONTACT_EMAIL}
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
            {serviceTitle && <span className="contact-plate__service">About: {serviceTitle}</span>}
          </a>
          {/* Plain text as well, for anyone without a mail client set up. */}
          <p className="site-footer__address">
            Or write directly to <span>{CONTACT_EMAIL}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    // The id sits on the footer itself: useActiveSection reads offsetTop, which
    // an element nested inside this positioned footer would report relative to it.
    <footer id="contact" ref={footerRef} className="site-footer">
      <div className="shell">
        <ModePanels
          fractional={renderContact('fractional', contactConfig.modes.fractional)}
          fullTime={renderContact('full-time', contactConfig.modes['full-time'])}
        />

        <div className="site-footer__columns">
          {footerConfig.columns.map((column) => (
            <div key={column.title} className="footer-col" data-reveal="up" data-reveal-group="cols">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      // Offer pages are fractional by definition, so only other
                      // routes carry a full-time mode along.
                      <Link to={isOfferPage(link.href) ? link.href : withEngagement(link.href)}>
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
