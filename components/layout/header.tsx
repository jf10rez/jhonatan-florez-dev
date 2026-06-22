"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"
import { useTranslations } from "next-intl"

import { LangSwitch } from "./lang-switch"

export function Header() {
  const t = useTranslations("nav")
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const navIds = siteConfig.nav.map((item) => item.id)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(255,59,48,0.2)] bg-[rgba(5,5,5,0.8)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-wider text-[#ff3b30] uppercase"
          aria-label={siteConfig.name}
        >
          JF
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.id}
              href={item.id === "hero" ? "/" : `/#${item.id}`}
              className={cn(
                "text-xs font-medium uppercase tracking-widest transition-colors hover:text-[#ff3b30]",
                activeSection === item.id
                  ? "text-[#ff3b30]"
                  : "text-[#a1a1aa]"
              )}
            >
              {t(item.labelKey.replace("nav.", ""))}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LangSwitch />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "md:hidden"
            )}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col bg-[#0a0a0a] border-[rgba(255,59,48,0.2)]">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <p className="sr-only">Site navigation menu</p>
            <nav className="flex flex-col gap-4 pt-8">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.id}
                  href={item.id === "hero" ? "/" : `/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg font-medium uppercase tracking-wider transition-colors hover:text-[#ff3b30]",
                    activeSection === item.id
                      ? "text-[#ff3b30]"
                      : "text-[#a1a1aa]"
                  )}
                >
                  {t(item.labelKey.replace("nav.", ""))}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <LangSwitch />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
