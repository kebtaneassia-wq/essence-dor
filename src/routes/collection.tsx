import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { familles, parfums, type Famille } from "@/lib/parfums";
import { ParfumCard } from "@/components/ParfumCard";

export const Route = createFileRoute("/collection")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { title: "Collection — Essence d'Or" },
    { name: "description", content: "Parfums floraux, boisés, orientaux et frais pour femme et homme." },
    { property: "og:title", content: "Collection — Essence d'Or" },
    { property: "og:description", content: "Explorez toutes les fragrances Essence d'Or." },
  ] }),
  component: Collection,
});

function Collection() {
  const [f, setF] = useState<Famille | "all">("all");
  const list = f === "all" ? parfums : parfums.filter((p) => p.famille === f);
  const opts: [Famille | "all", string][] = [["all", "Tous"], ...(Object.entries(familles) as [Famille, string][])];
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Toutes nos fragrances</p>
      <h1 className="mt-3 text-5xl">La Collection</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        {opts.map(([k, l]) => (
          <button key={k} onClick={() => setF(k)} className={f === k ? "btn-gold" : "btn-outline"}>{l}</button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => <ParfumCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
