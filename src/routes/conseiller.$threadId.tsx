import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useState } from "react";
import { Trash2, Plus, Sparkles, Search } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputBody, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { createThread, deleteThread, loadThreads, updateThread, type Thread } from "@/lib/threads";

import { Button } from "@/components/ui/button";
import { choixConseiller } from "@/lib/conseiller";
import { parfumsDansMessage } from "@/lib/chat-parfums";
import { ParfumCard } from "@/components/ParfumCard";

export const Route = createFileRoute("/conseiller/$threadId")({
  validateSearch: (search: Record<string, unknown>): { mode?: "creation" | undefined } => ({ mode: search["mode"] === "creation" ? "creation" : undefined }),
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { title: "Conversation — Conseillère Essence d'Or" },
    { name: "description", content: "Votre conversation avec la conseillère parfum Essence d'Or." },
    { property: "og:title", content: "Conversation — Conseillère Essence d'Or" },
    { property: "og:description", content: "Trouvez ou créez votre parfum idéal." },
  ] }),
  ssr: false,
  component: Page,
});

function Page() {
  const { threadId } = Route.useParams();
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [threads, setThreads] = useState<Thread[]>(() => loadThreads());
  const refresh = useCallback(() => setThreads(loadThreads()), []);
  const current = threads.find((t) => t.id === threadId);

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[240px_1fr]">
      <aside className="space-y-2">
        <Button className="w-full gap-2" onClick={() => { const t = createThread(); refresh(); void navigate({ to: "/conseiller/$threadId", params: { threadId: t.id } }); }}>
          <Plus className="size-4" /> Nouvelle
        </Button>
        {threads.map((t) => (
          <div key={t.id} className={`flex items-center gap-1 border px-3 py-2 text-sm ${t.id === threadId ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
            <Link to="/conseiller/$threadId" params={{ threadId: t.id }} className="flex-1 truncate">{t.title}</Link>
            <Button size="icon" variant="ghost" aria-label="Supprimer" onClick={() => { deleteThread(t.id); const rest = loadThreads(); setThreads(rest); if (t.id === threadId) { const next = rest[0] ?? createThread(); refresh(); void navigate({ to: "/conseiller/$threadId", params: { threadId: next.id } }); } }}>
              <Trash2 className="size-3.5 hover:text-destructive" />
            </Button>
          </div>
        ))}
      </aside>
      <ChatWindow key={threadId} threadId={threadId} initial={current?.messages ?? []} mode={mode} onSaved={refresh} />
    </section>
  );
}

function ChatWindow({ threadId, initial, onSaved, mode }: { threadId: string; initial: UIMessage[]; onSaved: () => void; mode?: "creation" | undefined }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, status, stop } = useChat({
    id: threadId,
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat", body: { threadId, mode } }),
    onError: (e) => setError(e.message.includes("402") ? "Crédits IA épuisés." : e.message.includes("429") ? "Trop de demandes, réessayez dans un instant." : "Une erreur est survenue, réessayez."),
  });
  useEffect(() => {
    if (status === "ready" && messages.length) { updateThread(threadId, messages); onSaved(); }
  }, [status, messages, threadId, onSaved]);
  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-[75vh] flex-col border border-border bg-card">
      <div className="border-b border-border px-5 py-3">
        <p className="font-display text-xl text-gold">Ambre · conseillère parfum</p>
      </div>
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 && (
            <ConversationEmptyState title="Bonjour, je suis Ambre ✦" description={mode === "creation" ? "Quel parfum aimeriez-vous créer ? Décrivez vos envies, une sensation ou un souvenir." : "Souhaitez-vous créer votre parfum ou que je vous aide à en trouver un ?"} />
          )}
          {messages.length === 0 && <div className="flex flex-wrap justify-center gap-3">{choixConseiller.filter((c) => mode !== "creation" || c.id === "creation").map((c) => <Button key={c.id} variant="outline" disabled={busy} onClick={() => { setError(null); void sendMessage({ text: c.message }); }}>{c.id === "creation" ? <Sparkles className="size-4" /> : <Search className="size-4" />}{c.label}</Button>)}</div>}
          {messages.map((m) => {
            const recommandations = m.role === "assistant" ? parfumsDansMessage(m.parts.filter((p) => p.type === "text").map((p) => p.text).join("\n")) : [];
            return (
            <Message key={m.id} from={m.role}>
              <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground">
                {m.parts.map((p, i) => p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null)}
              </MessageContent>
              {recommandations.length > 0 && <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Parfums proposés par Ambre">{recommandations.map((p) => <ParfumCard key={p.id} p={p} compact />)}</div>}
            </Message>
          ); })}
          {status === "submitted" && <Shimmer>Ambre réfléchit…</Shimmer>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="p-3">
        <PromptInput onSubmit={(msg) => { const text = msg.text?.trim(); if (!text || busy) return; setError(null); void sendMessage({ text }); setInput(""); }}>
          <PromptInputBody>
            <PromptInputTextarea autoFocus value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ex : je cherche un parfum boisé pour l'hiver…" />
          </PromptInputBody>
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!input.trim() && !busy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
