# AGENTS.md

React 18 + Vite 5 SPA ("Effort&Habit", a gym/training management dashboard for PE teachers). UI text, comments, and code identifiers are in Spanish — keep that convention.

## Commands
- `pnpm run dev` (alias `pnpm start`) — Vite dev server
- `pnpm run lint` — ESLint (run this after changes; it's the only automated check)
- `pnpm run build` — production build
- No tests exist. **Verification = `pnpm run lint` + `pnpm run build`.**

## Prototype status (important)
- **Everything is hardcoded mock data.** Users, exercises, sessions come from `src/utils/usersUtils.helpers.js`, `src/utils/exercise.js`, `src/utils/dashboardUtils.helpers.js`, `src/utils/homeUtils.helpers.json`. There is no real backend.
- **Auth is stubbed.** `Authenticated` defaults to `true` in `src/stores/user/user.store.js`; `src/module/auth/hooks/useLogin.jsx` just sets it without calling an API. Don't assume a real auth flow exists.
- `src/main.jsx` sets `axios.defaults.baseURL` to a leftover ecommerce backend on render.com that no longer applies. Don't rely on `axios` calls succeeding.
- Package is still named `ecommerce-cba` in `package.json`.

## Architecture
- Entry: `src/main.jsx` → `src/App.jsx` (`Router` + Radix `Theme` + `Toaster`) → routes in `src/routes/routes.jsx` (lazy-loaded screens wrapped in a `Layout`; `/sign-in` is the only unwrapped route).
- Screens live in `src/screens/`; shared UI in `src/module/core/`; features split under `src/module/<feature>/` (auth, exercise, home, dashboard).
- State: Zustand stores in `src/stores/{user,product,type,ui}` persisted to `localStorage` (store keys like `user-storage`). Fake data flows through these stores via plain arrays/ids.
- Styling: TailwindCSS + daisyUI classes AND Radix UI Themes (the `Theme` wrapper) coexist. Keep both working; `tailwind.config.js` and `postcss.config.js` are standard.

## Responsive
- Breakpoints are customized in `tailwind.config.js` (`theme.extend.screens`): `sm:` is **480px**, NOT Tailwind's default 640px (md 768 / lg 1024 / xl 1280 / 2xl 1536 are default).
- UI is written mobile-first (`hidden md:flex`, `sm:w-44`); follow that pattern instead of desktop-first or media queries.

## Web3 (experimental, treat with caution)
- `src/utils/client.js` creates viem public/wallet clients on the **Base** chain.
- `src/module/home/components/hooks/Blockchain.jsx` hardcodes a private key (line ~18) and a contract address (line ~15) — do not add/commit additional secrets; flag if you touch this. If `mainnet`/`base` imports change, keep chain usage consistent with `client.js`.
- Contract ABI is in `src/utils/ABI.js`.

## Conventions / gotchas
- ESLint 9 flat config (`eslint.config.js`) con `react-refresh/only-export-components` warn — módulos que exportan componentes y no-componentes pueden advertir.
- Estilo de código desigual (mezcla senior/junior): mucho `console.log`, bloques comentados, componentes copiados. Seguir el estilo del archivo circundante en lugar de "arreglar" todo.
- Existen tanto `package-lock.json` como `pnpm-lock.yaml`; `node_modules` está instalado. Usar `npm` a menos que se pida pnpm explícitamente.

## SEO Best Practices
- **Meta tags**: Definir `title`, `description`, Open Graph (`og:title`, `og:description`, `og:image`, `og:type`), Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) en `index.html`. Actualizar dinámicamente por ruta con `react-helmet-async` (recomendado para SPA) en cada pantalla (`src/screens/`).
- **HTML semántico**: Jerarquía de headings correcta (`h1` → `h2` → `h3`...), landmarks (`<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>`), `<section>`/`<article>` con `aria-labelledby` cuando aplique.
- **Sitemap y robots.txt**: Generar `sitemap.xml` y `robots.txt` en build con `vite-plugin-sitemap` (configurar `routes` en `vite.config.js` para incluir rutas lazy-loaded). `robots.txt` permitir indexar `/`, `/dashboard`, `/ejercicios`; bloquear `/sign-in`, `/api` (si existiera).
- **Datos estructurados (JSON-LD)**: Incluir `@type: "WebApplication"` + `Organization` en `index.html` o inyectado vía helmet. Propiedades clave: `name`, `url`, `applicationCategory`, `operatingSystem`, `offers`, `author`, `inLanguage: "es-ES"`.
- **Core Web Vitals**: Lazy-loading de rutas (ya con `React.lazy` + `Suspense`), code-splitting automático de Vite, imágenes optimizadas (usar `<img loading="lazy">` + formatos WebP/AVIF, considerar `vite-plugin-imagemin`). Evitar layout shift: `width`/`height` en imágenes, `font-display: swap`.
- **URLs canónicas y hreflang**: `<link rel="canonical" href="...">` por página. Si se añade multi-idioma (español primario), `hreflang="es"` + `x-default` en `index.html` y helmet.
- **Contenido accesible = SEO**: `alt` descriptivo en imágenes, `aria-label`/`aria-labelledby` en controles sin texto visible, `role` apropiado. Evitar contenido solo en JS sin fallback semántico.

## Principios SOLID
- **S**ingle Responsibility: Cada componente/hook/store hace una sola cosa. Separar *data fetching* (custom hooks `useUsers`, `useExercises`) de *UI rendering* (componentes presentacionales). Stores Zustand por dominio (`user.store.js`, `exercise.store.js`), no un store global monolítico.
- **O**pen/Closed: Extender comportamiento vía composición (custom hooks, HOCs, compound components) sin modificar código existente. Ej.: `useAuth` base + `useAdminAuth` que extiende, no modifica.
- **L**iskov Substitution: Hooks/stores con misma interfaz deben ser intercambiables. Ej.: `useAuthProvider` (mock) y `useAuthProvider` (real API) exponen `{ user, login, logout }` — consumidores no notan el cambio.
- **I**nterface Segregation: Hooks/stores pequeños y enfocados (`useUser`, `useExercises`, `useDashboardStats`) en lugar de uno gigante `useDashboard`. Cada pantalla importa solo lo que necesita.
- **D**ependency Inversion: Depender de abstracciones (Context, interfaces TypeScript/JSDoc) no de concreciones. Inyectar stores/servicios vía Context (`AuthProvider`, `ExerciseProvider`) o props, no importar stores directamente en componentes de UI.