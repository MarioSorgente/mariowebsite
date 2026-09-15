import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import CardGrid from '../components/CardGrid';
import ModePanels from '../components/ModePanels';
import { roleScopeConfig, secondaryCapabilities } from '../config';
import { services, servicesSection } from '../data/services';
import { useReveal } from '../hooks/useReveal';
import { track } from '../lib/analytics';
import { buildContactHref } from '../lib/contact';
import { useEngagement } from '../lib/engagement';
import { trackSpotlight } from '../lib/pointer';

/** Fractional: the four paid offers. Each card is a real link to its page. */
function ServiceOffers() {
  const { selectService } = useEngagement();

  return (
    <>
      <header className="section-head">
        <p className="eyebrow" data-reveal="up">
          {servicesSection.eyebrow}
        </p>
        <h2 className="section-title section-title--wide" data-reveal="up">
          {servicesSection.heading}
        </h2>
        <p className="section-lede" data-reveal="up">
          {servicesSection.intro}
        </p>
      </header>

      <ul className="offer-grid">
        {services.map((service, index) => (
          <li key={service.id} data-reveal="up" data-reveal-group="offers">
            <Link
              to={`/services/${service.id}`}
              className={`offer-card spotlight${service.badge ? ' offer-card--preferred' : ''}`}
              onPointerMove={trackSpotlight}
              onClick={() => selectService(service.id)}
            >
              <span className="offer-card__top">
                <span className="offer-card__index">{String(index + 1).padStart(2, '0')}</span>
                {service.badge && <span className="offer-card__badge">{service.badge}</span>}
              </span>
              <h3 className="offer-card__title">{service.title}</h3>
              <span className="offer-card__copy">{service.cardCopy}</span>
              <span className="offer-card__format">{service.format}</span>
              <span className="offer-card__go">
                {servicesSection.detailLabel}
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="section-note" data-reveal="up">
        {servicesSection.pricingNote}
      </p>

      <p className="services__secondary" data-reveal="up">
        {secondaryCapabilities.label}{' '}
        {secondaryCapabilities.links.map((link, index) => (
          <span key={link.href}>
            {index > 0 && ' · '}
            <Link className="link-underline" to={link.href}>
              {link.label}
            </Link>
          </span>
        ))}
      </p>
    </>
  );
}

/** Full-time: what the role can own. A recruitment path, so no durations or prices. */
function RoleScope() {
  const { eyebrow, heading, intro, cards, roleFit, cta } = roleScopeConfig;

  return (
    <>
      <header className="section-head">
        <p className="eyebrow" data-reveal="up">
          {eyebrow}
        </p>
        <h2 className="section-title section-title--wide" data-reveal="up">
          {heading}
        </h2>
        <p className="section-lede" data-reveal="up">
          {intro}
        </p>
      </header>

      <CardGrid cards={cards} group="role-scope" numbered />

      <p className="section-note" data-reveal="up">
        {roleFit}
      </p>

      <div data-reveal="up">
        <Button
          variant="ghost"
          href={buildContactHref('full-time')}
          onClick={() =>
            track('contact_clicked', {
              mode: 'full-time',
              service_id: null,
              location: 'role-scope',
              channel: 'email',
            })
          }
          icon={<ArrowUpRight size={16} />}
        >
          {cta}
        </Button>
      </div>
    </>
  );
}

export default function Curriculum() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 110 });

  return (
    <section id="services" ref={sectionRef} className="section services">
      <div className="shell">
        <ModePanels fractional={<ServiceOffers />} fullTime={<RoleScope />} />
      </div>
    </section>
  );
}
