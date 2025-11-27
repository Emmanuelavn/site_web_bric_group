import React from 'react';
import { Link } from 'react-router-dom';
import MotionContainer, { fadeUp } from '../components/ui/motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Clock, UserPlus, Award } from 'lucide-react';
import PictureCard from '../components/ui/picture-card';
import ComingSoonModal from '../components/ui/coming-soon-modal';
import { useState } from 'react';

export default function Consulting() {
  const [comingOpen, setComingOpen] = useState(false);
  const programs = [
    {
      id: 'etancheite',
      title: "Étanchéité Professionnelle",
      subtitle: 'Techniques modernes pour toitures et terrasses',
      duration: '2 jours (atelier + pratique)',
      bullets: [
        'Matériaux et préparation de support',
        'Application multicouche et contrôle qualité',
        "Réparations et diagnostics sur ouvrages existants"
      ],
      image: '/images/plan_acceuil/plan2.jpg'
    },
    {
      id: 'peinture',
      title: 'Peinture & Finitions Pro',
      subtitle: 'Du choix de la peinture aux finitions durables',
      duration: '1 à 2 jours (selon module)',
      bullets: [
        'Préparation et ponçage',
        'Techniques de laque et finition satinée',
        'Protection et entretien long terme'
      ],
      image: '/images/plan_acceuil/plan3.jpg'
    },
    {
      id: 'immobilier',
      title: "Immobilier: Gestion & Investissement",
      subtitle: "Stratégies pour rentabiliser et gérer vos biens",
      duration: '1 jour (séminaire)',
      bullets: [
        'Évaluation et mise en marché',
        'Contrats & aspects juridiques locaux',
        'Financement et ROI (études de cas)'
      ],
      image: '/images/plan_acceuil/plan4.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 bg-gradient-to-br from-[#f7faf7] to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <MotionContainer className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#2d7a4b]">Consulting & Formations Professionnelles</h1>
            <p className="text-lg text-gray-600 mb-8">
              Formations pratiques et consulting pour les professionnels du bâtiment : étanchéité, peinture et gestion immobilière. Apprenez avec nos experts et repartez avec les compétences opérationnelles pour vos chantiers.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setComingOpen(true)} className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#2d7a4b] text-white hover:bg-[#255f3f]">Demander une formation</button>
              <button onClick={() => setComingOpen(true)} className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-200">Contactez un conseiller</button>
            </div>
          </MotionContainer>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <Card key={p.id} className="overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-44">
                  <PictureCard src={p.image} alt={p.title} buildSrc={(u,w)=>u} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{p.subtitle}</p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    {p.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#4a9d6f] mt-1" />{b}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Durée: <span className="font-semibold text-gray-700">{p.duration}</span></div>
                    <button onClick={() => setComingOpen(true)} className="inline-flex items-center gap-2 px-3 py-2 bg-[#2d7a4b] text-white rounded-md hover:bg-[#255f3f]">S'inscrire</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 bg-[#f3f8f6] rounded-xl p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-[#2d7a4b] mb-4">Pourquoi choisir BRIC GROUP ?</h2>
              <p className="text-gray-600 mb-6">Nos formations combinent théorie et pratique. Elles sont animées par des techniciens en activité et adaptées au contexte local.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-3 p-4">
                  <Award className="w-8 h-8 text-[#2d7a4b]" />
                  <div className="font-semibold">Certificat</div>
                  <div className="text-sm text-gray-600">Validation et attestation à la fin du module</div>
                </div>
                <div className="flex flex-col items-center gap-3 p-4">
                  <UserPlus className="w-8 h-8 text-[#2d7a4b]" />
                  <div className="font-semibold">Réseau</div>
                  <div className="text-sm text-gray-600">Accès au réseau de fournisseurs et partenaires</div>
                </div>
                <div className="flex flex-col items-center gap-3 p-4">
                  <Clock className="w-8 h-8 text-[#2d7a4b]" />
                  <div className="font-semibold">Suivi</div>
                  <div className="text-sm text-gray-600">Assistance post-formation pour les premières interventions</div>
                </div>
              </div>

              <div className="mt-8">
                <button onClick={() => setComingOpen(true)} className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#2d7a4b] text-white hover:bg-[#255f3f]">Réserver une session</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-3">Programme sur mesure</h3>
            <p className="text-gray-600 mb-4">Nous adaptons la durée et le contenu selon vos besoins — sessions inter-entreprises ou intra-entreprise disponibles.</p>
            <button onClick={() => setComingOpen(true)} className="bg-[#2d7a4b] hover:bg-[#4a9d6f] text-white px-4 py-2 rounded-md">Demander un devis formation</button>
          </div>
          <div>
            <Card className="overflow-hidden">
              <PictureCard src={'/images/plan_acceuil/plan5.jpg'} buildSrc={(u,w)=>u} alt="formation" />
            </Card>
          </div>
        </div>
      </section>
      <ComingSoonModal open={comingOpen} onOpenChange={setComingOpen} />
    </div>
  );
}
