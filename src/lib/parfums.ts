import { categories, fragrances, fragranceId, type Categorie } from "./fragrances";
import { prixFragrance } from "./pricing";

export type Famille = "floral" | "boise" | "oriental" | "frais";
export type Genre = "Femme" | "Homme" | "Mixte";
export const genres: Record<Genre, string> = { Femme: "Femme", Homme: "Homme", Mixte: "Unisexe" };
export type Parfum = { id: string; nom: string; famille: Famille; categorie?: Categorie; genre: Genre; notes: string; prix: number | null; prixIndicatif?: boolean; description: string };
export const familles: Record<Famille, string> = { floral: "Floral", boise: "Boisé", oriental: "Oriental", frais: "Frais" };

const familleParCategorie: Record<Categorie, Famille> = {
  floral: "floral", fruite: "frais", hesperide: "frais", boise: "boise", ambre: "oriental", aquatique: "frais",
  frais: "frais", epice: "oriental", aromatique: "frais", vert: "frais", musque: "floral", cuir: "boise",
};
const nouveauxParfums: Parfum[] = (Object.entries(fragrances) as [Categorie, string[]][]).flatMap(([categorie, notes]) => notes.map((note) => ({
  id: fragranceId(note), nom: `Essence ${note}`, categorie, famille: familleParCategorie[categorie],
  genre: categorie === "floral" && !["Lavande", "Géranium"].includes(note) || categorie === "fruite" && ["Framboise", "Fraise", "Cerise", "Poire", "Pêche", "Litchi"].includes(note) ? "Femme" : ["cuir", "aromatique"].includes(categorie) || ["Cèdre", "Vétiver", "Cyprès", "Bouleau", "Poivre noir", "Lavande", "Géranium"].includes(note) ? "Homme" : "Mixte",
  notes: note, prix: prixFragrance(note, categorie), prixIndicatif: true,
  description: `Une création autour de ${note.toLocaleLowerCase("fr-FR")}, dans l'univers des parfums ${categories[categorie].toLocaleLowerCase("fr-FR")}.`,
})));

export const parfums: Parfum[] = [
  { id: "rose-dor", nom: "Rose d'Or", famille: "floral", genre: "Femme", notes: "Rose de Damas, pivoine, musc blanc", prix: 6500, description: "Un bouquet lumineux et romantique, d'une élégance intemporelle." },
  { id: "jasmin-nuit", nom: "Jasmin de Nuit", famille: "floral", genre: "Femme", notes: "Jasmin sambac, fleur d'oranger, vanille", prix: 7200, description: "Sensuel et envoûtant, pour les soirées inoubliables." },
  { id: "cedre-royal", nom: "Cèdre Royal", famille: "boise", genre: "Homme", notes: "Cèdre de l'Atlas, vétiver, cuir", prix: 7800, description: "La force tranquille d'un bois noble et profond." },
  { id: "santal-mystique", nom: "Santal Mystique", famille: "boise", genre: "Mixte", notes: "Santal, iris, ambre gris", prix: 8500, description: "Crémeux et chaleureux, une signature qui reste." },
  { id: "oud-sultan", nom: "Oud Sultan", famille: "oriental", genre: "Mixte", notes: "Oud, safran, rose noire", prix: 9900, description: "L'opulence de l'Orient dans un sillage majestueux." },
  { id: "ambre-desert", nom: "Ambre du Désert", famille: "oriental", genre: "Femme", notes: "Ambre, datte, encens", prix: 8200, description: "Chaud et doré comme un coucher de soleil sur le Sahara." },
  { id: "brise-marine", nom: "Brise Marine", famille: "frais", genre: "Homme", notes: "Bergamote, sel marin, menthe", prix: 5900, description: "Une fraîcheur vivifiante inspirée de la Méditerranée." },
  { id: "agrume-solaire", nom: "Agrume Solaire", famille: "frais", genre: "Mixte", notes: "Citron, néroli, thé blanc", prix: 5500, description: "Pétillant et léger, pour chaque jour ensoleillé." },
  ...nouveauxParfums,
];
export const formatPrix = (p: number | null) => p === null ? "Prix à confirmer" : `${p.toLocaleString("fr-FR")} DA`;

export function categorieParfum(p: Parfum): Categorie {
  return p.categorie ?? ({ floral: "floral", boise: "boise", oriental: "ambre", frais: "frais" } as const)[p.famille];
}
export function filtrerParfums(liste: Parfum[], genre: Genre | "all", categorie: Categorie | "all", recherche = "") {
  const normaliser = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, " ");
  const query = normaliser(recherche.trim());
  return liste.filter((p) => (genre === "all" || p.genre === genre) && (categorie === "all" || categorieParfum(p) === categorie) && normaliser(`${p.nom} ${p.notes}`).includes(query));
}
