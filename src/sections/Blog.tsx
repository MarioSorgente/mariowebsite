import { useEffect, useRef, useState } from 'react';
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
import allergyPanelVideo from '../../pics/Video Project.mp4';
import airshieldImage from '../../public/images/airshield-photo.svg';

interface BlogImage {
  src: string;
  alt: string;
  caption: string;
}

interface ArticleCard {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
  mediaType?: 'image' | 'video';
}

const articles: ArticleCard[] = [
  {
    slug: 'how-i-built-airshield',
    title: 'How I built Airshield',
    eyebrow: 'Founder case study',
    summary: 'From a founder\'s helmet innovation to an investor-ready business, brand, website, and fundraising story.',
    date: '2026',
    readTime: '9 min read',
    image: airshieldImage,
  },
  {
    slug: 'how-did-i-build-ades',
    title: 'How I built ADES',
    eyebrow: 'Founder build note',
    summary: 'A product and technical teardown of the agent design studio I built for PMs, AI product leads, and founders.',
    date: '2026',
    readTime: '8 min read',
    image: landingImage,
  },
  {
    slug: 'multi-agent-panel-nutrition-allergy',
    title: 'Multi-agent panel for nutrition and allergy advice',
    eyebrow: 'Family health build note',
    summary: 'How I designed a pediatrician, nutritionist, and allergy-specialist panel to help parents organize messy food reactions, labs, and next questions.',
    date: '2026',
    readTime: '10 min read',
    image: allergyPanelVideo,
    mediaType: 'video',
  },
];

