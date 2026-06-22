import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { selectedWork } from "@/content/selected-work"
import { workPlaceholderMeta } from "@/content/work-placeholders"

export async function SelectedWork() {
  const t = await getTranslations("selectedWork")

  return (
    <section id="selected-work" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-[#ff3b30] sm:text-4xl">
          {t("heading")}
        </h2>

        <p className="mt-4 max-w-2xl text-sm text-[#a1a1aa]">
          {t("ndaLabel", { company: selectedWork[0]?.company ?? "" })}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {selectedWork.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] backdrop-blur-sm transition-all hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_0_15px_rgba(255,59,48,0.15)]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#111111]">
                {project.screenshots[0] ? (
                  <Image
                    src={project.screenshots[0]}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    placeholder={
                      workPlaceholderMeta[project.screenshots[0]]
                        ? "blur"
                        : undefined
                    }
                    blurDataURL={
                      workPlaceholderMeta[project.screenshots[0]]?.blurDataURL
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#111111] text-xs text-[#a1a1aa]">
                    {t("ndaLabel", { company: project.company })}
                  </div>
                )}

                <div className="absolute right-0 bottom-0 left-0 border-t border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.9)] px-4 py-3 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.8)] px-2 py-1 font-mono text-xs text-[#a1a1aa]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#a1a1aa]">
                      {project.company}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-[rgba(255,59,48,0.2)] bg-[rgba(17,17,17,0.8)] px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                    NDA
                  </span>
                </div>

                <p className="mt-4 text-sm text-[#a1a1aa]">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
                    {t("roleLabel")}
                  </span>
                  <span className="ml-2">{project.role}</span>
                </p>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center font-mono text-xs text-[#ff3b30] underline-offset-4 hover:underline"
                  >
                    {t("viewProject")} →
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
