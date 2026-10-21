// Weight 1: the simplest games, the first ones to explain.
import type { HowToPlay, LibraryEntry } from './library';

const CODENAMES: HowToPlay = {
  goal: 'Que tu equipo encuentre a todos sus agentes antes que el rival, con pistas de una sola palabra.',
  setup: 'Dos equipos, cada uno con un jefe de espías. Se ponen 25 cartas con palabras en una cuadrícula de 5×5. Solo los jefes ven la carta clave: qué palabras son de cada equipo, cuáles son civiles y cuál es el asesino.',
  turn: [
    'Tu jefe da una pista: una palabra y un número (cuántas cartas de la mesa tienen que ver con ella).',
    'Tu equipo toca palabras de una en una. Si es vuestra, podéis seguir, hasta el número más uno.',
    'Si es un civil o del rival, se acaba el turno. Si es el asesino, perdéis al momento.',
  ],
  end: 'Gana el primer equipo que descubre a todos sus agentes.',
  tip: 'Una pista que une tres palabras vale oro, pero comprueba que no lleva también al asesino.',
};

const TRIVIAL: HowToPlay = {
  goal: 'Ser el primero en llenar tu ficha con los seis quesitos de colores y acertar la pregunta final.',
  setup: 'Cada jugador o equipo tiene una ficha vacía y empieza en el centro del tablero.',
  turn: [
    'Tira el dado y mueve en la dirección que quieras.',
    'Te hacen una pregunta del color de la casilla. Si aciertas, vuelves a tirar; si fallas, pasa el turno.',
    'Si aciertas en una casilla grande de quesito, te lo llevas.',
  ],
  end: 'Con los seis quesitos vuelve al centro y responde una pregunta de la categoría que elijan los demás: si aciertas, ganas.',
};

const THEMED_TRIVIAL = 'Algunas ediciones temáticas son de bolsillo, sin tablero: se gana un quesito al acertar preguntas de su color.';

