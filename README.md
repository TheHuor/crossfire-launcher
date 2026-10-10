# Crossfire Game Launcher Website

A bilingual English/German homepage and help site for the Crossfire Game Launcher. Static pages are published with GitHub Pages; no backend or runtime dependencies are required.

## Local development

Requires Node.js 22 or newer. No dependency installation is needed.

```sh
npm run build
npm test
npm run preview -- --port 4173 --base /crossfire-launcher/
```

Open `http://127.0.0.1:4173/crossfire-launcher/de/` or `/crossfire-launcher/en/`. Omit `--base` to preview at the web root. The server binds only to localhost and serves files inside this repository. It is a development server, not a public hosting service.

## Pages

- `/`: language entry; enhanced to respect saved/browser language.
- `/de/`, `/en/`: homepage, search and launcher features.
- `/de/start/`, `/en/start/`: installation checklist.
- `/de/guide/`, `/en/guide/`: complete user guide.
- `/de/help/`, `/en/help/`: guided troubleshooting and bug report template.
- `/de/features/`, `/en/features/`: feature overview with eight dedicated explanations.
- `/de/features/<topic>/`, `/en/features/<topic>/`: updates, accounts, settings, offline, logs, crash-dumps support-package and command-line.
- `/guide/`: compatible English guide, including the former `#h1` through `#h4` links.

All asset and internal links are relative, supporting repository-based GitHub Pages paths. The `.nojekyll` file is retained. Generated HTML pages are committed alongside the sources so GitHub Pages can serve this repository directly.

## Edit content

Edit `content/de.json` and `content/en.json`, keeping article, section, onboarding and troubleshooting IDs aligned. Run `npm run build` after any content or template change; do not edit generated HTML directly. `scripts/templates.mjs` contains the page structure, `assets/css/site.css` the responsive design, and `assets/js/` progressive enhancements.

Search uses article titles, summaries, keywords and section text in the active language. It normalizes accents and sharp s and recognizes the English UI keywords provided in each article. The troubleshooting graph uses IDs and does not infer diagnoses.

## Local-only preferences

Only language (`cf-site-language`) and completed installation step IDs (`cf-site-onboarding-v1`) are saved in browser local storage. If storage is blocked or corrupted, the site continues working. Report text is not persisted or sent by this website. Search runs locally. There is no analytics, account login, automatic local file access or upload.

All guides and external links remain readable without JavaScript. The checklist, search, feature switching, mobile menu, image dialog and troubleshooting assistant enhance those static pages. The no-JavaScript help view contains expandable topic summaries.

## Content sources

- [Official Crossfire 2.0.1 client](https://swat-portal.com/forum/filebase/file/1098-crossfire-2-0-client-edition/)
- [Official installation FAQ](https://swat-portal.com/forum/wcf/faq/)
- [Official technical support forum](https://swat-portal.com/forum/board/4-technical-problems/)
- Original launcher user guide in this repository.
- Project owner confirmed that the existing launcher downloads the new launcher after Crossfire installation.

Current installation does not require FLMM. Original Freelancer remains a prerequisite. This website does not distribute Freelancer itself.

The supplied Crossfire artwork is used in the hero. The main launcher view was captured from the installed launcher (file metadata version 1.7.3.0). Settings General/Graphics/Appearance and Logs screenshots were supplied by the project owner; their exact launcher version is not inferred. Account Manager identifiers and the personal backup folder are concealed in privacy-edited images, explicitly labeled as AI-edited. Command-line help, Petrol appearance and launcher dialogs are supplied by the owner. Dialog explanations follow visible labels and owner-confirmed Single Player behavior. The offline-state screenshot is supplied by the owner and documents Retry, available Single Player and disabled Multiplayer.

## Assets

Existing Crossfire artwork remains from the source project. Tabler outline icons are vendored from `tabler/tabler-icons` (MIT; license in `assets/icons/LICENSE`). Barlow and Saira Condensed are served locally; their SIL Open Font License notices are in `assets/fonts/`. Existing `guide/assets/` paths are preserved for compatibility.

## Validation and deployment

`npm test` covers translated content parity and references, generation/link integrity at root and repository prefix, legacy anchors, locale selection, search ranking and normalization, local storage failures, checklist updates, troubleshooting transitions, and report labels.

Browser QA checks Desktop, Tablet and Mobile with DE/EN, navigation, search empty/no-result states, feature selection, image-dialog focus, persisted progress, language/step preservation, troubleshooting back/reset and report copy. See `design-qa.md`.

Publishing is a separate step. Before publishing, run build and tests and configure GitHub Pages to serve the intended branch at the repository root. No remote push or publication has been performed as part of this local implementation.

## Feature content and screenshots

Feature detail pages reuse the corresponding article sections and add translated workflows in featurePages. launcherShots provides filenames, dimensions, translated captions and confirmed version or owner credit. sectionShots maps captures to the relevant section. Assets are stored in assets/images/screenshots/. Add verified captures to both content files and regenerate HTML. Search sends feature results directly to their detail page; installation results retain their guide anchor. Tests validate models, image headers, both languages and all 26 localized pages.
