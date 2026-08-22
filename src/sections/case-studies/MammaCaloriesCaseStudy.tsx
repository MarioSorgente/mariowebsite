import type { RefObject } from 'react';
import mammaCaloriesImage from '../../../public/images/mamma-calories-dashboard.svg';

interface Props { readerRef: RefObject<HTMLElement | null> }

export default function MammaCaloriesCaseStudy({ readerRef }: Props) {
  return (
    <article ref={readerRef} className="blog-reader" aria-labelledby="mamma-calories-blog-title">
            <header className="blog-reader-header">
              <div className="blog-reader-copy">
                <p className="blog-kicker">Case study · Nutrition-aware meal planning</p>
                <h2 id="mamma-calories-blog-title">Mamma Calories: from nutrition targets to a week the kitchen can make</h2>
                <p>Mamma Calories is a product prototype for turning a restaurant's real dishes into repeatable weekly meal plans with calories, macros, and prices visible before a client orders.</p>
                <div className="blog-cta-row">
                  <a className="blog-cta" href="https://macronutrient.vercel.app/" target="_blank" rel="noopener noreferrer">Visit Mamma Calories ↗</a>
                </div>
              </div>
              <figure className="blog-hero-figure mamma-calories-feature-figure">
                <img loading="lazy" src={mammaCaloriesImage} alt="Mamma Calories restaurant meal-planning screen with Plan and Build navigation, nutrition-data guidance, a weekly planner, meal macro totals, and visible prices" />
                <figcaption>The Mamma Calories prototype brings restaurant-branded meals, nutrition information, weekly planning, and price review into one Plan &amp; Build journey.</figcaption>
              </figure>
            </header>

            <div className="blog-reader-body">
              <section className="blog-two-column">
                <div><p className="blog-kicker">The opportunity</p><h3 className="blog-heading">The ingredients already exist. The planning connection does not.</h3></div>
                <div className="blog-copy">
                  <p>Restaurants already know the dishes their kitchens can prepare, the ingredients those dishes use, and what each portion costs. Coaches and clients work from a different set of inputs: daily calories, protein, carbohydrate and fat targets, dietary preferences, and the need for a routine that can be repeated.</p>
                  <p>The opportunity is to connect those realities. Instead of suggesting an idealized meal that is unavailable or asking a client to calculate every order manually, the product can make restaurant food plan-able: transparent enough to compare, practical enough to prepare, and priced before commitment.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The product model</p>
                <h3 className="blog-heading">Connect a live menu to a client's nutrition targets.</h3>
                <p>Mamma Calories treats the restaurant menu as structured planning data. Each available dish links its recipe, portion, nutrition estimate, price, availability, and dietary information to a planning layer. A coach or client can then assemble a week from food the kitchen can actually make and compare the resulting totals with the client's targets.</p>
                <p>This model is intentionally operational. It does not promise that a mathematically perfect plan can ignore kitchen capacity, ingredient availability, or substitutions. It helps the three people involved work from the same source of truth.</p>
              </section>

              <section className="blog-pill-grid" aria-label="Mamma Calories audiences">
                <div className="blog-pill-card"><strong>Restaurants</strong><br />Manage dishes, ingredients, portions, prices, availability, and fulfilment.</div>
                <div className="blog-pill-card"><strong>Coaches</strong><br />Translate a client's goals into calorie and macronutrient targets.</div>
                <div className="blog-pill-card"><strong>Clients</strong><br />Plan and order meals with macro totals and cost visible.</div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">The planning journey</p>
                <h3 className="blog-heading">A weekly plan should explain itself before it becomes an order.</h3>
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
                <div><p className="blog-kicker">Visible product decisions</p><h3 className="blog-heading">Reduce the distance between curiosity and a useful first plan.</h3></div>
                <div className="blog-copy">
                  <p>The supplied screen puts nutrition-data messaging near the start of the experience so users can understand what the numbers represent. That language must remain precise: data can be sourced and calculated consistently, but it should not be described as clinically verified unless the source, reviewer, method, and review date are confirmed.</p>
                  <p>People can begin planning without creating an account, while the simple “Plan &amp; Build” navigation keeps the core job prominent. The weekly ordering frame matches how meal prep is actually organized, and restaurant-specific branding makes it clear which kitchen, menu, prices, and fulfilment constraints apply.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Data integrity</p>
                <h3 className="blog-heading">A macro total is only as dependable as the recipe behind it.</h3>
                <p>Every calculation should retain the ingredient quantity and unit, edible yield, serving size, nutrition-data source, and last-updated date. Raw and cooked weights must not be mixed silently: cooking can change water content and serving weight, so the recipe should record preparation method and yield, then calculate nutrition for the served portion.</p>
                <p>Allergens need structured flags plus a clear cross-contact caveat from the restaurant. A substitution should never inherit the original totals automatically; the kitchen must record the replacement and quantity so calories, macros, allergens, and price can be recalculated and the client can accept the change. Menu-price or recipe updates should be versioned, preserving the values attached to an already submitted request while showing current values for new plans.</p>
                <p>Restaurant confirmation remains essential. The interface can make inputs and estimates transparent, but it cannot guarantee ingredient handling, preparation accuracy, or clinical suitability. Coaches and clients should be able to see the source and freshness of nutrition data and escalate dietary or medical questions to a qualified professional.</p>
              </section>

              <section className="blog-two-column blog-block">
                <div><p className="blog-kicker">Mario's role &amp; prototype scope</p><h3 className="blog-heading">Build the smallest complete loop, not an imaginary platform.</h3></div>
                <div className="blog-copy">
                  <p>Mario framed the opportunity, mapped the restaurant–coach–client service model, designed the planning journey and information hierarchy, and built the responsive prototype. The scope demonstrates menu discovery, nutrition visibility, weekly plan assembly, target comparison, cost review, and a preparation-request handoff.</p>
                  <p>The technical approach uses a structured menu and recipe model behind a responsive web interface, with calculations derived from ingredient quantities and serving yields. The prototype does not claim completed restaurant, point-of-sale, delivery, payment, or clinical-data integrations, and it does not demonstrate traction.</p>
                </div>
              </section>

              <section className="blog-copy blog-block">
                <p className="blog-kicker">Trade-offs &amp; learning</p>
                <h3 className="blog-heading">Convenience cannot come at the expense of traceability.</h3>
                <p>Letting users plan immediately lowers friction, but persistence and ordering may eventually require identity. Flexible substitutions help kitchens fulfil requests, but they complicate nutrition and allergen accuracy. Restaurant-specific menus make plans executable, while limiting the apparent choice of a broad recipe catalogue. Weekly totals are easy to scan, but must preserve a path back to every portion and ingredient.</p>
                <p>The central learning was that meal planning is not only a calculator. It is a coordination product: the useful plan is the one that aligns a nutritional intention with what a specific kitchen can reliably prepare, price, and confirm.</p>
              </section>

              <section className="blog-outcome" aria-labelledby="mamma-validation-title">
                <p className="blog-kicker">Next validation steps</p>
                <h3 id="mamma-validation-title" className="blog-heading">Test the service loop before scaling the feature set.</h3>
                <div className="blog-outcome-grid">
                  <div><strong>Qualitative evidence</strong><p>Interview coaches about target setting and plan review, then run restaurant onboarding trials to test recipe entry, staff effort, substitutions, fulfilment, and preparation accuracy.</p></div>
                  <div><strong>Behavioral evidence</strong><p>Measure plan completion, submitted requests, repeat ordering, target comprehension, preparation discrepancies, and restaurant and client willingness to pay—without claiming these outcomes before trials are complete.</p></div>
                </div>
              </section>
            </div>
          </article>
  );
}
