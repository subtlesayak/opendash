import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { ProductPage, reelCount, type ShowcaseReel } from "./OpenDashProduct"

const repository = "https://github.com/subtlesayak/open-dash"
const archiveCommits = "https://github.com/OpenMotoDash/open-dash/commit/"
const publicSources = {
    repo: repository,
    release: repository + "/releases/tag/v1.3.5",
    phoneBaseline: repository + "/commit/a55fa904cdad5f76f91ccbcb1f2d4ab673eedcf7",
    releaseData: "https://api.github.com/repos/subtlesayak/open-dash/releases/tags/v1.3.5",
    forks: "https://api.github.com/repos/subtlesayak/open-dash/forks?sort=oldest&per_page=100",
    notice: repository + "/blob/main/NOTICE",
    pairing: repository + "/issues/1",
    pairingRetest: repository + "/issues/1#issuecomment-4809244280",
    earlyRelease: archiveCommits + "efbaef56a7f5e19412ea0883c541f564061180ac",
    earlyTestNote: "https://raw.githubusercontent.com/OpenMotoDash/open-dash/efbaef56a7f5e19412ea0883c541f564061180ac/README.md",
    changelog131: "https://raw.githubusercontent.com/OpenMotoDash/open-dash/e39712f4731ef9a0246d0d197c961990aff08a86/CHANGELOG.md",
    beta2Commit: archiveCommits + "e0c217854a6e4c79b3605ad2f7f64bbd781bb815",
    release13Commit: archiveCommits + "59181cf96b8794f0ac1cb3007755230084387b55",
    gpx: repository + "/issues/6",
    introduction: "https://www.reddit.com/r/Himalayan450/comments/1udo7em/open_dash_what_couldve_been/",
    reveal: "https://www.reddit.com/r/Himalayan450/comments/1ubtdz2/happy_motorcycle_day/",
    videoExperiment: "https://www.reddit.com/r/Himalayan450/comments/1udobcz/videos_on_a_dash/",
    update: "https://www.reddit.com/r/Himalayan450/comments/1uqjxjq/open_dash_update_what_it_is_going_to_be/",
    riders: "https://www.reddit.com/r/Himalayan450/comments/1wqhztk/opendash_old_version/",
    wallpaperReel: "https://www.instagram.com/reel/DZ9sShoIERo/",
    instagram: "https://www.instagram.com/open.dash/",
    archive: "https://github.com/cotton1234/tripper",
    trends: "https://trends.google.com/trends/explore?date=2025-11-16%202026-11-16&q=OpenDash%2CTripper%20Dash",
    trendsMethod: "https://support.google.com/trends/answer/4365533",
}

const chapters = [
    ["origin", "Origin"],
    ["design", "How it worked"],
    ["versions", "Versions"],
    ["testing", "Testing"],
    ["response", "Community"],
    ["status", "Where it stands"],
]

const forkHistory = [
    ["Jun", 18],
    ["Jul", 14],
    ["Aug", 9],
    ["Sep", 6],
    ["Oct", 3],
    ["Nov*", 3],
] as const

const redditPosts = [
    { title: "Wallpaper reveal", date: "June 21", href: publicSources.reveal, views: "17K", count: 17000, upvotes: 211, ratio: "99.5%", comments: 18, shares: 61 },
    { title: "Project introduction", date: "June 23", href: publicSources.introduction, views: "41K", count: 41000, upvotes: 136, ratio: "100%", comments: 72, shares: 167 },
    { title: "Video experiment", date: "June 23", href: publicSources.videoExperiment, views: "8.5K", count: 8500, upvotes: 43, ratio: "89.1%", comments: 24, shares: 12 },
    { title: "Scope-change update", date: "July 8", href: publicSources.update, views: "14K", count: 14000, upvotes: 58, ratio: "100%", comments: 48, shares: 42 },
] as const

const reels = [
    {
        date: "June 24, 2026",
        title: "A community showcase on the Guerrilla 450",
        credit: "@thegrrlife × @subtlesayak",
        description: "The collaborators show the Guerrilla 450 dashboard and reflect on how riders extended the wallpaper feature.",
        likes: "2.8K",
        comments: "279",
        href: "https://www.instagram.com/reel/DZ-Bp3TI1AX/",
    },
    {
        date: "June 24, 2026",
        title: "How to set a custom wallpaper",
        credit: "@thegrrlife × @subtlesayak",
        description: "Crop a photo in Open Dash and see it on a parked Guerrilla 450’s Tripper Dash.",
        likes: "61.5K",
        comments: "3K",
        href: publicSources.wallpaperReel,
    },
    {
        date: "June 24, 2026",
        title: "Multiple wallpapers on a Himalayan 450",
        credit: "@subtlesayak",
        description: "A close-up of the physical Himalayan 450 dash showing more than one custom wallpaper.",
        likes: "148",
        comments: "19",
        href: "https://www.instagram.com/reel/DZ-TzFHz_HR/",
    },
    {
        date: "June 24, 2026",
        title: "Guerrilla 450 wallpaper showcase",
        credit: "@rideonraja",
        description: "A short nighttime clip shows the custom wallpaper on a parked Guerrilla 450.",
        likes: "2.2K",
        comments: "75",
        href: "https://www.instagram.com/reel/DZ8ZUUxzZi6/",
    },
    {
        date: "June 25, 2026",
        title: "A walkthrough of Open Dash 1.3",
        credit: "@igris_450 × @open.dash",
        description: "The Android app’s About screen identifies v1.3. The walkthrough explains how to select, crop, and save a dash photo.",
        likes: "165",
        comments: null,
        href: "https://www.instagram.com/reel/DZ_9EOfT2dR/",
    },
    {
        date: "June 25, 2026",
        title: "Switching saved wallpapers",
        credit: "@thegrrlife × @subtlesayak",
        description: "A short follow-up showing different saved images on the physical Guerrilla 450 dash.",
        likes: "227",
        comments: "77",
        href: "https://www.instagram.com/reel/DaBJApAqSMt/",
    },
    {
        date: "June 26, 2026",
        title: "Wallpaper on the Himalayan 450 dash",
        credit: "@open.dash",
        description: "The project account shows a motorcycle photo occupying the top of the real dash while the bike sits at zero speed.",
        likes: "18",
        comments: "5",
        href: "https://www.instagram.com/reel/DaBOnTEzjJQ/",
    },
]

