import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "api/base44Client";
import { useLocation } from "react-router-dom";
import { Card } from "components/ui/card";
import { Button } from "components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import MotionContainer, { fadeUp } from "components/ui/motion";
import { Building2, MapPin, Calendar } from "lucide-react";
import { Skeleton } from "components/ui/skeleton";
import { Input } from "components/ui/input";
import ProjectModal from "components/ui/project-modal";

export default function Projets() {
  const [filter, setFilter] = useState("tous");
  const [q, setQ] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: projets = [], isLoading } = useQuery({
    queryKey: ['projets'],
    queryFn: () => base44.entities.Projet.list('-created_date'),
  });

  const categories = [
    { value: "tous", label: "Tous les Projets" },
    { value: "residentiel", label: "Résidentiel" },
    { value: "commercial", label: "Commercial" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "renovation", label: "Rénovation" }
  ];

  // derive categories dynamically from fetched projets
  const dynamicCategories = useMemo(() => {
    const cats = Array.from(new Set(projets.map(p => p.categorie).filter(Boolean)));
    const mapped = cats.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));
    return [{ value: 'tous', label: 'Tous les Projets' }, ...mapped];
  }, [projets]);

  const filteredProjets = useMemo(() => {
    let list = filter === "tous" ? projets : projets.filter(p => p.categorie === filter);
    if (q && q.trim().length > 0) {
      const term = q.trim().toLowerCase();
      list = list.filter(p => (p.titre || "").toLowerCase().includes(term) || (p.description || "").toLowerCase().includes(term) || (p.localisation || "").toLowerCase().includes(term));
    }
    return list;
  }, [projets, filter, q]);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <MotionContainer className="text-center max-w-3xl mx-auto">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
              Nos Réalisations
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-100">
              Découvrez nos projets achevés et notre savoir-faire
            </motion.p>
          </MotionContainer>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un projet, lieu, description..." className="w-72" />
              <div className="text-sm text-gray-600">{projets.length} projet(s)</div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {(dynamicCategories || categories).map((cat) => (
                <Button
                  key={cat.value}
                  variant={filter === cat.value ? "default" : "outline"}
                  onClick={() => setFilter(cat.value)}
                  className={filter === cat.value ? "bg-[#2d7a4b] hover:bg-[#4a9d6f] text-white" : ""}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galerie de Projets */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProjets.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun projet dans cette catégorie
              </h3>
              <p className="text-gray-500">
                Revenez bientôt pour découvrir nos nouveaux projets
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjets.map((projet, index) => {
                  return (
                    <motion.div
                      key={projet.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.28, delay: index * 0.03 }}
                    >
                      <motion.div layout whileHover={{ scale: 1.02 }} className="h-full">
                        <article id={projet.id}>
                          <Card onClick={() => { setSelectedProject(projet); setModalOpen(true); }} className="overflow-hidden transition-all h-full hover:shadow-2xl cursor-pointer">
                            <div className="relative group">
                              <img
                                src={projet.image_principale || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80"}
                                alt={projet.titre}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#2d7a4b] uppercase">
                                  {projet.categorie}
                                </span>
                              </div>
                              {projet.statut && (
                                <div className="absolute top-4 right-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    projet.statut === 'termine'
                                      ? 'bg-green-500 text-white'
                                      : 'bg-yellow-500 text-white'
                                  }`}>
                                    {projet.statut === 'termine' ? 'Terminé' : 'En cours'}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {projet.titre}
                              </h3>
                              {projet.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {projet.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500">
                                {projet.localisation && (
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {projet.localisation}
                                  </div>
                                )}
                                {projet.superficie && (
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {projet.superficie}
                                  </div>
                                )}
                                {projet.duree && (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Durée: {projet.duree}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        </article>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
      {/* Project Modal */}
      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} project={selectedProject} />
    </div>
  );
}