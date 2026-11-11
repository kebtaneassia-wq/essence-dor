import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrix } from "@/lib/parfums";
import { etapes, tailles, formes, couleurs, bouchons, couleurNote, encres, polices, messageCommande } from "@/lib/atelier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Send, Sparkles } from "lucide-react";
import rectangle from "@/assets/flacon-rectangle.jpg";
import rond from "@/assets/flacon-rond.jpg";
import ovale from "@/assets/flacon-ovale.jpg";
import facettes from "@/assets/flacon-facettes.jpg";

export const Route = createFileRoute("/personnaliser")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { title: "Créer mon parfum — Essence d'Or" },
    { name: "description", content: "Composez votre parfum et personnalisez sa bouteille, sa forme et son étiquette avec Essence d'Or." },
    { property: "og:title", content: "Créer mon parfum — Essence d'Or" },
    { property: "og:description", content: "Des notes à l'étiquette : une fragrance et un flacon à votre image." },
  ] }),
  component: Atelier,
});
const photos = { rectangle, rond, ovale, facettes };
const fonds = { ivoire: "bg-label-pearl", rose: "bg-label-rose", sauge: "bg-label-sage", noir: "bg-label-dark", lavande: "bg-label-lavender", bleu: "bg-label-blue" };
const textes = { charbon: "text-ink-charcoal", or: "text-ink-gold", clair: "text-ink-light" };
const swatches = { charbon: "bg-ink-charcoal", or: "bg-ink-gold", clair: "bg-ink-light" };

