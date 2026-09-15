import CardGrid from '../components/CardGrid';
import { measurementConfig } from '../config';
import { useReveal } from '../hooks/useReveal';

/**
 * How success is agreed, not what was achieved. Keep percentages and targets
 * out of this section: targets belong in an engagement scorecard, and past
 * results belong in evidence-backed case studies.
 */
export default function SuccessMeasurement() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const { eyebrow, heading, intro, cards, closing } = measurementConfig;

  return (
    <section id="results" ref={sectionRef} className="section section--seam measurement">
      <div className="shell">
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

        <CardGrid cards={cards} group="measures" numbered />

        {closing && (
          <p className="section-note" data-reveal="up">
            {closing}
          </p>
        )}
      </div>
    </section>
  );
}
