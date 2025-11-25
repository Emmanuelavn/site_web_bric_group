import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './sheet';
import { Card } from './card';
import MotionContainer from './motion';

export default function ProjectModal({ open, onClose, project }) {
  if (!project) return null;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose && onClose()}>
      <SheetContent className="max-w-4xl w-full">
        <SheetHeader>
          <SheetTitle>{project.titre}</SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              {project.images && project.images.length > 0 ? (
                project.images.map((src, i) => (
                  <img key={i} src={src} alt={`${project.titre}-${i}`} className="w-full object-cover rounded-md" />
                ))
              ) : (
                <img src={project.image_principale || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80'} alt={project.titre} className="w-full object-cover rounded-md" />
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
      </SheetContent>
    </Sheet>
  );
}
