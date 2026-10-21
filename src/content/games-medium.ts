// Weight 2: games with a few more rules.
import type { LibraryEntry } from './library';

export const MEDIUM: LibraryEntry[] = [
  {
    slug: 'trio',
    names: ['Trio'],
    rules: {
      goal: 'Ser el primero en reunir tres tríos de cartas iguales, o el trío de sietes.',
      setup: 'Se reparten cartas del 1 al 12 a cada jugador, que las ordena de menor a mayor. El resto va boca abajo al centro.',
      turn: [
        'Descubre cartas de una en una: la más alta o la más baja de la mano de cualquiera (también la tuya), o una del centro.',
        'Mientras salga el mismo número, puedes seguir descubriendo.',
        'Si sale un número distinto, todo vuelve a su sitio y pasa el turno.',
        'Si descubres tres iguales, te quedas el trío.',
      ],
      end: 'Gana quien consigue tres tríos, o el trío de sietes al instante.',
      tip: 'Memoriza lo que va saliendo: la gracia está en recordar quién tiene qué.',
    },
  },
  {
    slug: 'codigo-secreto-duo',
    names: ['Código Secreto Dúo', 'Codenames Duet'],
    rules: {
      goal: 'Encontrar entre los dos a vuestros 15 agentes antes de quedaros sin turnos y sin tocar a un asesino.',
      setup: 'Se ponen 25 palabras. Cada jugador ve una cara distinta de la carta clave, con sus agentes en verde y algunos asesinos.',
      turn: [
        'Uno da una pista: una palabra y un número.',
        'El otro toca palabras. Si es verde para quien dio la pista, sigue; si es un civil, se acaba el turno; si es un asesino, perdéis.',
        'En el turno siguiente se cambian los papeles.',
      ],
      end: 'Ganáis si encontráis los 15 agentes antes de gastar los 9 turnos (o los de la misión elegida).',
    },
  },
  {
    slug: 'little-secret',
    names: ['Little Secret'],
    rules: {
      goal: 'Descubrir quién tiene una palabra distinta a la tuya sin que te descubran a ti.',
      setup: 'En cada ronda se reparten papeles en secreto: la mayoría comparte una palabra, los infiltrados tienen otra parecida y el periodista no tiene ninguna. Nadie sabe seguro en qué grupo está.',
      turn: [
        'Por turnos, cada uno da una pista sobre su palabra, sin decirla.',
        'Después se debate y se vota a quién eliminar.',
        'Se repite hasta que solo quedan los de la palabra mayoritaria o dos jugadores.',
      ],
      end: 'Los que no han sido eliminados suman puntos. Tras varias rondas, gana quien más tenga.',
      caveat: 'Resumen a partir de la descripción del juego: el reglamento detalla los puntos de cada papel.',
    },
  },
  {
    slug: 'magic-maze',
    names: ['Magic Maze'],
    rules: {
      goal: 'Que los cuatro héroes roben sus objetos en el centro comercial y escapen antes de que se vacíe el reloj de arena.',
      setup: 'Cada jugador recibe una acción (ir al norte, explorar, usar escaleras…), no un personaje: cualquiera puede mover a cualquier héroe, pero solo con su acción.',
      turn: [
        'No hay turnos: todos jugáis a la vez y en silencio.',
        'Para avisar a alguien, solo puedes ponerle delante el peón de «¡Haz algo!».',
        'Cuando un héroe pisa un reloj de arena, se le da la vuelta y se puede hablar un momento.',
      ],
      end: 'Ganáis si los cuatro salen con sus objetos. Perdéis si se vacía el reloj de arena.',
      tip: 'Seguid los escenarios en orden: cada uno añade reglas poco a poco.',
    },
  },
  {
    slug: 'impostor-kings',
    names: ['The Impostor King', 'The Imposter Kings', 'The Impostor Kings'],
    rules: {
      goal: 'Ganar rondas dejando a los demás sin poder jugar una carta.',
      setup: 'Cada jugador recibe una mano de cartas con valores del 1 al 9 y poderes especiales.',
      turn: [
        'Juega una carta de valor igual o mayor que la última de la mesa.',
        'Muchas cartas tienen poderes que se saltan esa regla o cambian otras cartas.',
        'El Rey puede darse la vuelta una vez por ronda para saltar el turno y reiniciar la pila. El Asesino, de valor 2, puede matar a un Rey.',
      ],
      end: 'Pierde la ronda quien no puede jugar. Gana la partida el primero que gana las rondas acordadas.',
      caveat: 'Corresponde a «The Imposter Kings». Resumen general: cada carta explica su poder.',
    },
  },
  {
    slug: 'boomerang-europa',
    names: ['Boomerang: Europa', 'Boomerang Europa', 'Boomerang: Europe'],
    rules: {
      goal: 'Hacer el mejor viaje por Europa: visitar países, coleccionar recuerdos y combinar transportes.',
      setup: 'Se juega en 4 rondas. Cada jugador tiene una hoja de puntos con el mapa.',
      turn: [
        'Cada ronda recibes 7 cartas. Eliges una, la guardas y pasas el resto al vecino, hasta acabarlas.',
        'La primera que eliges es tu carta de lanzamiento (boca abajo) y la última, la de recogida.',
        'Cada carta es un país: lo marcas en tu hoja y suma a colecciones de comida, monumentos y transportes.',
      ],
      end: 'Al final de cada ronda se puntúan la diferencia entre lanzamiento y recogida, los países y las colecciones. Tras 4 rondas gana quien más puntos tiene.',
    },
  },
  {
    slug: 'carcassonne',
    names: ['Carcassonne'],
    rules: {
      goal: 'Conseguir más puntos construyendo ciudades, caminos y monasterios en el paisaje que vais formando.',
      setup: 'Se pone la loseta inicial en el centro. Cada jugador tiene sus 7 seguidores (meeples).',
      turn: [
        'Roba una loseta y colócala junto a otras: caminos con caminos, ciudades con ciudades, prados con prados.',
        'Si quieres, pon uno de tus seguidores en esa loseta: en un camino, una ciudad, un monasterio o un prado.',
        'Cuando se completa un camino, una ciudad o un monasterio, se puntúa y el seguidor vuelve a tu reserva.',
      ],
      end: 'Al acabar las losetas se puntúan las construcciones incompletas y los prados. Gana quien más puntos tiene.',
      tip: 'Si en una ciudad hay varios seguidores, puntúa quien tenga más: puedes colarte uniendo tu ciudad a la de otro.',
    },
  },
  {
    slug: 'get-on-board',
    names: ['Get on Board: New York & London', 'Get on Board', 'Get on Board: Nueva York y Londres'],
    rules: {
      goal: 'Trazar la mejor línea de autobús de la ciudad y llevar a más pasajeros a su destino.',
      setup: 'Cada jugador tiene su hoja de puntos, una salida distinta en el tablero y objetivos propios y comunes.',
      turn: [
        'Se descubre una carta que dice si el siguiente tramo de tu línea va recto o gira, y lo añades en el tablero.',
        'Por el camino recoges pasajeros (estudiantes, turistas, oficinistas…) y lo apuntas en tu hoja.',
        'Si pasas por una calle que ya usó otro, hay atasco y pierdes puntos.',
      ],
      end: 'Al final se puntúan los pasajeros, los objetivos y los atascos. Gana quien más puntos tiene.',
      caveat: 'Resumen general: el tablero de Nueva York y el de Londres tienen reglas propias.',
    },
  },
  {
    slug: 'isla-prohibida',
    names: ['La Isla Prohibida', 'Forbidden Island'],
    rules: {
      goal: 'Recuperar juntos los cuatro tesoros y escapar en helicóptero antes de que se hunda la isla.',
      setup: 'Se forma la isla con 24 losetas. Cada jugador es un aventurero con una habilidad especial y recibe dos cartas de tesoro.',
      turn: [
        'Haz hasta 3 acciones: moverte, achicar agua de una loseta inundada, dar una carta a otro o conseguir un tesoro (con 4 cartas iguales en su loseta).',
        'Roba 2 cartas de tesoro. Si sale «¡Las aguas suben!», la isla se inunda más rápido.',
        'Roba cartas de inundación: esas losetas se inundan, y si ya lo estaban, se hunden.',
      ],
      end: 'Ganáis si volvéis todos al helipuerto con los cuatro tesoros y jugáis un helicóptero. Perdéis si se hunde el helipuerto, un tesoro que no tenéis o un jugador, o si el agua llega arriba.',
    },
  },
  {
    slug: 'munchkin',
    names: ['Munchkin'],
    rules: {
      goal: 'Ser el primero en llegar al nivel 10 matando monstruos y fastidiando a los demás.',
      setup: 'Cada jugador empieza en nivel 1 con cartas de puerta y de tesoro.',
      turn: [
        'Abre una puerta: roba una carta de puerta boca arriba. Si es un monstruo, luchas.',
        'Si tu fuerza (nivel más objetos) supera al monstruo, subes de nivel y te llevas sus tesoros. Si no, intenta huir con el dado.',
        'Si no sale monstruo, puedes pelear contra uno de tu mano o robar otra puerta boca abajo.',
        'Los demás pueden ayudarte a cambio de parte del botín… o meterte más monstruos.',
      ],
      end: 'Gana el primero que llega al nivel 10. El último nivel solo se consigue matando a un monstruo.',
    },
  },
  {
    slug: 'dnd-aventura',
    names: ['Dungeons & Dragons: La aventura fantástica', 'Dungeons & Dragons: Adventure Begins', 'Dungeons & Dragons: La aventura comienza'],
    rules: {
      goal: 'Recorrer juntos la mazmorra y derrotar al jefe final: un contemplador, un gigante de fuego, un dragón o el Kraken.',
      setup: 'Elegid jefe y su mazo de aventuras. Cada jugador crea su héroe con sus losetas y empieza con 10 de vida, a nivel 1.',
      turn: [
        'El papel de Dungeon Master va rotando: lee las cartas y hace de los monstruos.',
        'En cada casilla se lee una carta: un reto para todo el grupo o un monstruo al que combatir.',
        'Para atacar tiras el dado de 20: si sacas al menos lo que dice tu loseta, aciertas. El monstruo responde con el dado de 10.',
        'Con el oro compras objetos, subes de nivel o revives a un compañero.',
      ],
      end: 'Ganáis al llegar al final de la mazmorra y derrotar al jefe.',
    },
  },
  // Casa Enzo
  {
    slug: 'azul',
    names: ['Azul'],
    rules: {
      goal: 'Decorar la pared de tu palacio con azulejos y conseguir más puntos que nadie.',
      setup: 'En el centro se ponen expositores (fábricas) con 4 azulejos cada uno. Cada jugador tiene su tablero.',
      turn: [
        'Coge todos los azulejos de un color de una fábrica (el resto va al centro) o todos los de un color del centro.',
        'Ponlos en una de tus filas de preparación. Los que no caben caen al suelo y restan puntos.',
        'Al acabar la ronda, cada fila completa pasa un azulejo a la pared, que puntúa por los azulejos pegados a él.',
      ],
      end: 'Termina cuando alguien completa una fila horizontal de la pared. Se suman bonus por filas, columnas y colores completos.',
    },
  },
  {
    slug: 'welcome-to',
    names: ['Welcome to… Perfecto Hogar', 'Welcome To', 'Welcome to Perfecto Hogar', 'Welcome To… Your Perfect Home'],
    rules: {
      goal: 'Construir el barrio más atractivo de los años 50 escribiendo números de casas en tu hoja.',
      setup: 'Cada jugador tiene una hoja con tres calles. Se preparan tres montones de cartas y tres planos de urbanismo (objetivos).',
      turn: [
        'Se descubren tres parejas de cartas: un número y una acción.',
        'Todos a la vez eligen una pareja y escriben el número en una casa. En cada calle los números van de menor a mayor.',
        'La acción da ventajas: piscinas, parques, vallas para formar urbanizaciones, números bis…',
        'Si no puedes escribir ningún número, marcas un permiso denegado.',
      ],
      end: 'Termina cuando alguien completa los tres planos, marca su tercer permiso denegado o llena todas las casas. Gana quien más puntos tenga.',
    },
  },
  {
    slug: 'coffee-rush',
    names: ['Coffee Rush'],
    rules: {
      goal: 'Servir más pedidos que nadie en tu cafetería sin que se te acumulen.',
      setup: 'En el centro va el tablero de ingredientes. Cada jugador tiene su mostrador con tres tazas, un barista y uno o dos pedidos.',
      turn: [
        'Mueve a tu barista hasta 3 casillas por el tablero y coge el ingrediente de cada casilla donde paras.',
        'Echa los ingredientes en tus tazas (no se pueden pasar de una taza a otra).',
        'Si una taza coincide con un pedido, lo sirves. Con tres pedidos servidos puedes desbloquear una mejora.',
        'Al acabar tu turno, tus pedidos bajan un hueco. Si uno se cae del último, es una penalización.',
      ],
      end: 'Se acaba cuando se termina el mazo de pedidos o alguien tiene 5 penalizaciones. Cada pedido da 1 punto, cada mejora 2 y cada penalización resta 1.',
    },
  },
  {
    slug: 'splendor',
    names: ['Splendor'],
    rules: {
      goal: 'Ser el primero en llegar a 15 puntos de prestigio comprando minas, transportes y joyerías.',
      setup: 'Se ponen 4 cartas de cada uno de los tres niveles, las fichas de gemas y algunos nobles.',
      turn: [
        'Haz una sola cosa: coger 3 gemas de colores distintos, o 2 iguales si quedan al menos 4 de ese color.',
        'O comprar una carta pagando sus gemas: te da para siempre una gema de descuento y a veces puntos.',
        'O reservar una carta y llevarte un oro, que hace de comodín.',
        'Si tus cartas reúnen lo que pide un noble, te visita y te da 3 puntos.',
      ],
      end: 'Cuando alguien llega a 15 puntos se acaba la ronda y gana quien más puntos tenga.',
      tip: 'Nunca puedes tener más de 10 fichas.',
    },
  },
  {
    slug: 'cities-of-splendor',
    names: ['Cities of Splendor', 'Las Ciudades de Splendor'],
    rules: {
      goal: 'Dar nuevos retos a Splendor con cuatro módulos que se juegan por separado.',
      setup: 'Necesitas el Splendor básico. Elige un módulo: Las Ciudades, Las Rutas Comerciales, Las Fortalezas o El Oriente.',
      turn: [
        'Se juega como Splendor: coger gemas, reservar o comprar cartas.',
        'Las Ciudades: sustituyen a los nobles; gana quien cumple antes los requisitos de una ciudad.',
        'Las Rutas Comerciales: ciertas cartas te dejan avanzar por rutas que dan ventajas.',
        'Las Fortalezas: pones torres para quedarte cartas o bloquearlas. El Oriente: cartas con poderes especiales.',
      ],
      end: 'Depende del módulo: con Las Ciudades, se acaba la ronda cuando alguien consigue una ciudad.',
    },
  },
  {
    slug: 'hanabi',
    names: ['Hanabi'],
    rules: {
      goal: 'Montar juntos el mejor espectáculo de fuegos artificiales: cinco colores, del 1 al 5 en orden.',
      setup: 'Cada jugador coge sus cartas al revés, mirando a los demás: ves las de todos menos las tuyas. Hay 8 fichas de pista y 3 de error.',
      turn: [
        'Haz una de tres cosas: dar una pista, descartar o jugar una carta.',
        'Dar pista gasta una ficha: dile a alguien cuáles de sus cartas son de un color o de un número.',
        'Descartar recupera una ficha de pista.',
        'Jugar: si la carta sigue la serie de su color, se queda; si no, se pierde una ficha de error.',
      ],
      end: 'Se acaba al tercer error (perdéis), al completar los cinco colores o una ronda después de agotarse el mazo. Se suman las cartas más altas de cada color.',
    },
  },
  {
    slug: 'secret-hitler',
    names: ['Secret Hitler'],
    rules: {
      goal: 'Los liberales quieren aprobar 5 leyes liberales o eliminar a Hitler. Los fascistas, aprobar 6 leyes fascistas o hacer canciller a Hitler.',
      setup: 'Cada uno recibe en secreto un sobre con su papel. Los fascistas saben quiénes son los suyos.',
      turn: [
        'El presidente (va rotando) propone a un canciller y todos votan Ja! o Nein.',
        'Si sale adelante, el presidente roba 3 leyes, descarta 1 y pasa 2 al canciller, que aprueba una.',
        'Algunas leyes fascistas dan poderes al presidente: investigar a alguien, elegir al siguiente presidente o ejecutar.',
        'Si se rechazan tres gobiernos seguidos, se aprueba la primera ley del mazo.',
      ],
      end: 'Gana el bando que cumple antes su objetivo. Desde la tercera ley fascista, si nombran canciller a Hitler, ganan los fascistas.',
    },
  },
  {
    slug: 'mysterium',
    names: ['Mysterium'],
    rules: {
      goal: 'Que los médiums descubran, con los sueños del fantasma, quién lo mató, dónde y con qué.',
      setup: 'Un jugador es el fantasma y no puede hablar. Los demás son médiums y cada uno tiene en secreto un sospechoso, un lugar y un arma.',
      turn: [
        'El fantasma da a cada médium cartas de visión (dibujos de sueños) para guiarle hacia su sospechoso.',
        'Cada médium interpreta sus visiones y elige. Los demás pueden apostar si ha acertado.',
        'Quien acierta pasa al lugar y después al arma. Cada ronda que pasa es una hora menos de las siete de la noche.',
        'Al final, el fantasma da una última visión para señalar cuál de las combinaciones es la verdadera.',
      ],
      end: 'Ganáis todos si acertáis la combinación final antes de que acabe la séptima hora.',
    },
  },
  {
    slug: 'perspectives',
    names: ['Perspectives'],
    rules: {
      goal: 'Resolver juntos un caso en el que cada uno ve pistas diferentes.',
      setup: 'Se elige un caso y se reparten sus cartas sin mirar. Cada uno lee solo las suyas.',
      turn: [
        'Describe a los demás lo que hay en tus cartas, con detalle, pero sin enseñarlas.',
        'Debatid y juntad las piezas: lo que tú no ves, lo tiene otro.',
        'Cuando creáis tenerlo, respondéis a las preguntas del caso.',
      ],
      end: 'Se comprueban las respuestas y se puntúa cuántas acertasteis.',
      caveat: 'Resumen de la idea general: cada caso explica cómo se responde y se puntúa.',
    },
  },
  {
    slug: 'cluedo-harry-potter',
    names: ['Cluedo Harry Potter', 'Cluedo: Harry Potter'],
    rules: {
      goal: 'Descubrir antes que nadie quién atacó a un alumno en Hogwarts, con qué y dónde.',
      setup: 'Se guardan en secreto una carta de sospechoso, una de objeto o hechizo y una de lugar. El resto se reparte.',
      turn: [
        'Tira los dados y muévete por el castillo hasta una sala.',
        'En una sala haces una sugerencia: un sospechoso, un objeto o hechizo y esa sala.',
        'El siguiente que tenga alguna de esas cartas te enseña una en secreto. Apunta en tu hoja lo que vas descartando.',
      ],
      end: 'Cuando lo tengas claro, haz una acusación: si aciertas, ganas; si fallas, quedas eliminado.',
      caveat: 'Esta edición añade reglas propias (cartas especiales, salas que cambian): mira el reglamento.',
    },
  },
  {
    slug: 'cold-case',
    names: ['Cold Case: Una historia de muerte', 'Cold Case', 'Cold Case: A Story to Die For'],
    rules: {
      goal: 'Resolver entre todos un asesinato antiguo: el de un periodista en 1988.',
      setup: 'Abrid el expediente: declaraciones, fotos, informe de autopsia… y la hoja con las preguntas del caso.',
      turn: [
        'Leed y comparad todas las pruebas buscando contradicciones.',
        'No hay turnos ni acertijos: se trata de razonar en grupo.',
        'Cuando creáis tener la solución, respondedla en la web del caso. Si fallas, te dice qué pruebas revisar.',
      ],
      end: 'El caso se cierra cuando acertáis todas las preguntas.',
      caveat: 'Corresponde a «Cold Case: A Story to Die For». Comprueba que es tu caja.',
    },
  },
  {
    slug: 'los-inseparables',
    names: ['Los Inseparables: Armisticio', 'Los Inseparables', 'The Grizzled'],
    rules: {
      goal: 'Sobrevivir juntos a la Primera Guerra Mundial hasta el armisticio sin que se hunda la moral.',
      setup: 'Cada jugador es un soldado. Las cartas de pruebas se reparten en dos montones: el de pruebas y el de moral.',
      turn: [
        'En cada misión, el jefe decide cuántas cartas se reparten. Por turnos, juegas una amenaza en la tierra de nadie o un golpe duro sobre ti.',
        'Si en la tierra de nadie se juntan tres amenazas iguales, la misión fracasa.',
        'Puedes retirarte antes. Si todos se retiran a tiempo, la misión triunfa y os dais apoyo para quitar golpes duros.',
        'No se puede hablar de las cartas de la mano.',
      ],
      end: 'Ganáis si se vacía el montón de pruebas. Perdéis si se acaba el de moral o alguien acumula demasiados golpes duros.',
      caveat: 'Resumen del juego base: la edición Armisticio añade más misiones y modos.',
    },
  },
];
