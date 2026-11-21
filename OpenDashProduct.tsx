import * as React from "react"

const features = [
    { name: "Route preview", detail: "Look over your route before you head out.", icon: "route" },
    { name: "Ride history", detail: "Keep a record of past rides and the bikes you took.", icon: "rides" },
    { name: "Garage", detail: "Organize bikes, service records, and ride expenses.", icon: "garage" },
    { name: "Personalization", detail: "Choose a theme and wallpaper for the phone view.", icon: "themes" },
] as const

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

export function reelCount(value: string) {
    const normalized = value.replaceAll(",", "")
    const amount = Number.parseFloat(normalized)
    if (normalized.endsWith("M")) return amount * 1_000_000
    if (normalized.endsWith("K")) return amount * 1_000
    return Number.isFinite(amount) ? amount : -1
}

function ReelShowcase({ entries, siteRoot }: { entries: ShowcaseReel[]; siteRoot: string }) {
    const [sort, setSort] = React.useState<ReelSort>("views")
    const [limit, setLimit] = React.useState(9)
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
                    <p className="odp-eyebrow">Community archive</p>
                    <h2 id="odp-reels-title">Open Dash on Instagram</h2>
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
            <ul className="odp-tiles">
                {visible.map((entry) => (
                    <li key={entry.id} className="odp-tile">
                        <div className="odp-tile-top">
                            <time dateTime={"2026-" + entry.date}>{entry.date.startsWith("06") ? "Jun" : "Jul"} {Number(entry.date.slice(3))}, 2026</time>
                            <a className="odp-play" aria-label={`Watch ${entry.title} on Instagram`} href={`https://www.instagram.com/reel/${entry.id}/`} target="_blank" rel="noopener noreferrer">▶</a>
                        </div>
                        <h3><a href={`https://www.instagram.com/reel/${entry.id}/`}>{entry.title}</a></h3>
                        <p className="odp-credit">{entry.credit.split(" × ").map((handle) => <a key={handle} href={`https://www.instagram.com/${handle.slice(1)}/`}>{handle}</a>)}</p>
                        <dl className="odp-counts">
                            <div><dt>Views</dt><dd>{entry.views || "—"}</dd></div>
                            <div><dt>Likes</dt><dd>{entry.likes || "—"}</dd></div>
                            <div><dt>Comments</dt><dd>{entry.comments || "—"}</dd></div>
                        </dl>
                    </li>
                ))}
            </ul>
            {visible.length < entries.length && <button className="odp-button odp-secondary odp-more" type="button" onClick={() => setLimit(entries.length)}>Show all {entries.length} Reels</button>}
            <a className="odp-textlink" href={siteRoot + "/case-study/#response"}>Read the trend analysis <span aria-hidden="true">↗</span></a>
        </section>
    )
}

function RidePreview() {
    return (
        <figure className="odp-preview">
            <div className="odp-mapstage" aria-hidden="true">
                <div className="odp-stage-label"><span /> ROUTE PREVIEW</div>
                <div className="odp-contours"><i /><i /><i /><i /></div>
                <div className="odp-phone">
                    <div className="odp-phone-top"><span className="odp-mini-mark" /> Open Dash <span className="odp-phone-menu">⋯</span></div>
                    <div className="odp-map">
                        <div className="odp-road odp-road-one" />
                        <div className="odp-road odp-road-two" />
                        <div className="odp-road odp-road-three" />
                        <div className="odp-route" />
                        <i className="odp-pin odp-pin-start" /><i className="odp-pin odp-pin-end" />
                    </div>
                    <div className="odp-route-sheet">
                        <span>ROUTE PREVIEW</span>
                        <strong>Sunday loop</strong>
                        <p>84 km <span>·</span> 2 h 15 min</p>
                    </div>
                </div>
            </div>
            <figcaption>Illustrative phone route preview.</figcaption>
        </figure>
    )
}

