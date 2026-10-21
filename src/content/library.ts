// Game library: what is the same for everyone who owns a game (its cover art and
// how to play it), as opposed to each person's copy (place, notes) stored in Supabase.
// Entries are matched to games by name, so friends' catalogs get them too.

export interface HowToPlay {
  goal: string;
  setup?: string;
  turn: string[];
  end: string;
  tip?: string;
  /** Shown when the summary is only the general idea, or the exact edition is uncertain. */
  caveat?: string;
}

export interface LibraryEntry {
  slug: string;
  /** Names it may have in a catalog (box name, Spanish name, common spelling). */
  names: string[];
  /** Missing when no reliable rules were found: better nothing than made-up rules. */
  rules?: HowToPlay;
}

/** Name key that ignores case, accents, punctuation and anything in parentheses. */
export function libraryKey(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim();
}

export const coverUrl = (entry: LibraryEntry): string => `/covers/${entry.slug}.svg`;

// Ordered from the simplest games to the most complex, like the catalog's difficulty.
export const LIBRARY: LibraryEntry[] = [
  {
    slug: 'times-up',
    names: ["Time's Up!", "Time's Up", 'Times Up'],
    rules: {
      goal: 'Que tu equipo adivine más personajes que los demás a lo largo de tres rondas.',
      setup: 'Haced equipos de dos o más. Se eligen unas 40 cartas al azar: se usarán las mismas en las tres rondas.',
      turn: [
        'Tienes 30 segundos para que tu equipo adivine todas las cartas que puedas, una tras otra.',
        'Ronda 1: puedes decir todo lo que quieras salvo el nombre. No se puede pasar.',
        'Ronda 2: solo una palabra por carta. Ronda 3: solo mímica y sonidos.',
        'Las cartas acertadas son puntos para tu equipo; el resto vuelve al mazo para el siguiente equipo.',
      ],
      end: 'Tras la tercera ronda gana el equipo con más cartas acertadas en total.',
      tip: 'Fijaos en las pistas de la ronda 1: en la 3 bastará un gesto que recuerde ese momento.',
    },
  },
  {
    slug: 'throw-throw-burrito',
    names: ['Throw Throw Burrito'],
    rules: {
      goal: 'Conseguir más puntos haciendo tríos de cartas… y esquivando burritos de goma.',
      setup: 'Cada uno recibe cartas. Los dos burritos blandos se dejan en el centro, al alcance de todos.',
      turn: [
        'No hay turnos: todos a la vez robáis cartas y vais pasando a vuestro vecino las que no queréis.',
        'Cuando juntas tres cartas iguales, las bajas y suman puntos.',
        'Algunos tríos desatan una batalla: guerra, duelo o pelea de burritos en la que hay que lanzarlos.',
        'Si un burrito te da, pierdes un punto.',
      ],
      end: 'Cuando se acaba el mazo, gana quien tenga más puntos.',
      tip: 'Ten siempre un ojo en las cartas y otro en el burrito más cercano.',
    },
  },
  {
    slug: 'sussed',
    names: ['Sussed?', 'Sussed? De todo un poco', 'Sussed'],
    rules: {
      goal: 'Adivinar qué contestaría cada uno de tus amigos a preguntas sobre su forma de ser.',
      setup: 'Cada jugador recibe tres cartas de respuesta (A, B y C) y un comodín.',
      turn: [
        'Quien lee saca una carta, lee la pregunta con sus tres respuestas y elige la suya en secreto.',
        'Los demás eligen a la vez la letra que creen que ha escogido y la muestran.',
        'Cada acierto da un punto, o dos si se jugó el comodín (solo se usa una vez por partida).',
      ],
      end: 'Tras varias rondas gana quien más puntos tenga, aunque lo bueno son las conversaciones.',
      tip: 'Hay otros modos: adivinar la respuesta más votada o de quién es cada carta.',
    },
  },
  {
    slug: 'la-polilla-tramposa',
    names: ['La era tramposa', "L'arna tramposa", 'La polilla tramposa'],
    rules: {
      goal: 'Ser el primero en quedarse sin cartas: hacer trampas está permitido.',
      setup: 'Se reparten las cartas. Un jugador es el vigilante y no puede hacer trampas.',
      turn: [
        'En tu turno juegas una carta que sea uno más o uno menos que la del centro.',
        'Si no puedes, robas. Y si nadie mira, puedes deshacerte de cartas a escondidas.',
        'Si el vigilante te pilla, recuperas la carta, robas otra de castigo y pasas a ser el vigilante.',
        'Las polillas no se pueden jugar: solo te libras de ellas haciendo trampas.',
      ],
      end: 'Gana la ronda quien se queda sin cartas sin que le hayan pillado.',
      caveat: 'Hay cartas especiales con más efectos: este es el resumen de la idea principal.',
    },
  },
  {
    slug: 'scram',
    names: ['Scram!', 'Scram'],
    rules: {
      goal: 'Que tu equipo tenga la suma de cartas más baja en su campamento al acabar cada ronda.',
      setup: 'Equipos de dos o de tres. Cada jugador tiene delante cartas de animales, unas boca arriba y otras boca abajo.',
      turn: [
        'Roba del mazo o coge la carta visible del descarte y cámbiala por una de las tuyas.',
        'Algunos animales tienen acciones: robar, intercambiar o descartar cartas.',
        'No puedes decir a tu compañero cuánto valen tus cartas ocultas.',
        'Con dos cartas o menos puedes gritar «¡Scram!»: los demás juegan un turno más y se revela todo.',
      ],
      end: 'Si quien gritó tiene menos que los rivales, apunta su suma; si no, su suma más 10. Gana el equipo con menos puntos tras varias rondas.',
    },
  },
  {
    slug: 'spoilers',
    names: ['Spoilers'],
    rules: {
      goal: 'Acertar de qué va una película… que casi seguro nadie ha visto.',
      setup: 'Jugad por equipos. Las cartas tienen el título, el año y el director por delante y las respuestas por detrás.',
      turn: [
        'Un equipo lee la carta y hace preguntas sobre la película.',
        'El equipo rival, que solo ve el título, el año y el director, apuesta por la respuesta que cree correcta.',
        'Las respuestas salen del tráiler o de la carátula, así que no son spoilers de verdad.',
      ],
      end: 'Gana el equipo que más respuestas acierta.',
      caveat: 'Resumen a partir de una reseña: el reglamento de la caja tiene el sistema de puntos exacto.',
    },
  },
  {
    slug: 'mision-secreta',
    names: ['Misión Secreta', 'Mision Secreta', 'Secret Operation'],
    rules: {
      goal: 'Los ingenieros quieren terminar un superrobot; los hackers infiltrados, impedirlo.',
      setup: 'Cada uno recibe en secreto su papel: ingeniero o hacker. Cuantos más jugadores, más hackers.',
      turn: [
        'Por turnos, cada jugador coloca una carta boca abajo en una de las cuatro partes del robot.',
        'Los hackers intentan colar piezas que no encajan sin que se note.',
        'Hablad, sospechad y acusad: nadie sabe quién está de qué lado.',
      ],
      end: 'Si el robot se completa antes de que se acabe el mazo, ganan los ingenieros; si no, los hackers.',
      caveat: 'Corresponde a «Secret Operation», que se vende en español como Misión Secreta. Comprueba que es tu caja.',
    },
  },
  {
    slug: 'chao-pescao',
    names: ['Chao Pescao', 'Chao Pescao!'],
    rules: {
      goal: 'Pescar las respuestas falsas sin morder el anzuelo de la verdadera.',
      turn: [
        'Se lee una pregunta disparatada y aparecen varias respuestas: solo una es real.',
        'Ganas puntos por cada respuesta falsa que descubres.',
        'Si destapas la verdadera, pierdes puntos.',
        'Mentir con gracia para despistar a los demás da puntos extra.',
      ],
      end: 'Gana quien más puntos tenga al acabar las preguntas.',
      caveat: 'Resumen de la idea general: el reglamento de la caja tiene el reparto de puntos exacto.',
    },
  },
  {
    slug: 'mimika',
    names: ['Mimika', 'Mímika'],
    rules: {
      goal: 'Que tu equipo adivine lo que representas sin hablar.',
      turn: [
        'Coge una carta y represéntala solo con gestos: ni palabras ni sonidos.',
        'Tu equipo tiene un tiempo limitado para acertarla.',
        'Si aciertan, ganáis la carta o avanzáis; si pasas, puedes perder un punto.',
      ],
      end: 'Gana el equipo que llegue antes a la meta o tenga más cartas.',
      caveat: 'Resumen general de los juegos de mímica: la caja puede tener reglas propias (tiempos, tablero).',
    },
  },
  // Covers drawn, rules still unknown: better to wait than to make them up.
  { slug: 'game-off', names: ['Game Off'] },
  { slug: 'alguien-ha-probado', names: ['¿Alguien ha probado este juego?', 'Alguien ha probado este juego'] },
  { slug: 'la-vacuna-espanola', names: ['La Vacuna Española', 'La vacuna espanola'] },
  { slug: 'el-cubilete', names: ['El Cubilete', 'Cubilete'] },
  { slug: 'juego-de-beber', names: ['Juego de beber sin nombre', 'Juego de beber'] },
];

const index = new Map(LIBRARY.flatMap(entry => entry.names.map(name => [libraryKey(name), entry] as const)));

export const findInLibrary = (gameName: string): LibraryEntry | undefined => index.get(libraryKey(gameName));
