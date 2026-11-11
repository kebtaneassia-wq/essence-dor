import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { createThread, loadThreads } from "@/lib/threads";

export const Route = createFileRoute("/conseiller/")({
  validateSearch: (search: Record<string, unknown>): { mode?: "creation" | undefined } => ({ mode: search["mode"] === "creation" ? "creation" : undefined }),
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { title: "Conseillère parfum — Essence d'Or" },
    { name: "description", content: "Discutez avec notre conseillère intelligente pour trouver votre parfum idéal." },
    { property: "og:title", content: "Conseillère parfum — Essence d'Or" },
    { property: "og:description", content: "Un assistant pour trouver ou créer le parfum qui vous ressemble." },
  ] }),
  component: Redirect,
});

function Redirect() {
  const navigate = useNavigate();
  const { mode } = Route.useSearch();
  useEffect(() => {
    const t = (mode === "creation" ? createThread() : loadThreads()[0] ?? createThread());
    void navigate({ to: "/conseiller/$threadId", params: { threadId: t.id }, search: { mode }, replace: true });
  }, [navigate, mode]);
  return null;
}
