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
}

export type InfraEdge = {
  from: string
  to: string
  label?: string
}

export const infraNodes: InfraNode[] = []

export const infraEdges: InfraEdge[] = []
