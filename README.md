# Crossfire Game Launcher Website

Static English/German homepage and help site for the Crossfire Game Launcher. This repository contains the website, not the Windows launcher application. Node.js is used only for generation, tests and local preview; the published site needs no backend.

Project site: https://thehuor.github.io/crossfire-launcher/

## Develop locally

Requires Node.js 22 or newer. No dependency installation is needed.

```sh
npm run build
npm test
npm run preview -- --port 4173 --base /crossfire-launcher/
```

Open http://127.0.0.1:4173/crossfire-launcher/de/ or http://127.0.0.1:4173/crossfire-launcher/en/. Omit `--base` to serve at the web root. Preview binds to localhost; it is not a production server.

## Repository structure

| Path | Purpose |
| --- | --- |
| `content/de.json`, `content/en.json` | Translated articles, workflows, troubleshooting, screenshots and history |
| `scripts/build.mjs` | Generates the committed HTML pages |
| `scripts/templates.mjs` | Shared shell and core pages |
| `scripts/feature-templates.mjs`, `scripts/history-templates.mjs` | Feature guides and history layout |
| `scripts/preview.mjs` | Local preview server |
| `assets/css/`, `assets/js/` | Responsive styling and progressive enhancements |
| `assets/images/screenshots/` | Approved launcher screenshots, including privacy edits |
| `assets/fonts/`, `assets/icons/` | Local fonts and licensed icons |
| `de/`, `en/`, `index.html` | Generated output; do not edit directly |
| `guide/index.html` | Generated compatible English guide with legacy anchors |
| `guide/assets/` | Retained legacy assets |
| `tests/` | Node test suite |
| `docs/` | Maintenance, provenance and original design/implementation records |
| `design-qa.md` | QA evidence and historical verification notes |
| `.nojekyll` | Allows GitHub Pages to serve the static output directly |

## Pages and features

Each language has 14 pages: home, installation checklist (`start`), complete guide (`guide`), troubleshooting (`help`), feature overview (`features`), history (`history`) and eight feature details.

Feature topics: `updates`, `accounts`, `settings`, `offline`, `logs`, `crash-dumps`, `support-package`, `command-line`.

Account help covers ADF, FLIDs.ini and current-registry import, display names, character notes, manual ordering, activation, backup and error recovery. Windows startup help distinguishes SmartScreen, UAC and Smart App Control. The curated history currently contains 14 player-facing entries from 0.9.1 through 1.7.6; internal-only 1.1.0 is omitted.

The build produces 28 localized pages plus the language entry and legacy guide (30 HTML pages). Relative links support both the web root and the `/crossfire-launcher/` project prefix.

## Maintain and publish

- [Contributor workflow](CONTRIBUTING.md)
- [Content, screenshots and history](docs/maintenance.md)
- [GitHub Pages deployment](docs/deployment.md)
- [History editorial sources](docs/content/launcher-history-source.md)
- [QA record](design-qa.md)

Edit the source JSON/templates, run build and tests, and commit generated HTML with its sources. The website changes have been pushed to `master` and `feat/bilingual-homepage`. GitHub Pages publication was not independently confirmed; pushing a branch alone does not configure hosting.

## Privacy and content sources

Only language (`cf-site-language`) and checklist progress (`cf-site-onboarding-v1`) are saved in browser local storage. Search runs locally. Report text is not persisted or sent; there is no tracking, account login or automatic upload. Static guides remain readable without JavaScript.

Account IDs, signatures and the personal backup path are concealed in the distributed screenshots. Privacy edits are labeled as AI-edited. Never commit the original sensitive account screenshots or real identifiers.

Sources include the [official client download](https://swat-portal.com/forum/filebase/file/1098-crossfire-2-0-client-edition/), [installation FAQ](https://swat-portal.com/forum/wcf/faq/), [technical support forum](https://swat-portal.com/forum/board/4-technical-problems/), original guide, owner-supplied screenshots and verified launcher source. Original Freelancer is required; this website does not distribute it. The owner-confirmed installation flow uses the existing launcher to download the new launcher after installation; FLMM is not required for this flow.

Crossfire artwork is retained from the original project. Tabler icons are MIT-licensed (`assets/icons/LICENSE`). Local Barlow and Saira fonts include their license notices in `assets/fonts/`. Screenshot versions are stated only when confirmed.
