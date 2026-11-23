import * as React from "react"
import { RideInfographic } from "./pages/RideInfographic"
import { SiteHeader, SiteFooter, ArticleHeader, RelatedPages } from "./pages/SiteLayout"

export type ShowcaseReel = {
    id: string
    original: string
    credit: string
    date: string
    title: string
    likes: string
    comments: string
    views: string
}

type ReelSort = "views" | "creator" | "recent"

function mediaUrl(siteRoot: string, path: string) {
    return (siteRoot || "https://subtlesayak.github.io/opendash") + "/media/" + path
}

export function reelCount(value: string) {
    const normalized = value.replaceAll(",", "")
    const amount = Number.parseFloat(normalized)
    if (normalized.endsWith("M")) return Math.round(amount * 1_000_000)
    if (normalized.endsWith("K")) return Math.round(amount * 1_000)
    return Number.isFinite(amount) ? amount : -1
}

function ReelShowcase({ entries, siteRoot }: { entries: ShowcaseReel[]; siteRoot: string }) {
    const [sort, setSort] = React.useState<ReelSort>("views")
    const [limit, setLimit] = React.useState(9)
    const listRef = React.useRef<HTMLUListElement>(null)
    const nextFocusIndex = React.useRef<number | null>(null)
    React.useEffect(() => {
        if (nextFocusIndex.current !== null) {
            listRef.current?.children[nextFocusIndex.current]?.querySelector<HTMLAnchorElement>("a")?.focus()
            nextFocusIndex.current = null
        }
    }, [limit])
    const sorted = React.useMemo(() => {
        return [...entries].sort((a, b) => {
            const byRecent = b.date.localeCompare(a.date)
            const byCreator = a.original.localeCompare(b.original, "en", { sensitivity: "base", ignorePunctuation: true })
            if (sort === "creator") return byCreator || byRecent
            if (sort === "recent") return byRecent || byCreator
            return reelCount(b.views) - reelCount(a.views) || byRecent || byCreator
        })
    }, [entries, sort])
    const visible = sorted.slice(0, limit)
    return (
        <section id="reels" aria-labelledby="odp-reels-title" className="odp-wrap odp-reels">
            <div className="odp-section-top">
                <div>

                    <p>Watch riders demo wallpapers, walk through setup, and try screen-off navigation during the dashboard experiment.</p>
                </div>
                <label className="odp-sort">
                    Sort Reels
                    <select value={sort} onChange={(event) => { setSort(event.target.value as ReelSort); setLimit(9) }}>
                        <option value="views">Most views</option>
                        <option value="creator">Creator A–Z</option>
                        <option value="recent">Newest first</option>
                    </select>
                </label>
            </div>
            <p className="odp-reels-note" aria-live="polite">Showing {visible.length} of {entries.length} Reels. Counts checked November 16–21, 2026. A dash means unavailable.</p>
            <ul className="odp-tiles" id="odp-reel-list" ref={listRef}>
                {visible.map((entry) => (
                    <li key={entry.id} className="odp-tile">
                        <a className="odp-cover" aria-label={`Watch ${entry.title} on Instagram (opens in a new tab)`} href={`https://www.instagram.com/reel/${entry.id}/`} target="_blank" rel="noopener noreferrer">
                            <img src={mediaUrl(siteRoot, `reels/${entry.id}.jpg`)} alt="" width={640} height={853} loading="lazy" decoding="async" />
                            <span className="odp-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg></span>
                            <span className="odp-cover-label" aria-hidden="true">Watch Reel ↗</span>
                        </a>
                        <div className="odp-tile-top">
                            <time dateTime={"2026-" + entry.date}>{entry.date.startsWith("06") ? "Jun" : "Jul"} {Number(entry.date.slice(3))}, 2026</time>
                        </div>
                        <h2><a href={`https://www.instagram.com/reel/${entry.id}/`} target="_blank" rel="noopener noreferrer" aria-label={`${entry.title} (opens Instagram in a new tab)`}>{entry.title}</a></h2>
                        <p className="odp-credit">{entry.credit.split(" × ").map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`}>{handle}</a>)}</p>
                        <dl className="odp-counts">
                            <div><dt>Views</dt><dd>{entry.views || "—"}</dd></div>
                            <div><dt>Likes</dt><dd>{entry.likes || "—"}</dd></div>
                            <div><dt>Comments</dt><dd>{entry.comments || "—"}</dd></div>
                        </dl>
                    </li>
                ))}
            </ul>
            {visible.length < entries.length && <button className="odp-button odp-secondary odp-more" type="button" aria-controls="odp-reel-list" onClick={() => { nextFocusIndex.current = visible.length; setLimit((current) => Math.min(current + 9, entries.length)) }}>Show {Math.min(9, entries.length - visible.length)} more Reels</button>}
            <a className="odp-textlink" href={siteRoot + "/trends/#reel-analysis"}>Read the trend analysis <span aria-hidden="true">↗</span></a>
        </section>
    )
}

function AppPreview({ siteRoot }: { siteRoot: string }) {
    return <figure className="odp-preview">
        <div className="odp-appstage">
            <img className="odp-hero-image" src={mediaUrl(siteRoot, "app/editorial-hero.webp")} alt="Open Dash Vehicles and Garage views, presented on two Android phones." width={1736} height={906} fetchPriority="high" />
            <div className="odp-mobile-screens"><img src={mediaUrl(siteRoot, "app/vehicles.webp")} alt="Vehicles screen" width={1080} height={2122} /><img src={mediaUrl(siteRoot, "app/garage.webp")} alt="Garage screen" width={1080} height={2122} /></div>
            <span className="odp-cover-brand" aria-hidden="true">Open Dash</span>
        </div>
        <figcaption>Product visualization based on the June 2026 app screens. <a href={mediaUrl(siteRoot, "app/vehicles.webp")}>Vehicles screenshot</a> · <a href={mediaUrl(siteRoot, "app/garage.webp")}>Garage screenshot</a></figcaption>
    </figure>
}

export function ProductPage({ style, entries, repository, release, siteRoot = "", reelsPage = false }: {
    style?: React.CSSProperties
    entries: ShowcaseReel[]
    repository: string
    release: string
    siteRoot?: string
    reelsPage?: boolean
}) {
    const caseStudy = siteRoot + "/case-study/"
    return <div className="odp" style={style}>
        <style>{productStyles}</style>
        <a className="odp-skip" href="#product-main">Skip to content</a>
        <SiteHeader siteRoot={siteRoot} current={reelsPage ? "reels" : "home"} />
        <main id="product-main" tabIndex={-1}>
            {reelsPage ? <><ArticleHeader title="Seen on the road." metadata="Rider archive · June–July 2026" id="odp-reels-title" /><ReelShowcase entries={entries} siteRoot={siteRoot} /></> : <><ArticleHeader title="A new view of your ride." metadata="An open-source Android ride companion" action={{ label: "Download for Android", href: release }} /><div className="odp-wrap">
                <AppPreview siteRoot={siteRoot} />
                <section className="odp-intro" aria-label="About Open Dash">
                    <div><p className="odp-description">Route previews, ride history, and a garage for your motorcycles. An open-source Android project, built around the ride.</p><p className="odp-install-note">Opens the GitHub release. Choose the APK under Assets and review the release notes before installing.</p></div>
                </section>
                <RideInfographic />
                <section className="odp-stories-section" aria-labelledby="odp-inside-title"><h2 id="odp-inside-title">Inside Open Dash</h2>
                    <div className="odp-stories">
                        <article><a className="odp-story-image odp-dash" href={caseStudy} tabIndex={-1} aria-hidden="true"><img src={mediaUrl(siteRoot, "reels/DZ-TzFHz_HR.jpg")} alt="" width={361} height={640} loading="lazy" /></a>
                            <h3><a href={caseStudy}>The story behind<br />the dash</a></h3><a className="odp-story-link" href={caseStudy}>Read the case study</a><p className="odp-source-note">Cover from the Open Dash rider archive</p></article>
                        <article><a className="odp-story-image odp-garage" href={caseStudy + "#versions"} tabIndex={-1} aria-hidden="true"><img src={mediaUrl(siteRoot, "app/garage.webp")} alt="" width={1080} height={2122} loading="lazy" /></a>
                            <h3><a href={caseStudy + "#versions"}>From first build<br />to v1.3.5</a></h3><a className="odp-story-link" href={caseStudy + "#versions"}>Explore the build history</a><p className="odp-source-note">Actual app screen · June 2026 build</p></article>
                        <article id="reels"><a className="odp-story-image odp-community" href={siteRoot + "/reels/"} tabIndex={-1} aria-hidden="true"><img src={mediaUrl(siteRoot, "reels/DZ-DRYGpTMy.jpg")} alt="" width={361} height={640} loading="lazy" /></a>
                            <h3><a href={siteRoot + "/reels/"}>Seen on the road</a></h3><a className="odp-story-link" href={siteRoot + "/reels/"}>Watch the rider showcase</a><p className="odp-source-note">Cover: <a href="https://www.instagram.com/moto_inside_out/">@moto_inside_out</a></p></article>
                    </div>
                </section>
            </div></>}
            {reelsPage && <RelatedPages siteRoot={siteRoot} current="reels" />}
        </main>
        <SiteFooter siteRoot={siteRoot} current={reelsPage ? "reels" : "home"} />
    </div>
}

const productStyles = `
.odp{font:16px/1.7 var(--site-font);color:var(--site-ink);background:var(--site-bg);width:100%;--muted:var(--site-muted);--edge:var(--site-edge)}

.odp *,.odp *::before,.odp *::after{box-sizing:border-box}
.odp a{color:inherit;text-underline-offset:5px;text-decoration-thickness:1px}
.odp a:hover{color:var(--site-accent)}
.odp a:focus-visible,.odp button:focus-visible,.odp select:focus-visible{outline:3px solid var(--site-accent);outline-offset:5px}
.odp h1,.odp h2,.odp h3,.odp p,.odp figure,.odp dl,.odp dd{margin:0}
.odp-wrap{max-width:1200px;margin-inline:auto;padding-inline:40px}
.odp-skip{position:absolute;left:20px;top:-60px;background:var(--site-panel);padding:12px;z-index:2}
.odp-skip:focus{top:10px}
.odp-appstage{position:relative;background:#e9edef;overflow:hidden}
.odp-hero-image{display:block;width:100%;height:auto;aspect-ratio:1736/906;object-fit:cover}
.odp-mobile-screens{display:none}
.odp-cover-brand{position:absolute;left:3%;top:50%;transform:translateY(-50%);font-size:34px;letter-spacing:-1.5px;font-weight:800;color:#765317}
.odp-preview figcaption{font-size:12px;color:var(--muted);padding-top:10px;line-height:1.6}
.odp-intro{display:grid;grid-template-columns:1.05fr 1fr;gap:70px;padding-top:48px;padding-bottom:90px}
.odp h1{font-size:76px;letter-spacing:-3.3px;line-height:1.03;font-weight:750}
.odp .odp-description{font-size:23px;line-height:1.4;margin:2px 0 22px}
.odp-intro-link{font-size:21px}
.odp .odp-install-note{font-size:14px;line-height:1.5;color:var(--muted);margin-top:12px;max-width:45ch}
.odp h2{font-size:56px;letter-spacing:-2.2px;line-height:1.1;margin:0 0 36px}
.odp-stories{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.odp-story-image{height:236px;overflow:hidden;background:#e9edef;display:flex;align-items:center;justify-content:center}
.odp-story-image img{width:100%;height:100%;object-fit:cover;transition:transform .25s}
.odp-story-image:hover img{transform:scale(1.025)}
.odp-dash img{object-position:center 30%}
.odp-garage img{width:auto;height:205px;object-fit:contain;border:4px solid #171717;border-radius:12px;transform:rotate(-7deg)}
.odp-community img{object-position:center 48%}
.odp h3{font-size:28px;letter-spacing:-.8px;line-height:1.13;margin:20px 0;min-height:64px}
.odp h3 a{text-decoration:none}
.odp-story-link{font-size:17px;line-height:1.6}
.odp .odp-source-note{font-size:12px;color:var(--site-muted);margin:8px 0 0}

.odp-reels{padding-top:35px}
.odp-reels h1{margin:0 0 24px;font-size:64px}
.odp-section-top{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:20px}
.odp-section-top>div{max-width:650px}
.odp-section-top p{color:var(--muted)}
.odp-sort{display:grid;gap:6px;font-size:14px}
.odp-sort select{font:inherit;color:inherit;background:var(--site-panel);border:1px solid var(--site-edge);border-radius:0;min-height:44px;padding:8px 30px 8px 12px;cursor:pointer}
.odp .odp-reels-note{margin-top:28px;color:var(--muted);font-size:14px}
.odp-tiles{margin:24px 0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px 28px}
.odp-tile{min-width:0;display:flex;flex-direction:column}
.odp-cover{position:relative;display:block;overflow:hidden;background:#171717;aspect-ratio:3/4;text-decoration:none;margin-bottom:14px}
.odp-cover img{width:100%;height:100%;object-fit:contain;display:block}
.odp-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;display:grid;place-items:center;background:#0009;border:1px solid #ffffff85;border-radius:50%;color:white}
.odp-play svg{width:25px;height:25px}
.odp-cover-label{position:absolute;bottom:12px;left:12px;background:#000b;padding:4px 9px;color:white;font-size:13px}
.odp-tile-top{color:var(--muted);font-size:13px}
.odp-tile h2{font-size:23px;min-height:0;margin:8px 0;letter-spacing:-.5px;line-height:1.2}.odp-tile h2 a{text-decoration:none}
.odp-credit{display:flex;flex-wrap:wrap;gap:0 12px;font-size:14px;overflow-wrap:anywhere}
.odp-credit a{display:inline-flex;align-items:center;min-height:44px}
.odp .odp-counts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;border-top:1px solid var(--edge);padding-top:12px;margin-top:auto}
.odp-counts dt{font-size:12px;color:var(--muted)}
.odp-counts dd{font-size:17px;font-weight:700;font-variant-numeric:tabular-nums}
.odp-button{font:inherit;cursor:pointer;padding:12px 18px;background:var(--site-panel);color:var(--site-ink);border:1px solid var(--site-edge);min-height:46px}
.odp-button:hover{background:var(--site-soft)}
.odp-textlink{display:inline-flex;align-items:center;min-height:44px;margin:10px 0;font-size:16px}
.odp-more{margin-right:20px}

@media(min-width:1400px){.odp-wrap{padding-inline:20px}
}

@media(max-width:850px){.odp-wrap{padding-inline:28px}
.odp-cover-brand{font-size:26px}
.odp-intro{gap:36px;padding-bottom:66px}
.odp h1{font-size:49px;letter-spacing:-2.4px}
.odp .odp-description{font-size:19px}
.odp h2{font-size:40px}
.odp h3{font-size:23px}
.odp-stories{gap:20px}
.odp-story-image{height:185px}
.odp-garage img{height:160px}
.odp-story-link{font-size:15px}
.odp-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}
.odp-reels h1{font-size:52px}
}

@media(max-width:600px){.odp-wrap{padding-inline:22px}
.odp-hero-image{display:none}
.odp-appstage{height:auto;padding-top:70px;padding-bottom:28px;display:flex;align-items:center;justify-content:center}
.odp-mobile-screens{display:flex;gap:18px;justify-content:center;align-items:center;width:100%}
.odp-mobile-screens img{height:auto;width:42%;max-width:138px;border:4px solid #191919;border-radius:16px;box-shadow:0 12px 18px #19242826}
.odp-cover-brand{font-size:23px;left:22px;top:19px;transform:none}
.odp-intro{grid-template-columns:1fr;gap:24px;padding-top:34px;padding-bottom:58px}
.odp h1{font-size:49px;max-width:360px}
.odp .odp-description{font-size:19px;margin-top:0}
.odp-intro-link{font-size:18px}
.odp h2{font-size:35px;letter-spacing:-1.5px;margin-bottom:28px}
.odp-stories{grid-template-columns:1fr;gap:38px}
.odp-story-image{height:245px}
.odp-garage img{height:215px}
.odp h3{min-height:0;font-size:28px;margin:18px 0 12px}
.odp-story-link{font-size:17px}
.odp-reels{padding-top:15px}
.odp-reels h1{font-size:48px}
.odp-tiles{grid-template-columns:1fr;gap:36px}
.odp-tile h2{font-size:25px}
.odp-more{margin-right:0}
.odp-textlink{display:flex}
}

@media(prefers-reduced-motion:reduce){.odp-story-image img{transition:none}
}

.odp .odp-intro{display:block;max-width:720px;margin-inline:auto;padding-block:38px 64px}
.odp .odp-description{font-size:18px;line-height:1.85;max-width:none}
.odp .odp-wrap{max-width:1280px;padding-inline:40px}
.odp .odp-stories-section h2{font-size:32px;font-weight:600;letter-spacing:-.035em}
.odp .odp-stories h3{font-size:24px;letter-spacing:-.035em;font-weight:600}
.odp .odp-reels{padding-top:0}
.odp .odp-cover-brand{color:#765317}
.odp .ods-article-header h1{font-size:clamp(34px,4.1vw,56px);letter-spacing:-.045em;line-height:1.18;font-weight:700;max-width:none}
.odp .ods-related h2{font-size:30px;font-weight:600;letter-spacing:-.035em;margin-bottom:24px}
.odp .ods-related h3{min-height:0;font-size:20px;margin:0 0 8px}
.odp .ods-related p{font-size:14px;line-height:1.7}
@media(max-width:650px){.odp .odp-wrap{padding-inline:22px}.odp .odp-intro{padding-block:28px 48px}.odp .odp-description{font-size:16px}.odp .odp-stories-section h2{font-size:28px}.odp .odp-stories h3{font-size:24px}}

.odp .odp-intro-link,.odp .odp-story-link,.odp .odp-textlink,.odp .odp-source-note a{color:var(--site-link)}
`
