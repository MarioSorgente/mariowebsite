import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Credibility from './sections/Credibility';
import Problems from './sections/Problems';
import Curriculum from './sections/Curriculum';
import SuccessMeasurement from './sections/SuccessMeasurement';
import CinematicVision from './sections/CinematicVision';
import AlumniArchives from './sections/AlumniArchives';
import Recommendations from './sections/Recommendations';
import About from './sections/About';
import Faq from './sections/Faq';
import Footer from './sections/Footer';
import Blog from './sections/Blog';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import { statementConfig } from './config';
import { SITE_URL, usePageMeta } from './hooks/usePageMeta';
import { EngagementProvider } from './lib/engagement';

// The sub-pages load on demand. Nobody arriving at the home page needs the
// full CV or the service write-ups, and eagerly importing them put them in the
// single entry chunk. The home page stays eager so it never shows a fallback.
const CapabilityDetail = lazy(() => import('./sections/CapabilityDetail'));
const ServiceDetail = lazy(() => import('./sections/ServiceDetail'));
const Background = lazy(() => import('./sections/Background'));

/** Section ids that were renamed. Inbound links to the old anchors still land. */
const LEGACY_HASHES: Record<string, string> = {
  '#curriculum': '#services',
  '#cinematic': '#process',
  '#footer': '#contact',
};

/**
 * Puts every route change at a sensible scroll position. Without this, moving
 * from a scrolled home page to another route keeps the old offset and drops you
 * into the middle of the new page.
 */
function RouteBehaviour() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Instant throughout: base.css sets `scroll-behavior: smooth` on <html>, and
    // arriving on a new page should not animate across the length of the old one.
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // A hash arriving with the route means a link on another page asked for this
    // section. Scroll once now, then correct after layout settles, since images
    // and fonts can still move the target. A timer rather than an animation
    // frame, because frames do not run while the tab is in the background.
    const target = LEGACY_HASHES[hash] ?? hash;
    const jump = () => {
      try {
        document.querySelector(target)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      } catch {
        // A hash that is not a valid selector (say `#1`) is simply not a section.
      }
    };

    jump();
    const timer = window.setTimeout(jump, 140);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  // The canonical never carries ?engagement=, so the two modes are one page.
  usePageMeta({
    title: 'Zero2Hero | Mario Sorgente, Fractional Product Leadership',
    description:
      'Work with Mario Sorgente on fractional product leadership, product strategy, focused consulting and team coaching. Open to selected remote full-time roles.',
    canonical: `${SITE_URL}/`,
  });

  return (
    <div className="page-ground">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Credibility />
        <Problems />
        <Curriculum />
        <Statement
          text={statementConfig.text}
          accent={statementConfig.accent}
          caption={statementConfig.caption}
        />
        <SuccessMeasurement />
        <CinematicVision />
        <Blog />
        <AlumniArchives />
        <Recommendations />
        <About />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <EngagementProvider>
      <RouteBehaviour />
      {/* The fallback is the page ground itself: the lazy routes are a single
          request on an already-painted dark page, so a spinner would flash
          more than it would reassure. */}
      <Suspense fallback={<div className="page-ground" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          {/* Retired page. vercel.json redirects it permanently on the server;
              this covers in-app navigation and the dev server. */}
          <Route
            path="/capability/founder-coaching"
            element={<Navigate to="/services/focused-product-consulting" replace />}
          />
          <Route path="/capability/:slug" element={<CapabilityDetail />} />
          <Route path="/background" element={<Background />} />
        </Routes>
      </Suspense>
      <div className="grain-overlay" aria-hidden="true" />
    </EngagementProvider>
  );
}
