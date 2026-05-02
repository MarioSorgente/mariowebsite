// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "Mario Sorgente",
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
    { label: "Portfolio", href: "#alumni" },
    { label: "Contact", href: "#footer" },
  ],
  ctaText: "Get in touch",
};

// ============================================================
// Hero
// ============================================================

export interface HeroConfig {
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  title: "Mario Sorgente",
  subtitleLine1: "Founder (x2 companies), artist and product lead in AI and software scaleups, with a background in physics engineering, business and a creative approach to building products.",
  subtitleLine2: "I help founders turn ideas into real products. I can build product demo at zero cost in days.",
  ctaText: "Explore services",
};

// ============================================================
// Capabilities (Curriculum section)
// ============================================================

export interface CapabilityItem {
  title: string;
  slug: string;
  description: string;
  image: string;
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
    },
    {
      title: "AI Product Architecture",
      slug: "ai-architecture",
      description: "Design intelligent product workflows that leverage AI to create 10x user experiences. Not chatbot wrappers — deeply integrated intelligence.",
      image: "/images/capability-2.jpg",
    },
    {
      title: "Founder Coaching",
      slug: "founder-coaching",
      description: "Weekly hands-on sessions to structure your MVP, prioritize features, and find the fastest path to product-market fit. Hands-on support or coaching.",
      image: "/images/capability-3.jpg",
    },
    {
      title: "Technical Due Diligence",
      slug: "due-diligence",
      description: "Pre-fundraising product reviews to identify risks, strengthen your technical narrative, and prepare compelling demos for investor meetings.",
      image: "/images/capability-4.jpg",
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
        "Most founders spend months and thousands of dollars building products nobody wants. The Zero-to-Demo Sprint flips this script — we build a working, clickable demo in 48-72 hours using no-code tools, AI code generation, and rapid prototyping techniques.",
        "During the sprint, we define your core user story, map the critical user journey, and build just enough to get meaningful feedback. The demo isn't a pitch deck — it's a real product surface that users can interact with.",
        "This approach has helped founders secure pre-seed meetings, validate demand before hiring engineers, and pivot early when the data suggests a different direction. The cost is zero — my time is invested in founders who are committed to building something meaningful.",
        "After the sprint, you receive the demo, a product requirements document, and a clear roadmap for turning the prototype into a production-ready MVP.",
      ],
    },
    "ai-architecture": {
      title: "AI Product Architecture",
      subtitle: "Design products where AI is the core, not a bolt-on.",
      paragraphs: [
        "The next generation of iconic products will be AI-native — not existing software with a chatbot attached. AI Product Architecture is about designing systems where intelligence flows through every layer of the user experience.",
        "I help founders identify which user problems are genuinely suited for AI, select the right model architecture (whether frontier LLMs, fine-tuned open weights, or classical ML), and design interaction patterns that feel magical rather than mechanical.",
        "This includes prompt engineering frameworks, retrieval architecture design, agent orchestration, and evaluation systems. The goal is a product that gets smarter with every user interaction, creating compounding value over time.",
        "Whether you're building a creative tool, an analytics platform, or a vertical-specific assistant, the architecture decisions you make in the first 90 days determine your technical moat for years.",
      ],
    },
    "founder-coaching": {
      title: "Founder Coaching",
      subtitle: "Hands-on product strategy for early-stage founders.",
      paragraphs: [
        "Building a product as a founder is lonely. You're making high-stakes decisions about scope, timing, and positioning with limited data and constant pressure. Founder Coaching provides a structured sounding board and hands-on support.",
        "We meet weekly to review progress, untangle prioritization conflicts, and refine your product narrative. I bring the perspective of someone who has built two companies and led product at AI scaleups — I've made the mistakes so you don't have to.",
        "Coaching covers MVP scoping, user research tactics, metrics that matter pre-revenue, fundraising narrative alignment, and team hiring for product and engineering. When needed, I roll up my sleeves and contribute directly to design and prototyping.",
        "This is for founders who want to move fast without breaking things — who value strategic clarity as much as execution speed. The relationship adapts to your stage and challenges.",
      ],
    },
    "due-diligence": {
      title: "Technical Due Diligence",
      subtitle: "Strengthen your technical narrative before fundraising.",
      paragraphs: [
        "Investors are getting sharper about technical due diligence. A weak architecture story can derail an otherwise strong round. I conduct pre-fundraising technical reviews that identify risks and turn them into compelling narratives.",
        "The review covers system architecture, scalability roadmap, AI/ML pipeline robustness, security posture, and team composition. I produce a clear report with red, yellow, and green ratings across dimensions that investors actually care about.",
        "More importantly, I help you prepare live demos that withstand scrutiny. There's nothing more powerful in a pitch than showing a working product and being able to explain exactly how it scales to millions of users.",
        "This service is designed for founders raising pre-seed to Series A who want to enter investor conversations with confidence and preparation. The best time to fix technical narrative gaps is before you're in the room.",
      ],
    },
  },
};

// ============================================================
// Architecture (CinematicVision section)
// ============================================================

export interface ArchitectureConfig {
  sectionLabel: string;
  videoPath: string;
  title: string;
  description: string;
}

export const architectureConfig: ArchitectureConfig = {
  sectionLabel: "Process",
  videoPath: "/videos/cinematic-vision.mp4",
  title: "Define. Structure. Execute. Fast.",
  description: "We will define your MVP, structure your product and identify the fastest path to execution whether you need hands-on support or coaching. My process combines physics-engineering rigor with creative intuition — analyzing the problem space systematically, then building with the urgency of someone who knows ideas are cheap and execution is everything.",
};

// ============================================================
// Research (AlumniArchives section)
// ============================================================

export interface ResearchProject {
  title: string;
  year: string;
  discipline: string;
  image: string;
}

export interface ResearchConfig {
  sectionLabel: string;
  projects: ResearchProject[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "Companies Built",
  projects: [
    {
      title: "Binderly",
      year: "2023",
      discipline: "Smart Organization",
      image: "/images/research-1.jpg",
    },
    {
      title: "yourwai.tech",
      year: "2024",
      discipline: "AI Creative Tools",
      image: "/images/research-2.jpg",
    },
    {
      title: "ADES",
      year: "2022",
      discipline: "Sustainable Energy",
      image: "/images/research-3.jpg",
    },
    {
      title: "Stealth advisory",
      year: "2025",
      discipline: "Founder Support",
      image: "/images/research-4.jpg",
    },
  ],
};

// ============================================================
// Footer
// ============================================================

export interface FooterLinkColumn {
  title: string;
  links: string[];
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  heading: "Let's build something real.",
  columns: [
    {
      title: "Services",
      links: [
        "Zero-to-Demo Sprints",
        "AI Product Architecture",
        "Founder Coaching",
        "Technical Due Diligence",
      ],
    },
    {
      title: "Connect",
      links: [
        "LinkedIn",
        "GitHub",
        "Instagram",
        "Email",
      ],
    },
  ],
  copyright: "© 2026 Mario Sorgente. All rights reserved.",
  bottomLinks: [
    { label: "Download AI Product Guide", href: "https://drive.google.com/file/d/1gg7k9FqsffFs76-sqRhtFPANLHX0sU5Y/view?usp=sharing" },
    { label: "Privacy", href: "#" },
  ],
};
