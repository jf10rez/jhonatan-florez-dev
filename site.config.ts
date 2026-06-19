export type Palette = {
  bg: string
  accent: string
  text: string
  secondary: string
}

export type Social = {
  github: string
  npm: string
  linkedin: string
}

export type NavSection = {
  id: string
  labelKey: string
}

export type Brand = "personal"

export type SiteConfig = {
  name: string
  role: string
  domain: string
  email: string
  social: Social
  palette: Palette
  nav: NavSection[]
  brand: Brand
}

export const siteConfig: SiteConfig = {
  name: "Jhonatan Florez",
  role: "Full Stack Engineer",
  domain: "jhonatan.dev",
  email: "hello@jhonatan.dev",
  social: {
    github: "https://github.com/jhonatanflorez",
    npm: "https://www.npmjs.com/~jhonatanflorez",
    linkedin: "https://www.linkedin.com/in/jhonatanflorez",
  },
  palette: {
    bg: "#050505",
    accent: "#ff3b30",
    text: "#ffffff",
    secondary: "#a1a1aa",
  },
  nav: [
    { id: "about", labelKey: "nav.about" },
    { id: "principles", labelKey: "nav.principles" },
    { id: "experience", labelKey: "nav.experience" },
    { id: "systems", labelKey: "nav.systems" },
    { id: "selected-work", labelKey: "nav.selectedWork" },
    { id: "infrastructure", labelKey: "nav.infrastructure" },
    { id: "live-metrics", labelKey: "nav.liveMetrics" },
    { id: "contact", labelKey: "nav.contact" },
  ],
  brand: "personal",
}
