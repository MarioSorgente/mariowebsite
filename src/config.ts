// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "Zero2Hero",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  links: [
    { label: "Services", href: "#curriculum" },
    { label: "Process", href: "#cinematic" },
    { label: "Companies Founded", href: "#alumni" },
    { label: "Case Studies", href: "#blog" },
    { label: "Background", href: "/background" },
    { label: "Contact", href: "#footer" },
  ],
  ctaText: "Get in touch",
};

// ============================================================
// Hero
// ============================================================

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroConfig {
  title: string;
  role: string;
  status: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
  secondaryCtaText: string;
  stats: HeroStat[];
}

export const heroConfig: HeroConfig = {
  title: "Zero2Hero: Product Management",
  role: "Senior Product Builder",
  status: "Open to founder engagements",
  subtitleLine1: "I am Mario Sorgente, a founder, product lead in AI and software scaleups and artist, with a background in physics engineering, business and a creative approach to building products.",
  subtitleLine2: "I help founders turn ideas into real products. I can build a product demo at zero cost in days.",
  ctaText: "Explore services",
  secondaryCtaText: "See case studies",
  stats: [
    { value: "120%", label: "Revenue growth delivered" },
    { value: "1,000+", label: "Active users acquired" },
    { value: "48h", label: "Idea to working demo" },
    { value: "4", label: "Companies founded" },
    {
      value: "Tens of hours",
      label: "Spent training OpenAI and Anthropic models as AI PM trainer",
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
  "Zero-Cost Prototyping",
  "Discovery & Validation",
  "Product-Market Fit",
  "Platform & SaaS",
  "Go-To-Market",
  "Roadmapping",
  "Human-in-the-Loop Systems",
];

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
    "Every engagement ends with something people outside the team can open and use. What they do with it decides what gets built next.",
};

// ============================================================
// Capabilities (Curriculum section)
// ============================================================

export interface CapabilityItem {
  title: string;
  slug: string;
  description: string;
  image: string;
  meta: string[];
}

export interface CapabilitiesConfig {
  sectionLabel: string;
  items: CapabilityItem[];
}

export const capabilitiesConfig: CapabilitiesConfig = {
  sectionLabel: "What I Offer",
  items: [
    {
      title: "Zero-to-Demo Sprints",
      slug: "zero-to-demo",
      description: "Build working product demos in 48-72 hours at zero cost. Validate your idea with real users before spending a dime on development.",
      image: "/images/capability-1.jpg",
      meta: ["48-72 hours", "Clickable demo", "Zero cost"],
    },
    {
      title: "AI Product Architecture",
      slug: "ai-architecture",
      description: "Design intelligent product workflows that leverage AI to create 10x user experiences. Not chatbot wrappers - deeply integrated intelligence.",
      image: "/images/capability-2.jpg",
      meta: ["Agent design", "Evaluation", "Retrieval"],
    },
    {
      title: "Founder Coaching",
      slug: "founder-coaching",
      description: "Sessions at your pace to structure your MVP, prioritize features and find the fastest path to product-market fit. Hands-on support or coaching.",
      image: "/images/capability-3.jpg",
      meta: ["MVP scoping", "Prioritisation", "Hands-on"],
    },
  ],
};

// ============================================================
// Capability Detail (sub-pages)
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
  sectionLabel: "Service",
  backLinkText: "Back to home",
  prevLabel: "Previous",
  nextLabel: "Next",
  notFoundText: "Service not found.",
  capabilities: {
    "zero-to-demo": {
      title: "Zero-to-Demo Sprints",
      subtitle: "From concept to clickable prototype in 48-72 hours.",
      paragraphs: [
        "Most founders spend months and thousands of dollars building products nobody wants. A Zero-to-Demo Sprint reverses that order. We build a working, clickable demo in 48 to 72 hours, using no-code tools, AI code generation and rapid prototyping.",
        "During the sprint we define your core user story, map the main user journey, and build just enough to get useful feedback. You end up with a product people can click through and react to, rather than a pitch deck.",
        "This approach has helped founders secure pre-seed meetings, test demand before hiring engineers, and change direction early when the data pointed somewhere else. The sprint costs nothing. I give my time to founders who are serious about building something people will use.",
        "After the sprint you keep the demo, a product requirements document, and a roadmap for turning the prototype into an MVP you can ship.",
      ],
    },
    "ai-architecture": {
      title: "AI Product Architecture",
      subtitle: "Designing products with AI running through them.",
      paragraphs: [
        "The next generation of products will have AI running through them rather than a chatbot bolted onto existing software. AI Product Architecture means designing systems where the model shapes the whole experience, not one corner of it.",
        "I help founders work out which user problems actually suit AI, choose the right model architecture from frontier LLMs, fine-tuned open weights or classical machine learning, and design interactions that feel natural rather than mechanical.",
        "That covers prompt engineering frameworks, retrieval design, agent orchestration and evaluation systems. The aim is a product that answers better the more people use it.",
        "Whether you are building a creative tool, an analytics platform or an assistant for one industry, the architecture you choose in the first 90 days decides what competitors will struggle to copy for years.",
      ],
    },
    "founder-coaching": {
      title: "Founder Coaching",
      subtitle: "Hands-on product strategy for early-stage founders.",
      paragraphs: [
        "Building a product as a founder is lonely. You make expensive decisions about scope, timing and positioning with thin data and constant pressure. Founder Coaching gives you someone to test those decisions against, and hands-on help when you need it.",
        "We meet online at your pace to review progress, settle prioritisation conflicts and sharpen how you explain the product. I have built two companies and led product at AI scaleups, and I have already made many of these mistakes myself.",
        "Coaching covers MVP scoping, user research, the metrics worth tracking, and hiring for product and engineering. When it helps, I work directly on the design and the prototype with you.",
        "This suits founders who want to move quickly and still know why each decision was made. How we work together changes as your stage and problems change.",
      ],
    },
  },
};

