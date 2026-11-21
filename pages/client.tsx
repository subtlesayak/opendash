import * as React from "react"
import { hydrateRoot } from "react-dom/client"
import OpenDashLandingPage from "../OpenDashCaseStudy"

const root = document.getElementById("root")
if (!root) throw new Error("The page root is missing.")

hydrateRoot(root, <OpenDashLandingPage caseStudy={root.dataset.page === "case-study"} reelsPage={root.dataset.page === "reels"} trendsPage={root.dataset.page === "trends"} siteRoot="/opendash" />)
