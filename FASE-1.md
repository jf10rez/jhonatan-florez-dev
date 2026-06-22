# Fase 1 — i18n + Layout + SEO Base

## Resumen
Sitio navegable vacío en `/en` y `/es`. next-intl configurado, layout base con Lenis, header/footer funcionando, SEO base desplegado.

## Archivos creados
- `proxy.ts` — middleware next-intl (Next.js 16 usa `proxy.ts`, no `middleware.ts`).
- `components/providers/lenis-provider.tsx` — envuelve children con `useLenis`.
- `app/sitemap.ts` — URLs `/en` y `/es`.
- `app/robots.ts` — allow all + referencia a sitemap.
- `public/og/og.svg` — OG image placeholder.
- `FASE-1.md` — este archivo.

## Archivos modificados
- `app/[locale]/layout.tsx`:
  - `generateStaticParams`.
  - `setRequestLocale`.
  - `generateMetadata` dinámica por locale (title, description, OG, Twitter, alternates, canonical, `x-default`).
  - JSON-LD `Person` en `<script type="application/ld+json">`.
  - `<LenisProvider>` dentro de `<NextIntlClientProvider>`.
- `app/[locale]/page.tsx` — renderiza `<Header />`, `<main />` vacío, `<Footer />`.
- `components/layout/header.tsx` — reescrito como Client Component.
  - Monograma `JF`.
  - Nav anclas `#hero`, `#about`, `#principles`, `#experience`, `#systems`, `#infrastructure`, `#live-metrics`, `#contact`.
  - `LangSwitch` integrado.
  - Menú hamburguesa móvil con Sheet de shadcn.
- `components/layout/lang-switch.tsx` — switch `EN | ES` sin banderas; conserva hash al cambiar locale.
- `components/layout/footer.tsx` — Server Component.
  - Copyright dinámico.
  - Links sociales (GitHub, npm, LinkedIn).
  - "Built with Next.js" desde messages.
- `messages/en.json` y `messages/es.json` — nav, footer y metadata con textos reales; resto vacío.
- `site.config.ts` — añadido anchor `hero` al array `nav`.

## i18n
- `i18n/routing.ts`: `locales: ["en", "es"]`, `defaultLocale: "en"`, `localePrefix: "always"`.
- `i18n/request.ts`: `getRequestConfig` carga messages según locale.
- `proxy.ts`: `createMiddleware(routing)` con detección `Accept-Language` + cookie `NEXT_LOCALE`.

## Layout
- Fuentes Geist + Geist Mono.
- Dark mode forzado vía clase `dark`.
- Header sticky con `backdrop-blur-md` y borde inferior sutil.
- `LenisProvider` monta smooth scroll en cliente; respeta `prefers-reduced-motion`.

## SEO
- Metadata dinámica por idioma.
- Open Graph y Twitter cards apuntando a `/og/og.svg`.
- Canonical y `hreflang` por locale; `x-default` a `/en`.
- Sitemap con `/en` y `/es`.
- `robots.txt` permite todo.
- JSON-LD `Person`: name, jobTitle, url, sameAs (GitHub, npm, LinkedIn).

## Validación
- `pnpm build` OK.
- `/en` y `/es` responden `200`.
- Cookie `NEXT_LOCALE` persiste: visitar `/es` fija cookie; luego `/` redirige a `/es`.
- Switch `EN | ES` cambia locale y mantiene anchor (#).
- Lighthouse SEO: **100 /en**, **100 /es** (test local con `SITE_URL=http://localhost:3000`; en producción canonical cae a `https://jhonatan.dev`).

## Notas técnicas
- Server Components por defecto. Header y `LenisProvider` son Client Components.
- `proxy.ts` reemplaza `middleware.ts` porque Next.js 16 detecta ambos como conflicto y exige `proxy.ts`.
- `metadataBase` acepta override via `SITE_URL` para validación local; sin variable usa `https://jhonatan.dev`.

## Próximo paso
FASE 2 — Secciones core estáticas (Hero, About, Principles, Experience, Contact).