export function ProductPage({ style, entries, repository, release, siteRoot = "" }: {
    style?: React.CSSProperties
    entries: ShowcaseReel[]
    repository: string
    release: string
    siteRoot?: string
}) {
    return (
        <div className="odp" style={style}>
            <style>{productStyles}</style>
            <a className="odp-skip" href="#product-main">Skip to content</a>
            <header className="odp-header">
                <div className="odp-wrap odp-head-inner">
                    <a className="odp-brand" href={siteRoot + "/"} aria-current="page"><span className="odp-mark" aria-hidden="true" />Open Dash</a>
                    <nav className="odp-nav" aria-label="Main navigation">
                        <a href="#features">Features</a>
                        <a href="#reels">Reels</a>
                        <a href={siteRoot + "/case-study/"}>Case study</a>
                    </nav>
                </div>
            </header>
            <main id="product-main" tabIndex={-1}>
                <section className="odp-wrap odp-hero" aria-labelledby="odp-title">
                    <div className="odp-hero-copy">
                        <p className="odp-eyebrow"><span /> Open-source Android app</p>
                        <h1 id="odp-title">Your rides.<br /> <em>Your garage.</em></h1>
                        <p className="odp-lead">Preview routes, keep a ride history, and manage your motorcycles and their service records in Open Dash.</p>
                        <div className="odp-actions">
                            <a className="odp-button odp-primary" href={repository}>Explore on GitHub <span aria-hidden="true">↗</span></a>
                            <a className="odp-button odp-secondary" href={siteRoot + "/case-study/"}>Read the case study</a>
                        </div>
                    </div>
                    <RidePreview />
                </section>
                <section className="odp-wrap odp-features" id="features" aria-labelledby="odp-features-title">
                    <h2 id="odp-features-title">Before and after the ride</h2>
                    <ul>
                        {features.map(({ name, detail, icon }) => (
                            <li key={name}><span className={`odp-feature-icon odp-icon-${icon}`} aria-hidden="true" /><h3>{name}</h3><p>{detail}</p></li>
                        ))}
                    </ul>
                </section>
                <section className="odp-wrap odp-history" aria-labelledby="odp-history-title">
                    <div className="odp-history-inner">
                        <div><p className="odp-eyebrow">Project history</p><h2 id="odp-history-title">From the Tripper Dash to the phone</h2></div>
                        <div><p>Open Dash began as a Royal Enfield Tripper Dash experiment. Early builds put photos and navigation on the bike display. The current public source is a standalone phone app.</p>
                            <a className="odp-textlink" href={siteRoot + "/case-study/"}>Follow the build and testing through v1.3.5 <span aria-hidden="true">↗</span></a></div>
                    </div>
                </section>
                <ReelShowcase entries={entries} siteRoot={siteRoot} />
            </main>
            <footer className="odp-footer">
                <div className="odp-wrap odp-head-inner">
                    <a className="odp-brand" href={siteRoot + "/"}><span className="odp-mark" aria-hidden="true" />Open Dash</a>
                    <nav className="odp-nav" aria-label="Project links"><a href={release}>v1.3.5 release notes</a><a href="https://www.instagram.com/open.dash/">Instagram</a></nav>
                </div>
            </footer>
        </div>
    )
}

