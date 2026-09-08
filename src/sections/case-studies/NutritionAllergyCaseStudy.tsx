import type { RefObject } from 'react';
import allergyPanelVideo from '../../../pics/Video Project.mp4';
import allergyPanelPoster from '../../../pics/allergy-panel-poster.webp';

const allergyPanelStack = ['Claude Code', 'Codex', 'ADES', 'Anthropic Claude', 'Kimi / Moonshot AI', 'Vercel', 'GitHub'];
const allergyPanelPrinciples = ['Evidence intake first', 'Independent expert review', 'Structured debate', 'Moderator synthesis', 'Doctor-ready questions', 'Human medical oversight'];

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function NutritionAllergyCaseStudy({ readerRef }: Props) {
  return (
    <article
            ref={readerRef}
            className="blog-reader"
            aria-labelledby="allergy-blog-title"
          >
            <header
              className="blog-reader-header"
            >
              <div className="blog-reader-copy">
                <p className="blog-kicker">Family health build note</p>
                <h2 id="allergy-blog-title">Multi-agent panel for nutrition and allergy advice</h2>
                <p>
                  My nephew just turned two, and his allergies turned a normal family routine into a daily investigation. This is the story of the multi-agent panel I built to help his parents organize symptoms, food reactions, supplements, blood exams, PDFs, doctor notes, and diet experiments into a safer conversation with clinicians.
                </p>
              </div>
              <figure className="blog-hero-figure">
                {/* 23.5 MB, so it downloads on play rather than on open. */}
                <video src={allergyPanelVideo} poster={allergyPanelPoster} controls muted loop playsInline preload="none" aria-label="Video preview of the nutrition and allergy advice project" />
                <figcaption>The prototype starts from the parents' evidence and routes the case through a pediatrician, nutritionist, allergy specialist, and moderator agent.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section
                className="blog-two-column"
              >
                <div>
                  <p className="blog-kicker">The reason</p>
                  <h3 className="blog-heading">When a toddler has allergies, the family ends up keeping all the records.</h3>
                </div>
                <div className="blog-copy">
                  <p>
                    He is the love of my life. Watching him struggle with histamine-related symptoms, food reactions, sleep disruption, skin signals, and the emotional burden that lands on his parents made the problem concrete. The hard part was never a lack of care. Everyone cared so much that information multiplied faster than anyone could connect it.
                  </p>
                  <p>
                    Allergy care is naturally interdisciplinary. Pediatricians look at growth, infections, medication safety, and developmental context. Allergy specialists focus on triggers, reaction severity, testing history, elimination risk, and emergency planning. Nutritionists worry about adequate calories, protein, micronutrients, food variety, gut tolerance, and the hidden cost of over-restricting a young child's diet. A parent sees all of it, but usually inside scattered PDFs, WhatsApp notes, appointment memories, food diaries, supplement labels, and lab reports.
                  </p>
                  <p className="blog-sources">
                    Research anchors. The American Academy of Pediatrics keeps pediatric food-allergy guidance connected to diagnosis, prevention and treatment resources. AAAAI stresses careful diagnosis and management over guessing from symptoms alone. Multi-agent debate research shows that independent model perspectives and structured discussion can improve factuality and reasoning. Medical-agent papers such as MedAgents and MDAgents explore multidisciplinary LLM collaboration for medical reasoning. Sources: <a href="https://www.aap.org/en/patient-care/allergic-march/food-allergies/" target="_blank" rel="noopener noreferrer">AAP</a>, <a href="https://www.aaaai.org/Conditions-Treatments/Allergies/Food-Allergy" target="_blank" rel="noopener noreferrer">AAAAI</a>, <a href="https://composable-models.github.io/llm_debate/" target="_blank" rel="noopener noreferrer">Multiagent Debate</a>, <a href="https://aclanthology.org/2024.findings-acl.33/" target="_blank" rel="noopener noreferrer">MedAgents</a>, and <a href="https://openreview.net/forum?id=EKdk4vxKO4" target="_blank" rel="noopener noreferrer">MDAgents</a>.
                  </p>
                </div>
              </section>

              <section
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
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The panel</p>
                <h3 className="blog-heading">A panel that argues, rather than one chatbot pretending to be a doctor.</h3>
                <p>
                  The system takes the parents' inputs, including PDF exams and notes, and routes the case through three specialist agents prompted to reason from a functional-medicine perspective while staying explicit about uncertainty. The pediatrician agent checks age-specific constraints, growth context, red flags, medication questions, and what to escalate. The nutritionist agent maps the diet pattern, missing nutrients, tolerated foods, meal rhythm, supplement considerations, and the risk of narrowing a toddler's diet too far. The allergy specialist agent focuses on reaction patterns, likely trigger categories, histamine load, environmental context, testing questions, and emergency-plan gaps.
                </p>
                <p>
                  Each agent first reviews the case independently. That matters because a panel only becomes useful if the agents form their own hypotheses before they see everyone else's answer. Then they debate: the pediatrician can challenge an elimination diet that looks nutritionally risky, the nutritionist can ask whether a supplement idea is age-appropriate, and the allergy specialist can push back when a food correlation is too weak or when the family needs medical testing rather than another home experiment.
                </p>
                <p>
                  After the debate, a moderator agent produces what the family actually needs: possible root causes, key observations, diet suggestions to discuss with professionals, supplement considerations, questions for the family doctor or specialists, and a protocol for what to investigate next. The output works as a structured agenda for better appointments and calmer decisions. It never functions as a diagnosis.
                </p>
              </section>

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The architecture</p>
                <h3 className="blog-heading">Multi-agent AI earns its cost when the roles genuinely disagree.</h3>
                <p>
                  Many multi-agent demos amount to three personas politely rephrasing the same answer. I designed this panel around disagreement instead. The agents receive the same evidence packet, but the panel grades each one against a different responsibility. One watches child safety and escalation. One watches nutritional adequacy and practicality. One watches the rigour of the allergy reasoning. The moderator cannot average them. It has to keep the disagreements, flag missing data, and separate confident observations from ideas that need a clinician.
                </p>
                <p>
                  Published research points the same way. Multi-agent debate can help models find reasoning gaps, because each agent states its own reasoning before the group settles on an answer. Medical multi-agent frameworks go further by testing whether role-specific collaboration improves complex clinical reasoning. My practical takeaway was simple. Adding agents because it sounds advanced helps nobody. Add them when a domain has genuinely competing points of view, and when the final answer has to show where those views pull apart.
                </p>
                <p>
                  Cost mattered too. I built an orchestrator that routes work between Anthropic and Kimi from Moonshot AI depending on the stage. Kimi handles extraction, research packets, document digestion, and first-pass analysis. Claude handles deeper reasoning, contradiction handling, synthesis, and final moderation. That routing keeps the system more affordable without treating all reasoning steps as equal.
                </p>
                <div className="blog-stack-list">
                  {allergyPanelStack.map((item) => (
                    <span key={item} className="blog-stack-chip">{item}</span>
                  ))}
                </div>
              </section>

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">The safety model</p>
                <h3 className="blog-heading">The most important feature is knowing where the AI must stop.</h3>
                <p>
                  Pediatric allergy and nutrition advice is high-stakes. A wrong suggestion can lead to unnecessary restriction, missed calories, delayed treatment, or dangerous under-reaction to symptoms. So the system prepares parents for a medical appointment rather than standing in for one. It never frames itself as the final authority, and it keeps repeating the same operational boundary: discuss protocols, testing, supplements, and elimination diets with the family doctor, pediatrician, allergist, or qualified dietitian.
                </p>
                <p>
                  The moderator also separates outputs into safer categories: observed evidence from the parents' files, possible patterns, questions to ask, items that need professional confirmation, and red flags that should not wait for another AI round. That structure is deliberately boring. In family health the goal is to reduce chaos, make appointments more productive, and help parents notice what information is still missing.
                </p>
              </section>

              <section
                className="blog-copy blog-block"
              >
                <p className="blog-kicker">Why ADES mattered</p>
                <h3 className="blog-heading">I used ADES to design the agents before I trusted the workflow.</h3>
                <p>
                  ADES, my Agent Design Studio, helped me design the architecture, system prompts, role boundaries, and graders before coding the whole flow. That was important because the project was emotionally charged. When you are building for family, it is easy to let urgency drive the design. ADES forced me to write down the actual workflow: intake, extraction, evidence normalization, independent reviews, debate, contradiction resolution, moderated synthesis, safety disclaimer, and follow-up-question generation.
                </p>
                <p>
                  Claude Code and Codex helped me move from design to implementation, and Vercel and GitHub turned the prototype into something the family could actually use. The core product choice was architectural. The panel exists to help parents arrive at appointments better prepared, and it deliberately avoids handing out medical certainty.
                </p>
              </section>
            </div>
          </article>
  );
}
