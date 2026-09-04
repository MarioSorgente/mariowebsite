import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capability/:slug" element={<CapabilityDetail />} />
        <Route path="/background" element={<Background />} />
      </Routes>
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
