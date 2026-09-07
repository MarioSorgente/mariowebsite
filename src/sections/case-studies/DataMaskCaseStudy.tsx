import type { RefObject } from 'react';
import dataMaskLogo from '../../../pics/datamask-logo.png';

const techStack = ['Chrome Manifest V3', 'Service worker', 'chrome.storage.local', 'chrome.scripting', 'Vanilla JavaScript'];
const surfaces = ['Toolbar popup', 'Right-click menu', 'Keyboard shortcut', 'Options page', 'JSON export', 'JSON import'];

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function DataMaskCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="datamask-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Founder build note</p>
                <h2 id="datamask-blog-title">How I built DataMask</h2>
                <p>
                  AI tools answer better when you give them the real document. The real document usually carries a client name, a salary, an invoice total or an address that has no business leaving the company. DataMask is a Chrome extension that rewrites those values on the page and puts the clean text on your clipboard, so the assistant still gets the context and the sensitive values stay on your machine.
                </p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://chromewebstore.google.com/detail/datamask-%E2%80%94-safely-anonymi/ballbfhhjogdpccgdofkdfoidhmcpckp" target="_blank" rel="noopener noreferrer">Add to Chrome</a>
                </div>
              </div>
              <figure className="blog-hero-figure">
                <img loading="lazy" src={dataMaskLogo} alt="The DataMask extension icon" />
                <figcaption>DataMask ships on the Chrome Web Store. Version 0.8.3 runs on Manifest V3.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div>
                  <p className="blog-kicker">The problem</p>
                  <h3 className="blog-heading">Redacting by hand is slow, and people stop doing it.</h3>
                </div>
                <div className="blog-copy">
                  <p>Anyone who pastes work into a chat assistant has made the same calculation. Strip the sensitive parts and lose ten minutes, or paste the whole thing and hope nobody asks. Under deadline pressure most people paste the whole thing.</p>
                  <p>Manual redaction also fails in a specific way. You catch the client name in the heading and miss the same name in a footnote, or you replace a figure in one place and leave it formatted differently in another. The work is repetitive, so people lose focus partway through a long document.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The design decision</p>
                <h3 className="blog-heading">Ask the user what is sensitive rather than guessing.</h3>
                <p>Most anonymizers try to detect personal data automatically. That approach misjudges both ways. It flags an ordinary surname as a person, and it walks past an internal project codename that matters far more to the company than any of the names it caught.</p>
                <p>DataMask takes the opposite route. You write the dictionary. A rule is four fields: the text to find, what to put in its place, whether to match whole words only, and whether case matters. Writing a rule that turns your largest client into the word customer takes about five seconds, and after that it applies to every page you copy.</p>
                <p>The cost of this choice is honest and worth stating. DataMask masks what you tell it to mask. It will not find something you never told it about.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The hard part</p>
                <h3 className="blog-heading">One number, six ways a page might write it.</h3>
                <p>A plain find-and-replace handles names. Numbers break it immediately. You want to mask a salary of 1234567, and the page renders it as 1,234,567. A German page writes 1.234.567. A French page uses a narrow non-breaking space. A Swiss page uses an apostrophe. A finance tool adds two decimal places you did not type.</p>
                <p>Nobody is going to write six rules for one number. So the extension builds the pattern for you, in a function that walks the text you typed one character at a time.</p>
                <ol className="blog-step-list">
                  <li><strong>Split the pattern into runs.</strong><span>It escapes ordinary characters and matches them literally, then hands each run of digits to a separate number parser.</span></li>
                  <li><strong>Loosen the gaps between digits.</strong><span>An optional separator joins every digit to the next, covering the space, comma, dot, non-breaking space, narrow and thin spaces, figure space, and both the straight and curly apostrophe.</span></li>
                  <li><strong>Handle the decimals you did not type.</strong><span>A pattern with no decimal part still allows one or two decimal places, so typing a round figure matches the same figure shown to the cent. Type the decimals and it matches those exactly instead.</span></li>
                  <li><strong>Fence the match when whole-word is on.</strong><span>Lookbehind and lookahead assertions keep the pattern from matching inside a longer word or a longer number.</span></li>
                </ol>
                <p>Typing 1234567 once now covers every one of those renderings.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">Two smaller decisions</p>
                  <h3 className="blog-heading">Order the rules, and let one bad rule fail alone.</h3>
                </div>
                <div className="blog-copy">
                  <p>Rules run longest pattern first. Without that ordering, a rule for one word chews a hole in the middle of a longer phrase that contains it, and the longer rule then fails to match what is left. Sorting by pattern length costs one line and removes the whole class of problem.</p>
                  <p>Each rule also runs inside its own try-catch. A single malformed rule replaces nothing and the remaining rules still run. The alternative, where one bad entry silently returns the original unmasked text, is the worst outcome a tool like this can have.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The privacy claim</p>
                <h3 className="blog-heading">What the manifest actually permits.</h3>
                <p>Any extension can say it processes data locally. The file that settles it is the manifest, and anyone can read this one in the repository.</p>
                <p>DataMask requests five permissions: storage, scripting, activeTab, clipboardWrite and contextMenus. It declares no host permissions, so it holds no standing access to any site. It makes no network requests at all. Its content security policy sets script-src to self and object-src to none, so the extension cannot pull in remote code later. Rules live in local storage on the machine, and the options page exports them as a JSON file you keep.</p>
                <p>There is no analytics, no telemetry and no account. The extension has nowhere to send your text even if it wanted to.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Getting out of the way</p>
                <h3 className="blog-heading">Three ways to trigger the same two actions.</h3>
                <p>The two actions are copying the whole page and copying just the selection. Both are in the toolbar popup, both are in the right-click menu, and the page copy has a keyboard shortcut on Ctrl and Shift and U. A tool people reach for many times a day earns more than one entry point.</p>
                <p>The extension also refuses to run on browser-internal pages, covering the chrome, extension, edge, devtools, about and view-source schemes. Chrome blocks script injection there, so instead of failing quietly the popup says it cannot read the page and suggests opening a normal tab.</p>
              </section>

              <section className="blog-pill-grid" aria-label="DataMask surfaces">
                {surfaces.map((item) => (
                  <div key={item} className="blog-pill-card">{item}</div>
                ))}
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Build</p>
                <h3 className="blog-heading">Small enough to read in one sitting.</h3>
                <p>I designed, built and published DataMask on my own, then took it through Chrome Web Store review. There is no framework and no build step. The whole extension is a service worker, a popup, an options page and a content script, in plain JavaScript.</p>
                <div className="blog-stack-list">
                  {techStack.map((item) => (
                    <span key={item} className="blog-stack-chip">{item}</span>
                  ))}
                </div>
              </section>

              <section className="blog-outcome" aria-labelledby="datamask-outcome-title">
                <p className="blog-kicker">Outcome</p>
                <h3 id="datamask-outcome-title" className="blog-heading">A published tool, with adoption still to measure.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>What I built</strong><p>A Manifest V3 extension on the Chrome Web Store that masks text locally, matches numbers across locale formats, stores a rule dictionary you can export and import as JSON, and copies either the page or the selection from three different entry points.</p></div>
                  <div><strong>What this does not claim</strong><p>DataMask masks what you define and detects nothing on its own. It reads rendered page text, so it cannot see words inside images, canvas elements or unopened tabs. It is a dictionary rather than a classifier, and this note measures no install numbers, no retention and no count of the leaks it prevented.</p></div>
                </div>
              </section>
            </div>
          </article>
  );
}
