import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-perfume.jpg";
import { parfums } from "@/lib/parfums";
import { ParfumCard } from "@/components/ParfumCard";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { title: "Essence d'Or — Parfumerie en ligne" },
    { name: "description", content: "Découvrez, personnalisez et achetez votre parfum idéal avec Essence d'Or." },
    { property: "og:title", content: "Essence d'Or — Parfumerie en ligne" },
    { property: "og:description", content: "Collections de parfums, quiz olfactif et création de fragrance personnalisée." },
  ] }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden">
        <img src={hero} alt="Flacon de parfum doré" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6">
          <div className="max-w-lg md:ml-auto">
            <p className="eyebrow">Parfumerie d'exception</p>
            <h1 className="mt-4 text-6xl leading-tight md:text-7xl">Trouvez <span className="text-gold italic">votre</span> essence</h1>
            <p className="mt-6 text-muted-foreground">Des fragrances raffinées, un quiz olfactif pour vous guider et un atelier pour créer le parfum qui vous ressemble.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/quiz" className="btn-gold">Faire le quiz</Link>
              <Link to="/collection" className="btn-outline">La collection</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow text-center">Nos best-sellers</p>
        <h2 className="mt-3 text-center text-4xl">Signatures dorées</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {parfums.slice(0, 4).map((p) => <ParfumCard key={p.id} p={p} />)}
        </div>
      </section>
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          <div><h2 className="text-3xl">Quiz olfactif</h2><p className="mt-3 text-muted-foreground">5 questions pour découvrir les fragrances faites pour vous.</p><Link to="/quiz" className="btn-outline mt-6">Commencer</Link></div>
          <div><h2 className="text-3xl">Créer mon parfum</h2><p className="mt-3 text-muted-foreground">Choisissez vos notes de tête, de cœur et de fond.</p><Link to="/personnaliser" className="btn-outline mt-6">Composer</Link></div>
        </div>
      </section>
    </>
  );
}
