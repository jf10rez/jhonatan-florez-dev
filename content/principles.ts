export type Principle = {
  id: "maintainability" | "automate" | "measure" | "ship"
  textKey: string
}

export const principles: Principle[] = [
  { id: "maintainability", textKey: "principles.items.maintainability" },
  { id: "automate", textKey: "principles.items.automate" },
  { id: "measure", textKey: "principles.items.measure" },
  { id: "ship", textKey: "principles.items.ship" },
]
