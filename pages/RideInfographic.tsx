import * as React from "react"

const stages = [
    { name: "Plan the route", detail: "Preview where you’re headed before you head out.", kind: "route" },
    { name: "Keep the ride", detail: "Look back on past rides and the bike you took.", kind: "history" },
    { name: "Care for the bike", detail: "Keep your bikes and service records together.", kind: "care" },
] as const

function StageIcon({ kind }: { kind: typeof stages[number]["kind"] }) {
    return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {kind === "route" ? <><circle cx="7" cy="25" r="3" /><circle cx="25" cy="7" r="3" /><path d="M7 22v-6a5 5 0 0 1 5-5h8a5 5 0 0 0 5-5M25 10v7a5 5 0 0 1-5 5h-3" /></> : kind === "history" ? <><path d="M5 10a12 12 0 1 1-1 12M4 4v7h7" /><path d="M16 9v8l5 3" /></> : <><path d="m19 5 1 6 5 3 4-4a9 9 0 0 1-11 12L9 30l-6-6 10-9A9 9 0 0 1 19 5Z" /><circle cx="7" cy="25" r="1" /></>}
    </svg>
}

export function RideInfographic() {
    return <section className="ods-ride" aria-labelledby="ods-ride-title">
        <h2 id="ods-ride-title">Before the ride. After the ride.</h2>
        <p className="ods-ride-lead">A little planning. A lot of riding. One place to keep it together.</p>
        <ol className="ods-ride-flow">{stages.map((stage, index) => <li key={stage.kind}>
            <div className="ods-stage-symbol"><StageIcon kind={stage.kind} /></div>
            <span className="ods-stage-number">0{index + 1}</span><h3>{stage.name}</h3><p>{stage.detail}</p>
        </li>)}</ol>
    </section>
}
