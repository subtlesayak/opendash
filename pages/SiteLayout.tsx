import * as React from "react"

export type SitePage = "home" | "story" | "reels" | "trends"
type Theme = "hanle" | "light" | "dark"
const pages: { id: SitePage; label: string; path: string; description: string }[] = [
    { id: "home", label: "Home", path: "/", description: "The Open Dash Android project." },
    { id: "story", label: "The story", path: "/case-study/", description: "The build, the testing, and the change in direction." },
    { id: "reels", label: "Rider showcase", path: "/reels/", description: "Watch the original rider demos and meet their creators." },
    { id: "trends", label: "Trends", path: "/trends/", description: "Explore the public response, with dated sources and context." },
]
const repository = "https://github.com/subtlesayak/open-dash"
const release = repository + "/releases/tag/v1.3.5"
const validTheme = (value: string | null | undefined): Theme => value === "light" || value === "dark" ? value : "hanle"

function applyTheme(value: Theme) {
    document.documentElement.dataset.theme = value
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", { hanle: "#10100f", light: "#ffffff", dark: "#14171a" }[value])
}

export function SiteHeader({ siteRoot, current }: { siteRoot: string; current: SitePage }) {
    const [theme, setTheme] = React.useState<Theme>("hanle")
    React.useEffect(() => {
        setTheme(validTheme(document.documentElement.dataset.theme))
        const syncTheme = (event: StorageEvent) => {
            if (event.key !== "opendash-theme" && event.key !== null) return
            const next = validTheme(event.newValue)
            setTheme(next)
            applyTheme(next)
        }
        window.addEventListener("storage", syncTheme)
        return () => window.removeEventListener("storage", syncTheme)
    }, [])
    return <header className="ods-header ods-wrap" id="top">
        <a className="ods-brand" href={siteRoot + "/"} aria-label="Open Dash home" aria-current={current === "home" ? "page" : undefined}>Open Dash.</a>
        <div className="ods-header-controls">
            <nav className="ods-nav" aria-label="Main navigation">{pages.filter(page => page.id !== "home").map(page => <a key={page.id} href={siteRoot + page.path} aria-current={current === page.id ? "page" : undefined}>{page.label}</a>)}</nav>
            <label className="ods-theme">Theme<select value={theme} onChange={event => {
                const next = validTheme(event.target.value)
                setTheme(next)
                applyTheme(next)
                try { window.localStorage.setItem("opendash-theme", next) } catch { /* Theme still works when storage is unavailable. */ }
            }}><option value="hanle">Hanle Black</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
        </div>
    </header>
}

export function ArticleHeader({ title, metadata, id }: { title: string; metadata: string; id?: string }) {
    return <div className="ods-article-header ods-wrap"><h1 id={id}>{title}</h1><p className="ods-metadata">Open Dash project · {metadata}</p></div>
}

export function ArticleCover({ siteRoot }: { siteRoot: string }) {
    const root = siteRoot || "https://subtlesayak.github.io/opendash"
    return <figure className="ods-cover ods-wrap"><img src={root + "/media/app/editorial-hero.webp"} width={1736} height={906} alt="Open Dash Vehicles and Garage views on two Android phones." fetchPriority="high" /><figcaption>Product visualization based on the June 2026 app screens. <a href={root + "/media/app/vehicles.webp"}>Vehicles screenshot</a> · <a href={root + "/media/app/garage.webp"}>Garage screenshot</a></figcaption></figure>
}

export function RelatedPages({ siteRoot, current }: { siteRoot: string; current: SitePage }) {
    return <section className="ods-related ods-wrap" aria-labelledby="ods-related-title"><h2 id="ods-related-title">Keep exploring</h2><div>{pages.filter(page => page.id !== "home" && page.id !== current).map(page => <article key={page.id}><h3><a href={siteRoot + page.path}>{page.label}</a></h3><p>{page.description}</p></article>)}</div></section>
}

export function SiteFooter({ siteRoot, current }: { siteRoot: string; current: SitePage }) {
    return <footer className="ods-footer ods-wrap"><div className="ods-footer-inner">
        <div><a className="ods-footer-brand" href={siteRoot + "/"}>Open Dash.</a><p className="ods-disclaimer">An independent, open-source project.</p></div>
        <nav className="ods-footer-nav" aria-label="Site pages">{pages.map(page => <a key={page.id} href={siteRoot + page.path} aria-current={current === page.id ? "page" : undefined}>{page.label}</a>)}</nav>
        <nav className="ods-footer-nav" aria-label="Project links"><a href="https://subtlesayak.github.io/">Portfolio</a><a href={repository}>GitHub</a><a href={release}>Download for Android</a><a href="https://www.instagram.com/open.dash/">Instagram</a><a href="#top">Back to top</a></nav>
    </div></footer>
}
