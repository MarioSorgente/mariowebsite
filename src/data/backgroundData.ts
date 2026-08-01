export type Role = { title: string; dates: string; location?: string; summary?: string; achievements: string[]; technologies?: string[] };
export type Company = { name: string; description?: string; totalTenure?: string; roles: Role[]; tags?: string[] };
export type ExperienceChapter = { id: string; number: string; title: string; introduction: string; companies: Company[] };

export const metrics = [
  ['120%', 'Revenue growth delivered'], ['1,000+', 'Active users acquired'],
  ['99.8%', 'Platform uptime achieved'], ['95%', 'Additional market capacity unlocked'],
  ['20%', 'Faster time-to-market'], ['TRL 8', 'Hardware and software maturity reached'],
];

export const chapters: ExperienceChapter[] = [
  { id: 'platforms', number: '01', title: 'Product Leadership & Platforms', introduction: 'Leading complex SaaS and platform initiatives across AI, energy systems, integrations and internal product operations.', companies: [{ name: 'Sympower', description: 'Energy flexibility and SaaS platform company.', totalTenure: 'April 2023 – Present', tags: ['SaaS', 'Public APIs', 'AI Adoption', 'RBAC', 'Energy', 'Platform Strategy', 'Multitenancy'], roles: [
    { title: 'Senior Product Manager', dates: 'January 2025 – Present', achievements: ['Improved onboarding across interfaces and user segments, accelerating time-to-market by 20%.', 'Drove organisational AI adoption through internal guides, tooling and governance policies.', 'Designed AI proofs of concept, including automated Java → Kotlin → Rust codebase migration.', 'Designed an internal GPT assistant for knowledge sharing and onboarding.', 'Coached product managers on AI in discovery, delivery and strategy.', 'Shaped the product vision for public APIs.', 'Defined and implemented role-based access control to reduce insider-trading risk.'] },
    { title: 'Product Manager', dates: 'April 2023 – January 2025', location: 'Amsterdam, Netherlands', achievements: ['Grew the engineering team from 1 to 7 while leading strategy from concept through implementation.', 'Increased integration release frequency from annually to quarterly.', 'Achieved 99.8% uptime through reliable control and metering REST APIs.', 'Unlocked 95% additional market capacity with product packaging across Europe.', 'Delivered 30% faster processing and reduced costs through a new SaaS architecture.', 'Created a company-wide prioritisation system using Impact vs Effort, WSJF and ICE.', 'Introduced an opportunity solution tree connecting user problems to solutions.'] },
  ] }] },
  { id: 'founder', number: '02', title: 'Founder-Led AI Products', introduction: 'Taking AI-enabled products from insight to research, product design, engineering, launch and validation.', companies: [
    { name: 'Binderly', description: 'Rapid LCA screening and decision support for concrete and cement sustainability.', tags: ['AI Products', 'LLMs', 'Agents', 'Sustainability', 'Full-Stack Product'], roles: [{ title: 'Co-Founder', dates: 'July 2025 – June 2026', summary: 'Built with a civil engineer and LCA specialist to make sustainability decisions faster, transparent and auditable. The EPD Smart Parser turns PDFs into structured environmental data; the AI LCA Agent guides interactive scenario exploration with human review.', achievements: ['Owned product strategy, research, PRDs, roadmap, UX and full-stack implementation.', 'Built the data model and LCA calculation engine.', 'Designed rapid screening, composition adaptation, comparison and traceable results.', 'Generated active interest from a civil-engineering association and C5Lab Portugal.'], technologies: ['GitHub', 'Vercel', 'Supabase', 'GPT-5', 'Google Cloud', 'Codex', 'Cursor', 'Claude'] }] },
    { name: 'yourwAI', description: 'AI career matching based on skills, personality and goals.', roles: [{ title: 'Founder', dates: 'March 2023 – December 2025', achievements: ['Built and launched the platform from zero to one.', 'Used NLP and the OpenAI API for personalised career matching.', 'Reached more than 1,000 active users and 170 positive reviews.', 'Defined the business model, pricing and product strategy.', 'Led a cross-functional team from research to launch.', 'Used behaviour, feedback and A/B testing to guide growth.'] }] },
  ] },
  { id: 'deep-tech', number: '03', title: 'Deep-Tech Product Development', introduction: 'Translating advanced sensing technology into scalable products, customer value and commercial growth.', companies: [{ name: 'Optics11 — Fiber Optic Sensing Solutions', totalTenure: 'February 2019 – April 2023', tags: ['Deep Tech', 'Hardware + Software', 'TRL', 'International Markets', 'Fibre Optics'], roles: [
    { title: 'Product Manager', dates: 'May 2021 – April 2023', achievements: ['Led a hardware-software product from MVP to TRL 8 in two years.', 'Increased revenue by 120% by addressing market needs.', 'Launched a product with 125% higher performance and 28% lower cost.', 'Led branding, repositioning and complete Jira development cycles.', 'Coordinated global launches across 15+ contributors.'] },
    { title: 'Product Manager & Sales Engineer', dates: 'January 2020 – May 2021', location: 'Amsterdam, Netherlands', achievements: ['Owned business development, product management and technical sales.', 'Converted leads into customers, contributing to 120% revenue growth.', 'Worked with executives on roadmaps, pricing, portfolio and positioning.', 'Led field tests, data analysis and launch prioritisation.'] },
    { title: 'Application Engineer', dates: 'February 2019 – January 2020', location: 'Amsterdam, Netherlands', achievements: ['Built test setups integrating sensing hardware and software.', 'Delivered customer training, support and fibre-optic installations.', 'Demonstrated sensing across civil, energy, underwater and medical applications.', 'Analysed data using MATLAB and LabVIEW.'] },
  ] }] },
  { id: 'engineering', number: '04', title: 'Engineering Foundations', introduction: 'An engineering foundation in photonics, electronics, materials and experimental product development.', companies: [{ name: 'STMicroelectronics', description: 'Smart Power division', roles: [{ title: 'PCM Memory Engineer Intern', dates: 'May 2018 – December 2018', location: 'Agrate Brianza, Italy', achievements: ['Characterised Phase Change Memory and analysed materials.', 'Evaluated temperature response and memory-embedding challenges.', 'Produced technical reports using LaTeX.'] }], tags: ['Semiconductors', 'Materials', 'Electronics', 'R&D'] }] },
];

