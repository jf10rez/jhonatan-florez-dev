import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              {item.id}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
