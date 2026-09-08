import type { RefObject } from 'react';
import devdokImage from '../../../pics/devdok.webp';

const techStack = ['Vercel serverless', 'OpenAI API', 'Firebase Auth', 'Firestore', 'GitHub raw API', 'Bootstrap'];

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function DevdokCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="devdok-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Founder build note</p>
                <h2 id="devdok-blog-title">How I built Devdok</h2>
                <p>
                  Documentation is the work everyone agrees matters and nobody schedules. Devdok takes a file of code and the ticket it came from, and returns structured Markdown ready to paste into Notion or Confluence. I built it end to end and put it live at devdok.com.
                </p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://www.devdok.com/" target="_blank" rel="noopener noreferrer">Visit Devdok</a>
                </div>
              </div>
              <figure className="blog-hero-figure">
                <img loading="lazy" src={devdokImage} alt="The Devdok product illustration used on the devdok.com landing page" />
                <figcaption>Devdok turns a code file and its ticket context into documentation a team can paste straight into its wiki.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div>
                  <p className="blog-kicker">The problem</p>
                  <h3 className="blog-heading">The context exists while you write the code and is gone a week later.</h3>
                </div>
                <div className="blog-copy">
                  <p>A developer finishing a ticket holds everything needed to document it. What the change does, which pieces matter, what a reader would trip over. Writing that down takes twenty minutes that the sprint did not budget, so the ticket closes and the knowledge decays.</p>
                  <p>The blocker is the translation cost. Turning something you already understand into prose for someone who does not takes real effort, and it arrives exactly when the ticket already feels finished. A language model handles that kind of translation well, so the product question was how to feed it enough context without asking the developer to do the work anyway.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Two ways in</p>
                <h3 className="blog-heading">Paste a snippet, or hand over a GitHub link.</h3>
                <p>The first input is a text area for a snippet, which suits a function or a single class. The second matters more in practice: paste the normal GitHub URL of a file, the one you get from the address bar while browsing the repository.</p>
                <p>The server converts that link to its raw equivalent by swapping the host for raw.githubusercontent.com and dropping the blob segment from the path, then fetches the file with an optional access token so private repositories work too. The developer pastes the link they already had open. Nobody has to find a raw URL by hand.</p>
                <p>The context field changes its label depending on which input is active, asking for Jira ticket details alongside a snippet and for background alongside a file. The same box means two different things, so the form says which one it wants.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">Guards</p>
                  <h3 className="blog-heading">Two size limits, each with a message that says what to do.</h3>
                </div>
                <div className="blog-copy">
                  <p>The server caps a fetched file at 50 KB, and the code at 15,000 characters before it reaches the model. Both limits protect the request from failing deep inside the model call, where the error a user sees explains nothing.</p>
                  <p>The oversize response names the actual problem and the actual fix, telling the developer the file is too large and to select a smaller file or a snippet. Every generic failure message in a tool like this becomes a support conversation later, so the limits return specific text instead.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The prompt</p>
                <h3 className="blog-heading">Show the model one worked example, and tell it to admit what it cannot see.</h3>
                <p>The prompt does two things beyond describing the output format. It carries a complete worked example before the real input, a small function with its context, so the model has a concrete pattern to follow rather than only a description of one. It then asks for a title, a summary and a key components section, in Markdown that Notion accepts.</p>
                <p>The instruction that mattered most is the last one. Where the code carries no comments or belongs to a larger project, the prompt tells the model to highlight the parts that need more context rather than fill the gap itself. Documentation that quietly invents a rationale is worse than documentation that says it does not know why a function exists, because a reader cannot tell the difference until it costs them.</p>
                <p>The generation runs on gpt-3.5-turbo-16k with a 4000 token ceiling and temperature at 0.7, which was the sensible choice for long files at the time this shipped.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Letting people try it</p>
                <h3 className="blog-heading">One free generation, then Google sign-in.</h3>
                <p>A developer evaluating a tool wants to see output before creating an account. Devdok gives the first generation away and asks for Google sign-in through Firebase from the second onward. That covers the API cost of anonymous traffic while still letting the product prove itself first.</p>
                <p>Signed-in users can also send feedback, which lands in a Firestore collection with the message, the account and a server timestamp. It was the cheapest way to hear from early users without standing up a support channel.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The output</p>
                <h3 className="blog-heading">Two panes, because two tools want two formats.</h3>
                <p>Results open in a modal with the raw Markdown in one pane and the rendered version in the other, each with its own copy button. Notion accepts pasted Markdown and converts it to blocks. Confluence wants the rendered HTML. Offering both is what makes the promise on the landing page true.</p>
                <p>The whole front end is static HTML on Bootstrap, with a single Vercel serverless function behind it holding the OpenAI and GitHub keys as environment variables. No key ever reaches the browser, and there is no server to keep running between requests.</p>
                <div className="blog-stack-list">
                  {techStack.map((item) => (
                    <span key={item} className="blog-stack-chip">{item}</span>
                  ))}
                </div>
              </section>

              <section className="blog-outcome" aria-labelledby="devdok-outcome-title">
                <p className="blog-kicker">Outcome</p>
                <h3 id="devdok-outcome-title" className="blog-heading">A live product, with the usage question still open.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>What I built</strong><p>A working generator at devdok.com with two input paths, GitHub file fetching behind a token, two size guards that fail with useful messages, a one-shot prompt that flags missing context, Google sign-in after the first free run, and a two-pane copyable output.</p></div>
                  <div><strong>What this does not claim</strong><p>Notion and Confluence support means copy and paste rather than an API integration into either tool. The model belongs to the 2024 generation and I tuned the prompt for it. Nothing here measures whether teams kept the generated documentation, edited it or trusted it, and those are the outcomes that would decide whether the product deserves more work.</p></div>
                </div>
              </section>
            </div>
          </article>
  );
}
