# Arquitectura de El Baúl de los Jogos

## Las piezas

```
 Navegador / APK  ──HTTP──▶  Supabase  (backend como servicio)
 (Vite + Svelte)              ├─ Postgres: tablas
                              ├─ PostgREST: API REST generada a partir de las tablas
                              ├─ Auth: cuentas y sesiones
                              ├─ Storage: fotos de perfil
                              └─ RLS: reglas de quién puede leer/escribir cada fila
                 ──HTTP──▶  Vercel Functions (api/*.js)
                              Lo que necesita la clave secreta de Supabase:
                              administrar usuarios, entrar con apodo, buscar cuentas.
```

Además, `mcp/` (TypeScript) es el servidor MCP que se publica como la función `/api/mcp` y reutiliza `src/domain/`:
Claude o ChatGPT lo llaman con el token del usuario y él consulta Supabase con ese token,
así que las mismas reglas RLS deciden qué ve cada uno.

La seguridad vive en la base de datos (políticas RLS en `sql/`). El frontend nunca
tiene la clave secreta: aunque alguien manipule el JavaScript, Postgres decide.

## Capas del frontend (`src/`)

Cada capa solo conoce a la de debajo:

| Carpeta | Responsabilidad | Ejemplos |
|---|---|---|
| `domain/` | Lógica pura: no sabe nada de Supabase ni de pantallas. Fácil de testear. | estadísticas, recomendador, portadas, sync incremental |
| `data/` | Lo único que habla con Supabase o con `localStorage`. | `collection.ts`, `plays.ts`, `social.ts` |
| `platform/` | Lo único que habla con el móvil (Capacitor). En la web no hace nada o usa el equivalente del navegador. | barra de estado, botón atrás, vibración, compartir |
| `stores/` | Estado compartido de la app y acciones (guardar, recargar). | `app.svelte.ts`, `confirm.svelte.ts` |
| `components/` | Piezas visuales reutilizables. | `Modal`, `Avatar`, `GameCover` |
| `sections/` | Pantallas completas. | `Catalog`, `Plays`, `Community` |

`login.html` y `admin.html` siguen siendo HTML simple; se migrarán más adelante.

## Ramas

```
dev ──▶ main
```

- **dev**: donde se trabaja y se prueba. Vercel publica una URL de prueba para cada push.
- **main**: producción (https://el-baul-de-los-jogos.vercel.app) y la APK de Android.

Las dos usan **el mismo proyecto de Supabase**, así que los datos que crees probando
en `dev` son reales. Si algún día hace falta aislarlos, se crea un segundo
proyecto de Supabase para pruebas.

## Tests

| Comando | Qué prueba | Necesita |
|---|---|---|
| `npm test` | `domain/` con Vitest (lógica pura) | nada |
| `npm run check` | Tipos de TypeScript y Svelte | nada |
| `npx playwright test --project=local --project=local-mobile` | La app real en Chrome, en modo local (sin backend) | Chrome |
| `npm run test:integration` | La app contra Postgres + PostgREST en Docker con **todas las migraciones de `sql/` y las reglas RLS**, con varios usuarios | Docker |
| `npm run mcp` | Arranca el servidor MCP en local (`http://127.0.0.1:8791/mcp`) | — |

GitHub Actions (`.github/workflows/tests.yml`) ejecuta todo en cada push a `dev` y `main`.

Las decisiones importantes y su porqué están en [`DECISIONES.md`](DECISIONES.md), y los pasos para publicar en [`PUBLICAR.md`](PUBLICAR.md).

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:5173/?local=1 para trabajar sin cuenta
npm run build        # genera dist/, lo que publica Vercel
```
