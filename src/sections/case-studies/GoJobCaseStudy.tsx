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
                  GoJob is a production-ready hiring product for Bali's restaurants, cafés, bars, hotels, and beach clubs: start with the role, surface relevant local candidates, show why each person may fit, and make the next conversation easy.
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
                  <p>Conversations with the founders and early customers repeatedly surfaced the same problem: hospitality employers needed to hire new people, but applications arrived without enough consistent information to compare candidates efficiently.</p>
                  <p>Employers described experience buried in messages, missing availability, and role fit that depended on language or location. That observed evidence established the need for a clearer first-pass workflow; it did not, by itself, prove that ranked matching would solve it.</p>
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
                  <p>Profile completeness can help an employer decide whether to start a conversation, but it is not proof that someone is available or suitable. Match signals support review rather than replace the employer's judgment.</p>
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
                <h3 className="blog-heading">Product lead from demand research through production build.</h3>
                <p>As product lead working with the founders, I took GoJob from zero to one. I analyzed demand, validated the problem with the founders, the market, and early leads, then shaped the journey, information hierarchy, interface, and technical build.</p>
                <p>I built the role-first workflow, ranked candidate cards, bilingual entry points, responsive experience, and database-backed product. The features shown are working product features, not illustrative screens.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">Validation &amp; ongoing learning</p>
                  <h3 className="blog-heading">Observed demand informs the product; outcomes still require evidence.</h3>
                </div>
                <div className="blog-copy">
                  <p>Founder and early-customer interviews established the recurring hiring problem and informed the product direction. Recruiters and clients are involved in ongoing testing of the working product.</p>
                  <p>The remaining hypotheses concern behavior and results: whether employers understand and use the match evidence, whether ranking changes whom they contact, and whether the workflow supports repeat hiring. Those outcomes are not claimed here.</p>
                </div>
              </section>

              <section className="blog-outcome" aria-labelledby="gojob-outcome-title">
                <p className="blog-kicker">Outcome</p>
                <h3 id="gojob-outcome-title" className="blog-heading">A working product, with commercial outcomes still to establish.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>What was built</strong><p>A production-ready, database-backed product with role setup, ranked local matches, concise fit evidence, live-role context, candidate review, and an invite-to-chat action.</p></div>
                  <div><strong>What is not claimed</strong><p>No claim is made here about repeat use, successful hires, ranking performance, or willingness to pay. Ongoing testing is intended to establish those outcomes.</p></div>
                </div>
              </section>
            </div>
          </article>
  );
}
