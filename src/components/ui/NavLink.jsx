import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const OFFSET = 80; // Hauteur approximative du header sticky
      const y = element.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Gérer le défilement après le changement de page (navigation vers un hash)
    if (location.hash) {
      const id = location.hash.substring(1);
      // Petit délai pour s'assurer que la page/section est rendue
      setTimeout(() => {
        scrollToId(id);
      }, 120);
    }
  }, [location]);

  const handleClick = (e) => {
    if (to.includes('#')) {
      const [path, id] = to.split('#');
      if (location.pathname === path) {
        // Même page, défilement immédiat vers l'ancre
        e.preventDefault();
        const scrolled = scrollToId(id);
        // Mettre à jour l'URL pour refléter l'ancre, utile pour l'historique et les clics suivants
        if (scrolled) {
          window.history.pushState(null, '', `${path}#${id}`);
        } else {
          // Si l'élément n'est pas encore disponible, forcer une navigation pour que useEffect prenne le relais
          navigate(`${path}#${id}`);
        }
      }
      // Si c'est une autre page, laisse react-router gérer la navigation
      // et useEffect s'occupera du défilement après
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;