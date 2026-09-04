import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { capabilitiesConfig } from '../config';
import { useReveal } from '../hooks/useReveal';

export default function Curriculum() {
  const navigate = useNavigate();
  const sectionRef = useReveal<HTMLElement>({ stagger: 110 });

  const { sectionLabel, items } = capabilitiesConfig;
  if (!sectionLabel && items.length === 0) return null;

  return (
    <section id="curriculum" ref={sectionRef} className="section services">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            {sectionLabel}
          </p>
          <h2 className="section-title" data-reveal="up">
            Three ways to turn an <em>idea</em> into a working product.
          </h2>
          <p className="section-lede" data-reveal="up">
            Pick the engagement that matches where you are. Each one ends with a working product
            that people outside the team can open and use.
          </p>
        </header>

        <div className="services__list">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className="service-row"
              onClick={() => navigate(`/capability/${item.slug}`)}
              aria-label={`Read more about ${item.title}`}
              data-reveal="up"
              data-reveal-group="services"
            >
              <span className="service-row__index">{String(index + 1).padStart(2, '0')}</span>

              <h3 className="service-row__title">{item.title}</h3>

              <span className="service-row__body">
                <span className="service-row__text">{item.description}</span>
                <span className="service-row__meta">
                  {item.meta.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </span>
              </span>

              <span className="service-row__go" aria-hidden="true">
                <ArrowUpRight size={19} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
