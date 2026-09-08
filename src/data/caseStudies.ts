import landingImage from '../../pics/landing.webp';
import allergyPanelVideo from '../../pics/Video Project.mp4';
import allergyPanelPoster from '../../pics/allergy-panel-poster.webp';
import dataMaskLogo from '../../pics/datamask-logo.webp';
import devdokImage from '../../pics/devdok.webp';
const airshieldImage = '/images/airshield-photo.svg';
const goJobImage = '/images/gojob-dashboard.svg';
const mammaCaloriesImage = '/images/mamma-calories-dashboard.svg';

export interface CaseStudy {
  slug: CaseStudySlug;
  title: string;
  eyebrow: string;
  summary: string;
  year: string;
  readingTime: string;
  /**
   * A video needs a `poster`. Without one the card has to preload the file to
   * show anything, and the one video here is 23.5 MB.
   */
  heroMedia: { src: string; type: 'image' | 'video'; description: string; poster?: string };
  externalUrl: string | null;
}

export type CaseStudySlug = 'mamma-calories-meal-prep' | 'gojob-bali-hospitality-hiring' | 'how-i-built-airshield' | 'how-did-i-build-ades' | 'how-i-built-datamask' | 'how-i-built-devdok' | 'multi-agent-panel-nutrition-allergy';

export const caseStudies: readonly CaseStudy[] = [
  { slug: 'mamma-calories-meal-prep', title: 'Mamma Calories: meal prep that adds up', eyebrow: 'Product case study', summary: 'Connecting restaurant menus with nutrition targets so coaches and clients can build practical weekly meal plans.', year: '2026', readingTime: '8 min read', heroMedia: { src: mammaCaloriesImage, type: 'image', description: 'Mamma Calories weekly meal planner with nutrition totals and prices.' }, externalUrl: 'https://macronutrient.vercel.app/' },
  { slug: 'gojob-bali-hospitality-hiring', title: 'GoJob: a clearer shortlist for Bali hospitality hiring', eyebrow: 'Product case study', summary: 'Turning a flood of hospitality applications into a ranked local shortlist employers can understand and act on.', year: '2026', readingTime: '7 min read', heroMedia: { src: goJobImage, type: 'image', description: 'GoJob employer dashboard showing ranked hospitality candidates.' }, externalUrl: 'https://gojob-xi.vercel.app/' },
  { slug: 'how-i-built-airshield', title: 'How I built Airshield', eyebrow: 'Founder case study', summary: "Turning a founder's helmet design into a business with a brand, a website and a fundraising case.", year: '2026', readingTime: '9 min read', heroMedia: { src: airshieldImage, type: 'image', description: 'Airshield filtration helmet and its replaceable filter and battery features.' }, externalUrl: 'https://www.airshieldhelmets.com/' },
  { slug: 'how-did-i-build-ades', title: 'How I built ADES', eyebrow: 'Founder build note', summary: 'A product and technical teardown of the agent design studio I built for product managers, AI product leads and founders.', year: '2026', readingTime: '8 min read', heroMedia: { src: landingImage, type: 'image', description: 'ADES landing page introducing a structured agent design studio.' }, externalUrl: null },
  { slug: 'multi-agent-panel-nutrition-allergy', title: 'Multi-agent panel for nutrition and allergy advice', eyebrow: 'Family health build note', summary: 'How I designed a panel of pediatrician, nutritionist and allergy-specialist agents to help parents organise scattered food reactions, lab results and the questions to ask next.', year: '2026', readingTime: '10 min read', heroMedia: { src: allergyPanelVideo, type: 'video', description: 'Preview of the nutrition and allergy multi-agent panel.', poster: allergyPanelPoster }, externalUrl: null },
  { slug: 'how-i-built-datamask', title: 'How I built DataMask', eyebrow: 'Founder build note', summary: 'A Chrome extension that masks names, amounts and IDs on any page before you copy them into an AI tool. It runs every rule locally and makes no network calls.', year: '2026', readingTime: '7 min read', heroMedia: { src: dataMaskLogo, type: 'image', description: 'The DataMask extension icon.' }, externalUrl: 'https://chromewebstore.google.com/detail/datamask-%E2%80%94-safely-anonymi/ballbfhhjogdpccgdofkdfoidhmcpckp' },
  { slug: 'how-i-built-devdok', title: 'How I built Devdok', eyebrow: 'Founder build note', summary: 'A documentation generator that turns a GitHub file and its ticket context into structured Markdown for Notion and Confluence, built on one serverless function.', year: '2026', readingTime: '7 min read', heroMedia: { src: devdokImage, type: 'image', description: 'The Devdok product illustration.' }, externalUrl: 'https://www.devdok.com/' },
];