export const expertise = {
  'AI & Intelligent Products': ['AI product strategy', 'LLM-powered workflows', 'AI agent design', 'Prompt engineering', 'NLP', 'Human-in-the-loop systems', 'AI governance', 'Evaluation and safeguards'],
  'Product Leadership': ['Product vision', 'Discovery', 'Roadmapping', 'Prioritisation', 'Opportunity solution trees', 'Cross-functional leadership', 'Product-market fit', 'Go-to-market strategy'],
  'Platforms & SaaS': ['Public APIs', 'REST APIs', 'RBAC', 'Multitenancy', 'Integrations', 'SaaS architecture', 'Onboarding', 'Platform reliability'],
  'Commercial & Delivery': ['Pricing', 'Product packaging', 'Technical sales', 'Market research', 'A/B testing', 'Product launches', 'International markets', 'Agile delivery'],
};

export const education = [
  ['Politecnico di Milano', 'Master of Science', 'Physics Engineering — Photonics and Nano Optics', '2016 – 2018'],
  ['Politecnico di Milano', 'Bachelor’s Degree', 'Electronics', '2013 – 2016'],
  ['Udacity', 'AI Product Manager Nanodegree', 'Artificial Intelligence', '2021'],
  ['IIS J.C. Maxwell', 'Aeronautical Technical Diploma', 'Aerospace, Aeronautical and Astronautical Engineering', '2006 – 2011'],
];
export const languages = [['English', 'Native or bilingual'], ['Italian', 'Native or bilingual'], ['Spanish', 'Limited working'], ['Dutch', 'Elementary']];
export const certifications = ['Achieving Product-Market Fit', 'Body Language for Leaders', 'Excel for Sales Professionals', 'Effective Business Writing', 'Techniques for Non-Native Writers', 'Negotiation Skills'];
export const publications = ['Characterization of Biocomposites and Glass Fiber Epoxy Composites Based on Acoustic Emission Signals, Deep Feature Extraction, and Machine Learning', 'Performance Comparison between FO and PZT AE Sensors', 'ChatGPT in Product Management', 'Structural Health Monitoring for Aerospace Application'];