// ============================================================
// Architecture (CinematicVision section)
// ============================================================

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface ArchitectureConfig {
  sectionLabel: string;
  title: string;
  description: string;
  steps: ProcessStep[];
}

export const architectureConfig: ArchitectureConfig = {
  sectionLabel: "Process",
  title: "From a rough idea to a plan the team can build from.",
  description: "We define your MVP, structure the product, and work out the shortest route to a build, whether you want hands-on help or coaching. I came to product from physics engineering, so the work starts by taking the problem apart methodically. Then it moves quickly, because nothing is settled until someone outside the team has used what we made.",
  steps: [
    {
      index: "01",
      title: "Define",
      description: "We pick the one user problem worth solving first, and write down what the product has to prove.",
    },
    {
      index: "02",
      title: "Structure",
      description: "We map the scope, the architecture and the main user journey, so nothing gets built by accident.",
    },
    {
      index: "03",
      title: "Execute",
      description: "We build a working version in days, using AI code generation and rapid prototyping.",
    },
    {
      index: "04",
      title: "Learn",
      description: "Real users try it, tell us what breaks, and we rewrite the roadmap around what they say.",
    },
  ],
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
      image: "/images/research-2.jpg",
      href: "https://yourwai.tech/",
    },
    {
      title: "Binderly",
      year: "2025",
      discipline: "AI Tool for Sustainability",
      image: "/images/research-1.jpg",
      href: "https://www.binderly-lca.com/intro",
    },
    {
      title: "ADES",
      year: "2026",
      discipline: "Agentic Workflow for Product Managers",
      image: "/images/research-3.jpg",
      href: "https://ades-agent-design-studio.vercel.app/",
    },
    {
      title: "Advisory",
      year: "2026",
      discipline: "Founder Support",
      image: "/images/research-4.jpg",
      href: "https://mariowebsite-one.vercel.app/",
    },
  ],
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
  eyebrow: string;
  heading: string;
  blurb: string;
  ctaText: string;
  ctaHref: string;
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  eyebrow: "Start a conversation",
  heading: "Let's build the first version.",
  blurb:
    "Tell me about the idea you keep coming back to. If it holds up, we can put a working version in front of real users this week.",
  ctaText: "mario.sorgente@gmail.com",
  ctaHref: "mailto:mario.sorgente@gmail.com",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Zero-to-Demo Sprints", href: "/capability/zero-to-demo" },
        { label: "AI Product Architecture", href: "/capability/ai-architecture" },
        { label: "Founder Coaching", href: "/capability/founder-coaching" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Companies Founded", href: "#alumni" },
        { label: "Case Studies", href: "#blog" },
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
