# Crossfire Command — Design QA

Source: docs/design/selected-design.png. Preview: http://127.0.0.1:4173/crossfire-launcher/de/.

## Evidence

Desktop and mobile screenshots and comparison sheets are saved in docs/design. Reference viewport: 1422 × 1106; actual capture: 1407 × 1094 (browser gutter cropped, no resizing). Additional checks: 1440, 768, 390 and 320 pixels.

## Resolved findings

- Mobile download now has a translated accessible name, covered by a regression test.
- Wrapped hero image uses responsive heights.
- Barlow semibold restores the selected headline proportions; Saira supports section headings.
- Desktop spacing brings all five installation steps into the reference viewport.
- At 320 pixels, header and quick links fit without horizontal overflow.

## Design and interaction checks

Dark charcoal, petrol and red hierarchy follows the selected concept. Local fonts, supplied space artwork and licensed Tabler icons are used. Genuine available images replace the illustrative launcher window; the approved five-step installation flow replaces the reference's four steps.

Verified DE/EN routes, language and anchor retention, search and empty results, checklist persistence/reset, troubleshooting navigation, report copying, image zoom and focus return, mobile menu and Escape. All eight localized routes fit at 320 pixels; desktop, tablet and mobile views were inspected. Browser error log was empty in tested flows. Thirteen automated tests cover content, routes, storage, search, support and generated links.

A temporary copy with module scripts omitted was verified at 320px: no horizontal overflow, visible navigation, hidden inactive progress controls. Direct #report links preserve their section when switching language. Forced clipboard failure was not exercised. Independent whole-branch review found no Critical issues; one Important and two Minor findings were fixed in a single follow-up pass. Unknown feature hashes now fall back to Updates.

**final result: passed**


## Feature pages and supplied screenshots

Eight dedicated feature pages per language and an overview reuse the existing site shell and guide content. Settings General/Graphics/Appearance, Logs, Account Manager/Backup, command-line help, Petrol style and three launcher dialogs are documented from owner-supplied images. Account IDs, signature and personal backup path are concealed in explicitly labeled privacy edits; original account images are not distributed. A dedicated offline-state capture remains pending.

Verified the 18 new overview/detail routes at 320px without horizontal overflow; Settings also inspected at 390 and desktop, Account Manager and update dialog at desktop. Search finds Command line and links to its detail route. Language switching retains feature and section. Image dialog closes with Escape and returns focus to its invoking control. Mobile menu opens and closes. Tested browser error logs were empty. Automated link checks cover all 26 localized pages, legacy routes, root and repository prefix. All 15 tests passed. Independent review identified shell-specific command syntax; explicit Command Prompt and PowerShell guidance resolves it. Displayed path escaping corrected.
