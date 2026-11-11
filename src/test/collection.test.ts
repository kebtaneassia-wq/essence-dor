import { describe, expect, it } from "vitest";
import { parfums, filtrerParfums, categorieParfum } from "@/lib/parfums";
import { parfumDetails } from "@/lib/parfum-details";

const requested = [
  "Fleur d'oranger", "Lavande", "Violette", "Pivoine", "Tubéreuse", "Gardénia", "Magnolia", "Iris", "Ylang-ylang", "Muguet", "Freesia", "Fleur de cerisier", "Lotus", "Camélia", "Géranium", "Héliotrope",
  "Framboise", "Fraise", "Cerise", "Pomme", "Poire", "Pêche", "Abricot", "Prune", "Mangue", "Ananas", "Litchi", "Pastèque", "Melon", "Grenade", "Cassis", "Myrtille", "Mûre", "Figue", "Raisin", "Fruit de la passion", "Papaye", "Banane",
  "Orange", "Mandarine", "Citron", "Pamplemousse", "Bergamote", "Bois de santal", "Cèdre", "Oud", "Patchouli", "Vétiver", "Bois de gaïac", "Bois de cachemire", "Cyprès", "Bouleau", "Bois de rose",
  "Ambre", "Labdanum", "Benjoin", "Encens", "Myrrhe", "Safran", "Résine", "Brise marine", "Eau de mer", "Concombre", "Menthe", "Thé vert", "Thé blanc", "Aloe vera", "Bambou", "Eucalyptus", "Herbe fraîche", "Notes ozoniques",
  "Poivre rose", "Poivre noir", "Cardamome", "Gingembre", "Girofle", "Noix de muscade", "Anis étoilé", "Coriandre", "Romarin", "Basilic", "Sauge", "Thym", "Estragon", "Feuilles de figuier", "Galbanum", "Feuilles de violette", "Petit-grain",
  "Musc blanc", "Musc doux", "Musc propre", "Iris poudré", "Violette poudrée", "Coton propre", "Talc", "Accord peau propre", "Cuir", "Daim", "Tabac", "Bois fumé", "Encens fumé",
];

describe("Collection étendue", () => {
  it.each(requested)("includes and classifies the requested fragrance %s with an enlarged profile", (note) => {
    const p = parfums.find((p) => p.notes === note);
    expect(p).toBeDefined();
    if (!p) throw new Error(`Missing ${note}`);
    expect(categorieParfum(p)).toBeTruthy();
    expect(parfumDetails[p.id]?.photo).toBeTruthy();
    expect(parfumDetails[p.id]?.personnalite).toBeTruthy();
  });
  it.each(["Femme", "Homme", "Mixte"] as const)("filters %s without mixing other groups", (genre) => {
    const result = filtrerParfums(parfums, genre, "all");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.genre === genre)).toBe(true);
  });
  it("combines gender, scent category and accent-insensitive note search", () => {
    expect(filtrerParfums(parfums, "Femme", "floral", "tubereuse").map((p) => p.notes)).toEqual(["Tubéreuse"]);
    expect(filtrerParfums(parfums, "Homme", "floral", "tubereuse")).toEqual([]);
    expect(filtrerParfums(parfums, "Mixte", "hesperide", "pamplemousse").map((p) => p.notes)).toEqual(["Pamplemousse"]);
  });
  it("assigns representative notes to their scent families", () => {
    const expected = { "Framboise": "fruite", "Orange": "hesperide", "Bois de santal": "boise", "Encens": "ambre", "Eau de mer": "aquatique", "Menthe": "frais", "Cardamome": "epice", "Romarin": "aromatique", "Galbanum": "vert", "Talc": "musque", "Daim": "cuir" };
    for (const [note, category] of Object.entries(expected)) {
      const p = parfums.find((p) => p.notes === note);
      if (!p) throw new Error(`Missing ${note}`);
      expect(categorieParfum(p)).toBe(category);
    }
  });
});