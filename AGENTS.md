<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep perfume imagery and editorial profiles in a browser-safe presentation catalog separate from the core perfume catalog, so UI details do not enter the adviser server's imports.
- Use the shared perfume card and accessible dialog for enlarged perfume details, so home, collection and quiz results show the same information.
- Keep detailed scent categories separate from the four quiz families; centralize note classification and collection filtering in browser-safe catalog helpers so existing quiz scoring remains compatible.
- New catalog entries use note-specific indicative prices from the centralized pricing helper; label proposed prices clearly and preserve existing amounts.
- Store individual perfume photo mapping in the presentation layer only; each catalog item must map to a distinct photograph.
- Keep atelier note groups and order-message composition in a browser-safe helper; include every selected bottle and label option in WhatsApp order text without changing existing size prices.
- Derive illustrative liquid tints from the atelier note helper and keep name, dedication, cap and label settings independent, so previews and orders reflect separate choices.
- Derive adviser creation instructions from the same atelier options and carry creation intent in validated search parameters, so advice matches selectable notes without importing presentation assets.
- Resolve catalog names from assistant text in a browser-safe helper and render compact shared perfume cards outside message bubbles, so both live and saved recommendations open the same detail dialog.
