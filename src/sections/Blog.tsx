import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import landingImage from '../../pics/landing.png';
import signinImage from '../../pics/signin.png';
import firebaseImage from '../../pics/firebase.png';
import designPageImage from '../../pics/designpage.png';
import dashboardImage from '../../pics/dashboard.png';
import canvasImage from '../../pics/canvas.png';
import editableStepImage from '../../pics/editablestep.png';
import designGuidanceImage from '../../pics/designguidance.png';
import masterPromptGenImage from '../../pics/masterpromptgen.png';
import gradersGenerationImage from '../../pics/gradersgeneration.png';
import evalsReviewImage from '../../pics/evalsreview.png';
import reflectionLoopImage from '../../pics/reflectionloop.png';

interface BlogImage {
  src: string;
  alt: string;
  caption: string;
}

const buildImages: BlogImage[] = [
  {
    src: landingImage,
    alt: 'ADES landing page explaining the product promise',
    caption: 'The landing page had one job: explain that ADES turns a rough agent idea into a structured, build-ready design artifact.',
  },
  {
    src: signinImage,
    alt: 'ADES Google sign-in screen',
    caption: 'Google sign-in keeps onboarding lightweight while letting ADES protect usage and save generated projects to an account.',
  },
  {
    src: firebaseImage,
    alt: 'Firebase authentication and database setup for ADES',
    caption: 'Firebase powers authentication and persistence, so the prototype can behave like a real product without a heavy backend team.',
  },
  {
    src: designPageImage,
    alt: 'ADES design page where users describe the agent opportunity',
    caption: 'The design page is the bridge from vague initiative to Blueprint: target user, outcome, context, constraints, risk level, and human involvement.',
  },
  {
    src: dashboardImage,
    alt: 'ADES dashboard with generated project work to complete',
    caption: 'The dashboard makes the work visible: what has been generated, what needs review, and where the PM should focus next.',
  },
  {
    src: canvasImage,
    alt: 'ADES canvas breaking an agent into workflow steps with evals and reflection loops',
    caption: 'The canvas is the core artifact: workflow steps, assumptions, evals, reflection points, safeguards, and handoff notes in one place.',
  },
  {
    src: editableStepImage,
    alt: 'ADES editable step drawer where steps can be modified or added',
    caption: 'Each step is editable because a PM should be able to challenge the model, add context, and reshape the workflow before engineering starts.',
  },
  {
    src: designGuidanceImage,
    alt: 'ADES design guidance view showing missing elements in an agent design',
    caption: 'Design guidance acts like a readiness review, highlighting what is missing before a team treats the workflow as buildable.',
  },
  {
    src: masterPromptGenImage,
    alt: 'ADES generated master system prompt from the canvas',
    caption: 'Once the canvas is coherent, ADES can generate a master system prompt that translates product design into implementation guidance.',
  },
  {
    src: gradersGenerationImage,
    alt: 'ADES grader generation in simple, Python, and JSON formats',
    caption: 'Graders can be generated in simple, Python, or JSON formats so teams can move from design intent to OpenAI eval platform assets.',
  },
  {
    src: evalsReviewImage,
    alt: 'ADES evaluation review page showing generated evals',
    caption: 'The evals review page keeps quality criteria explicit instead of leaving success definitions scattered across docs and chats.',
  },
  {
    src: reflectionLoopImage,
    alt: 'ADES reflection loop visualization',
    caption: 'Reflection loops appear where uncertainty, ambiguity, or high-consequence judgment makes extra reasoning useful.',
  },
];

