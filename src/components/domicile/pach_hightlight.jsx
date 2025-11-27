import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { CheckCircle, Home, TrendingDown, Clock, Leaf, ArrowRight } from "lucide-react";
import pachContent from "../../entites/pach_content.json";
import PictureCard from "../ui/picture-card";

  // buildSrc helper: match the logic used in projects listing so remote and local urls work
  function buildSrc(url, w) {
    if (!url) return url;
    try {
      const [base, q] = url.split('?');
      const params = new URLSearchParams(q || '');
      // if path is local (starts with /), return as-is so the browser requests the static file
      if (base.startsWith('/')) return base;
      params.set('w', String(w));
      params.set('q', params.get('q') || '80');
      return `${base}?${params.toString()}`;
    } catch (e) {
      return url;
    }
  }

const defaultAvantages = [
  { icon: TrendingDown, text: "Commencez avec seulement 50% du montant" },
  { icon: Clock, text: "Construction rapide en 6 mois" },
  { icon: Leaf, text: "Construction écologique" },
  { icon: Home, text: "Remboursement flexible sur 1 à 3 ans" },
];

export default function PACHHighlight() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f]"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              {pachContent.heroBadge || 'Programme Phare'}
            </div>
            <h2 className="text-5xl font-bold mb-6">
              {pachContent.heroTitle || 'Programme PACH'}
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              {pachContent.heroSubtitle || "Programme d'Appui pour la Construction de l'Habitat"}
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              {pachContent.heroParagraph || 'Réalisez votre rêve de devenir propriétaire avec un financement flexible adapté à votre budget.'}
            </p>

            <div className="space-y-4 mb-8">
              {(pachContent.avantages && pachContent.avantages.length ? pachContent.avantages : defaultAvantages).map((avantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{avantage.title || avantage.text}</div>
                    {avantage.description && <div className="text-sm text-gray-100">{avantage.description}</div>}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/programmepach">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Découvrir le Programme PACH
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Offres Disponibles</h3>
              <div className="space-y-4">
                {(pachContent.offres && pachContent.offres.length ? pachContent.offres : []).slice(0,3).map((offre, index) => (
                  <motion.div
                    key={offre.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="bg-gradient-to-r from-[#e8f5e9] to-white p-4 rounded-xl border-2 border-[#2d7a4b]/20 hover:border-[#2d7a4b] transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Home className="w-5 h-5 text-[#2d7a4b]" />
                          <span className="font-bold text-lg text-gray-900">{offre.nom || offre.type}</span>
                        </div>
                        {offre.surface && <p className="text-sm text-gray-600">{offre.surface}</p>}
                        {offre.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{offre.description}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">À partir de</p>
                        <p className="font-bold text-[#2d7a4b]">{offre.acompte || (offre.prix ? `${offre.prix.toLocaleString()} FCFA` : '')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {pachContent.projets && pachContent.projets.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Exemples de réalisations</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {pachContent.projets.slice(0,4).map((p, i) => {
                      const img = p.image_principale || (p.images && p.images[0] && (typeof p.images[0] === 'string' ? p.images[0] : p.images[0].url));
                      return (
                        <div key={p.id || i} className="h-32 overflow-hidden rounded-md">
                          <PictureCard src={img} alt={p.titre} buildSrc={buildSrc} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-center text-sm text-gray-500 mt-6">
                * Déboursé sec avec financement flexible
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}