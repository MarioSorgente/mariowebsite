import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import AmberCascades from './AmberCascades';
import Navigation from './Navigation';
import Button from '../components/Button';
import { findService, services, servicesSection } from '../data/services';
import { SITE_URL, usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { track } from '../lib/analytics';
import { buildContactHref, CONTACT_EMAIL } from '../lib/contact';
import { useEngagement } from '../lib/engagement';

function ServiceNotFound() {
  return (
    <div className="article-page" style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: 20 }}>Service not found.</p>
        <Button href="/" variant="ghost">
          Back to home
        </Button>
      </div>
    </div>
  );
}

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = findService(serviceId);
  return service ? <ServiceArticle key={service.id} id={service.id} /> : <ServiceNotFound />;
}

/**
 * One paid offer, in the order a buyer needs it: the offer, who it fits, the
 * scope, the deliverables, the format, how success is judged, then contact.
 */
function ServiceArticle({ id }: { id: string }) {
  const service = findService(id)!;
  const pageRef = useReveal<HTMLDivElement>({ stagger: 70, threshold: 0.05 });
  const { selectService } = useEngagement();

  usePageMeta({
    title: `${service.title}, Zero2Hero`,
    description: service.metaDescription,
    canonical: `${SITE_URL}/services/${service.id}`,
  });

  // Arriving here is a fractional intent for this service, however the visitor
  // got here, so the home page contact section picks it up afterwards.
  useEffect(() => {
    selectService(service.id);
    track('service_viewed', { service_id: service.id, mode: 'fractional' });
  }, [service.id, selectService]);

  const index = services.findIndex((item) => item.id === service.id);
  const prev = index > 0 ? services[index - 1] : null;
  const next = index < services.length - 1 ? services[index + 1] : null;

  const onContact = () =>
    track('contact_clicked', {
      mode: 'fractional',
      service_id: service.id,
      location: 'service-page',
      channel: 'email',
    });

  return (
    <div className="article-page" ref={pageRef}>
      <div className="article-atmos" aria-hidden="true">
        <AmberCascades />
      </div>

      <Navigation />

      <div className="article-body">
        <header className="article-hero">
          <p className="eyebrow" data-reveal="up">
            {servicesSection.eyebrow}
          </p>
          {service.badge && (
            <p className="service-detail__badge" data-reveal="up">
              {service.badge}
            </p>
          )}
          <h1 data-reveal="up">{service.title}</h1>
          <p data-reveal="up">{service.cardCopy}</p>
        </header>

        <div className="article-meter">
          <hr className="rule" data-reveal="rule" />
        </div>

        <article className="service-detail">
          <p className="service-detail__intro" data-reveal="up">
            {service.intro}
          </p>

          <section className="service-detail__block" data-reveal="up">
            <h2>Best for</h2>
            <p>{service.bestFor}</p>
          </section>

          <section className="service-detail__block" data-reveal="up">
            <h2>{service.scopeHeading}</h2>
            <ul>
              {service.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="service-detail__block" data-reveal="up">
            <h2>What you receive</h2>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="service-detail__block" data-reveal="up">
            <h2>Format</h2>
            <p>{service.format}</p>
          </section>

          <section className="service-detail__block" data-reveal="up">
            <h2>How success is measured</h2>
            <p>{service.success}</p>
            {service.scopeBoundary && <p className="service-detail__boundary">{service.scopeBoundary}</p>}
          </section>

          <section className="service-detail__block service-detail__contact" data-reveal="up">
            <h2>Scope and fees</h2>
            <p>{servicesSection.pricingNote}</p>
            <div className="service-detail__actions">
              <Button
                href={buildContactHref('fractional', service.title)}
                onClick={onContact}
                icon={<ArrowUpRight size={16} />}
              >
                {service.cta}
              </Button>
            </div>
            <p className="service-detail__address">
              Or write directly to <span>{CONTACT_EMAIL}</span>
            </p>
          </section>
        </article>

        <nav className="article-nav" aria-label="Other services">
          {prev ? (
            <Link to={`/services/${prev.id}`} className="article-nav__link" data-reveal="up">
              <span>
                <ArrowLeft size={12} style={{ display: 'inline', marginRight: 6 }} aria-hidden="true" />
                Previous
              </span>
              <b>{prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/services/${next.id}`} className="article-nav__link article-nav__link--next" data-reveal="up">
              <span>
                Next
                <ArrowRight size={12} style={{ display: 'inline', marginLeft: 6 }} aria-hidden="true" />
              </span>
              <b>{next.title}</b>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
