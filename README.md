# Open Dash

Editorial homepage, rider showcase, trends analysis and case study for the Open Dash Android project.

The site includes a chronological build history through v1.3.5, source-linked testing notes, Google Trends and Reddit analysis, and a sortable Instagram Reels showcase with creator credits.

The homepage follows an editorial structure: featured app cover, split introduction, and three story links. The desktop hero is a generated product visualization based on the actual Vehicles and Garage screenshots from the June 2026 public introduction. Mobile uses the original screenshots directly, and the original images remain linked under the cover. Reel cards use locally hosted public cover images; their source links and creator attributions are recorded in `public/media/credits.json`. The original posts remain linked on every card.

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

The GitHub Actions workflow builds and publishes `dist/` to GitHub Pages from `main`. The homepage, `/reels/`, `/trends/`, and `/case-study/` are rendered as static HTML, with React providing the Reel sorting. Play controls open the original Reel on Instagram.

Instagram counts were checked November 16–21, 2026. Reddit Post Insights are a November 21, 2026 snapshot. Unavailable counters are marked with a dash. View totals can include repeat viewers.

The Reel analysis uses all 48 distinct related clips: 46 from Reposts and two launch clips outside that grid. The source rows, counter coverage, comment sample scope, and creator credits are available in `public/data/reels.json`. The check command reconciles the source rows and thumbnail attributions and independently recalculates the headline metrics. Posting-date charts describe when clips were published; the available cumulative counters do not provide daily view growth or impressions.

The standalone editorial proposal remains local under `previews/editorial/`; it is not part of the deployed build.

## Shared design and themes

All four pages use the same header, footer, page links and related-page navigation from `pages/SiteLayout.tsx`. The default Hanle Black theme combines warm charcoal with gold accents; Light and Dark alternatives use the same content and layout. The theme choice is saved locally in the browser and applied before the page paints. Poppins fonts are hosted with the site under `public/fonts/`, alongside their license.

Trends uses Search, Reddit, Instagram and GitHub topic sections. Detailed launch examples remain available in a disclosure, and the rider showcase loads nine clips at a time.

The header theme icon cycles Hanle Black → Light → Dark, with a tooltip and accessible name for the current and next theme. The homepage ride infographic describes the existing route-preview, ride-history and garage features. Trends overview numbers and proportional graphics are calculated from the same dated archive as the detailed analysis; cumulative views are not presented as installs or unique riders.
