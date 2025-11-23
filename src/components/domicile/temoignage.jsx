import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Star, Quote } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";

export default function TestimonialsSection() {
  // Mock data for testimonials
  const témoignages = [
    {
      id: 1,
      note: 5,
      texte: "Travail exceptionnel ! L'équipe a suivi le projet avec professionnalisme et rigueur. Je recommande vivement leurs services.",
      nom_client: "Jean Dupont",
      profession: "Architecte",
      projet_type: "Rénovation complète"
    },
    {
      id: 2,
      note: 5,
      texte: "Qualité de travail irréprochable. Le projet a été livré dans les délais et le résultat dépasse nos attentes.",
      nom_client: "Marie Martin",
      profession: "Directrice d'entreprise",
      projet_type: "Construction neuve"
    },
    {
      id: 3,
      note: 4,
      texte: "Équipe professionnelle et à l'écoute. Le suivi du chantier était excellent du début à la fin.",
      nom_client: "Pierre Bernard",
      profession: "Ingénieur",
      projet_type: "Extension"
    }
  ];
  
  const isLoading = false;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce Que Disent Nos Clients</h2>
          <p className="text-xl text-gray-600">
            La satisfaction de nos clients est notre priorité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : témoignages.length > 0 ? (
            témoignages.map((temoignage, index) => (
              <motion.div
                key={temoignage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-none bg-gradient-to-br from-white to-[#e8f5e9]">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-[#2d7a4b]/20 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < temoignage.note ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{temoignage.texte}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-gray-900">{temoignage.nom_client}</p>
                      <p className="text-sm text-gray-600">{temoignage.profession}</p>
                      {temoignage.projet_type && (
                        <p className="text-xs text-[#2d7a4b] mt-1">{temoignage.projet_type}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              Les témoignages clients seront affichés ici
            </div>
          )}
        </div>
      </div>
    </section>
  );
}