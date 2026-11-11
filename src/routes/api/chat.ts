import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "@/server/ai/responses";
import { parfums, familles, formatPrix } from "@/lib/parfums";
import { instructionsAtelier } from "@/lib/conseiller";

const catalogue = parfums
  .map((p) => `- ${p.nom} (${familles[p.famille]}, ${p.genre}) : ${p.notes}. ${p.description} Prix : ${formatPrix(p.prix)}`)
  .join("\n");

const instructions = `Tu es "Ambre", la conseillère parfum de la boutique Essence d'Or. Réponds toujours en français (ou dans la langue du client), avec élégance, chaleur et concision.
Ton rôle : aider le client à trouver le parfum qui lui convient. Pose 1 ou 2 questions à la fois (occasion, saison, notes aimées, intensité, pour qui, budget).
Recommande UNIQUEMENT des parfums du catalogue ci-dessous, en expliquant pourquoi ils correspondent. N'invente jamais de produit.
${instructionsAtelier}

Catalogue :
${catalogue}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env['LOVABLE_API_KEY'];
        if (!apiKey) return new Response("Configuration manquante", { status: 500 });
        const body = (await request.json()) as { messages?: UIMessage[]; mode?: string };
        if (!Array.isArray(body.messages)) return new Response("Requête invalide", { status: 400 });
        const call = createResponsesCall(
          request,
          { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          await convertToModelMessages(body.messages),
          instructions + (body.mode === "creation" ? "\nLe client vient de l'atelier et a choisi de créer son parfum. Demande ses envies pour proposer les trois notes adaptées, sans demander à nouveau s'il veut chercher dans la collection." : ""),
        );
        return call.response();
      },
    },
  },
});
