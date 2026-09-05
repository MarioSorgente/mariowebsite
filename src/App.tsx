import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Curriculum from './sections/Curriculum';
import CinematicVision from './sections/CinematicVision';
import AlumniArchives from './sections/AlumniArchives';
import Footer from './sections/Footer';
import CapabilityDetail from './sections/CapabilityDetail';
import Blog from './sections/Blog';
import Background from './sections/Background';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import { statementConfig } from './config';

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
        <AlumniArchives />
        <Blog />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <RouteBehaviour />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capability/:slug" element={<CapabilityDetail />} />
        <Route path="/background" element={<Background />} />
      </Routes>
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
