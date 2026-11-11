export type Famille = "floral" | "boise" | "oriental" | "frais";
export type Parfum = { id: string; nom: string; famille: Famille; genre: "Femme" | "Homme" | "Mixte"; notes: string; prix: number; description: string };
export const familles: Record<Famille, string> = { floral: "Floral", boise: "Boisé", oriental: "Oriental", frais: "Frais" };
export const parfums: Parfum[] = [
  { id: "rose-dor", nom: "Rose d'Or", famille: "floral", genre: "Femme", notes: "Rose de Damas, pivoine, musc blanc", prix: 6500, description: "Un bouquet lumineux et romantique, d'une élégance intemporelle." },
  { id: "jasmin-nuit", nom: "Jasmin de Nuit", famille: "floral", genre: "Femme", notes: "Jasmin sambac, fleur d'oranger, vanille", prix: 7200, description: "Sensuel et envoûtant, pour les soirées inoubliables." },
  { id: "cedre-royal", nom: "Cèdre Royal", famille: "boise", genre: "Homme", notes: "Cèdre de l'Atlas, vétiver, cuir", prix: 7800, description: "La force tranquille d'un bois noble et profond." },
  { id: "santal-mystique", nom: "Santal Mystique", famille: "boise", genre: "Mixte", notes: "Santal, iris, ambre gris", prix: 8500, description: "Crémeux et chaleureux, une signature qui reste." },
  { id: "oud-sultan", nom: "Oud Sultan", famille: "oriental", genre: "Mixte", notes: "Oud, safran, rose noire", prix: 9900, description: "L'opulence de l'Orient dans un sillage majestueux." },
  { id: "ambre-desert", nom: "Ambre du Désert", famille: "oriental", genre: "Femme", notes: "Ambre, datte, encens", prix: 8200, description: "Chaud et doré comme un coucher de soleil sur le Sahara." },
  { id: "brise-marine", nom: "Brise Marine", famille: "frais", genre: "Homme", notes: "Bergamote, sel marin, menthe", prix: 5900, description: "Une fraîcheur vivifiante inspirée de la Méditerranée." },
  { id: "agrume-solaire", nom: "Agrume Solaire", famille: "frais", genre: "Mixte", notes: "Citron, néroli, thé blanc", prix: 5500, description: "Pétillant et léger, pour chaque jour ensoleillé." },
];
export const formatPrix = (p: number) => `${p.toLocaleString("fr-FR")} DA`;
