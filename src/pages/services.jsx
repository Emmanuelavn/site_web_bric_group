import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "utils";
import { motion } from "framer-motion";
import MotionContainer, { fadeUp, HoverScale } from "components/ui/motion";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { 
  Building2, 
  Wrench, 
  Home, 
  Ruler, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Phone,
  TrendingUp
} from "lucide-react";

const services = [
  {
    id: "construction",
    icon: Building2,
    titre: "Construction",
    description: "Projets de construction de toutes envergures pour particuliers et entreprises",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    color: "from-green-500 to-green-600",
    features: [
      "Construction de villas clé en main",
      "Immeubles résidentiels et commerciaux",
      "Bâtiments industriels",
      "Infrastructures publiques",
      "Maçonnerie et gros œuvre",
      "Suivi de chantier professionnel",
      "Garantie décennale",
      "Respect des délais et du budget"
    ],
    details: "Nous réalisons des projets de construction de A à Z, du résidentiel au commercial, en passant par l'industriel. Notre équipe d'architectes et d'ingénieurs qualifiés assure la conception et la réalisation de vos projets dans le respect des normes."
  },
  {
    id: "renovation",
    icon: Wrench,
    titre: "Rénovation",
    description: "Rénovation complète et modernisation de tous types de bâtiments",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f1a4eae?w=800&q=80",
    color: "from-orange-500 to-orange-600",
    features: [
      "Rénovation complète de bâtiments",
      "Modernisation d'infrastructures",
      "Restauration de façades",
      "Réhabilitation intérieure",
      "Mise aux normes électriques/sanitaires",
      "Extension et agrandissement",
      "Amélioration énergétique",
      "Valorisation du patrimoine"
    ],
    details: "Donnez une nouvelle vie à vos bâtiments avec nos services de rénovation complets. Nous intervenons sur tous types de structures pour moderniser, embellir et valoriser votre patrimoine immobilier."
  },
  {
    id: "gestion-immobiliere",
    icon: Home,
    titre: "Gestion Immobilière",
    description: "Solutions complètes pour l'achat, la vente et la gestion de vos biens",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    color: "from-blue-500 to-blue-600",
    features: [
      "Achat et vente de terrains et domaines",
      "Gestion locative professionnelle",
      "Viabilisation de domaines",
      "Estimation et expertise immobilière",
      "Recouvrement de loyers garanti",
      "Suivi administratif et juridique",
      "Conseil en investissement immobilier",
      "Gestion de copropriété"
    ],
    details: "Notre service de gestion immobilière vous accompagne dans tous vos projets : achat, vente, location, viabilisation de terrains. Nous gérons votre patrimoine immobilier de manière professionnelle et rentable."
  },
  {
    id: "etudes-expertise",
    icon: Ruler,
    titre: "Études & Expertise",
    description: "Conception, étude et expertise technique pour tous vos projets",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    color: "from-purple-500 to-purple-600",
    features: [
      "Études architecturales complètes",
      "Plans et avant-projets détaillés",
      "Études de faisabilité technique",
      "Expertise technique de bâtiments",
      "Conception d'infrastructures",
      "Études géotechniques",
      "Métrés et devis quantitatifs",
      "Suivi et contrôle qualité"
    ],
    details: "Nos ingénieurs et architectes réalisent toutes les études nécessaires à la réussite de vos projets : conception, planification, expertise technique. Nous assurons le suivi complet de vos réalisations."
  },
  {
    id: "evenementiel",
    icon: Sparkles,
    titre: "Événementiel & Décoration",
    description: "Créez des espaces uniques pour vos événements et embellissez vos intérieurs",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    color: "from-pink-500 to-pink-600",
    features: [
      "Décoration intérieure professionnelle",
      "Aménagement extérieur et paysager",
      "Design et conception d'espaces verts",
      "Location de matériel événementiel",
      "Organisation complète d'événements",
      "Décoration pour mariages et réceptions",
      "Aménagement de bureaux et commerces",
      "Conseil en décoration"
    ],
    details: "Transformez vos espaces et créez des ambiances uniques avec nos services de décoration et d'événementiel. Location de matériel, aménagement d'espaces verts, organisation complète d'événements."
  }
];

export default function Services() {
  const sectionRefs = useRef({});

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <MotionContainer className="text-center text-white">
            <motion.div variants={fadeUp} className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🏆 Expertise & Professionnalisme
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-6">
              Nos Services
            </motion.h1>
            <motion.p variants={fadeUp} className="text-2xl mb-4 text-gray-100 max-w-3xl mx-auto">
              Des Solutions Complètes pour Tous Vos Projets Immobiliers
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-gray-200 max-w-2xl mx-auto">
              Construction, Rénovation, Gestion Immobilière, Études et Événementiel
            </motion.p>
          </MotionContainer>
        </div>
      </section>

      {/* Grille des Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              5 Services Complets
            </h2>
            <p className="text-xl text-gray-600">
              Cliquez sur un service pour découvrir tous les détails
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={index === services.length - 1 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
              >
                <Card 
                  className="h-full cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => scrollToSection(service.id)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60 group-hover:opacity-50 transition-opacity`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <service.icon className="w-20 h-20 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2d7a4b] transition-colors">
                      {service.titre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-[#2d7a4b] font-medium text-sm">
                      Découvrir ce service
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Détaillées */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          ref={(el) => sectionRefs.current[service.id] = el}
          className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'md:order-2' : ''}
              >
                <div className={`inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r ${service.color} text-white rounded-full mb-6`}>
                  <service.icon className="w-5 h-5" />
                  <span className="font-semibold">Service Premium</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {service.titre}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {service.details}
                </p>

                <div className="bg-[#e8f5e9] rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#2d7a4b]" />
                    Ce que nous proposons :
                  </h3>
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-[#2d7a4b] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Link to={createPageUrl("Contact")}>
                  <Button size="lg" className="bg-[#2d7a4b] hover:bg-[#4a9d6f] group">
                    Demander un Devis Gratuit
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'md:order-1' : ''}
              >
                <Card className="overflow-hidden shadow-2xl">
                  <img 
                    src={service.image}
                    alt={service.titre}
                    className="w-full h-96 object-cover"
                  />
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Pourquoi BRIC GROUP */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-[#e8f5e9]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir BRIC GROUP ?
            </h2>
            <p className="text-xl text-gray-600">
              Des années d'expérience au service de votre satisfaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Expertise Professionnelle",
                description: "Architectes, ingénieurs et artisans qualifiés avec années d'expérience"
              },
              {
                title: "Qualité Garantie",
                description: "Matériaux premium et suivi rigoureux de tous nos projets"
              },
              {
                title: "Transparence Totale",
                description: "Devis détaillés et communication constante avec nos clients"
              },
              {
                title: "Respect des Délais",
                description: "Planification rigoureuse et engagement sur les dates de livraison"
              },
              {
                title: "Service Clé en Main",
                description: "De la conception à la livraison, nous gérons l'intégralité du projet"
              },
              {
                title: "Satisfaction Client",
                description: "Notre priorité absolue est de combler les attentes de nos clients"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-shadow bg-white">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
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
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-white text-[#2d7a4b] hover:bg-gray-100 text-lg px-8 py-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Contactez-Nous
                </Button>
              </Link>
              <Link to={createPageUrl("Projets")}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2d7a4b] text-lg px-8 py-6">
                  Voir Nos Réalisations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}