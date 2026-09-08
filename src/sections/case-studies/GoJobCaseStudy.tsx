import type { RefObject } from 'react';
const goJobImage = '/images/gojob-dashboard.svg';

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function GoJobCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="gojob-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study on hospitality hiring</p>
                <h2 id="gojob-blog-title">GoJob: from a flood of applications to a useful shortlist</h2>
                <p>
                  GoJob is a production-ready hiring product for Bali's restaurants, cafés, bars, hotels, and beach clubs: start with the role, surface relevant local candidates, show why each person may fit, and make the next conversation easy.
                </p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://gojob-xi.vercel.app/" target="_blank" rel="noopener noreferrer">Visit GoJob</a>
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
                  <h3 className="blog-heading">A full inbox still leaves the employer without a shortlist.</h3>
                </div>
                <div className="blog-copy">
                  <p>Conversations with the founders and early customers repeatedly surfaced the same problem: hospitality employers needed to hire new people, but applications arrived without enough consistent information to compare candidates efficiently.</p>
                  <p>Employers described experience buried in messages, missing availability, and role fit that depended on language or location. That evidence established the need for a clearer first pass. On its own it did not prove that ranked matching would solve the problem.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The product hypothesis</p>
                <h3 className="blog-heading">Match candidates against the role instead of reading every message.</h3>
                <p>The hypothesis behind GoJob is that employers will make faster, more confident first-pass decisions when the product evaluates every candidate against a defined role and presents them in a ranked shortlist. Rather than treating every application as an unstructured message, the product can organize relevant evidence into a consistent, scannable view.</p>
                <p>A match percentage works as a way to order the list rather than as a hiring verdict. It helps an employer decide whom to look at first, while the supporting evidence explains the recommendation and leaves the decision with the person.</p>
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
                  <p className="blog-kicker">Trust and localization</p>
                  <h3 className="blog-heading">Ranking must be readable, local, and honest about what it does not know.</h3>
                </div>
                <div className="blog-copy">
                  <p>A useful filter should weigh signals that matter in Bali hospitality: stated availability, relevant role experience, working languages, location, profile completeness, and overall fit with the role requirements. Employers should be able to see which signals contributed instead of trusting an unexplained score.</p>
                  <p>Profile completeness can help an employer decide whether to start a conversation, but it is not proof that someone is available or suitable. Match signals support review rather than replace the employer's judgment.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Decisions visible in the product</p>
                <h3 className="blog-heading">What the hypothesis looks like in the shipped product.</h3>
                <p>The supplied view leads with Bali-specific hospitality positioning rather than a generic global job board. Bilingual entry points support the local context. Inside the employer experience, live-role status says what the shortlist is for, match percentages set the order of review, and short candidate evidence explains the ranking without turning each card into a full CV.</p>
                <p>The strongest interaction decision is the final one: “Invite to chat.” It gives employers a concrete next step while avoiding the false certainty of “hire” or “approve.” The product helps two people reach a relevant conversation. It does not automate the hiring decision.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">My role and build process</p>
                <h3 className="blog-heading">Product lead from demand research through production build.</h3>
                <p>As product lead working with the founders, I took GoJob from the first idea to a live product. I analyzed demand, validated the problem with the founders, the market, and early leads, then shaped the journey, information hierarchy, interface, and technical build.</p>
                <p>I built the role-first workflow, ranked candidate cards, bilingual entry points, responsive experience, and database-backed product. Every feature shown here works in the live product.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">Validation and ongoing learning</p>
                  <h3 className="blog-heading">Observed demand shaped the product. The outcomes still need evidence.</h3>
                </div>
                <div className="blog-copy">
                  <p>Founder and early-customer interviews established the recurring hiring problem and informed the product direction. Recruiters and clients are now testing the working product.</p>
                  <p>The remaining questions concern behaviour and results. Do employers understand and use the match evidence, does ranking change whom they contact, and does the workflow hold up across repeat hiring? This case study does not claim answers to those yet.</p>
                </div>
              </section>

              <section className="blog-outcome" aria-labelledby="gojob-outcome-title">
                <p className="blog-kicker">Outcome</p>
                <h3 id="gojob-outcome-title" className="blog-heading">A working product, with commercial outcomes still to establish.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>What I built</strong><p>A production-ready, database-backed product with role setup, ranked local matches, concise fit evidence, live-role context, candidate review, and an invite-to-chat action.</p></div>
                  <div><strong>What this does not claim</strong><p>This case study claims nothing about repeat use, successful hires, ranking performance or willingness to pay. Ongoing testing should establish those outcomes.</p></div>
                </div>
              </section>
            </div>
          </article>
  );
}
