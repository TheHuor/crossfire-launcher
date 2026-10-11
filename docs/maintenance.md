# Content maintenance

## Translations and generation

Edit `content/de.json` and `content/en.json` together. Preserve matching article, section, feature, onboarding and troubleshooting IDs. Existing IDs form deep links; do not rename them without a compatibility plan. User-facing wording is localized; launcher button labels remain recognizable.

Run `npm run build` after content, template or page-route changes. Commit generated HTML with source changes. The tests validate localized parity, references, image metadata and links at root and repository prefix.

## Feature guides and search

`articles` contains headings, paragraphs and search keywords. `featurePages` adds workflows, related guides and screenshot placement. `sectionShots` maps article sections to IDs in `launcherShots`. Feature templates reuse the articles, so guide and feature explanations stay aligned. Search indexes articles; history entries are not separately indexed.

Account instructions must distinguish importing, saving and activating. Notes hold manually maintained character names; Display name is a local label. Ordering uses up/down arrows. Verify import requirements and error text against the current launcher source before changing the help.

## Screenshots

Store approved images under `assets/images/screenshots/`. Add matching DE/EN metadata in `launcherShots`, including filename, dimensions, caption and owner/source credit. Confirm versions rather than inferring them. Keep privacy edits clearly labeled. Never add original images exposing account IDs, installation keys, signatures or private backup paths. The Windows startup topic intentionally uses text instead of the supplied German-only screenshot.

## History

Update `history.entries` in both languages, newest version first, with matching versions, ISO dates and `relatedIds`. Summarize practical launcher/player changes, not raw developer logs. Avoid attributing game content to launcher updates or applying measured performance gains universally.

Verify the changelog and the actual release tag. Where the changelog lacks an entry, review the commits included in the tag and record the source in `docs/content/launcher-history-source.md`. Exclude later commits and internal-only changes. A tag date is not independently verified publication time. Update the expected newest version in `tests/history.test.mjs` when adding a release.

## Evidence

Record meaningful browser checks and limitations in `design-qa.md`. Earlier sections are historical; do not present their counts as the current suite. Never claim deployment or checks that were not confirmed.
