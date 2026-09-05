import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import AmberCascades from './AmberCascades';
import { capabilityDetailConfig } from '../config';
import Button from '../components/Button';
import { useReveal } from '../hooks/useReveal';
import Navigation from './Navigation';

const SLUGS = Object.keys(capabilityDetailConfig.capabilities);

export default function CapabilityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pageRef = useReveal<HTMLDivElement>({ stagger: 80, threshold: 0.05 });

  const data = slug ? capabilityDetailConfig.capabilities[slug] : null;

  if (!data) {
    return (
      <div className="article-page" style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 20 }}>{capabilityDetailConfig.notFoundText || 'Not found.'}</p>
          <Button href="/" variant="ghost">
            {capabilityDetailConfig.backLinkText}
          </Button>
        </div>
      </div>
    );
  }

  const index = SLUGS.indexOf(slug!);
  const prevSlug = index > 0 ? SLUGS[index - 1] : null;
  const nextSlug = index < SLUGS.length - 1 ? SLUGS[index + 1] : null;

  return (
    <div className="article-page" ref={pageRef}>
      <div className="article-atmos" aria-hidden="true">
        <AmberCascades />
      </div>

      <Navigation />

      <div className="article-body">
        <header className="article-hero">
          <p className="eyebrow" data-reveal="up">
            {capabilityDetailConfig.sectionLabel}
          </p>
          <h1 data-reveal="up">{data.title}</h1>
          {data.subtitle && <p data-reveal="up">{data.subtitle}</p>}
        </header>

        <div className="article-meter">
          <hr className="rule" data-reveal="rule" />
        </div>

        <article className="article-prose">
          {data.paragraphs.map((paragraph, i) => (
            <p key={i} data-reveal="up" data-reveal-group="prose">
              {paragraph}
            </p>
          ))}

          <div data-reveal="up">
            <Button href="/#footer" icon={<ArrowUpRight size={16} />}>
              Start a conversation
            </Button>
          </div>
        </article>

        <nav className="article-nav" aria-label="Other services">
          {prevSlug ? (
            <a
              href={`/capability/${prevSlug}`}
              onClick={(event) => {
                event.preventDefault();
                navigate(`/capability/${prevSlug}`);
              }}
              className="article-nav__link"
              data-reveal="up"
            >
              <span>
                <ArrowLeft size={12} style={{ display: 'inline', marginRight: 6 }} aria-hidden="true" />
                {capabilityDetailConfig.prevLabel}
              </span>
              <b>{capabilityDetailConfig.capabilities[prevSlug].title}</b>
            </a>
          ) : (
            <span />
          )}
          {nextSlug ? (
            <a
              href={`/capability/${nextSlug}`}
              onClick={(event) => {
                event.preventDefault();
                navigate(`/capability/${nextSlug}`);
              }}
              className="article-nav__link article-nav__link--next"
              data-reveal="up"
            >
              <span>
                {capabilityDetailConfig.nextLabel}
                <ArrowRight size={12} style={{ display: 'inline', marginLeft: 6 }} aria-hidden="true" />
              </span>
              <b>{capabilityDetailConfig.capabilities[nextSlug].title}</b>
            </a>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
