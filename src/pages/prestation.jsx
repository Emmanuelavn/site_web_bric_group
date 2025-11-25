import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "utils";
import { motion } from "framer-motion";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { 
  Droplets, 
  Paintbrush, 
  DoorOpen, 
  Home as HomeIcon,
  Layers,
  Thermometer,
  Zap,
  Wrench,
  ArrowRight,
  CheckCircle,
  Phone
} from "lucide-react";

const prestations = [
  {
    id: "etancheite",
    icon: Droplets,
    titre: "Étanchéité Bâtiment et Industriel",
    description: "Protection optimale contre les infiltrations d'eau pour tous types de structures",
    image: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800&q=80",
    color: "from-blue-500 to-blue-600",
    services: [
      "Étanchéité toiture terrasse",
      "Étanchéité façade",
      "Traitement anti-humidité",
      "Étanchéité industrielle",
      "Réparation et rénovation",
      "Garantie décennale"
    ]
  },
  {
    id: "peinture",
    icon: Paintbrush,
    titre: "Peinture Bâtiment et Industriel",
    description: "Finitions impeccables pour intérieurs et extérieurs résidentiels et industriels",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
    color: "from-purple-500 to-purple-600",
    services: [
      "Peinture intérieure et extérieure",
      "Peinture décorative",
      "Peinture industrielle",
      "Revêtements spéciaux",
      "Traitement anti-corrosion",
      "Finitions haut de gamme"
    ]
  },
  {
    id: "menuiseries",
    icon: DoorOpen,
    titre: "Menuiseries",
    description: "Fabrication et pose de menuiseries bois, aluminium et PVC sur mesure",
    image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800&q=80",
    color: "from-amber-500 to-amber-600",
    services: [
      "Portes et fenêtres",
      "Menuiserie bois",
      "Menuiserie aluminium",
      "Menuiserie PVC",
      "Agencement intérieur",
      "Mobilier sur mesure"
    ]
  },
  {
    id: "charpenterie",
    icon: HomeIcon,
    titre: "Charpenterie et Couverture",
    description: "Conception et réalisation de charpentes et toitures durables",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80",
    color: "from-orange-500 to-orange-600",
    services: [
      "Charpente traditionnelle",
      "Charpente industrielle",
      "Couverture tuiles",
      "Couverture bac acier",
      "Zinguerie",
      "Rénovation toiture"
    ]
  },
  {
    id: "faux-plafonds",
    icon: Layers,
    titre: "Faux Plafonds et Cloisonnements",
    description: "Aménagement intérieur moderne avec faux plafonds et cloisons",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    color: "from-teal-500 to-teal-600",
    services: [
      "Faux plafonds décoratifs",
      "Plafonds suspendus",
      "Cloisonnements bureau",
      "Cloisons placo",
      "Isolation acoustique",
      "Design moderne"
    ]
  },
  {
    id: "isolation",
    icon: Thermometer,
    titre: "Isolation Thermique et Phonique",
    description: "Solutions d'isolation pour confort thermique et acoustique optimal",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    color: "from-green-500 to-green-600",
    services: [
      "Isolation thermique",
      "Isolation phonique",
      "Isolation combles",
      "Isolation murs",
      "Matériaux écologiques",
      "Économie d'énergie"
    ]
  },
  {
    id: "electricite",
    icon: Zap,
    titre: "Électricité Courant Fort/Faible",
    description: "Installations électriques complètes conformes aux normes",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    color: "from-yellow-500 to-yellow-600",
    services: [
      "Installation électrique complète",
      "Courant fort (éclairage, prises)",
      "Courant faible (téléphone, internet)",
      "Domotique",
      "Tableaux électriques",
      "Mise aux normes"
    ]
  },
  {
    id: "plomberie",
    icon: Wrench,
    titre: "Plomberie-Sanitaire",
    description: "Installations sanitaires et plomberie de qualité professionnelle",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80",
    color: "from-cyan-500 to-cyan-600",
    services: [
      "Installation sanitaire complète",
      "Plomberie générale",
      "Système d'évacuation",
      "Robinetterie haut de gamme",
      "Chauffe-eau",
      "Dépannage et maintenance"
    ]
  }
];

export default function Prestations() {
  const sectionRefs = useRef({});
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // allow render to complete
      setTimeout(() => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location]);

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Excellence & Expertise
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nos Prestations
            </h1>
            <p className="text-2xl mb-4 text-gray-100 max-w-3xl mx-auto">
              Des Solutions Complètes pour Tous Vos Besoins
            </p>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              De l'étanchéité à la plomberie, BRIC GROUP maîtrise tous les corps de métier du bâtiment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grille des Prestations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              8 Expertises à Votre Service
            </h2>
            <p className="text-xl text-gray-600">
              Cliquez sur une prestation pour découvrir nos services en détail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prestations.map((prestation, index) => (
              <motion.div
                key={prestation.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card 
                  className="h-full cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => scrollToSection(prestation.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={prestation.image}
                      alt={prestation.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${prestation.color} opacity-60 group-hover:opacity-50 transition-opacity`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <prestation.icon className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2d7a4b] transition-colors">
                      {prestation.titre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {prestation.description}
                    </p>
                    <div className="flex items-center text-[#2d7a4b] font-medium text-sm">
                      En savoir plus
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
      {prestations.map((prestation, index) => (
        <section 
          id={prestation.id}
          key={prestation.id}
          ref={(el) => sectionRefs.current[prestation.id] = el}
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
                <div className={`inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r ${prestation.color} text-white rounded-full mb-6`}>
                  <prestation.icon className="w-5 h-5" />
                  <span className="font-semibold">Expertise Professionnelle</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {prestation.titre}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {prestation.description}
                </p>

                <div className="space-y-3 mb-8">
                  {prestation.services.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-[#2d7a4b] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{service}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to={createPageUrl("Contact")}>
                  <Button size="lg" className="bg-[#2d7a4b] hover:bg-[#4a9d6f] group">
                    Demander un Devis
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
                    src={prestation.image}
                    alt={prestation.titre}
                    className="w-full h-96 object-cover"
                  />
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2d7a4b] to-[#4a9d6f]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Un Projet en Tête ?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Notre équipe d'experts est prête à vous accompagner de A à Z
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
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