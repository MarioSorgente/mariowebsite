import type { RefObject } from 'react';
import goJobImage from '../../../public/images/gojob-dashboard.svg';

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function GoJobCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="gojob-blog-title">
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
                <img loading="lazy" src={goJobImage} alt="GoJob employer dashboard for a live Bali hospitality role, showing bilingual navigation and a ranked shortlist with match percentages, candidate evidence, and Invite to chat buttons" />
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
  );
}
