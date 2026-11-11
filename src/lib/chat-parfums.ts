import { parfums } from "./parfums";

function normaliser(texte: string) {
  return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr-FR").replace(/[’‘']/g, "'").replace(/\s+/g, " ");
}

/** Resolve only complete catalog names, including transcripts saved before cards existed. */
export function parfumsDansMessage(texte: string) {
  const message = normaliser(texte);
  return parfums.flatMap((p) => {
    const nom = normaliser(p.nom);
    const escaped = nom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = new RegExp(`(?:^|[^a-z0-9])(${escaped})(?=$|[^a-z0-9])`).exec(message);
    return match ? [{ p, position: match.index, longueur: nom.length }] : [];
  }).filter((match, _, matches) => !matches.some((other) => other.position === match.position && other.longueur > match.longueur))
    .sort((a, b) => a.position - b.position).map(({ p }) => p);
}