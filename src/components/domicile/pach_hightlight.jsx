import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { CheckCircle, Home, TrendingDown, Clock, Leaf, ArrowRight } from "lucide-react";

const avantages = [
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
              🎉 Programme Phare
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Programme PACH
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Programme d'Appui pour la Construction de l'Habitat au Bénin
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Réalisez votre rêve de devenir propriétaire avec un financement flexible adapté à votre budget. 
              Construisez votre maison en payant seulement 50% du coût total.
            </p>

            <div className="space-y-4 mb-8">
              {avantages.map((avantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <avantage.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{avantage.text}</span>
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
                {[
                  { type: "F2", surface: "40m²", prix: "4.800.000 FCFA", acompte: "3.500.000 FCFA" },
                  { type: "F3", surface: "90m²", prix: "10.800.000 FCFA", acompte: "7.000.000 FCFA" },
                  { type: "F4", surface: "100m²", prix: "12.000.000 FCFA", acompte: "10.000.000 FCFA" },
                ].map((offre, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-[#e8f5e9] to-white p-4 rounded-xl border-2 border-[#2d7a4b]/20 hover:border-[#2d7a4b] transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Home className="w-5 h-5 text-[#2d7a4b]" />
                          <span className="font-bold text-lg text-gray-900">Appartement {offre.type}</span>
                        </div>
                        <p className="text-sm text-gray-600">{offre.surface}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">À partir de</p>
                        <p className="font-bold text-[#2d7a4b]">{offre.acompte}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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