# Open Dash

Product showcase and case study for the Open Dash Android project.

The site includes a chronological build history through v1.3.5, source-linked testing notes, Google Trends and Reddit analysis, and a sortable Instagram Reels showcase with creator credits.

The product hero uses actual Vehicles and Garage screenshots from the June 2026 public introduction. Reel cards use locally hosted public cover images; their source links and creator attributions are recorded in `public/media/credits.json`. The original posts remain linked on every card.

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

The GitHub Actions workflow builds and publishes `dist/` to GitHub Pages from `main`. Both the product page and `/case-study/` are rendered as static HTML, with React providing the Reel sorting. Play controls open the original Reel on Instagram.

Instagram counts were checked November 16–21, 2026. Reddit Post Insights are a November 21, 2026 snapshot. Unavailable counters are marked with a dash. View totals can include repeat viewers.

The Reel analysis uses all 48 distinct related clips: 46 from Reposts and two launch clips outside that grid. The source rows, counter coverage, comment sample scope, and creator credits are available in `public/data/reels.json`. The check command reconciles the source rows and thumbnail attributions and independently recalculates the headline metrics. Posting-date charts describe when clips were published; the available cumulative counters do not provide daily view growth or impressions.
