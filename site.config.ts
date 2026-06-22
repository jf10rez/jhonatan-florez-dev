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

export type MetricsConfig = Record<string, never>

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
  email: "jhonatan-florez@ilaxus.com",
  social: {
    github: "https://github.com/jf10rez",
    npm: "https://www.npmjs.com/~jf10rez",
    linkedin: "https://www.linkedin.com/in/jhonatan-florez-0ba28316b",
  },
  palette: {
    bg: "#050505",
    accent: "#ff3b30",
    text: "#ffffff",
    secondary: "#a1a1aa",
  },
  nav: [
    { id: "hero", labelKey: "nav.hero" },
    { id: "about", labelKey: "nav.about" },
    { id: "projects", labelKey: "nav.projects" },
    { id: "contact", labelKey: "nav.contact" },
  ],
  brand: "personal",
}
