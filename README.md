# Open Dash

Product showcase and case study for the Open Dash Android project.

The site includes a chronological build history through v1.3.5, source-linked testing notes, Google Trends and Reddit analysis, and a sortable Instagram Reels showcase with creator credits.

The current app's source is at [subtlesayak/open-dash](https://github.com/subtlesayak/open-dash).

## Development

Use Node.js 24 or later.

```sh
npm ci
npm run check
npm run build
npm run preview
```

The preview serves the site at http://127.0.0.1:4173/opendash/.

## Deployment

The GitHub Actions workflow builds and publishes `dist/` to GitHub Pages from `main`. Both the product page and `/case-study/` are rendered as static HTML, with React providing the Reel sorting and player controls.

Instagram counts are a November 16, 2026 snapshot. Reddit Post Insights are a November 21, 2026 snapshot. Unavailable counters are marked with a dash. View totals can include repeat viewers.
