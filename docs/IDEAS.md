# Ideas pendientes

Lista de cosas por hacer, en el orden en que se apuntaron. Cuando una se empieza,
se decide su diseño (y si es una decisión de arquitectura, va a `DECISIONES.md`).
Al terminarla, se borra de aquí.

## Ya hablado, falta hacerlo

- **Pasar `dev` a `main`** siguiendo `PUBLICAR.md`. Arregla el «Failed to fetch» al entrar con apodo
  en la APK (producción aún no da permiso CORS a la app) y empieza a contar visitas.
- **APK de `dev` contra el servidor de `dev`** (opción A): que cada APK hable con el servidor de su
  misma rama, para que no se rompa cuando la APK es más nueva que producción.
- **Fase 2 del MCP (OAuth).** Supabase ya está configurado: falta la página `/oauth/consent`,
  `/.well-known/oauth-protected-resource`, la cabecera `WWW-Authenticate`, tests y una guía para
  conectar Claude y ChatGPT.
- **Reglas de 7 juegos** sin explicación fiable: Game Off, ¿Alguien ha probado este juego?,
  La Vacuna Española, El Cubilete, el juego de beber, Codex y Brink.

## Ideas nuevas

### 1. Juego al azar por lugar
Eliges un lugar (o «donde estemos») y te sale un juego al azar de los que hay allí, con su
portada y un botón para «otro». Se puede filtrar por número de jugadores y tiempo.
- Datos: ya están (cada juego tiene su lugar).
- Tamaño: pequeño. Lógica en `domain/`, con tests.

### 2. Recomendaciones con aprendizaje (sistema de recomendación básico)
Mejorar «Qué jugamos» usando el historial de puntuaciones, tuyo y del grupo.
- Datos: cada partida guarda, por jugador, la nota (1–10), los puntos y si ganó.
- Ideas de técnica, de menos a más:
  - Basado en contenido: si te gustan los juegos con ciertos estilos y dureza, te propone otros parecidos.
  - Filtrado colaborativo: «a gente con gustos parecidos a los tuyos les encantó X».
  - Para un grupo: combinar las preferencias de los que juegan (media, o evitar lo que alguien odia).
  - Explorar y explotar: de vez en cuando proponer algo poco jugado para no repetir siempre lo mismo.
- Decidir: si se calcula en el navegador o en el servidor, y cómo explicar al usuario «por qué te lo recomiendo».
- Tamaño: mediano-grande. Buena para aprender: empezar simple, medir y mejorar.

### 3. Buscar juegos nuevos con BoardGameGeek
Buscar juegos que no tienes (por nombre, estilo, número de jugadores…) con datos de BGG, y
añadirlos a «Por comprar».
- BGG tiene una API XML pública; puede pedir registro o token y tiene límites de uso.
  Hay que llamarla desde una función de `api/` (no desde el navegador) y guardar en caché.
- Decidir: qué datos guardamos y cómo respetamos sus condiciones de uso.
- Tamaño: mediano.

### 4. Ranking de mejores juegos (pestaña nueva)
Una pestaña con los juegos mejor valorados de todos los usuarios, de cada grupo y tuyos.
- Datos: las notas de las partidas.
- Decidir: cómo ordenar sin que un juego con una sola nota de 10 gane a uno con cincuenta notas
  de 9 (media bayesiana); y qué se ve de otros usuarios (privacidad, RLS).
- Seguramente una vista o función en Supabase para el ranking global.
- Tamaño: mediano.

### 5. Estadísticas en el perfil
En cada perfil: mejor juego, el que más te gusta, el que más juegas, con el que más ganas y más
pierdes, rachas, con quién juegas más, etc.
- Datos: ya están (partidas, ganadores, notas, puntos).
- Decidir: qué ve cada uno del perfil de otro.
- Tamaño: mediano. Mucha lógica pura en `domain/` (fácil de testear).
