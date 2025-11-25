import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MotionContainer, { fadeUp, HoverScale } from "../components/ui/motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Building2, 
  Home, 
  Wrench, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Award,
  Users,
  Briefcase,
  Star
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import StatsSection from "../components/domicile/statistique";
import ServicesOverview from "../components/domicile/service_vue_ensemble";
import PACHHighlight from "../components/domicile/pach_hightlight";
import TestimonialsSection from "../components/domicile/temoignage";
import ProjectsGallery from "../components/domicile/galerie_projet";

export default function Accueil() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background avec overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d7a4b]/90 to-[#4d9fb8]/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/plan_acceuil/plan1.jpg')"
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center text-white">
          <MotionContainer>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
              Construisons Ensemble<br />
              <span className="text-[#e8f5e9]">Votre Avenir</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Expert en construction, rénovation et gestion immobilière au Bénin et en Afrique
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programme_pach">
                <HoverScale>
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                    Découvrir le Programme PACH
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </HoverScale>
              </Link>
              <Link to="/contact">
                <HoverScale>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2d7a4b] text-lg px-8 py-6">
                    Nous Contacter
                  </Button>
                </HoverScale>
              </Link>
            </motion.div>
          </MotionContainer>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Overview */}
      <ServicesOverview />

      {/* PACH Highlight - Section Spéciale */}
      <PACHHighlight />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Projects Gallery Preview */}
      <ProjectsGallery preview={true} />
      <section className="py-20 bg-gradient-to-r from-[#2d7a4b] to-[#4a9d6f]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prêt à Concrétiser Votre Projet ?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Notre équipe d'experts est là pour vous accompagner à chaque étape
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Démarrer Mon Projet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}