export const LIGHT: LibraryEntry[] = [
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
  {
    slug: 'torre-de-bloques',
    names: ['Torre de bloques', 'Klodsmajor', 'Jenga'],
    rules: {
      goal: 'No ser quien derribe la torre.',
      setup: 'Monta la torre por pisos de tres bloques, cada piso cruzado con el de abajo.',
      turn: [
        'Saca con una sola mano un bloque de cualquier piso, menos de los de arriba del todo.',
        'Ponlo arriba del todo, cruzado con el piso anterior.',
        'Puedes tantear bloques para ver cuál está suelto antes de decidirte.',
      ],
      end: 'Pierde quien hace caer la torre.',
    },
  },
  {
    slug: 'timeline',
    names: ['Timeline'],
    rules: {
      goal: 'Quedarte sin cartas colocando cada invento o suceso en su sitio de la línea del tiempo.',
      setup: 'Cada jugador recibe 4 cartas con la fecha oculta por detrás. Se pone una carta en el centro con la fecha a la vista.',
      turn: [
        'Elige una de tus cartas y colócala antes, después o entre las que ya hay en la mesa.',
        'Dale la vuelta: si la fecha encaja, se queda.',
        'Si fallas, se descarta y robas otra.',
      ],
      end: 'Gana quien se queda sin cartas primero. Si lo consiguen varios en la misma ronda, se juega otra entre ellos.',
      tip: 'Puedes mezclar varias latas en un solo mazo.',
    },
  },
  {
    slug: 'codigo-secreto',
    names: ['Código Secreto', 'Codenames'],
    rules: CODENAMES,
  },
  {
    slug: 'codigo-secreto-disney',
    names: ['Código Secreto Disney', 'Codenames Disney'],
    rules: { ...CODENAMES, tip: 'Son las reglas de Código Secreto, con personajes y lugares de Disney.' },
  },
  {
    slug: 'just-one',
    names: ['Just One'],
    rules: {
      goal: 'Adivinar juntos el mayor número posible de palabras de las 13 cartas del mazo.',
      turn: [
        'Uno roba una carta sin mirarla y elige un número: los demás ven la palabra secreta.',
        'Cada uno escribe en secreto una pista de una sola palabra en su pizarrita.',
        'Antes de enseñarlas, se tachan las pistas repetidas.',
        'Con las que quedan, el que adivina tiene una oportunidad. Si no lo ve claro, puede pasar.',
      ],
      end: 'Al acabar las 13 cartas, se cuentan los aciertos. Fallar quita además una carta del mazo.',
      tip: 'Evita la pista más obvia: si otro piensa lo mismo, se anularán las dos.',
    },
  },
  {
    slug: 'so-clover',
    names: ['So Clover!', 'So Clover'],
    rules: {
      goal: 'Que entre todos recoloquéis las cartas de cada trébol a partir de las pistas de su dueño.',
      setup: 'Cada jugador recibe un trébol y cuatro cartas con palabras en los bordes, que coloca en secreto.',
      turn: [
        'Cada uno escribe en su trébol cuatro pistas: cada una une las dos palabras que quedan juntas.',
        'Por turnos, los demás reciben las cartas de un trébol (más una que despista) e intentan recolocarlas.',
        'El dueño no puede ayudar. Si fallan, tienen un segundo intento con las cartas mal puestas.',
      ],
      end: 'Se suman los puntos de todos los tréboles: cuantos más, mejor lo habéis hecho como equipo.',
    },
  },
  {
    slug: 'virus',
    names: ['Virus!', 'Virus'],
    rules: {
      goal: 'Ser el primero en tener cuatro órganos sanos de distinto color.',
      setup: 'Cada jugador recibe tres cartas. Hay órganos, virus, medicinas y tratamientos.',
      turn: [
        'Juega una carta o descarta las que quieras; después roba hasta tener tres.',
        'Los órganos se ponen delante de ti. Los virus se juegan sobre órganos rivales del mismo color: dos virus lo destruyen.',
        'Una medicina cura un virus; dos medicinas vacunan el órgano para siempre.',
        'Los tratamientos tienen efectos especiales: robar o intercambiar órganos, contagiar…',
      ],
      end: 'Gana quien completa primero un cuerpo con cuatro órganos sanos de colores diferentes.',
    },
  },
  {
    slug: 'sushi-go',
    names: ['Sushi Go!', 'Sushi Go'],
    rules: {
      goal: 'Conseguir más puntos con los platos de sushi que te quedas durante tres rondas.',
      setup: 'Se reparten cartas a todos: más cuantos menos jugadores seáis.',
      turn: [
        'Todos a la vez eligen una carta de su mano y la ponen boca abajo delante.',
        'Se descubren y cada uno pasa el resto de su mano al jugador de al lado.',
        'Así hasta que no quedan cartas. Cada plato puntúa a su manera: sashimi de tres en tres, tempura por parejas, makis para quien más tenga…',
        'Los postres (pudin) se guardan hasta el final.',
      ],
      end: 'Tras tres rondas se puntúan los postres (quien más tiene suma, quien menos resta) y gana quien más puntos tiene.',
      tip: 'Fíjate en lo que pasas: lo que no quieres puede ser justo lo que necesita tu vecino.',
    },
  },
  {
    slug: 'hues-and-cues',
    names: ['Hues and Cues', 'Hues & Cues'],
    rules: {
      goal: 'Que los demás encuentren tu color exacto, entre 480, con pistas de una o dos palabras.',
      turn: [
        'Quien da pistas roba una carta, elige uno de sus cuatro colores y dice una pista de una palabra.',
        'Por turnos, cada uno pone un cono en la casilla que cree que es.',
        'Después da una segunda pista de hasta dos palabras y cada uno pone otro cono.',
        'Se descubre el color: 3 puntos en la casilla exacta, 2 en las de alrededor y 1 en el anillo siguiente. Quien da pistas gana un punto por cada cono cerca.',
      ],
      end: 'Cuando todos han dado pistas las veces acordadas, gana quien más puntos tiene.',
      tip: 'No vale nombrar colores básicos ni señalar cosas de la habitación.',
    },
  },
  {
    slug: 'trivial-pursuit',
    names: ['Trivial Pursuit', 'Trivial'],
    rules: TRIVIAL,
  },
  {
    slug: 'trivial-real-madrid',
    names: ['Trivial Pursuit Real Madrid', 'Trivial Real Madrid'],
    rules: { ...TRIVIAL, tip: 'Todas las preguntas son sobre el Real Madrid.', caveat: THEMED_TRIVIAL },
  },
  {
    slug: 'trivial-senor-anillos',
    names: ['Trivial Pursuit El Señor de los Anillos', 'Trivial El Señor de los Anillos'],
    rules: { ...TRIVIAL, tip: 'Todas las preguntas son del mundo de El Señor de los Anillos.', caveat: THEMED_TRIVIAL },
  },
  {
    slug: 'the-decades',
    names: ["The Decades: 90's", 'The Decades', "The Decades 90's"],
    rules: {
      goal: 'Que tu equipo acierte el año de películas, canciones y sucesos de los 90.',
      setup: 'Haced dos equipos.',
      turn: [
        'Se lee una carta: una película, una canción, un suceso…',
        'El equipo que juega tiene que decir el año exacto en que pasó.',
        'Hay fichas para tener más tiempo y cartas de acción que conviene guardar para el mejor momento.',
      ],
      end: 'Gana el equipo con más puntos al acabar.',
      caveat: 'Resumen a partir de la descripción del juego: el reglamento tiene el reparto exacto de puntos.',
    },
  },
  {
    slug: 'dungeons-drinks',
    names: ['Dungeons & Drinks', 'Dungeons and Drinks', 'Dungeon and Drinks'],
    rules: {
      goal: 'Ganar más puntos rematando monstruos con un grupo de aventureros borrachos.',
      setup: 'Siempre hay tres monstruos en el centro de la mesa: la mazmorra. Cada jugador tiene cartas de hechizo y una carta de borrachera.',
      turn: [
        'En tu turno eliges uno de los tres monstruos y le haces daño.',
        'Quien da el golpe final se lleva sus puntos, y sale otro monstruo.',
        'Los hechizos sirven para fastidiar: curar monstruos, cambiar el objetivo de otro jugador…',
        'Tu carta de borrachera te obliga a comportarte de una forma rara. Si se te olvida, pierdes un punto.',
      ],
      end: 'La partida acaba con la pelea contra el jefe final. Después gana quien tenga más puntos.',
      caveat: 'Tiene un modo con bebida en el que se bebe de verdad al atacar: el reglamento lo explica.',
    },
  },
  // Covers drawn, rules still unknown: better to wait than to make them up.
  { slug: 'game-off', names: ['Game Off'] },
  { slug: 'alguien-ha-probado', names: ['¿Alguien ha probado este juego?', 'Alguien ha probado este juego'] },
  { slug: 'la-vacuna-espanola', names: ['La Vacuna Española', 'La vacuna espanola'] },
  { slug: 'el-cubilete', names: ['El Cubilete', 'Cubilete'] },
  { slug: 'juego-de-beber', names: ['Juego de beber sin nombre', 'Juego de beber'] },
];
