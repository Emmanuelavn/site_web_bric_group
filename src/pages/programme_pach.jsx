import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "utils";
import { motion } from "framer-motion";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import ProjectModal from "components/ui/project-modal";
import { 
  Home, 
  CheckCircle, 
  TrendingDown, 
  Clock, 
  Leaf, 
  Shield,
  Calculator,
  FileText,
  ArrowRight
} from "lucide-react";
import PictureCard from 'components/ui/picture-card';

import pachContent from "entites/pach_content.json";

// If an auto-generated projects JSON exists (created by scripts/ingest_projects.js), prefer it.
let autoProjects = null;
try {
  // require is synchronous and will throw if file not present
    // eslint-disable-next-line global-require
  const auto = require('entites/pach_projects_auto.json');
  if (auto && Array.isArray(auto.projects)) autoProjects = auto.projects;
} catch (e) {
  autoProjects = null;
}

// Use content from `src/entites/pach_content.json` when available.
// This keeps the page structure and styling intact while allowing
// the textual content to be replaced by the PDF-derived text.
const offres = (pachContent && pachContent.offres) || [
  {
    id: "F2_40m2",
    type: "F2",
    nom: "Appartement F2",
    surface: "40m²",
    chambres: 1,
    prix: 4800000,
    acompte: 3500000,
    description: "1 Chambre, 1 Salon",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
  },
  {
    id: "F3_90m2",
    type: "F3",
    nom: "Appartement F3",
    surface: "90m²",
    chambres: 2,
    prix: 10800000,
    acompte: 7000000,
    description: "2 Chambres, 1 Salon",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    featured: true
  },
  {
    id: "F4_100m2",
    type: "F4",
    nom: "Appartement F4",
    surface: "100m²",
    chambres: 3,
    prix: 12000000,
    acompte: 10000000,
    description: "3 Chambres, 1 Salon",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  },
];

const avantages = (pachContent && pachContent.avantages) || [
  { icon: TrendingDown, title: "Démarrez avec 50%", description: "Commencez votre projet avec seulement la moitié du montant total" },
  { icon: Clock, title: "Construction rapide", description: "Votre maison construite en seulement 6 mois" },
  { icon: Leaf, title: "Écologique", description: "Construction respectueuse de l'environnement" },
  { icon: Shield, title: "Financement flexible", description: "Remboursement sur 1 à 3 ans selon vos possibilités" },
];

const advantageIcons = [TrendingDown, Clock, Leaf, Shield];
const stepsIcons = [Home, FileText, Calculator, CheckCircle];

