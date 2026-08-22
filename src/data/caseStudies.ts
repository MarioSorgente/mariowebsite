import landingImage from '../../pics/landing.png';
import allergyPanelVideo from '../../pics/Video Project.mp4';
import airshieldImage from '../../public/images/airshield-photo.svg';
import goJobImage from '../../public/images/gojob-dashboard.svg';
import mammaCaloriesImage from '../../public/images/mamma-calories-dashboard.svg';

export interface CaseStudy {
  slug: CaseStudySlug;
  title: string;
  eyebrow: string;
  summary: string;
  year: string;
  readingTime: string;
  heroMedia: { src: string; type: 'image' | 'video'; description: string };
  externalUrl: string | null;
}

export type CaseStudySlug = 'mamma-calories-meal-prep' | 'gojob-bali-hospitality-hiring' | 'how-i-built-airshield' | 'how-did-i-build-ades' | 'multi-agent-panel-nutrition-allergy';

export const caseStudies: readonly CaseStudy[] = [
  { slug: 'mamma-calories-meal-prep', title: 'Mamma Calories: meal prep that adds up', eyebrow: 'Product case study', summary: 'Connecting restaurant menus with nutrition targets so coaches and clients can build practical weekly meal plans.', year: '2026', readingTime: '8 min read', heroMedia: { src: mammaCaloriesImage, type: 'image', description: 'Mamma Calories weekly meal planner with nutrition totals and prices.' }, externalUrl: 'https://macronutrient.vercel.app/' },
  { slug: 'gojob-bali-hospitality-hiring', title: 'GoJob: a clearer shortlist for Bali hospitality hiring', eyebrow: 'Product case study', summary: 'Turning noisy hospitality applications into role-based local matches that employers can understand and act on.', year: '2026', readingTime: '7 min read', heroMedia: { src: goJobImage, type: 'image', description: 'GoJob employer dashboard showing ranked hospitality candidates.' }, externalUrl: 'https://gojob-xi.vercel.app/' },
  { slug: 'how-i-built-airshield', title: 'How I built Airshield', eyebrow: 'Founder case study', summary: "From a founder's helmet innovation to an investor-ready business, brand, website, and fundraising story.", year: '2026', readingTime: '9 min read', heroMedia: { src: airshieldImage, type: 'image', description: 'Airshield filtration helmet and its replaceable filter and battery features.' }, externalUrl: 'https://www.airshieldhelmets.com/' },
  { slug: 'how-did-i-build-ades', title: 'How I built ADES', eyebrow: 'Founder build note', summary: 'A product and technical teardown of the agent design studio I built for PMs, AI product leads, and founders.', year: '2026', readingTime: '8 min read', heroMedia: { src: landingImage, type: 'image', description: 'ADES landing page introducing a structured agent design studio.' }, externalUrl: null },
  { slug: 'multi-agent-panel-nutrition-allergy', title: 'Multi-agent panel for nutrition and allergy advice', eyebrow: 'Family health build note', summary: 'How I designed a pediatrician, nutritionist, and allergy-specialist panel to help parents organize messy food reactions, labs, and next questions.', year: '2026', readingTime: '10 min read', heroMedia: { src: allergyPanelVideo, type: 'video', description: 'Preview of the nutrition and allergy multi-agent panel.' }, externalUrl: null },
];
