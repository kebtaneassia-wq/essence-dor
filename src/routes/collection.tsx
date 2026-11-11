import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { genres, parfums, filtrerParfums, type Genre } from "@/lib/parfums";
import { categories, type Categorie } from "@/lib/fragrances";
import { ParfumCard } from "@/components/ParfumCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export const Route = createFileRoute("/collection")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { title: "Collection — Essence d'Or" },
    { name: "description", content: "La collection Essence d'Or pour femme, homme et unisexe : fleurs, fruits, agrumes, bois, muscs et épices." },
    { property: "og:title", content: "Collection — Essence d'Or" },
    { property: "og:description", content: "Explorez toutes les fragrances Essence d'Or." },
  ] }),
  component: Collection,
});

function Collection() {
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [categorie, setCategorie] = useState<Categorie | "all">("all");
  const [recherche, setRecherche] = useState("");
  const list = filtrerParfums(parfums, genre, categorie, recherche);
  const genreOptions: [Genre | "all", string][] = [["all", "Tous"], ...Object.entries(genres) as [Genre, string][]];
  const groupes = (Object.keys(genres) as Genre[]).map((g) => ({ genre: g, parfums: list.filter((p) => p.genre === g) })).filter((g) => g.parfums.length);
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Toutes nos fragrances</p>
      <h1 className="mt-3 text-5xl">La Collection</h1>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pour qui">
          {genreOptions.map(([k, label]) => <Button key={k} variant={genre === k ? "default" : "outline"} aria-pressed={genre === k} onClick={() => setGenre(k)}>{label}</Button>)}
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input aria-label="Rechercher un parfum ou une note" placeholder="Parfum, fleur, fruit, note…" value={recherche} onChange={(e) => setRecherche(e.target.value)} className="pl-9 pr-10" />
          {recherche && <Button size="icon-sm" variant="ghost" aria-label="Effacer la recherche" onClick={() => setRecherche("")} className="absolute right-1 top-1"><X /></Button>}
        </div>
      </div>
      <div className="mt-6">
        <p className="mb-3 text-sm text-muted-foreground">Familles olfactives</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Familles olfactives">
          <Button variant={categorie === "all" ? "default" : "outline"} aria-pressed={categorie === "all"} onClick={() => setCategorie("all")}>Toutes</Button>
          {(Object.entries(categories) as [Categorie, string][]).map(([k, label]) => <Button key={k} variant={categorie === k ? "default" : "outline"} aria-pressed={categorie === k} onClick={() => setCategorie(k)}>{label}</Button>)}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} parfum{list.length > 1 ? "s" : ""}</p>
      {groupes.map((g) => <div key={g.genre} className="mt-10">
        <div className="mb-5 flex items-baseline gap-4 border-b border-border pb-3"><h2 className="text-3xl">{genres[g.genre]}</h2><span className="text-sm text-muted-foreground">{g.parfums.length} parfum{g.parfums.length > 1 ? "s" : ""}</span></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{g.parfums.map((p) => <ParfumCard key={p.id} p={p} />)}</div>
      </div>)}
      {!list.length && <div className="py-16 text-center"><h2 className="text-3xl">Aucun parfum trouvé</h2><Button variant="outline" className="mt-6" onClick={() => { setGenre("all"); setCategorie("all"); setRecherche(""); }}>Réinitialiser les filtres</Button></div>}
    </section>
  );
}
