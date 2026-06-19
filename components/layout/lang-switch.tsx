"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LangSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-secondary">|</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            className={
              l === locale
                ? "text-foreground"
                : "text-secondary transition-colors hover:text-foreground"
            }
            aria-pressed={l === locale}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
