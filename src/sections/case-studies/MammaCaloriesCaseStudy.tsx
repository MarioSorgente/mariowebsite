import type { RefObject } from 'react';
import mammaCaloriesImage from '../../../public/images/mamma-calories-dashboard.svg';

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function MammaCaloriesCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="mamma-calories-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study on nutrition-aware meal planning</p>
                <h2 id="mamma-calories-blog-title">Mamma Calories: from nutrition targets to a week the kitchen can make</h2>
                <p>Mamma Calories is a production-ready product for turning a restaurant's real dishes into repeatable weekly meal plans with calories, macros, and prices visible before a client orders.</p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://macronutrient.vercel.app/" target="_blank" rel="noopener noreferrer">Visit Mamma Calories</a>
                </div>
              </div>
              <figure className="blog-hero-figure mamma-calories-feature-figure">
                <img loading="lazy" src={mammaCaloriesImage} alt="Mamma Calories restaurant meal-planning screen with Plan and Build navigation, nutrition-data guidance, a weekly planner, meal macro totals, and visible prices" />
                <figcaption>Mamma Calories brings restaurant-branded meals, nutrition information, weekly planning, and price review into one working Plan &amp; Build journey.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div><p className="blog-kicker">The opportunity</p><h3 className="blog-heading">The ingredients already exist. Nothing connects them into a plan.</h3></div>
                <div className="blog-copy">
                  <p>Interviews with the founders and coaches repeatedly surfaced a coordination problem: coaches needed to prepare meal plans for clients, while restaurant dishes, nutrition targets, availability, and prices lived in separate workflows.</p>
                  <p>That need established the problem. The hypothesis was that connecting those inputs would make restaurant food easier to plan, compare, prepare and price before anyone commits.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The product model</p>
                <h3 className="blog-heading">Connect a live menu to a client's nutrition targets.</h3>
                <p>Mamma Calories treats the restaurant menu as structured planning data. Each available dish links its recipe, portion, nutrition estimate, price, availability, and dietary information to a planning layer. A coach or client can then assemble a week from food the kitchen can actually make and compare the resulting totals with the client's targets.</p>
                <p>The model stays practical on purpose. A perfect plan on paper is worth nothing if it ignores kitchen capacity, ingredient availability or substitutions. The product's job is to let the three people involved work from the same numbers.</p>
              </section>

              <section className="blog-pill-grid" aria-label="Mamma Calories audiences">
                <div className="blog-pill-card"><strong>Restaurants</strong><br />Manage dishes, ingredients, portions, prices, availability, and fulfilment.</div>
                <div className="blog-pill-card"><strong>Coaches</strong><br />Translate a client's goals into calorie and macronutrient targets.</div>
                <div className="blog-pill-card"><strong>Clients</strong><br />Plan and order meals with macro totals and cost visible.</div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The planning journey</p>
                <h3 className="blog-heading">The plan shows its own numbers before it becomes an order.</h3>
                <ol className="blog-step-list">
                  <li><strong>Choose meals.</strong><span>Browse food the selected restaurant currently offers.</span></li>
                  <li><strong>Inspect nutrition.</strong><span>Review portion size, ingredients, allergens, calories, protein, carbohydrates, fat, and price.</span></li>
                  <li><strong>Build the week.</strong><span>Place meals into days and meal slots to create a repeatable schedule.</span></li>
                  <li><strong>Compare with targets.</strong><span>See daily and weekly totals alongside the coach- or client-defined targets, without presenting them as medical advice.</span></li>
                  <li><strong>Review the price.</strong><span>Understand the expected cost and any quantity or fulfilment details before committing.</span></li>
                  <li><strong>Submit the request.</strong><span>Send an order or preparation request for restaurant confirmation rather than assuming capacity.</span></li>
                </ol>
              </section>

              <section className="blog-two-column blog-block">
                <div><p className="blog-kicker">Visible product decisions</p><h3 className="blog-heading">From a first look to a usable plan in as few steps as possible.</h3></div>
                <div className="blog-copy">
                  <p>The product explains what the nutrition numbers mean near the start of the experience. The figures support planning and comparison. The product never presents them as medical advice.</p>
                  <p>People can begin planning without creating an account, while the simple “Plan &amp; Build” navigation keeps the core job prominent. Ordering by the week matches how meal prep actually works, and restaurant-specific branding makes it clear which kitchen, menu, prices, and fulfilment constraints apply.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Data integrity</p>
                <h3 className="blog-heading">A macro total is only as dependable as the recipe behind it.</h3>
                <p>Every calculation should retain the ingredient quantity and unit, edible yield, serving size, nutrition-data source, and last-updated date. The system must never mix raw and cooked weights without saying so: cooking can change water content and serving weight, so the recipe should record preparation method and yield, then calculate nutrition for the served portion.</p>
                <p>Allergens need structured flags plus a clear cross-contact caveat from the restaurant. A substitution must never inherit the original totals. The kitchen records the replacement and the quantity, the product recalculates calories, macros, allergens and price, and the client accepts the change. The system should version menu-price and recipe updates, keeping the values attached to an already submitted request while showing current values for new plans.</p>
                <p>Restaurant confirmation remains essential. The interface can make inputs and estimates transparent, but it cannot guarantee ingredient handling, preparation accuracy, or clinical suitability. Coaches and clients should be able to see the source and freshness of nutrition data and escalate dietary or medical questions to a qualified professional.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div><p className="blog-kicker">My role and build scope</p><h3 className="blog-heading">Product lead from demand research through production build.</h3></div>
                <div className="blog-copy">
                  <p>As product lead working with the founders, I took Mamma Calories from the first idea to a live product. I analyzed demand, validated the problem with the founders, the market, and early leads, then researched and designed the journey across restaurant, coach and client, and the information hierarchy.</p>
                  <p>I built the responsive, database-backed product, including menu discovery, nutrition visibility, weekly plan assembly, target comparison, cost review, and the preparation-request handoff. Every feature listed here works in the live product today.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Trade-offs and learning</p>
                <h3 className="blog-heading">Convenience cannot come at the expense of traceability.</h3>
                <p>Letting users plan immediately lowers friction, but persistence and ordering may eventually require identity. Flexible substitutions help kitchens fulfil requests, but they complicate nutrition and allergen accuracy. Restaurant-specific menus make plans executable, while limiting the apparent choice of a broad recipe catalogue. Weekly totals are easy to scan, but must preserve a path back to every portion and ingredient.</p>
                <p>The main lesson was that meal planning depends on coordination as much as arithmetic. A plan is only useful when it matches a nutrition target to what one specific kitchen can reliably prepare, price and confirm.</p>
              </section>

              <section className="blog-outcome" aria-labelledby="mamma-validation-title">
                <p className="blog-kicker">Evidence and ongoing learning</p>
                <h3 id="mamma-validation-title" className="blog-heading">A working service, still under test.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>Observed evidence</strong><p>Founders and coaches described the recurring work of preparing meals for clients. Restaurants, coaches, and clients continue to participate in product testing.</p></div>
                  <div><strong>What remains a hypothesis</strong><p>Testing continues to examine how the workflow fits day-to-day planning and preparation. This case study claims nothing about repeat ordering, preparation accuracy or willingness to pay.</p></div>
                </div>
              </section>
            </div>
          </article>
  );
}
