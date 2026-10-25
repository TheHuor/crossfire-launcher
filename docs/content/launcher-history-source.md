# Launcher history editorial source

Source: local D:/Dev/Projects/CrossfireLauncher/CHANGELOG.md, reviewed 2026-10-11. Remote: TheHuor/CrossfireGameLauncher. Public GitHub access returned 404; publication status is not independently verified. Website dates are attributed to the changelog, not claimed as verified GitHub publication timestamps.

Included player-relevant entries: 1.7.7, 1.7.6, 1.7.5, 1.7.4, 1.7.3, 1.7.2, 1.7.1, 1.7.0, 1.6.0, 1.5.0, 1.4.0, 1.3.0, 1.2.0, 1.0.0, 0.9.1.

Version 1.1.0 (2026-07-09) is omitted because its notes describe internal architecture, testing and build tooling, with no separate player-facing change. Unreleased and Release Template are excluded. No local uncommitted code changes are treated as released features. No new Crossfire missions, ships, tournaments or game modes are inferred from launcher updates. Performance gains are qualified to avoid applying HDD measurements to every system.

## Version 1.7.4
Tag v1.7.4, dated 2026-10-11, points to 6d9cf18033a15d4fd2b9a267ecb7d4a4ebbc1b99. CHANGELOG.md at this tag has no 1.7.4 heading. Player notes were verified against commits 0a190e9 (native graphics library search isolation) and bf7bfdd (active-window title animation). Internal test and documentation changes omitted. Commit 3fe3763 is after the tag and excluded. Date is the annotated tag date; remote release publication not independently verified.

## Version 1.7.5
Annotated tag v1.7.5 dated 2026-10-11. Player-facing changes verified against 3fe3763, included in the tag: preserve last known installation key when saving accounts; restore missing/empty registry key during account registry refresh without replacing an existing key; log presence only. CHANGELOG has no 1.7.5 section. No promise of recovering a key without a saved value.

## Version 1.7.6
Changelog and annotated tag v1.7.6 dated 2026-10-12. Verified player-facing registry-view fix against commit 2e1d3b5. Internal test-runner dependency update omitted. The current changelog also documents 1.7.4 and 1.7.5; earlier notes above record the evidence available when those entries were first written.

## Version 1.7.7
Changelog and annotated tag v1.7.7 dated 2026-10-25 (tag commit 78e5691). Player-facing changes: robust launcher self-update (wait for old process, retry locked files, keep staging on failure), updater result in launcher.log, non-ASCII/`%` install paths, no crash dump when the launcher terminates the game itself, real Windows version and compatibility-mode warning in log and support package. Duplicate shadow manager fix, crash-monitor attach logging and dependency updates omitted as internal.
