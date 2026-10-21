// Weight 3 to 5: strategy and long games, the last ones to explain.
import type { LibraryEntry } from './library';

export const HEAVY: LibraryEntry[] = [
  // Weight 3
  {
    slug: 'la-tripulacion',
    names: ['La Tripulación', 'The Crew'],
    rules: {
      goal: 'Cumplir juntos misiones espaciales ganando bazas concretas, casi sin poder hablar.',
      setup: 'Se elige la misión del cuaderno (son 50, cada vez más difíciles) y se reparten todas las cartas. Quien tiene el cohete 4 es el comandante.',
      turn: [
        'Se reparten las tareas: cartas que un jugador concreto tiene que ganar en una baza.',
        'En cada baza, el que sale juega una carta y los demás tienen que seguir el color si pueden. Gana la más alta del color, o el cohete más alto.',
        'Solo puedes comunicar una carta por misión, poniéndola delante con la ficha de radio.',
      ],
      end: 'La misión sale bien si se cumplen todas las tareas; si falla una, se repite. Después, a por la siguiente del cuaderno.',
    },
  },
  {
    slug: 'splendor-duel',
    names: ['Splendor Duel'],
    rules: {
      goal: 'Ganar a tu rival de una de tres formas: 20 puntos de prestigio, 10 coronas o 10 puntos en cartas de un mismo color.',
      setup: 'Las gemas se colocan en un tablero de 5×5. Se preparan tres pirámides de cartas y los pergaminos de privilegio.',
      turn: [
        'Si quieres, antes usa un privilegio para coger una gema, o rellena el tablero (y tu rival gana un privilegio).',
        'Después haz una cosa: coger hasta 3 gemas seguidas en línea, reservar una carta (con un oro) o comprar una carta.',
        'Muchas cartas tienen poderes: robar una gema, repetir turno, ganar un privilegio…',
      ],
      end: 'Gana al momento quien cumple una de las tres condiciones.',
    },
  },
  {
    slug: 'reinos-de-papel',
    names: ['Reinos de Papel', 'Paper Tales'],
    rules: {
      goal: 'Hacer prosperar tu reino durante cuatro rondas reclutando unidades, construyendo y ganando guerras.',
      setup: 'Cada jugador tiene su reino con cuatro huecos para unidades y algo de oro.',
      turn: [
        'Draft: recibes 5 cartas, te quedas una y pasas el resto, hasta tenerlas todas.',
        'Despliega unidades en tu reino pagando su coste en oro.',
        'Guerra: comparas tu fuerza con la de tus vecinos. Ganar da puntos de leyenda.',
        'Cobras, construyes edificios y tus unidades envejecen: las que llevan dos rondas mueren.',
      ],
      end: 'Tras 4 rondas gana quien tenga más puntos de leyenda.',
      caveat: 'Corresponde a «Paper Tales». Resumen general del reglamento.',
    },
  },
  {
    slug: 'dominion',
    names: ['Dominion (juego base)', 'Dominion'],
    rules: {
      goal: 'Tener más puntos de victoria en tu mazo que nadie cuando acabe la partida.',
      setup: 'Se eligen 10 tipos de cartas de reino para la partida. Cada jugador empieza con un mazo de 7 cobres y 3 fincas.',
      turn: [
        'Robas 5 cartas. Acción: juega una carta de acción (algunas te dan más acciones).',
        'Compra: con el dinero de tu mano compras una carta del centro, que va a tu descarte.',
        'Limpieza: descarta todo y roba 5 nuevas. Cuando se acaba tu mazo, barajas el descarte.',
      ],
      end: 'Acaba al agotarse las provincias o tres montones cualesquiera. Gana quien más puntos tenga en su mazo.',
      tip: 'Las cartas de victoria no hacen nada en la mano: no las compres demasiado pronto.',
    },
  },
  {
    slug: 'dominion-terramar',
    names: ['Dominion: Terramar', 'Dominion: Seaside'],
    rules: {
      goal: 'Ampliar Dominion con cartas que siguen haciendo efecto en tu siguiente turno.',
      setup: 'Necesitas Dominion (juego base). Mezcla cartas de reino de Terramar con las del base al elegir las 10 de la partida.',
      turn: [
        'Se juega como Dominion.',
        'Las cartas de duración (naranjas) se quedan en la mesa y vuelven a funcionar en tu próximo turno.',
        'Algunas cartas usan esteras para apartar cartas o monedas.',
      ],
      end: 'Como en Dominion.',
    },
  },
  {
    slug: 'orquesta-negra',
    names: ['Orquesta Negra: Hitler debe morir', 'Orquesta Negra', 'Black Orchestra'],
    rules: {
      goal: 'Como conspiradores alemanes, asesinar a Hitler antes de que acabe la guerra.',
      setup: 'Cada jugador es un conspirador real con su habilidad. El mazo de eventos avanza por las etapas de la guerra.',
      turn: [
        'Haz hasta 3 acciones: moverte, conseguir objetos, reclutar, aumentar tu compromiso con la conspiración…',
        'Cuando estéis preparados, intentad un complot: hace falta el lugar adecuado, objetos, apoyos y una tirada de dados.',
        'Al final del turno se roba un evento, que puede hacer sospechar a la Gestapo.',
        'Con mucha sospecha te pueden detener e interrogar.',
      ],
      end: 'Ganáis si un complot sale bien. Perdéis si termina la guerra o detienen a todos los conspiradores.',
      caveat: 'Resumen general de un juego con bastantes reglas.',
    },
  },
  {
    slug: 'red-outpost',
    names: ['Red Outpost'],
    rules: {
      goal: 'Ganar más puntos que los demás en una colonia soviética donde los trabajadores son de todos.',
      setup: 'Hay seis trabajadores compartidos, cada uno con su humor. Cada jugador tiene discos de influencia y un cristal.',
      turn: [
        'Mueve a cualquier trabajador que esté de pie a un lugar libre y túmbalo.',
        'Pon uno de tus discos de influencia sobre él.',
        'Ajusta su humor si el lugar lo indica y haz la acción del lugar: producir, exportar…',
      ],
      end: 'Tras cada una de las dos rondas, quien más influencia tiene en cada trabajador gana (o pierde) tantos puntos como su humor. Al final se suman donaciones y cristales.',
      tip: 'Cada ronda tiene fases (mañana, comida, tarde, noche) que abren y cierran lugares.',
    },
  },
  {
    slug: '7-wonders',
    names: ['7 Wonders'],
    rules: {
      goal: 'Hacer prosperar tu civilización durante tres eras y tener más puntos al final.',
      setup: 'Cada jugador recibe un tablero de maravilla con su recurso inicial.',
      turn: [
        'En cada era recibes 7 cartas: eliges una, pasas el resto al vecino y todos la jugáis a la vez.',
        'Con la carta elegida puedes construirla (pagando recursos propios o comprados a tus vecinos), usarla para construir una etapa de tu maravilla o descartarla por 3 monedas.',
        'Al final de cada era hay guerra con tus dos vecinos: quien tenga más escudos gana puntos.',
      ],
      end: 'Tras la tercera era se suman puntos militares, monedas, maravilla, edificios, ciencia, comercio y gremios.',
    },
  },
  {
    slug: 'disney-villainous',
    names: ['Disney Villainous', 'Villainous'],
    rules: {
      goal: 'Cumplir el objetivo de tu villano antes que nadie: cada uno tiene uno distinto.',
      setup: 'Cada jugador elige un villano con su tablero, su mazo y su mazo de destino.',
      turn: [
        'Mueve a tu villano a otro lugar de su reino.',
        'Haz las acciones que se ven en ese lugar: ganar poder, jugar cartas, descartar, mover objetos o aliados…',
        'La acción de destino roba dos cartas del mazo de destino de otro jugador y le juega una para fastidiarle: suelen ser héroes que bloquean sus lugares.',
        'Al final robas hasta tener 4 cartas.',
      ],
      end: 'Gana el primero que cumple el objetivo de su villano.',
    },
  },
  {
    slug: 'welcome-new-las-vegas',
    names: ['Welcome to New Las Vegas', 'Welcome to New Vegas'],
    rules: {
      goal: 'Construir la Las Vegas más espectacular escribiendo números de casinos en tu hoja.',
      turn: [
        'Se descubren tres cartas que combinan un número de casino con una acción.',
        'Todos a la vez eligen un número para su calle y una acción para usar en su hoja.',
        'Los casinos de cada calle deben ir en orden ascendente.',
        'Las acciones construyen, mejoran casinos, montan espectáculos, mueven la limusina…',
      ],
      end: 'Al final se suman los puntos de calles, hoteles, golf, limusina y proyectos. Gana quien más tenga.',
      caveat: 'Resumen general: hay muchas acciones distintas y el reglamento las explica una a una.',
    },
  },
  {
    slug: 'mansiones-locura',
    names: ['Las Mansiones de la Locura (2ª edición)', 'Las Mansiones de la Locura', 'Mansions of Madness'],
    rules: {
      goal: 'Investigar juntos una mansión llena de horrores y resolver el misterio del escenario.',
      setup: 'Hace falta la aplicación gratuita: eliges escenario e investigadores y la app te dice qué piezas colocar.',
      turn: [
        'Cada investigador hace 2 acciones: moverse, explorar, buscar, interactuar, atacar…',
        'La app dice qué encontráis y juega la fase de los mitos: monstruos, sucesos y terror.',
        'Las pruebas se hacen con dados según tus habilidades. El daño y el horror pueden herirte o volverte loco.',
      ],
      end: 'La app dice cuándo ganáis (el objetivo se va descubriendo) o perdéis.',
    },
  },
  {
    slug: 'gloomhaven-fauces',
    names: ['Gloomhaven: Fauces del León', 'Gloomhaven: Jaws of the Lion'],
    rules: {
      goal: 'Completar juntos la campaña de escenarios con cuatro mercenarios.',
      setup: 'Cada jugador elige un mercenario con su mazo de habilidades. El libro de escenarios hace de tablero.',
      turn: [
        'Cada ronda eliges dos cartas en secreto. Su iniciativa marca el orden.',
        'En tu turno usas la mitad de arriba de una y la de abajo de la otra: atacar, moverte, curarte…',
        'Los monstruos actúan según su carta. Los ataques usan un mazo de modificadores, no dados.',
        'Las cartas que gastas se agotan: si te quedas sin ellas, quedas agotado.',
      ],
      end: 'El escenario se gana al cumplir su objetivo y se pierde si todos quedan agotados. Entre escenarios mejoras a tu personaje.',
      tip: 'Los primeros escenarios son un tutorial: id leyendo las reglas por partes.',
    },
  },
  {
    slug: 'dead-of-winter',
    names: ['Dead of Winter'],
    rules: {
      goal: 'Sobrevivir al invierno en una colonia rodeada de zombis y cumplir el objetivo común… y tu objetivo secreto.',
      setup: 'Elegid un objetivo principal. Cada uno recibe supervivientes y un objetivo secreto: puede haber un traidor.',
      turn: [
        'Cada ronda empieza con una crisis que hay que resolver entre todos aportando cartas.',
        'Tira tus dados de acción y úsalos: buscar en otros lugares, atacar zombis, poner barricadas, limpiar basura…',
        'Salir de la colonia obliga a tirar el dado de exposición, que puede herir o infectar.',
        'En tu turno, otro jugador lee una carta de encrucijada que se activa según lo que hagas.',
      ],
      end: 'Hay que cumplir el objetivo principal antes de que acabe el tiempo o caiga la moral. Para ganar, además, cada uno debe cumplir su objetivo secreto.',
    },
  },
  {
    slug: 'this-war-of-mine',
    names: ['This War of Mine'],
    rules: {
      goal: 'Sobrevivir con un grupo de civiles en una ciudad sitiada hasta el alto el fuego.',
      setup: 'Se prepara el refugio con escombros y supervivientes. Un libro de guion cuenta la historia y marca los sucesos.',
      turn: [
        'De día: exploráis el refugio, construís cosas útiles y repartís tareas.',
        'Al atardecer: comer, beber y cuidar del estado de cada uno.',
        'De noche: alguien sale a buscar recursos mientras otros vigilan o duermen. Puede haber asaltos.',
        'Al amanecer, sucesos del libro que lo pueden cambiar todo.',
      ],
      end: 'Ganáis si llega el alto el fuego con alguien vivo. El libro de guion dice cuándo.',
      caveat: 'Juego narrativo largo: el libro de guion se lee durante la partida y explica muchas reglas.',
    },
  },
  // Covers drawn, rules still unknown: the edition is not clear.
  { slug: 'codex', names: ['Codex'] },
  { slug: 'brink', names: ['Brink'] },
  // Weight 4
  {
    slug: 'telon-de-acero',
    names: ['Telón de acero', 'Iron Curtain'],
    rules: {
      goal: 'Llevar tu ideología (EE. UU. o URSS) 8 puntos por delante de la del rival en la Guerra Fría.',
      setup: 'Solo hay 18 cartas de regiones. Cada jugador recibe 5, aparta una boca abajo y juega con 4.',
      turn: [
        'Coloca una carta junto a otra de su región, o donde quieras si su región aún no está en la mesa.',
        'Usa su evento si es de tu bando (si es del rival, lo puede usar él) o pon cubos de influencia.',
        'Si el rival tiene 2 cubos más que tú en una carta, la controla.',
        'Cuando están todas las cartas de una región, se puntúa: un punto por carta dominada y un bonus para quien domine más.',
      ],
      end: 'Gana al momento quien saca 8 puntos de ventaja. Si no, tras dos rondas se revelan las cartas apartadas y gana quien vaya por delante.',
      caveat: 'Corresponde a «Iron Curtain». Las reseñas no coinciden en cómo se resuelve el final: compruébalo en el reglamento.',
    },
  },
  {
    slug: 'puerto-rico',
    names: ['Puerto Rico'],
    rules: {
      goal: 'Tener más puntos de victoria como gobernador de una colonia caribeña.',
      setup: 'Cada jugador recibe un tablero con plantaciones y ciudad, y doblones según el número de jugadores.',
      turn: [
        'Por turnos, cada uno elige un papel que nadie haya cogido en esa ronda: colono, alcalde, constructor, artesano, comerciante, capitán o buscador de oro.',
        'Todos hacen la acción de ese papel, pero quien lo eligió tiene un privilegio.',
        'Con plantaciones, colonos y edificios produces mercancías, que vendes o embarcas a Europa (embarcar da puntos).',
        'Los papeles que nadie coge ganan un doblón para la siguiente ronda.',
      ],
      end: 'Termina al acabarse los colonos o los puntos de victoria, o cuando alguien llena su ciudad. Se suman embarques y edificios.',
    },
  },
  {
    slug: 'batalla-rokugan',
    names: ['La Batalla por Rokugan', 'Battle for Rokugan'],
    rules: {
      goal: 'Controlar más provincias y cumplir tu objetivo secreto como uno de los clanes de Rokugan.',
      setup: 'Cada clan tiene su capital, fichas de combate, un objetivo secreto y una carta de territorio.',
      turn: [
        'Colocación: por turnos ponéis fichas de combate boca abajo en provincias o fronteras: ejércitos, flotas, diplomacia, chantaje…',
        'Resolución: se dan la vuelta todas. Si el ataque supera a la defensa, se conquista la provincia.',
        'Se juegan cinco rondas.',
      ],
      end: 'Al final se suman provincias, bonus de territorio y objetivos secretos. Gana el clan con más honor.',
      caveat: 'Resumen general: las fichas especiales y las cartas de clan tienen más detalles.',
    },
  },
  {
    slug: 'castillos-borgona',
    names: ['Los Castillos de Borgoña', 'The Castles of Burgundy'],
    rules: {
      goal: 'Conseguir más puntos desarrollando tu principado en la Borgoña del siglo XV.',
      setup: 'Cada jugador tiene su tablero de principado. Se juegan 5 fases de 5 rondas.',
      turn: [
        'Tira tus dos dados y haz dos acciones, una con cada dado.',
        'Con un dado puedes coger una loseta del tablero central del número que salió, colocar una loseta en tu principado en una casilla de ese número, vender mercancías o conseguir trabajadores.',
        'Cada trabajador cambia en uno el valor de un dado.',
        'Cada tipo de loseta tiene su efecto: castillos (acción extra), minas, conocimientos, barcos, animales, edificios…',
      ],
      end: 'Completar zonas da puntos durante la partida. Tras las 5 fases se suma todo y gana quien más tenga.',
    },
  },
  {
    slug: 'arkham-horror-lcg',
    names: ['Arkham Horror: El juego de cartas', 'Arkham Horror LCG', 'Arkham Horror: The Card Game'],
    rules: {
      goal: 'Investigar juntos misterios de Lovecraft, escenario a escenario, sin perder la cordura ni la vida.',
      setup: 'Cada jugador tiene un investigador y su mazo. Cada escenario trae su mazo de acto (vuestros objetivos) y de plan (lo que trama el mal).',
      turn: [
        'Mitos: se añade perdición al plan y cada uno roba una carta de encuentro (enemigos, traiciones…).',
        'Investigación: cada investigador hace 3 acciones: moverse, investigar pistas, luchar, evadir, jugar cartas…',
        'Las pruebas se resuelven sacando una ficha de la bolsa del caos, que modifica tu habilidad.',
        'Enemigos y mantenimiento: los enemigos atacan y todos roban carta y recurso.',
      ],
      end: 'Si el acto llega al final, superáis el escenario. Si antes avanza el plan, pasa algo malo. La campaña sigue con lo ocurrido.',
    },
  },
  // Weight 5
  {
    slug: 'agricola',
    names: ['Agricola'],
    rules: {
      goal: 'Tener la granja más próspera tras 14 rondas: campos, animales, familia y casa.',
      setup: 'Cada jugador empieza con una cabaña de madera de 2 habitaciones y 2 miembros de la familia. Se reparten cartas de oficios y de adquisiciones menores.',
      turn: [
        'Por turnos, cada miembro de tu familia ocupa una casilla de acción libre: coger madera, arar, sembrar, vallar, conseguir animales, ampliar la casa…',
        'Cada ronda aparece una acción nueva en el tablero.',
        'Si tienes habitaciones libres, puedes tener hijos: un trabajador más.',
        'En las rondas de cosecha hay que alimentar a la familia. Si no puedes, recibes cartas de mendicidad.',
      ],
      end: 'Tras la ronda 14 se puntúa cada parte de la granja; lo que te falta resta. Gana quien más puntos tiene.',
    },
  },
  {
    slug: 'diplomacy',
    names: ['Diplomacy'],
    rules: {
      goal: 'Controlar 18 de los 34 centros de suministro de Europa con una de las siete grandes potencias.',
      setup: 'Cada jugador es una potencia (Inglaterra, Francia, Alemania, Italia, Austria-Hungría, Rusia o Turquía) con sus ejércitos y flotas.',
      turn: [
        'Diplomacia: negociad en privado lo que queráis. Nada obliga a cumplir lo prometido.',
        'Órdenes: todos escriben en secreto una orden para cada unidad: quedarse, moverse, apoyar o transportar por mar.',
        'Se revelan y se resuelven a la vez. No hay dados: gana quien tiene más apoyos.',
        'En otoño, tienes tantas unidades como centros de suministro controlas.',
      ],
      end: 'Gana quien controla 18 centros, o los supervivientes acuerdan un empate.',
    },
  },
  {
    slug: 'scythe',
    names: ['Scythe'],
    rules: {
      goal: 'Ser la facción más rica de una Europa alternativa de los años 20, con robots gigantes, granjeros y estrellas.',
      setup: 'Cada jugador combina un tablero de facción y uno de jugador, con sus trabajadores, mechs y su héroe.',
      turn: [
        'Mueve tu ficha a una sección de tu tablero distinta a la del turno anterior.',
        'Haz la acción de arriba (mover, producir, comerciar, ganar popularidad o poder) y/o la de abajo (mejorar, desplegar mechs, construir, reclutar).',
        'Puedes combatir con tus mechs y tu héroe gastando poder y cartas de combate.',
        'Cada vez que consigues ciertos logros, pones una estrella.',
      ],
      end: 'Acaba cuando alguien pone su sexta estrella. Se cuentan monedas por estrellas, territorios y recursos, multiplicadas según la popularidad. Gana quien más dinero tenga.',
    },
  },
  {
    slug: 'scythe-fenris',
    names: ['Scythe: El auge de Fenris', 'Scythe: The Rise of Fenris'],
    rules: {
      goal: 'Jugar una campaña de 8 partidas de Scythe con historia y reglas nuevas que se van desbloqueando.',
      setup: 'Necesitas Scythe. Jugad los episodios en orden, abriendo solo lo que indica la campaña.',
      turn: [
        'Cada episodio es una partida de Scythe con cambios.',
        'Lo que pasa en una partida afecta a las siguientes.',
        'Incluye también módulos sueltos para usar en partidas normales.',
      ],
      end: 'Al terminar la campaña, gana quien más puntos de campaña tenga.',
      caveat: 'No abras los componentes antes de tiempo: el libro de campaña te va guiando.',
    },
  },
];
