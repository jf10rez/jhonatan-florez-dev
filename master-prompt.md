PROMPT MAESTRO
Actúa como un diseñador senior de producto y desarrollador frontend experto en
Next.js (App Router), TypeScript, TailwindCSS, GSAP, Lenis y shadcn/ui.

Diseña y desarrolla un portfolio premium para un Full Stack Engineer especializado en:
Next.js, React, TypeScript, Node.js, Docker, PostgreSQL, IA Generativa,
automatización con agentes, arquitecturas cloud y DevOps.

OBJETIVO PRINCIPAL: conseguir empleo Full Stack en empresas tecnológicas serias
(startups de IA, SaaS B2B, product companies). NO es vender servicios ni freelance.
Posicionar al autor como ingeniero senior moderno que domina frontend, backend,
infraestructura y sistemas de IA.

AUDIENCIA: Engineering Managers, Tech Leads y reclutadores técnicos.
Tienen ~6 segundos en la primera visita. El contenido crítico (nombre, rol,
propuesta de valor, CTA) debe estar visible SIN esperar animaciones.

IDENTIDAD: identidad personal (jhonatan.dev o similar). Sin marca corporativa.

CONCEPTO VISUAL
Híbrido entre Linear, Vercel, Stripe y Raycast: técnico, minimalista, premium.
NO cyberpunk. NO estética de agencia/freelancer/plantilla. NO dashboard SaaS genérico.
Menos es más. El "wow factor" viene de la pulcritud técnica y los datos en vivo,
no de fuegos artificiales.

STACK OBLIGATORIO (sin redundancias)
- Next.js App Router (versión estable actual; no versiones experimentales)
- TypeScript estricto
- TailwindCSS
- GSAP (ScrollTrigger, SplitText, ScrambleText, Flip) — cubre todas las animaciones
- Lenis (scroll fluido)
- shadcn/ui (componentes base + lucide-react)
- next-intl (i18n es/en, switch "EN | ES" en header — sin banderas)
- Canvas 2D vanilla (opcional, solo si se justifica para fondo ligero)

NO usar: Motion/Framer Motion, Three.js, React Three Fiber, OGL ni librerías WebGL.
Performance es prioridad absoluta (Lighthouse > 95).

SKILLS OBLIGATORIAS (instalar antes de empezar, NO NEGOCIABLE):
npx skills add https://github.com/sickn33/antigravity-awesome-skills --skill nextjs-best-practices
npx skills add https://github.com/heygen-com/hyperframes --skill tailwind
npx skills add https://github.com/heygen-com/hyperframes --skill gsap
npx skills add https://github.com/github/awesome-copilot --skill next-intl-add-language
npx skills add https://github.com/coreyhaines31/marketingskills --skill programmatic-seo
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/juliusbrussee/caveman --skill caveman

PALETA
- Fondo: #050505
- Acento: #ff3b30 (moderación; solo CTAs y estados activos)
- Texto: #ffffff
- Secundario: #a1a1aa
- Dark mode nativo (no toggle)

TIPOGRAFÍA
- Sans: Inter o Geist (una sola familia)
- Mono: JetBrains Mono o Geist Mono (solo métricas, etiquetas técnicas, status)
- Tamaños fluidos con clamp()

I18N
- Español e inglés con next-intl
- Switch en header: "EN | ES" (sin banderas; idioma ≠ país)
- Persistencia en cookie + detección Accept-Language en middleware
- Todos los strings en /messages/{en,es}.json

SECCIONES

1. HERO (full viewport, contenido visible de inmediato)
   - Sin boot sequence, sin loading screen, sin terminal bloqueante.
   - Al montar: "JHONATAN FLOREZ" aparece con ScrambleText de GSAP (~1s, una vez).
     El resto del hero ya está visible; no espera al scramble.
   - Subtítulo: "Full Stack Engineer — AI Systems & Automation"
   - Propuesta de valor (1-2 líneas, traducida):
     "Build scalable web applications, AI-powered workflows and cloud infrastructure."
   - CTAs: "View Projects" (primario) + "Download Resume" (secundario)
   - Mouse Magnetic sutil en ambos botones (radio pequeño).
   - Fila "Currently" con 3 bullets + dot animado:
     ● Building AI Agents
     ● Managing Production Infrastructure
     ● Developing SaaS Products
   - Fondo: gradiente sutil o grid técnico tenue. Sin partículas pesadas.

