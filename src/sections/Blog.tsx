import { useEffect, useRef, useState } from 'react';
import type { ComponentType, RefObject } from 'react';
import gsap from 'gsap';
import { caseStudies, type CaseStudySlug } from '../data/caseStudies';
import MammaCaloriesCaseStudy from './case-studies/MammaCaloriesCaseStudy';
import GoJobCaseStudy from './case-studies/GoJobCaseStudy';
import AirshieldCaseStudy from './case-studies/AirshieldCaseStudy';
import AdesCaseStudy from './case-studies/AdesCaseStudy';
import NutritionAllergyCaseStudy from './case-studies/NutritionAllergyCaseStudy';

interface CaseStudyProps { readerRef: RefObject<HTMLElement | null> }
const caseStudyRegistry: Record<CaseStudySlug, ComponentType<CaseStudyProps>> = {
  'mamma-calories-meal-prep': MammaCaloriesCaseStudy,
  'gojob-bali-hospitality-hiring': GoJobCaseStudy,
  'how-i-built-airshield': AirshieldCaseStudy,
  'how-did-i-build-ades': AdesCaseStudy,
  'multi-agent-panel-nutrition-allergy': NutritionAllergyCaseStudy,
};

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<CaseStudySlug | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = revealRefs.current.filter(Boolean) as HTMLElement[];
    elements.forEach((element) => gsap.set(element, { opacity: 0, y: 28 }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement);
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: Math.min(idx * 0.04, 0.22),
              ease: 'power2.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedArticle) return;
    const frame = window.requestAnimationFrame(() => {
      articleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedArticle]);

  const toggleArticle = (article: (typeof caseStudies)[number], trigger: HTMLButtonElement) => {
    const isOpen = selectedArticle === article.slug;
    setSelectedArticle(isOpen ? null : article.slug);
    if (isOpen) window.setTimeout(() => trigger.focus(), 0);


  };

  return (
    <section id="blog" className="blog-section">
      <div className="blog-shell">
        <div
          ref={(el) => { revealRefs.current[0] = el; }}
          className="blog-section-label"
        >
          Selected work
        </div>
        <div className="blog-divider" />

        <div
          ref={(el) => { revealRefs.current[1] = el; }}
          className="blog-intro"
        >
          <h2 className="portfolio-heading">Portfolio <span aria-hidden="true">·</span> Case Studies</h2>
          <p className="portfolio-description">
            Products and companies Mario has helped define, design, and build—from early strategy through working experiences.
          </p>
        </div>

        <div
          ref={(el) => { revealRefs.current[2] = el; }}
          className="blog-article-rail"
          aria-label="Portfolio case studies"
        >
          {caseStudies.map((article) => {
            const isActive = article.slug === selectedArticle;
            const isUnavailable = article.slug === 'mamma-calories-meal-prep';
            return (
              <button
                key={article.slug}
                type="button"
                className={`blog-article-card ${isActive ? 'is-active' : ''}`}
                onClick={(event) => toggleArticle(article, event.currentTarget)}
                disabled={isUnavailable}
                aria-expanded={isActive}
                aria-pressed={isActive}
              >
                <span className="blog-card-image-wrap">
                  {article.heroMedia.type === 'video' ? (
                    <video src={article.heroMedia.src} muted loop playsInline preload="metadata" aria-label={article.heroMedia.description} />
                  ) : (
                    <img src={article.heroMedia.src} alt="" loading="lazy" />
                  )}
                </span>
                <span className="blog-card-body">
                  <span className="blog-card-eyebrow">{article.eyebrow}</span>
                  <span className="blog-card-title">{article.title}</span>
                  <span className="blog-card-summary">{article.summary}</span>
                  <span className="blog-card-meta">
                    <span>{article.year}</span>
                    <span>{isUnavailable ? 'Temporarily unavailable' : isActive ? 'Close article' : article.readingTime}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {selectedArticle && (() => {
          const SelectedCaseStudy = caseStudyRegistry[selectedArticle];
          return <SelectedCaseStudy key={selectedArticle} readerRef={articleRef} />;
        })()}
      </div>
    </section>
  );
}
