# Glossaire — jargon → français simple

> Source code : `lib/content/glossaire.ts` (alimente les tooltips `<TermeExplique k="…">`).
> Règle : le jargon brut ne reste jamais seul dans le texte courant. Soit on le remplace
> par le mot simple, soit on le garde avec un tooltip pédagogique (souligné pointillé).

| Clé | Terme affiché | Mot simple (remplacement) | Définition (1 ligne) |
|---|---|---|---|
| `ia` | IA | intelligence artificielle | Un programme capable de comprendre du texte et d'aider sur des tâches réelles. |
| `agent-ia` | agent IA | assistant numérique | Un assistant numérique qui travaille seul sur une tâche précise, selon vos règles. |
| `rag` | mémoire d'entreprise | mémoire d'entreprise | Vos documents deviennent interrogeables : la réponse cite vos propres fichiers. |
| `automatisation` | automatisation | tâches qui se font toutes seules | Relier vos outils pour que les tâches répétitives se fassent sans vous. |
| `workflow` | workflow | enchaînement de tâches | La suite d'étapes qu'une tâche traverse, du déclenchement au résultat. |
| `webhook` | webhook | signal automatique | Un signal qu'un outil envoie à un autre quand quelque chose se passe. |
| `api` | API | porte de connexion | La porte officielle par laquelle deux logiciels échangent des informations. |
| `crm` | CRM | fichier clients | Le logiciel qui centralise contacts, échanges et opportunités (ex. Axonaut). |
| `n8n` | n8n | outil d'automatisation | L'outil que j'utilise pour relier vos logiciels et construire les automatismes. |
| `dashboard` | tableau de bord | tableau de bord | Un écran qui montre d'un coup d'œil ce qui compte, mis à jour automatiquement. |
| `hebergement-souverain` | hébergement souverain | données hébergées en Europe | Vos données restent sur des serveurs européens, soumis au droit européen. |
| `rgpd` | RGPD | règles européennes sur les données | La loi qui protège les données personnelles — respectée dès la conception. |
| `llm` | modèle d'IA | modèle d'IA | Le « moteur » d'IA (Claude, Mistral…) qui lit et rédige du texte. |
| `site-connecte` | site connecté | site relié à vos outils | Un site relié à vos outils (agenda, devis, clients) qui travaille avec eux. |
| `seo` | référencement | référencement | Ce qui aide votre site à apparaître dans Google quand vos clients cherchent. |

## Mots bannis du texte visible (sans tooltip ni remplacement)
embeddings · pipeline (→ « chaîne » / « enchaînement ») · fine-tuning · tokens ·
inference · vectoriel · prompt (→ « consigne ») · machine learning (→ « IA »)

## Règles d'usage
1. Première occurrence d'un terme sur une page → `<TermeExplique k="…">`. Occurrences suivantes → mot simple.
2. Le volet « détails techniques » (`<details>`) est le SEUL endroit où le jargon peut s'écrire librement, chaque terme défini en une ligne.
3. Un même concept = un même mot partout (passe de cohérence en Phase 3).
