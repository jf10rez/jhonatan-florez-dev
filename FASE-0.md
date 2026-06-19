# Fase 0 — Setup + Skills + Scaffolding

## Resumen
Base del portfolio lista. Scaffolding, configuración, tipos e i18n inicial funcionando. Sin secciones visuales todavía.

## Stack confirmado
- Next.js 16.2.9 (App Router + Turbopack)
- TypeScript 5 (strict + `noUncheckedIndexedAccess`)
- Tailwind CSS 4
- shadcn/ui (estilo `base-nova`, Base UI + lucide-react)
- GSAP 3.15 + `@gsap/react`
- Lenis 1.3.23
- next-intl 4.13.0

## Skills instaladas
`caveman`, `frontend-design`, `gsap-performance`, `next-intl-add-language`, `nextjs-best-practices`, `programmatic-seo`, `tailwind-design-system`.

## Configuración clave
- `tsconfig.json`: `strict: true`, `noUncheckedIndexedAccess: true`.
- `site.config.ts`: identidad personal (`jhonatan.dev`), paleta, email, handles sociales, nav anchors.
- `next.config.ts`: integración `next-intl/plugin`.
- `app/globals.css`: tema dark forzado con paleta exacta:
  - bg `#050505`
  - accent `#ff3b30`
  - text `#ffffff`
  - secondary `#a1a1aa`
- `i18n/routing.ts`: `locales: ["en", "es"]`, `defaultLocale: "en"`, `localePrefix: "always"`.

## Estructura de carpetas

```
app/
  [locale]/                 # i18n routing
    layout.tsx              # root layout, fuentes, metadata base
    page.tsx                # landing vacía
    api/metrics/route.ts    # route handler con revalidate 600
  globals.css               # variables dark
components/
  layout/                   # header, footer, lang-switch
  sections/                 # hero, about, principles, experience,
                            # systems, selected-work, infrastructure,
                            # live-metrics, contact (vacíos)
  ui/                       # shadcn button
content/
  about.ts
  principles.ts
  experience.ts
  case-studies.ts
  selected-work.ts
  infrastructure.ts
hooks/
  use-gsap.ts
  use-lenis.ts
  use-magnetic.ts
  use-scramble.ts
lib/
  api.ts                    # tipos/endpoints de métricas
  gsap.ts                   # registro de plugins
  utils.ts                  # cn()
i18n/
  routing.ts
  request.ts
  navigation.ts
messages/
  en.json
  es.json
public/
  resume.pdf
  og/
  work/
```

## Componentes planeados — Server / Client

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `LocaleLayout` | Server | i18n, fuentes, metadata base, dark class |
| `IndexPage` | Server | render de landing |
| `Header` | Server | nav ancla + marca |
| `Footer` | Server | copyright + dominio |
| `LangSwitch` | Client | switch `EN \| ES` sin banderas |
| `Hero` | Client | scramble nombre, CTAs, magnetic buttons |
| `About` | Server + Client island | 4 métricas + contadores animados |
| `Principles` | Server | 4 principios en mono |
| `Experience` | Server | timeline STAR |
| `Systems` | Server | case studies tier 1/2/3 |
| `SelectedWork` | Server | trabajo NDA |
| `InfrastructureGraph` | Client | grafo SVG interactivo |
| `LiveMetrics` | Server + Client island | fetch `/api/metrics` |
| `Contact` | Client | formulario + validación |
| `Button` | Server | shadcn base |
| `MagneticButton` | Client | envoltorio magnetic |

## Hooks y utilidades

- `useGsap` — setup GSAP Context con cleanup automático.
- `useLenis` — smooth scroll integrado con ScrollTrigger.
- `useMagnetic` — microinteracción magnética en hover.
- `useScramble` — GSAP ScrambleText con fallback `prefers-reduced-motion`.
- `cn` — merge de clases Tailwind.
- `lib/gsap` — registro central de `ScrollTrigger`, `SplitText`, `ScrambleTextPlugin`, `Flip`.

## Schemas `/content/*.ts`

```ts
// about.ts
export type AboutMetrics = {
  yearsExperience: number
  projectsDelivered: number
  systemsDeployed: number
  technologies: number
}

// principles.ts
export type Principle = {
  id: "maintainability" | "automate" | "measure" | "ship"
  textKey: string
}

// experience.ts
export type ExperienceItem = {
  id: string
  company: string
  role: string
  start: string
  end: string
  stack: string[]
  challengeKey: string
  actionsKeys: string[]
  resultsKeys: string[]
}

// case-studies.ts
export type CaseStudyTier = 1 | 2 | 3
export type CaseStudyStatus = "deployed" | "in-development" | "shipped"
export type CaseStudy = {
  id: string
  tier: CaseStudyTier
  title: string
  problemKey: string
  solutionKey: string
  impactKey: string
  stack: string[]
  repoUrl?: string
  npmUrl?: string
  npmPackage?: string
  demoUrl?: string
  isPrivate?: boolean
  status?: CaseStudyStatus
}

// selected-work.ts
export type SelectedWork = {
  id: string
  title: string
  company: string
  role: string
  stack: string[]
  screenshots: string[]
  link?: string
  nda: true
}

// infrastructure.ts
export type InfraNodeType =
  | "client" | "cdn" | "proxy" | "app" | "api" | "db" | "runtime" | "host"
export type InfraNode = {
  id: string
  label: string
  descriptionKey: string
  type: InfraNodeType
}
export type InfraEdge = {
  from: string
  to: string
  label?: string
}
```

## Schema `/messages/{en,es}.json`
Secciones anidadas: `nav`, `hero`, `about`, `principles`, `experience`, `systems`, `selectedWork`, `infrastructure`, `liveMetrics`, `contact`, `footer`. Keys base definidas, valores vacíos.

## Validación
- `pnpm build` ✅ exitoso.
- `pnpm dev` levanta; `curl http://localhost:3000/en` responde `200` ✅.

## Notas técnicas
- Server Components por defecto; `"use client"` solo en interactividad.
- API de métricas ubicada temporalmente en `/[locale]/api/metrics`; en Fase 5 se evalúa mover a `/api/metrics` si la ruta locale no conviene.
- GSAP plugins premium (`SplitText`, `ScrambleTextPlugin`) registrados en `lib/gsap.ts`.

## Próximo paso
FASE 1 — i18n completo + layout base + SEO base.
