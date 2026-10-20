# Mi ludoteca

La web se publica como sitio estático en GitHub Pages. Supabase añade inicio de sesión Google y sincronización de juegos y grupos. La app Android hecha con Capacitor carga la misma web y abre Google en una pestaña segura del sistema.

## Conectar Supabase y Google

1. Crea un proyecto en [Supabase](https://supabase.com/) y ejecuta `sql/schema.sql` en SQL Editor. Las políticas RLS limitan cada fila al usuario autenticado.
2. En **Authentication → Providers**, habilita Google. En Google Cloud crea credenciales OAuth de tipo aplicación web y añade como URI de redirección autorizada la URL de callback que muestra Supabase: `https://TU-PROYECTO.supabase.co/auth/v1/callback`.
3. Copia el Client ID y Client Secret de Google en la configuración del proveedor Google en Supabase.
4. En Supabase **Authentication → URL Configuration**, añade `https://sergioarroni.github.io/Jogos/` a **Site URL** y a **Redirect URLs**. Añade también `es.sergioarroni.miludoteca://login-callback` a **Redirect URLs** para el APK.
5. Copia `supabase-config.example.js` a `supabase-config.js` y pega la Project URL y la anon/public key desde **Project Settings → API**. Este archivo solo debe contener la clave pública anon. Nunca pongas la `service_role` en la web; la anon key está protegida por las políticas RLS.
6. Guarda y publica `supabase-config.js` junto a `index.html` en la rama `main` de GitHub. La clave anon es pública, así que puede estar en Pages. El primer inicio de sesión importa los datos locales al cloud si la cuenta aún no tiene colección.

Mientras no se configure Supabase, el catálogo sigue funcionando en localStorage y puedes usar las copias JSON.

## App Android (APK)

La app Android carga el sitio de GitHub Pages con `server.url` en `capacitor.config.json`. Google se abre fuera del WebView y vuelve a la app mediante un enlace profundo. La app necesita Internet.

1. Comprueba que la URL `https://sergioarroni.github.io/Jogos/` en `capacitor.config.json` coincide con la web publicada.
2. Instala Node.js 22 o superior y Android Studio con Android SDK (Capacitor 8).
3. Ejecuta `npm install`, `npm run android:add` y después `npm run android:open`.
4. En Android Studio genera el APK desde **Build → Build Bundle(s) / APK(s) → Build APK(s)**. Para distribuirlo, crea una firma de release desde Android Studio.

Los cambios web se reflejan al abrir la app. Solo tendrás que reconstruir Android si modificas el contenedor o su configuración.
