import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Curriculum from './sections/Curriculum';
import CinematicVision from './sections/CinematicVision';
import AlumniArchives from './sections/AlumniArchives';
import Recommendations from './sections/Recommendations';
import Footer from './sections/Footer';
import Blog from './sections/Blog';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import { statementConfig } from './config';

// The two sub-pages load on demand. Nobody arriving at the home page needs the
// full CV or the service write-ups, and eagerly importing them put both in the
// single entry chunk. The home page stays eager so it never shows a fallback.
const CapabilityDetail = lazy(() => import('./sections/CapabilityDetail'));
const Background = lazy(() => import('./sections/Background'));

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
    const jump = () =>
      document.querySelector(hash)?.scrollIntoView({ behavior: 'instant', block: 'start' });

    jump();
    const timer = window.setTimeout(jump, 140);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <div className="page-ground">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Curriculum />
        <Statement
          text={statementConfig.text}
          accent={statementConfig.accent}
          caption={statementConfig.caption}
        />
        <CinematicVision />
        <Blog />
        <AlumniArchives />
        <Recommendations />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <RouteBehaviour />
      {/* The fallback is the page ground itself: the lazy routes are a single
          request on an already-painted dark page, so a spinner would flash
          more than it would reassure. */}
      <Suspense fallback={<div className="page-ground" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/capability/:slug" element={<CapabilityDetail />} />
          <Route path="/background" element={<Background />} />
        </Routes>
      </Suspense>
      <div className="grain-overlay" aria-hidden="true" />
      <Analytics />
    </>
  );
}
