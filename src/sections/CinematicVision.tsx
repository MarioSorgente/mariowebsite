import { architectureConfig } from '../config';
import { useReveal } from '../hooks/useReveal';

export default function CinematicVision() {
  const sectionRef = useReveal<HTMLElement>({ stagger: 100, threshold: 0.08 });
  const { sectionLabel, videoPath, title, description, steps } = architectureConfig;

  if (!sectionLabel && !title) return null;

  return (
    <section id="cinematic" ref={sectionRef} className="section section--seam process">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow" data-reveal="up">
            {sectionLabel}
          </p>
          <h2 className="section-title" data-reveal="up">
            How an engagement runs.
          </h2>
        </header>

        {videoPath && (
          <div className="process__frame" data-reveal="mask">
            <video src={videoPath} autoPlay muted loop playsInline aria-hidden="true" />
            <span className="process__curtain" aria-hidden="true" />
            <i className="process__tick" aria-hidden="true" />
            <i className="process__tick" aria-hidden="true" />
            <i className="process__tick" aria-hidden="true" />
            <i className="process__tick" aria-hidden="true" />
          </div>
        )}

        <div className="process__split">
          {title && (
            <h3 className="process__title" data-reveal="up" data-reveal-group="split">
              {title}
            </h3>
          )}
          {description && (
            <p className="process__copy" data-reveal="up" data-reveal-group="split">
              {description}
            </p>
          )}
        </div>

        {steps.length > 0 && (
          <ol className="process__steps">
            {steps.map((step) => (
              <li key={step.index} className="process__step" data-reveal="up" data-reveal-group="steps">
                <b>{step.index}</b>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
