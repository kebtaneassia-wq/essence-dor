import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, MessageCircle } from "lucide-react";
const links = [
  { to: "/", label: "Accueil" },
  { to: "/collection", label: "Collection" },
  { to: "/quiz", label: "Quiz olfactif" },
  { to: "/personnaliser", label: "Créer mon parfum" },
  { to: "/conseiller", label: "Conseillère" },
] as const;
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-display text-2xl text-gold">Essence d'Or</Link>
        <nav className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }} activeProps={{ className: "text-primary" }} className="hover:text-primary">{l.label}</Link>
          ))}
          <ThemeToggle />
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

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => { setLight(localStorage.getItem("theme") === "light"); }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
  }, [light]);
  return (
    <button aria-label={light ? "Mode sombre" : "Mode clair"} className="hover:text-primary" onClick={() => { const n = !light; setLight(n); localStorage.setItem("theme", n ? "light" : "dark"); }}>
      {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
export function ChatBubble() {
  return (
    <Link to="/conseiller" aria-label="Parler à la conseillère" className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold transition hover:scale-105">
      <MessageCircle className="size-6" />
    </Link>
  );
}
