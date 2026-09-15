import CardGrid from '../components/CardGrid';
import { problemsConfig } from '../config';
import { useReveal } from '../hooks/useReveal';

export default function Problems() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const { eyebrow, heading, intro, cards } = problemsConfig;

  return (
    <section id="problems" ref={sectionRef} className="section section--seam problems">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            {eyebrow}
          </p>
          <h2 className="section-title section-title--wide" data-reveal="up">
            {heading}
          </h2>
          {intro && (
            <p className="section-lede" data-reveal="up">
              {intro}
            </p>
          )}
        </header>

        <CardGrid cards={cards} group="problems" />
      </div>
    </section>
  );
}
