import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Building2, Wrench, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Construction & Rénovation",
    description: "Projets résidentiels, commerciaux et infrastructures de qualité",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Gestion Immobilière",
    description: "Achat, vente, location et viabilisation de domaines",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Wrench,
    title: "Études & Expertise",
    description: "Conception, planification et réalisation de projets",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Sparkles,
    title: "Événementiel",
    description: "Décoration intérieure, extérieure et aménagement d'espaces",
    color: "bg-orange-50 text-orange-600"
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions complètes pour tous vos besoins en construction et immobilier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-none group cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-[#2d7a4b] font-medium group-hover:gap-2 transition-all">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2d7a4b] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#4a9d6f] transition-colors"
            >
              Voir Tous Nos Services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}