// Minimal stub of base44 client used by pages during development
// Replace by real API client when available.
export const base44 = {
  entities: {
    Projet: {
      list: async (sort) => {
        // Exemple de projets pour le développement local
        const exemples = [
          {
            id: 'p1',
            titre: 'Résidence Les Érables',
            description: 'Un ensemble résidentiel moderne de 24 logements avec espaces verts et parkings.',
            categorie: 'residentiel',
            localisation: 'Douala, Cameroun',
            superficie: '3 200 m²',
            duree: '12 mois',
            image_principale: 'https://images.unsplash.com/photo-1560184897-6a0f3b51b1c8?w=1200&q=80',
            statut: 'termine'
          },
          {
            id: 'p2',
            titre: 'Centre Commercial Oasis',
            description: 'Centre commercial moderne, boutiques et restaurants, facile accès et parking souterrain.',
            categorie: 'commercial',
            localisation: 'Yaoundé, Cameroun',
            superficie: '8 500 m²',
            duree: '18 mois',
            image_principale: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80',
            statut: 'termine'
          },
          {
            id: 'p3',
            titre: 'Pont du Lac',
            description: 'Projet d’infrastructure : pont à deux voies traversant le lac, incluant échangeurs.',
            categorie: 'infrastructure',
            localisation: 'Kribi, Cameroun',
            superficie: '--',
            duree: '24 mois',
            image_principale: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80',
            statut: 'en_cours'
          },
          {
            id: 'p4',
            titre: 'Rénovation Hôtel Ambassade',
            description: 'Rénovation intérieure complète pour remise à neuf des chambres et halls.',
            categorie: 'renovation',
            localisation: 'Douala, Cameroun',
            superficie: '1 100 m²',
            duree: '6 mois',
            image_principale: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
            statut: 'termine'
          },
          {
            id: 'p5',
            titre: 'Résidence Jardin Bleu',
            description: 'Lotissement résidentiel écologique avec jardins partagés et centrale solaire.',
            categorie: 'residentiel',
            localisation: 'Bafoussam, Cameroun',
            superficie: '5 000 m²',
            duree: '20 mois',
            image_principale: 'https://images.unsplash.com/photo-1505691723518-36a1fb3f9f6a?w=1200&q=80',
            statut: 'en_cours'
          },
          {
            id: 'p6',
            titre: 'Immeuble Siège Social',
            description: 'Immeuble de bureaux moderne avec rooftop et salles de réunion modulables.',
            categorie: 'commercial',
            localisation: 'Lomé, Togo',
            superficie: '4 200 m²',
            duree: '14 mois',
            image_principale: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80',
            statut: 'termine'
          }
        ];

        // Optionnel: trier si une clé de tri fournie
        // Ici on ignore la valeur `sort` et renvoie les exemples
        return new Promise((resolve) => setTimeout(() => resolve(exemples), 250));
      },
      get: async (id) => {
        return null;
      }
    },
    DemandeDevisPACH: {
      create: async (data) => {
        // In development stub, just resolve the submitted data with an id
        return { id: Date.now().toString(), ...data };
      }
    },
    // Add other entity stubs if needed
  }
};

export default base44;
