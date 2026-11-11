export const categories = {
  floral: "Floraux", fruite: "Fruités", hesperide: "Agrumes", boise: "Boisés",
  ambre: "Ambrés & résineux", aquatique: "Aquatiques", frais: "Frais",
  epice: "Épicés", aromatique: "Aromatiques", vert: "Verts",
  musque: "Musqués & poudrés", cuir: "Cuirés & fumés",
} as const;
export type Categorie = keyof typeof categories;

export const fragrances: Record<Categorie, string[]> = {
  floral: ["Fleur d'oranger", "Lavande", "Violette", "Pivoine", "Tubéreuse", "Gardénia", "Magnolia", "Iris", "Ylang-ylang", "Muguet", "Freesia", "Fleur de cerisier", "Lotus", "Camélia", "Géranium", "Héliotrope"],
  fruite: ["Framboise", "Fraise", "Cerise", "Pomme", "Poire", "Pêche", "Abricot", "Prune", "Mangue", "Ananas", "Litchi", "Pastèque", "Melon", "Grenade", "Cassis", "Myrtille", "Mûre", "Figue", "Raisin", "Fruit de la passion", "Papaye", "Banane"],
  hesperide: ["Orange", "Mandarine", "Citron", "Pamplemousse", "Bergamote"],
  boise: ["Bois de santal", "Cèdre", "Oud", "Patchouli", "Vétiver", "Bois de gaïac", "Bois de cachemire", "Cyprès", "Bouleau", "Bois de rose"],
  ambre: ["Ambre", "Labdanum", "Benjoin", "Encens", "Myrrhe", "Safran", "Résine"],
  aquatique: ["Brise marine", "Eau de mer", "Notes ozoniques"],
  frais: ["Concombre", "Menthe", "Thé vert", "Thé blanc", "Aloe vera", "Bambou", "Eucalyptus", "Herbe fraîche"],
  epice: ["Poivre rose", "Poivre noir", "Cardamome", "Gingembre", "Girofle", "Noix de muscade", "Anis étoilé", "Coriandre"],
  aromatique: ["Romarin", "Basilic", "Sauge", "Thym", "Estragon"],
  vert: ["Feuilles de figuier", "Galbanum", "Feuilles de violette", "Petit-grain"],
  musque: ["Musc blanc", "Musc doux", "Musc propre", "Iris poudré", "Violette poudrée", "Coton propre", "Talc", "Accord peau propre"],
  cuir: ["Cuir", "Daim", "Tabac", "Bois fumé", "Encens fumé"],
};

export function fragranceId(note: string) {
  return `essence-${note.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
}