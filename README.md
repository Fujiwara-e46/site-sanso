# Site SANSO Concept

Site vitrine de SANSO Concept — **en ligne sur https://www.sanso-concept.ch** (Infomaniak) depuis le 18.11.2026.

- Site de test : https://sanso-concept-test.netlify.app
- **Nicolas : le guide d'utilisation est ici → [GUIDE.md](GUIDE.md)**

## Modifier le site

Voir **[GUIDE.md](GUIDE.md)** (circuit : demander → aperçu → corriger → publier, avec ChatGPT, Claude ou un autre agent).

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
- Hébergement : organisation Infomaniak Sanso concept Sàrl, site `/sites/sanso-concept.ch`, PHP 8.4, SSL Let's Encrypt.
- Domaine et messagerie (kSuite) : organisation Infomaniak S2 Concept Sàrl. Ne jamais modifier les enregistrements MX.

### Hébergement de test : Netlify

- Chaque pull request reçoit un lien d'aperçu ; `main` reste visible sur le site de test (non indexé).
- Le formulaire de contact ne fonctionne pas sur Netlify (pas de PHP).

### Secrets GitHub (en place — Settings → Secrets and variables → Actions)

| Nom               | Type                 | Valeur                                                                                                    |
| ----------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| `FTP_SERVER`      | Secret               | serveur FTP Infomaniak (Manager → Hébergement → FTP/SSH)                                                  |
| `FTP_USERNAME`    | Secret               | utilisateur FTP                                                                                           |
| `FTP_PASSWORD`    | Secret               | mot de passe FTP                                                                                          |
| `SMTP_USER`       | Secret               | adresse kSuite qui envoie les demandes (ex. `site@sanso-concept.ch` ou `info@…`)                          |
| `SMTP_PASSWORD`   | Secret               | mot de passe d'appareil créé pour cette adresse (Mail Infomaniak), pas le mot de passe du compte          |
| `CONTACT_TO`      | Secret               | adresse qui reçoit les demandes (ex. `info@sanso-concept.ch`)                                             |
| `FTP_SERVER_DIR`  | Variable             | `./` (l'utilisateur FTP est limité au dossier du site)                                                    |
| `FTP_PREVIEW_DIR` | Variable (optionnel) | dossier du sous-domaine de test (ex. `/sites/test.sanso-concept.ch/`) — active l'aperçu des pull requests |

### Reste à faire

- [ ] Renseigner le numéro IDE dans `src/data/entreprise.json`
- [ ] Faire valider `confidentialite.astro` par SANSO Concept
- [ ] Vérifier la licence d'utilisation web des polices Aptos / Cascadia (sinon remplacer par une police libre)
- [x] Remplacer les projets d'exemple
- [x] Protéger la branche `main` (ruleset `protection-main`)
