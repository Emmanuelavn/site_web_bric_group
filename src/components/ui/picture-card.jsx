import React, { useState } from 'react';

export default function PictureCard({ src, alt, buildSrc }) {
  const [loaded, setLoaded] = useState(false);
  const main = src || '';
  const src1200 = buildSrc(main, 1200);
  const src800 = buildSrc(main, 800);
  const src400 = buildSrc(main, 400);

  return (
    <div className={`w-full h-full bg-gray-200 ${!loaded ? 'animate-pulse' : ''} relative` }>
      <picture>
        <source srcSet={`${src1200} 1200w, ${src800} 800w, ${src400} 400w`} />
        <img
          src={src800}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover ${loaded ? 'group-hover:scale-105 transition-transform duration-500' : 'opacity-0'}`}
        />
      </picture>
      {!loaded && (
        <div className="absolute inset-0" aria-hidden />
      )}
    </div>
  );
}
