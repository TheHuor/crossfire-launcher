# GitHub Pages deployment

The repository is `TheHuor/crossfire-launcher`. Its project URL is https://thehuor.github.io/crossfire-launcher/; https://thehuor.github.io/ is a separate user-site address.

## Branch publishing

Generated HTML is committed, so no custom build workflow is required for branch-based Pages publishing.

1. Run `npm run build` and `npm test`; commit source and generated output.
2. Push the approved changes to `master`.
3. In repository Settings → Pages, select **Deploy from a branch**, **master**, **/(root)** and save.
4. Inspect the Pages deployment run in Actions and its status before claiming the website is live.
5. Verify the public language entry, DE/EN pages, images and deep links under `/crossfire-launcher/`.

GitHub Pages settings require appropriate repository permissions. No deployment workflow is currently maintained in this repository. The source is ready for branch publishing; a successful push does not by itself confirm that Pages is enabled or deployed.

## Troubleshooting

- Missing site: check Pages is enabled, selected branch/folder, repository eligibility and deployment status.
- Old content: confirm the expected commit reached the publishing branch and inspect the latest deployment before refreshing the browser.
- Missing styles or images: test with `npm run preview -- --base /crossfire-launcher/` and run the link tests. Preserve relative paths and `.nojekyll`.
- Changes missing from HTML: regenerate with `npm run build` and include the generated files in the commit.

Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
