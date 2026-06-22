import { getTranslations } from "next-intl/server"

import { principles } from "@/content/principles"

export async function Principles() {
  const t = await getTranslations("principles")

  return (
    <section id="principles" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
          {t("heading")}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {principles.map((principle, index) => (
            <div
              key={principle.id}
              className="flex gap-4 rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)]"
            >
              <span className="font-mono text-sm font-bold text-[#ff3b30]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-mono text-sm leading-relaxed text-[#a1a1aa] sm:text-base">
                {t(principle.textKey.replace("principles.", ""))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
