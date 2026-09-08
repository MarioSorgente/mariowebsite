import type { RefObject } from 'react';
import landingImage from '../../../pics/landing.webp';
import signinImage from '../../../pics/signin.webp';
import firebaseImage from '../../../pics/firebase.webp';
import designPageImage from '../../../pics/designpage.webp';
import dashboardImage from '../../../pics/dashboard.webp';
import canvasImage from '../../../pics/canvas.webp';
import editableStepImage from '../../../pics/editablestep.webp';
import designGuidanceImage from '../../../pics/designguidance.webp';
import masterPromptGenImage from '../../../pics/masterpromptgen.webp';
import gradersGenerationImage from '../../../pics/gradersgeneration.webp';
import evalsReviewImage from '../../../pics/evalsreview.webp';
import reflectionLoopImage from '../../../pics/reflectionloop.webp';

interface BlogImage { src: string; alt: string; caption: string }
const buildImages: BlogImage[] = [
  [landingImage, 'ADES landing page explaining the product promise', 'The landing page explains the core promise: help product teams build agent designs with structure, critique, and confidence.'],
  [signinImage, 'ADES Google sign-in screen', 'Google sign-in keeps onboarding lightweight while letting ADES protect usage and save generated projects to an account.'],
  [firebaseImage, 'Firebase authentication and database setup for ADES', 'Firebase powers authentication and persistence, so the prototype behaves like a real product without a heavy backend team.'],
  [designPageImage, 'ADES design page where users describe the agent opportunity', 'The design page turns a vague initiative into a Blueprint with user, outcome, context, constraints, risk level, and human involvement.'],
  [dashboardImage, 'ADES dashboard with generated project work to complete', 'The dashboard makes the work visible: generated projects, next review actions, and the main areas the PM needs to refine.'],
  [canvasImage, 'ADES canvas breaking an agent into workflow steps with evals and reflection loops', 'The canvas is the core artifact: workflow steps, assumptions, evals, reflection points, safeguards, and handoff notes in one place.'],
  [editableStepImage, 'ADES editable step drawer for changing or adding steps', 'Each step is editable, so a PM can challenge the model, add context, and reshape the workflow before engineering starts.'],
  [designGuidanceImage, 'ADES design guidance view showing missing elements in an agent design', 'Design guidance acts like a readiness review, highlighting missing pieces before a team treats the workflow as buildable.'],
  [masterPromptGenImage, 'ADES generated master system prompt from the canvas', 'Once the canvas is coherent, ADES can generate a master system prompt that translates product design into implementation guidance.'],
  [gradersGenerationImage, 'ADES grader generation in simple, Python, and JSON formats', 'ADES can generate graders in simple, Python or JSON formats, which makes the design easier to reuse in the OpenAI eval platform.'],
  [evalsReviewImage, 'ADES evaluation review page showing generated evals', 'The evals review page keeps quality criteria explicit instead of leaving success definitions scattered across docs and chats.'],
  [reflectionLoopImage, 'ADES reflection loop visualization', 'Reflection loops appear where uncertainty, ambiguity, or high-consequence judgment makes extra reasoning useful.'],
].map(([src, alt, caption]) => ({ src, alt, caption }));
const techStack = ['Vercel', 'GitHub', 'Claude Code', 'Codex', 'Firebase'];
const differentiators = ['Pre-build agent design', 'Workflow decomposition', 'Step-level evals', 'Reflection logic', 'Safeguards', 'Readiness review'];

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function AdesCaseStudy({ readerRef }: Props) {
  return (
    <article
            ref={readerRef}
            className="blog-reader"
            aria-labelledby="ades-blog-title"
          >
            <header
              className="blog-reader-header"
            >
              <div className="blog-reader-copy">
                <p className="blog-kicker">Founder build note</p>
                <h2 id="ades-blog-title">How I built ADES</h2>
                <p>
                  ADES started from a simple product management frustration: AI teams can brainstorm agents quickly, but turning that energy into a structured workflow with evals, reflection logic, safeguards, assumptions, and handoff notes is still fragmented.
                </p>
              </div>
              <figure className="blog-hero-figure">
                <img loading="lazy" src={landingImage} alt="ADES landing page" />
                <figcaption>The first screen explains ADES as a pre-build design space for agent workflows.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section
                className="blog-two-column"
              >
                <div>
                  <p className="blog-kicker">Market context</p>
                  <h3 className="blog-heading">Agentic AI needs the design decisions settled before the runtime gets built.</h3>
                </div>
                <div className="blog-copy">
                  <p>
                    ADES is a tool for B2B product teams designing AI agents. It sits between agent design software, workflow visualisation and evaluation tooling. The market is moving quickly: Grand View Research put enterprise agentic AI at USD 2.58B in 2024 and projects USD 24.50B by 2030, while McKinsey reported that 39% of organizations had begun experimenting with AI agents and another 23% were already scaling them. LinkedIn also reported in January 2026 that 1.3 million AI-enabled jobs had emerged globally over the previous two years, a signal that AI workflows are changing how companies hire and operate, beyond the software they buy.
                  </p>
                  <p className="blog-sources">
                    Sources: <a href="https://www.grandviewresearch.com/industry-analysis/enterprise-agentic-ai-market-report" target="_blank" rel="noopener noreferrer">Grand View Research</a>, <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener noreferrer">McKinsey</a>, and <a href="https://news.linkedin.com/2026/2026-Davos-Press-Release" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
                  </p>
                  <p>
                    None of that growth helps with the part in between. PMs still open a PRD, sketch boxes in Miro or FigJam, ask ChatGPT for ideas, paste notes into docs, and track eval ideas in spreadsheets. The result is useful thinking spread across disconnected tools. ADES is my attempt to make the pre-build phase more structured.
                  </p>
                </div>
              </section>

              <section
                className="blog-pill-grid"
                aria-label="ADES differentiators"
              >
                {differentiators.map((item) => (
                  <div key={item} className="blog-pill-card">
                    {item}
                  </div>
                ))}
              </section>

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The product problem</p>
                <h3 className="blog-heading">The blank-page problem is worse for agents.</h3>
                <p>
                  You can usually describe a normal product feature as screens, states, and API contracts. An agentic workflow asks for more: what should the agent know, when should it ask a human, what does a good answer look like, when should it reflect, what failure modes matter, and which safeguards it needs? A static template can ask those questions, but it cannot interpret the domain, risk level, desired outcome, and user context. ADES uses an LLM to turn a vague initiative into a domain-specific Blueprint and then into a design canvas.
                </p>
                <p>
                  The first version is intentionally early-stage: a public platform, an interactive demo, free sign-in, one free project generation per signed-in user, and a validation prompt after that first generation to test willingness to pay. The long-term model is B2B SaaS for product teams, AI product leads, and founders building agent-driven products.
                </p>
              </section>

              <ImageGrid images={buildImages.slice(1, 5)} />

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The build</p>
                <h3 className="blog-heading">I built ADES as a first version, with the plumbing a real product needs.</h3>
                <p>
                  The stack was deliberately lean. Vercel handles deployment, GitHub keeps the build history clean, Firebase provides Google authentication and database persistence, and AI coding tools helped me move quickly across product copy, frontend work and edge cases. Claude Code and Codex were part of the development loop: I used them to accelerate scaffolding, refactor interface states, and keep the product moving while I focused on the workflow logic.
                </p>
                <div className="blog-stack-list">
                  {techStack.map((item) => (
                    <span key={item} className="blog-stack-chip">{item}</span>
                  ))}
                </div>
              </section>

              <ImageGrid images={buildImages.slice(5, 9)} />

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The design system</p>
                <h3 className="blog-heading">The canvas records the reasoning behind each step alongside its shape.</h3>
                <p>
                  ADES breaks the agent into steps, then attaches the reasoning that usually gets lost: why the step exists, what input it needs, what output it should produce, how to measure success, whether it needs reflection, and which safeguards belong around it. The PM can edit the system instead of accepting the model output as final. That matters because agent design is collaborative: product, design, engineering, and governance need a shared object to debate.
                </p>
                <p>
                  I also built design guidance, so the tool reviews its own output. Beyond generating a workflow, ADES asks what is missing: unclear handoff, weak eval, vague failure mode, unowned human escalation, or missing assumption. That is where the product becomes more than ChatGPT plus a whiteboard.
                </p>
              </section>

              <ImageGrid images={buildImages.slice(9)} />

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">What I learned</p>
                <h3 className="blog-heading">Generating steps is easy. Making them reviewable is the hard part.</h3>
                <p>
                  Product managers rarely struggle to come up with agent ideas. They struggle to turn those ideas into systems an engineer can build and a reviewer can evaluate. ADES uses generative AI where it helps: interpreting messy product intent, decomposing it into workflow structure, proposing context-aware evals, placing reflection only where it helps, and packaging everything into an editable board.
                </p>
                <p>
                  The next phase is validation. I am inviting PMs, AI product leads, and founders into a pilot, watching generation volume and cost, tracking API errors and failures in JSON and rendering, and using feedback to decide which collaboration, governance, and evaluation features deserve to become paid B2B SaaS tiers.
                </p>
              </section>
            </div>
          </article>
  );
}

function ImageGrid({ images }: { images: BlogImage[] }) {
  return <section className="blog-image-grid">{images.map((image) => <figure key={image.src} className="blog-figure"><div className="blog-figure-image-wrap"><img src={image.src} alt={image.alt} loading="lazy" /></div><figcaption>{image.caption}</figcaption></figure>)}</section>;
}
