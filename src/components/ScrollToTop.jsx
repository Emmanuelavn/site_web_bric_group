import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Only scroll to top when pathname actually changes (not when only hash changes)
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      // Smooth scroll to top for better UX
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}
