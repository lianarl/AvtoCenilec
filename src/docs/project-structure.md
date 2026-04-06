# Struktura projekta

## Razporeditev v korenski mapi

- `.gitignore`
- `README.md`
- `docs/`
- `config/`
- `index.html`
- `package.json`
- `package-lock.json`
- `public/`
- `src/`
- `tsconfig.json`
- `tsconfig.app.json` (posredna datoteka, ki razširi `config/tsconfig.app.json`)

## Zakaj obstaja `config/`

Mapa `config/` centralizira nastavitve za build, teste, lint in preverjanje tipov, da je korenska mapa osredotočena na aplikacijsko kodo in uvodne datoteke.

Trenutno vsebuje:

- `vite.config.ts`
- `vitest.config.ts`
- `eslint.config.js`
- `postcss.config.js`
- `tailwind.config.ts`
- `tsconfig.app.json`
- `tsconfig.node.json`

## Potek dela razvijalca

Še vedno uporabljaš iste npm skripte iz korenske mape projekta:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`

Skripte kažejo na datoteke v `config/`, zato dodatni ukazi niso potrebni.
