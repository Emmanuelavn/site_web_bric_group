import React, { useEffect, useRef, useState } from 'react';

export default function CountUp({ end, duration = 1500, formatter = (v) => v, start = 0 }) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const parseEnd = typeof end === 'number' ? end : parseInt(String(end).replace(/[^0-9]/g, ''), 10) || 0;
    const startTs = performance.now();
    startTimeRef.current = startTs;

    const step = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + (parseEnd - start) * progress);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, start]);

  return <>{formatter(value)}</>;
}
