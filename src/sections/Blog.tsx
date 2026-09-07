import { useCallback, useRef, useState } from 'react';
import type { ComponentType, RefObject } from 'react';
import { caseStudies, type CaseStudy, type CaseStudySlug } from '../data/caseStudies';
import { useReveal } from '../hooks/useReveal';
import { trackSpotlight } from '../lib/pointer';
import CaseModal from '../components/CaseModal';
import MammaCaloriesCaseStudy from './case-studies/MammaCaloriesCaseStudy';
import GoJobCaseStudy from './case-studies/GoJobCaseStudy';
import AirshieldCaseStudy from './case-studies/AirshieldCaseStudy';
import AdesCaseStudy from './case-studies/AdesCaseStudy';
import DataMaskCaseStudy from './case-studies/DataMaskCaseStudy';
import DevdokCaseStudy from './case-studies/DevdokCaseStudy';
import NutritionAllergyCaseStudy from './case-studies/NutritionAllergyCaseStudy';

interface CaseStudyProps {
  readerRef: RefObject<HTMLElement | null>;
}

const caseStudyRegistry: Record<CaseStudySlug, ComponentType<CaseStudyProps>> = {
  'mamma-calories-meal-prep': MammaCaloriesCaseStudy,
  'gojob-bali-hospitality-hiring': GoJobCaseStudy,
  'how-i-built-airshield': AirshieldCaseStudy,
  'how-did-i-build-ades': AdesCaseStudy,
  'how-i-built-datamask': DataMaskCaseStudy,
  'how-i-built-devdok': DevdokCaseStudy,
  'multi-agent-panel-nutrition-allergy': NutritionAllergyCaseStudy,
};

function HeroMedia({ article }: { article: CaseStudy }) {
  return article.heroMedia.type === 'video' ? (
    <video
      src={article.heroMedia.src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={article.heroMedia.description}
    />
  ) : (
    <img src={article.heroMedia.src} alt="" loading="lazy" />
  );
}

export default function Blog() {
  const [selected, setSelected] = useState<CaseStudySlug | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useReveal<HTMLElement>({ stagger: 80 });

  // The window handles Escape and focus itself; here we only restore focus to
  // the card that opened it.
  const close = useCallback(() => {
    setSelected(null);
    const trigger = triggerRef.current;
    if (!trigger) return;
    window.setTimeout(() => trigger.focus({ preventScroll: true }), 0);
  }, []);

  const open = (slug: CaseStudySlug, trigger: HTMLButtonElement) => {
    if (selected === slug) {
      close();
      return;
    }
    triggerRef.current = trigger;
    setSelected(slug);
  };

  const SelectedCaseStudy = selected ? caseStudyRegistry[selected] : null;
  const selectedArticle = caseStudies.find((article) => article.slug === selected);

  return (
    <section id="blog" ref={sectionRef} className="section section--seam blog-section">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            Selected work
          </p>
          <h2 className="section-title" data-reveal="up">
            Case studies, <em>start to finish</em>.
          </h2>
          <p className="section-lede" data-reveal="up">
            Products and companies I defined, designed and built, from the first strategy work
            through to something people can use. Open any one to read how it was made.
          </p>
        </header>

        <div className="case-grid">
          {caseStudies.map((article) => {
            const isActive = article.slug === selected;
            return (
              <button
                key={article.slug}
                type="button"
                className={`case-card spotlight${isActive ? ' is-active' : ''}`}
                onPointerMove={trackSpotlight}
                onClick={(event) => open(article.slug, event.currentTarget)}
                aria-haspopup="dialog"
                data-reveal="up"
                data-reveal-group="cases"
              >
                <span className="case-card__media">
                  <HeroMedia article={article} />
                </span>
                <span className="case-card__body">
                  <span className="case-card__eyebrow">{article.eyebrow}</span>
                  <span className="case-card__title">{article.title}</span>
                  <span className="case-card__summary">{article.summary}</span>
                  <span className="case-card__meta">
                    <span>{article.year}</span>
                    <span>{article.readingTime}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {SelectedCaseStudy && selectedArticle && (
        <CaseModal
          title={selectedArticle.title}
          eyebrow={selectedArticle.eyebrow}
          onClose={close}
        >
          <SelectedCaseStudy key={selected} readerRef={articleRef} />
        </CaseModal>
      )}
    </section>
  );
}
