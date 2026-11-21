import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"
import { createHash } from "node:crypto"

const source = await readFile("OpenDashCaseStudy.tsx", "utf8")
const dataset = JSON.parse(await readFile("public/data/reels.json", "utf8"))
const credits = JSON.parse(await readFile("public/media/credits.json", "utf8"))
const block = source.split("const repostEvidence = [")[1].split("] as const")[0]
const sourceRows = [...block.matchAll(/^\s*(\[[^\n]+\]),?$/gm)].map((match) => JSON.parse(match[1]))
const parseCounter = (value) => value ? Math.round(Number(value.replaceAll(",", "").replace(/[KM]$/, "")) * (value.endsWith("M") ? 1e6 : value.endsWith("K") ? 1e3 : 1)) : null

assert.equal(dataset.reels.length, sourceRows.length + 2)
assert.equal(new Set(dataset.reels.map((reel) => reel.id)).size, dataset.reels.length)
for (const [, id, date, , likes, comments, views, sample, latest] of sourceRows) {
    const reel = dataset.reels.find((entry) => entry.id === id)
    assert.ok(reel, `Missing Reel ${id}`)
    assert.equal(reel.date, "2026-" + date)
    assert.equal(reel.likes, parseCounter(likes), `${id} likes`)
    assert.equal(reel.comments, parseCounter(comments), `${id} comments`)
    assert.equal(reel.views, parseCounter(views), `${id} views`)
    assert.equal(reel.sampledComments, Number(sample))
    assert.equal(reel.latestSampledCommentDate, latest ? "2026-" + latest : null)
}
const imageFiles = await readdir("public/media/reels")
assert.equal(imageFiles.length, dataset.reels.length)
for (const reel of dataset.reels) {
    const attribution = credits.reels.find((entry) => entry.id === reel.id)
    assert.ok(attribution, `Missing thumbnail attribution ${reel.id}`)
    assert.deepEqual(reel.credits, attribution.credits)
    const image = await readFile(`public/media/reels/${reel.id}.jpg`)
    assert.equal(createHash("sha256").update(image).digest("hex"), attribution.sha256)
}
const views = dataset.reels.map((reel) => reel.views).sort((a, b) => a - b)
const totalViews = views.reduce((sum, value) => sum + value, 0)
const median = (views[Math.floor((views.length - 1) / 2)] + views[Math.floor(views.length / 2)]) / 2
const sum = (field) => dataset.reels.reduce((total, reel) => total + (reel[field] ?? 0), 0)
assert.equal(sum("sampledComments"), dataset.commentSample.comments)
console.log(JSON.stringify({
    reels: views.length,
    views: totalViews,
    medianViews: median,
    topTwoViewShare: (views.at(-1) + views.at(-2)) / totalViews * 100,
    likes: sum("likes"),
    likesCoverage: dataset.reels.filter((reel) => reel.likes !== null).length,
    comments: sum("comments"),
    commentsCoverage: dataset.reels.filter((reel) => reel.comments !== null).length,
    launchWeekReels: dataset.reels.filter((reel) => reel.date >= "2026-06-23" && reel.date <= "2026-06-27").length,
    sampledComments: dataset.commentSample.comments,
    sampledReels: dataset.reels.filter((reel) => reel.sampledComments > 0).length,
    novemberCommentReels: dataset.reels.filter((reel) => reel.latestSampledCommentDate?.startsWith("2026-11")).length,
}, null, 2))
