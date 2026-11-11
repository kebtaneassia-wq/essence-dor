import { describe, expect, it } from "vitest";
import { parfumsDansMessage } from "@/lib/chat-parfums";

describe("Parfums dans les conseils d'Ambre", () => {
  it("resolves catalog recommendations in conversation order without duplicates", () => {
    expect(parfumsDansMessage("Je conseille **Jasmin de Nuit**, puis Rose d’Or. Rose d'Or est romantique.").map((p) => p.id)).toEqual(["jasmin-nuit", "rose-dor"]);
  });
  it("recognizes accents and case in existing conversations", () => {
    expect(parfumsDansMessage("Essayez CEDRE ROYAL ou Essence Fleur d’oranger.").map((p) => p.id)).toEqual(["cedre-royal", "essence-fleur-d-oranger"]);
  });
  it("does not turn individual creation notes or unknown products into catalog recommendations", () => {
    expect(parfumsDansMessage("Créez une note de Rose, Citron et Oud, ou un parfum Imaginaire.")).toEqual([]);
  });
  it("matches whole names rather than name prefixes", () => {
    expect(parfumsDansMessage("Essence Iris poudré").map((p) => p.id)).toEqual(["essence-iris-poudre"]);
    expect(parfumsDansMessage("Essence Myrrheux")).toEqual([]);
  });
});