// Profile, shortcode, post date (IST), title, likes, comments, views, sampled comments, latest comment (UTC).
const repostEvidence = [
    ["thulasiram.basha","DZ7USzRpoW_","06-23","Custom wallpaper on Royal Enfield dashboards","79.5K","","2.3M","0",""],
    ["rideonraja","DZ998XLTBTj","06-24","Full Open Dash tutorial","2.4K","4.1K","95.1K","15","09-06"],
    ["thegrrlife","DZ9sShoIERo","06-24","Guerrilla 450 wallpaper tutorial","61.5K","3K","1.1M","15","08-30"],
    ["thegrrlife","DZ-Bp3TI1AX","06-24","Guerrilla 450 community wallpaper showcase","2.8K","279","64.6K","15","09-17"],
    ["chorrobambairo450","DZ94ku9i6XQ","06-24","Related Tripper Dash tutorial","6.3K","1.8K","143K","15","11-03"],
    ["moto_inside_out","DZ-DRYGpTMy","06-24","Android dash customization walkthrough","1.6K","1.6K","69K","15","06-30"],
    ["siddhant27595","DZ-RifKhLNZ","06-24","Open Dash cockpit on a Guerrilla 450","132","4","5,321","3","06-26"],
    ["mrudul_rp","DZ-ooSRTDon","06-24","Himalayan 450 custom wallpaper","145","28","3,538","15","07-21"],
    ["rebelwheel","DZ-iIIVogIU","06-24","Personal photo on the Himalayan dash","180","10","5,611","7","08-30"],
    ["speedy_.310","DZ-Fql4vHTL","06-24","Changing the Tripper Dash wallpaper","1.7K","1.1K","51K","14","08-28"],
    ["subtlesayak","DZ-TzFHz_HR","06-24","Multiple wallpapers on a Himalayan 450","148","19","5,316","14","10-27"],
    ["themotoamit","DZ-Ran6Muuo","06-24","Setting a custom Tripper wallpaper","252","84","15K","14","09-04"],
    ["lorinhosobreduasrodas1","DZ-fMg2Ovz1","06-24","Related Portuguese-language dashboard reaction","1.6K","127","38.4K","13","06-26"],
    ["madblack.in","DaA21SKPyjm","06-25","Himalayan dashboard customization walkthrough","4.5K","116","120K","13","07-01"],
    ["_mouli_vijay_","DaBAtdNTe_Y","06-25","Open Dash on a Himalayan 450","","6","2,680","3","06-26"],
    ["thegrrlife","DaBJApAqSMt","06-25","Switching saved wallpapers","227","77","7,608","15","10-26"],
    ["dhass_kavin","DZ_2Hh0oGDX","06-25","Personalizing a Himalayan dashboard","134","31","3,702","15","08-06"],
    ["thakur_surya_pratap","DZ_mfZThPGq","06-25","Wallpaper settings for the Tripper Dash","34","9","1,579","6","11-07"],
    ["man.behindwheels","DaAlGqeTBtx","06-25","Open Dash for the Himalayan and Guerrilla","50","18","4,154","5","09-07"],
    ["dtusharxo","DaA9f85zY5O","06-25","Himalayan 450 Tripper Dash with Open Dash","61","","1,631","0",""],
    ["igris_450","DZ_9EOfT2dR","06-25","Open Dash 1.3 wallpaper walkthrough","165","","12.8K","0",""],
    ["ridewith_trishul","DaAt0yDsHuv","06-25","Related Himalayan 450 feature showcase","257","19","8,921","15","09-16"],
    ["chintanratss","DZ_s02rsw6c","06-25","Related Himalayan 450 Reel","56","1","1,716","1","06-25"],
    ["jashmir_tikhak_thanching","DaAizJoTeqp","06-25","Himalayan 450 Open Dash feature demo","41","1","2,257","1","06-26"],
    ["himalayan_wanderer_kl13","DaAiJgvTvlW","06-25","Tripper Dash wallpaper how-to","5.5K","575","143K","15","06-28"],
    ["axton45t","DaAil6ol_pp","06-25","Related Royal Enfield dashboard showcase","337","38","8,879","7","06-27"],
    ["lorinhosobreduasrodas1","DZ-yySEOSOM","06-25","Portuguese-language Open Dash reaction","508","86","16.2K","14","07-13"],
    ["lifeofthilak","DZ-yqbNoCJQ","06-25","Guerrilla 450 wallpaper with Open Dash","4.7K","8","97.1K","4","06-27"],
    ["ride_with_jijo","DaDcZ5mzbu0","06-26","Guerrilla 450 dashboard walkthrough","5.5K","373","195K","15","09-11"],
    ["deep_trailzzzz","DaB_z-2O42q","06-26","Android dashboard feature demo","245","10","8,820","7","07-09"],
    ["pasha_the_himalayan","DaF_lo_vhDi","06-27","Nighttime dash customization","6.8K","233","153K","15","07-04"],
    ["hemagiri_bennur","DaE4gmNScgm","06-27","Himalayan 450 wallpaper tutorial","32","3","1,507","3","11-14"],
    ["soorajvallimalas","DaFchG1IpND","06-27","Wallpaper and off-screen map demonstration","235","128","13.7K","15","06-29"],
    ["karwan_ofcl","DaF2tVVs4-J","06-27","Open Dash wallpaper feature and credits","91","19","2,531","12","10-25"],
    ["moto_inside_out","DaFzZKvJPUw","06-27","Follow-up on finding the Android app","","99","15.1K","15","06-28"],
    ["explorewithnetra","DaFvI0rM7jQ","06-27","Open Dash navigation and ride stats on a Himalayan","158","33","5,025","15","11-04"],
    ["sumeeth_263","DaIQPLWT-SX","06-28","Guerrilla 450 wallpaper clip","","","7,599","0",""],
    ["gastroride397","DaGk5XHxHX4","06-28","Portuguese-language TFT wallpaper demo","417","33","12.5K","15","09-22"],
    ["royalenfieldcrazy","DaGeHeYhH-w","06-28","Portuguese-language dash wallpaper walkthrough","162","26","5,588","14","09-06"],
    ["suru_2104","DaK8WCKuyOj","06-29","Open Dash background on the round TFT","69","14","6,396","5","09-12"],
    ["bluey_45t","DaS-YWCIP6o","07-02","Portrait wallpaper on a Guerrilla 450","839","19","30.2K","9","11-15"],
    ["igris_450","DaSvRAbTzjn","07-02","Screen-off navigation demonstration","8.3K","","377K","0",""],
    ["ajittt__009__","DaW1tQoNirx","07-04","Open Dash on a Guerrilla 450","112","5","3,148","2","07-04"],
    ["therevvinvinay","DaXBIwHyGer","07-04","Open Dash feature demo","129","6","4,675","1","07-04"],
    ["igris_450","Dap7wn5RT37","07-11","Creator response to the public scope change","6.6K","133","294K","14","10-08"],
    ["aksharsodyssey","Da0vcuwsW4e","07-16","Rebuilding the removed dashboard feature","5.3K","134","256K","15","07-19"],
] as const

const featuredViews: Record<string, string> = {
    "DZ-Bp3TI1AX": "64.6K",
    DZ9sShoIERo: "1.1M",
    "DZ-TzFHz_HR": "5,316",
    DZ8ZUUxzZi6: "110K",
    DZ_9EOfT2dR: "12.8K",
    DaBJApAqSMt: "7,608",
    DaBOnTEzjJQ: "1,697",
}

const launchCohorts = [["Jun 23–27", 36], ["Jun 28–Jul 4", 8], ["Jul 5–16", 2]] as const

// All other weeks in this Google Trends snapshot displayed zero for both terms.
const searchWeeks = [
    [8, "Jan 11", 0, 27],
    [15, "Mar 1", 28, 29],
    [31, "Jun 21", 100, 51],
    [32, "Jun 28", 35, 35],
    [33, "Jul 5", 0, 33],
    [34, "Jul 12", 27, 0],
    [38, "Aug 9", 0, 28],
    [50, "Nov 1", 5, 14],
    [51, "Nov 8", 5, 16],
    [52, "Nov 15", 0, 9],
] as const

