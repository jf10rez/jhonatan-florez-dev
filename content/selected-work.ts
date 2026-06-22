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
    id: "atri",
    title: "Atri",
    company: "Atri",
    role: "Full Stack Developer",
    stack: ["React", "TypeScript", "Loopback.js", "PostgreSQL", "AWS", "Redux"],
    screenshots: ["https://media.jhonatan-florez.dev/media/media_atri.webm"],
    nda: true,
  },
  {
    id: "cotizaciones",
    title: "Cotizaciones",
    company: "integ.ro",
    role: "Lead Full Stack Engineer",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    screenshots: ["https://media.jhonatan-florez.dev/media/media_cotizaciones.webm"],
    nda: true,
  },
  {
    id: "formacol",
    title: "Formacol",
    company: "integ.ro",
    role: "Full Stack Engineer",
    stack: ["TypeScript", "OpenAI", "Redis", "NestJS"],
    screenshots: ["https://media.jhonatan-florez.dev/media/media_formacol.webm"],
    nda: true,
  },
  {
    id: "sicor",
    title: "Sicor",
    company: "integ.ro",
    role: "Full Stack Engineer",
    stack: ["Next.js", "Tailwind CSS", "D3", "PostgreSQL"],
    screenshots: ["https://media.jhonatan-florez.dev/media/showcase-sicor.webm"],
    nda: true,
  },
]
