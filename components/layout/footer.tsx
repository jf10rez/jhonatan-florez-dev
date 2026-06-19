import { siteConfig } from "@/site.config"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 text-xs text-secondary sm:flex-row">
        <span className="font-mono">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="font-mono">{siteConfig.domain}</span>
      </div>
    </footer>
  )
}
