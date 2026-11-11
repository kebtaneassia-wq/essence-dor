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
    <section className="collection-gallery mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14">
      <div className="collection-heading flex flex-wrap items-end justify-between gap-5 border-b border-border pb-8">
        <div><p className="eyebrow">Essence d'Or · La parfumerie</p><h1 className="mt-3 text-5xl md:text-7xl">La Collection</h1></div>
        <p className="max-w-60 font-display text-2xl italic text-muted-foreground">Des flacons précieux.<br />Des signatures singulières.</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pour qui">
          {genreOptions.map(([k, label]) => <Button key={k} variant="ghost" className={genre === k ? "border-b-2 border-primary rounded-none text-primary" : "rounded-none text-muted-foreground"} aria-pressed={genre === k} onClick={() => setGenre(k)}>{label}</Button>)}
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
          <Button variant="ghost" className={categorie === "all" ? "text-primary bg-accent" : "text-muted-foreground"} aria-pressed={categorie === "all"} onClick={() => setCategorie("all")}>Toutes</Button>
          {(Object.entries(categories) as [Categorie, string][]).map(([k, label]) => <Button key={k} variant="ghost" className={categorie === k ? "text-primary bg-accent" : "text-muted-foreground"} aria-pressed={categorie === k} onClick={() => setCategorie(k)}>{label}</Button>)}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} parfum{list.length > 1 ? "s" : ""}</p>
      {groupes.map((g, i) => <div key={g.genre} className="mt-12 md:mt-16">
        <div className="mb-6 flex items-baseline justify-between gap-4"><div className="flex items-baseline gap-4"><span className="font-display text-lg italic text-primary">0{i + 1}</span><h2 className="text-4xl md:text-5xl">{genres[g.genre]}</h2></div><span className="text-xs text-muted-foreground">{g.parfums.length} parfum{g.parfums.length > 1 ? "s" : ""}</span></div>
        <div className="perfume-shelves grid grid-cols-2 lg:grid-cols-4">{g.parfums.map((p) => <ParfumCard key={p.id} p={p} shelf />)}</div>
      </div>)}
      {!list.length && <div className="py-16 text-center"><h2 className="text-3xl">Aucun parfum trouvé</h2><Button variant="outline" className="mt-6" onClick={() => { setGenre("all"); setCategorie("all"); setRecherche(""); }}>Réinitialiser les filtres</Button></div>}
    </section>
  );
}
