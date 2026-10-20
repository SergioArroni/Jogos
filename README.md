# El Baul de los Jogos

La web está publicada en Vercel: https://mi-ludoteca-kappa.vercel.app/. El repositorio de GitHub está conectado para publicar cada cambio automáticamente. Supabase guarda los juegos, lugares, amigos y grupos por usuario. El acceso es con correo electrónico y una contraseña propia de la aplicación; no requiere Google Cloud.

## Conectar Supabase

1. En el **SQL Editor** de tu proyecto, ejecuta el contenido de [`sql/schema.sql`](https://raw.githubusercontent.com/SergioArroni/el-baul-de-los-jogos/main/sql/schema.sql). Crea las tablas y sus políticas Row Level Security para que cada persona solo acceda a sus propios datos.
2. Ejecuta también [`sql/unique-game-names.sql`](https://raw.githubusercontent.com/SergioArroni/Jogos/main/sql/unique-game-names.sql). Elimina duplicados de juegos con el mismo nombre dentro de cada colección, conserva el registro más antiguo y crea una restricción única por usuario y nombre (ignorando mayúsculas y espacios exteriores).
3. Ejecuta también [`sql/user-features.sql`](sql/user-features.sql), que añade amigos reutilizables, perfiles con apodos únicos, grupos compartibles y la lista común de próximas compras. Después ejecuta [`sql/bootstrap-admin.sql`](sql/bootstrap-admin.sql) para dar rol de administrador a `sergioadgi38@gmail.com` (esa cuenta debe haberse registrado antes).
4. En **Authentication → Sign In / Providers → Email**, deja habilitado el acceso por correo y permite crear usuarios. Mantén la confirmación del correo activada para verificar la dirección. Usa una contraseña de la ludoteca, distinta de la de Gmail.
5. En **Authentication → URL Configuration**, usa `https://mi-ludoteca-kappa.vercel.app` como **Site URL** y añade `https://mi-ludoteca-kappa.vercel.app/**` a **Redirect URLs**. Para que funcionen también las previsualizaciones de ramas, añade `https://*-deus20.vercel.app/**`. Al crear la cuenta, Supabase enviará un correo de confirmación. El envío de prueba de Supabase tiene límites; si el mensaje no llega a tu dirección, configura un proveedor SMTP propio.
6. En **Connect** o **Settings → API Keys**, copia la **Project URL** y la **Publishable key** (`sb_publishable_...`). Copia `supabase-config.example.js` como `supabase-config.js` y pega los valores:

   ```js
   window.LUDOTECA_SUPABASE = {
     url: "https://TU-PROYECTO.supabase.co",
     publishableKey: "sb_publishable_TU_CLAVE"
   };
   ```

   La publishable key puede publicarse en el navegador; Row Level Security protege los datos. Nunca incluyas una `secret` o `service_role` en la web.
7. En Vercel, añade estas variables de entorno en **Settings → Environment Variables**: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_SECRET_KEY`. La última es la clave `sb_secret_...` y solo la utiliza `/api/admin-users`; nunca la pegues en `supabase-config.js` ni la subas al repositorio.
8. Publica `supabase-config.js` en la rama `main`. Vercel se actualizará automáticamente al subir cambios a `main`. Al iniciar sesión por primera vez, la aplicación sube la colección local si todavía no hay datos en la cuenta.

La página [`login.html`](login.html) permite crear una cuenta con correo, contraseña y apodo único, e iniciar sesión con el correo o el apodo. La sección Amigos guarda contactos reutilizables en distintos grupos; cada grupo puede compartirse con una cuenta usando su correo. La página [`admin.html`](admin.html) permite al administrador revisar usuarios y suspender o restaurar cuentas. Cuando Supabase está conectado, la colección requiere iniciar sesión y se sincroniza por usuario. La clave antigua `anon` también es compatible. Hasta configurar Supabase, puedes seguir usando el modo local desde el enlace de la página de acceso o abriendo `index.html?local=1`.

## APK Android

La aplicación Android abre la misma web publicada y necesita Internet. Al iniciar sesión en Android usa el mismo correo y contraseña. No necesita Google Cloud.

El último APK de depuración se descarga en GitHub desde **Actions → Build Android APK → Artifacts → el-baul-de-los-jogos-debug-apk**. También se genera uno nuevo automáticamente al actualizar la web o la configuración Android. Para publicarlo en Google Play hace falta crear una versión firmada de producción.
