# Site SANSO Concept

Site vitrine de SANSO Concept — **en ligne sur https://www.sanso-concept.ch** (Infomaniak) depuis le 18.11.2026.

## Modifier le site

Circuit : demande à un agent IA → pull request → aperçu → corrections → fusion dans `main` → publication.

## Pour le développeur

- Instructions pour les agents IA : `AGENTS.md` (Codex et autres) et `CLAUDE.md` (Claude Code, renvoie à AGENTS.md).
- Garde-fous : `npm run verifier` (lancé sur chaque pull request). Les fichiers techniques ne passent qu'avec l'étiquette **technique** sur la pull request.
- Photos : boîte de dépôt `a-integrer/` + `npm run photos`.
- Protection de `main` : ruleset `protection-main` (pull request + contrôle `build` obligatoires, bypass administrateur).
- Travail en local : voir la section « Travailler en local » d'`AGENTS.md` (VS Code / Cursor, `npm run dev`).
- Qualité : `npm run check` (types, lancé en CI), `npm run format` (Prettier), Dependabot propose les mises à jour une fois par mois.
- Animations au défilement : attribut `data-anim` (voir `AGENTS.md`).

### Hébergement définitif : Infomaniak (en ligne)

- Chaque fusion dans `main` construit le site et l'envoie sur Infomaniak (FTPS, GitHub Actions « Construire et publier »). Comptez une à deux minutes.
- Vérifier une publication : GitHub → onglet **Actions** → le dernier « Construire et publier » doit être vert.
- Relancer une publication : Actions → « Construire et publier » → **Run workflow** sur `main`.
- Hébergement : Infomaniak, PHP 8.4, SSL Let's Encrypt.
- Ne jamais modifier les enregistrements MX du domaine (messagerie).

### Hébergement de test : Netlify

- Chaque pull request reçoit un lien d'aperçu ; `main` reste visible sur le site de test (non indexé).
- Le formulaire de contact ne fonctionne pas sur Netlify (pas de PHP).

### Secrets GitHub (environnement « production » — Settings → Environments → production)

Les secrets ne sont lisibles que par la publication depuis `main` : une pull request ne peut pas les lire.

| Nom              | Où                  | Valeur                                                                                           |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `FTP_SERVER`     | Secret (production) | serveur FTP Infomaniak (Manager → Hébergement → FTP/SSH)                                         |
| `FTP_USERNAME`   | Secret (production) | utilisateur FTP                                                                                  |
| `FTP_PASSWORD`   | Secret (production) | mot de passe FTP                                                                                 |
| `SMTP_USER`      | Secret (production) | adresse kSuite qui envoie les demandes                                                           |
| `SMTP_PASSWORD`  | Secret (production) | mot de passe d'appareil créé pour cette adresse (Mail Infomaniak), pas le mot de passe du compte |
| `CONTACT_TO`     | Secret (production) | adresse qui reçoit les demandes                                                                  |
| `FTP_SERVER_DIR` | Variable (du dépôt) | `./` (l'utilisateur FTP est limité au dossier du site)                                           |

Actions autorisées (Settings → Actions → General) : `actions/checkout`, `actions/setup-node`, `SamKirkland/FTP-Deploy-Action`. Un workflow qui en utilise une autre doit l'ajouter à cette liste.
