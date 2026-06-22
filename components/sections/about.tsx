import { getTranslations } from "next-intl/server"

import { about } from "@/content/about"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const metricKeys = [
  { key: "yearsExperience", value: about.yearsExperience, suffix: "+" },
  { key: "projectsDelivered", value: about.projectsDelivered, suffix: "+" },
  { key: "technologies", value: about.technologies, suffix: "+" },
] as const

export async function About() {
  const t = await getTranslations("about")

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-[#ff3b30] sm:text-4xl">
          {t("heading")}
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="grid grid-cols-3 gap-4 lg:col-span-2 lg:gap-6">
            {metricKeys.map(({ key, value, suffix }) => (
              <div
                key={key}
                className="rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 text-center backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)]"
              >
                <span className="block text-4xl font-bold tracking-tight text-[#ff3b30] sm:text-5xl font-mono">
                  {value}{suffix}
                </span>
                <span className="mt-2 block font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
                  {t(`metrics.${key}`)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-base leading-relaxed text-[#a1a1aa] sm:text-lg">
              {t("paragraph")}
            </p>

            <div className="mt-8">
              <Link
                href="/#experience"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {t("moreAbout")} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
