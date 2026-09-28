# Ports et processus : ce que Solutions 2IA tient sur le poste

> Décidé le **19/09/2026**. Ce Mac fait tourner plusieurs projets en même temps, dont
> **Building Partners / AgentAI** (`~/Desktop/buildingpartners-rag`) et **Studio Video &
> Clip Studio** (`~/Desktop/StudioVideo`). Carte complète du poste, tenue à jour :
> vault Obsidian, `10-Notes/poste-processus-et-ports.md`.

## Pourquoi on a quitté `:4000`

Jusqu'au 19/09, `pnpm dev` écoutait sur `:4000`. Le même jour, Studio Video a réservé
`:4000`–`:4299` pour son dashboard, ses Remotion Studio et ses rendus. Et nos commandes
Remotion, sans port fixé, prenaient **le premier port libre dès 3000** : la plage
d'AgentAI (vitrine `:3001`, démos `:3003`–`:3006`). Un rendu pouvait donc empêcher un
conteneur de démo de redémarrer.

## Nos ports : plage `:4500`–`:4549`

Solutions 2IA n'ouvre **aucun port en dehors de `4500`–`4549`**.

| Port | Processus | Lancé par | Où c'est fixé |
|---|---|---|---|
| `:4500` | `next dev -p 4500` | `pnpm dev` | `package.json` |
| `:4501` | `next start -p 4501` (prod locale, après `pnpm build`) | `pnpm start` | `package.json` |
| `:4510` | `next dev -p 4510` | à la main, seulement si `:4500` est pris par un autre | ligne de commande |
| `:4520` | Remotion Studio | `pnpm remotion:studio` | `remotion.config.ts` (`setStudioPort`) |
| `:4530` | serveur HTTP interne de `remotion render` | `pnpm remotion:render` | `remotion.config.ts` (`setRendererPort`) |
| `:4531`–`:4549` | libres | réserve du projet | |

Playwright (`playwright.config.ts`) vise `http://localhost:4500` et réutilise le serveur
de dev s'il tourne déjà.

Remotion **échoue net** si son port fixé est pris : c'est voulu. Mieux vaut une erreur
claire qu'un rendu qui s'installe sur le port d'un voisin.

> ⚠️ `pnpm start` a son propre port, mais **ne tourne jamais en même temps que
> `pnpm dev`** : il faut un `pnpm build` avant, et le build écrase le `.next` du serveur de
> dev. Arrêter `pnpm dev` d'abord.

## Nos processus sans port

| Processus | Lancé par |
|---|---|
| `next-server` (enfant de `next dev`) | `pnpm dev` |
| Chromium de Playwright | `pnpm exec playwright test` |
| Chrome headless de Remotion | `pnpm remotion:render` |

## Les voisins : à ne jamais arrêter

Résumé du relevé du 19/09/2026. Les PID changent à chaque relance, seuls les ports et
les commandes font foi.

| Plage | Projet |
|---|---|
| `:3000`–`:3100` · `:7880`–`:7890` (+ UDP `7882+`) · `:8000`–`:8012` · `:9000` · `:4040` (ngrok) | Building Partners / AgentAI |
| `:3200`–`:3202` · `:54321`–`:54332` | BuildingPartnersOS |
| `:4000`–`:4299` · `:8188` | Studio Video & Clip Studio |
| `:4173` · `:5173`–`:5194` · `:5533` · `:6479` · `:8010` | phone-message, FacturCopie (Vite) |
| `:5432` · `:6379` | PostgreSQL · Redis (Homebrew, **partagés**) |
| `:1234` · `:11434` | LM Studio · Ollama |

## Vérifier avant de lancer

```bash
# notre plage est-elle libre ?
lsof -nP -iTCP:4500-4549 -sTCP:LISTEN
# à qui appartient un PID : répertoire de travail, parent, commande
lsof -a -p <pid> -d cwd -Fn | grep ^n ; ps -o ppid=,command= -p <pid>
```

Si un port de notre plage est tenu par un processus qui n'est pas à nous, on **décale le
nôtre** (`pnpm exec next dev -p 4510`). On ne libère jamais un port en arrêtant le
processus d'un voisin : un port occupé ne dit pas à qui il appartient.

## Arrêter proprement ce qui est à nous

`Ctrl+C` dans le terminal qui a lancé la commande. Pour un processus orphelin, on le
cherche par **répertoire de travail**, jamais par nom (`next dev` tourne aussi chez
Studio Video) :

```bash
for p in $(pgrep -f 'next dev|next-server|remotion'); do
  printf '%s  ' "$p"; lsof -a -p "$p" -d cwd -Fn | grep ^n
done | grep SiteSolutions2iaV3Claude
```

Puis `kill -TERM <pid>`, et `SIGKILL` seulement si le processus, prouvé à nous, refuse.
