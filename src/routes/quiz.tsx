import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { parfums, type Famille } from "@/lib/parfums";
import { ParfumCard } from "@/components/ParfumCard";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [
    { title: "Quiz olfactif — Essence d'Or" },
    { name: "description", content: "Répondez à 5 questions et recevez des parfums recommandés selon vos goûts." },
    { property: "og:title", content: "Quiz olfactif — Essence d'Or" },
    { property: "og:description", content: "Trouvez le parfum qui vous correspond." },
  ] }),
  component: Quiz,
});

const questions: { q: string; r: [string, Famille][] }[] = [
  { q: "Quel moment de la journée vous ressemble ?", r: [["Le matin fleuri", "floral"], ["La balade en forêt", "boise"], ["La soirée chaleureuse", "oriental"], ["Le bord de mer", "frais"]] },
  { q: "Votre personnalité ?", r: [["Romantique", "floral"], ["Calme et sûr(e) de soi", "boise"], ["Mystérieuse et audacieuse", "oriental"], ["Dynamique et spontanée", "frais"]] },
  { q: "Un dessert ?", r: [["Macaron à la rose", "floral"], ["Tarte aux noix", "boise"], ["Baklava au miel", "oriental"], ["Sorbet citron", "frais"]] },
  { q: "Votre saison préférée ?", r: [["Printemps", "floral"], ["Automne", "boise"], ["Hiver", "oriental"], ["Été", "frais"]] },
  { q: "L'intensité recherchée ?", r: [["Délicate", "floral"], ["Élégante", "boise"], ["Intense", "oriental"], ["Légère", "frais"]] },
];

function Quiz() {
  const [answers, setAnswers] = useState<Famille[]>([]);
  const [genre, setGenre] = useState<string | null>(null);
  const step = answers.length;
  if (!genre) return (
    <Wrap><p className="eyebrow">Avant de commencer</p><h1 className="mt-3 text-4xl">Pour qui est ce parfum ?</h1>
      <div className="mt-8 flex flex-wrap gap-4">{["Femme", "Homme", "Peu importe"].map((g) => <button key={g} className="btn-outline" onClick={() => setGenre(g)}>{g}</button>)}</div></Wrap>
  );
  if (step < questions.length) {
    const q = questions[step];
    return (
      <Wrap>
        <p className="eyebrow">Question {step + 1} / {questions.length}</p>
        <div className="mt-3 h-px w-full bg-border"><div className="h-px bg-gold" style={{ width: `${(step / questions.length) * 100}%` }} /></div>
        <h1 className="mt-6 text-4xl">{q.q}</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {q.r.map(([label, fam]) => <button key={label} className="border border-border bg-card p-5 text-left hover:border-primary hover:text-primary" onClick={() => setAnswers([...answers, fam])}>{label}</button>)}
        </div>
      </Wrap>
    );
  }
  const scores = answers.reduce<Record<string, number>>((a, f) => ({ ...a, [f]: (a[f] ?? 0) + 1 }), {});
  const top = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Famille;
  const recos = parfums.filter((p) => p.famille === top && (genre === "Peu importe" || p.genre === genre || p.genre === "Mixte"));
  const list = recos.length ? recos : parfums.filter((p) => p.famille === top);
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Votre profil olfactif</p>
      <h1 className="mt-3 text-5xl">Vous êtes <span className="text-gold italic">{({ floral: "Floral", boise: "Boisé", oriental: "Oriental", frais: "Frais" })[top]}</span></h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ParfumCard key={p.id} p={p} />)}</div>
      <div className="mt-10 flex gap-4"><button className="btn-outline" onClick={() => { setAnswers([]); setGenre(null); }}>Recommencer</button><Link to="/personnaliser" className="btn-gold">Créer mon parfum</Link></div>
    </section>
  );
}
function Wrap({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto max-w-3xl px-6 py-20">{children}</section>;
}
