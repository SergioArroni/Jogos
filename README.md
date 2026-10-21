# El Baul de los Jogos

La web está publicada en Vercel: https://el-baul-de-los-jogos.vercel.app/. El repositorio de GitHub está conectado para publicar cada cambio automáticamente. Supabase guarda los juegos, lugares, amigos y grupos por usuario. El acceso es con correo electrónico y una contraseña propia de la aplicación; no requiere Google Cloud.

## Conectar Supabase

1. En el **SQL Editor** de tu proyecto, ejecuta el contenido de [`sql/schema.sql`](https://raw.githubusercontent.com/SergioArroni/el-baul-de-los-jogos/main/sql/schema.sql). Crea las tablas y sus políticas Row Level Security para que cada persona solo acceda a sus propios datos.
2. Ejecuta también [`sql/unique-game-names.sql`](https://raw.githubusercontent.com/SergioArroni/Jogos/main/sql/unique-game-names.sql). Elimina duplicados de juegos con el mismo nombre dentro de cada colección, conserva el registro más antiguo y crea una restricción única por usuario y nombre (ignorando mayúsculas y espacios exteriores).
3. Ejecuta también [`sql/user-features.sql`](sql/user-features.sql), que añade amigos reutilizables, perfiles con apodos únicos, grupos compartibles y la lista común de próximas compras. Después ejecuta [`sql/bootstrap-admin.sql`](sql/bootstrap-admin.sql) para dar rol de administrador a `sergioadgi38@gmail.com` (esa cuenta debe haberse registrado antes).
4. En **Authentication → Sign In / Providers → Email**, deja habilitado el acceso por correo y permite crear usuarios. Mantén la confirmación del correo activada para verificar la dirección. Usa una contraseña de la ludoteca, distinta de la de Gmail.
5. En **Authentication → URL Configuration**, usa `https://el-baul-de-los-jogos.vercel.app` como **Site URL** y añade `https://el-baul-de-los-jogos.vercel.app/**` a **Redirect URLs**. Para que funcionen también las previsualizaciones de ramas, añade `https://*-deus20.vercel.app/**`. Al crear la cuenta, Supabase enviará un correo de confirmación. El envío de prueba de Supabase tiene límites; si el mensaje no llega a tu dirección, configura un proveedor SMTP propio.
6. En **Connect** o **Settings → API Keys**, copia la **Project URL** y la **Publishable key** (`sb_publishable_...`). Copia `public/supabase-config.example.js` como `public/supabase-config.js` y pega los valores:

   ```js
   window.LUDOTECA_SUPABASE = {
     url: "https://TU-PROYECTO.supabase.co",
     publishableKey: "sb_publishable_TU_CLAVE"
   };
   ```

   La publishable key puede publicarse en el navegador; Row Level Security protege los datos. Nunca incluyas una `secret` o `service_role` en la web.
7. En Vercel, añade estas variables de entorno en **Settings → Environment Variables**: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_SECRET_KEY`. La última es la clave `sb_secret_...` y solo la utilizan las funciones de `/api`; nunca la pegues en `supabase-config.js` ni la subas al repositorio.
8. Publica `public/supabase-config.js` en la rama `main`. Vercel se actualizará automáticamente al subir cambios a `main`. Al iniciar sesión por primera vez, la aplicación sube la colección local si todavía no hay datos en la cuenta.

La página [`login.html`](login.html) permite crear una cuenta con correo, contraseña y apodo único, e iniciar sesión con el correo o el apodo. La página incluye recuperación de contraseña. Ejecuta [`sql/community-plays.sql`](sql/community-plays.sql) en el SQL Editor de Supabase para activar las fotos de perfil (incluye `profile-appearance.sql`), compartir grupos con amigos vinculados, los avisos de «te ha añadido como amigo», las partidas con notas por persona y el guardado incremental (solo se envían los cambios). Sin ese script la app sigue funcionando con el guardado antiguo. La pestaña Partidas organiza las partidas por grupo, con estadísticas, puntos, ganadores y la nota que cada participante pone desde su cuenta. La apariencia del tema se ajusta desde el menú de perfil y, por defecto, sigue el tema del dispositivo. La sección Amigos guarda contactos reutilizables en distintos grupos; cada grupo puede compartirse con una cuenta usando su correo. Si el nombre de un amigo coincide con el apodo de una cuenta, se vincula a ella; si no, la app ofrece un enlace de invitación al registro con un apodo propuesto y vincula al amigo cuando se registra con ese apodo (usa `/api/friend-lookup`). La página [`admin.html`](admin.html) permite al administrador revisar usuarios y suspender o restaurar cuentas. Cuando Supabase está conectado, la colección requiere iniciar sesión y se sincroniza por usuario. La clave antigua `anon` también es compatible. En modo local, abre `index.html?local=1`.

## Desarrollo

La app está hecha con Vite + TypeScript + Svelte (`src/`). Lee [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) para entender las capas, las ramas (`dev` → `main`) y los tests, y [`docs/DECISIONES.md`](docs/DECISIONES.md) para saber por qué se eligió cada cosa.

```bash
npm install
npm run dev                # http://localhost:5173/?local=1
npm run check && npm test  # tipos y tests unitarios
npm run test:integration   # app + Postgres en Docker con todas las migraciones
```

`public/supabase-config.js` contiene la URL y la clave pública de Supabase.

## APK Android

Los logos originales están en `assets/logo-original/`. Si cambian, ejecuta `python scripts/brand-assets.py` para regenerar los iconos de la web (`public/brand/`) y de la APK (`assets/`); la APK aplica el icono al compilarse.

La aplicación Android abre la misma web publicada y necesita Internet. Al iniciar sesión en Android usa el mismo correo y contraseña. No necesita Google Cloud.

El último APK de depuración se descarga en GitHub desde **Actions → Build Android APK → Artifacts → el-baul-de-los-jogos-debug-apk**. Se genera uno nuevo en cada push a `main`. Para publicarlo en Google Play hace falta crear una versión firmada de producción.
