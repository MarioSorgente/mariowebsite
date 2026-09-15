import { Plus } from 'lucide-react';
import ModePanels from '../components/ModePanels';
import { faqConfig, type FaqItem } from '../config';
import { useReveal } from '../hooks/useReveal';

function FaqList({ items, group }: { items: FaqItem[]; group: string }) {
  return (
    // Native disclosure widgets: keyboard, focus and state come from the browser.
    <div className="faq__list">
      {items.map((item) => (
        <details key={item.question} className="faq__item" data-reveal="up" data-reveal-group={group}>
          <summary>
            <span>{item.question}</span>
            <Plus size={18} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function Faq() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 60 });
  const { eyebrow, heading, modes } = faqConfig;

  return (
    <section id="faq" ref={sectionRef} className="section section--seam faq">
      <div className="shell faq__layout">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            {eyebrow}
          </p>
          <h2 className="section-title" data-reveal="up">
            {heading}
          </h2>
        </header>

        <div>
          <ModePanels
            fractional={<FaqList items={modes.fractional} group="faq-fractional" />}
            fullTime={<FaqList items={modes['full-time']} group="faq-full-time" />}
          />
        </div>
      </div>
    </section>
  );
}
