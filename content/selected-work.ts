export type SelectedWork = {
  id: string
  title: string
  company: string
  role: string
  stack: string[]
  screenshots: string[]
  link?: string
  nda: true
}

export const selectedWork: SelectedWork[] = [
  {
    id: "ilaxus",
    title: "Ilaxus.com",
    company: "Ilaxus",
    role: "CEO & Founder",
    stack: ["AI Automation", "Next.js", "TypeScript", "OpenAI", "n8n", "Make"],
    screenshots: ["/work/ilaxus-1.png"],
    link: "https://ilaxus.com",
    nda: true,
  },
  {
    id: "enterprise-platform",
    title: "Enterprise Automation Platform",
    company: "integ.ro",
    role: "Lead Full Stack Engineer",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    screenshots: ["/work/proj1-1.png", "/work/proj1-2.png"],
    nda: true,
  },
  {
    id: "ai-triage",
    title: "AI Support Triage",
    company: "integ.ro",
    role: "Full Stack Engineer",
    stack: ["TypeScript", "OpenAI", "Redis", "NestJS"],
    screenshots: ["/work/proj2-1.png"],
    nda: true,
  },
  {
    id: "analytics-dashboard",
    title: "Real-time Analytics Dashboard",
    company: "integ.ro",
    role: "Frontend Engineer",
    stack: ["Next.js", "Tailwind CSS", "D3", "PostgreSQL"],
    screenshots: ["/work/proj3-1.png"],
    nda: true,
  },
]