const weeklyCount = 53
const weekPosition = (index: number) => (index / (weeklyCount - 1)) * 100

function trendShape(column: 2 | 3, edge = false) {
    const values = new Map<number, number>(searchWeeks.map((row) => [row[0], row[column]]))
    const points = Array.from({ length: weeklyCount }, (_, index) =>
        weekPosition(index) + "% " + (100 - (values.get(index) ?? 0)) + "%"
    )
    if (!edge) return "polygon(0% 100%, " + points.join(", ") + ", 100% 100%)"
    const lowerEdge = Array.from({ length: weeklyCount }, (_, offset) => {
        const index = weeklyCount - 1 - offset
        return weekPosition(index) + "% " + (101.6 - (values.get(index) ?? 0)) + "%"
    })
    return "polygon(" + [...points, ...lowerEdge].join(", ") + ")"
}

const versions = [
    {
        date: "June 17, 2026",
        title: "The earliest archived dashboard build",
        summary: "The first surviving release commit labels this build 1.3, code 13. Its README records end-to-end discovery, connection, streaming, route changes, and voice guidance on the author’s Tripper Dash running firmware 11.63.",
        evidence: "The README documents a working physical setup by June 17. It does not give the date of the first successful run, a test duration, or a list of other compatible displays.",
        link: publicSources.earlyRelease,
        label: "Read the June 17 source checkpoint",
    },
    {
        date: "June 21, 2026",
        title: "The first public wallpaper reveal",
        summary: "I shared the dashboard wallpaper experiment in a Happy Motorcycle Day post. The replies asked how it worked and whether the bike’s normal readouts would stay visible.",
        evidence: "The dated Reddit post documents the public reveal. It leaves the precise app build and phone setup unspecified.",
        link: publicSources.reveal,
        label: "Read the June 21 reveal",
    },
    {
        date: "June 22, 2026",
        title: "1.3 Beta 2 and the ride controls",
        summary: "Build code 14 added GPS filtering, earlier recognition of off-route movement, and ride history on the home screen. Its changelog also lists caller and media cards with joystick controls and smaller per-device APKs.",
        evidence: "These are recorded changes from the archived changelog. Test runs for media controls and calling are still unconfirmed here.",
        link: publicSources.beta2Commit,
        label: "Read the June 22 release commit",
    },
    {
        date: "June 23–24, 2026",
        title: "1.3 and the ColorOS pairing failure",
        summary: "The next build called 1.3, code 15, refreshed the interface and tied Garage and Expenses to the active vehicle. On June 24, a rider testing an Android 11 phone with a Guerrilla 450 reported that the Wi-Fi prompt never appeared. Manual Wi-Fi connection enabled the phone preview, while the Tripper stream still failed.",
        evidence: "The June 24 report describes both the failed automatic pairing attempt and the unsuccessful manual workaround.",
        link: publicSources.pairing,
        label: "Read the pairing issue",
    },
    {
        date: "June 26, 2026",
        title: "1.3.1 and the rider retest",
        summary: "The rider traced the problem on their phone to Android’s Wi-Fi network request and proposed using the active dashboard network. The maintainer reported that a new release included an update. The original reporter confirmed it worked and closed the issue that day.",
        evidence: "The June 26 release commit for code 16 records a ColorOS fallback and a currency selector. The successful retest comment does not name the exact APK or report a longer ride test.",
        link: publicSources.pairingRetest,
        label: "Read the rider’s June 26 retest",
    },
    {
        date: "July 8, 2026",
        title: "Why I changed the public app",
        summary: "After Royal Enfield got in touch and we discussed the project, I announced that future public versions would drop dash pairing, projection, and dash wallpapers. I wanted to continue with the parts of the app that worked independently of the motorcycle’s display.",
        evidence: "The public announcement records my account of the conversations and the decision I shared with riders.",
        link: publicSources.update,
        label: "Read the July 8 announcement",
    },
    {
        date: "July 9, 2026",
        title: "1.3.5 is published",
        summary: "The v1.3.5 release and its universal Android APK appeared on GitHub the following day.",
        evidence: "The APK upload dates to July 9. The release now points to source committed in September, so the current tag alone cannot establish the contents of the earlier binary.",
        link: publicSources.release,
        label: "Read the 1.3.5 release notes",
    },
    {
        date: "September 21, 2026",
        title: "A clean baseline for the phone app",
        summary: "The public repository adopted a new app-only source baseline. It kept route preview, vehicle profiles, service history, expenses, ride history, themes, and phone wallpapers.",
        evidence: "The repository history and updated release notes document the new source. The July APK stayed attached to v1.3.5.",
        link: publicSources.phoneBaseline,
        label: "Read the September source commit",
    },
]

interface OpenDashLandingPageProps {
    style?: React.CSSProperties
    caseStudy?: boolean
    siteRoot?: string
}

const coveredReels = new Map(reels.map((reel) => [reel.href.split("/reel/")[1].split("/")[0], reel]))
const repostIds = new Set<string>(repostEvidence.map(([, id]) => id))
const showcaseReels: ShowcaseReel[] = [
    ...repostEvidence.map(([creator, id, date, title, likes, comments, views]) => {
        const credit = coveredReels.get(id)?.credit ?? (id === "DZ-yySEOSOM" ? "@lorinhosobreduasrodas1 × @thulasiram.basha" : "@" + creator)
        return { id, original: creator, date, title, credit, likes, comments, views }
    }),
    ...Array.from(coveredReels.entries()).filter(([id]) => !repostIds.has(id)).map(([id, reel]) => ({
        id, original: reel.credit.split(" × ")[0].slice(1), credit: reel.credit,
        date: "06-" + reel.date.split(" ")[1].replace(",", ""),
        title: reel.title, likes: reel.likes, comments: reel.comments ?? "", views: featuredViews[id] ?? "",
    })),
]

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
    return <a className="odc-source" href={href}>{children}</a>
}

function CreatorCredits({ labels }: { labels: string }) {
    return <>{labels.split(" × ").map((label, i) => (
        <React.Fragment key={label}>{i > 0 && " × "}<a href={"https://www.instagram.com/" + label.replace(/^@/, "") + "/"}>{label}</a></React.Fragment>
    ))}</>
}

function RedditResponse() {
    return (
        <div className="odc-reddit">
            <h3 className="odc-evidence-heading">Four posts, four stages of the project</h3>
            <p>My June 21 wallpaper reveal drew the most upvotes. Two days later, the full introduction reached more readers and generated the most shares. The video experiment brought a different response, with questions about what the display could do and my own note that maps were lagging. The July 8 update shifted the discussion toward the project’s future.</p>
            <figure className="odc-chart odc-reddit-chart">
                <figcaption>Views reported by Reddit Post Insights</figcaption>
                <ul>{redditPosts.map((post) => (
                    <li key={post.href}>
                        <a href={post.href}>{post.title}<small>{post.date}, 2026</small></a>
                        <span className="odc-bar" aria-hidden="true"><span style={{ width: post.count / 41000 * 100 + "%" }} /></span>
                        <strong>{post.views}</strong>
                    </li>
                ))}</ul>
                <p className="odc-caption">Lifetime post views checked November 21, 2026. The four rounded counters total about 80.5K views.</p>
            </figure>
            <div className="odc-table-scroll" role="region" aria-label="Reddit engagement by post" tabIndex={0}>
                <table className="odc-reddit-table">
                    <caption>Author Insights snapshot · November 21, 2026</caption>
                    <thead><tr><th scope="col">Post</th><th scope="col">Upvotes</th><th scope="col">Upvote ratio</th><th scope="col">Comments</th><th scope="col">Shares</th></tr></thead>
                    <tbody>{redditPosts.map((post) => <tr key={post.href}>
                        <th scope="row"><a href={post.href}>{post.title}</a></th><td>{post.upvotes}</td><td>{post.ratio}</td><td>{post.comments}</td><td>{post.shares}</td>
                    </tr>)}</tbody>
                </table>
            </div>
            <p className="odc-caption">Across these four posts, Insights showed 448 upvotes, 162 comments, and 282 shares. Counts can include repeat readers across posts. The available snapshots establish cumulative response. They provide no daily growth history.</p>
        </div>
    )
}

