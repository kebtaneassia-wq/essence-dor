import { familles, formatPrix, type Parfum } from "@/lib/parfums";
export function ParfumCard({ p }: { p: Parfum }) {
  return (
    <article className="group flex flex-col border border-border bg-card p-6 transition hover:shadow-gold">
      <div className="mb-5 flex h-40 items-center justify-center bg-accent">
        <div className="h-24 w-14 rounded-t-full bg-gold opacity-90 transition group-hover:scale-105" />
      </div>
      <p className="eyebrow">{familles[p.famille]} · {p.genre}</p>
      <h3 className="mt-2 text-2xl">{p.nom}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
      <p className="mt-3 text-xs italic text-accent-foreground">{p.notes}</p>
      <p className="mt-auto pt-4 text-lg text-primary">{formatPrix(p.prix)}</p>
    </article>
  );
}
