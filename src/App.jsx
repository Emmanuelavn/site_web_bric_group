import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout.jsx';
import Home from './pages/acceuil.jsx'; // adapte selon tes fichiers
import Contact from './pages/contact.jsx'; // idem

function App() {
  return (
    <Router>
      <div className="bg-blue-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-blue-600 py-8">
          Tailwind CSS est maintenant configuré!
        </h1>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;