function RepostArchive({ siteRoot }: { siteRoot: string }) {
    const repostsWithViews = showcaseReels.filter((reel) => repostIds.has(reel.id) && reel.views)
    const topViews = [...repostsWithViews].sort((a, b) => reelCount(b.views) - reelCount(a.views)).slice(0, 5)
    const maxViews = reelCount(topViews[0].views)
    const knownLikes = repostEvidence.map((entry) => entry[4]).filter(Boolean).map(reelCount).sort((a, b) => b - a)
    const likesTotal = knownLikes.reduce((total, count) => total + count, 0)
    const topLikesShare = Math.round((knownLikes[0] + knownLikes[1]) / likesTotal * 100)
    return (
        <div className="odc-repost-archive">
            <h3 className="odc-evidence-heading">The creators who carried it</h3>
            <p>Thanks to the riders who filmed their dashboards, made tutorials, and answered questions. Their Reels turned a small wallpaper feature into something other riders could see and try. Each entry links to the Reel and its creator’s profile.</p>
            <figure className="odc-chart">
                <figcaption>When the reposted Reels were published</figcaption>
                <ul className="odc-cohorts">{launchCohorts.map(([period, count]) => (
                    <li key={period}><span>{period}</span><span className="odc-bar" aria-hidden="true"><span style={{ width: (count / 36) * 100 + "%" }} /></span><strong>{count}</strong></li>
                ))}</ul>
                <p className="odc-caption">36 of {repostEvidence.length} related Reels were published June 23–27. This is the posting pattern in the project’s curated Reposts grid.</p>
            </figure>
            <figure className="odc-chart odc-reel-views">
                <figcaption>Most-viewed Reels with a verified counter</figcaption>
                <ul>{topViews.map(({ id, original, views }) => (
                    <li key={id}>
                        <a href={"https://www.instagram.com/reel/" + id + "/"}>@{original}</a>
                        <span className="odc-bar" aria-hidden="true"><span style={{ width: (reelCount(views) / maxViews) * 100 + "%" }} /></span>
                        <strong>{views}</strong>
                    </li>
                ))}</ul>
                <p className="odc-caption">Cumulative views checked November 16–21, 2026. Instagram displayed verifiable view counts for {repostsWithViews.length} of the {repostEvidence.length} related reposts.</p>
            </figure>
            <p>The two most-viewed Reels in the verified set both showed wallpaper customization. Together they also account for about <strong>{topLikesShare}%</strong> of the visible likes across the {knownLikes.length} related Reels with a like count. Screen-off navigation drew <strong>377K views</strong>, and a later creator response to the scope change drew <strong>294K</strong>.</p>
            <p className="odc-caption">The November 21 rescan found 49 reposted items, comprising 48 Reels and one photo carousel. The analysis covers {repostEvidence.length} related Reels from that tab. The homepage showcase also includes two relevant launch clips verified outside the Reposts grid.</p>
            <p>Of <strong>441 visible comments</strong> sampled across 41 Reels, <strong>171</strong> mentioned links, APKs, or downloads and <strong>12</strong> matched setup or connection terms. Five Reels had a dated November comment in the sample. Instagram’s comment ordering can hide newer replies, and these snapshots give no impressions history.</p>
            <details className="odc-trend-details">
                <summary>Browse all {repostEvidence.length} Reels and creator credits</summary>
                <p className="odc-caption">Counts were checked November 16–21, 2026. Views come from matching View Count badges. A dash means the count wasn’t visible or couldn’t be matched. Posted dates use India time. Latest sampled comment dates use UTC.</p>
                <ul className="odc-repost-list">
                    {repostEvidence.map(([creator, id, date, title, likes, comments, views, sample, latest]) => (
                        <li key={id}>
                            <div>
                                <SourceLink href={"https://www.instagram.com/reel/" + id + "/"}>{title}</SourceLink>
                                <p className="odc-repost-credit"><CreatorCredits labels={showcaseReels.find((reel) => reel.id === id)?.credit ?? "@" + creator} /> <span aria-hidden="true">·</span> <time dateTime={"2026-" + date}>{date.replace("-", "/")}/2026</time></p>
                            </div>
                            <dl>
                                <div><dt>Likes</dt><dd>{likes || "—"}</dd></div>
                                <div><dt>Comments</dt><dd>{comments || "—"}</dd></div>
                                <div><dt>Views</dt><dd>{views || "—"}</dd></div>
                            </dl>
                            <p className="odc-caption">{sample === "0" ? "No dated comment visible in the sample." : sample + " sampled · latest " + latest.replace("-", "/") + "/2026"}</p>
                        </li>
                    ))}
                </ul>
            </details>
            <div className="odc-links">
                <SourceLink href={siteRoot + "/#reels"}>Browse and sort the Reels showcase</SourceLink>
                <SourceLink href="https://www.instagram.com/open.dash/reposts/">Open the project’s Instagram Reposts</SourceLink>
            </div>
        </div>
    )
}

function SearchInterest() {
    return (
        <figure className="odc-chart odc-trends" aria-labelledby="odc-trend-title">
            <figcaption className="odc-trends-heading">
                <div>
                    <strong id="odc-trend-title">Google search interest</strong>
                    <p className="odc-caption">Worldwide web searches · Nov 2025–Nov 2026</p>
                </div>
                <div className="odc-trend-peak"><span>OpenDash peak · Jun 21</span><strong>100</strong></div>
            </figcaption>
            <div className="odc-trend-legend" aria-hidden="true">
                <span><i className="odc-open-color" /> OpenDash</span>
                <span><i className="odc-tripper-color" /> Tripper Dash</span>
            </div>
            <div className="odc-trend-frame" aria-hidden="true">
                <div className="odc-trend-y"><span>100</span><span>50</span><span>0</span></div>
                <div className="odc-trend-plot">
                    <div className="odc-trend-mark" style={{ left: weekPosition(31) + "%" }} />
                    <div className="odc-trend-fill odc-tripper-area" style={{ clipPath: trendShape(3) }} />
                    <div className="odc-trend-fill odc-open-area" style={{ clipPath: trendShape(2) }} />
                    <div className="odc-trend-fill odc-tripper-color" style={{ clipPath: trendShape(3, true) }} />
                    <div className="odc-trend-fill odc-open-color" style={{ clipPath: trendShape(2, true) }} />
                    <div className="odc-trend-dot" style={{ left: weekPosition(31) + "%" }} />
                </div>
                <div className="odc-trend-months">
                    <span>Nov ’25</span><span>Feb</span><span>May</span><span>Aug</span><span>Nov ’26</span>
                </div>
            </div>
            <p className="odc-caption">The June 21 peak week includes the June 23 launch post and the June 24 wallpaper Reels. The timing shows overlap. The broad “OpenDash” term can also match unrelated projects.</p>
            <details className="odc-trend-details">
                <summary>View weekly scores</summary>
                <table>
                    <caption>Weeks starting in 2026 with a nonzero score</caption>
                    <thead><tr><th scope="col">Week</th><th scope="col">OpenDash</th><th scope="col">Tripper Dash</th></tr></thead>
                    <tbody>{searchWeeks.map(([, date, openDash, tripper]) => (
                        <tr key={date}><th scope="row">{date}</th><td>{openDash}</td><td>{tripper}</td></tr>
                    ))}</tbody>
                </table>
                <p className="odc-caption">The other 43 displayed weeks showed zero for both terms. Google scales the series from 0 to 100, and low volume can appear as zero. The last week is partial.</p>
            </details>
            <SourceLink href={publicSources.trends}>Open the Google Trends comparison</SourceLink>
        </figure>
    )
}

