export type ExperienceItem = {
  id: string
  company: string
  role: string
  start: string
  end: string
  stack: string[]
  challengeKey: string
  actionsKeys: string[]
  resultsKeys: string[]
  resultHighlight?: string
}

export const experience: ExperienceItem[] = [
  {
    id: "integro",
    company: "integ.ro",
    role: "Fullstack Developer",
    start: "Aug 2022",
    end: "Present",
    stack: ["Next.js", "TypeScript", "Node.js", "React", "AWS", "Docker"],
    challengeKey: "experience.items.integro.challenge",
    actionsKeys: [
      "experience.items.integro.action1",
      "experience.items.integro.action2",
      "experience.items.integro.action3",
    ],
    resultsKeys: [
      "experience.items.integro.result1",
      "experience.items.integro.result2",
    ],
    resultHighlight: "3+",
  },
  {
    id: "dms",
    company: "dms software",
    role: "Software Developer",
    start: "Sep 2021",
    end: "Mar 2022",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    challengeKey: "experience.items.dms.challenge",
    actionsKeys: [
      "experience.items.dms.action1",
      "experience.items.dms.action2",
    ],
    resultsKeys: [
      "experience.items.dms.result1",
      "experience.items.dms.result2",
    ],
    resultHighlight: "7",
  },
  {
    id: "confacaldas",
    company: "Confa Caldas",
    role: "Software Developer",
    start: "Feb 2021",
    end: "Aug 2021",
    stack: ["JavaScript", "React", "Node.js", "MySQL"],
    challengeKey: "experience.items.confacaldas.challenge",
    actionsKeys: [
      "experience.items.confacaldas.action1",
      "experience.items.confacaldas.action2",
    ],
    resultsKeys: [
      "experience.items.confacaldas.result1",
      "experience.items.confacaldas.result2",
    ],
    resultHighlight: "7",
  },
  {
    id: "syqual10",
    company: "SYQUAL10",
    role: "Software Engineer",
    start: "Jun 2020",
    end: "Feb 2021",
    stack: ["React", "Angular", "Node.js", "MongoDB"],
    challengeKey: "experience.items.syqual10.challenge",
    actionsKeys: [
      "experience.items.syqual10.action1",
      "experience.items.syqual10.action2",
    ],
    resultsKeys: [
      "experience.items.syqual10.result1",
      "experience.items.syqual10.result2",
    ],
    resultHighlight: "9",
  },
  {
    id: "2share",
    company: "2Share SharePoint Solutions",
    role: "Software Engineer",
    start: "Dec 2019",
    end: "Apr 2020",
    stack: ["SharePoint", "C#", ".NET", "JavaScript"],
    challengeKey: "experience.items.2share.challenge",
    actionsKeys: [
      "experience.items.2share.action1",
      "experience.items.2share.action2",
    ],
    resultsKeys: [
      "experience.items.2share.result1",
      "experience.items.2share.result2",
    ],
    resultHighlight: "5",
  },
  {
    id: "doctus",
    company: "Doctus SAS",
    role: "Software Development Engineer",
    start: "Apr 2018",
    end: "Oct 2018",
    stack: ["JavaScript", "React", "Node.js", "MySQL"],
    challengeKey: "experience.items.doctus.challenge",
    actionsKeys: [
      "experience.items.doctus.action1",
      "experience.items.doctus.action2",
    ],
    resultsKeys: [
      "experience.items.doctus.result1",
      "experience.items.doctus.result2",
    ],
    resultHighlight: "7",
  },
]
