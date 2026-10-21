# Decisiones de arquitectura (ADR)

Una entrada por decisión importante: qué se decidió, por qué y qué se descartó.
Cuando una decisión cambie, no se borra: se marca como **Sustituida** y se añade otra nueva.

---

## 1. Supabase como backend
**Estado:** Aceptada

- **Contexto:** app personal, una sola persona la mantiene, sin presupuesto para servidores.
- **Decisión:** usar Supabase (Postgres + API REST automática + login + almacenamiento) en vez de programar un backend propio.
- **Alternativas:** backend propio (Rust, Node…) en un servidor; Firebase.
- **Consecuencias:** casi nada que mantener y plan gratuito. A cambio dependemos de Supabase, y la lógica que necesita una clave secreta va en funciones de Vercel (`api/`).

## 2. Seguridad en la base de datos (RLS)
**Estado:** Aceptada

- **Contexto:** el navegador habla directamente con la base de datos, así que no se puede confiar en el JavaScript.
- **Decisión:** cada regla de acceso es una política RLS en Postgres (`sql/`): quién ve un grupo, quién puede poner una nota, etc.
- **Alternativas:** comprobar los permisos en un backend propio.
- **Consecuencias:** las reglas se aplican siempre, venga la petición de la web, de la APK o de un futuro servidor MCP. Hay que probarlas con varios usuarios (tests de integración).

## 3. App móvil con Capacitor
**Estado:** Sustituida por la 9

- **Contexto:** se quería una APK sin mantener una segunda app.
- **Decisión:** Capacitor envuelve la web en una app Android que carga la URL publicada en Vercel.
- **Alternativas:** React Native o Flutter (app nativa aparte), PWA instalable.
- **Consecuencias:** un solo código para web y móvil, y cada cambio en la web llega al móvil sin reinstalar. Necesita Internet y no aprovecha funciones nativas avanzadas.

## 4. Frontend con Vite + TypeScript + Svelte
**Estado:** Aceptada, en `dev` y pendiente de pasar a `main`

- **Contexto:** todo el frontend estaba en un único `index.html` difícil de mantener. Una sola persona, app dentro de una APK, objetivo de aprender arquitectura.
- **Decisión:** Svelte con TypeScript, compilado con Vite, separado en capas (`domain/`, `data/`, `stores/`, `components/`, `sections/`).
- **Alternativas:** Angular (+ Spartan), React, Vue, Astro.
- **Consecuencias:** poco código y una app ligera; la estructura la definimos nosotros. Angular daría más estructura hecha y más salida laboral, a cambio de más código.

## 5. Guardado incremental
**Estado:** Aceptada

- **Contexto:** cada guardado borraba todos los datos en la nube y los volvía a subir. Un fallo a mitad o dos dispositivos a la vez podían perder datos.
- **Decisión:** cada fila guarda el id del elemento (`app_id`) y solo se envía lo que cambió desde la última carga.
- **Alternativas:** seguir reemplazando todo; sincronización en tiempo real.
- **Consecuencias:** sin pérdidas y menos tráfico. Si dos dispositivos editan el mismo juego, gana el último en guardar.

## 6. Dos ramas: `dev` y `main`
**Estado:** Aceptada. Sustituye a la propuesta inicial `dev` → `staging` → `main`.

- **Contexto:** cada push a `main` publica la web y genera la APK.
- **Decisión:** se trabaja en `dev` (con URL de prueba de Vercel) y se pasa a `main` cuando está listo.
- **Alternativas:** una sola rama; añadir `staging`.
- **Consecuencias:** producción protegida con el mínimo de pasos. `staging` no aportaba nada en una app pequeña.

## 7. Tests en tres niveles
**Estado:** Aceptada