/**
 * Open Dash product and case study pages.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 5400
 */
export default function OpenDashLandingPage({ style, caseStudy = false, siteRoot = "" }: OpenDashLandingPageProps) {
    if (!caseStudy) {
        return <ProductPage style={style} entries={showcaseReels} repository={publicSources.repo} release={publicSources.release} siteRoot={siteRoot} />
    }
    return (
        <div className="odc" style={style}>
            <style>{styles}</style>
            <a className="odc-skip" href="#case-study">Skip to case study</a>
            <header className="odc-header" id="top">
                <div className="odc-wrap odc-header-inner">
                    <a className="odc-brand" href={siteRoot + "/"}>
                        <span className="odc-mark" aria-hidden="true" />
                        Open Dash
                    </a>
                    <nav className="odc-header-nav" aria-label="Main navigation">
                        <a className="odc-header-link" href={siteRoot + "/"}>Product</a>
                        <a className="odc-header-link" href={siteRoot + "/#reels"}>Reels</a>
                        <a className="odc-header-link" href={siteRoot + "/case-study/"} aria-current="page">Case study</a>
                    </nav>
                </div>
            </header>
            <main id="case-study" tabIndex={-1}>
                <div className="odc-wrap odc-hero">
                    <div>
                        <p className="odc-kicker">Open Dash case study · 2026</p>
                        <h1>Building for the bike dash<span>.</span></h1>
                        <p className="odc-lead">I built Open Dash around my Himalayan 450. A custom wallpaper and navigation with the phone screen off became a broader experiment in what the dashboard and companion app could do.</p>
                        <a className="odc-primary" href="#versions">Explore the version timeline <span aria-hidden="true">↓</span></a>
                    </div>
                    <figure className="odc-hero-figure">
                        <div className="odc-instrument">
                            <span className="odc-instrument-label">Early prototype</span>
                            <div className="odc-instrument-flow">
                                <div><span>Android phone</span><strong>Render the ride view</strong></div>
                                <span className="odc-flow-arrow" aria-hidden="true">↓</span>
                                <div><span>Wi-Fi video stream</span><strong>Display it on the dash</strong></div>
                            </div>
                        </div>
                        <figcaption>Schematic of the original projection path.</figcaption>
                    </figure>
                </div>

                <div className="odc-wrap odc-layout">
                    <aside>
                        <nav className="odc-nav" aria-label="Case study sections">
                            <p>On this page</p>
                            <ul>{chapters.map(([id, title]) => <li key={id}><a href={"#" + id}>{title}</a></li>)}</ul>
                        </nav>
                    </aside>

                    <article className="odc-story" aria-label="Open Dash project history">
                        <section id="origin" aria-labelledby="origin-title">
                            <h2 id="origin-title">I wanted my own wallpaper on the dash</h2>
                            <p>That was the reason I built the wallpaper feature. Navigation raised a separate question. If the phone stayed busy displaying the map, I couldn’t put its screen to sleep. Heat, battery use, and lag made me want to try a different approach.</p>
                            <p>NorthStar showed how to render maps off-screen, building on work from better-dash. I used that foundation to explore which other tools belonged with navigation. The June introduction put ride history, expenses, and maintenance into the same workflow and asked riders to try the app on their own equipment.</p>
                            <p>I approached it as a UX developer. Wallpapers, a Material 3 interface, and keeping ride information together mattered to me. It began around my own use, and I said openly that I didn’t yet know whether it would behave the same way on everyone’s phone and dash.</p>
                            <div className="odc-links">
                                <SourceLink href={publicSources.introduction}>Project introduction</SourceLink>
                                <SourceLink href={publicSources.notice}>Project attribution</SourceLink>
                            </div>
                        </section>

                        <section id="design" aria-labelledby="design-title">
                            <h2 id="design-title">The phone generated a separate picture</h2>
                            <p>In the early design, sharing a destination into Open Dash led to a route preview. The Android app rendered a dedicated frame away from the phone’s visible interface, encoded it with Android’s H.264 hardware encoder, and sent the video to the dashboard over Wi-Fi.</p>
                            <ol className="odc-pipeline">
                                <li><strong>Plan</strong><span>Accept a destination and calculate a route.</span></li>
                                <li><strong>Render</strong><span>Draw a view sized for the dashboard.</span></li>
                                <li><strong>Stream</strong><span>Encode and send while the phone display can stay off.</span></li>
                            </ol>
                            <p>This created separate checkpoints. The phone could show a working map while Wi-Fi association, dashboard authentication, or video playback still failed. A test of the visible phone UI covered only the first part of the path.</p>
                            <SourceLink href={publicSources.archive}>Read the archived architecture</SourceLink>
                        </section>

                        <section id="versions" aria-labelledby="versions-title">
                            <h2 id="versions-title">Versions and turning points</h2>
                            <p>Public records trace the dashboard experiment, the early beta features, a rider-tested pairing fix, and the change in direction for public releases.</p>
                            <ol className="odc-timeline">
                                {versions.map((entry) => (
                                    <li key={entry.title}>
                                        <div className="odc-date">{entry.date}</div>
                                        <div>
                                            <h3>{entry.title}</h3>
                                            <p>{entry.summary}</p>
                                            <p className="odc-evidence">{entry.evidence}</p>
                                            <SourceLink href={entry.link}>{entry.label}</SourceLink>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section id="testing" aria-labelledby="testing-title">
                            <h2 id="testing-title">Testing through v1.3.5</h2>
                            <p>The June 17 README records a successful end-to-end run on the author’s Tripper Dash with firmware 11.63. A rider with the same firmware later reported that their Himalayan 450 timed out during the handshake. Firmware alone couldn’t tell someone whether their whole setup would connect.</p>
                            <p>On the Guerrilla 450, the phone could see the dashboard network and draw the map, yet the dash received no usable stream. The original rider’s retest made this more than a bug report. It established that the update worked for that rider’s setup.</p>
                            <p>In the June 23 video experiment, I was trying to understand the display’s limits while improving maps. My comment records that maps were lagging. That post leaves the exact build, phone, and firmware unspecified, so it establishes an observed limitation without a measured frame-rate result.</p>
                            <dl className="odc-test-list">
                                <div><dt>Build and source</dt><dd>The archived 1.3.1 changelog records a fallback for Android 11 and ColorOS and a guard against authenticating with only a network name prefix.</dd></div>
                                <div><dt>Android phone</dt><dd>The reporter observed a rendered map on the phone after manual Wi-Fi connection in 1.3.</dd></div>
                                <div><dt>Physical dashboard</dt><dd>The original rider reported the fix worked after the maintainer announced an update. Their comment leaves firmware, exact build, and test duration unspecified.</dd></div>
                            </dl>
                            <h3 className="odc-evidence-heading">A wallpaper on a parked Guerrilla 450</h3>
                            <p>The June 24 tutorial by The GRR Life shows a rider selecting and cropping an image in Open Dash. The final shot shows the custom image on the motorcycle’s physical Tripper Dash. The video documents idle wallpaper playback on that setup. The exact app build and firmware are unspecified.</p>
                            <div className="odc-links">
                                <SourceLink href={publicSources.wallpaperReel}>Watch the June 24 dashboard tutorial</SourceLink>
                                <SourceLink href={publicSources.videoExperiment}>Read the June 23 video experiment</SourceLink>
                                <SourceLink href={publicSources.earlyTestNote}>June 17 hardware note</SourceLink>
                                <SourceLink href={publicSources.introduction}>Himalayan 450 compatibility discussion</SourceLink>
                                <SourceLink href={publicSources.pairing}>ColorOS failure report</SourceLink>
                                <SourceLink href={publicSources.release13Commit}>1.3 release commit</SourceLink>
                                <SourceLink href={publicSources.pairingRetest}>Reporter’s confirmation</SourceLink>
                                <SourceLink href={publicSources.changelog131}>1.3.1 changelog</SourceLink>
                                <SourceLink href={publicSources.riders}>Rider report and dashboard photo</SourceLink>
                            </div>
                        </section>

                        <section id="response" aria-labelledby="response-title">
                            <h2 id="response-title">How riders responded</h2>
                            <p>Screen-off navigation and pairing reliability kept coming up in public threads. The issue tracker also showed interest in app-only tools, including currencies, account setup, and offline routes with GPX import.</p>
                            <SearchInterest />
                            <RedditResponse />
                            <h3 className="odc-evidence-heading" id="reels-title">Launch-week Reels</h3>
                            <div className="odc-reels" role="list" aria-labelledby="reels-title">
                                {reels.map((reel) => (
                                    <article className="odc-reel" role="listitem" key={reel.href}>
                                        <p className="odc-reel-date">{reel.date} · <CreatorCredits labels={reel.credit} /></p>
                                        <h4><SourceLink href={reel.href}>{reel.title}</SourceLink></h4>
                                        <p>{reel.description}</p>
                                        <p className="odc-reel-counts"><strong>{reel.likes}</strong> likes <span aria-hidden="true">·</span> {reel.comments ? <><strong>{reel.comments}</strong> comments</> : "Comment count unavailable"} <span aria-hidden="true">·</span> <strong>{featuredViews[reel.href.split("/reel/")[1].split("/")[0]]}</strong> views</p>
                                    </article>
                                ))}
                            </div>
                            <p className="odc-caption">Post dates are in India Standard Time. Public counts were checked November 16–21, 2026. Instagram rounds larger totals.</p>
                            <SourceLink href={publicSources.instagram}>Browse the Open Dash Instagram profile</SourceLink>
                            <RepostArchive siteRoot={siteRoot} />
                            <dl className="odc-stats" aria-label="GitHub snapshot on November 16, 2026">
                                <div><dt>APK downloads</dt><dd>3,151</dd></div>
                                <div><dt>Repository stars</dt><dd>82</dd></div>
                                <div><dt>Reported forks</dt><dd>64</dd></div>
                            </dl>
                            <p className="odc-caption">GitHub snapshot on November 16, 2026. Downloads count requests for the v1.3.5 APK. This figure cannot establish installs or unique riders.</p>
                            <figure className="odc-chart">
                                <figcaption>Dated forks in the public API</figcaption>
                                <ul>{forkHistory.map(([month, count]) => (
                                    <li key={month}>
                                        <span>{month}</span>
                                        <span className="odc-bar" aria-hidden="true"><span style={{ width: (count / 18) * 100 + "%" }} /></span>
                                        <strong>{count}</strong>
                                    </li>
                                ))}</ul>
                                <p className="odc-caption">32 of the 53 dated forks were created in June or July. *November covers days 1–16.</p>
                            </figure>
                            <div className="odc-links">
                                <SourceLink href={publicSources.releaseData}>GitHub asset count</SourceLink>
                                <SourceLink href={publicSources.forks}>GitHub fork dates</SourceLink>
                                <SourceLink href={publicSources.trendsMethod}>Google Trends methodology</SourceLink>
                            </div>
                        </section>

                        <section className="odc-end" id="status" aria-labelledby="status-title">
                            <h2 id="status-title">Where Open Dash stands</h2>
                            <p>The public repository now describes an independent phone app for route preview, vehicles, maintenance, expenses, and ride records. Dashboard pairing, projection, and hardware controls belong to the earlier experiment.</p>
                            <p>The early work demonstrated a way to send a purpose-built ride view to the dash. Community testing exposed how quickly that experience could vary across phones. The change in public scope preserved tools riders could use on the phone across a wider range of motorcycles.</p>
                            <div className="odc-links">
                                <SourceLink href={publicSources.repo}>Read the current project scope</SourceLink>
                                <SourceLink href={publicSources.update}>Read the scope-change announcement</SourceLink>
                                <SourceLink href={publicSources.gpx}>Read the offline routes request</SourceLink>
                            </div>
                        </section>
                    </article>
                </div>
            </main>
            <footer className="odc-footer">
                <div className="odc-wrap odc-header-inner">
                    <span>Open Dash</span>
                    <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
                </div>
            </footer>
        </div>
    )
}

addPropertyControls(OpenDashLandingPage, {
    caseStudy: { type: ControlType.Boolean, title: "Case study", defaultValue: false },
})

const styles = `
.odc {
    --base: #f6f8f3;
    --panel: #fcfdf9;
    --edge: #d4dcd4;
    --ink: #101412;
    --muted: #526054;
    --gold: #35593d;
    --teal: #2c695d;
    background: var(--base);
    color: var(--ink);
    font-family: "Geist", "Inter", system-ui, sans-serif;
    font-size: 17px;
    line-height: 1.65;
    position: relative;
    width: 100%;
    min-width: 0;
}
.odc *, .odc *::after, .odc *::before { box-sizing: border-box; }
.odc a { color: inherit; text-underline-offset: .24em; }
.odc a:focus-visible { outline: 2px solid var(--teal); outline-offset: 4px; border-radius: 3px; }
.odc p { margin: 0; }
.odc h1, .odc h2, .odc h3 { margin: 0; text-wrap: balance; }
.odc-wrap { width: min(1160px, 100%); margin-inline: auto; padding-inline: clamp(20px, 4vw, 40px); }
.odc-header, .odc-footer { border-block-end: 1px solid var(--edge); }
.odc-header-inner { min-height: 72px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0 16px; padding-block: 8px; }
.odc-header-nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0 18px; }
.odc-header-nav a { min-height: 44px; display: inline-flex; align-items: center; }
.odc-header-nav a[aria-current="page"] { text-decoration: underline; text-underline-offset: 5px; }
.odc-brand, .odc-header-link, .odc-footer a { min-height: 44px; display: inline-flex; align-items: center; gap: 10px; }
.odc-brand { font-weight: 750; text-decoration: none; white-space: nowrap; flex: none; }
.odc-mark { position: relative; width: 25px; height: 25px; border: 2px solid currentColor; border-radius: 50%; }
.odc-mark::after { content: ""; position: absolute; width: 2px; height: 9px; left: 50%; top: 4px; background: currentColor; transform: rotate(44deg); transform-origin: bottom center; }
.odc-header-link, .odc-footer a { color: var(--muted); font-size: .875rem; font-weight: 600; }
.odc-skip { position: absolute; inset-block-start: 8px; inset-inline-start: 12px; z-index: 2; padding: 10px 14px; background: var(--panel); transform: translateY(-160%); }
.odc-skip:focus { transform: translateY(0); }
.odc-hero { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, .85fr); gap: clamp(28px, 6vw, 82px); align-items: center; padding-block: clamp(46px, 9vw, 118px); }
.odc-kicker, .odc-instrument-label, .odc-date { color: var(--gold); font-size: .8125rem; font-weight: 700; letter-spacing: .065em; }
.odc h1 { margin-block: 12px 24px; font-size: clamp(2.65rem, 6vw, 5.2rem); line-height: 1.02; letter-spacing: -.062em; }
.odc h1 span { color: var(--gold); }
.odc .odc-lead { font-size: clamp(1.02rem, 2vw, 1.25rem); color: var(--muted); max-width: 46ch; }
.odc a.odc-primary { display: inline-flex; align-items: center; gap: 14px; min-height: 48px; padding: 10px 16px; margin-block-start: 24px; background: #15241a; color: white; border-radius: 7px; font-weight: 700; font-size: .875rem; text-decoration: none; }
.odc a.odc-primary:hover { background: var(--gold); text-decoration: underline; }
.odc-hero-figure, .odc-chart { margin: 0; min-width: 0; }
.odc-instrument {
    background: radial-gradient(ellipse at 94% -8%, #dde8d7 0%, transparent 66%), var(--panel);
    border: 1px solid var(--edge);
    border-radius: 18px;
    padding: clamp(16px, 3vw, 30px);
}
.odc-instrument-flow { margin-block-start: 20px; display: grid; gap: 10px; }
.odc-instrument-flow div { display: grid; gap: 3px; border: 1px solid var(--edge); border-radius: 9px; padding: 14px; background: #f6f8f3; }
.odc-instrument-flow div span { font-size: .8125rem; color: var(--muted); }
.odc-flow-arrow { color: var(--teal); line-height: 1; margin-inline-start: 14px; }
.odc-hero-figure figcaption, .odc .odc-caption { margin-block-start: 10px; color: var(--muted); font-size: .8125rem; line-height: 1.5; }
.odc-layout { display: grid; grid-template-columns: minmax(150px, .7fr) minmax(0, 3fr); gap: clamp(24px, 5vw, 72px); padding-block: 20px 90px; }
.odc-layout aside { min-width: 0; }
.odc-nav { position: sticky; inset-block-start: 20px; padding-block-start: 8px; }
.odc-nav p { color: var(--muted); font-weight: 700; font-size: .8125rem; margin-block-end: 6px; }
.odc-nav ul { list-style: none; margin: 0; padding: 0; }
.odc-nav a { display: inline-flex; align-items: center; min-height: 44px; font-size: .875rem; }
.odc-nav a:hover, .odc-source:hover { color: var(--gold); }
.odc-story { min-width: 0; }
.odc-story section { scroll-margin-block-start: 28px; margin-block-end: clamp(52px, 9vw, 92px); }
.odc-story h2 { font-size: clamp(1.75rem, 4vw, 2.8rem); line-height: 1.12; letter-spacing: -.043em; margin-block-end: 18px; }
.odc-story h3 { font-size: clamp(1.2rem, 2.5vw, 1.55rem); line-height: 1.24; letter-spacing: -.024em; margin-block-end: 8px; }
.odc-story .odc-evidence-heading { margin-block-start: 24px; }
.odc-story p { max-width: 65ch; overflow-wrap: break-word; }
.odc-story p + p { margin-block-start: 12px; }
.odc-links { display: flex; flex-wrap: wrap; gap: 0 20px; margin-block-start: 8px; }
.odc a.odc-source { color: var(--teal); display: inline-flex; align-items: center; min-height: 44px; font-size: .875rem; font-weight: 650; }
.odc a.odc-source:hover { color: var(--gold); }
.odc-pipeline { list-style: none; padding: 0; margin: 20px 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.odc-pipeline li { display: grid; align-content: start; gap: 5px; padding: 16px; border-block-start: 2px solid var(--gold); background: var(--panel); border-radius: 4px 4px 10px 10px; }
.odc-pipeline span { color: var(--muted); font-size: .875rem; line-height: 1.5; }
.odc-timeline { list-style: none; margin: 24px 0 0; padding: 0; }
.odc-timeline li { display: grid; grid-template-columns: minmax(110px, .85fr) minmax(0, 4fr); gap: 18px; padding-block: 21px; border-block-start: 1px solid var(--edge); }
.odc-date { padding-block-start: 2px; letter-spacing: .01em; }
.odc-evidence { color: var(--muted); font-size: .9375rem; }
.odc-test-list { display: grid; gap: 12px; margin-block: 20px; }
.odc-test-list div { display: grid; grid-template-columns: minmax(110px, .85fr) minmax(0, 4fr); gap: 16px; padding: 14px; border: 1px solid var(--edge); border-radius: 8px; }
.odc-test-list dt, .odc-stats dt { font-size: .875rem; color: var(--gold); font-weight: 650; }
.odc-test-list dd, .odc-stats dd { margin: 0; }
.odc-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 22px 0 0; }
.odc-stats div { display: flex; flex-direction: column-reverse; justify-content: start; align-items: start; gap: 4px; padding: 12px; border-block-start: 1px solid var(--edge); }
.odc-stats dd { color: var(--ink); font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 720; line-height: 1.1; font-variant-numeric: tabular-nums; }
.odc-stats dt { color: var(--muted); }
.odc-chart { padding: clamp(16px, 3vw, 24px); border: 1px solid var(--edge); background: var(--panel); border-radius: 10px; margin-block: 24px; }
.odc-chart figcaption { font-weight: 700; }
.odc-chart ul { display: grid; gap: 10px; list-style: none; margin: 14px 0 0; padding: 0; }
.odc-chart li { display: grid; grid-template-columns: 3em minmax(0, 1fr) 2ch; gap: 10px; align-items: center; font-size: .875rem; font-variant-numeric: tabular-nums; }
.odc-bar { height: 10px; background: #dce7d7; border-radius: 6px; }
.odc-bar span { display: block; height: 100%; background: var(--teal); border-radius: inherit; }
.odc-trends { background: linear-gradient(150deg, #e7efe0 0%, var(--panel) 72%); }
.odc-trends-heading { display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 14px; }
.odc-trends-heading #odc-trend-title { font-size: 1.25rem; }
.odc-trends-heading .odc-caption { margin-block-start: 3px; font-weight: 400; }
.odc-trend-peak { display: grid; gap: 2px; }
.odc-trend-peak span { color: var(--muted); font-size: .75rem; }
.odc-trend-peak strong { color: var(--gold); font-size: 1.75rem; line-height: 1; font-variant-numeric: tabular-nums; }
.odc-trend-legend { display: flex; flex-wrap: wrap; gap: 4px 16px; margin-block: 16px; color: var(--muted); font-size: .8125rem; }
.odc-trend-legend span { display: inline-flex; align-items: center; gap: 7px; }
.odc-trend-legend i { width: 9px; height: 9px; border-radius: 2px; }
.odc-open-color { background: var(--gold); }
.odc-tripper-color { background: #407f9a; }
.odc-trend-frame { display: grid; grid-template-columns: 2rem minmax(0, 1fr); grid-template-rows: clamp(118px, 25vw, 196px) auto; gap: 7px; font-variant-numeric: tabular-nums; }
.odc-trend-y { display: flex; flex-direction: column; justify-content: space-between; color: var(--muted); font-size: .75rem; line-height: 1; }
.odc-trend-plot { position: relative; border-block: 1px solid var(--edge); background: linear-gradient(var(--edge), var(--edge)) center / 100% 1px no-repeat; }
.odc-trend-fill, .odc-trend-mark, .odc-trend-dot { position: absolute; }
.odc-trend-fill { inset: 0; }
.odc-tripper-area { background: #407f9a; opacity: .65; }
.odc-open-area { background: var(--gold); opacity: .55; }
.odc-trend-mark { top: 0; bottom: 0; border-inline-start: 1px dashed var(--gold); opacity: .8; }
.odc-trend-dot { top: 0; width: 9px; height: 9px; transform: translate(-50%, -50%); background: var(--gold); border: 1px solid var(--base); border-radius: 50%; }
.odc-trend-months { grid-column: 2; display: flex; justify-content: space-between; gap: 3px; color: var(--muted); font-size: clamp(.625rem, 2vw, .75rem); }
.odc-trend-details { margin-block-start: 12px; }
.odc-trend-details summary { cursor: pointer; padding-block: 10px; color: var(--teal); font-size: .875rem; font-weight: 650; min-height: 44px; }
.odc-trend-details summary:focus-visible { outline: 2px solid var(--teal); outline-offset: 4px; }
.odc-trend-details table { border-collapse: collapse; width: 100%; text-align: left; font-size: .8125rem; margin-block: 8px; }
.odc-trend-details caption { color: var(--muted); text-align: left; padding-block-end: 6px; }
.odc-trend-details th, .odc-trend-details td { border-block-end: 1px solid var(--edge); padding: 6px 5px; font-variant-numeric: tabular-nums; }
.odc-reels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-block: 14px 8px; }
.odc-reel { min-width: 0; display: flex; flex-direction: column; align-items: start; gap: 7px; border: 1px solid var(--edge); border-radius: 9px; background: var(--panel); padding: 13px; }
.odc-reel h4 { margin: 0; line-height: 1.3; }
.odc-reel h4 .odc-source { line-height: 1.3; }
.odc-reel p { font-size: .8125rem; line-height: 1.5; margin: 0; }
.odc-reel-date { color: var(--muted); }
.odc-reel p.odc-reel-counts { margin-block-start: auto; padding-block-start: 8px; font-variant-numeric: tabular-nums; color: var(--muted); }
.odc-reel-counts strong { color: var(--gold); }
.odc-repost-archive { margin-block-start: 28px; }
.odc-repost-archive .odc-cohorts li { grid-template-columns: minmax(5.8rem, auto) minmax(0, 1fr) 2ch; }
.odc-reel-views li { grid-template-columns: minmax(0, 10.25rem) minmax(1.8rem, 1fr) 5ch; }
.odc-reel-views li a { display: inline-flex; align-items: center; min-height: 44px; overflow-wrap: anywhere; }
.odc-reddit-chart li { grid-template-columns: minmax(0, 10rem) minmax(1.8rem, 1fr) 5ch; }
.odc-reddit-chart li a { min-height: 44px; display: flex; flex-direction: column; justify-content: center; line-height: 1.35; }
.odc-reddit-chart small { display: block; color: var(--muted); font-size: .75rem; margin-top: 3px; }
.odc-table-scroll { overflow-x: auto; border: 1px solid var(--edge); border-radius: 9px; margin-block: 20px; }
.odc-table-scroll:focus-visible { outline: 2px solid var(--teal); outline-offset: 4px; }
.odc-reddit-table { border-collapse: collapse; width: 100%; font-size: .8125rem; text-align: left; font-variant-numeric: tabular-nums; }
.odc-reddit-table caption { text-align: left; color: var(--muted); padding: 12px; }
.odc-reddit-table th, .odc-reddit-table td { padding: 10px 12px; border-block-start: 1px solid var(--edge); }
.odc-reddit-table thead th { background: #e7efe0; font-weight: 650; }
.odc-reddit-table tbody th { min-width: 9rem; font-weight: 650; }
.odc-reddit-table a { display: inline-flex; align-items: center; min-height: 44px; }
.odc-repost-list { list-style: none; margin: 12px 0 0; padding: 0; }
.odc-repost-list li { border-block-start: 1px solid var(--edge); padding-block: 12px; display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(168px, 1fr); column-gap: 14px; }
.odc-repost-list li > .odc-caption { grid-column: 1 / -1; }
.odc-repost-credit { color: var(--muted); font-size: .8125rem; overflow-wrap: anywhere; }
.odc-repost-list dl { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 5px; margin: 10px 0 0; font-size: .8125rem; font-variant-numeric: tabular-nums; }
.odc-repost-list dt { color: var(--muted); font-size: .75rem; }
.odc-repost-list dd { margin: 0; font-weight: 650; }
.odc-story .odc-end { margin-block-end: 0; }
.odc-footer { border-block-start: 1px solid var(--edge); border-block-end: 0; font-weight: 650; }
@media (max-width: 740px) {
    .odc-reels { grid-template-columns: minmax(0, 1fr); }
    .odc-hero, .odc-layout { grid-template-columns: minmax(0, 1fr); }
    .odc-hero { padding-block-end: 30px; }
    .odc-hero-figure { max-width: 430px; }
    .odc-nav { position: static; border-block: 1px solid var(--edge); padding-block: 10px 4px; }
    .odc-nav ul { display: flex; flex-wrap: wrap; column-gap: 16px; }
}
@media (max-width: 460px) {
    .odc-repost-list li { grid-template-columns: minmax(0,1fr); }
    .odc-pipeline, .odc-timeline li, .odc-test-list div { grid-template-columns: minmax(0, 1fr); }
    .odc-pipeline li { border-block-start: 0; border-inline-start: 2px solid var(--gold); }
    .odc-timeline li, .odc-test-list div { gap: 6px; }
    .odc-stats { gap: 6px; }
    .odc-stats div { padding-inline: 4px; }
}
`
