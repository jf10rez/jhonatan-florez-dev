export type InfraNodeType =
  | "client"
  | "cdn"
  | "proxy"
  | "app"
  | "api"
  | "db"
  | "runtime"
  | "host"

export type InfraNode = {
  id: string
  label: string
  descriptionKey: string
  type: InfraNodeType
  icon: string
  x: number
  y: number
  width: number
  height: number
}

export type InfraEdgeType = "request" | "hosting"

export type InfraEdge = {
  from: string
  to: string
  label?: string
  type: InfraEdgeType
}

export const infraNodes: InfraNode[] = [
  {
    id: "user",
    label: "User",
    descriptionKey: "infrastructure.nodes.user",
    type: "client",
    icon: "user",
    x: 40,
    y: 120,
    width: 100,
    height: 48,
  },
  {
    id: "cloudflare",
    label: "Cloudflare",
    descriptionKey: "infrastructure.nodes.cloudflare",
    type: "cdn",
    icon: "cloudflare",
    x: 180,
    y: 120,
    width: 100,
    height: 48,
  },
  {
    id: "nginx",
    label: "Nginx",
    descriptionKey: "infrastructure.nodes.nginx",
    type: "proxy",
    icon: "nginx",
    x: 320,
    y: 120,
    width: 100,
    height: 48,
  },
  {
    id: "nextjs",
    label: "Next.js",
    descriptionKey: "infrastructure.nodes.nextjs",
    type: "app",
    icon: "nextjs",
    x: 460,
    y: 120,
    width: 100,
    height: 48,
  },
  {
    id: "nodejs",
    label: "Node.js API",
    descriptionKey: "infrastructure.nodes.nodejs",
    type: "api",
    icon: "nodejs",
    x: 600,
    y: 120,
    width: 100,
    height: 48,
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    descriptionKey: "infrastructure.nodes.postgres",
    type: "db",
    icon: "postgres",
    x: 740,
    y: 120,
    width: 100,
    height: 48,
  },
  {
    id: "docker",
    label: "Docker",
    descriptionKey: "infrastructure.nodes.docker",
    type: "runtime",
    icon: "docker",
    x: 380,
    y: 70,
    width: 440,
    height: 150,
  },
  {
    id: "vps",
    label: "VPS",
    descriptionKey: "infrastructure.nodes.vps",
    type: "host",
    icon: "vps",
    x: 340,
    y: 30,
    width: 520,
    height: 210,
  },
]

export const infraEdges: InfraEdge[] = [
  { from: "user", to: "cloudflare", type: "request" },
  { from: "cloudflare", to: "nginx", type: "request" },
  { from: "nginx", to: "nextjs", type: "request" },
  { from: "nextjs", to: "nodejs", type: "request" },
  { from: "nodejs", to: "postgres", type: "request" },
  { from: "docker", to: "nextjs", label: "hosts", type: "hosting" },
  { from: "docker", to: "nodejs", label: "hosts", type: "hosting" },
  { from: "docker", to: "postgres", label: "hosts", type: "hosting" },
  { from: "vps", to: "docker", label: "runs", type: "hosting" },
]
