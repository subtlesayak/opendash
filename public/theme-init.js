// Apply the saved theme before the page paints; no network or account storage.
(() => {
    let theme = "hanle"
    try {
        const saved = localStorage.getItem("opendash-theme")
        if (saved === "light" || saved === "dark") theme = saved
    } catch { /* The default theme also works without storage. */ }
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", { hanle: "#10100f", light: "#ffffff", dark: "#14171a" }[theme])
})()
