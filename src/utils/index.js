// Minimal utils helper used by pages
export function createPageUrl(name) {
  if (!name) return '/';
  const map = {
    Accueil: '/',
    Contact: '/contact',
    Projets: '/projets',
    ProgrammePACH: '/programmepach',
    Prestations: '/prestations',
    Services: '/services',
    Apropos: '/apropos',
    OffrePACH: '/offrepach',
    Offrepach: '/offrepach',
    InscriptionPACH: '/inscription-pach'
  };
  // try case-insensitive lookup
  const key = Object.keys(map).find(k => k.toLowerCase() === String(name).toLowerCase());
  return key ? map[key] : (map[name] || '/');
}

export default { createPageUrl };