export default function ProgrammePACH() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const ITEMS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  function buildSrc(url, w) {
    if (!url) return url;
    try {
      const [base, q] = url.split('?');
      const params = new URLSearchParams(q || '');
      // if url is local (starts with /), just return it (no resizing)
      if (base.startsWith('/')) return base;
      params.set('w', String(w));
      params.set('q', params.get('q') || '80');
      return `${base}?${params.toString()}`;
    } catch (e) {
      return url;
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              { (pachContent && pachContent.heroBadge) || 'Programme Phare BRIC GROUP' }
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              { (pachContent && pachContent.heroTitle) || 'Programme PACH-BENIN' }
            </h1>
            <p className="text-2xl mb-4 text-gray-100">
              { (pachContent && pachContent.heroSubtitle) || "Programme d'Appui pour la Construction de l'Habitat au Bénin" }
            </p>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              { (pachContent && pachContent.heroParagraph) || 'Devenez propriétaire de votre maison avec un financement flexible. Commencez votre projet avec seulement 50% du montant total.' }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Les Avantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Les Avantages du PACH</h2>
            <p className="text-xl text-gray-600">
              Un programme conçu pour faciliter l'accès à la propriété
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((avantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-none bg-gradient-to-br from-white to-[#e8f5e9]">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-[#2d7a4b] rounded-xl flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const Icon = (avantage && avantage.icon) || advantageIcons[index] || TrendingDown;
                        return <Icon className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{avantage.title}</h3>
                    <p className="text-gray-600 text-sm">{avantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Offres */}
      <section id="nos-projets-pach" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Projets PACH</h2>
            <p className="text-xl text-gray-600">
              Découvrez les maisons déjà réalisées dans le cadre du Programme PACH. Cliquez sur une carte pour voir l'intérieur, l'extérieur et les détails.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              const sourceList = (autoProjects && autoProjects.length > 0) ? autoProjects : (pachContent && pachContent.projets ? pachContent.projets : []);
              return sourceList.slice(0, visibleCount).map((projet, index) => (
              <motion.div
                key={projet.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-none" onClick={() => { setSelectedProject(projet); setModalOpen(true); }}>
                  <div className="relative h-64 overflow-hidden">
                    <PictureCard src={projet.image_principale} alt={projet.titre} buildSrc={buildSrc} />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${projet.statut === 'termine' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                        {projet.statut === 'termine' ? 'Terminé' : 'En cours'}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{projet.titre}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-3">{projet.description}</p>
                    <div className="flex gap-3 items-center text-sm text-gray-600 mb-4">
                      {projet.localisation && <div><strong>Localisation:</strong> {projet.localisation}</div>}
                      {projet.superficie && <div><strong> • Superficie:</strong> {projet.superficie}</div>}
                    </div>

                    <div className="flex gap-3">
                      <Link to={`/projets/${projet.id}`} onClick={(e) => e.stopPropagation()}>
                        <button className="inline-flex items-center gap-2 px-4 py-3 bg-[#2d7a4b] text-white rounded-md hover:bg-[#255f3f] transition">
                          Voir plus
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link to={`${createPageUrl("OffrePACH")}?type=${projet.id}`} onClick={(e) => e.stopPropagation()}>
                        <button className="px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition text-sm">
                          Demander un devis
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ));
            })()}
          </div>

          {(() => {
            const sourceList = (autoProjects && autoProjects.length > 0) ? autoProjects : (pachContent && pachContent.projets ? pachContent.projets : []);
            if (!sourceList || sourceList.length <= visibleCount) return null;
            return (
              <div className="mt-8 text-center">
                <button onClick={() => setVisibleCount(c => Math.min(sourceList.length, c + ITEMS_PER_PAGE))} className="px-6 py-3 bg-[#2d7a4b] text-white rounded-md hover:bg-[#255f3f] transition">Charger plus</button>
              </div>
            );
          })()}

          {selectedProject && (
            <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} project={selectedProject} />
          )}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça Marche ?</h2>
            <p className="text-xl text-gray-600">
              Un processus simple en 4 étapes
            </p>
          </motion.div>

          <div className="space-y-8">
            {(pachContent && pachContent.etapes ? pachContent.etapes : [
              { 
                step: "1", 
                title: "Choisissez Votre Offre", 
                description: "Sélectionnez le type d'appartement qui vous convient (F2, F3 ou F4)"
              },
              { 
                step: "2", 
                title: "Inscription au Programme", 
                description: "Remplissez le formulaire et fournissez les documents requis. Frais d'inscription: 50.000 FCFA"
              },
              { 
                step: "3", 
                title: "Paiement Initial", 
                description: "Payez 50% du montant initial selon les modalités convenues (12 mois)"
              },
              { 
                step: "4", 
                title: "Construction & Financement", 
                description: "Construction en 6 mois, puis remboursement des 50% restants sur 24 mois"
              },
            ]).map((etape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {etape.step}
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="border-l-4 border-l-[#2d7a4b] hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const Icon = (etape && etape.icon) || stepsIcons[index] || Home;
                            return <Icon className="w-6 h-6 text-[#2d7a4b]" />;
                          })()}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{etape.title}</h3>
                          <p className="text-gray-600">{etape.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#2d7a4b] to-[#4a9d6f]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              { (pachContent && pachContent.ctaTitle) || 'Prêt à Devenir Propriétaire ?' }
            </h2>
            <p className="text-xl mb-8">
              { (pachContent && pachContent.ctaParagraph) || 'Rejoignez des centaines de Béninois qui ont déjà construit leur maison avec le Programme PACH' }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`${createPageUrl("OffrePACH")}?type=F3_90m2`}>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Demander un Devis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link to={createPageUrl('InscriptionPACH')}>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-md">
                  Souscrire au programme PACH
                </Button>
              </Link>

              <Link to={createPageUrl("Contact")}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2d7a4b] text-lg px-8 py-6">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Inscription page link: modal removed in favor of dedicated page */}
    </div>
  );
}