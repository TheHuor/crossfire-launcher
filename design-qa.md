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

Verified DE/EN routes, language and anchor retention, search and empty results, checklist persistence/reset, troubleshooting navigation, report copying, image zoom and focus return, mobile menu and Escape. All eight localized routes fit at 320 pixels; desktop, tablet and mobile views were inspected. Browser error log was empty in tested flows. Twelve automated tests cover content, routes, storage, search, support and generated links.

Static fallback content is verified in generated HTML; JavaScript-disabled browser operation and forced clipboard failure were not exercised.

**final result: passed**
