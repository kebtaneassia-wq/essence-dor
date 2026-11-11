import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrix } from "@/lib/parfums";

export const Route = createFileRoute("/personnaliser")({
  head: () => ({ meta: [
    { title: "Créer mon parfum — Essence d'Or" },
    { name: "description", content: "Composez votre fragrance personnalisée : notes de tête, de cœur, de fond et flacon." },
    { property: "og:title", content: "Créer mon parfum — Essence d'Or" },
    { property: "og:description", content: "L'atelier de parfum personnalisé Essence d'Or." },
  ] }),
  component: Atelier,
});

const etapes = [
  { key: "tete", titre: "Note de tête", opts: ["Bergamote", "Citron", "Poivre rose", "Menthe"] },
  { key: "coeur", titre: "Note de cœur", opts: ["Rose", "Jasmin", "Iris", "Fleur d'oranger"] },
  { key: "fond", titre: "Note de fond", opts: ["Oud", "Vanille", "Santal", "Musc blanc"] },
] as const;
const tailles = [{ ml: 30, prix: 4500 }, { ml: 50, prix: 6900 }, { ml: 100, prix: 11500 }];

function Atelier() {
  const [choix, setChoix] = useState<Record<string, string>>({});
  const [taille, setTaille] = useState(tailles[1]);
  const [nom, setNom] = useState("");
  const complet = etapes.every((e) => choix[e.key]);
  const msg = encodeURIComponent(`Bonjour Essence d'Or, je souhaite commander mon parfum "${nom || "Mon Essence"}" : ${etapes.map((e) => choix[e.key]).join(", ")} — ${taille.ml} ml.`);
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_320px]">
      <div>
        <p className="eyebrow">L'atelier</p>
        <h1 className="mt-3 text-5xl">Créer mon parfum</h1>
        {etapes.map((e, i) => (
          <div key={e.key} className="mt-10">
            <h2 className="text-2xl">{i + 1}. {e.titre}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {e.opts.map((o) => <button key={o} onClick={() => setChoix({ ...choix, [e.key]: o })} className={choix[e.key] === o ? "btn-gold" : "btn-outline"}>{o}</button>)}
            </div>
          </div>
        ))}
        <div className="mt-10"><h2 className="text-2xl">4. Flacon</h2>
          <div className="mt-4 flex flex-wrap gap-3">{tailles.map((t) => <button key={t.ml} onClick={() => setTaille(t)} className={taille.ml === t.ml ? "btn-gold" : "btn-outline"}>{t.ml} ml</button>)}</div>
        </div>
        <div className="mt-10"><h2 className="text-2xl">5. Nom de votre parfum</h2>
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Mon Essence" className="mt-4 w-full max-w-sm border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
        </div>
      </div>
      <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-24">
        <p className="eyebrow">Votre création</p>
        <h3 className="mt-2 text-3xl text-gold">{nom || "Mon Essence"}</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {etapes.map((e) => <li key={e.key}>{e.titre} : <span className="text-foreground">{choix[e.key] ?? "—"}</span></li>)}
          <li>Flacon : <span className="text-foreground">{taille.ml} ml</span></li>
        </ul>
        <p className="mt-6 text-2xl text-primary">{formatPrix(taille.prix)}</p>
        {complet ? <a href={`https://wa.me/?text=${msg}`} target="_blank" rel="noreferrer" className="btn-gold mt-6 w-full">Commander via WhatsApp</a>
          : <p className="mt-6 text-xs text-muted-foreground">Choisissez vos trois notes pour commander.</p>}
      </aside>
    </section>
  );
}