function Atelier() {
  const [choix, setChoix] = useState<Record<string, string>>({});
  const [taille, setTaille] = useState(tailles[1] ?? { ml: 50, prix: 6900 });
  const [nom, setNom] = useState("");
  const [forme, setForme] = useState<keyof typeof photos>("rectangle");
  const [couleur, setCouleur] = useState<keyof typeof fonds>("ivoire");
  const [encre, setEncre] = useState<keyof typeof textes>("charbon");
  const [police, setPolice] = useState("classique");
  const [bouchon, setBouchon] = useState<(typeof bouchons)[number]["id"]>("or");
  const [texte, setTexte] = useState("");
  const complet = etapes.every((e) => choix[e.key]);
  const msg = encodeURIComponent(messageCommande({ notes: choix, ml: taille.ml, prix: taille.prix, nom, forme: formes.find((f) => f.id === forme)?.nom ?? forme, etiquette: couleurs.find((c) => c.id === couleur)?.nom ?? couleur, encre: encres.find((c) => c.id === encre)?.nom ?? encre, police: polices.find((p) => p.id === police)?.nom ?? police, texte, bouchon: bouchons.find((b) => b.id === bouchon)?.nom ?? bouchon }));
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="eyebrow">L'atelier</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Créer mon parfum</h1>
      <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <div className="space-y-5 border-b border-border pb-8">
            <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-3xl">1. Votre composition</h2><Button asChild variant="outline"><Link to="/conseiller" search={{ mode: "creation" }}><Sparkles className="size-4" /> Choisir avec Ambre</Link></Button></div>
            {etapes.map((e) => <div key={e.key}>
              <label id={`label-${e.key}`} className="mb-2 block text-sm text-muted-foreground">{e.titre}</label>
              <Select value={choix[e.key] ?? ""} onValueChange={(v) => setChoix({ ...choix, [e.key]: v })}>
                <SelectTrigger aria-labelledby={`label-${e.key}`} className="h-12 w-full bg-card"><SelectValue placeholder="Choisir une note" /></SelectTrigger>
                <SelectContent>{e.opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>)}
          </div>
          <div className="border-b border-border pb-8">
            <h2 className="text-3xl">2. Votre flacon</h2>
            <p className="mb-3 mt-5 text-sm text-muted-foreground">Contenance</p>
            <div className="flex flex-wrap gap-3">{tailles.map((t) => <Button key={t.ml} variant={taille.ml === t.ml ? "default" : "outline"} aria-pressed={taille.ml === t.ml} onClick={() => setTaille(t)}>{t.ml} ml</Button>)}</div>
            <p className="mb-3 mt-6 text-sm text-muted-foreground">Forme de la bouteille</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{formes.map((f) => <Button key={f.id} variant="outline" aria-label={`Flacon ${f.nom}`} aria-pressed={forme === f.id} onClick={() => setForme(f.id)} className={`h-auto flex-col gap-0 overflow-hidden p-0 ${forme === f.id ? "border-primary ring-1 ring-primary" : ""}`}>
              <img src={photos[f.id]} alt="" width={768} height={768} loading="lazy" className="aspect-square w-full object-cover" />
              <span className="flex w-full items-center justify-center gap-1 py-3 text-xs">{f.nom}{forme === f.id && <Check className="size-3" />}</span>
            </Button>)}</div>
            <p className="mb-3 mt-6 text-sm text-muted-foreground">Couleur du bouchon</p>
            <div className="flex flex-wrap gap-3">{bouchons.map((b) => <Button key={b.id} size="icon" variant="outline" aria-label={`Bouchon ${b.nom}`} title={b.nom} aria-pressed={bouchon === b.id} onClick={() => setBouchon(b.id)} className={`cap-swatch cap-${b.id} ${bouchon === b.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}><span className="sr-only">{b.nom}</span></Button>)}</div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl">3. Votre étiquette</h2>
            <div><label htmlFor="nom-parfum" className="mb-2 block text-sm text-muted-foreground">Nom du parfum</label><Input id="nom-parfum" value={nom} maxLength={40} onChange={(e) => setNom(e.target.value)} placeholder="Mon Essence" /></div>
            <div><label htmlFor="texte-etiquette" className="mb-2 block text-sm text-muted-foreground">Texte de l'étiquette</label><Input id="texte-etiquette" value={texte} maxLength={40} onChange={(e) => setTexte(e.target.value)} placeholder="Une dédicace, un souvenir…" /></div>
            <div><p className="mb-3 text-sm text-muted-foreground">Couleur de l'étiquette</p><div className="flex flex-wrap gap-3">{couleurs.map((c) => <Button key={c.id} size="icon" variant="outline" aria-label={`Étiquette ${c.nom}`} title={c.nom} aria-pressed={couleur === c.id} onClick={() => { setCouleur(c.id); if (c.id === "noir" && encre === "charbon") setEncre("clair"); if (c.id !== "noir" && encre === "clair") setEncre("charbon"); }} className={`${fonds[c.id]} ${couleur === c.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}><span className="sr-only">{c.nom}</span></Button>)}</div></div>
            <div><p className="mb-3 text-sm text-muted-foreground">Couleur de l'écriture</p><div className="flex flex-wrap gap-3">{encres.map((c) => <Button key={c.id} size="icon" variant="outline" aria-label={`Écriture ${c.nom}`} title={c.nom} aria-pressed={encre === c.id} onClick={() => { setEncre(c.id); if (c.id === "clair") setCouleur("noir"); if (c.id === "charbon" && couleur === "noir") setCouleur("ivoire"); }} className={`${swatches[c.id]} ${encre === c.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}><span className="sr-only">{c.nom}</span></Button>)}</div></div>
            <div><p className="mb-3 text-sm text-muted-foreground">Style d'écriture</p><div className="flex flex-wrap gap-3">{polices.map((p) => <Button key={p.id} variant={police === p.id ? "default" : "outline"} aria-pressed={police === p.id} onClick={() => setPolice(p.id)} className={`label-${p.id}`}>{p.nom}</Button>)}</div></div>
          </div>
        </div>
        <aside className="lg:sticky lg:top-24">
          <div className="bottle-preview relative isolate aspect-square overflow-hidden" data-forme={forme} aria-label="Aperçu de votre flacon">
            <img src={photos[forme]} alt={`Votre flacon ${forme}`} width={768} height={768} className="h-full w-full object-cover" />
            <div className="bottle-liquid" aria-hidden="true">{etapes.map((e) => <div key={e.key} className={`liquid-${couleurNote(choix[e.key])}`} />)}</div>
            <div className={`bottle-cap cap-${bouchon}`} aria-hidden="true" />
            <div data-forme={forme} className={`bottle-label ${fonds[couleur]} ${textes[encre]} label-${police}`}><span className="bottle-name">{nom || "Mon Essence"}</span>{texte && <span className="bottle-dedication">{texte}</span>}</div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Teinte illustrative selon les notes choisies.</p>
          <p className="eyebrow mt-6">Votre création</p>
          <h3 className="mt-2 break-words text-3xl">{nom || "Mon Essence"}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{etapes.map((e) => <li key={e.key}>{e.titre} : <span className="text-foreground">{choix[e.key] ?? "—"}</span></li>)}<li>Flacon : <span className="text-foreground">{taille.ml} ml · {formes.find((f) => f.id === forme)?.nom}</span></li><li>Bouchon : <span className="text-foreground">{bouchons.find((b) => b.id === bouchon)?.nom}</span></li><li>Étiquette : <span className="text-foreground">{couleurs.find((c) => c.id === couleur)?.nom}</span></li>{texte && <li>Dédicace : <span className="text-foreground">{texte}</span></li>}</ul>
          <p className="mt-5 text-2xl text-primary">{formatPrix(taille.prix)}</p>
          {complet ? <Button asChild className="mt-5 h-auto w-full whitespace-normal py-3"><a href={`https://wa.me/?text=${msg}`} target="_blank" rel="noreferrer"><Send /> Commander via WhatsApp</a></Button> : <p className="mt-5 text-xs text-muted-foreground">Choisissez vos trois notes pour commander.</p>}
        </aside>
      </div>
    </section>
  );
}
