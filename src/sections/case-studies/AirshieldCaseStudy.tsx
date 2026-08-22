import type { RefObject } from 'react';
import airshieldImage from '../../../public/images/airshield-photo.svg';

const airshieldWork = ['Founder discovery', 'Business Model Canvas', 'Website design & build', 'Higgsfield marketing', 'Investor story', 'Fundraising deck'];

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function AirshieldCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="airshield-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study · Strategy, product &amp; fundraising</p>
                <h2 id="airshield-blog-title">How I built Airshield</h2>
                <p>
                  Airshield began with a founder who had a meaningful product idea: a new approach to helmet protection. But an invention alone is not yet a fundable business. I helped turn the founder's expertise into a clear company story, a credible website, a complete business model, and an investor strategy designed to open fundraising conversations.
                </p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://www.airshieldhelmets.com/" target="_blank" rel="noopener noreferrer">Visit Airshield ↗</a>
                  <a className="blog-cta blog-cta-secondary" href="https://drive.google.com/uc?export=download&amp;id=1B04BjaRXttfZucYs8SqomcD6iCCKYqsO" target="_blank" rel="noopener noreferrer">Download strategy deck ↓</a>
                </div>
              </div>
              <figure className="blog-hero-figure">
                <img loading="lazy" className="airshield-feature-image" src={airshieldImage} alt="Airshield rider wearing a filtration helmet with replaceable filter cartridge and USB-C rechargeable battery callouts" />
                <figcaption>Airshield presents the helmet as protection for riders who breathe exhaust, dust, and PM2.5 in traffic every day.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div>
                  <p className="blog-kicker">The founder's problem</p>
                  <h3 className="blog-heading">A strong product needed a business that investors could understand.</h3>
                </div>
                <div className="blog-copy">
                  <p>The founder understood the protection problem and believed deeply in the solution. The gap was not passion or technical ambition; it was translation. Prospective customers needed to grasp the value quickly, partners needed to see a route to market, and investors needed evidence that the idea could become a scalable company.</p>
                  <p>The early story had to answer difficult questions in plain language: Who is the first customer? What pain is urgent enough to change buying behavior? Why is Airshield different from established helmet options? How will the company reach buyers, make money, prove demand, and use investment responsibly? Without those connections, the website would be decoration and the pitch would feel like a product presentation rather than an investment case.</p>
                </div>
              </section>

              <section className="blog-pill-grid" aria-label="Airshield project deliverables">
                {airshieldWork.map((item) => <div key={item} className="blog-pill-card">{item}</div>)}
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The business foundation</p>
                <h3 className="blog-heading">Before designing pages, I designed the company logic.</h3>
                <p>I worked from the founder's knowledge outward, turning conversations and assumptions into a Business Model Canvas. We defined customer segments, the value proposition for each audience, channels, customer relationships, key activities, resources, partners, costs, and revenue streams. This made hidden assumptions visible and gave us a practical list of what needed validation.</p>
                <p>The canvas became our decision system. It kept the website from trying to speak to everyone, connected product benefits to commercial outcomes, and gave the fundraising narrative a believable path from today's concept to tomorrow's company. Instead of promising a giant market without a route into it, we could show a focused entry point, the partnerships required, and the milestones capital would unlock.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">The product promise</p>
                  <h3 className="blog-heading">Protection should not stop at the skull.</h3>
                </div>
                <div className="blog-copy">
                  <p>Airshield's proposition starts with a daily reality for Indonesian riders: sitting inches from exhaust, road dust, and PM2.5. The product extends the familiar safety role of a helmet to the air a rider breathes, pairing premium filtration with a replaceable filter cartridge and a USB-C rechargeable battery.</p>
                  <p>That makes the story tangible rather than abstract. The helmet is the durable product; the cartridge makes maintenance and repeat use visible; and recharging fits a routine customers already understand. The initial launch focus—Jakarta, Bali, and major cities across Java—also gave the commercial plan a specific place to learn before expanding.</p>
                  <p className="blog-sources">Product details and launch positioning: <a href="https://www.airshieldhelmets.com/" target="_blank" rel="noopener noreferrer">Airshield Helmets</a>.</p>
                </div>
              </section>

              <section className="blog-copy blog-block blog-economics-block">
                <p className="blog-kicker">The unit economics</p>
                <h3 className="blog-heading">A credible price begins by separating every cost—including CAC.</h3>
                <p>A blended “cost per helmet” hides the decisions that determine whether growth creates value or consumes cash. We needed to separate the bill of materials and assembly from freight, duties, warehousing, payment fees, warranty and returns, customer support, and ongoing cartridge fulfilment. That produces a contribution margin we can actually manage instead of a gross-margin headline built on incomplete inputs.</p>
                <div className="blog-cost-grid" aria-label="Airshield cost model components">
                  <div><strong>Product</strong><span>Components, filtration system, battery, assembly, packaging and quality control.</span></div>
                  <div><strong>Landed</strong><span>Freight, insurance, duties, local handling and inventory storage.</span></div>
                  <div><strong>Transaction</strong><span>Payment fees, fulfilment, delivery, returns, warranty and customer care.</span></div>
                  <div><strong>Acquisition</strong><span>Creative, paid media, partnerships, sales effort and promotions—the full CAC.</span></div>
                </div>
                <p>CAC plays a decisive role because a premium new category must first educate the market, build trust, and convert attention into a reservation or purchase. It is not just ad spend: a useful blended CAC divides all sales and marketing costs by the new customers acquired in the same period. We then compare that figure with first-order contribution margin, cartridge repeat margin, payback time, and customer lifetime value.</p>
                <div className="blog-economics-formula" aria-label="Contribution economics formula">
                  <span>Net revenue</span><b>−</b><span>landed product cost</span><b>−</b><span>variable service costs</span><b>−</b><span>CAC</span><b>=</b><strong>customer contribution</strong>
                </div>
                <p>This breakdown changes strategy. If CAC is too high, the answer may be sharper city targeting, partnerships with rider communities or employers, better referral loops, or stronger conversion—not simply a higher price. And because replaceable cartridges can create recurring revenue, cohort retention matters: repeat purchases can improve lifetime value, but they should never be used to excuse an acquisition model with an unrealistic payback period.</p>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The website</p>
                <h3 className="blog-heading">The website became Airshield's digital front door.</h3>
                <p>I structured and built the Airshield website around the questions a visitor asks in sequence: what is the problem, what is different about this solution, why should I believe it, and what should I do next? The visual system balances safety, performance, and innovation while the copy translates the founder's technical insight into benefits that customers, strategic partners, and investors can understand.</p>
                <p>The site also became a credibility asset for outreach. It gives every introduction, pitch email, and investor conversation a consistent home. That consistency matters at an early stage: the founder no longer has to rebuild the explanation from scratch in every meeting, and every stakeholder encounters the same focused proposition.</p>
                <a className="blog-website-feature" href="https://www.airshieldhelmets.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit the live Airshield Helmets website">
                  <span className="blog-browser-bar" aria-hidden="true">
                    <span className="blog-browser-dots"><i /><i /><i /></span>
                    <span className="blog-browser-url">airshieldhelmets.com</span>
                  </span>
                  <span className="blog-website-feature-body">
                    <span className="blog-kicker">Live website</span>
                    <strong>See how the Airshield story comes to life.</strong>
                    <span>Explore the product positioning, brand, and founder vision on the website I built.</span>
                    <b>Visit Airshield ↗</b>
                  </span>
                </a>
              </section>

              <section className="blog-two-column blog-block">
                <div>
                  <p className="blog-kicker">The marketing engine</p>
                  <h3 className="blog-heading">I created the marketing material with Higgsfield.</h3>
                </div>
                <div className="blog-copy">
                  <p>A new physical product needs to feel real before a full-scale production shoot is practical. I used Higgsfield as an AI creative-production tool to develop Airshield's marketing imagery and translate the brand direction into polished campaign material. This gave the founder a coherent visual world for the website, investor conversations, presentations, and social communication—not a collection of disconnected mockups.</p>
                  <p>I established the visual direction first: premium protection, engineered performance, movement, and confidence. I then built and refined Higgsfield prompts around that system, controlling composition, environment, lighting, camera language, product emphasis, and brand tone. Iteration was essential. I selected the strongest generations, corrected inconsistencies, and shaped the final assets so they felt like one campaign.</p>
                  <p>The resulting material helped show Airshield in context and communicate an ambition that technical diagrams alone could not. It also made the launch system efficient: one creative direction could support hero imagery, campaign concepts, social assets, pitch-deck visuals, and partner outreach while keeping the story recognizably Airshield.</p>
                  <div className="blog-stack-list" aria-label="Marketing materials created with Higgsfield">
                    {['Campaign art direction', 'Product visuals', 'Website imagery', 'Social content', 'Pitch-deck visuals'].map((item) => (
                      <span key={item} className="blog-stack-chip">{item}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The investor strategy</p>
                <h3 className="blog-heading">The deck connects the vision to a credible use of capital.</h3>
                <p>I developed the strategy deck as a fundraising tool, not a brochure. It frames the founder's problem, the market opportunity, the solution, differentiation, business model, go-to-market logic, and investment roadmap as one connected argument. Each section earns the next: the problem creates urgency, the solution creates interest, the model demonstrates commercial thinking, and the roadmap shows how funding reduces risk.</p>
                <p>The result gives the founder a repeatable narrative for investor meetings and a foundation that can evolve as customer evidence, partnerships, testing, and traction grow. Most importantly, it changes the ask from “believe in my invention” to “help fund a clearly staged plan for building this company.”</p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://drive.google.com/uc?export=download&amp;id=1B04BjaRXttfZucYs8SqomcD6iCCKYqsO" target="_blank" rel="noopener noreferrer">Download the investor strategy deck ↓</a>
                  <a className="blog-text-link" href="https://drive.google.com/file/d/1B04BjaRXttfZucYs8SqomcD6iCCKYqsO/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Preview on Google Drive ↗</a>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The outcome</p>
                <h3 className="blog-heading">One founder story, built to work across product, web, and fundraising.</h3>
                <p>Airshield now has more than an idea and a logo. The founder has a coherent business foundation, a public website that communicates the opportunity, and an investor-ready story for raising capital. The work demonstrates how I partner with founders: I do not begin with isolated deliverables. I find the strategic thread that connects the customer problem, the business model, the product experience, and the case for investment—then build every artifact around it.</p>
              </section>
            </div>
          </article>
  );
}
