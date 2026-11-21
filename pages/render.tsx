import * as React from "react"
import { renderToString } from "react-dom/server"
import OpenDashLandingPage from "../OpenDashCaseStudy"

export function render(caseStudy: boolean, reelsPage = false) {
    return renderToString(<OpenDashLandingPage caseStudy={caseStudy} reelsPage={reelsPage} siteRoot="/opendash" />)
}
