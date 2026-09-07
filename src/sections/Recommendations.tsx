import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  initials,
  linkedInRecommendationsUrl,
  recommendationFilters,
  recommendations,
  type RecommendationRelationship,
} from '../data/recommendations';
import { useReveal } from '../hooks/useReveal';
import { trackSpotlight } from '../lib/pointer';

type FilterId = 'all' | RecommendationRelationship;

/** Collapsed cards show one paragraph. Anything shorter needs no toggle. */
const PREVIEW_LIMIT = 300;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Recommendations() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const railRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState<FilterId>('all');
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set());
  // Which end of the track we are sitting on, so the arrows can switch off.
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const visible = recommendations.filter(
    (entry) => filter === 'all' || entry.relationship === filter
  );

  const readEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    // A pixel of slack: sub-pixel layout means scrollLeft rarely lands exactly
    // on either bound, which would leave both arrows permanently enabled.
    setEdges({ atStart: rail.scrollLeft <= 1, atEnd: rail.scrollLeft >= max - 1 });
  }, []);

  // Same shape as useScrollProgress: coalesce a burst of scroll events into one
  // read per frame, so a flick through the rail does not thrash React state.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        readEdges();
      });
    };

    readEdges();
    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [readEdges]);

  /** Moves the rail by whole cards, so a card always lands against the edge. */
  const page = useCallback((direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>('.reco-card');
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : rail.clientWidth * 0.8;
    rail.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  }, []);

  const jump = useCallback((edge: 'start' | 'end') => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({
      left: edge === 'start' ? 0 : rail.scrollWidth,
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  }, []);

  // The rail is focusable, so keys have to move it a card at a time rather than
  // leaving the browser to nudge it by its own small increment.
  const onRailKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const handlers: Record<string, () => void> = {
      ArrowLeft: () => page(-1),
      ArrowRight: () => page(1),
      Home: () => jump('start'),
      End: () => jump('end'),
    };
    const handler = handlers[event.key];
    if (!handler) return;
    event.preventDefault();
    handler();
  };

  // Filtering changes how long the track is, so the arrows need a fresh
  // reading. This runs after the new cards are in the DOM, which a callback
  // fired during the click could not promise.
  useEffect(() => {
    readEdges();
  }, [filter, readEdges]);

  const chooseFilter = (id: FilterId) => {
    setFilter(id);
    railRef.current?.scrollTo({ left: 0, behavior: 'instant' });
  };

  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  };

  return (
    <section id="recommendations" ref={sectionRef} className="section section--seam recos">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            In their words
          </p>
          <h2 className="section-title" data-reveal="up">
            Recommendations, <em>unedited</em>.
          </h2>
          <p className="section-lede" data-reveal="up">
            Written on LinkedIn by the people who managed me, worked beside me and sat in my team.
            Reproduced word for word, with the profile linked so you can check any of them against
            the source.
          </p>
        </header>

        <div className="recos__controls" data-reveal="up">
          <div
            className="recos__filters"
            role="group"
            aria-label="Filter recommendations by working relationship"
          >
            {recommendationFilters.map(({ id, label }) => {
              const count =
                id === 'all'
                  ? recommendations.length
                  : recommendations.filter((entry) => entry.relationship === id).length;
              if (count === 0) return null;

              return (
                <button
                  key={id}
                  type="button"
                  className={`chip reco-filter${filter === id ? ' is-active' : ''}`}
                  aria-pressed={filter === id}
                  onClick={() => chooseFilter(id)}
                >
                  {label}
                  <span className="reco-filter__count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="recos__nav">
            <button
              type="button"
              className="reco-arrow"
              aria-label="Previous recommendations"
              disabled={edges.atStart}
              onClick={() => page(-1)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="reco-arrow"
              aria-label="Next recommendations"
              disabled={edges.atEnd}
              onClick={() => page(1)}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/*
          The cards carry no `data-reveal`. useReveal observes against the
          viewport and only runs on mount, so cards parked off the right of the
          rail would never intersect, and cards rendered by a later filter
          change would never be observed at all, leaving both stuck at opacity
          zero. The reveal sits on the wrapper, which is always in view.
        */}
        <div className="recos__rail-wrap" data-reveal="up">
          <div
            className="reco-rail"
            ref={railRef}
            tabIndex={0}
            role="group"
            aria-label="Recommendations, scroll or use the arrow keys"
            onKeyDown={onRailKeyDown}
          >
            {visible.map((entry) => {
              const isOpen = expanded.has(entry.id);
              const hasMore = entry.quote.length > 1 || entry.quote[0].length > PREVIEW_LIMIT;
              const paragraphs = isOpen ? entry.quote : entry.quote.slice(0, 1);

              return (
                <figure
                  key={entry.id}
                  className={`reco-card spotlight${isOpen ? ' is-expanded' : ''}`}
                  onPointerMove={trackSpotlight}
                >
                  <div className="reco-card__head">
                    <span className="reco-card__monogram" aria-hidden="true">
                      {initials(entry.name)}
                    </span>
                    <figcaption className="reco-card__who">
                      <span className="reco-card__name">{entry.name}</span>
                      <span className="reco-card__headline">{entry.headline}</span>
                    </figcaption>
                  </div>

                  <blockquote className="reco-card__quote">
                    {paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </blockquote>

                  {hasMore && (
                    <button
                      type="button"
                      className="reco-card__more"
                      aria-expanded={isOpen}
                      onClick={() => toggleExpanded(entry.id)}
                    >
                      {isOpen ? 'Show less' : 'Read full recommendation'}
                      <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                  )}

                  <p className="reco-card__meta">
                    <span>{entry.relationshipNote}</span>
                    <span>{entry.date}</span>
                  </p>
                </figure>
              );
            })}
          </div>
        </div>

        {/*
          One link for the whole section rather than one per card: LinkedIn has
          no per-recommendation permalink, and six links sharing an accessible
          name is a screen-reader problem.
        */}
        <p className="recos__verify" data-reveal="up">
          <a
            className="link-underline"
            href={linkedInRecommendationsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify these on LinkedIn
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
