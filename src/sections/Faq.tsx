import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import ModePanels from '../components/ModePanels';
import { aboutConfig, faqConfig, type FaqItem } from '../config';
import { useReveal } from '../hooks/useReveal';
import { useEngagement } from '../lib/engagement';

function FaqItems({ items }: { items: FaqItem[] }) {
  return (
    <>
      {items.map((item) => (
        // Native disclosure widgets: keyboard, focus and state come from the browser.
        <details key={item.question} className="faq__item">
          <summary>
            <span>{item.question}</span>
            <Plus size={18} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </>
  );
}

/**
 * The questions, with a short profile beside them. The whole list reveals as
 * one block rather than question by question, so a quick scroll never lands
 * on what looks like an empty section.
 */
export default function Faq() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 80 });
  const { withEngagement } = useEngagement();
  const { eyebrow, heading, shared, modes } = faqConfig;
  const { name, roles, paragraphs, portrait, linkText, linkHref } = aboutConfig;
  const [primaryRole, ...otherRoles] = roles;

  return (
    <section id="faq" ref={sectionRef} className="section section--seam faq">
      <div className="shell faq__layout">
        <div>
          <header className="section-head faq__head">
            <p className="eyebrow" data-reveal="up">
              {eyebrow}
            </p>
            <h2 className="section-title" data-reveal="up">
              {heading}
            </h2>
          </header>

          <div className="faq__profile" data-reveal="up">
            <div className="faq__person">
              <img
                className="faq__portrait"
                src={portrait}
                alt={name}
                width={88}
                height={88}
                loading="lazy"
              />
              <div>
                <h3 className="faq__name">{name}</h3>
                <ul className="about__roles">
                  <li className="about__role about__role--primary">{primaryRole}</li>
                  {otherRoles.map((role) => (
                    <li key={role} className="about__role">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <Link className="link-underline about__link" to={withEngagement(linkHref)}>
                {linkText}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>

        <div className="faq__list" data-reveal="up">
          <FaqItems items={shared} />
          <ModePanels
            fractional={<FaqItems items={modes.fractional} />}
            fullTime={<FaqItems items={modes['full-time']} />}
          />
        </div>
      </div>
    </section>
  );
}
