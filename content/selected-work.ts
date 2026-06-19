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

export const selectedWork: SelectedWork[] = []