const techStack = ['Vercel', 'GitHub', 'Claude Code', 'Codex', 'Firebase'];
const differentiators = ['Pre-build agent design', 'Workflow decomposition', 'Step-level evals', 'Reflection logic', 'Safeguards', 'Readiness review'];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = revealRefs.current.filter(Boolean) as HTMLElement[];
    elements.forEach((element) => gsap.set(element, { opacity: 0, y: 34 }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement);
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: Math.min(idx * 0.06, 0.3),
              ease: 'power2.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{
        padding: '150px 5vw',
        background: 'radial-gradient(circle at 12% 4%, rgba(95, 142, 255, 0.14), rgba(95, 142, 255, 0) 32%), #0a0f18',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          ref={(el) => { revealRefs.current[0] = el; }}
          className="mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#a5b3cc',
            opacity: 0.6,
          }}
        >
          Blog
        </div>
        <div
          className="mb-16"
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(167, 186, 223, 0.20)',
          }}
        />

        <article
          ref={(el) => { revealRefs.current[1] = el; }}
          style={{
            border: '1px solid rgba(167, 186, 223, 0.18)',
            background: 'linear-gradient(180deg, rgba(16, 24, 38, 0.86), rgba(10, 15, 24, 0.96))',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.32)',
          }}
        >
          <header className="grid lg:grid-cols-[0.9fr_1.1fr]" style={{ borderBottom: '1px solid rgba(167, 186, 223, 0.16)' }}>
            <div style={{ padding: 'clamp(28px, 5vw, 58px)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  border: '1px solid rgba(124, 205, 255, 0.26)',
                  color: '#9edcff',
                  padding: '8px 12px',
                  borderRadius: 999,
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  marginBottom: 28,
                }}
              >
                In evidence · First article
              </div>
              <h2
                style={{
                  color: '#f0f6ff',
                  fontSize: 'clamp(42px, 7vw, 86px)',
                  lineHeight: 0.88,
                  letterSpacing: '-3px',
                  margin: 0,
                }}
              >
                How did I build ADES
              </h2>
              <p
                style={{
                  color: '#b8c7df',
                  fontSize: 'clamp(17px, 2.1vw, 22px)',
                  lineHeight: 1.65,
                  margin: '30px 0 0',
                  fontWeight: 200,
                }}
              >
                ADES started from a simple product management frustration: AI teams can brainstorm agents quickly, but turning that energy into a structured workflow with evals, reflection logic, safeguards, assumptions, and handoff notes is still painfully fragmented.
              </p>
            </div>
            <figure style={{ margin: 0, minHeight: 420, borderLeft: '1px solid rgba(167, 186, 223, 0.16)' }}>
              <img
                src={landingImage}
                alt="ADES landing page"
                className="h-full w-full object-cover"
                style={{ minHeight: 420, opacity: 0.86, filter: 'saturate(0.92) contrast(1.04)' }}
              />
            </figure>
          </header>

          <div style={{ padding: 'clamp(28px, 5vw, 58px)' }}>
            <section ref={(el) => { revealRefs.current[2] = el; }} className="grid lg:grid-cols-[0.8fr_1.2fr]" style={{ gap: 42, marginBottom: 64 }}>
              <div>
                <p className="blog-kicker">The category</p>
                <h3 className="blog-heading">Agentic AI needs product infrastructure before runtime infrastructure.</h3>
              </div>
              <div className="blog-copy">
                <p>
                  ADES operates in AI Product Management Enablement for B2B product teams. The product sits between agent design software, AI workflow visualization, and evaluation/governance support. The market is moving quickly: enterprise agentic AI was estimated at USD 2.58B in 2024 and projected by Grand View Research to reach USD 24.50B by 2030, while McKinsey reported that 39% of organizations had begun experimenting with AI agents and another 23% were already scaling them. LinkedIn also reported in January 2026 that 1.3 million AI-enabled jobs had emerged globally over the previous two years, a useful signal that AI workflows are becoming a talent and operating-model shift, not only a software trend.
                </p>
                <p className="blog-sources">
                  Sources: <a href="https://www.grandviewresearch.com/industry-analysis/enterprise-agentic-ai-market-report" target="_blank" rel="noopener noreferrer">Grand View Research</a>, <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener noreferrer">McKinsey</a>, and <a href="https://news.linkedin.com/2026/2026-Davos-Press-Release" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
                </p>
                <p>
                  That growth does not remove the messy middle. PMs still open a PRD, sketch boxes in Miro or FigJam, ask ChatGPT for ideas, paste notes into docs, and track eval ideas in spreadsheets. The result is useful thinking spread across disconnected tools. ADES is my attempt to make the pre-build phase more structured.
                </p>
              </div>
            </section>

            <section ref={(el) => { revealRefs.current[3] = el; }} className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 16, marginBottom: 64 }}>
              {differentiators.map((item) => (
                <div key={item} className="blog-pill-card">
                  {item}
                </div>
              ))}
            </section>

            <section ref={(el) => { revealRefs.current[4] = el; }} className="blog-copy" style={{ marginBottom: 64 }}>
              <p className="blog-kicker">The product problem</p>
              <h3 className="blog-heading">The blank-page problem is worse for agents.</h3>
              <p>
                A normal product feature can often be described as screens, states, and API contracts. An agentic workflow asks for more: what should the agent know, when should it ask a human, what does a good answer look like, when should it reflect, what failure modes matter, and what safeguards are required? A static template can ask those questions, but it cannot interpret the domain, risk level, desired outcome, and user context. ADES uses an LLM to turn a vague initiative into a domain-specific Blueprint and then into a design canvas.
              </p>
              <p>
                The first version is intentionally early-stage: a public platform, an interactive demo, free sign-in, one free project generation per signed-in user, and a validation prompt after that first generation to test willingness to pay. The long-term model is B2B SaaS for product teams, AI product leads, and founders building agent-driven products.
              </p>
            </section>

            <section ref={(el) => { revealRefs.current[5] = el; }} style={{ marginBottom: 68 }}>
              <div className="grid lg:grid-cols-2" style={{ gap: 20 }}>
                {buildImages.slice(1, 5).map((image) => (
                  <figure key={image.src} className="blog-figure">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section ref={(el) => { revealRefs.current[6] = el; }} className="blog-copy" style={{ marginBottom: 64 }}>
              <p className="blog-kicker">The build</p>
              <h3 className="blog-heading">I built ADES as a 0-to-1 prototype with a production mindset.</h3>
              <p>
                The stack was deliberately lean. Vercel handles deployment, GitHub keeps the build history clean, Firebase provides Google authentication and database persistence, and AI coding tools helped me move quickly across product copy, frontend implementation, and edge-case iteration. Claude Code and Codex were part of the development loop: I used them to accelerate scaffolding, refactor interface states, and keep the product moving while I focused on the workflow logic.
              </p>
              <div className="flex flex-wrap" style={{ gap: 10, marginTop: 24 }}>
                {techStack.map((item) => (
                  <span key={item} className="blog-stack-chip">{item}</span>
                ))}
              </div>
            </section>

            <section ref={(el) => { revealRefs.current[7] = el; }} style={{ marginBottom: 68 }}>
              <div className="grid lg:grid-cols-2" style={{ gap: 20 }}>
                {buildImages.slice(5, 9).map((image) => (
                  <figure key={image.src} className="blog-figure">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section ref={(el) => { revealRefs.current[8] = el; }} className="blog-copy" style={{ marginBottom: 64 }}>
              <p className="blog-kicker">The design system</p>
              <h3 className="blog-heading">The canvas is not a diagram. It is a product decision artifact.</h3>
              <p>
                ADES breaks the agent into steps, then attaches the reasoning that usually gets lost: why the step exists, what input it needs, what output it should produce, how success is evaluated, whether reflection is needed, and which safeguards should be in place. The PM can edit the system instead of accepting the model output as final. That matters because agent design is collaborative: product, design, engineering, and governance need a shared object to debate.
              </p>
              <p>
                I also built design guidance so the artifact can critique itself. Instead of only generating a pretty workflow, ADES asks what is missing: unclear handoff, weak eval, vague failure mode, unowned human escalation, or missing assumption. That is where the product becomes more than ChatGPT plus a whiteboard.
              </p>
            </section>

            <section ref={(el) => { revealRefs.current[9] = el; }} style={{ marginBottom: 68 }}>
              <div className="grid lg:grid-cols-2" style={{ gap: 20 }}>
                {buildImages.slice(9).map((image) => (
                  <figure key={image.src} className="blog-figure">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section ref={(el) => { revealRefs.current[10] = el; }} className="blog-copy">
              <p className="blog-kicker">What I learned</p>
              <h3 className="blog-heading">The hard part is not generating steps. The hard part is making them reviewable.</h3>
              <p>
                The severe pain point is not that PMs cannot come up with agent ideas. It is that they cannot consistently convert those ideas into build-ready, evaluable systems. ADES uses generative AI where it is actually needed: interpreting messy product intent, decomposing it into workflow structure, proposing context-aware evals, placing reflection only where it helps, and packaging everything into an editable board.
              </p>
              <p>
                The next phase is validation. I am inviting PMs, AI product leads, and founders into a pilot, watching generation volume and cost, tracking API errors and JSON/rendering failures, and using feedback to decide which collaboration, governance, and evaluation features deserve to become paid B2B SaaS tiers.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
