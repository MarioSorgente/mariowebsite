import { ArrowDown } from 'lucide-react';
import { credibilityConfig } from '../config';
import { recommendations } from '../data/recommendations';
import { useReveal } from '../hooks/useReveal';
import { scrollToSection } from '../lib/scroll';

/**
 * Verified experience and two recommendation excerpts, close to the hero. The
 * quotes are read from data/recommendations.ts by id, so the words here can
 * never drift from the full, verbatim versions further down the page.
 */
export default function Credibility() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const { eyebrow, facts, excerpts, linkText } = credibilityConfig;

  const quotes = excerpts.flatMap(({ recommendationId, paragraph }) => {
    const entry = recommendations.find((item) => item.id === recommendationId);
    const text = entry?.quote[paragraph];
    return entry && text ? [{ entry, text }] : [];
  });

  return (
    <section ref={sectionRef} className="credibility" aria-labelledby="credibility-title">
      <div className="shell">
        <h2 id="credibility-title" className="eyebrow" data-reveal="up">
          {eyebrow}
        </h2>

        <ul className="credibility__facts" data-reveal="up">
          {facts.map((fact) => (
            <li key={`${fact.role}-${fact.organisation}-${fact.dates}`}>
              <b>{fact.role}</b>
              <span>{fact.organisation}</span>
              <time>{fact.dates}</time>
            </li>
          ))}
        </ul>

        <div className="credibility__quotes">
          {quotes.map(({ entry, text }) => (
            <figure key={entry.id} className="credibility__quote" data-reveal="up" data-reveal-group="quotes">
              <blockquote>
                <p>{text}</p>
              </blockquote>
              <figcaption>
                <span className="credibility__name">{entry.name}</span>
                <span className="credibility__headline">{entry.headline}</span>
                <span className="credibility__relation">{entry.relationshipNote}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="credibility__more" data-reveal="up">
          <a
            className="link-underline"
            href="#recommendations"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(document.querySelector('#recommendations'));
            }}
          >
            {linkText}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
