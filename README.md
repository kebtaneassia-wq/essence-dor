# Essence d'Or

Standalone React, TanStack Start, and Vite storefront for Essence d'Or.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Local development

```sh
npm install
```

Windows:

```bat
copy .env.example .env.local
```

macOS/Linux:

```sh
cp .env.example .env.local
```

Set `AI_API_KEY` in `.env.local` if you want the Ambre AI adviser to answer, then start the app:

```sh
npm run dev
```

Open http://localhost:8080.

## AI adviser

The adviser uses a server-side OpenAI-compatible Chat Completions API. Configure it in `.env.local`:

```dotenv
AI_API_KEY=your-provider-api-key
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

- `AI_API_KEY` is required for AI replies.
- `AI_BASE_URL` defaults to the OpenAI API and can point to another compatible provider.
- `AI_MODEL` defaults to `gpt-4o-mini`; set the exact model name required by your provider.
- These variables are server-only. Never prefix them with `VITE_` or commit `.env.local`.

Without an API key, the collection, quiz, perfume customizer, product dialogs, theme switcher, WhatsApp order links, and saved conversations still work. The adviser returns a clear configuration error instead of calling a hosted Lovable gateway.

Conversation history is stored in the visitor's browser with `localStorage`; there is no hosted conversation database.

## Former Lovable services

No Lovable runtime service is required by this project.

| Former capability                        | Standalone replacement                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Lovable Vite/TanStack build wrapper      | Standard Vite, TanStack Start, React, Tailwind, and Nitro plugins in `vite.config.ts` |
| Lovable AI gateway and `LOVABLE_API_KEY` | Any OpenAI-compatible provider using `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL`      |
| Lovable editor error telemetry           | Standard browser/server console error reporting                                       |
| Lovable project metadata and attribution | Removed                                                                               |

The original project did not use a Lovable database, authentication connector, email service, webhook, or analytics integration, so none of those need replacement.

## Scripts

```sh
npm run dev       # Start the development server on port 8080
npm run test      # Run the Vitest suite
npm run lint      # Run ESLint
npm run build     # Build the Node server and client assets
```

## Production build

```sh
npm run build
node .output/server/index.mjs
```

The AI route requires a Node server runtime; a static-only host cannot execute `/api/chat`. Before exposing the adviser publicly, add authentication, rate limiting, and provider spend controls appropriate to your deployment.
