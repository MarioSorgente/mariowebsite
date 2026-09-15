/**
 * The four paid engagement formats. These are proposed terms for new work, not
 * a record of past contracts, so nothing here should read as a client result.
 */

export type ServiceId =
  | 'fractional-product-leadership'
  | 'product-strategy'
  | 'focused-product-consulting'
  | 'product-operations';

export interface Service {
  id: ServiceId;
  title: string;
  badge?: string;
  cardCopy: string;
  format: string;
  bestFor: string;
  intro: string;
  scopeHeading: string;
  scope: string[];
  deliverables: string[];
  success: string;
  scopeBoundary?: string;
  cta: string;
  metaDescription: string;
}

export const servicesSection = {
  eyebrow: 'Services',
  heading: 'Four ways to work together',
  intro: 'Ongoing leadership, a strategy engagement, focused consulting or team coaching.',
  pricingNote:
    'Scope and fees are agreed before we start: a monthly fee for ongoing work, a project fee for focused engagements.',
  detailLabel: 'Details',
};

export const services: readonly Service[] = [
  {
    id: 'fractional-product-leadership',
    title: 'Fractional Product Leadership',
    badge: 'Preferred engagement',
    cardCopy:
      'Part-time product ownership. I set direction, make priorities explicit and run the work from discovery to delivery.',
    format: '1–2 days a week · 3–6 months to start',
    bestFor:
      'Early-stage and growing companies with a team that can execute and needs consistent product ownership. Stage is a fit signal, not a funding requirement.',
    intro:
      'When product decisions keep returning to the founder, I own an agreed product area and set a working rhythm with the team: which outcomes matter, what comes first and how we review progress.',
    scopeHeading: 'What I take on',
    scope: [
      'Translate business goals into product priorities and a practical roadmap.',
      'Run discovery with customers and the people closest to them.',
      'Coordinate product decisions with design, engineering and commercial teams.',
      'Prepare releases with clear scope, ownership and a measurement plan.',
      'Support product managers through regular coaching and decision reviews.',
      'Bring a clear product view into leadership discussions.',
    ],
    deliverables: [
      'A written product direction and a prioritised roadmap.',
      'A short backlog of customer problems and assumptions to investigate.',
      'Clear responsibilities and a weekly product review.',
      'A scorecard for the agreed product outcomes.',
      'A monthly account of decisions, progress and changes to the plan.',
    ],
    success:
      'We track the agreed outcome, delivery predictability and how long important decisions take, against a baseline and review dates set at the start.',
    scopeBoundary:
      'Weekly capacity, meeting windows, decision rights and response times are agreed in writing. Fractional support does not imply full-time availability.',
    cta: 'Discuss fractional support',
    metaDescription:
      'Part-time product ownership from Mario Sorgente: 1–2 days per week for an initial 3–6 months, covering direction, priorities, discovery and delivery.',
  },
  {
    id: 'product-strategy',
    title: 'Product Strategy & Advisory',
    cardCopy:
      'Decide where your product goes next, using customer evidence, business priorities and product data.',
    format: '4–6 weeks · optional monthly advisory',
    bestFor:
      'Teams with competing directions, an unclear target customer or uncertain adoption and revenue.',
    intro:
      'We look at who gets value, where the experience breaks and which opportunities deserve investment, then turn those choices into the next phase of work.',
    scopeHeading: 'What we work on',
    scope: [
      'Review target customers, their needs and alternatives.',
      'Interview relevant customers and stakeholders.',
      'Inspect the path from signup to meaningful use and repeat use.',
      'Review pricing and packaging where they are part of the problem.',
      'Agree the outcome measures and prioritise opportunities.',
      'Identify where an AI prototype can help test an assumption.',
    ],
    deliverables: [
      'An evidence summary and product diagnosis.',
      'A defined target customer and product value proposition.',
      'A ranked set of opportunities with explicit trade-offs.',
      'A roadmap for the next 90 days.',
      'An experiment plan and measurement definitions.',
    ],
    success:
      'First, an agreed direction and a testable plan. After implementation, we review activation, retention or revenue, which can take longer than the engagement itself.',
    cta: 'Discuss product strategy',
    metaDescription:
      'A 4–6 week product strategy engagement with Mario Sorgente that turns customer evidence, business priorities and product data into a plan your team can act on.',
  },
  {
    id: 'focused-product-consulting',
    title: 'Focused Product Consulting',
    cardCopy:
      'Work through one important product decision and leave with clear next actions.',
    format: '1–2 working sessions · progress review',
    bestFor:
      'A blocked decision, a disputed roadmap, an onboarding problem or a launch that needs a clearer plan.',
    intro:
      'Bring one defined challenge and its context. We diagnose the problem, compare options and decide what to do next.',
    scopeHeading: 'Proposed session structure',
    scope: [
      'A short fit call and advance review of the available material.',
      'One or two 90–120 minute working sessions.',
      'A written recommendation and prioritised actions within two business days of the final working session.',
      'A 30-minute follow-up approximately two weeks later.',
    ],
    deliverables: [
      'A concise problem definition and evidence gaps.',
      'Options with their trade-offs.',
      'A recommendation with named next steps.',
      'A metric or observable condition for checking whether the change worked.',
    ],
    success:
      'A decision is made, an owner takes the next action and the team can check the result. A short engagement cannot prove a long-term retention or revenue outcome.',
    cta: 'Bring a product challenge',
    metaDescription:
      'Focused product consulting with Mario Sorgente: one or two working sessions on a single product decision, with a written recommendation and a follow-up review.',
  },
  {
    id: 'product-operations',
    title: 'Product Operations & Team Coaching',
    cardCopy:
      'Build a consistent way to discover, prioritise and deliver, with clear roles and routines.',
    format: '6–8 weeks · workshops and implementation support',
    bestFor:
      'Product, design and engineering teams where ownership is unclear, planning drags or decisions keep reopening.',
    intro:
      'We review how work moves through your team, then test a simpler operating process on real work so the new habits can be judged.',
    scopeHeading: 'What we work on',
    scope: [
      'Review current planning, discovery and delivery practices.',
      'Clarify responsibilities and decision ownership.',
      'Establish useful planning and review routines.',
      'Create lightweight templates for decisions and experiments.',
      'Coach the team while it applies the changes.',
      'Introduce AI-assisted workflows where there is a clear benefit and a review step.',
    ],
    deliverables: [
      'A diagnosis of the current working process.',
      'Defined roles, decision rules and review routines.',
      'Reusable templates and a short team playbook.',
      "Workshops using the team's real product challenges.",
      'A handover plan and a check of whether the routines are being used.',
    ],
    success:
      'We assess routine adoption, decision turnaround, delivery predictability and time spent on manual work, and whether decisions are getting better.',
    cta: 'Discuss your team',
    metaDescription:
      'Product operations and team coaching with Mario Sorgente: 6–8 weeks of workshops and implementation support for clearer ownership, planning and decisions.',
  },
];

export function findService(id: string | null | undefined): Service | undefined {
  return id ? services.find((service) => service.id === id) : undefined;
}
