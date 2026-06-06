const PLAUSIBLE_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || "https://plausible.io"
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ""

type PageEvent = "component" | "theme" | "block" | "template" | "cli" | "search" | "showcase"

export function trackPageview(slug?: string) {
  if (typeof window === "undefined" || !PLAUSIBLE_DOMAIN) return
  try {
    const u = new URLSearchParams()
    u.set("url", window.location.href)
    u.set("domain", PLAUSIBLE_DOMAIN)
    if (slug) u.set("name", slug)
    navigator.sendBeacon(`${PLAUSIBLE_URL}/api/event`, JSON.stringify({
      name: "pageview",
      url: window.location.href,
      domain: PLAUSIBLE_DOMAIN,
    }))
  } catch {}
}

export function trackEvent(event: PageEvent, label?: string) {
  if (typeof window === "undefined" || !PLAUSIBLE_DOMAIN) return
  try {
    navigator.sendBeacon(`${PLAUSIBLE_URL}/api/event`, JSON.stringify({
      name: event,
      url: window.location.href,
      domain: PLAUSIBLE_DOMAIN,
      props: label ? { label } : undefined,
    }))
  } catch {}
}

export function trackSearch(query: string, resultsCount: number) {
  trackEvent("search", `${query}:${resultsCount}`)
}
