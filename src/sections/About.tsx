import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { aboutConfig } from '../config';
import { useReveal } from '../hooks/useReveal';
import { useEngagement } from '../lib/engagement';

export default function About() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 90 });
  const { withEngagement } = useEngagement();
  const { eyebrow, heading, paragraphs, portrait, linkText, linkHref } = aboutConfig;

  return (
    <section id="about" ref={sectionRef} className="section section--seam about">
      <div className="shell about__layout">
        <img
          className="about__portrait"
          src={portrait}
          alt="Mario Sorgente"
          width={400}
          height={400}
          loading="lazy"
          data-reveal="up"
        />

        <div className="about__copy">
          <p className="eyebrow" data-reveal="up">
            {eyebrow}
          </p>
          <h2 className="section-title" data-reveal="up">
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="section-lede" data-reveal="up">
              {paragraph}
            </p>
          ))}
          <p data-reveal="up">
            <Link className="link-underline about__link" to={withEngagement(linkHref)}>
              {linkText}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
