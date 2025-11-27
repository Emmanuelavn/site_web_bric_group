import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import localProjectsManifest from "../../entites/projets_auto.json";
import PictureCard from "../ui/picture-card";

export default function ProjectsGallery({ preview = false }) {
  const limit = preview ? 6 : undefined;

  function buildSrc(url, w) {
    if (!url) return url;
    try {
      const [base, q] = url.split('?');
      const params = new URLSearchParams(q || '');
      if (base.startsWith('/')) return base;
      params.set('w', String(w));
      params.set('q', params.get('q') || '80');
      return `${base}?${params.toString()}`;
    } catch (e) {
      return url;
    }
  }

  const isLoading = false;

  // Map local manifest shape to UI shape (same mapping as projects page)
  let projets = [];
  try {
    const list = (localProjectsManifest && Array.isArray(localProjectsManifest.projects)) ? localProjectsManifest.projects : [];
    projets = list.map(p => ({
      id: p.id || p.slug || `${p.type}_${p.title}`,
      titre: p.title || p.titre || p.slug,
      image_principale: p.cover || (p.images && p.images[0] && (typeof p.images[0] === 'string' ? p.images[0] : p.images[0].url)) || null,
      images: (p.images || []).map(i => (typeof i === 'string' ? i : i.url)).filter(Boolean),
      categorie: p.type || p.categorie || 'autre',
      description: p.shortDesc || p.description || '',
      localisation: p.localisation || '',
      superficie: p.superficie || '',
      duree: p.duree || '',
      statut: p.statut || 'termine'
    }));
  } catch (e) {
    projets = [];
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Réalisations</h2>
          <p className="text-xl text-gray-600">
            Découvrez quelques-uns de nos projets achevés avec succès
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(limit || 6).fill(0).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : projets.length > 0 ? (
            projets.slice(0, limit || projets.length).map((projet, index) => (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-none">
                  <div className="relative h-64 overflow-hidden">
                    <PictureCard src={projet.image_principale} alt={projet.titre} buildSrc={buildSrc} />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        projet.statut === 'termine' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {projet.statut === 'termine' ? 'Terminé' : 'En cours'}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2d7a4b] transition-colors">
                      {projet.titre}
                    </h3>
                    {projet.localisation && (
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{projet.localisation}</span>
                      </div>
                    )}
                    {projet.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {projet.description}
                      </p>
                    )}
                    <div className="flex items-center text-[#2d7a4b] font-medium">
                      Voir détails
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              <p>Nos projets seront bientôt disponibles</p>
            </div>
          )}
        </div>

        {preview && projets.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/projets">
              <Button size="lg" className="bg-[#2d7a4b] hover:bg-[#4a9d6f]">
                Voir Tous Nos Projets
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}