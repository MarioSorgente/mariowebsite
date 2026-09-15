// ============================================================
// Site Configuration
// ============================================================

import type { EngagementMode } from './lib/engagement';

/** Copy that differs between the fractional and full-time views. */
export type ByMode<T> = Record<EngagementMode, T>;

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "Zero2Hero",
};

// ============================================================
// Engagement selector
// ============================================================

export interface EngagementOption {
  label: string;
  badge?: string;
  helper: string;
}

export const engagementSelectorConfig: { legend: string; options: ByMode<EngagementOption> } = {
  legend: "How would you like to work together?",
  options: {
    fractional: {
      label: "Fractional",
      badge: "Preferred",
      helper: "Part-time leadership or a focused engagement.",
    },
    "full-time": {
      label: "Full-time",
      helper: "Open to the right remote product role.",
    },
  },
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  /** Replaces the label in full-time mode. */
  fullTimeLabel?: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: ByMode<string>;
}

export const navigationConfig: NavigationConfig = {
  // Order must follow the sections on the page: useActiveSection takes the
  // last entry whose section has passed the scroll line, so an out-of-order
  // link highlights the wrong item.
  links: [
    { label: "Services", fullTimeLabel: "Role scope", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "Case studies", href: "#blog" },
    { label: "About", href: "#about" },
    { label: "Background", href: "/background" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText: {
    fractional: "Get in touch",
    "full-time": "Discuss a role",
  },
};

// ============================================================
// Hero
// ============================================================

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroModeCopy {
  eyebrow: string;
  headline: string;
  body: string;
  supporting: string;
  availability: string;
  primaryCta: string;
  secondaryCta: string;
  /** A `#section` scrolls on the home page; a `/route` navigates. */
  secondaryHref: string;
}

export interface HeroConfig {
  modes: ByMode<HeroModeCopy>;
  stats: HeroStat[];
}

export const heroConfig: HeroConfig = {
  modes: {
    fractional: {
      eyebrow: "Fractional Product Leadership",
      headline: "A clear product direction your team can deliver.",
      body: "I help founders and product teams set priorities, understand customers and ship. Part-time leadership, or a focused engagement when you need a next step.",
      supporting: "Senior product experience, technical depth, hands-on AI prototyping.",
      availability: "Remote · Fractional preferred",
      primaryCta: "Discuss your product",
      secondaryCta: "See my work",
      secondaryHref: "#blog",
    },
    "full-time": {
      eyebrow: "Senior Product Manager",
      headline: "Product leadership from first question to next release.",
      body: "Strategy, customer discovery and technical depth in one role. I help teams choose what matters and ship with a clear definition of success.",
      supporting: "AI product development, working across engineering and business teams.",
      availability: "Remote roles · Fractional preferred",
      primaryCta: "Discuss a role",
      secondaryCta: "View background",
      secondaryHref: "/background",
    },
  },
  stats: [
    { value: "120%", label: "Revenue growth" },
    { value: "1,000+", label: "Active users" },
    { value: "48h", label: "Idea to working demo" },
    { value: "4", label: "Companies founded" },
    {
      value: "Tens of hours",
      label: "Training OpenAI and Anthropic models as a product management expert",
    },
  ],
};

// ============================================================
// Marquee (capability ticker under the hero)
// ============================================================

export const marqueeItems: string[] = [
  "AI Product Strategy",
  "LLM-Powered Workflows",
  "Agent Design",
  "Rapid AI Prototyping",
  "Discovery & Validation",
  "Product-Market Fit",
  "Platform & SaaS",
  "Go-To-Market",
  "Roadmapping",
  "Human-in-the-Loop Systems",
];

// ============================================================
// Credibility (verified experience and two recommendation excerpts)
// ============================================================

export interface ExperienceFact {
  role: string;
  organisation: string;
  dates: string;
}

export interface RecommendationExcerpt {
  /** An id from data/recommendations.ts. The text is read from there, verbatim. */
  recommendationId: string;
  paragraph: number;
}

export interface CredibilityConfig {
  eyebrow: string;
  facts: ExperienceFact[];
  excerpts: RecommendationExcerpt[];
  linkText: string;
}

// Every fact below is taken from data/backgroundData.ts.
export const credibilityConfig: CredibilityConfig = {
  eyebrow: "Track record",
  facts: [
    { role: "Senior Product Manager", organisation: "Sympower", dates: "2025 – present" },
    { role: "Product Manager", organisation: "Sympower", dates: "2023 – 2025" },
    { role: "Product Manager", organisation: "Optics11", dates: "2020 – 2023" },
    { role: "Co-founder", organisation: "Binderly", dates: "2025 – 2026" },
  ],
  excerpts: [
    { recommendationId: "olivier-gillin", paragraph: 3 },
    { recommendationId: "adam-castle", paragraph: 2 },
  ],
  linkText: "All recommendations",
};

// ============================================================
// Problems
// ============================================================

export interface TitledCard {
  title: string;
  body: string;
}

export interface CardSectionConfig {
  eyebrow: string;
  heading: string;
  intro?: string;
  cards: TitledCard[];
  closing?: string;
}

export const problemsConfig: CardSectionConfig = {
  eyebrow: "Where I help",
  heading: "When product decisions need attention",
  cards: [
    {
      title: "Everything is a priority",
      body: "The roadmap keeps changing and nobody can say what deserves time.",
    },
    {
      title: "The founder coordinates everything",
      body: "Decisions, customer questions and follow-ups all land on one person.",
    },
    {
      title: "Customers try it and leave",
      body: "You need to see where people struggle and which changes are worth testing.",
    },
    {
      title: "AI ideas outpace the plan",
      body: "Find a useful workflow, test it and decide what is ready for real users.",
    },
  ],
};

// ============================================================
// Role scope (full-time counterpart of the services section)
// ============================================================

export const roleScopeConfig: CardSectionConfig & { roleFit: string; cta: string } = {
  eyebrow: "Role scope",
  heading: "What I can own in your team",
  intro: "Senior product roles with clear ownership, remote work and a team that values customer evidence.",
  cards: [
    {
      title: "Product direction",
      body: "Turn goals and customer needs into priorities and a roadmap the team understands.",
    },
    {
      title: "Discovery and delivery",
      body: "Define problems, test assumptions and ship improvements with design and engineering.",
    },
    {
      title: "AI product development",
      body: "Find useful AI applications, prototype them and define how to evaluate quality.",
    },
    {
      title: "Team collaboration",
      body: "Connect product, engineering and commercial teams through clear ownership.",
    },
  ],
  roleFit: "Relevant roles: Senior Product Manager, AI Product Manager and Product Lead.",
  cta: "Share a role",
};

/** Earlier service pages that stay available outside the main offer. */
export const secondaryCapabilities = {
  label: "Also available:",
  links: [
    { label: "AI prototyping", href: "/capability/zero-to-demo" },
    { label: "AI product architecture", href: "/capability/ai-architecture" },
  ],
};

// ============================================================
// Statement (pinned scroll moment)
// ============================================================

export interface StatementConfig {
  text: string;
  accent: string[];
  caption: string;
}

export const statementConfig: StatementConfig = {
  text: "Most products fail because nobody wanted them. The quickest way to find out is to put a working version in front of real users.",
  accent: ["working", "users"],
  caption:
    "Every engagement ends with a clear decision, a plan or a working version the team can put in front of customers.",
};

// ============================================================
// Success measurement
// ============================================================

// Public copy only. Targets belong in an engagement scorecard, never here.
export const measurementConfig: CardSectionConfig = {
  eyebrow: "Results",
  heading: "Agree what success looks like first",
  intro: "A few measures, a baseline and a review date, tied to customer value and business results.",
  cards: [
    {
      title: "Customers reach value",
      body: "Do people complete the key action that makes the product useful, and how quickly?",
    },
    {
      title: "Customers stay",
      body: "Repeat use, cancellations and revenue kept from existing customers.",
    },
    {
      title: "The business benefits",
      body: "Paid conversion, revenue from a new offer or time saved in a recurring workflow.",
    },
    {
      title: "The team delivers",
      body: "Priorities stay clear, decisions happen promptly and agreed work ships as planned.",
    },
  ],
  closing: "Measures and targets depend on your product and baseline. We set them together at the start.",
};

// ============================================================
// Capability Detail (secondary sub-pages)
// ============================================================

export interface CapabilityDetailData {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface CapabilityDetailConfig {
  sectionLabel: string;
  backLinkText: string;
  prevLabel: string;
  nextLabel: string;
  notFoundText: string;
  capabilities: Record<string, CapabilityDetailData>;
}

export const capabilityDetailConfig: CapabilityDetailConfig = {
  sectionLabel: "Capability",
  backLinkText: "Back to home",
  prevLabel: "Previous",
  nextLabel: "Next",
  notFoundText: "Service not found.",
  capabilities: {
    "zero-to-demo": {
      title: "Zero-to-Demo Sprints",
      subtitle: "From concept to clickable prototype in 48 to 72 hours.",
      paragraphs: [
        "Most founders spend months and thousands of dollars building products nobody wants. A Zero-to-Demo Sprint puts the test first. We build a working, clickable demo in 48 to 72 hours, using no-code tools, AI code generation and rapid prototyping.",
        "During the sprint we define your core user story, map the main user journey, and build just enough to get useful feedback. You end up with a product people can click through and react to, rather than a pitch deck.",
        "This approach has helped founders secure pre-seed meetings, test demand before hiring engineers, and change direction early when the data pointed somewhere else. A sprint is scoped and priced as a focused engagement, or included in fractional or strategy work when a prototype helps answer a product question. We agree the scope and intended use before anything is built.",
        "After the sprint you keep the demo, a product requirements document, and a roadmap for turning the prototype into an MVP you can ship.",
      ],
    },
    "ai-architecture": {
      title: "AI Product Architecture",
      subtitle: "Designing products with AI running through them.",
      paragraphs: [
        "The next generation of products will have AI running through them instead of a chatbot bolted onto existing software. AI Product Architecture means designing systems where the model shapes the whole experience rather than one corner of it.",
        "I help founders work out which user problems actually suit AI, choose the right model architecture from frontier LLMs, fine-tuned open weights or classical machine learning, and design interactions that feel natural rather than mechanical.",
        "That covers prompt engineering frameworks, retrieval design, agent orchestration and evaluation systems. The aim is a product that answers better the more people use it.",
        "Whether you are building a creative tool, an analytics platform or an assistant for one industry, the architecture you choose in the first 90 days decides what competitors will struggle to copy for years.",
      ],
    },
  },
};

// ============================================================
// Process (CinematicVision section)
// ============================================================

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface ProcessModeCopy {
  heading: string;
  steps: ProcessStep[];
}

export const processConfig: { sectionLabel: string; modes: ByMode<ProcessModeCopy> } = {
  sectionLabel: "Process",
  modes: {
    fractional: {
      heading: "How we get started",
      steps: [
        {
          index: "01",
          title: "Understand",
          description: "The product, the team and the decision or outcome that needs attention.",
        },
        {
          index: "02",
          title: "Agree scope",
          description: "Responsibilities, capacity, deliverables and the measures we review.",
        },
        {
          index: "03",
          title: "Work together",
          description: "I join the work, make decisions visible and move priorities forward.",
        },
        {
          index: "04",
          title: "Review",
          description: "Check progress, update the plan and shape the next phase.",
        },
      ],
    },
    "full-time": {
      heading: "How I start a new role",
      steps: [
        {
          index: "01",
          title: "Learn",
          description: "Customers, business goals, existing evidence and how decisions get made.",
        },
        {
          index: "02",
          title: "Align",
          description: "The product area, decision rights and first measures of success.",
        },
        {
          index: "03",
          title: "Deliver",
          description: "Work the top opportunities, evaluate results and adjust with the team.",
        },
      ],
    },
  },
};

// ============================================================
// Research (AlumniArchives section)
// ============================================================

export interface ResearchProject {
  title: string;
  year: string;
  discipline: string;
  image: string;
  href: string;
}

export interface ResearchConfig {
  sectionLabel: string;
  projects: ResearchProject[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "Companies Founded",
  projects: [
    {
      title: "yourwai.tech",
      year: "2023",
      discipline: "AI EdTech Tool",
      image: "/images/research-2.webp",
      href: "https://yourwai.tech/",
    },
    {
      title: "Binderly",
      year: "2025",
      discipline: "AI Tool for Sustainability",
      image: "/images/research-1.webp",
      href: "https://www.binderly-lca.com/intro",
    },
    {
      title: "ADES",
      year: "2026",
      discipline: "Agentic Workflow for Product Managers",
      image: "/images/research-3.webp",
      href: "https://ades-agent-design-studio.vercel.app/",
    },
    {
      title: "Advisory",
      year: "2026",
      discipline: "Founder Support",
      image: "/images/research-4.webp",
      href: "https://mariowebsite-one.vercel.app/",
    },
  ],
};

// ============================================================
// About
// ============================================================

export const aboutConfig = {
  eyebrow: "About",
  heading: "About Mario",
  paragraphs: [
    "I'm Mario Sorgente, a Senior Product Manager with a physics background. My work spans product management at Sympower, AI product development and my own projects.",
    "I take complicated problems apart, make the choices clear and get something useful into people's hands.",
  ],
  portrait: "/images/mario-sorgente.webp",
  linkText: "My background",
  linkHref: "/background",
};

// ============================================================
// FAQ
// ============================================================

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqConfig: { eyebrow: string; heading: string; modes: ByMode<FaqItem[]> } = {
  eyebrow: "FAQ",
  heading: "Questions",
  modes: {
    fractional: [
      {
        question: "What does fractional mean?",
        answer: "I work with your team for part of the week and own a defined product scope. We agree which decisions I own and what progress to expect.",
      },
      {
        question: "How much time do you commit?",
        answer: "One or two days a week, starting with three to six months. Focused consulting has a smaller, defined scope.",
      },
      {
        question: "Leadership or advisory?",
        answer: "Leadership is ongoing ownership of product work. Advisory helps you decide through research, reviews and recommendations.",
      },
      {
        question: "Do you work remotely?",
        answer: "Yes. We agree overlap hours, channels and meeting rhythm upfront.",
      },
      {
        question: "Can you build AI prototypes?",
        answer: "Yes, when a prototype helps answer a product question. We agree the scope first, including what production would need.",
      },
      {
        question: "How do you define success?",
        answer: "An agreed outcome, a baseline and a review date. For short work, success can be a resolved decision and a clear plan.",
      },
      {
        question: "What does it cost?",
        answer: "It depends on scope: a monthly fee for ongoing work, a project fee for focused engagements. The proposal lists what is included.",
      },
    ],
    "full-time": [
      {
        question: "Are you open to full-time roles?",
        answer: "Yes, for the right remote product role. Fractional is my preference, so scope, team and working model matter.",
      },
      {
        question: "Which roles fit?",
        answer: "Senior Product Manager, AI Product Manager and Product Lead.",
      },
      {
        question: "Are you open to B2B contracts?",
        answer: "Yes, B2B or employment. The right structure depends on the role.",
      },
      {
        question: "What should an enquiry include?",
        answer: "Company, role description, remote setup, location requirements and compensation range.",
      },
    ],
  },
};

// ============================================================
// Contact
// ============================================================

export interface ContactModeCopy {
  heading: string;
  body: string;
  primaryAction: string;
  secondaryAction?: { label: string; href: string };
}

export const contactConfig: { eyebrow: string; bookingLabel: string; modes: ByMode<ContactModeCopy> } = {
  eyebrow: "Contact",
  bookingLabel: "Book an intro call",
  modes: {
    fractional: {
      heading: "Where does your product need attention?",
      body: "Share the challenge, the team and the support you have in mind.",
      primaryAction: "Email about your product",
    },
    "full-time": {
      heading: "Have a product role in mind?",
      body: "Send the role, the team context and the working arrangement.",
      primaryAction: "Email about a role",
      secondaryAction: { label: "View background", href: "/background" },
    },
  },
};

// ============================================================
// Footer
// ============================================================

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  columns: [
    {
      title: "Services",
      links: [
        { label: "Fractional Product Leadership", href: "/services/fractional-product-leadership" },
        { label: "Product Strategy & Advisory", href: "/services/product-strategy" },
        { label: "Focused Product Consulting", href: "/services/focused-product-consulting" },
        { label: "Product Operations & Team Coaching", href: "/services/product-operations" },
        { label: "AI prototyping", href: "/capability/zero-to-demo" },
        { label: "AI product architecture", href: "/capability/ai-architecture" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Case studies", href: "#blog" },
        { label: "Companies founded", href: "#alumni" },
        { label: "About", href: "#about" },
        { label: "Background", href: "/background" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/mario-sorgente/", external: true },
        { label: "GitHub", href: "https://github.com/MarioSorgente", external: true },
        { label: "mario.sorgente(at)gmail.com", href: "mailto:mario.sorgente@gmail.com" },
      ],
    },
  ],
  copyright: "© 2026 Mario Sorgente. All rights reserved.",
  bottomLinks: [
    { label: "Download AI Product Guide", href: "https://drive.google.com/file/d/1gg7k9FqsffFs76-sqRhtFPANLHX0sU5Y/view?usp=sharing" },
    { label: "Privacy", href: "#" },
  ],
};
