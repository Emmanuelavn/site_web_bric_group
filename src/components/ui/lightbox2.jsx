import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images = [], initialIndex = 0, open = false, onClose }) {
  const [index, setIndex] = useState(initialIndex || 0);
  const containerRef = useRef(null);

  useEffect(() => {
    setIndex(initialIndex || 0);
  }, [initialIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose();
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length, onClose]);

  // basic pointer/swipe support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = null;
    let moved = 0;
    const onPointerDown = (e) => { startX = e.clientX || (e.touches && e.touches[0].clientX); moved = 0; };
    const onPointerMove = (e) => { if (startX === null) return; const x = e.clientX || (e.touches && e.touches[0].clientX); moved = x - startX; };
    const onPointerUp = () => { if (Math.abs(moved) > 60) { if (moved < 0) setIndex((i) => (i + 1) % images.length); else setIndex((i) => (i - 1 + images.length) % images.length); } startX = null; };
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('touchstart', onPointerDown);
    el.addEventListener('touchmove', onPointerMove);
    el.addEventListener('touchend', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('touchstart', onPointerDown);
      el.removeEventListener('touchmove', onPointerMove);
      el.removeEventListener('touchend', onPointerUp);
    };
  }, [images.length]);

    if (!open || !images || images.length === 0) return null;

    // helper to get url/alt from image entry which may be string or object
    const getImageUrl = (img) => {
      if (!img) return '';
      return typeof img === 'string' ? img : (img.url || img.src || '');
    };

    const getImageAlt = (img, idx) => {
      if (!img) return `image-${idx}`;
      return typeof img === 'string' ? `image-${idx}` : (img.alt || img.title || `image-${idx}`);
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div ref={containerRef} className="relative max-w-6xl w-full max-h-[90vh]">
        <button onClick={() => onClose && onClose()} aria-label="Close" className="absolute top-3 right-3 z-20 bg-white/90 rounded-full p-2">
          <X className="w-5 h-5 text-gray-800" />
        </button>

        <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button onClick={() => setIndex((i) => (i + 1) % images.length)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2">
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={getImageUrl(images[index]) || index}
            src={getImageUrl(images[index])}
            loading="lazy"
            alt={getImageAlt(images[index], index)}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full h-[70vh] object-contain mx-auto rounded"
          />
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Go to image ${i+1}`} className={`w-2 h-2 rounded-full ${i===index ? 'bg-white' : 'bg-white/60'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
