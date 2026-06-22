export type Technology = {
  id: string
  name: string
  icon: string
  rotation: number
}

export const technologies: Technology[] = [
  { id: "typescript", name: "TypeScript", icon: "/tech/typescript.svg", rotation: -3 },
  { id: "javascript", name: "JavaScript", icon: "/tech/javascript.svg", rotation: 2 },
  { id: "react", name: "React", icon: "/tech/react.svg", rotation: -1 },
  { id: "nextjs", name: "Next.js", icon: "/tech/nextjs.svg", rotation: 3 },
  { id: "nodejs", name: "Node.js", icon: "/tech/nodejs.svg", rotation: -2 },
  { id: "csharp", name: "C#", icon: "/tech/csharp.svg", rotation: 4 },
  { id: "redux", name: "Redux", icon: "/tech/redux.svg", rotation: -3 },
  { id: "postgresql", name: "PostgreSQL", icon: "/tech/postgresql.svg", rotation: 1 },
  { id: "docker", name: "Docker", icon: "/tech/docker.svg", rotation: -4 },
  { id: "mongodb", name: "MongoDB", icon: "/tech/mongodb.svg", rotation: 2 },
  { id: "tailwind", name: "Tailwind", icon: "/tech/tailwind.svg", rotation: -1 },
  { id: "git", name: "Git", icon: "/tech/git.svg", rotation: 3 },
  { id: "aws", name: "AWS", icon: "/tech/aws.svg", rotation: -2 },
  { id: "n8n", name: "n8n", icon: "/tech/n8n.svg", rotation: 1 },
]
