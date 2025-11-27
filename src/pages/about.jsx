import React, { useState, useEffect } from "react";
import { Card } from "components/ui/card";
import { Target, Eye, Heart, Shield, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import MotionContainer, { fadeUp } from "components/ui/motion";
import TeamCard from "components/team-card";
import { useNavigate } from 'react-router-dom';

function Organigram() {
  const [hasImage, setHasImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const candidates = [
      "/images/organigramme.png",
      "/images/organigramme.PNG",
      "/images/organigramme.jpg",
      "/images/organigramme.jpeg",
      "/images/organigramme.webp",
    ];

    let cancelled = false;

    const tryLoad = (idx) => {
      if (cancelled || idx >= candidates.length) {
        setHasImage(false);
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (!cancelled) {
          setImageUrl(candidates[idx]);
          setHasImage(true);
        }
      };
      img.onerror = () => tryLoad(idx + 1);
      img.src = candidates[idx];
    };

    tryLoad(0);

    return () => { cancelled = true; };
  }, []);

  const roles = [
    { name: 'HOUENOU Mingnonkpon Gildas', title: 'Directeur Général' },
    { name: 'DJOHONNON Alain', title: "Directrice d'Exploitation et des Projets" },
    { name: 'ANAGONOU Olivier', title: 'Ingénieur des Travaux' },
    { name: 'VIATONOU Valentin', title: 'Conducteur des Travaux' },
  ];

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {hasImage === null && <div className="py-16">Chargement...</div>}
      {hasImage === true && imageUrl && (
        <img src={imageUrl} alt="Organigramme BRIC GROUP" className="w-full h-auto rounded-md shadow-md" />
      )}
      {hasImage === false && (
        <div className="p-8 bg-gray-50 text-left">
          <h3 className="text-xl font-semibold mb-3">Structure (version textuelle)</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {roles.map((r, i) => (
              <li key={i}><strong>{r.title}:</strong> {r.name}</li>
            ))}
          </ul>
          <div className="mt-4">
            <button className="px-4 py-2 bg-[#2d7a4b] text-white rounded-md" onClick={() => window.open('/about_bric.pdf', '_blank')}>Télécharger la brochure</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function APropos() {
  const navigate = useNavigate();
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
          <MotionContainer className="text-center max-w-3xl mx-auto">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de BRIC GROUP Africa
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-100">
              Votre partenaire de confiance pour tous vos projets immobiliers au Bénin et en Afrique
            </motion.p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact#contact-form')}
                className="px-5 py-3 bg-white text-[#2d7a4b] font-semibold rounded-md shadow"
              >
                Nous contacter
              </button>
            </div>
          </MotionContainer>
        </div>
      </section>
      
      

      {/* Qui sommes-nous */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src="/images/about/about.jpg"
                  alt="About"
                  className="rounded-2xl shadow-2xl cursor-pointer"
                  onClick={() => window.open('/about_bric.pdf', '_blank')}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Qui Sommes-Nous ?</h2>
                <p className="text-gray-700 mb-4">
                  <strong>BRIC GROUP</strong> est spécialisée dans la réalisation de travaux de Bâtiment et Travaux Publics, la rénovation, l'étude, le suivi et le contrôle des chantiers, ainsi que la décoration et l'événementiel. Nous offrons aussi des services de gestion immobilière et d'expertise.
                </p>
                <p className="text-gray-700 mb-4">
                  Notre équipe technique et professionnelle dispose d'une expérience avérée et d'une main-d'œuvre qualifiée pour répondre à vos besoins. La qualité et la satisfaction du client sont au cœur de notre activité.
                </p>
                <p className="text-gray-700">
                  Pour consulter notre brochure complète (liste de références, pièces administratives et attestations), téléchargez le PDF ci-contre.
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
                    Rédiger, concevoir, planifier et réaliser des projets de construction, rénovation et immobilier de toutes envergures. Nos équipes qualifiées assurent la pleine satisfaction des exigences de nos clients.
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

      {/* Réalisations (sélection) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Projets & Réalisations (sélection)</h2>
            <p className="text-gray-700 mb-6">Voici quelques réalisations extraites de notre brochure. Pour la liste complète, téléchargez la brochure.</p>
            <ul className="grid md:grid-cols-2 gap-4 list-disc list-inside text-gray-700">
              <li>Travaux d'étanchéité et peinture pour des bâtiments publics et privés (Cotonou, Porto-Novo)</li>
              <li>Réhabilitation et rénovation de villas et locaux commerciaux</li>
              <li>Travaux de menuiserie, pose de faux plafonds, revêtements de sols et carrelage</li>
              <li>Maintenance technique (plomberie, électricité) pour agences et structures</li>
            </ul>
            <div className="mt-6">
              <button className="px-4 py-2 bg-[#2d7a4b] text-white rounded-md" onClick={() => window.open('/about_bric.pdf','_blank')}>Télécharger la brochure</button>
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
            <p className="text-lg text-gray-700 mb-6">
              Notre équipe se compose d'architectes et d'ingénieurs pour l'élaboration des avant-projets, ainsi que de maçons, électriciens, plombiers, charpentiers et carreleurs qualifiés pour assurer la réalisation des projets.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Direction générale : <strong>HOUENOU Mingnonkpon Gildas</strong>
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <TeamCard
                name="HOUENOU Mingnonkpon Gildas"
                role="Directeur Général"
                bio="Président-Directeur Général, dirige les opérations et la stratégie globale."
              />
              <TeamCard
                name="DJOHONNON Alain"
                role="Directrice d'Exploitation et des Projets"
                bio="Supervise les opérations terrains et la coordination des projets."
              />
              <TeamCard
                name="ANAGONOU Olivier"
                role="Ingénieur des Travaux"
                bio="Responsable des études techniques et du suivi chantier."
              />
              <TeamCard
                name="VIATONOU Valentin"
                role="Conducteur des Travaux"
                bio="Chargé de la mise en œuvre sur site et du respect des plannings."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Organigramme */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Organigramme</h2>
            <p className="text-gray-700 mb-6">Voici notre organigramme. Si l'image n'est pas disponible, une version textuelle est affichée ci-dessous.</p>
            <Organigram />
          </div>
        </div>
      </section>
    </div>
  );
}