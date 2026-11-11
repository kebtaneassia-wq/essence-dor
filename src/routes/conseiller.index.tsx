import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { createThread, loadThreads } from "@/lib/threads";

export const Route = createFileRoute("/conseiller/")({
  head: () => ({ meta: [
    { title: "Conseillère parfum — Essence d'Or" },
    { name: "description", content: "Discutez avec notre conseillère intelligente pour trouver votre parfum idéal." },
    { property: "og:title", content: "Conseillère parfum — Essence d'Or" },
    { property: "og:description", content: "Un assistant pour trouver ou créer le parfum qui vous ressemble." },
  ] }),
  component: Redirect,
});

function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = loadThreads()[0] ?? createThread();
    void navigate({ to: "/conseiller/$threadId", params: { threadId: t.id }, replace: true });
  }, [navigate]);
  return null;
}
