import { fragrances } from "./fragrances";

const trier = (notes: string[]) => [...new Set(notes)].sort((a, b) => a.localeCompare(b, "fr"));
export const etapes = [
  { key: "tete", titre: "Note de tête", opts: trier([...fragrances.hesperide, ...fragrances.fruite, ...fragrances.aquatique, ...fragrances.frais, ...fragrances.epice, ...fragrances.aromatique, ...fragrances.vert]) },
  { key: "coeur", titre: "Note de cœur", opts: trier(["Rose", "Jasmin", ...fragrances.floral, ...fragrances.fruite, ...fragrances.epice, ...fragrances.aromatique, ...fragrances.vert]) },
  { key: "fond", titre: "Note de fond", opts: trier(["Vanille", ...fragrances.boise, ...fragrances.ambre, ...fragrances.musque, ...fragrances.cuir]) },
] as const;
export const tailles = [{ ml: 30, prix: 4500 }, { ml: 50, prix: 6900 }, { ml: 100, prix: 11500 }];
export const formes = [{ id: "rectangle", nom: "Rectangle" }, { id: "rond", nom: "Rond" }, { id: "ovale", nom: "Ovale" }, { id: "facettes", nom: "À facettes" }] as const;
export const couleurs = [{ id: "ivoire", nom: "Perle" }, { id: "rose", nom: "Rose poudré" }, { id: "sauge", nom: "Sauge" }, { id: "lavande", nom: "Lavande" }, { id: "bleu", nom: "Bleu nuit" }, { id: "bordeaux", nom: "Bordeaux" }, { id: "emeraude", nom: "Émeraude" }, { id: "sable", nom: "Sable" }, { id: "terracotta", nom: "Terracotta" }, { id: "noir", nom: "Noir" }] as const;
export const formesEtiquette = [{ id: "rectangle", nom: "Rectangle" }, { id: "ovale", nom: "Ovale" }, { id: "rond", nom: "Rond" }, { id: "blason", nom: "Blason" }] as const;
export const bouchons = [{ id: "or", nom: "Or" }, { id: "champagne", nom: "Champagne" }, { id: "bronze", nom: "Bronze" }, { id: "cuivre", nom: "Cuivre" }, { id: "argent", nom: "Argent" }, { id: "nacre", nom: "Nacre" }, { id: "bordeaux", nom: "Bordeaux" }, { id: "emeraude", nom: "Émeraude" }, { id: "noir", nom: "Noir" }, { id: "rose", nom: "Rose" }, { id: "sauge", nom: "Sauge" }] as const;
export function couleurNote(note?: string) {
  if (!note) return "neutre";
  if (["Rose", "Jasmin", ...fragrances.floral].includes(note)) return "floral";
  if (fragrances.fruite.includes(note)) return "fruite";
  if (fragrances.hesperide.includes(note)) return "agrume";
  if (fragrances.aquatique.includes(note)) return "marin";
  if ([...fragrances.frais, ...fragrances.aromatique, ...fragrances.vert].includes(note)) return "vert";
  if (fragrances.musque.includes(note)) return "poudre";
  return "ambre";
}
export const encres = [{ id: "charbon", nom: "Charbon" }, { id: "or", nom: "Or" }, { id: "clair", nom: "Clair" }] as const;
export const polices = [{ id: "classique", nom: "Classique" }, { id: "moderne", nom: "Moderne" }, { id: "manuscrite", nom: "Manuscrite" }] as const;
export type Creation = { notes: Record<string, string>; ml: number; prix: number; nom: string; forme: string; etiquette: string; etiquetteForme?: string; encre: string; police: string; texte: string; bouchon?: string };
export function messageCommande(c: Creation) {
  return `Bonjour Essence d'Or, je souhaite commander mon parfum « ${c.nom || "Mon Essence"} » :\n${etapes.map((e) => `${e.titre} : ${c.notes[e.key] ?? "—"}`).join("\n")}\nFlacon : ${c.ml} ml — ${c.forme}\nBouchon : ${c.bouchon ?? "Or"}\nÉtiquette : ${c.etiquette}, forme ${c.etiquetteForme ?? "Rectangle"}\nÉcriture : ${c.encre}, style ${c.police}\nTexte de l'étiquette : ${c.texte || "Sans texte supplémentaire"}\nPrix : ${c.prix} DA.`;
}