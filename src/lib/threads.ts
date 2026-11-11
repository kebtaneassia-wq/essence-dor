import type { UIMessage } from "ai";
export type Thread = { id: string; title: string; updatedAt: number; messages: UIMessage[] };
const KEY = "essence-dor-threads";
export function loadThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Thread[]; } catch { return []; }
}
export function saveThreads(t: Thread[]) { localStorage.setItem(KEY, JSON.stringify(t)); }
export function createThread(): Thread {
  const t: Thread = { id: crypto.randomUUID().slice(0, 8), title: "Nouvelle conversation", updatedAt: Date.now(), messages: [] };
  saveThreads([t, ...loadThreads()]);
  return t;
}
export function updateThread(id: string, messages: UIMessage[]) {
  const all = loadThreads();
  const firstText = messages.find((m) => m.role === "user")?.parts.find((p) => p.type === "text");
  const title = firstText && "text" in firstText ? firstText.text.slice(0, 40) : "Nouvelle conversation";
  const others = all.filter((t) => t.id !== id);
  saveThreads([{ id, title, updatedAt: Date.now(), messages }, ...others]);
}
export function deleteThread(id: string) { saveThreads(loadThreads().filter((t) => t.id !== id)); }