2. ABOUT (métricas, no foto)
   - 4 contadores animados con GSAP al entrar al viewport:
     Years of Experience | Projects Delivered | Systems Deployed | Technologies
     (NO usar "Countries Reached" — es vanity metric)
   - Párrafo corto (2-3 líneas) con posicionamiento profesional.
   - Avatar opcional: monograma con iniciales, no foto obligatoria.

3. ENGINEERING PRINCIPLES (nueva sección, comunicar seniority rápido)
   - 4 principios cortos, uno por línea, tipografía mono:
     ● Build for maintainability.
     ● Automate repetitive work.
     ● Measure before optimizing.
     ● Ship early, iterate fast.
   - Reveal sutil con GSAP al entrar al viewport.

4. EXPERIENCE (timeline con formato STAR)
   - Timeline vertical moderna con GSAP ScrollTrigger (reveal por item).
   - Cada entrada: empresa, cargo, rango de fechas, stack (chips) y bloque
     "Challenge / Actions / Results" (NO solo logros sueltos):
       Challenge: <problema>
       Actions: <qué hiciste>
       Results: <impacto cuantificado, con números>
   - Los managers aman este formato. Sin bullets genéricos.

5. SYSTEMS I'VE BUILT (case studies en 3 tiers)
   Formato por item: Problem → Solution → Impact → Links

   Tier 1 — Full case study (repo + demo + métricas live):
   - AI Chatbot (npm package): enlace GitHub + enlace npm + descargas semanales
     obtenidas en vivo desde la API de npm.

   Tier 2 — Architecture case study (código privado, desplegado):
   - OpenClaw + Discord Agent System: diagrama de arquitectura + descripción del
     sistema + stack. Marca visible "Private · Deployed in production". Sin link a repo.
     Grafo de componentes (Discord → Agent → LLM → Storage).

   Tier 3 — In development:
   - Language Learning Platform: repo público, sin demo. Etiqueta "In Development".
     Descripción de arquitectura planned + stack.

   Reveal sutil al entrar al viewport (no parallax exagerado).

6. SELECTED WORK (trabajo profesional, NDA)
   - Subsección separada de los case studies personales.
   - 2-3 proyectos de la empresa actual: nombre, empresa, rol, stack, 1-2
     screenshots/thumbnails, link si es público. Sin código.
   - Etiqueta visible: "Work done at [Empresa] — code under NDA".

7. INFRASTRUCTURE (diferenciador — grafo real, NO cadena lineal)
   - Grafo interactivo en SVG (NO Three.js) editable desde /content/infrastructure.ts
     (nodos y edges tipados; fácil de mantener si cambia el stack).
   - Topología correcta: la app vive DENTRO de Docker, Docker vive en el VPS.
     No son eslabones del request.
       User → Cloudflare → Nginx → Next.js → Node.js API → PostgreSQL
       [todo lo anterior hosted on: Docker @ VPS]
   - Hover en cada nodo: tooltip con explicación técnica breve.
   - aria-label por nodo (accesibilidad).
   - Animación GSAP reveal al entrar al viewport.
   - Diseño limpio, líneas finas, no arcade.

8. LIVE METRICS (diferenciador principal — sin exponer el VPS)
   - Panel con datos en vivo desde APIs públicas:
     ● GitHub: repos públicos, stars totales, contribuciones último año, último commit
     ● npm: descargas semanales del paquete del chatbot
     ● Uptime badge público (BetterStack/UptimeRobot) del dominio del portfolio
     ● Deploy status (Vercel/Cloudflare) del propio portfolio
   - Endpoint propio (route handler Next.js o serverless) que agregue y cachee
     (revalidate cada 5-10 min) las llamadas a estas APIs.
   - NUNCA exponer: IPs internos, nombres de servicios privados, puertos, ni
     nada que delate superficie de ataque del VPS.
   - UI: tarjetas "system status" con dot verde/ámbar + valor + label mono.

9. CONTACT
   - Formulario minimalista (nombre, email, mensaje) con validación + estado.
   - Links: GitHub, npm, LinkedIn, email directo.
   - Hover sutil en links (magnetic opcional solo en iconos grandes).

ANIMACIONES (todas con GSAP)
- ScrambleText en el nombre del hero (~1s, una vez).
- SplitText para titulares de sección al entrar al viewport.
- ScrollTrigger reveals (fade + translateY corto, duración corta).
- Magnetic buttons sutil (CTAs principales).
- Contadores animados en About y Live Metrics.
- Hover microinteracciones en cards, links y nodos del grafo.
- Respeta prefers-reduced-motion: desactivar scramble, magnetic y reveals largos.
- NO: parallax excesivo, scroll-jacking, animaciones que bloqueen contenido,
  efectos que afecten legibilidad, sonidos.

