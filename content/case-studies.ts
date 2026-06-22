export type CaseStudyTier = 1 | 2 | 3

export type CaseStudyStatus = "deployed" | "in-development" | "shipped"

export type DiagramNode = {
  id: string
  label: string
}

export type DiagramEdge = {
  from: string
  to: string
  label?: string
}

export type CaseStudy = {
  id: string
  tier: CaseStudyTier
  title: string
  problemKey: string
  solutionKey: string
  impactKey: string
  impactMetricKey?: string
  stack: string[]
  repoUrl?: string
  npmUrl?: string
  npmPackage?: string
  demoUrl?: string
  isPrivate?: boolean
  status?: CaseStudyStatus
  diagram?: {
    nodes: DiagramNode[]
    edges: DiagramEdge[]
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: "ilaxus",
    tier: 1,
    title: "Ilaxus.com",
    problemKey: "ilaxus.problem",
    solutionKey: "ilaxus.solution",
    impactKey: "ilaxus.impact",
    impactMetricKey: "ilaxus.metric",
    stack: ["AI Automation", "Next.js", "TypeScript", "OpenAI", "n8n", "Make"],
    demoUrl: "https://ilaxus.com",
    status: "deployed",
  },
  {
    id: "aiChatbot",
    tier: 1,
    title: "AI Chatbot",
    problemKey: "aiChatbot.problem",
    solutionKey: "aiChatbot.solution",
    impactKey: "aiChatbot.impact",
    impactMetricKey: "aiChatbot.metric",
    stack: ["Next.js", "TypeScript", "OpenAI", "Node.js"],
    // TODO(jhonatan): replace with real repository and package names
    repoUrl: "https://github.com/<user>/<repo>",
    npmUrl: "https://www.npmjs.com/package/<pkg>",
    npmPackage: "<pkg>",
  },
  {
    id: "openclaw",
    tier: 2,
    title: "OpenClaw Discord Agent System",
    problemKey: "openclaw.problem",
    solutionKey: "openclaw.solution",
    impactKey: "openclaw.impact",
    impactMetricKey: "openclaw.metric",
    stack: ["Node.js", "Docker", "PostgreSQL", "LLM"],
    isPrivate: true,
    status: "deployed",
    diagram: {
      nodes: [
        { id: "discord", label: "Discord" },
        { id: "agent", label: "Agent" },
        { id: "llm", label: "LLM" },
        { id: "storage", label: "Storage" },
      ],
      edges: [
        { from: "discord", to: "agent", label: "command" },
        { from: "agent", to: "llm", label: "prompt" },
        { from: "llm", to: "agent", label: "response" },
        { from: "agent", to: "storage", label: "persist" },
      ],
    },
  },
  {
    id: "langPlatform",
    tier: 3,
    title: "Language Learning Platform",
    problemKey: "langPlatform.problem",
    solutionKey: "langPlatform.solution",
    impactKey: "langPlatform.impact",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    // TODO(jhonatan): replace with real repository name
    repoUrl: "https://github.com/<user>/<repo>",
    status: "in-development",
  },
]
