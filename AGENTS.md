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

## Web3 (experimental, treat with caution)
- `src/utils/client.js` creates viem public/wallet clients on the **Base** chain.
- `src/module/home/components/hooks/Blockchain.jsx` hardcodes a private key (line ~18) and a contract address (line ~15) — do not add/commit additional secrets; flag if you touch this. If `mainnet`/`base` imports change, keep chain usage consistent with `client.js`.
- Contract ABI is in `src/utils/ABI.js`.

## Conventions / gotchas
- ESLint 9 flat config (`eslint.config.js`) with `react-refresh/only-export-components` warn — module files that export both components and non-components may warn.
- Code style is uneven (senior/beginner mix): heavy `console.log`, commented-out blocks, some copy-paste components. Match the surrounding file's style rather than "fixing" everything.
- Both `package-lock.json` and `pnpm-lock.yaml` exist; `node_modules` is installed. Use `npm` unless pnpm is explicitly requested.