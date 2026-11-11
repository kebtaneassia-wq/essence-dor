import { familles, formatPrix, type Parfum } from "@/lib/parfums";
import { parfumDetails } from "@/lib/parfum-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

export function ParfumCard({ p }: { p: Parfum }) {
  const details = parfumDetails[p.id];
  if (!details) return null;
  return (
    <Dialog>
      <article className="group relative flex flex-col overflow-hidden border border-border bg-card transition-shadow motion-safe:hover:shadow-gold">
        <div className="aspect-square overflow-hidden bg-accent">
          <img src={details.photo} alt={`Flacon de ${p.nom}`} width={768} height={768} loading="lazy" className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="eyebrow">{familles[p.famille]} · {p.genre}</p>
          <h3 className="mt-2 text-2xl">{p.nom}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
          <p className="mt-3 text-xs italic text-accent-foreground">{p.notes}</p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-5">
            <p className="text-lg text-primary">{formatPrix(p.prix)}</p>
            <DialogTrigger asChild>
              <Button variant="ghost" aria-label={`Découvrir ${p.nom}`} className="text-primary after:absolute after:inset-0 after:content-['']">Découvrir <ArrowUpRight /></Button>
            </DialogTrigger>
          </div>
        </div>
      </article>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto p-0">
        <div className="grid md:grid-cols-2">
          <div className="bg-accent md:sticky md:top-0 md:self-start">
            <img src={details.photo} alt={`Flacon de ${p.nom} en grand`} width={768} height={768} className="aspect-square w-full object-cover" />
          </div>
          <div className="space-y-6 p-6 md:p-8">
            <div>
              <p className="eyebrow pr-6">{familles[p.famille]} · {p.genre}</p>
              <DialogTitle className="mt-3 font-display text-4xl font-normal tracking-normal">{p.nom}</DialogTitle>
              <DialogDescription className="mt-3 leading-relaxed">{p.description}</DialogDescription>
              <p className="mt-4 text-2xl text-primary">{formatPrix(p.prix)}</p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-2xl">Son univers olfactif</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{details.univers}</p>
              <p className="mt-4 text-xs uppercase text-primary">Notes</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">{p.notes.split(", ").map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-2xl">Une personnalité, un parfum</h3>
              <p className="mt-2 text-sm font-medium text-primary">{details.traits}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{details.personnalite}</p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-2xl">L'instant idéal</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{details.occasion}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
