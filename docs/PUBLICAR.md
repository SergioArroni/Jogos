# Lista de comprobación para publicar (`dev` → `main`)

Pasar a `main` publica la web en producción y genera la APK que usa la gente.
Marca cada punto antes de pasar al siguiente bloque.

## 1. Preparación

- [ ] **Vercel → Settings → Environment Variables:** `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_SECRET_KEY` también marcadas para **Preview**. Después, **Deployments → último de `dev` → Redeploy**.
- [ ] **GitHub → Actions:** el último commit de `dev` tiene en verde **Tests** y **Build Android APK** (los dos trabajos, *build* y *smoke-test*).
- [ ] **Copia de seguridad** de la clave de firma (`Documentos/el-baul-firma-android`) guardada fuera del PC.
- [ ] Si hay migraciones nuevas en `sql/`, ejecutadas en el SQL Editor de Supabase.

## 2. Web de prueba (`https://el-baul-de-los-jogos-git-dev-deus20.vercel.app`)

Ojo: usa la **base de datos real**. Lo que crees aquí es de verdad; bórralo al acabar.

- [ ] Entrar con **correo** y con **apodo**.
- [ ] **Catálogo:** se ven las estanterías y las portadas; los chips y la búsqueda filtran; la ficha se abre; añadir, editar y eliminar un juego de prueba.
- [ ] **Lugares:** añadir uno de prueba.
- [ ] **Qué jugamos:** al elegir un grupo pone el número de personas y salen sugerencias.
- [ ] **Partidas:** registrar una partida en un grupo con puntos, ganador y tu nota; editarla; borrarla.
- [ ] **Comunidad:** añadir un amigo por apodo; invitar a alguien nuevo (sale el enlace); compartir un grupo; si alguien te ha añadido, sale el aviso.
- [ ] **Por comprar:** dar y quitar un catán.
- [ ] **Perfil:** cambiar la foto y el apodo; probar los temas claro y oscuro.
- [ ] **Administrar usuarios** (solo con tu cuenta de administrador): carga la lista.
- [ ] Todo lo anterior también **en el navegador del móvil**.

## 3. APK de prueba (Actions → Build Android APK → último `dev` → `el-baul-de-los-jogos-dev-apk`)

- [ ] *Solo la primera vez:* desinstalar la app antigua (estaba firmada con otra clave).
- [ ] Se instala, aparece el icono del baúl y arranca con la pantalla de inicio.
- [ ] Entrar con **correo** (con apodo aún no funciona en la APK de `dev`: se comprueba en el bloque 5).
- [ ] La barra de estado se ve bien en tema claro y oscuro.
- [ ] El botón **atrás** de Android cierra los diálogos y vuelve entre secciones.
- [ ] **Compartir** una invitación abre el menú de Android.
- [ ] Al dar un catán o poner una nota, vibra.
- [ ] En **modo avión** abre y muestra tu colección, con el aviso "Sin conexión".

## 4. Publicar

- [ ] Pedirlo: «pasa `dev` a `main`». Se hace un *fast-forward*: `main` queda exactamente igual que `dev`.

## 5. Después de publicar

- [ ] `https://el-baul-de-los-jogos.vercel.app` (recarga con Ctrl+F5) muestra la versión nueva.
- [ ] **Actions → Build Android APK** del commit de `main` en verde; esa APK se instala **encima** de la de prueba sin desinstalar.
- [ ] En la APK: entrar con **apodo** y **buscar un amigo** por apodo (necesitan las funciones de producción).

## Si algo sale mal

- **Web:** Vercel → Deployments → el despliegue de producción anterior → **Instant Rollback**. Deshace la publicación en segundos.
- **Código:** pedir «revierte el último paso a `main`». Se hace un *revert* (no se borra historia).
- **APK:** la gente puede seguir con la versión que tiene; la siguiente APK corregida se instalará encima.
