import React from "react";
import { Card } from "components/ui/card";
import { Target, Eye, Heart, Shield, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function APropos() {
  const valeurs = [
    {
      icon: Heart,
      title: "Satisfaction Client",
      description: "Toutes nos décisions sont prises en tenant compte de la satisfaction et des goûts du client"
    },
    {
      icon: TrendingUp,
      title: "Agilité",
      description: "Nous trouvons rapidement des solutions créatives et les mettons en œuvre efficacement"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous travaillons dans un esprit de collaboration avec tous nos partenaires"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "La santé et la sécurité au travail sont notre priorité avec un objectif zéro incident"
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de BRIC GROUP Africa
            </h1>
            <p className="text-xl text-gray-100">
              Votre partenaire de confiance pour tous vos projets immobiliers au Bénin et en Afrique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt="BRIC GROUP"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Qui Sommes-Nous ?</h2>
                <p className="text-gray-700 mb-4">
                  <strong>BRIC GROUP Africa</strong> est une société spécialisée dans le secteur de l'immobilier, couvrant la construction, la rénovation, la gestion immobilière, l'étude et l'exploitation de projets, ainsi que l'événementiel.
                </p>
                <p className="text-gray-700 mb-4">
                  En quelques années d'expérience, nous avons développé une solide réputation et augmenté notre savoir-faire en matière de qualité et de rigueur.
                </p>
                <p className="text-gray-700">
                  Par notre professionnalisme, nous mettons tout en œuvre pour satisfaire et combler les attentes de nos clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Objectif */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                  <Target className="w-12 h-12 text-[#2d7a4b] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
                  <p className="text-gray-700">
                    Rédiger, concevoir, planifier et réaliser à terme des projets de construction, de rénovation et d'immobilier de toutes envergures. Nos équipes qualifiées assurent la pleine satisfaction des exigences de nos clients.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                  <Eye className="w-12 h-12 text-[#4d9fb8] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
                  <p className="text-gray-700">
                    Assurer la qualité de nos prestations et travailler en permanence pour acquérir de nouvelles connaissances afin de conserver notre statut d'expert dans notre domaine.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                  <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Objectif</h3>
                  <p className="text-gray-700">
                    Conserver notre place de choix par l'exécution de travaux de qualité, la conception et la construction de villas clé en main ainsi que leur rénovation.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Nos Valeurs
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <valeur.icon className="w-6 h-6 text-[#2d7a4b]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{valeur.title}</h3>
                        <p className="text-gray-600">{valeur.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre Équipe
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Notre équipe se compose d'<strong>architectes et ingénieurs</strong> pour l'élaboration des avant-projets, ainsi que de <strong>maçons, électriciens, plombiers, charpentiers et carreleurs</strong> bien qualifiés pour assurer la réalisation des projets.
            </p>
            <p className="text-lg text-gray-700">
              Nous faisons toutes les démarches administratives et juridiques du début du projet jusqu'à sa réalisation, en conservant l'anonymat et la confidentialité de nos clients.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}