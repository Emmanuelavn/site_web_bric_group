// Minimal stub of base44 client used by pages during development
// Replace by real API client when available.
export const base44 = {
  entities: {
    Projet: {
      list: async (sort) => {
        // return empty array by default; pages expect an array
        return [];
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
