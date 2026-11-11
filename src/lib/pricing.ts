import type { Categorie } from "./fragrances";

const bases: Record<Categorie, number> = { floral: 6200, fruite: 5200, hesperide: 5000, boise: 7200, ambre: 7600, aquatique: 5500, frais: 5000, epice: 6400, aromatique: 5400, vert: 5800, musque: 6100, cuir: 7400 };
const tarifs: Record<string, number> = { "Oud": 9900, "Bois de santal": 8500, "Iris": 8200, "Iris poudré": 8500, "Tubéreuse": 7900, "Gardénia": 7400, "Fleur d'oranger": 6900, "Safran": 8800, "Myrrhe": 8200, "Ambre": 8200, "Bois de cachemire": 8100, "Cuir": 7900, "Daim": 7600, "Encens fumé": 8300 };
export function prixFragrance(note: string, categorie: Categorie) {
  return tarifs[note] ?? bases[categorie] + (Array.from(note).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 6) * 100;
}