const buildImages: BlogImage[] = [
  {
    src: landingImage,
    alt: 'ADES landing page explaining the product promise',
    caption: 'The landing page explains the core promise: help product teams build agent designs with structure, critique, and confidence.',
  },
  {
    src: signinImage,
    alt: 'ADES Google sign-in screen',
    caption: 'Google sign-in keeps onboarding lightweight while letting ADES protect usage and save generated projects to an account.',
  },
  {
    src: firebaseImage,
    alt: 'Firebase authentication and database setup for ADES',
    caption: 'Firebase powers authentication and persistence, so the prototype behaves like a real product without a heavy backend team.',
  },
  {
    src: designPageImage,
    alt: 'ADES design page where users describe the agent opportunity',
    caption: 'The design page turns a vague initiative into a Blueprint with user, outcome, context, constraints, risk level, and human involvement.',
  },
  {
    src: dashboardImage,
    alt: 'ADES dashboard with generated project work to complete',
    caption: 'The dashboard makes the work visible: generated projects, next review actions, and the main areas the PM needs to refine.',
  },
  {
    src: canvasImage,
    alt: 'ADES canvas breaking an agent into workflow steps with evals and reflection loops',
    caption: 'The canvas is the core artifact: workflow steps, assumptions, evals, reflection points, safeguards, and handoff notes in one place.',
  },
  {
    src: editableStepImage,
    alt: 'ADES editable step drawer where steps can be modified or added',
    caption: 'Each step is editable, so a PM can challenge the model, add context, and reshape the workflow before engineering starts.',
  },
  {
    src: designGuidanceImage,
    alt: 'ADES design guidance view showing missing elements in an agent design',
    caption: 'Design guidance acts like a readiness review, highlighting missing pieces before a team treats the workflow as buildable.',
  },
  {
    src: masterPromptGenImage,
    alt: 'ADES generated master system prompt from the canvas',
    caption: 'Once the canvas is coherent, ADES can generate a master system prompt that translates product design into implementation guidance.',
  },
  {
    src: gradersGenerationImage,
    alt: 'ADES grader generation in simple, Python, and JSON formats',
    caption: 'Graders can be generated in simple, Python, or JSON formats, making the design easier to reuse in the OpenAI eval platform.',
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
const allergyPanelStack = ['Claude Code', 'Codex', 'ADES', 'Anthropic Claude', 'Kimi / Moonshot AI', 'Vercel', 'GitHub'];
const allergyPanelPrinciples = ['Evidence intake first', 'Independent expert review', 'Structured debate', 'Moderator synthesis', 'Doctor-ready questions', 'Human medical oversight'];
const airshieldWork = ['Founder discovery', 'Business Model Canvas', 'Website design & build', 'Higgsfield marketing', 'Investor story', 'Fundraising deck'];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
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

  const toggleArticle = (article: ArticleCard) => {
    const isOpen = selectedArticle === article.slug;
    setSelectedArticle(isOpen ? null : article.slug);

    if (!isOpen) {
      window.setTimeout(() => {
        articleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  };

  return (
    <section id="blog" className="blog-section">
      <div className="blog-shell">
        <div
          ref={(el) => { revealRefs.current[0] = el; }}
          className="blog-section-label"
        >
          Blog
        </div>
        <div className="blog-divider" />

        <div
          ref={(el) => { revealRefs.current[1] = el; }}
          className="blog-intro"
        >
          <div>
            <p className="blog-kicker">Case studies</p>
            <h2>Read the build notes</h2>
          </div>
        </div>

        <div
          ref={(el) => { revealRefs.current[2] = el; }}
          className="blog-article-rail"
          aria-label="Blog article list"
        >
          {articles.map((article) => {
            const isActive = article.slug === selectedArticle;
            return (
              <button
                key={article.slug}
                type="button"
                className={`blog-article-card ${isActive ? 'is-active' : ''}`}
                onClick={() => toggleArticle(article)}
                aria-expanded={isActive}
                aria-pressed={isActive}
              >
                <span className="blog-card-image-wrap">
                  {article.mediaType === 'video' ? (
                    <video src={article.image} muted loop playsInline preload="metadata" aria-label="Preview of the nutrition and allergy multi-agent panel" />
                  ) : (
                    <img src={article.image} alt="" loading="lazy" />
                  )}
                </span>
                <span className="blog-card-body">
                  <span className="blog-card-eyebrow">{article.eyebrow}</span>
                  <span className="blog-card-title">{article.title}</span>
                  <span className="blog-card-summary">{article.summary}</span>
                  <span className="blog-card-meta">
                    <span>{article.date}</span>
                    <span>{isActive ? 'Close article' : article.readTime}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {selectedArticle === 'how-i-built-airshield' && (
          <article ref={articleRef} className="blog-reader" aria-labelledby="airshield-blog-title">
            <header ref={(el) => { revealRefs.current[20] = el; }} className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study · Strategy, product &amp; fundraising</p>
                <h2 id="airshield-blog-title">How I built Airshield</h2>
                <p>
                  Airshield began with a founder who had a meaningful product idea: a new approach to helmet protection. But an invention alone is not yet a fundable business. I helped turn the founder's expertise into a clear company story, a credible website, a complete business model, and an investor strategy designed to open fundraising conversations.
                </p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://www.airshieldhelmets.com/" target="_blank" rel="noopener noreferrer">Visit Airshield ↗</a>
                  <a className="blog-cta blog-cta-secondary" href="https://drive.google.com/uc?export=download&amp;id=1B04BjaRXttfZucYs8SqomcD6iCCKYqsO" target="_blank" rel="noopener noreferrer">Download strategy deck ↓</a>
                </div>
              </div>
              <figure className="blog-hero-figure">
                <img className="airshield-feature-image" src={airshieldImage} alt="Airshield rider wearing a filtration helmet with replaceable filter cartridge and USB-C rechargeable battery callouts" />
                <figcaption>Airshield presents the helmet as protection for riders who breathe exhaust, dust, and PM2.5 in traffic every day.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div>
                  <p className="blog-kicker">The founder's problem</p>
                  <h3 className="blog-heading">A strong product needed a business that investors could understand.</h3>
                </div>
                <div className="blog-copy">
                  <p>The founder understood the protection problem and believed deeply in the solution. The gap was not passion or technical ambition; it was translation. Prospective customers needed to grasp the value quickly, partners needed to see a route to market, and investors needed evidence that the idea could become a scalable company.</p>
                  <p>The early story had to answer difficult questions in plain language: Who is the first customer? What pain is urgent enough to change buying behavior? Why is Airshield different from established helmet options? How will the company reach buyers, make money, prove demand, and use investment responsibly? Without those connections, the website would be decoration and the pitch would feel like a product presentation rather than an investment case.</p>
                </div>
              </section>

              <section className="blog-pill-grid" aria-label="Airshield project deliverables">
                {airshieldWork.map((item) => <div key={item} className="blog-pill-card">{item}</div>)}
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The business foundation</p>
                <h3 className="blog-heading">Before designing pages, I designed the company logic.</h3>
                <p>I worked from the founder's knowledge outward, turning conversations and assumptions into a Business Model Canvas. We defined customer segments, the value proposition for each audience, channels, customer relationships, key activities, resources, partners, costs, and revenue streams. This made hidden assumptions visible and gave us a practical list of what needed validation.</p>
                <p>The canvas became our decision system. It kept the website from trying to speak to everyone, connected product benefits to commercial outcomes, and gave the fundraising narrative a believable path from today's concept to tomorrow's company. Instead of promising a giant market without a route into it, we could show a focused entry point, the partnerships required, and the milestones capital would unlock.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">The product promise</p>
                  <h3 className="blog-heading">Protection should not stop at the skull.</h3>
                </div>
                <div className="blog-copy">
                  <p>Airshield's proposition starts with a daily reality for Indonesian riders: sitting inches from exhaust, road dust, and PM2.5. The product extends the familiar safety role of a helmet to the air a rider breathes, pairing premium filtration with a replaceable filter cartridge and a USB-C rechargeable battery.</p>
                  <p>That makes the story tangible rather than abstract. The helmet is the durable product; the cartridge makes maintenance and repeat use visible; and recharging fits a routine customers already understand. The initial launch focus—Jakarta, Bali, and major cities across Java—also gave the commercial plan a specific place to learn before expanding.</p>
                  <p className="blog-sources">Product details and launch positioning: <a href="https://www.airshieldhelmets.com/" target="_blank" rel="noopener noreferrer">Airshield Helmets</a>.</p>
                </div>
              </section>

              <section className="blog-copy blog-block blog-economics-block">
                <p className="blog-kicker">The unit economics</p>
                <h3 className="blog-heading">A credible price begins by separating every cost—including CAC.</h3>
                <p>A blended “cost per helmet” hides the decisions that determine whether growth creates value or consumes cash. We needed to separate the bill of materials and assembly from freight, duties, warehousing, payment fees, warranty and returns, customer support, and ongoing cartridge fulfilment. That produces a contribution margin we can actually manage instead of a gross-margin headline built on incomplete inputs.</p>
                <div className="blog-cost-grid" aria-label="Airshield cost model components">
                  <div><strong>Product</strong><span>Components, filtration system, battery, assembly, packaging and quality control.</span></div>
                  <div><strong>Landed</strong><span>Freight, insurance, duties, local handling and inventory storage.</span></div>
                  <div><strong>Transaction</strong><span>Payment fees, fulfilment, delivery, returns, warranty and customer care.</span></div>
                  <div><strong>Acquisition</strong><span>Creative, paid media, partnerships, sales effort and promotions—the full CAC.</span></div>
                </div>
                <p>CAC plays a decisive role because a premium new category must first educate the market, build trust, and convert attention into a reservation or purchase. It is not just ad spend: a useful blended CAC divides all sales and marketing costs by the new customers acquired in the same period. We then compare that figure with first-order contribution margin, cartridge repeat margin, payback time, and customer lifetime value.</p>
                <div className="blog-economics-formula" aria-label="Contribution economics formula">
                  <span>Net revenue</span><b>−</b><span>landed product cost</span><b>−</b><span>variable service costs</span><b>−</b><span>CAC</span><b>=</b><strong>customer contribution</strong>
                </div>
                <p>This breakdown changes strategy. If CAC is too high, the answer may be sharper city targeting, partnerships with rider communities or employers, better referral loops, or stronger conversion—not simply a higher price. And because replaceable cartridges can create recurring revenue, cohort retention matters: repeat purchases can improve lifetime value, but they should never be used to excuse an acquisition model with an unrealistic payback period.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The website</p>
                <h3 className="blog-heading">The website became Airshield's digital front door.</h3>
                <p>I structured and built the Airshield website around the questions a visitor asks in sequence: what is the problem, what is different about this solution, why should I believe it, and what should I do next? The visual system balances safety, performance, and innovation while the copy translates the founder's technical insight into benefits that customers, strategic partners, and investors can understand.</p>
                <p>The site also became a credibility asset for outreach. It gives every introduction, pitch email, and investor conversation a consistent home. That consistency matters at an early stage: the founder no longer has to rebuild the explanation from scratch in every meeting, and every stakeholder encounters the same focused proposition.</p>
                <a className="blog-website-feature" href="https://www.airshieldhelmets.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the live Airshield Helmets website">
                  <span className="blog-browser-bar" aria-hidden="true">
                    <span className="blog-browser-dots"><i /><i /><i /></span>
                    <span className="blog-browser-url">airshieldhelmets.com</span>
                  </span>
                  <span className="blog-website-feature-body">
                    <span className="blog-kicker">Live website</span>
                    <strong>See how the Airshield story comes to life.</strong>
                    <span>Explore the product positioning, brand, and founder vision on the website I built.</span>
                    <b>Visit Airshield ↗</b>
                  </span>
                </a>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">The marketing engine</p>
                  <h3 className="blog-heading">I created the marketing material with Higgsfield.</h3>
                </div>
                <div className="blog-copy">
                  <p>A new physical product needs to feel real before a full-scale production shoot is practical. I used Higgsfield as an AI creative-production tool to develop Airshield's marketing imagery and translate the brand direction into polished campaign material. This gave the founder a coherent visual world for the website, investor conversations, presentations, and social communication—not a collection of disconnected mockups.</p>
                  <p>I established the visual direction first: premium protection, engineered performance, movement, and confidence. I then built and refined Higgsfield prompts around that system, controlling composition, environment, lighting, camera language, product emphasis, and brand tone. Iteration was essential. I selected the strongest generations, corrected inconsistencies, and shaped the final assets so they felt like one campaign.</p>
                  <p>The resulting material helped show Airshield in context and communicate an ambition that technical diagrams alone could not. It also made the launch system efficient: one creative direction could support hero imagery, campaign concepts, social assets, pitch-deck visuals, and partner outreach while keeping the story recognizably Airshield.</p>
                  <div className="blog-stack-list" aria-label="Marketing materials created with Higgsfield">
                    {['Campaign art direction', 'Product visuals', 'Website imagery', 'Social content', 'Pitch-deck visuals'].map((item) => (
                      <span key={item} className="blog-stack-chip">{item}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The investor strategy</p>
                <h3 className="blog-heading">The deck connects the vision to a credible use of capital.</h3>
                <p>I developed the strategy deck as a fundraising tool, not a brochure. It frames the founder's problem, the market opportunity, the solution, differentiation, business model, go-to-market logic, and investment roadmap as one connected argument. Each section earns the next: the problem creates urgency, the solution creates interest, the model demonstrates commercial thinking, and the roadmap shows how funding reduces risk.</p>
                <p>The result gives the founder a repeatable narrative for investor meetings and a foundation that can evolve as customer evidence, partnerships, testing, and traction grow. Most importantly, it changes the ask from “believe in my invention” to “help fund a clearly staged plan for building this company.”</p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://drive.google.com/uc?export=download&amp;id=1B04BjaRXttfZucYs8SqomcD6iCCKYqsO" target="_blank" rel="noopener noreferrer">Download the investor strategy deck ↓</a>
                  <a className="blog-text-link" href="https://drive.google.com/file/d/1B04BjaRXttfZucYs8SqomcD6iCCKYqsO/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Preview on Google Drive ↗</a>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The outcome</p>
                <h3 className="blog-heading">One founder story, built to work across product, web, and fundraising.</h3>
                <p>Airshield now has more than an idea and a logo. The founder has a coherent business foundation, a public website that communicates the opportunity, and an investor-ready story for raising capital. The work demonstrates how I partner with founders: I do not begin with isolated deliverables. I find the strategic thread that connects the customer problem, the business model, the product experience, and the case for investment—then build every artifact around it.</p>
              </section>
            </div>
          </article>
        )}

        {selectedArticle === 'how-did-i-build-ades' && (
          <article
            ref={articleRef}
            className="blog-reader"
            aria-labelledby="ades-blog-title"
          >
            <header
              ref={(el) => { revealRefs.current[3] = el; }}
              className="blog-reader-header"
            >
              <div className="blog-reader-copy">
                <p className="blog-kicker">In evidence · First article</p>
                <h2 id="ades-blog-title">How I built ADES</h2>
                <p>
                  ADES started from a simple product management frustration: AI teams can brainstorm agents quickly, but turning that energy into a structured workflow with evals, reflection logic, safeguards, assumptions, and handoff notes is still painfully fragmented.
                </p>
              </div>
              <figure className="blog-hero-figure">
                <img src={landingImage} alt="ADES landing page" />
                <figcaption>The first screen explains ADES as a pre-build design space for agent workflows.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section
                ref={(el) => { revealRefs.current[4] = el; }}
                className="blog-two-column"
              >
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

              <section
                ref={(el) => { revealRefs.current[5] = el; }}
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
                ref={(el) => { revealRefs.current[6] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The product problem</p>
                <h3 className="blog-heading">The blank-page problem is worse for agents.</h3>
                <p>
                  A normal product feature can often be described as screens, states, and API contracts. An agentic workflow asks for more: what should the agent know, when should it ask a human, what does a good answer look like, when should it reflect, what failure modes matter, and what safeguards are required? A static template can ask those questions, but it cannot interpret the domain, risk level, desired outcome, and user context. ADES uses an LLM to turn a vague initiative into a domain-specific Blueprint and then into a design canvas.
                </p>
                <p>
                  The first version is intentionally early-stage: a public platform, an interactive demo, free sign-in, one free project generation per signed-in user, and a validation prompt after that first generation to test willingness to pay. The long-term model is B2B SaaS for product teams, AI product leads, and founders building agent-driven products.
                </p>
              </section>

              <ImageGrid images={buildImages.slice(1, 5)} />

              <section
                ref={(el) => { revealRefs.current[8] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The build</p>
                <h3 className="blog-heading">I built ADES as a 0-to-1 prototype with a production mindset.</h3>
                <p>
                  The stack was deliberately lean. Vercel handles deployment, GitHub keeps the build history clean, Firebase provides Google authentication and database persistence, and AI coding tools helped me move quickly across product copy, frontend implementation, and edge-case iteration. Claude Code and Codex were part of the development loop: I used them to accelerate scaffolding, refactor interface states, and keep the product moving while I focused on the workflow logic.
                </p>
                <div className="blog-stack-list">
                  {techStack.map((item) => (
                    <span key={item} className="blog-stack-chip">{item}</span>
                  ))}
                </div>
              </section>

              <ImageGrid images={buildImages.slice(5, 9)} />

              <section
                ref={(el) => { revealRefs.current[10] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The design system</p>
                <h3 className="blog-heading">The canvas is not a diagram. It is a product decision artifact.</h3>
                <p>
                  ADES breaks the agent into steps, then attaches the reasoning that usually gets lost: why the step exists, what input it needs, what output it should produce, how success is evaluated, whether reflection is needed, and which safeguards should be in place. The PM can edit the system instead of accepting the model output as final. That matters because agent design is collaborative: product, design, engineering, and governance need a shared object to debate.
                </p>
                <p>
                  I also built design guidance so the artifact can critique itself. Instead of only generating a pretty workflow, ADES asks what is missing: unclear handoff, weak eval, vague failure mode, unowned human escalation, or missing assumption. That is where the product becomes more than ChatGPT plus a whiteboard.
                </p>
              </section>

              <ImageGrid images={buildImages.slice(9)} />

              <section
                ref={(el) => { revealRefs.current[12] = el; }}
                className="blog-copy blog-block"
              >
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
        )}

        {selectedArticle === 'multi-agent-panel-nutrition-allergy' && (
          <article
            ref={articleRef}
            className="blog-reader"
            aria-labelledby="allergy-blog-title"
          >
            <header
              ref={(el) => { revealRefs.current[13] = el; }}
              className="blog-reader-header"
            >
              <div className="blog-reader-copy">
                <p className="blog-kicker">In evidence · Family health build note</p>
                <h2 id="allergy-blog-title">Multi-agent panel for nutrition and allergy advice</h2>
                <p>
                  My nephew just turned two, and his allergies turned a normal family routine into a daily investigation. This is the story of the multi-agent panel I built to help his parents organize symptoms, food reactions, supplements, blood exams, PDFs, doctor notes, and diet experiments into a safer conversation with clinicians.
                </p>
              </div>
              <figure className="blog-hero-figure">
                <video src={allergyPanelVideo} controls muted loop playsInline preload="metadata" aria-label="Video preview of the nutrition and allergy advice project" />
                <figcaption>The prototype starts from the parents' evidence and routes the case through a pediatrician, nutritionist, allergy specialist, and moderator agent.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section
                ref={(el) => { revealRefs.current[14] = el; }}
                className="blog-two-column"
              >
                <div>
                  <p className="blog-kicker">The reason</p>
                  <h3 className="blog-heading">When a toddler has allergies, the family becomes the data layer.</h3>
                </div>
                <div className="blog-copy">
                  <p>
                    He is the love of my life. Watching him struggle with histamine-related symptoms, food reactions, sleep disruption, skin signals, and the emotional burden that lands on his parents made the problem feel painfully concrete. The hard part was not a lack of care. It was the opposite: everyone cared so much that information multiplied faster than anyone could connect it.
                  </p>
                  <p>
                    Allergy care is naturally interdisciplinary. Pediatricians look at growth, infections, medication safety, and developmental context. Allergy specialists focus on triggers, reaction severity, testing history, elimination risk, and emergency planning. Nutritionists worry about adequate calories, protein, micronutrients, food variety, gut tolerance, and the hidden cost of over-restricting a young child's diet. A parent sees all of it, but usually inside scattered PDFs, WhatsApp notes, appointment memories, food diaries, supplement labels, and lab reports.
                  </p>
                  <p className="blog-sources">
                    Research anchors: the American Academy of Pediatrics keeps pediatric food-allergy guidance connected to diagnosis, prevention, and treatment resources; AAAAI emphasizes careful diagnosis and management rather than guessing from symptoms alone; multi-agent debate research shows that independent model perspectives and structured discussion can improve factuality and reasoning; medical-agent papers such as MedAgents and MDAgents explore multidisciplinary LLM collaboration for medical reasoning. Sources: <a href="https://www.aap.org/en/patient-care/allergic-march/food-allergies/" target="_blank" rel="noopener noreferrer">AAP</a>, <a href="https://www.aaaai.org/Conditions-Treatments/Allergies/Food-Allergy" target="_blank" rel="noopener noreferrer">AAAAI</a>, <a href="https://composable-models.github.io/llm_debate/" target="_blank" rel="noopener noreferrer">Multiagent Debate</a>, <a href="https://aclanthology.org/2024.findings-acl.33/" target="_blank" rel="noopener noreferrer">MedAgents</a>, and <a href="https://openreview.net/forum?id=EKdk4vxKO4" target="_blank" rel="noopener noreferrer">MDAgents</a>.
                  </p>
                </div>
              </section>

              <section
                ref={(el) => { revealRefs.current[15] = el; }}
                className="blog-pill-grid"
                aria-label="Nutrition and allergy panel design principles"
              >
                {allergyPanelPrinciples.map((item) => (
                  <div key={item} className="blog-pill-card">
                    {item}
                  </div>
                ))}
              </section>

              <section
                ref={(el) => { revealRefs.current[16] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The panel</p>
                <h3 className="blog-heading">I did not want one chatbot pretending to be a doctor. I wanted a panel that argues.</h3>
                <p>
                  The system takes the parents' inputs, including PDF exams and notes, and routes the case through three specialist agents trained to reason from a functional-medicine lens while staying explicit about uncertainty. The pediatrician agent checks age-specific constraints, growth context, red flags, medication questions, and what should be escalated. The nutritionist agent maps the diet pattern, missing nutrients, tolerated foods, meal rhythm, supplement considerations, and the risk of narrowing a toddler's food world too aggressively. The allergy specialist agent focuses on reaction patterns, likely trigger categories, histamine load, environmental context, testing questions, and emergency-plan gaps.
                </p>
                <p>
                  Each agent first reviews the case independently. That matters because a panel only becomes useful if the agents form their own hypotheses before they see everyone else's answer. Then they debate: the pediatrician can challenge an elimination diet that looks nutritionally risky, the nutritionist can ask whether a supplement idea is age-appropriate, and the allergy specialist can push back when a food correlation is too weak or when the family needs medical testing rather than another home experiment.
                </p>
                <p>
                  After the debate, a moderator agent creates the artifact the family actually needs: possible root causes, key observations, diet suggestions to discuss with professionals, supplement considerations, questions for the family doctor or specialists, and a protocol for what to investigate next. The output is not a diagnosis. It is a structured agenda for better appointments and calmer decision-making.
                </p>
              </section>

              <section
                ref={(el) => { revealRefs.current[17] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The architecture</p>
                <h3 className="blog-heading">Multi-agent AI is useful when the roles create real friction.</h3>
                <p>
                  A lot of multi-agent demos are theater: three personas politely rephrasing the same answer. For this project, I designed the panel around productive disagreement. The agents receive the same evidence packet, but they are graded against different responsibilities. One looks for child-safety and escalation logic. One looks for nutrition adequacy and practicality. One looks for allergy-pattern rigor. The moderator is not allowed to simply average them; it has to preserve disagreements, flag missing data, and separate high-confidence observations from ideas that need clinician review.
                </p>
                <p>
                  The research direction supports this pattern. Multi-agent debate can help models identify reasoning gaps because agents externalize different reasoning paths before convergence. Medical multi-agent frameworks go further by testing whether role-specific collaboration improves complex clinical reasoning. My practical takeaway was simple: do not add agents because it sounds advanced; add them when a domain has legitimate competing lenses and when the final answer must show the tension between those lenses.
                </p>
                <p>
                  Cost mattered too. I built an orchestrator that routes work between Anthropic and Kimi from Moonshot AI depending on the stage. Kimi handles extraction, research packets, document digestion, and first-pass analysis. Claude is reserved for deeper reasoning, contradiction handling, synthesis, and final moderation. That routing keeps the system more affordable without treating all reasoning steps as equal.
                </p>
                <div className="blog-stack-list">
                  {allergyPanelStack.map((item) => (
                    <span key={item} className="blog-stack-chip">{item}</span>
                  ))}
                </div>
              </section>

              <section
                ref={(el) => { revealRefs.current[18] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The safety model</p>
                <h3 className="blog-heading">The most important feature is knowing where the AI must stop.</h3>
                <p>
                  Pediatric allergy and nutrition advice is high-stakes. A wrong suggestion can lead to unnecessary restriction, missed calories, delayed treatment, or dangerous under-reaction to symptoms. So the system is designed as a preparation layer, not a replacement for medical care. It never frames itself as the final authority, and it keeps repeating the same operational boundary: discuss protocols, testing, supplements, and elimination diets with the family doctor, pediatrician, allergist, or qualified dietitian.
                </p>
                <p>
                  The moderator also separates outputs into safer categories: observed evidence from the parents' files, possible patterns, questions to ask, items that need professional confirmation, and red flags that should not wait for another AI round. That structure is boring on purpose. In family health, the goal is not a magical answer; the goal is reducing chaos, making appointments more productive, and helping parents notice what information is still missing.
                </p>
              </section>

              <section
                ref={(el) => { revealRefs.current[19] = el; }}
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">Why ADES mattered</p>
                <h3 className="blog-heading">I used ADES to design the agents before I trusted the workflow.</h3>
                <p>
                  ADES, my Agent Design Studio, helped me design the architecture, system prompts, role boundaries, and graders before coding the whole flow. That was important because the project was emotionally charged. When you are building for family, it is easy to overfit to urgency. ADES forced me to write down the actual workflow: intake, extraction, evidence normalization, independent reviews, debate, contradiction resolution, moderated synthesis, safety disclaimer, and follow-up-question generation.
                </p>
                <p>
                  Claude Code and Codex helped me move from design to implementation. Vercel, GitHub, and the usual shipping stack made it possible to turn the prototype into something the family could actually use. But the core product choice was architectural, not technical: build a panel that helps parents become better prepared collaborators with doctors, not a black-box bot that hands out medical certainty.
                </p>
              </section>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

function ImageGrid({ images }: { images: BlogImage[] }) {
  return (
    <section className="blog-image-grid">
      {images.map((image) => (
        <figure key={image.src} className="blog-figure">
          <div className="blog-figure-image-wrap">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}
