import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition, usePrefersReducedMotion } from './components/ui/motion';
import Layout from './layout/layout.jsx';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/acceuil.jsx';
import Contact from './pages/contact.jsx';
import About from './pages/about.jsx';
import Prestations from './pages/prestation.jsx';
import Services from './pages/services.jsx';
import ProgrammePach from './pages/programme_pach.jsx';
import Projects from './pages/projects.jsx';
import Offrepach from './pages/offrepach.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <InnerApp />
    </Router>
  );
}

function InnerApp() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  return (
    <div className="bg-blue-100 min-h-screen">
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition reducedMotion={reduced}><Home /></PageTransition>} />
            <Route path="/contact" element={<PageTransition reducedMotion={reduced}><Contact /></PageTransition>} />
            <Route path="/apropos" element={<PageTransition reducedMotion={reduced}><About /></PageTransition>} />
            <Route path="/prestations" element={<PageTransition reducedMotion={reduced}><Prestations /></PageTransition>} />
            <Route path="/services" element={<PageTransition reducedMotion={reduced}><Services /></PageTransition>} />
            <Route path="/programmepach" element={<PageTransition reducedMotion={reduced}><ProgrammePach /></PageTransition>} />
            <Route path="/projets" element={<PageTransition reducedMotion={reduced}><Projects /></PageTransition>} />
            <Route path="/offrepach" element={<PageTransition reducedMotion={reduced}><Offrepach /></PageTransition>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </div>
  );
}

export default App;