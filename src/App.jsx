import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout.jsx';
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
      <div className="bg-blue-100 min-h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/prestations" element={<Prestations />} />
            <Route path="/services" element={<Services />} />
            <Route path="/programmepach" element={<ProgrammePach />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/offrepach" element={<Offrepach />} />
            {/* Fallback route: redirect unknown paths to home (adjust if you want a 404 page) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;