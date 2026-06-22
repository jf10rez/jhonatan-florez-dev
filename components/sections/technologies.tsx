import { getTranslations } from "next-intl/server"

import { technologies } from "@/content/technologies"

import { TechnologiesGrid } from "./technologies-grid"

export async function Technologies() {
  const t = await getTranslations("technologies")

  return (
    <section
      id="technologies"
      className="px-6 py-24"
      aria-labelledby="technologies-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="technologies-heading"
          className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase tracking-wider text-[#ff3b30]"
        >
          {t("heading")}
        </h2>
        <p className="mt-3 max-w-2xl font-mono text-sm text-[#a1a1aa]">
          {t("subtitle")}
        </p>

        <TechnologiesGrid items={technologies} />
      </div>
    </section>
  )
}