const productStyles = `
.odp { --ink:#101412; --muted:#526054; --edge:#d4dcd4; --paper:#f6f8f3; --green:#cffa77; font: 16px/1.55 "Geist","Inter",system-ui,sans-serif; color:var(--ink); background:var(--paper); width:100%; }
.odp *, .odp *::before, .odp *::after { box-sizing:border-box; }
.odp a { color:inherit; }
.odp a:focus-visible,.odp button:focus-visible,.odp select:focus-visible { outline:3px solid #39734c; outline-offset:4px; }
.odp h1,.odp h2,.odp h3,.odp p,.odp figure,.odp dl,.odp dd { margin:0; }
.odp-wrap { width:min(100%,1260px); padding-inline:clamp(20px,5vw,64px); margin-inline:auto; }
.odp a,.odp select,.odp button { touch-action:manipulation; }
.odp-skip { position:absolute; top:8px; left:8px; padding:10px 16px; background:white; z-index:10; transform:translateY(-140%); }
.odp-skip:focus { transform:translateY(0); }
.odp-header,.odp-footer { border-block-end:1px solid var(--edge); }
.odp-footer { border-block-start:1px solid var(--edge); border-block-end:0; }
.odp-head-inner { min-height:75px; display:flex; justify-content:space-between; align-items:center; gap:10px 24px; flex-wrap:wrap; }
.odp-brand { min-height:44px; display:inline-flex; gap:11px; align-items:center; text-decoration:none; font-size:1.17rem; font-weight:770; letter-spacing:-.04em; white-space:nowrap; }
.odp-mark,.odp-mini-mark { position:relative; display:inline-block; flex:none; width:25px; aspect-ratio:1; border:2px solid currentColor; border-radius:50%; }
.odp-mark::after,.odp-mini-mark::after { content:""; position:absolute; width:2px; height:9px; left:50%; top:4px; background:currentColor; transform:rotate(44deg); transform-origin:bottom center; }
.odp-nav { display:flex; align-items:center; gap:clamp(10px,3vw,32px); flex-wrap:wrap; }
.odp-nav a { display:inline-flex; align-items:center; min-height:44px; text-decoration:none; font-size:.9rem; font-weight:620; }
.odp-nav a:hover,.odp-tile h3 a:hover,.odp-credit a:hover { text-decoration:underline; text-underline-offset:4px; }
.odp-hero { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,.88fr); align-items:center; gap:clamp(28px,6vw,84px); padding-block:clamp(38px,7vw,96px) 52px; }
.odp-eyebrow { font-size:.74rem; font-weight:750; letter-spacing:.115em; text-transform:uppercase; }
.odp-eyebrow>span { display:inline-block; width:9px; height:9px; background:#42684b; border-radius:50%; margin-right:.6em; }
.odp h1 { margin:18px 0 22px; font-size:clamp(3rem,7vw,6.65rem); font-weight:780; letter-spacing:-.085em; line-height:.96; }
.odp h1 em { color:#35593d; font-style:normal; }
.odp .odp-lead { color:var(--muted); font-size:clamp(1.05rem,1.8vw,1.22rem); max-width:37ch; }
.odp-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:27px; }
.odp-button { min-height:46px; border:1px solid transparent; border-radius:7px; padding:9px 15px; display:inline-flex; gap:10px; align-items:center; justify-content:center; white-space:normal; text-align:center; text-decoration:none; cursor:pointer; font:inherit; font-size:.88rem; font-weight:700; }
.odp .odp-primary { color:#fff; background:#15241a; }
.odp-primary:hover { background:#35593d; }
.odp .odp-secondary { color:var(--ink); background:transparent; border-color:#a7b5a7; }
.odp-secondary:hover { background:#e8efe4; }
.odp-preview { min-width:0; }
.odp-mapstage { min-height:clamp(300px,39vw,450px); border-radius:20px; position:relative; overflow:hidden; display:grid; place-items:center; isolation:isolate; background:radial-gradient(ellipse at 55% 47%,#324734 0%,#202e25 53%,#131c17 100%); }
.odp-stage-label { position:absolute; z-index:2; top:14px; left:15px; font-size:.63rem; font-weight:700; letter-spacing:.13em; color:#dbe6d8; }
.odp-stage-label span { display:inline-block; width:6px; height:6px; background:var(--green); border-radius:50%; margin-right:6px; }
.odp-contours { position:absolute; inset:-20%; z-index:-1; background:repeating-radial-gradient(ellipse at 65% 40%,transparent 0 19px,#d7f4d411 20px 21px,transparent 22px 33px); transform:rotate(-24deg) scaleX(1.25); }
.odp-contours i { position:absolute; inset:28% 4%; border:1px dashed #d3efc947; border-radius:48%; transform:rotate(25deg); }
.odp-contours i:nth-child(2) { inset:16% 10%; transform:rotate(29deg); }
.odp-contours i:nth-child(3) { inset:9% 18%; transform:rotate(35deg); }
.odp-phone { padding:9px; margin:30px 0 26px; width:clamp(170px,51%,240px); transform:rotate(-8deg); border-radius:27px; border:1px solid #819783; background:#101712; color:#f3f8ef; box-shadow:10px 20px 35px #061006bb; }
.odp-phone-top { display:flex; align-items:center; gap:6px; padding:3px 4px 8px; font-size:.68rem; font-weight:750; }
.odp-mini-mark { width:14px; border-width:1px; }
.odp-mini-mark::after { height:5px; width:1px; top:2px; }
.odp-phone-menu { margin-left:auto; }
.odp-map { height:clamp(111px,19vw,205px); position:relative; overflow:hidden; border-radius:12px; background:repeating-radial-gradient(ellipse at 16% 19%,#325043 0 9px,#385f50 10px 11px,#304c41 12px 17px); }
.odp-road { position:absolute; background:#7b9c8b; opacity:.55; height:2px; width:120%; left:-8%; transform:rotate(25deg); top:30%; }
.odp-road-two { transform:rotate(-29deg); top:65%; }
.odp-road-three { transform:rotate(73deg); top:46%; }
.odp-route { position:absolute; inset:0; background:var(--green); clip-path:polygon(18% 79%,29% 51%,45% 47%,54% 32%,72% 40%,80% 21%,83% 22%,74% 44%,56% 37%,47% 51%,31% 55%,21% 81%); }
.odp-pin { position:absolute; width:10px; height:10px; background:#fff; border:2px solid #263a2c; border-radius:50%; }
.odp-pin-start { top:77%; left:17%; }
.odp-pin-end { top:19%; left:79%; }
.odp-route-sheet { padding:9px 4px 5px; display:grid; gap:1px; }
.odp-route-sheet>span { font-size:.54rem; letter-spacing:.11em; color:#bfddaf; font-weight:740; }
.odp-route-sheet strong { font-size:1.02rem; }
.odp-route-sheet p { font-size:.68rem; color:#d7e1d7; font-variant-numeric:tabular-nums; }
.odp-route-sheet p span { margin:0 5px; }
.odp-preview figcaption { margin-top:7px; color:var(--muted); font-size:.78rem; text-align:right; }
.odp h2 { font-size:clamp(2rem,4vw,3.5rem); line-height:1; letter-spacing:-.066em; font-weight:760; text-wrap:balance; }
.odp h3 { font-size:1.1rem; font-weight:740; line-height:1.2; letter-spacing:-.025em; }
.odp-features { padding-block:25px 60px; }
.odp-features ul,.odp-tiles { margin:22px 0 0; padding:0; list-style:none; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
.odp-features li { padding:17px; min-width:0; border:1px solid var(--edge); border-radius:9px; background:#fcfdf9; }
.odp-feature-icon { display:block; width:21px; height:21px; margin-bottom:12px; border:2px solid #406148; border-radius:4px; transform:rotate(-9deg); }
.odp-icon-route { border-radius:50% 0 50% 50%; transform:rotate(-45deg); }
.odp-icon-rides { border-radius:50%; border-right-style:dotted; }
.odp-icon-garage { transform:none; border-top-width:6px; }
.odp-icon-themes { border-radius:50%; background:linear-gradient(90deg,#406148 50%,transparent 50%); }
.odp-features li p { color:var(--muted); font-size:.91rem; margin-top:7px; }
.odp-history-inner { background:#18281d; color:#f5fbf1; border-radius:16px; padding:clamp(22px,4vw,46px); display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:16px 36px; align-items:center; }
.odp-history h2,.odp-section-top h2 { margin-top:8px; }
.odp-history .odp-eyebrow { color:#cffa77; }
.odp-history-inner p:not(.odp-eyebrow) { color:#d6e3d5; }
.odp-textlink { display:inline-flex; align-items:center; gap:6px; min-height:44px; font-weight:730; font-size:.92rem; text-underline-offset:4px; }
.odp-reels { padding-block:clamp(42px,7vw,86px); }
.odp-section-top { display:flex; flex-wrap:wrap; align-items:end; justify-content:space-between; gap:15px; }
.odp-section-top p:not(.odp-eyebrow) { margin-top:10px; color:var(--muted); max-width:62ch; }
.odp-sort { display:grid; gap:3px; color:var(--muted); font-size:.78rem; font-weight:680; }
.odp-sort select { padding:7px 30px 7px 9px; min-height:44px; border:1px solid #a7b5a7; border-radius:6px; background:white; color:var(--ink); font:inherit; font-size:.95rem; cursor:pointer; }
.odp .odp-reels-note { margin-top:13px; color:var(--muted); font-size:.82rem; }
.odp .odp-tiles { grid-template-columns:repeat(3,minmax(0,1fr)); margin:12px 0 14px; }
.odp-tile { min-width:0; background:#fcfdf9; border:1px solid var(--edge); border-radius:9px; padding:12px 15px 15px; display:flex; flex-direction:column; }
.odp-tile-top { display:flex; align-items:center; justify-content:space-between; gap:8px; color:#526054; font-size:.78rem; }
.odp-play { display:grid; place-items:center; width:44px; height:44px; color:#1e3725; background:#e6efe1; border:0; border-radius:50%; text-decoration:none; font-size:.8rem; cursor:pointer; }
.odp-play:hover { background:#d6e7cd; }
.odp-tile h3 { margin:4px 0; }
.odp-tile h3 a { text-decoration:none; }
.odp-credit { display:flex; flex-wrap:wrap; align-items:center; column-gap:10px; font-size:.82rem; overflow-wrap:anywhere; }
.odp-credit a { display:inline-flex; align-items:center; min-height:44px; text-underline-offset:3px; }
.odp .odp-counts { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:5px; border-top:1px solid var(--edge); padding-top:9px; margin-top:auto; }
.odp-counts dt { font-size:.71rem; color:var(--muted); }
.odp-counts dd { font-weight:750; font-variant-numeric:tabular-nums; }
.odp-more { margin-right:14px; }
@media (max-width:850px) {
    .odp-hero { gap:25px; }
    .odp h1 { font-size:clamp(2.8rem,8vw,4.25rem); }
    .odp .odp-tiles,.odp-features ul { grid-template-columns:repeat(2,minmax(0,1fr)); }
}
@media (max-width:620px) {
    .odp-head-inner { min-height:62px; padding-block:5px; gap:0 13px; }
    .odp-hero,.odp-history-inner { grid-template-columns:minmax(0,1fr); }
    .odp-hero { padding-bottom:30px; }
    .odp-mapstage { min-height:320px; }
}
@media (max-width:430px) {
    .odp h1 { font-size:clamp(2.7rem,12vw,3.4rem); }
    .odp .odp-tiles,.odp-features ul { grid-template-columns:minmax(0,1fr); }
}
`
