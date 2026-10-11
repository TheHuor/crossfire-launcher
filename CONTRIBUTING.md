# Contributing

This is the launcher help website. Changes to the Windows launcher belong in its separate repository.

1. Create a topic branch from current `master`.
2. Edit source files, not generated HTML. Keep DE/EN IDs and feature references aligned.
3. Follow [content maintenance](docs/maintenance.md), particularly the screenshot privacy rules.
4. Run `npm run build` and `npm test`.
5. Preview with the repository prefix and inspect affected pages in both languages, at desktop and mobile widths. Check anchors, language switching and browser errors for affected interactions.
6. Review `git diff --check` and the generated output, then commit sources and generated pages together.
7. Open a pull request explaining the user-visible change and actual validation. Merge into `master` only when approved.

No package installation is needed for the current build. Do not commit local runtime paths, account data, backups or unredacted screenshots.

See [deployment](docs/deployment.md) for publishing. A local preview, Git push and successful Pages deployment are distinct steps.
