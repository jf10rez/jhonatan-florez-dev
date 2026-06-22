import { setRequestLocale } from "next-intl/server"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { LiveMetrics } from "@/components/sections/live-metrics"
import { SelectedWork } from "@/components/sections/selected-work"
import { Systems } from "@/components/sections/systems"
import { routing } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function IndexPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main className="flex flex-col pt-14">
        <Hero />
        <About />
        <Experience />
        <Systems />
        <SelectedWork />
        <LiveMetrics />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
