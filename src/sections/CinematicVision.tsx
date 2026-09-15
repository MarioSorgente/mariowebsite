import ModePanels from '../components/ModePanels';
import { processConfig, type ProcessModeCopy } from '../config';
import { useReveal } from '../hooks/useReveal';

// Each mode gets its own stagger group. useReveal counts every element in a
// group, hidden or not, so a shared group would delay the second mode's steps.
function ProcessSteps({ copy, group }: { copy: ProcessModeCopy; group: string }) {
  return (
    <>
      <h2 className="process__title" data-reveal="up" data-reveal-group={group}>
        {copy.heading}
      </h2>

      <ol
        className="process__steps"
        style={{ '--steps': copy.steps.length } as React.CSSProperties}
      >
        {copy.steps.map((step) => (
          <li key={step.index} className="process__step" data-reveal="up" data-reveal-group={group}>
            <b>{step.index}</b>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function CinematicVision() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 100, threshold: 0.08 });
  const { sectionLabel, modes } = processConfig;

  return (
    <section id="process" ref={sectionRef} className="section section--seam process">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            {sectionLabel}
          </p>
        </header>

        <ModePanels
          fractional={<ProcessSteps copy={modes.fractional} group="steps-fractional" />}
          fullTime={<ProcessSteps copy={modes['full-time']} group="steps-full-time" />}
        />
      </div>
    </section>
  );
}