CALIDAD Y RESTRICCIONES
- Lighthouse > 95 en todas las categorías (mobile y desktop).
- Responsive mobile-first, breakpoints fluidos.
- Accesibilidad AA: focus visible, contraste, aria-labels, navegación por teclado,
  prefers-reduced-motion respetado.
- SEO: metadata dinámica, Open Graph, sitemap, robots.txt, JSON-LD de Person.
- Código limpio, componentes reutilizables, arquitectura escalable.
- Server Components por defecto; "use client" solo donde sea necesario (GSAP,
  interactividad, forms).
- Sin carruseles. Sin partículas pesadas. Sin efectos que pesen al bundle.

ARQUITECTURA DE DATOS
- next-intl messages en /messages/{en,es}.json
- Contenido del portfolio (experiencia, case studies, work, principles,
  infrastructure) en archivos TS tipados en /content para edición simple.
- Live Metrics cacheadas vía route handler con revalidate.

BRANDING
- Identidad personal (jhonatan.dev o similar).
- Configurable desde /site.config.ts: nombre, dominio, handles sociales, paleta,
  email de contacto. Estructura preparada para soportar marca después, pero
  por ahora solo personal.

ENTREGABLE ANTES DEL CÓDIGO (en Fase 0)
1. Árbol completo de carpetas con justificación breve por directorio.
2. Lista de componentes con responsabilidad y Server/Client.
3. Lista de hooks y utilidades.
4. Schema de /content/*.ts y /messages/*.json.
5. Plan de implementación por fases (el definido abajo).

FASES DE IMPLEMENTACIÓN (ejecutar una por sesión, no todo de golpe):
Fase 0 — Setup + skills + scaffolding + site.config.ts
Fase 1 — i18n + layout base + SEO base
Fase 2 — Secciones core estáticas (Hero, About, Engineering Principles, Experience, Contact)
Fase 3 — Systems I've Built (Tiers 1/2/3) + Selected Work
Fase 4 — Infrastructure grafo SVG editable
Fase 5 — Live Metrics (route handler + UI)
Fase 6 — Animaciones premium GSAP + Lenis
Fase 7 — (Opcional) Remotion demo reel para 1 proyecto NDA
Fase 8 — Validación final: Lighthouse, axe, TS strict, build prod, i18n check
PROMPTS POR FASE
Cada uno referencia al maestro. Se ejecutan uno por sesión.
FASE 0 — Setup
Continúa el proyecto del PROMPT MAESTRO (portfolio Full Stack Engineer).

Ejecuta la FASE 0:
1. Inicializa repo Next.js App Router + TypeScript estricto + TailwindCSS + shadcn/ui.
2. Instala las 7 skills obligatorias vía npx skills add (lista en el maestro).
3. Instala dependencias: gsap, @gsap/react, lenis, next-intl, lucide-react.
4. Crea /site.config.ts con: nombre, dominio (jhonatan.dev), handles sociales,
   paleta, email. Solo identidad personal.
5. Crea la estructura completa de carpetas (entregable 1 del maestro):
   - app/ (App Router, [locale] dinámico para i18n)
   - components/ (ui, sections, layout)
   - content/ (experience.ts, case-studies.ts, selected-work.ts, principles.ts,
     infrastructure.ts, about.ts)
   - hooks/ (use-gsap, use-magnetic, use-lenis, etc.)
   - lib/ (api clients, utils)
   - messages/ (en.json, es.json — vacíos con schema)
   - public/ (resume.pdf, og images)
6. Entrega lista de componentes (Server vs Client), hooks y utilidades, y los
   schemas TS de /content/*.ts y /messages/*.json.

NO escribas secciones todavía. Solo scaffolding + tipos + config.
Aplica la skill nextjs-best-practices.
FASE 1 — i18n + Layout + SEO
Continúa el proyecto del PROMPT MAESTRO. Fase 0 completa.

Ejecuta la FASE 1:
1. Configura next-intl con middleware (detección Accept-Language + cookie).
2. Estructura app/[locale]/ con layout root y página principal.
3. Crea Header con switch "EN | ES" (sin banderas) + navegación ancla a secciones.
4. Crea Footer minimalista.
5. Implementa Lenis provider (client) envolviendo el contenido.
6. SEO base: metadata dinámica por idioma, Open Graph, Twitter cards, sitemap.ts,
   robots.ts, JSON-LD de Person en layout.
7. Llena /messages/{en,es}.json con las keys base (nav, footer, secciones
   vacías por ahora).

Aplica skills: next-intl-add-language, programmatic-seo.
Validación: build pasa, navegar con /en y /es funciona, Lighthouse SEO > 95.
FASE 2 — Secciones core estáticas
Continúa el proyecto. Fases 0-1 completas.

Ejecuta la FASE 2 — secciones core SIN animaciones GSAP todavía (solo markup +
estilos + contenido desde /content/*.ts):

1. Hero: nombre "JHONATAN FLOREZ", subtítulo, propuesta de valor, CTAs
   "View Projects" + "Download Resume", fila "Currently" con 3 bullets.
2. About: 4 contadores (años, proyectos, Systems Deployed, tecnologías) —
   sin animar todavía, solo render del número.
3. Engineering Principles: 4 líneas mono con bullets.
4. Experience: timeline vertical con formato Challenge/Actions/Results por item.
   Datos desde /content/experience.ts.
5. Contact: formulario (nombre, email, mensaje) + links sociales.

Todo el texto en /messages/{en,es}.json. Datos estructurados en /content/.
Aplica skills: tailwind, frontend-design.
Validación: ambas rutas /en y /es renderizan todas las secciones, responsive
mobile/desktop correcto, sin errores TS.
FASE 3 — Systems I've Built + Selected Work
Continúa el proyecto. Fases 0-2 completas.

Ejecuta la FASE 3:
1. Crea /content/case-studies.ts con schema tipado para 3 tiers:
   - Tier 1: AI Chatbot npm — problem, solution, impact, repoUrl, npmUrl,
     npmPackage (para métricas live en Fase 5).
   - Tier 2: OpenClaw + Discord — problem, solution, impact, diagrama (nodos
     Discord/Agent/LLM/Storage), stack. Flag "private · deployed in production".
     Sin repoUrl.
   - Tier 3: Language Learning Platform — problem, solution planned, stack,
     repoUrl. Flag "in development".
2. Render de cada case study con layout Problem → Solution → Impact → Links.
3. Crea /content/selected-work.ts para 2-3 proyectos NDA de la empresa actual:
   nombre, empresa, rol, stack, screenshots (en /public/work/), link público si
   aplica. Etiqueta visible "Work done at [Empresa] — code under NDA".
4. Diseño tipo Case Study, no galería. Cards amplias, jerarquía clara.

Aplica skills: tailwind, frontend-design.
Validación: 3 case studies + 2-3 selected work renderizados en /en y /es.
FASE 4 — Infrastructure grafo SVG
Continúa el proyecto. Fases 0-3 completas.

Ejecuta la FASE 4:
1. Define en /content/infrastructure.ts el schema:
   type InfraNode = { id, label, description, type: 'client'|'cdn'|'proxy'|
     'app'|'api'|'db'|'runtime'|'host' }
   type InfraEdge = { from, to, label? }
   Exporta los nodos y edges con la topología correcta:
     User → Cloudflare → Nginx → Next.js → Node.js API → PostgreSQL
     Todos hosted on: Docker @ VPS (nodos de tipo runtime/host separados,
     no eslabones del request).
2. Crea componente <InfrastructureGraph /> (Client) que renderice el grafo en SVG:
   - Layout automático o manual de nodos.
   - Hover en nodo → tooltip con description.
   - aria-label por nodo.
   - Líneas finas, diseño limpio (no arcade).
3. Animación GSAP básica de reveal al entrar al viewport (en Fase 6 se refina).
4. Strings del tooltip en /messages/{en,es}.json.

Aplica skill: frontend-design.
Validación: grafo renderiza, tooltips funcionan, responsive, a11y axe sin warnings.
FASE 5 — Live Metrics
Continúa el proyecto. Fases 0-4 completas.

Ejecuta la FASE 5:
1. Crea route handler /api/metrics que agregue datos de:
   - GitHub API: repos públicos, stars totales, contribuciones último año,
     último commit (autenticar con token si hace falta para rate limit).
   - npm API: descargas semanales del paquete del chatbot (usar npmPackage
     de /content/case-studies.ts).
   - Uptime: BetterStack o UptimeRobot badge status público.
   - Deploy status: Vercel/Cloudflare deploy status del propio portfolio.
2. Cache con revalidate: 600 (10 min). Nunca exponer IPs, nombres de servicios
   privados ni puertos del VPS.
3. Crea componente <LiveMetrics /> (Server + Client island) que consuma
   /api/metrics y renderice tarjetas tipo "system status":
   dot verde/ámbar + valor + label mono.
4. Estados de carga (skeletons) y error (fallback graceful, no romper layout).
5. Refresca client-side cada 60s sin recargar página (opcional, cuidar rate limit).

Aplica skill: nextjs-best-practices.
Validación: métricas cargan en /en y /es, cache funciona, sin exponer datos
sensibles, build pasa.
FASE 6 — Animaciones premium
Continúa el proyecto. Fases 0-5 completas.

Ejecuta la FASE 6 — pulido visual con GSAP:
1. Hero: ScrambleText en el nombre (~1s, una sola vez al montar).
2. SplitText en titulares de cada sección (reveal al entrar al viewport).
3. ScrollTrigger reveals: fade + translateY corto en cards, items de timeline,
   case studies, principles.
4. Magnetic buttons: aplicar a CTAs del hero y botones primarios. Radio pequeño.
5. Contadores animados en About y Live Metrics.
6. Hover microinteracciones en cards de case studies, links sociales y nodos
   del grafo Infrastructure.
7. Lenis: verificar scroll fluido en toda la página, integrar con ScrollTrigger.
8. Respeta prefers-reduced-motion: desactivar scramble, magnetic y reveals largos.

Aplica skill: gsap.
Validación: animaciones fluidas en desktop y mobile, sin jank, Lighthouse
Performance > 90 (apuntar a 95), axe sin warnings nuevos.
FASE 7 — Remotion demo reel (OPCIONAL)
Continúa el proyecto. Fases 0-6 completas.

DECISIÓN PREVIA: antes de ejecutar esta fase, verificar:
- Hay screenshots de calidad y atemporales de 1 proyecto NDA destacado.
- No muestran datos sensibles, fechas, info de clientes.
Si no se cumple, SKIP de esta fase y dejar Selected Work con screenshots estáticos.

Si se cumple, ejecuta:
1. Instala Remotion + dependencias de render.
2. Crea composición de 10-15s con 3-4 screenshots del proyecto, transiciones
   suaves (ken burns + crossfade), sin audio.
3. Render en build con Remotion CLI → output /public/work/<project>.mp4 + poster.
4. En el componente de Selected Work correspondiente, embed <video> con loop,
   muted, playsInline, poster fallback.
5. NO cargar el runtime de Remotion en el cliente. Solo el MP4.

Validación: video renderiza en desktop y mobile, no pesa más de ~2MB,
fallback poster funciona si el video no carga.
FASE 8 — Validación final
Continúa el proyecto. Fases 0-7 completas.

Ejecuta la FASE 8 — validación final:
1. Lighthouse mobile y desktop > 95 en Performance, Accessibility, Best
   Practices, SEO. Corrige lo que esté por debajo.
2. axe-core scan sin warnings críticos.
3. TypeScript strict sin errores.
4. Build de producción exitoso (next build).
5. i18n: navegar /en y /es completos, todas las secciones traducidas, cookie
   persiste, switch funciona.
6. Responsive: probar 375px, 768px, 1280px, 1920px.
7. Accesibilidad: navegación por teclado en toda la página, focus visible,
   prefers-reduced-motion respeta todas las animaciones.
8. SEO: verificar OG preview, sitemap accesible, robots correcto, JSON-LD
   válido en Schema.org validator.
9. Live Metrics: /api/metrics responde, cache funciona, sin exponer datos.
10. Deploy a Vercel/Cloudflare y verificar que todo funciona en producción.

Entrega: reporte con screenshots de Lighthouse, lista de fixes aplicados,
URL del deploy.
Resumen de lo que cambió vs tu versión original
Aspecto	Original	Final
Stack de animaciones	GSAP + Motion + Three.js + R3F + OGL	GSAP + Lenis + Canvas 2D opcional
Boot sequence	Bloqueante con terminal	Eliminada; hero visible de inmediato
About	Countries Reached	Systems Deployed
Experience	Logros sueltos	Challenge/Actions/Results
Infrastructure	Cadena lineal (Docker y VPS como eslabones)	Grafo real con topología correcta, editable en /content/
Engineering Principles	No existía	Sección nueva
Live Status	VPS directo (exponía infra)	APIs públicas (GitHub, npm, uptime, deploy)
Switch i18n	Con banderas	EN | ES
Branding	Personal o Ilaxus	Solo personal (jhonatan.dev)
Skills	No mencionadas	7 skills obligatorias integradas por fase
Ejecución	Un prompt monolítico	Maestro + 9 prompts por fase
Remotion	No mencionado	Fase 7 opcional con reglas estrictas