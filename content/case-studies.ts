export type CaseStudyTier = 1 | 2 | 3

export type CaseStudyStatus = "deployed" | "in-development" | "shipped"

export type CaseStudy = {
  id: string
  tier: CaseStudyTier
  title: string
  problemKey: string
  solutionKey: string
  impactKey: string
  stack: string[]
  repoUrl?: string
  npmUrl?: string
  npmPackage?: string
  demoUrl?: string
  isPrivate?: boolean
  status?: CaseStudyStatus
}

export const caseStudies: CaseStudy[] = []
