import { ArrowDown } from 'lucide-react';
import { LogoMark } from '../components/Logo';
import { credibilityConfig } from '../config';
import { recommendations } from '../data/recommendations';
import { useReveal } from '../hooks/useReveal';
import { scrollToSection } from '../lib/scroll';

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Picks the story's product and company names out in the accent colour. */
function accent(text: string, names: string[]) {
  if (names.length === 0) return text;
  const pattern = new RegExp(`(${names.map(escapeRegExp).join('|')})`, 'g');
  return text
    .split(pattern)
    .map((part, index) =>
      names.includes(part) ? (
        <b key={index} className="timeline__name">
          {part}
        </b>
      ) : (
        part
      )
    );
}

/**
 * Mario's story as a timeline, then two recommendation excerpts. The quotes
 * are read from data/recommendations.ts by id, so the words here can never
 * drift from the full, verbatim versions further down the page.
 *
 * The rail and its nodes are pseudo-elements, so assistive technology reads a
 * plain ordered list. The light that runs down the rail is scroll-driven CSS;
 * see the timeline block in styles/engagement.css.
 */
export default function Credibility() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const { eyebrow, heading, lead, timeline, today, highlights, excerpts, linkText } = credibilityConfig;

  const quotes = excerpts.flatMap(({ recommendationId, paragraph }) => {
    const entry = recommendations.find((item) => item.id === recommendationId);
    const text = entry?.quote[paragraph];
    return entry && text ? [{ entry, text }] : [];
  });

  return (
    <section ref={sectionRef} className="credibility" aria-labelledby="credibility-title">
      <div className="shell">
        <header className="section-head credibility__head">
          <p className="eyebrow" data-reveal="up">
            {eyebrow}
          </p>
          <h2 id="credibility-title" className="section-title section-title--wide" data-reveal="up">
            {heading}
          </h2>
          <p className="section-lede" data-reveal="up">
            {lead}
          </p>
        </header>

        <ol className="timeline">
          {timeline.map((stop, index) => {
            // Each stop staggers on its own, so a late stop never waits on earlier ones.
            const group = `timeline-${index}`;
            return (
              <li key={stop.when} className={`timeline__stop${stop.story ? ' timeline__stop--story' : ''}`}>
                <p className="timeline__when" data-reveal="up" data-reveal-group={group}>
                  {stop.when}
                </p>
                <div className="timeline__body">
                  {stop.story && (
                    <p className="timeline__story" data-reveal="up" data-reveal-group={group}>
                      {accent(stop.story, highlights)}
                    </p>
                  )}
                  {stop.products && (
                    <div className="timeline__products" data-reveal="up" data-reveal-group={group}>
                      <p>{stop.products.lead}</p>
                      <ul>
                        {stop.products.list.map((product) => (
                          <li key={product.name}>
                            <b>{product.name}</b>
                            <span>{product.detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {stop.items && (
                    <ul className="timeline__items">
                      {stop.items.map((item) => (
                        <li key={item} data-reveal="up" data-reveal-group={group}>
                          {accent(item, highlights)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}

          <li className="timeline__stop timeline__stop--today">
            <p className="timeline__when" data-reveal="up" data-reveal-group="timeline-today">
              {today.when}
            </p>
            <div className="timeline__body">
              <div className="timeline__today" data-reveal="scale" data-reveal-group="timeline-today">
                <LogoMark size={40} />
                <p>{accent(today.text, highlights)}</p>
              </div>
            </div>
          </li>
        </ol>

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
