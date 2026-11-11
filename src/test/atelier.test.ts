import { describe, expect, it } from "vitest";
import { etapes, messageCommande, tailles } from "@/lib/atelier";
import { prixFragrance } from "@/lib/pricing";
import { parfums } from "@/lib/parfums";
import { parfumPhotos } from "@/lib/parfum-photos";
describe("Atelier et tarifs", () => {
  it("extends all three note groups with requested ingredients", () => {
    expect(etapes[0].opts).toContain("Pamplemousse");
    expect(etapes[1].opts).toContain("Tubéreuse");
    expect(etapes[2].opts).toContain("Bois de cachemire");
  });
  it("includes all bottle and label choices in the order", () => {
    const message = messageCommande({ notes: { tete: "Pamplemousse", coeur: "Tubéreuse", fond: "Oud" }, ml: 100, prix: 11500, nom: "Assia", forme: "Rond", etiquette: "Rose", encre: "Or", police: "Manuscrite", texte: "Pour Assia" });
    for (const value of ["Pamplemousse", "Tubéreuse", "Oud", "100 ml — Rond", "Étiquette : Rose", "Or, style Manuscrite", "Pour Assia", "11500 DA"]) expect(message).toContain(value);
  });
  it("preserves atelier size prices", () => { expect(tailles).toEqual([{ ml: 30, prix: 4500 }, { ml: 50, prix: 6900 }, { ml: 100, prix: 11500 }]); });
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