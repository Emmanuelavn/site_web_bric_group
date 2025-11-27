import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from './sheet';
import MotionContainer from './motion';
import Lightbox from './lightbox2';

export default function ProjectModal({ open, onClose, project, initialImage = 0 }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(initialImage || 0);

  if (!project) return null;

  const images = [project.image_principale, ...(project.images || [])].filter(Boolean);

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => !v && onClose && onClose()}>
        <SheetContent className="max-w-4xl w-full">
          <SheetHeader>
            <SheetTitle>{project.titre}</SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                {images.length > 0 ? (
                  <>
                    <img
                      src={images[0]}
                      alt={project.titre}
                      className="w-full object-cover rounded-md cursor-zoom-in"
                      loading="lazy"
                      onClick={() => {
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }}
                    />
                    <div className="flex items-center justify-between mt-3 gap-3">
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        {images.slice(1,5).map((src, i) => (
                          <button key={i} className="overflow-hidden rounded-md" onClick={() => { setLightboxIndex(i + 1); setLightboxOpen(true); }}>
                            <img src={src} alt={`${project.titre}-${i + 1}`} className="w-full h-28 object-cover" loading="lazy" />
                          </button>
                        ))}
                      </div>

                      <div className="flex-shrink-0 ml-3">
                        <button
                          onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                          className="px-4 py-2 bg-[#2d7a4b] text-white rounded-md hover:bg-[#255f3f] transition"
                        >
                          Voir toutes les photos ({images.length})
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={project.image_principale || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80'} alt={project.titre} className="w-full object-cover rounded-md" loading="lazy" />
                )}
              </div>
            </div>
            <div>
              <MotionContainer>
                <div className="space-y-4">
                  <p className="text-gray-700">{project.description}</p>
                  <div className="text-sm text-gray-600 space-y-2">
                    {project.localisation && <div><strong>Localisation:</strong> {project.localisation}</div>}
                    {project.superficie && <div><strong>Superficie:</strong> {project.superficie}</div>}
                    {project.duree && <div><strong>Durée:</strong> {project.duree}</div>}
                    {project.statut && <div><strong>Statut:</strong> {project.statut === 'termine' ? 'Terminé' : 'En cours'}</div>}
                  </div>
                </div>
              </MotionContainer>
            </div>
          </div>

          <SheetFooter>
            <div className="flex justify-end">
              <button onClick={() => onClose && onClose()} className="px-4 py-2 bg-gray-200 rounded">Fermer</button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Lightbox images={images} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </>
  );
}
