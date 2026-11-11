import { Link } from "@tanstack/react-router";
const links = [
  { to: "/", label: "Accueil" },
  { to: "/collection", label: "Collection" },
  { to: "/quiz", label: "Quiz olfactif" },
  { to: "/personnaliser", label: "Créer mon parfum" },
] as const;
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-display text-2xl text-gold">Essence d'Or</Link>
        <nav className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="hover:text-primary">{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
      <p className="font-display text-xl text-gold">Essence d'Or</p>
      <p className="mt-2">Instagram @Essence_D'or_Dz · TikTok · WhatsApp</p>
    </footer>
  );
}
