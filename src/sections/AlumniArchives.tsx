import { ArrowUpRight } from 'lucide-react';
import { researchConfig } from '../config';
import { useReveal } from '../hooks/useReveal';
import { trackSpotlight } from '../lib/pointer';

export default function AlumniArchives() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const { sectionLabel, projects } = researchConfig;

  if (!sectionLabel && projects.length === 0) return null;

  return (
    <section id="alumni" ref={sectionRef} className="section section--seam ventures">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            Founder-led ventures
          </p>
          <h2 className="section-title" data-reveal="up">
            Companies I <em>founded</em>.
          </h2>
          <p className="section-lede" data-reveal="up">
            Companies I started and led from the first idea, covering the product, the design and
            the route to market.
          </p>
        </header>

        <div className="ventures__grid">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="venture-card spotlight"
              onPointerMove={trackSpotlight}
              data-reveal="up"
              data-reveal-group="ventures"
            >
              <span className="venture-card__media">
                {project.image && <img src={project.image} alt="" loading="lazy" />}
                <span className="venture-card__year">{project.year}</span>
              </span>
              <span className="venture-card__body">
                <span className="venture-card__title">
                  {project.title}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </span>
                <span className="venture-card__discipline">{project.discipline}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
