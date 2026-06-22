"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Mail, Package } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/site.config"
import { cn } from "@/lib/utils"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const socialLinks = [
  { key: "github", href: siteConfig.social.github, icon: GitHubIcon },
  { key: "npm", href: siteConfig.social.npm, icon: Package },
  { key: "linkedin", href: siteConfig.social.linkedin, icon: LinkedInIcon },
  { key: "email", href: `mailto:${siteConfig.email}`, icon: Mail },
] as const

export function Contact() {
  const t = useTranslations("contact")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const schema = z.object({
    name: z.string().min(1, t("errors.nameRequired")),
    email: z.string().email(t("errors.emailInvalid")),
    message: z.string().min(20, t("errors.messageMin")),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full rounded-md border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-[#a1a1aa] focus-visible:border-[#ff3b30] focus-visible:ring-3 focus-visible:ring-[rgba(255,59,48,0.2)] disabled:opacity-50"

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              {t("heading")}
            </h2>

            <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#a1a1aa]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#10b981]" />
              </span>
              {t("available")}
            </span>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ key, href, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noreferrer"}
                  aria-label={t(`social.${key}`)}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <Icon className="mr-2 size-4" />
                  {t(`social.${key}`)}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[rgba(255,59,48,0.2)] bg-[rgba(10,10,10,0.8)] p-6 backdrop-blur-sm sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[rgba(16,185,129,0.1)]">
                  <Mail className="size-6 text-[#10b981]" aria-hidden="true" />
                </div>
                <p className="text-lg font-medium text-white">{t("form.success")}</p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                >
                  {t("form.submit")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#a1a1aa]">
                    {t("form.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={cn(inputClass, errors.name && "border-[#ff3b30]")}
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-[#ff3b30]">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#a1a1aa]">
                    {t("form.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={cn(inputClass, errors.email && "border-[#ff3b30]")}
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-[#ff3b30]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#a1a1aa]">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={cn(inputClass, "resize-none", errors.message && "border-[#ff3b30]")}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-[#ff3b30]">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-[#ff3b30]" role="alert">
                    {t("form.error")}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "..." : t("form.submit")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
