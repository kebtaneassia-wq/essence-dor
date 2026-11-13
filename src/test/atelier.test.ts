import { describe, expect, it } from "vitest";
import { etapes, messageCommande, tailles, couleurNote, bouchons, couleurs } from "@/lib/atelier";
import { prixFragrance } from "@/lib/pricing";
import { parfums } from "@/lib/parfums";
import { parfumPhotos } from "@/lib/parfum-photos";
describe("Atelier et tarifs", () => {
  it("extends all three note groups with requested ingredients", () => {
    expect(etapes[0].opts).toContain("Pamplemousse");
    expect(etapes[1].opts).toContain("Tubéreuse");
    expect(etapes[2].opts).toContain("Bois de cachemire");
  });
  it("sorts each note group alphabetically without duplicates", () => {
    for (const e of etapes) {
      expect([...e.opts].sort((a, b) => a.localeCompare(b, "fr"))).toEqual([...e.opts]);
      expect(new Set(e.opts).size).toBe(e.opts.length);
    }
  });
  it("includes the label shape in the order", () => {
    const message = messageCommande({ notes: {}, ml: 50, prix: 6900, nom: "Assia", forme: "Rond", etiquette: "Bordeaux", etiquetteForme: "Blason", encre: "Or", police: "Classique", texte: "" });
    expect(message).toContain("Étiquette : Bordeaux, forme Blason");
  });
  it("includes all bottle and label choices in the order", () => {
    const message = messageCommande({ notes: { tete: "Pamplemousse", coeur: "Tubéreuse", fond: "Oud" }, ml: 100, prix: 11500, nom: "Assia", forme: "Rond", etiquette: "Rose", encre: "Or", police: "Manuscrite", texte: "Pour Assia" });
    for (const value of ["Pamplemousse", "Tubéreuse", "Oud", "100 ml — Rond", "Étiquette : Rose", "Or, style Manuscrite", "Pour Assia", "11500 DA"]) expect(message).toContain(value);
  });
  it("preserves atelier size prices", () => { expect(tailles).toEqual([{ ml: 30, prix: 4500 }, { ml: 50, prix: 6900 }, { ml: 100, prix: 11500 }]); });
  it("keeps the perfume name separate from the additional label text", () => {
    const creation = { notes: {}, ml: 50, prix: 6900, nom: "Assia", forme: "Rond", etiquette: "Rose", encre: "Or", police: "Classique", texte: "Pour maman" };
    expect(messageCommande(creation)).toContain("parfum « Assia »");
    expect(messageCommande(creation)).toContain("Texte de l'étiquette : Pour maman");
    expect(messageCommande({ ...creation, texte: "" })).toContain("Texte de l'étiquette : Sans texte supplémentaire");
  });
  it("changes the illustrative tint for different chosen notes", () => {
    expect(couleurNote("Rose")).toBe("floral");
    expect(couleurNote("Citron")).toBe("agrume");
    expect(couleurNote("Menthe")).toBe("vert");
    expect(couleurNote("Eau de mer")).toBe("marin");
    expect(couleurNote("Oud")).toBe("ambre");
    expect(couleurNote()).toBe("neutre");
  });
  it("includes independent cap and label colors in the order", () => {
    expect(bouchons.map((b) => b.id)).toContain("argent");
    expect(couleurs.map((c) => c.id)).toContain("lavande");
    const message = messageCommande({ notes: {}, ml: 30, prix: 4500, nom: "Assia", forme: "Ovale", bouchon: "Argent", etiquette: "Lavande", encre: "Charbon", police: "Classique", texte: "" });
    expect(message).toContain("Bouchon : Argent");
    expect(message).toContain("Étiquette : Lavande");
  });
  it("gives every perfume a distinct photo", () => {
    expect(Object.keys(parfumPhotos)).toHaveLength(parfums.length);
    expect(new Set(Object.values(parfumPhotos)).size).toBe(parfums.length);
  });
  it("proposes fragrance-specific prices and preserves original prices", () => {
    expect(prixFragrance("Oud", "boise")).toBe(9900);
    expect(prixFragrance("Tubéreuse", "floral")).toBe(7900);
    expect(parfums.find((p) => p.id === "rose-dor")?.prix).toBe(6500);
    expect(parfums.filter((p) => p.id.startsWith("essence-")).every((p) => typeof p.prix === "number" && p.prix > 0 && p.prixIndicatif)).toBe(true);
  });
});