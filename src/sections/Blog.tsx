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
import goJobImage from '../../public/images/gojob-dashboard.svg';
import mammaCaloriesImage from '../../public/images/mamma-calories-dashboard.svg';

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
    slug: 'mamma-calories-meal-prep',
    title: 'Mamma Calories: meal prep that adds up',
    eyebrow: 'Product case study',
    summary: 'Connecting restaurant menus with nutrition targets so coaches and clients can build practical weekly meal plans.',
    date: '2026',
    readTime: '8 min read',
    image: mammaCaloriesImage,
  },
  {
    slug: 'gojob-bali-hospitality-hiring',
    title: 'GoJob: a clearer shortlist for Bali hospitality hiring',
    eyebrow: 'Product case study',
    summary: 'Turning noisy hospitality applications into role-based local matches that employers can understand and act on.',
    date: '2026',
    readTime: '7 min read',
    image: goJobImage,
  },
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

        {selectedArticle === 'mamma-calories-meal-prep' && (
          <article ref={articleRef} className="blog-reader" aria-labelledby="mamma-calories-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study · Nutrition-aware meal planning</p>
                <h2 id="mamma-calories-blog-title">Mamma Calories: from nutrition targets to a week the kitchen can make</h2>
                <p>Mamma Calories is a product prototype for turning a restaurant's real dishes into repeatable weekly meal plans with calories, macros, and prices visible before a client orders.</p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://macronutrient.vercel.app/" target="_blank" rel="noopener noreferrer">Visit Mamma Calories ↗</a>
                </div>
              </div>
              <figure className="blog-hero-figure mamma-calories-feature-figure">
                <img src={mammaCaloriesImage} alt="Mamma Calories restaurant meal-planning screen with Plan and Build navigation, nutrition-data guidance, a weekly planner, meal macro totals, and visible prices" />
                <figcaption>The Mamma Calories prototype brings restaurant-branded meals, nutrition information, weekly planning, and price review into one Plan &amp; Build journey.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div><p className="blog-kicker">The opportunity</p><h3 className="blog-heading">The ingredients already exist. The planning connection does not.</h3></div>
                <div className="blog-copy">
                  <p>Restaurants already know the dishes their kitchens can prepare, the ingredients those dishes use, and what each portion costs. Coaches and clients work from a different set of inputs: daily calories, protein, carbohydrate and fat targets, dietary preferences, and the need for a routine that can be repeated.</p>
                  <p>The opportunity is to connect those realities. Instead of suggesting an idealized meal that is unavailable or asking a client to calculate every order manually, the product can make restaurant food plan-able: transparent enough to compare, practical enough to prepare, and priced before commitment.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The product model</p>
                <h3 className="blog-heading">Connect a live menu to a client's nutrition targets.</h3>
                <p>Mamma Calories treats the restaurant menu as structured planning data. Each available dish links its recipe, portion, nutrition estimate, price, availability, and dietary information to a planning layer. A coach or client can then assemble a week from food the kitchen can actually make and compare the resulting totals with the client's targets.</p>
                <p>This model is intentionally operational. It does not promise that a mathematically perfect plan can ignore kitchen capacity, ingredient availability, or substitutions. It helps the three people involved work from the same source of truth.</p>
              </section>

              <section className="blog-pill-grid" aria-label="Mamma Calories audiences">
                <div className="blog-pill-card"><strong>Restaurants</strong><br />Manage dishes, ingredients, portions, prices, availability, and fulfilment.</div>
                <div className="blog-pill-card"><strong>Coaches</strong><br />Translate a client's goals into calorie and macronutrient targets.</div>
                <div className="blog-pill-card"><strong>Clients</strong><br />Plan and order meals with macro totals and cost visible.</div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The planning journey</p>
                <h3 className="blog-heading">A weekly plan should explain itself before it becomes an order.</h3>
                <ol className="blog-step-list">
                  <li><strong>Choose meals.</strong><span>Browse food the selected restaurant currently offers.</span></li>
                  <li><strong>Inspect nutrition.</strong><span>Review portion size, ingredients, allergens, calories, protein, carbohydrates, fat, and price.</span></li>
                  <li><strong>Build the week.</strong><span>Place meals into days and meal slots to create a repeatable schedule.</span></li>
                  <li><strong>Compare with targets.</strong><span>See daily and weekly totals alongside the coach- or client-defined targets, without presenting them as medical advice.</span></li>
                  <li><strong>Review the price.</strong><span>Understand the expected cost and any quantity or fulfilment details before committing.</span></li>
                  <li><strong>Submit the request.</strong><span>Send an order or preparation request for restaurant confirmation rather than assuming capacity.</span></li>
                </ol>
              </section>

              <section className="blog-two-column blog-block">
                <div><p className="blog-kicker">Visible product decisions</p><h3 className="blog-heading">Reduce the distance between curiosity and a useful first plan.</h3></div>
                <div className="blog-copy">
                  <p>The supplied screen puts nutrition-data messaging near the start of the experience so users can understand what the numbers represent. That language must remain precise: data can be sourced and calculated consistently, but it should not be described as clinically verified unless the source, reviewer, method, and review date are confirmed.</p>
                  <p>People can begin planning without creating an account, while the simple “Plan &amp; Build” navigation keeps the core job prominent. The weekly ordering frame matches how meal prep is actually organized, and restaurant-specific branding makes it clear which kitchen, menu, prices, and fulfilment constraints apply.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Data integrity</p>
                <h3 className="blog-heading">A macro total is only as dependable as the recipe behind it.</h3>
                <p>Every calculation should retain the ingredient quantity and unit, edible yield, serving size, nutrition-data source, and last-updated date. Raw and cooked weights must not be mixed silently: cooking can change water content and serving weight, so the recipe should record preparation method and yield, then calculate nutrition for the served portion.</p>
                <p>Allergens need structured flags plus a clear cross-contact caveat from the restaurant. A substitution should never inherit the original totals automatically; the kitchen must record the replacement and quantity so calories, macros, allergens, and price can be recalculated and the client can accept the change. Menu-price or recipe updates should be versioned, preserving the values attached to an already submitted request while showing current values for new plans.</p>
                <p>Restaurant confirmation remains essential. The interface can make inputs and estimates transparent, but it cannot guarantee ingredient handling, preparation accuracy, or clinical suitability. Coaches and clients should be able to see the source and freshness of nutrition data and escalate dietary or medical questions to a qualified professional.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div><p className="blog-kicker">Mario's role &amp; prototype scope</p><h3 className="blog-heading">Build the smallest complete loop, not an imaginary platform.</h3></div>
                <div className="blog-copy">
                  <p>Mario framed the opportunity, mapped the restaurant–coach–client service model, designed the planning journey and information hierarchy, and built the responsive prototype. The scope demonstrates menu discovery, nutrition visibility, weekly plan assembly, target comparison, cost review, and a preparation-request handoff.</p>
                  <p>The technical approach uses a structured menu and recipe model behind a responsive web interface, with calculations derived from ingredient quantities and serving yields. The prototype does not claim completed restaurant, point-of-sale, delivery, payment, or clinical-data integrations, and it does not demonstrate traction.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Trade-offs &amp; learning</p>
                <h3 className="blog-heading">Convenience cannot come at the expense of traceability.</h3>
                <p>Letting users plan immediately lowers friction, but persistence and ordering may eventually require identity. Flexible substitutions help kitchens fulfil requests, but they complicate nutrition and allergen accuracy. Restaurant-specific menus make plans executable, while limiting the apparent choice of a broad recipe catalogue. Weekly totals are easy to scan, but must preserve a path back to every portion and ingredient.</p>
                <p>The central learning was that meal planning is not only a calculator. It is a coordination product: the useful plan is the one that aligns a nutritional intention with what a specific kitchen can reliably prepare, price, and confirm.</p>
              </section>

              <section className="blog-outcome" aria-labelledby="mamma-validation-title">
                <p className="blog-kicker">Next validation steps</p>
                <h3 id="mamma-validation-title" className="blog-heading">Test the service loop before scaling the feature set.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>Qualitative evidence</strong><p>Interview coaches about target setting and plan review, then run restaurant onboarding trials to test recipe entry, staff effort, substitutions, fulfilment, and preparation accuracy.</p></div>
                  <div><strong>Behavioral evidence</strong><p>Measure plan completion, submitted requests, repeat ordering, target comprehension, preparation discrepancies, and restaurant and client willingness to pay—without claiming these outcomes before trials are complete.</p></div>
                </div>
              </section>
            </div>
          </article>
        )}

        {selectedArticle === 'gojob-bali-hospitality-hiring' && (
          <article ref={articleRef} className="blog-reader" aria-labelledby="gojob-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study · Hospitality hiring</p>
                <h2 id="gojob-blog-title">GoJob: from application noise to a useful shortlist</h2>
                <p>
                  GoJob explores a focused hiring experience for Bali's restaurants, cafés, bars, hotels, and beach clubs: start with the role, surface relevant local candidates, show why each person may fit, and make the next conversation easy.
                </p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://gojob-xi.vercel.app/" target="_blank" rel="noopener noreferrer">Visit GoJob ↗</a>
                </div>
              </div>
              <figure className="blog-hero-figure gojob-feature-figure">
                <img src={goJobImage} alt="GoJob employer dashboard for a live Bali hospitality role, showing bilingual navigation and a ranked shortlist with match percentages, candidate evidence, and Invite to chat buttons" />
                <figcaption>GoJob's employer view keeps the live role, ranked match evidence, and “Invite to chat” action together so a shortlist can lead directly to a conversation.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div>
                  <p className="blog-kicker">The hiring problem</p>
                  <h3 className="blog-heading">A full inbox is not the same as a credible candidate pipeline.</h3>
                </div>
                <div className="blog-copy">
                  <p>Bali hospitality operators often need to hire against the clock. A restaurant, café, bar, hotel, or beach club can attract a noisy mix of messages and applications, but the employer still has to work out who is legitimate, relevant to the role, nearby, and actually available.</p>
                  <p>The problem is not simply application volume. It is the lack of comparable information. Experience may be buried in a message, availability may be missing, and role fit may depend on language or location. Manual filtering turns the owner's inbox into an improvised applicant-tracking system.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The product hypothesis</p>
                <h3 className="blog-heading">Replace inbox archaeology with role-based matching.</h3>
                <p>The hypothesis behind GoJob is that employers will make faster, more confident first-pass decisions when every candidate is evaluated against a defined role and presented in a ranked shortlist. Rather than treating every application as an unstructured message, the product can organize relevant evidence into a consistent, scannable view.</p>
                <p>A match percentage is useful only as a navigation aid—not a hiring verdict. It should help an employer decide whom to inspect first, while the supporting evidence makes the recommendation understandable and leaves the decision with the human.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The employer journey</p>
                <h3 className="blog-heading">One clear path from an open role to a real conversation.</h3>
                <ol className="blog-step-list">
                  <li><strong>Create or select a role.</strong><span>Begin with a specific live vacancy rather than a general candidate feed.</span></li>
                  <li><strong>Define the requirements.</strong><span>Capture the experience, location, language, availability, and other criteria that matter for this role.</span></li>
                  <li><strong>Review local matches.</strong><span>Scan a shortlist ordered by fit instead of reading unrelated applications chronologically.</span></li>
                  <li><strong>Inspect the evidence.</strong><span>See concise reasons behind a match and open the candidate's profile before deciding.</span></li>
                  <li><strong>Invite to chat.</strong><span>Move a promising candidate into a direct conversation with an explicit next action.</span></li>
                </ol>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">Trust &amp; localization</p>
                  <h3 className="blog-heading">Ranking must be legible, local, and careful about certainty.</h3>
                </div>
                <div className="blog-copy">
                  <p>A useful filter should weigh signals that matter in Bali hospitality: stated availability, relevant role experience, working languages, location, profile completeness, and overall fit with the role requirements. Employers should be able to see which signals contributed instead of trusting an unexplained score.</p>
                  <p>Identity and profile completeness can also help employers assess whether to start a conversation, but they are not interchangeable. A complete profile is not proof of identity, and a match score is not proof that someone is available or suitable. <strong>Confirmation before publication:</strong> confirm which signals GoJob currently collects, which it actively checks, and whether any identity-verification flow exists. Until confirmed, these are product principles and proposed ranking inputs—not claims about live verification capabilities.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Decisions visible in the product</p>
                <h3 className="blog-heading">The interface makes the product hypothesis tangible.</h3>
                <p>The supplied view leads with Bali-specific hospitality positioning rather than a generic global job board. Bilingual entry points support the local context. Inside the employer experience, live-role status establishes what the shortlist is for; match percentages create an order for review; and concise candidate evidence explains the ranking without turning each card into a résumé.</p>
                <p>The strongest interaction decision is the final one: “Invite to chat.” It gives employers a concrete next step while avoiding the false certainty of “hire” or “approve.” The product is helping two people reach a relevant conversation, not automating the employment decision.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Mario's role &amp; build process</p>
                <h3 className="blog-heading">I turned a local operating problem into a testable product flow.</h3>
                <p>My role spanned product framing, journey design, information hierarchy, interface decisions, and prototype delivery. I started with the employer's decision—not the database—and worked backward: what must an owner know before inviting someone to talk, what evidence can be shown concisely, and which details should remain available in the full profile?</p>
                <p>I translated that reasoning into the role-first flow, a ranked candidate-card system, bilingual entry points, and a responsive working experience. The build is deliberately narrow: enough of the end-to-end journey to test whether structured matching is more useful than manual inbox filtering, without pretending that the ranking model or trust layer is finished.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">Validation &amp; next experiments</p>
                  <h3 className="blog-heading">The next evidence must come from hiring behavior, not interface polish.</h3>
                </div>
                <div className="blog-copy">
                  <p>The prototype validates that the core journey can be expressed as one coherent experience. It does not yet establish candidate quality, employer demand, ranking accuracy, trust, or commercial willingness to pay. <strong>Confirmation before publication:</strong> add any completed employer interviews, candidate research, or live hiring trials only after the evidence and wording have been reviewed.</p>
                  <p>Next experiments should test whether employers understand the match evidence, which criteria they actually use, whether the ranking changes whom they contact, and where candidates abandon profile completion. A small role-by-role pilot could compare a GoJob shortlist with the operator's existing process, while interviews probe language preferences, freshness of availability, location radius, and the minimum trust signals required before chat.</p>
                </div>
              </section>

              <section className="blog-outcome" aria-labelledby="gojob-outcome-title">
                <p className="blog-kicker">Outcome</p>
                <h3 id="gojob-outcome-title" className="blog-heading">Built is not the same as commercially validated.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>What was built</strong><p>A Bali-specific, bilingual product prototype with role setup, ranked local matches, concise fit evidence, live-role context, candidate review, and an invite-to-chat action.</p></div>
                  <div><strong>What remains unvalidated</strong><p>Repeat employer use, successful hires, candidate supply and quality, ranking performance, willingness to pay, and any verification or integration capability. These should not be claimed without evidence.</p></div>
                </div>
              </section>
            </div>
          </article>
        )}

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
