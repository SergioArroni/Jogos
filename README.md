# Mi ludoteca

La web está publicada en GitHub Pages. Supabase guarda los juegos y grupos por usuario. El acceso es con correo electrónico y una contraseña propia de la aplicación; no requiere Google Cloud.

## Conectar Supabase

1. En el **SQL Editor** de tu proyecto, ejecuta el contenido de [`sql/schema.sql`](https://raw.githubusercontent.com/SergioArroni/Jogos/main/sql/schema.sql). Crea las tablas y sus políticas Row Level Security para que cada persona solo acceda a sus propios datos.
2. En **Authentication → Sign In / Providers → Email**, deja habilitado el acceso por correo y permite crear usuarios. Mantén la confirmación del correo activada para verificar la dirección. Usa una contraseña de la ludoteca, distinta de la de Gmail.
3. En **Authentication → URL Configuration**, usa `https://sergioarroni.github.io/Jogos/` como **Site URL** y añádela también a **Redirect URLs**. Al crear la cuenta, Supabase enviará un correo de confirmación. El envío de prueba de Supabase tiene límites; si el mensaje no llega a tu dirección, configura un proveedor SMTP propio.
4. En **Connect** o **Settings → API Keys**, copia la **Project URL** y la **Publishable key** (`sb_publishable_...`). Copia `supabase-config.example.js` como `supabase-config.js` y pega los valores:

   ```js
   window.LUDOTECA_SUPABASE = {
     url: "https://TU-PROYECTO.supabase.co",
     publishableKey: "sb_publishable_TU_CLAVE"
   };
   ```

   La publishable key puede publicarse en el navegador; Row Level Security protege los datos. Nunca incluyas una `secret` o `service_role` en la web.
5. Publica `supabase-config.js` en la rama `main`. GitHub Pages se actualizará automáticamente. Al iniciar sesión por primera vez, la aplicación sube la colección local si todavía no hay datos en la cuenta.

La clave antigua `anon` también es compatible. Hasta configurar Supabase, la aplicación continúa funcionando con almacenamiento local y copias JSON.

## APK Android

La aplicación Android abre la misma web publicada y necesita Internet. Al iniciar sesión en Android usa el mismo correo y contraseña. No necesita Google Cloud.

El último APK de depuración se descarga en GitHub desde **Actions → Build Android APK → Artifacts → mi-ludoteca-debug-apk**. También se genera uno nuevo automáticamente al actualizar la web o la configuración Android. Para publicarlo en Google Play hace falta crear una versión firmada de producción.
