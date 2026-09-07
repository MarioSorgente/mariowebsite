/**
 * Recommendations written for Mario on LinkedIn.
 *
 * These are a hand-kept copy, not a live feed. LinkedIn exposes no API for
 * reading a member's received recommendations at any access tier, its profile
 * badge renders only a name and a headline, and every widget advertising "sync"
 * either asks you to paste the text in or scrapes the page. So the words live
 * here, and the section links out to the profile for anyone who wants to check
 * them against the source.
 *
 * Quotes are reproduced verbatim, typos included. They are other people's words
 * published under their names, so correcting them is not ours to do.
 */

export type RecommendationRelationship = 'manager' | 'peer' | 'report';

export interface Recommendation {
  id: string;
  name: string;
  /** The author's LinkedIn headline, as written. */
  headline: string;
  relationship: RecommendationRelationship;
  /** How LinkedIn describes the working relationship. */
  relationshipNote: string;
  date: string;
  /** One entry per paragraph. The first doubles as the collapsed preview. */
  quote: string[];
}

export interface RecommendationFilter {
  id: 'all' | RecommendationRelationship;
  label: string;
}

export const recommendationFilters: readonly RecommendationFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'manager', label: 'Managed me' },
  { id: 'peer', label: 'Worked alongside' },
  { id: 'report', label: 'Worked in my team' },
];

/** Where a visitor goes to check any of this against the source. */
export const linkedInRecommendationsUrl =
  'https://www.linkedin.com/in/mario-sorgente/details/recommendations/';

/** Two-letter monogram standing in for a profile photo. */
export function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

export const recommendations: readonly Recommendation[] = [
  {
    id: 'martin-wastljung',
    name: 'Martin Wästljung',
    headline: 'Product Manager Lead at Sympower',
    relationship: 'manager',
    relationshipNote: 'Managed Mario directly',
    date: 'March 2026',
    quote: [
      'I had the pleasure of working with Mario for several years, most recently with him reporting to me. Throughout our time, he proved to be a thorough, consistent and highly dependable key member within our product team.',
      "Mario is deeply commited to the 'Why'. He played a pivotal role in the expansion of one of the cornerstones of our platform as it evolved from a novel state into a mature foundational product unlocking significant value for the company. His ability to safeguard desired outcomes while navigating complexities was essential to this success.",
      'One thing that sets Mario apart is his recent proactive leadership in AI adoption. He has moved well beyond a surface-level understanding, becoming one of the most forward-thinking PMs I know in terms of integrating AI into his way of working and product lifecycle. His initiative to lead multiple knowledge-sharing sessions to upskill the wider team is a testament to his collaborative nature and his drive to see others succeed.',
      "Lastly, I have very much enjoyed working together with Mario, he's a fun, loyal and genuinily curious colleague that brings great energy to a team.",
    ],
  },
  {
    id: 'adam-castle',
    name: 'Adam Castle',
    headline: 'CPTO at Comper',
    relationship: 'peer',
    relationshipNote: 'More senior, not his manager',
    date: 'March 2026',
    quote: [
      'I had a really great time working with Mario. As a Senior PM, he brought a ton of valuable business insight and always had a clear way of structuring problems and moving things forward.',
      "What I appreciated most is how he combines product thinking with solid tech knowledge. He's genuinely interested in things like public APIs, integrations, and where products are heading overall. On top of that, he's got strong experience with AI, which makes him very future-focused as a PM.",
      "Mario is someone who doesn't just talk strategy, but actually helps shape it in a practical way. I'd happily work with him again anytime.",
    ],
  },
  {
    id: 'samantha-oldham',
    name: 'Samantha Oldham',
    headline:
      'Product Management | Customer-centred digital products | B2C, B2B & mission-led organisations',
    relationship: 'manager',
    relationshipNote: 'Managed Mario directly',
    date: 'March 2026',
    quote: [
      'Mario is a structured, driven and impact-oriented Senior Product Manager, it was a pleasure to work alongside and then later manage him.',
      'He has excellent stakeholder management, discovery and delivery skills and makes use of product best practices to structure his work and create clarity and focus for his team and stakeholders. Mario has embraced the use of AI as a way to accelerate and amplify his work and impact and evangelised the practice with his peers through knowledge sharing initiatives.',
      'Mario is comfortable in navigating complexity and technical challenges and is pragmatic in his approach to problem solving. He is a team player, enjoys sharing his knowledge and mentoring others, always with a human approach.',
      'Mario would be an asset to any organisation looking for an experienced Product Manager.',
    ],
  },
  {
    id: 'olivier-gillin',
    name: 'Olivier Gillin',
    headline:
      'Senior Product Leader | Scaling PM Teams & Product Strategy | B2B & B2C SaaS with Positive Societal Impact',
    relationship: 'manager',
    relationshipNote: 'Managed Mario directly',
    date: 'February 2026',
    quote: [
      "Mario is a structured, reliable, and impact-driven Product Manager who genuinely cares about both results and people. He is a strong team player, always happy to recognize others' strengths, share his learnings, and help raise the overall level of the team.",
      'What stood out most was his ability to autonomously lead an empowered product team. Mario consistently took the time to explain the why behind the problems being solved, aligned his team around clear objectives, and measured impact through well-defined SMART goals. He is keen to learn and apply product best practices such as OKRs and Opportunity Solution Trees, often leading by example.',
      'With strong business acumen and excellent stakeholder management skills, Mario is very effective at co-creating with partners and clients. He is dependable on his commitments and naturally focused on building scalable, long-term product outcomes.',
      'I would gladly recommend Mario to any product organization looking for a thoughtful, pragmatic, and impact-oriented Product Manager.',
      'Mario was a Product Manager in my team when I led Product at Sympower.',
    ],
  },
  {
    id: 'juha-van-riet',
    name: 'Juha Van Riet',
    headline:
      'CEO | Industrial & Energy Sector Leader | Strategy, Transformation & Operational Excellence',
    relationship: 'manager',
    relationshipNote: 'Managed Mario directly',
    date: 'May 2023',
    quote: [
      'Mario has this rare ability to understand the technology side ánd the commercial side of our business in a very balanced way, required to be successful at this complex intersection. This makes him an effective Product Manager in a hightech environment.',
      'Combined with his leadership attributes, rapid adoption of change and eagerness to learn makes Mario a unique asset for a company, setting up for growth, and a pleasure to work with!',
    ],
  },
  {
    id: 'saad-zia',
    name: 'Saad Zia',
    headline: 'Digital Operations at Hyva',
    relationship: 'report',
    relationshipNote: 'Mario was more senior',
    date: 'February 2023',
    quote: [
      'During my 6 years in Industry, I have never met someone so fresh and genius in a product management role. With Mario, it was always simple. He would take the complex issues and explained to us in such simple terms that it became pretty evident on what needs to be done where and how. He is a very open minded leader, one with a big heart and a good brain. I certainly enjoy sharing meetings with him and he always brings fresh perspective in my thinking. Apart from the professional role, he is a good coach who can help one get back on track if lost. In total, Mario is a complete blessing as a team mate that everyone needs. I hope he stays the same.',
    ],
  },
];