- **Contexto:** hay lógica (estadísticas, recomendaciones), pantallas y reglas de seguridad que pueden romperse por separado.
- **Decisión:** tests unitarios de `domain/` (Vitest), tests de navegador sin backend (Playwright) y tests de integración contra Postgres en Docker con todas las migraciones. Se ejecutan en GitHub en cada push.
- **Alternativas:** probar a mano; solo tests unitarios.
- **Consecuencias:** los cambios se publican con confianza. Los de integración necesitan Docker y tardan más.

## 8. Asistente de IA mediante MCP
**Estado:** Aceptada. Prototipo (fase 1) hecho en `dev`: servidor rmcp en `mcp/` con `list_games` y `who_am_i`; falta el login OAuth (fase 2)

- **Contexto:** se quiere hablar con la app desde Claude o ChatGPT sin pagar el uso de los modelos.
- **Decisión:** un servidor MCP en Rust (rmcp) que cada usuario conecta en su propio Claude o ChatGPT. Entra con su cuenta de la app (OAuth de Supabase), así que RLS sigue protegiendo los datos.
- **Alternativas:** chat dentro de la app con una clave de API pagada por el dueño; que cada usuario ponga su propia clave de API.
- **Consecuencias:** coste de modelos cero para el dueño. Depende de que los planes de Claude y ChatGPT permitan conectores. Antes de construirlo hay que probar con un prototipo que rmcp funciona en Vercel.

## 9. Capacitor con la app empaquetada
**Estado:** Aceptada, en `dev`. Sustituye a la 3.

- **Contexto:** la APK solo abría la web publicada: sin Internet no funcionaba y se sentía como un acceso directo.
- **Decisión:** la app compilada (`dist/`) va dentro de la APK, con funciones nativas de Capacitor (pantalla de inicio, barra de estado, botón atrás, vibración, menú de compartir) y diseño bajo la barra de estado (edge-to-edge). El código del móvil vive en una sola capa: `src/platform/`.
- **Alternativas:** Tauri 2 (núcleo en Rust, menos rodado en móvil), Svelte Native (pantallas nativas, poco mantenido), PWA, React Native o una app nativa aparte (otro código distinto).
- **Consecuencias:** arranca rápido y sin conexión muestra la última copia. Cada cambio necesita una APK nueva, que GitHub genera y prueba en un emulador. Las funciones de `api/` aceptan peticiones de la app (CORS). Lo que se edita sin conexión no se sube después.

## 10. Firma fija de la APK
**Estado:** Aceptada

- **Contexto:** cada compilación firmaba la APK con una clave de depuración distinta, y Android obligaba a desinstalar la app para actualizarla.
- **Decisión:** APK de *release* firmada siempre con la misma clave. La clave está guardada como secreto cifrado en GitHub y con copia del dueño fuera del repositorio. El número de versión es el número de ejecución de GitHub.
- **Alternativas:** seguir con APK de depuración; dejar que Google Play firme la app (Play App Signing).
- **Consecuencias:** las actualizaciones se instalan encima y la app queda lista para publicarse en Google Play. **Si la clave se pierde, la app ya no se puede actualizar**: la copia de seguridad es obligatoria.

## 11. Estadísticas de visitas con Vercel Web Analytics
**Estado:** Aceptada, en `dev`

- **Contexto:** se quería saber si la app se usa, y verlo dentro de la página de administración.
- **Decisión:** Vercel Web Analytics cuenta las visitas de la web (sin cookies ni datos personales). La función `api/analytics.js` las lee con un token de Vercel que solo vive en el servidor, comprueba que quien pregunta es el administrador (`api/_admin.js`, compartido con `api/admin-users.js`) y la página de admin las dibuja.
- **Alternativas:** mirarlas solo en el panel de Vercel; contar visitas en una tabla propia de Supabase (contaría también la APK, pero es más código y datos que guardar).
- **Consecuencias:** gratis hasta 50.000 visitas al mes y con 1 mes de historial (plan Hobby). La APK no se cuenta. Sin eventos personalizados en este plan, no se sabe qué sección se usa más. El token de Vercel da acceso a la cuenta, así que debe caducar y guardarse como variable sensible.

