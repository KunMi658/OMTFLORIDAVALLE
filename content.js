// ============================================
// CONTENT.JS — Todo el contenido del curso OMT
// ============================================
const COURSE_DATA = {
    classes: [
        // ==============================
        // CLASE 1: CONCEPTOS BASICOS
        // ==============================
        {
            id: 1,
            num: "CLASE 1",
            title: "Conceptos Básicos y Fundamentos OMT",
            desc: "Definición de OMT, marco legal colombiano y la Cadena de Acción PREVENIR",
            icon: "📋",
            color: "#1a73e8",
            studentSlides: [
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 1 · Introducción</p>
            <h2 class="slide-title">¿Qué es un OMT?</h2>
            <p class="slide-text">En el mundo de la <strong>seguridad privada en Colombia</strong>, existe un rol fundamental que funciona como los "ojos electrónicos" de una operación de seguridad.</p>
            <div class="slide-highlight"><strong>OMT</strong> = <strong>Operador de Medios Tecnológicos</strong><br>Es la persona que gestiona y opera equipos tecnológicos (cámaras CCTV, alarmas, sensores) para garantizar la seguridad de instalaciones.</div>
            <div class="slide-example">Imagina un centro comercial con 200 cámaras. El OMT es quien está en la sala de control, vigilando todas las pantallas, detectando situaciones sospechosas y coordinando con los guardas en terreno. Sin el OMT, las cámaras solo serían "adornos".</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál es la definición correcta de un OMT?",
                    options: [
                        "Oficial de Mantenimiento Técnico que repara equipos eléctricos en instalaciones",
                        "Operador de Medios Tecnológicos que gestiona equipos como cámaras CCTV para garantizar la seguridad",
                        "Oficial de Monitoreo y Telecomunicaciones que atiende llamadas de emergencia",
                        "Operador de Maquinaria y Transporte especializado en logística de seguridad"
                    ],
                    correctIndex: 1,
                    explanation: "El OMT — Operador de Medios Tecnológicos — opera equipos tecnológicos (cámaras CCTV, alarmas, sensores) para garantizar la seguridad de instalaciones.",
                    points: 10
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 1 · Marco Legal</p>
            <h2 class="slide-title">Marco Legal del OMT en Colombia</h2>
            <p class="slide-text">El trabajo del OMT no es informal. Está regulado por leyes colombianas que debes conocer:</p>
            <div class="slide-highlight"><strong>📜 Decreto Ley 356 de 1994</strong><br>"Estatuto de Vigilancia y Seguridad Privada" — Es la ley madre. Establece que los servicios de seguridad pueden usar medios tecnológicos autorizados por la SuperVigilancia.</div>
            <div class="slide-highlight"><strong>📜 Decreto 1565 de 2022</strong><br>Reglamenta la capacitación y entrenamiento en vigilancia, incluyendo al OMT. Por eso estás aquí: este curso es obligatorio.</div>
            <div class="slide-highlight"><strong>🏛️ SuperVigilancia</strong><br>Superintendencia de Vigilancia y Seguridad Privada — Es la entidad que te vigila a ti. Controla, inspecciona y sanciona a todo el sector de seguridad privada.</div>
            <div class="slide-warning">Trabajar como OMT sin la certificación o sin seguir las normas puede resultar en multas para la empresa y sanciones personales. La SuperVigilancia audita constantemente.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál es el decreto que se conoce como el 'Estatuto de Vigilancia y Seguridad Privada' en Colombia?",
                    options: [
                        "Ley 1801 de 2016",
                        "Decreto Ley 356 de 1994",
                        "Decreto 1565 de 2022",
                        "Resolución 2852 de 2006"
                    ],
                    correctIndex: 1,
                    explanation: "El Decreto Ley 356 de 1994 es el Estatuto de Vigilancia y Seguridad Privada, la base de toda la normativa del sector.",
                    points: 10
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 1 · Fundamento Central</p>
            <h2 class="slide-title">La Cadena de Acción: PREVENIR</h2>
            <p class="slide-text">Todo lo que hace un OMT gira alrededor de un concepto clave: <strong>PREVENIR</strong>. No somos reactivos, somos anticipadores del peligro.</p>
            <p class="slide-text">La cadena tiene 4 eslabones:</p>
            <ul class="slide-list">
              <li><strong>🔍 PREVENCIÓN</strong> — Analizar e informar CON ANTICIPACIÓN</li>
              <li><strong>🛑 DISUASIÓN</strong> — Elementos que hacen al delincuente pensarlo dos veces</li>
              <li><strong>⚡ ACCIÓN</strong> — Intervenir cuando algo pasa</li>
              <li><strong>📋 RESULTADO</strong> — Documentar todo, respaldar la operación</li>
            </ul>
            <div class="slide-example"><strong>PREVENCIÓN:</strong> "Veo a una persona sospechosa rondando el perímetro. Informo al guarda del puesto 3 para que esté alerta".<br><br><strong>DISUASIÓN:</strong> Las cámaras Domo visibles y monitores en recepción mostrando imágenes en vivo hacen que el delincuente lo piense dos veces.<br><br><strong>ACCIÓN:</strong> "Central para Supervisor, el intruso está en el Área X, viste camisa roja y jean azul. Procedo a extraer video de cámara 5".<br><br><strong>RESULTADO:</strong> Se extrajo el video, se hizo el informe, se coordinó con la policía.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál es el orden correcto de la Cadena de Acción PREVENIR?",
                    options: [
                        "Acción → Prevención → Disuasión → Resultado",
                        "Prevención → Acción → Disuasión → Resultado",
                        "Prevención → Disuasión → Acción → Resultado",
                        "Disuasión → Prevención → Resultado → Acción"
                    ],
                    correctIndex: 2,
                    explanation: "La cadena correcta es: PREVENCIÓN (anticipar) → DISUASIÓN (intimidar) → ACCIÓN (intervenir) → RESULTADO (documentar).",
                    points: 15
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 1 · Funciones del OMT</p>
            <h2 class="slide-title">Funciones y Responsabilidades</h2>
            <p class="slide-text">Como OMT, estas son tus <strong>5 funciones esenciales</strong>:</p>
            <ul class="slide-list">
              <li><strong>Monitorear y controlar</strong> actividades desde el centro de comunicaciones</li>
              <li><strong>Atender emergencias</strong> siguiendo los protocolos establecidos</li>
              <li><strong>Mantener la confidencialidad</strong> en la gestión de operaciones</li>
              <li><strong>Manejar emergencias</strong>, aplicar protocolos y garantizar cumplimiento de normas</li>
              <li><strong>Asegurar entrega de información</strong> clara y oportuna para respaldar operaciones</li>
            </ul>
            <div class="slide-warning">La <strong>confidencialidad</strong> tiene reglas claras:<br><br><strong>✅ SÍ pueden acceder a las grabaciones:</strong> Tu supervisor directo, otro OMT de tu turno, gerencia con autorización formal, Policía/DIJIN/Fiscalía con orden judicial o solicitud oficial.<br><br><strong>❌ NO pueden acceder:</strong> Compañeros de otras áreas "por curiosidad", personal de mantenimiento sin autorización, familiares, amigos, ni nadie por redes sociales.<br><br><strong>Regla de oro:</strong> Ante la duda, consulta a tu supervisor. Nunca entregues material por tu cuenta.</div>
            <div class="slide-example">Un OMT en un banco detecta que un cajero está sacando dinero de la caja fuerte fuera de horario. ¿Qué hace? NO llama al cajero. Reporta inmediatamente a su supervisor y documenta con video. La investigación la maneja seguridad, no tú solo. Tu trabajo es informar por el conducto regular.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "El jefe de mantenimiento del edificio (no es tu supervisor ni pertenece a seguridad) te pide ver las grabaciones del pasillo 'porque le robaron una herramienta'. ¿Qué haces?",
                    options: [
                        "Se las muestro de una vez, es jefe del edificio",
                        "Le explico que debe solicitar las imágenes formalmente a través de mi supervisor de seguridad",
                        "Le muestro solo un poco para ayudarle",
                        "Le paso el video por WhatsApp después del turno"
                    ],
                    correctIndex: 1,
                    explanation: "Las grabaciones solo se comparten por conducto regular: tu supervisor de seguridad autoriza. Pueden ver: tu supervisor, gerencia con autorización, Policía/DIJIN/Fiscalía con orden judicial. NO pueden ver: compañeros de otras áreas por su cuenta, ni nadie 'por curiosidad'. Siempre debe haber un proceso formal.",
                    points: 10
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 1 · CCTV</p>
            <h2 class="slide-title">Objetivos del Sistema CCTV</h2>
            <p class="slide-text">El <strong>CCTV (Circuito Cerrado de Televisión)</strong> es tu herramienta principal. Sus objetivos son:</p>
            <ul class="slide-list">
              <li><strong>Vigilancia periférica y perimetral</strong> — Ver lo que pasa alrededor de las instalaciones</li>
              <li><strong>Control de acceso</strong> — Supervisar quién entra y sale</li>
              <li><strong>Áreas restringidas</strong> — Monitorear zonas sensibles (bóvedas, servidores, almacenes)</li>
              <li><strong>Protección de objetos valiosos</strong> — Joyas, equipos, documentos importantes</li>
              <li><strong>Supervisión a distancia</strong> — Vigilar desde otro lugar</li>
              <li><strong>Grabación y almacenamiento</strong> — Guardar evidencia para investigaciones</li>
            </ul>
            <div class="slide-example">Una empresa tiene su bodega principal en Cali pero controla las cámaras desde Bogotá. Un OMT en Bogotá detecta que están sacando mercancía a las 3AM sin autorización. Gracias al CCTV remoto, se alerta a seguridad local y se detiene el robo.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál de las siguientes NO es un objetivo del sistema CCTV?",
                    options: [
                        "Vigilancia perimetral y control de acceso",
                        "Grabación y almacenamiento de evidencia",
                        "Reparación de equipos eléctricos dañados",
                        "Supervisión a distancia de zonas restringidas"
                    ],
                    correctIndex: 2,
                    explanation: "El CCTV tiene 6 objetivos: vigilancia perimetral, control de acceso, áreas restringidas, protección de objetos valiosos, supervisión remota y grabación. Reparar equipos NO es función del CCTV.",
                    points: 10
                }
            ],
            professorSlides: [
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 1 · Apertura (30 min)</p>
            <h2 class="slide-title">¿Qué es un OMT?</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que entiendan qué es un OMT y se identifiquen con el rol. Tiempo: 30 min.</p></div>
            <div class="prof-tip"><p><strong>Empieza preguntando:</strong> "¿Alguien sabe qué significan las siglas OMT?" Deja que respondan. Después pregunta: "¿Alguien ha estado en un centro comercial y ha visto esas cúpulas negras en el techo?" — la mayoría dirá que sí. "Bueno, detrás de esas cámaras hay alguien mirando. Ese alguien van a ser USTEDES."</p></div>
            <div class="prof-answer"><p><strong>OMT = Operador de Medios Tecnológicos</strong><br>Operador que gestiona medios tecnológicos (CCTV, alarmas, sensores) para garantizar seguridad y cumplimiento normativo.<br><br><strong>En palabras simples:</strong> "Son los ojos electrónicos de una operación de seguridad. Ustedes ven lo que nadie más ve."</p></div>
            <div class="prof-tip"><p><strong>🔑 Analogía principal:</strong> "Piensen en un OMT como el piloto de un avión. Tiene muchas pantallas, muchos indicadores, y tiene que tomar decisiones rápidas basándose en lo que ve. Solo que en vez de volar un avión, está protegiendo vidas y bienes."</p></div>
            <div class="prof-tip"><p><strong>📖 Historia para contar:</strong> "En 2019 en Bogotá, un OMT de un centro comercial detectó por cámara que un hombre dejó un maletín debajo de una banca y se fue caminando rápido. El OMT NO se quedó callado — activó protocolo, evacuaron el área en 12 minutos. Resultó ser una falsa alarma, pero si hubiera sido real, ese OMT habría salvado decenas de vidas. Eso es lo que ustedes van a aprender a hacer."</p></div>
            <div class="prof-tip"><p><strong>💡 Tip pedagógico:</strong> Es normal que algunos alumnos piensen que el OMT "solo mira pantallas". Derriba ese mito desde el inicio: "Si un OMT solo mirara pantallas, no necesitaría curso. Lo que ustedes van a aprender es a INTERPRETAR lo que ven, DECIDIR qué hacer, y ACTUAR con protocolo."</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 1 · Marco Legal (45 min)</p>
            <h2 class="slide-title">Marco Legal — Puntos Clave</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que sepan las 3 normas fundamentales y POR QUÉ este curso es obligatorio. Tiempo: 45 min. No te extiendas en tecnicismos legales — resúmelo en lenguaje sencillo.</p></div>
            <div class="prof-answer"><p><strong>1. Decreto Ley 356 de 1994 — "El Estatuto"</strong><br>"Es la constitución de la seguridad privada en Colombia. Si alguien te pregunta por qué existes como OMT, esta ley es la razón. Dice que los servicios de seguridad PUEDEN usar medios tecnológicos, pero DEBEN ser autorizados."<br><br><strong>2. Decreto 1565 de 2022 — "Tu Obligación"</strong><br>"Esta norma dice que tú DEBES estar capacitado. Sin este curso, legalmente no puedes operar como OMT. No es opcional. Por eso están aquí."<br><br><strong>3. SuperVigilancia — "El que te vigila a TI"</strong><br>"Es la Superintendencia de Vigilancia y Seguridad Privada. Piensen en ella como la DIAN pero para seguridad. Te auditan, te certifican, y si no cumples, te sancionan. Y no solo a ti — a tu empresa también."</p></div>
            <div class="prof-tip"><p><strong>🔑 Frase de impacto:</strong> "¿Qué pasaría si un médico opera sin título? Lo meten preso. ¿Si un conductor maneja sin pase? Lo multan y le inmovilizan el carro. Pues lo mismo pasa si un OMT opera sin certificación. Es ilegal."</p></div>
            <div class="prof-tip"><p><strong>📖 Dato real:</strong> La SuperVigilancia puede imponer multas de hasta 1.000 SMLMV (salarios mínimos) a empresas que tengan operadores sin certificación. En 2026, eso puede superar los $1.300 millones de pesos. Por eso las empresas invierten en que ustedes se capaciten — no es generosidad, es protegerse de la ley.</p></div>
            <div class="prof-tip"><p><strong>📖 Historia:</strong> En 2023, la SuperVigilancia sancionó a una empresa de seguridad en Barranquilla porque sus operadores CCTV no tenían certificación OMT. La multa fue de 200 SMLMV. Los operadores fueron retirados de sus puestos hasta que se certificaran. Eso les puede pasar a cualquier empresa que no cumpla.</p></div>
            <div class="prof-tip"><p><strong>💡 Tip:</strong> Si algún alumno pregunta "¿y si ya llevo años trabajando sin curso?", la respuesta es: "Precisamente por eso estás aquí. El decreto 1565 regularizó la obligación. Antes se pasaba por alto, pero ya no."</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 1 · Cadena PREVENIR (1 hora)</p>
            <h2 class="slide-title">Cadena de Acción PREVENIR</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Este es el CORAZÓN de la clase. Que memoricen los 4 pasos y puedan aplicarlos a cualquier situación. Tiempo: 1 hora con actividad práctica.</p></div>
            <div class="prof-tip"><p><strong>Cómo explicar:</strong> Dibuja una cadena de 4 eslabones en el tablero. "Cada eslabón depende del anterior. Si fallas en prevención, todo lo demás se complica. Pero si haces bien la prevención, a veces ni llegas a la acción."</p></div>
            <div class="prof-answer"><p><strong>🔍 PREVENCIÓN (Anticipar):</strong><br>"Veo a una persona con gorro y mochila grande rondando el perímetro a las 2AM. No espero a que pase algo — informo al guarda del puesto 3 para que esté alerta." El OMT actúa ANTES de que pase algo.<br><br><strong>🛑 DISUASIÓN (Intimidar al delincuente):</strong><br>Cámaras Domo visibles, monitores en recepción mostrando imágenes en vivo, carteles de "Zona Videovigilada", guardas con radios visibles. El delincuente ve todo eso y lo piensa dos veces.<br><br><strong>⚡ ACCIÓN (Responder con protocolo):</strong><br>"Central para Supervisor, el intruso está en Área X, viste camisa roja y jean azul, aproximadamente 1.75m. Procedo a extraer video de cámara 5." Descripción exacta, tono calmado, comunicación clara.<br><br><strong>📋 RESULTADO (Documentar TODO):</strong><br>Se extrajo el video, se hizo el informe con hora exacta, se coordinó con la policía, se entregó copia del video como evidencia. "Lo que no está escrito, no pasó."</p></div>
            <div class="prof-tip"><p><strong>📖 Historia real:</strong> "En Cali, un OMT de una empresa de logística vio por cámara que un empleado de bodega metía productos en su maleta cada noche a las 11PM. En vez de confrontarlo (eso NO es su trabajo), aplicó la cadena completa: PREVENCIÓN — documentó el patrón durante 3 noches consecutivas. DISUASIÓN — sugirió a su supervisor mover una cámara visible al área. ACCIÓN — cuando el empleado lo hizo la cuarta noche, ya tenían 3 noches de video como evidencia sólida. RESULTADO — despido justificado con pruebas irrefutables, sin posibilidad de demanda laboral. Ese OMT le ahorró a la empresa millones en pérdidas y en un posible litigio."</p></div>
            <div class="prof-tip"><p><strong>🎮 Actividad práctica (15 min):</strong><br>1. Pide a un estudiante que invente una situación sospechosa (ej: "un carro desconocido estacionado frente al banco hace 2 horas").<br>2. Pide a OTRO estudiante que aplique los 4 pasos de la cadena.<br>3. El grupo evalúa: ¿Lo hizo bien? ¿Saltó algún paso?<br>4. Repite con 2-3 situaciones diferentes.</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 1 · Funciones + Confidencialidad (1 hora)</p>
            <h2 class="slide-title">Funciones del OMT + Confidencialidad + CCTV</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que memoricen las 5 funciones, entiendan la confidencialidad CON SUS MATICES reales, y conozcan los objetivos del CCTV. Tiempo: 1 hora.</p></div>
            <div class="prof-answer"><p><strong>Las 5 funciones esenciales del OMT:</strong><br>1. <strong>Monitorear y controlar</strong> actividades desde el centro de comunicaciones<br>2. <strong>Atender emergencias</strong> siguiendo los protocolos establecidos<br>3. <strong>Mantener la confidencialidad</strong> en la gestión de operaciones<br>4. <strong>Manejar emergencias</strong> aplicando protocolos y garantizando normas<br>5. <strong>Entregar información</strong> clara y oportuna para respaldar operaciones</p></div>
            <div class="prof-tip"><p><strong>⚖️ CONFIDENCIALIDAD — Explícalo con matices reales:</strong><br><br>"La confidencialidad NO significa que NADIE puede ver las cámaras. Significa que hay un CONDUCTO REGULAR. Vamos a dejar claro quién SÍ y quién NO:"<br><br><strong>✅ SÍ pueden acceder a las grabaciones:</strong><br>• Tu supervisor directo o jefe de seguridad — siempre, es tu jefe<br>• Otro OMT de tu mismo turno — están en la misma sala, trabajan juntos<br>• Gerencia o administración — con autorización formal de seguridad<br>• Policía Nacional, DIJIN, CTI — con solicitud oficial<br>• Fiscalía — con orden judicial o requerimiento formal<br>• El cliente dueño del sistema — según lo que diga el contrato<br><br><strong>❌ NO pueden acceder:</strong><br>• Personal de otras áreas "por curiosidad" o sin autorización<br>• El jefe de mantenimiento, recursos humanos, etc. — sin pasar por seguridad<br>• Amigos, familiares, vecinos, conocidos<br>• NADIE por WhatsApp, redes sociales, TikTok o correo personal<br><br>"En resumen: si alguien quiere ver un video, debe pedirlo a tu supervisor. Tú no eres quien autoriza."</p></div>
            <div class="prof-tip"><p><strong>📖 Historia de advertencia:</strong> "En Medellín, un OMT grabó con su celular un video de las cámaras donde se veía un accidente laboral y lo subió a un grupo de WhatsApp 'para mostrar lo loco que fue'. El video se viralizó. La empresa fue demandada por violación de la privacidad de la víctima del accidente, al OMT lo despidieron con justa causa, y la SuperVigilancia multó a la empresa. Todo por un video de WhatsApp. No cometan ese error."</p></div>
            <div class="prof-tip"><p><strong>📖 Caso contrario (buena práctica):</strong> "Un OMT en Bucaramanga recibió una llamada de la Fiscalía pidiendo un video urgente de un robo. El OMT NO entregó nada directamente — le pidió el número del caso, verificó con su supervisor, y el supervisor autorizó la entrega formal con acta de recibido. Eso es hacer las cosas bien. La Fiscalía felicitó al equipo de seguridad por su profesionalismo."</p></div>
            <div class="prof-tip"><p><strong>🎯 Objetivos del CCTV (resumen rápido):</strong><br>Vigilancia perimetral, control de acceso, monitoreo de áreas restringidas, protección de objetos valiosos, supervisión a distancia, grabación y almacenamiento de evidencia.</p></div>
            <div class="prof-tip"><p><strong>🏁 Cierre Clase 1:</strong> "Hoy aprendieron QUÉ son, POR QUÉ existen legalmente, CUÁL es su misión, y las reglas de confidencialidad con todos sus matices. En la próxima clase veremos CON QUÉ trabajan — las herramientas y equipos del ecosistema CCTV. Los espero."</p></div>`
                }
            ]
        },
        // ==============================
        // CLASE 2: ECOSISTEMA CCTV
        // ==============================
        {
            id: 2,
            num: "CLASE 2",
            title: "El Ecosistema CCTV",
            desc: "Hardware, tipos de grabadores, cámaras y estándar ONVIF",
            icon: "📹",
            color: "#00c853",
            studentSlides: [
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 2 · Hardware</p>
            <h2 class="slide-title">El Ecosistema de CCTV</h2>
            <p class="slide-text">Hoy vamos a conocer las <strong>herramientas</strong> con las que trabaja un OMT. Piensa en esto como conocer tu "arsenal tecnológico".</p>
            <p class="slide-text">Un sistema CCTV tiene <strong>3 componentes principales</strong>:</p>
            <ul class="slide-list">
              <li><strong>📷 Cámaras</strong> — Los ojos del sistema</li>
              <li><strong>💾 Grabadores (DVR/NVR)</strong> — El cerebro que almacena</li>
              <li><strong>🖥️ Monitores y Software</strong> — Tu ventana al sistema</li>
            </ul>`
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 2 · DVR vs NVR</p>
            <h2 class="slide-title">DVR vs NVR — Los Grabadores</h2>
            <div class="semaphore-card" style="border-left-color:#1a73e8; background:rgba(26,115,232,0.08)">
              <h4>💾 DVR — Grabador de Video Digital</h4>
              <p>Graba video de <strong>cámaras analógicas</strong> (las que usan cable coaxial). Piensa en un "VHS moderno". Calidad más baja pero económico.</p>
            </div>
            <div class="semaphore-card" style="border-left-color:#00c853; background:rgba(0,200,83,0.08)">
              <h4>🌐 NVR — Grabador de Video en Red</h4>
              <p>Graba video de <strong>cámaras IP</strong> (las que se conectan por red/internet). Calidad superior, se puede ver desde cualquier lugar con internet.</p>
            </div>
            <div class="slide-example">Un restaurante pequeño usa <strong>DVR</strong> con 4 cámaras analógicas — es barato y cumple. Una empresa multinacional usa <strong>NVR</strong> con 500 cámaras IP — necesita alta resolución y acceso remoto desde otras ciudades.</div>
            <div class="slide-highlight"><strong>¿Cuál es mejor?</strong> Depende del presupuesto y necesidad. El NVR es más moderno y flexible, pero el DVR sigue siendo usado en instalaciones más pequeñas.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "Un centro comercial necesita 200 cámaras de alta resolución y quiere monitorearlas desde otra ciudad. ¿Qué grabador necesita?",
                    options: [
                        "DVR — porque es más económico",
                        "NVR — porque permite cámaras IP y acceso remoto",
                        "Una grabadora de VHS",
                        "No necesita grabador, solo cámaras"
                    ],
                    correctIndex: 1,
                    explanation: "El NVR es la opción correcta porque trabaja con cámaras IP de alta resolución y permite acceso remoto a través de la red.",
                    points: 10
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 2 · ONVIF</p>
            <h2 class="slide-title">ONVIF — El Idioma Universal</h2>
            <div class="slide-highlight"><strong>ONVIF</strong> = Open Network Video Interface Forum<br>Es un estándar que permite que cámaras y grabadores de <strong>diferentes marcas</strong> funcionen juntos.</div>
            <div class="slide-example">Una empresa tiene cámaras marca Hikvision y un grabador marca Dahua. Sin ONVIF, no se comunicarían entre sí. Con ONVIF, el grabador Dahua puede grabar las cámaras Hikvision sin problema. Es como si todos hablaran el mismo "idioma".</div>
            <div class="slide-text"><strong>¿Por qué importa al OMT?</strong> Porque en la práctica, las empresas mezclan equipos de diferentes marcas según precios y disponibilidad. Tú debes saber que mientras sean ONVIF compatible, funcionarán.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Para qué sirve el estándar ONVIF en un sistema CCTV?",
                    options: [
                        "Para aumentar la resolución de las cámaras a 4K automáticamente",
                        "Para permitir que cámaras y grabadores de diferentes marcas funcionen juntos",
                        "Para cifrar las grabaciones y protegerlas de hackers",
                        "Para reducir el consumo de energía de las cámaras IP"
                    ],
                    correctIndex: 1,
                    explanation: "ONVIF es el \"idioma universal\" del CCTV. Permite que equipos de marcas diferentes (Hikvision, Dahua, Bosch, etc.) sean compatibles entre sí.",
                    points: 10
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 2 · Tipos de Cámaras</p>
            <h2 class="slide-title">Tipos de Cámaras de Seguridad</h2>
            <div class="semaphore-card" style="border-left-color:#1a73e8; background:rgba(26,115,232,0.06)">
              <h4>🔵 Cámara Domo</h4>
              <p>Forma de cúpula. Se instala en techos. <strong>Discreta</strong> — el observado no sabe hacia dónde apunta. Ideal para oficinas, tiendas, recepción.</p>
            </div>
            <div class="semaphore-card" style="border-left-color:#00c853; background:rgba(0,200,83,0.06)">
              <h4>🟢 Cámara Bullet</h4>
              <p>Forma cilíndrica/rectangular. Se ve claramente. <strong>Disuasoria</strong> — el delincuente la ve y sabe que lo están grabando. Ideal para exteriores y perímetros.</p>
            </div>
            <div class="semaphore-card" style="border-left-color:#ffd600; background:rgba(255,214,0,0.06)">
              <h4>🟡 Cámara PTZ</h4>
              <p><strong>Pan-Tilt-Zoom</strong>: Se mueve horizontalmente, verticalmente y tiene zoom. El OMT la controla en tiempo real. Ideal para grandes áreas y seguimiento de sospechosos.</p>
            </div>
            <div class="slide-example">En un banco: <strong>Domo</strong> en el interior sobre los cajeros (discretas). <strong>Bullet</strong> en la fachada apuntando a la calle (disuasorias). <strong>PTZ</strong> en el parqueadero controlada por el OMT para seguir vehículos sospechosos.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "En el interior de una joyería quieres vigilar sin que el cliente sepa hacia dónde apunta la cámara. ¿Cuál usas?",
                    options: [
                        "Bullet — porque es visible y disuade",
                        "PTZ — porque tiene zoom óptico potente",
                        "Domo — porque su cúpula oscura oculta la dirección de grabación",
                        "Analógica — porque es más económica"
                    ],
                    correctIndex: 2,
                    explanation: "La cámara Domo es la correcta en interiores donde se necesita discreción. El observado no sabe hacia dónde apunta gracias a su cúpula oscura.",
                    points: 15
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 2 · Infraestructura</p>
            <h2 class="slide-title">Infraestructura de Red Básica</h2>
            <p class="slide-text">Para que las <strong>cámaras IP</strong> funcionen, necesitan una red. Los componentes básicos son:</p>
            <ul class="slide-list">
              <li><strong>Switch PoE</strong> — Dispositivo que conecta las cámaras y les da energía eléctrica por el mismo cable de red</li>
              <li><strong>Cable UTP (Cat 5e/6)</strong> — El cable de red que conecta todo</li>
              <li><strong>Router</strong> — Permite acceso remoto desde internet</li>
              <li><strong>Disco Duro</strong> — Donde se almacenan las grabaciones (dentro del NVR)</li>
            </ul>
            <div class="slide-highlight"><strong>PoE = Power over Ethernet.</strong> Significa que un solo cable lleva datos Y energía a la cámara. Esto simplifica la instalación porque no necesitas un cable eléctrico separado para cada cámara.</div>
            <div class="slide-example">Instalar 20 cámaras IP con PoE solo necesita: 20 cables de red → 1 Switch PoE → 1 NVR → 1 Monitor. Sin PoE, necesitarías además 20 fuentes de poder individuales.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Qué ventaja tiene un Switch PoE?",
                    options: [
                        "Hace que las cámaras tengan mejor resolución",
                        "Envía datos Y energía eléctrica por un solo cable a las cámaras",
                        "Aumenta la velocidad del internet",
                        "Permite grabar en mejor calidad"
                    ],
                    correctIndex: 1,
                    explanation: "PoE (Power over Ethernet) permite enviar datos de video Y energía eléctrica a través de un solo cable de red, simplificando la instalación.",
                    points: 10
                }
            ],
            professorSlides: [
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 2 · Apertura (1 hora)</p>
            <h2 class="slide-title">Ecosistema CCTV + DVR vs NVR + ONVIF</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que conozcan la diferencia entre DVR y NVR, entiendan ONVIF, y puedan identificar cada tipo de grabador. Tiempo: 1 hora.</p></div>
            <div class="prof-tip"><p><strong>Abre la clase así:</strong> "En la clase pasada vimos QUÉ somos y POR QUÉ existimos. Hoy vamos a ver CON QUÉ trabajamos. Imaginen que son mecánicos — antes de arreglar un motor, tienen que conocer las herramientas. Hoy es su día de conocer el taller."</p></div>
            <div class="prof-answer"><p><strong>DVR — Grabador de Video Digital:</strong><br>• Graba cámaras ANALÓGICAS (conectadas por cable coaxial)<br>• Como un "VHS moderno" — recibe señal análoga y la digitaliza<br>• Calidad más baja (máx 1080p generalmente)<br>• Más económico, ideal para negocios pequeños<br>• Ejemplo: una tienda con 4-8 cámaras<br><br><strong>NVR — Grabador de Video en Red:</strong><br>• Graba cámaras IP (conectadas por red/ethernet)<br>• Calidad superior (hasta 4K y más)<br>• Acceso remoto desde celular o computador en otra ciudad<br>• Más caro pero MUCHO más profesional<br>• Ejemplo: una empresa con 50-500 cámaras</p></div>
            <div class="prof-tip"><p><strong>🔑 Analogía estrella:</strong> "El DVR es como la TV por cable — va por un cable dedicado, solo lo ves en tu casa. El NVR es como Netflix — va por internet y lo puedes ver desde tu celular en cualquier parte del mundo."</p></div>
            <div class="prof-tip"><p><strong>📖 ONVIF — explícalo así:</strong> "Imaginen que cada marca de cámara hablara un idioma diferente. Hikvision habla chino, Dahua habla japonés, Bosch habla alemán. ONVIF es como el inglés — es el idioma universal que todos entienden. Si una cámara es ONVIF compatible, funciona con cualquier grabador ONVIF compatible, sin importar la marca."</p></div>
            <div class="prof-tip"><p><strong>📖 Dato práctico:</strong> Las marcas más comunes que van a encontrar en Colombia son: Hikvision, Dahua, Samsung (Hanwha), Bosch, y Axis. Todas son ONVIF compatible. Si ven una marca desconocida que NO es ONVIF, desconfíen — probablemente dará problemas de integración.</p></div>
            <div class="prof-tip"><p><strong>📖 Historia:</strong> "Un cliente en Pereira compró cámaras baratas por internet de una marca china desconocida. Cuando el instalador intentó conectarlas al NVR Hikvision, no funcionaban porque no eran ONVIF. Tuvo que devolver las 16 cámaras y comprar nuevas. Ahorrarse $200.000 le costó $2 millones en pérdida de tiempo y reproceso. Moraleja: siempre verificar compatibilidad ONVIF."</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 2 · Cámaras (1.5 horas)</p>
            <h2 class="slide-title">Tipos de Cámaras + Ubicaciones</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que distingan los 3 tipos de cámaras, sepan cuándo usar cada una, y puedan justificar la ubicación. Tiempo: 1.5 horas incluyendo actividad.</p></div>
            <div class="prof-tip"><p>Si es posible, muestra imágenes reales de cada tipo en tu celular o imprime fotos. Si no, dibuja las formas básicas en el tablero: una media esfera (Domo), un cilindro/rectángulo (Bullet), y una esfera con base móvil (PTZ).</p></div>
            <div class="prof-answer"><p><strong>🔵 Cámara Domo (interiores, discreta):</strong><br>• Forma de cúpula, se instala en techos<br>• DISCRETA — el observado no sabe hacia dónde apunta<br>• Ideal para: oficinas, lobbies, tiendas, recepción, pasillos<br>• Ventaja: como tiene cúpula oscura, el delincuente no sabe si lo está mirando a él o al otro lado<br><br><strong>🟢 Cámara Bullet (exteriores, disuasoria):</strong><br>• Forma cilíndrica/rectangular, visible a simple vista<br>• DISUASORIA — el delincuente la ve y sabe que lo graban<br>• Ideal para: fachadas, perímetros, parqueaderos, entradas vehiculares<br>• Ventaja: su visibilidad reduce intentos de robo. "La mejor cámara es la que evita el crimen antes de que pase."<br><br><strong>🟡 Cámara PTZ (seguimiento, control total):</strong><br>• Pan-Tilt-Zoom: gira horizontal, vertical y tiene zoom óptico<br>• El OMT la controla EN TIEMPO REAL desde el centro de monitoreo<br>• Ideal para: áreas amplias (parqueaderos, bodegas), seguimiento de sospechosos<br>• Ventaja: un PTZ con zoom 30x puede leer una placa vehicular a 200 metros<br>• Desventaja: cuando sigue a alguien en un punto, deja descubierto el resto</p></div>
            <div class="prof-tip"><p><strong>📖 Historia real:</strong> "En un centro comercial en Bogotá, un OMT estaba controlando una PTZ y detectó a dos personas haciendo 'marca' (observando) una joyería. Con el zoom 25x pudo fotografiar sus rostros claramente. Comunicó al supervisor, quien alertó a seguridad. Cuando los sujetos intentaron entrar a la tienda, ya los estaban esperando. La PTZ fue clave porque permitió identificar rostros a más de 100 metros de distancia."</p></div>
            <div class="prof-tip"><p><strong>🎮 Actividad práctica (20 min):</strong><br>Dibuja en el tablero el plano básico de un banco:<br>• Entrada principal<br>• Cajeros<br>• Bóveda<br>• Parqueadero<br>• Oficinas interiores<br><br>Pregunta: "¿Qué tipo de cámara pondrían en cada zona y POR QUÉ?" Que debatan. La respuesta ideal:<br>• Entrada: Bullet (que la vean, disuade)<br>• Cajeros: Domo (discreta, el cliente no se siente intimidado)<br>• Bóveda: Domo con vista fija<br>• Parqueadero: PTZ (área grande, seguir vehículos)<br>• Oficinas: Domo</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 2 · Infraestructura + Cierre (30 min)</p>
            <h2 class="slide-title">Infraestructura de Red + Cierre</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que entiendan PoE y los componentes básicos de red. No necesitan ser ingenieros, solo saber qué hace cada componente. Tiempo: 30 min.</p></div>
            <div class="prof-answer"><p><strong>Componentes básicos de infraestructura:</strong><br><br><strong>Switch PoE:</strong> "Un aparato mágico que conecta todas las cámaras IP y les da energía eléctrica por el MISMO cable de red. Un solo cable = video + electricidad."<br><br><strong>Cable UTP (Cat 5e/6):</strong> El cable de red normal — el mismo que se usa para internet. Es lo que conecta cámaras al switch y al NVR.<br><br><strong>Router:</strong> Permite acceso remoto — ver cámaras desde el celular o desde otra ciudad.<br><br><strong>Disco Duro:</strong> Dentro del NVR. Almacena las grabaciones. Generalmente se guardan 15-30 días dependiendo de la capacidad y la cantidad de cámaras.</p></div>
            <div class="prof-tip"><p><strong>🔑 Explica PoE así:</strong> "Imagínense que cada cámara necesita DOS cables: uno para el video y otro para la electricidad. Con 50 cámaras serían 100 cables. Con PoE, solo necesitas 50 cables porque el mismo cable lleva todo. Menos cables = menos costo = menos problemas = instalación más limpia."</p></div>
            <div class="prof-tip"><p><strong>📖 Dato práctico:</strong> Un disco duro de 4TB (terabytes) puede almacenar aproximadamente 15 días de grabación de 16 cámaras en calidad 1080p. Si el cliente quiere guardar más tiempo, necesita más discos o un servidor de almacenamiento dedicado.</p></div>
            <div class="prof-tip"><p><strong>📖 Historia:</strong> "Una finca ganadera en el Valle tenía cortes de luz frecuentes. Cada vez que se iba la luz, las cámaras dejaban de grabar. Se instaló un Switch PoE con UPS (batería de respaldo) y las cámaras siguieron funcionando 2 horas sin luz. Un día hubo un robo de ganado durante un apagón — y las cámaras grabaron todo. La evidencia ayudó a recuperar 15 cabezas de ganado. Sin PoE con UPS, no habría habido prueba."</p></div>
            <div class="prof-tip"><p><strong>💡 Preguntas frecuentes que harán los alumnos:</strong><br>• "¿Se puede ver las cámaras desde el celular?" — Sí, con NVR + app del fabricante (ej: Hik-Connect, gDMSS)<br>• "¿Cuánto dura la grabación?" — Depende del disco duro, calidad y cantidad de cámaras. Generalmente 15-30 días<br>• "¿Qué pasa si se llena el disco?" — Se sobrescribe automáticamente. Lo más viejo se borra primero</p></div>
            <div class="prof-tip"><p><strong>🏁 Cierre Clase 2:</strong> "Ya saben qué son, por qué existen legalmente, y ahora conocen sus herramientas. Conocen la diferencia entre DVR y NVR, saben qué cámara poner en cada lugar, y entienden cómo se conecta todo. En la próxima clase viene lo MÁS emocionante de todo el curso: ¿Qué hacen cuando suena una ALARMA? Van a aprender el Semáforo del OMT — tres colores que les van a salvar la vida laboral."</p></div>`
                }
            ]
        },
        // ==============================
        // CLASE 3: PROTOCOLO DE ALARMAS
        // ==============================
        {
            id: 3,
            num: "CLASE 3",
            title: "Protocolo de Respuesta a Alarmas",
            desc: "El Semáforo del OMT: clasificación y respuesta a señales",
            icon: "🚨",
            color: "#ff1744",
            studentSlides: [
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 3 · El Semáforo OMT</p>
            <h2 class="slide-title">El Semáforo del OMT</h2>
            <p class="slide-text">Como OMT, recibirás señales constantes de los sistemas de alarma. No todas significan lo mismo. Para no confundirte, usamos el <strong>Semáforo del OMT</strong>:</p>
            <div class="semaphore-card semaphore-red">
              <h4>🔴 ROJO — SEÑAL DE ALARMA (Acción Inmediata)</h4>
              <p><strong>Situaciones:</strong> Pánico, Robo, Coacción, Fuego<br><strong>Protocolo:</strong> ¡NO SE LLAMA AL SITIO! Se despacha inmediatamente al supervisor y/o se notifica a la Policía.</p>
            </div>
            <div class="semaphore-card semaphore-yellow">
              <h4>🟡 AMARILLO — SEÑAL DE VERIFICACIÓN (Anomalía)</h4>
              <p><strong>Situaciones:</strong> Fallo de batería, Falta de cierre, Apertura fuera de horario<br><strong>Protocolo:</strong> Se llama al sitio o a contactos de emergencia para verificar.</p>
            </div>
            <div class="semaphore-card semaphore-green">
              <h4>🟢 VERDE — SEÑAL INFORMATIVA (Sin Operativo)</h4>
              <p><strong>Situaciones:</strong> Apertura normal, Cierre normal, Test del sistema<br><strong>Protocolo:</strong> No se requiere acción. El sistema la registra automáticamente.</p>
            </div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "Son las 11PM y llega señal de ROBO en una joyería. ¿Cuál es tu primera acción como OMT?",
                    options: [
                        "Llamo al local para verificar si es una falsa alarma",
                        "Ignoro la señal y espero una segunda confirmación",
                        "No llamo al sitio — notifico al supervisor y despacho la policía",
                        "Envío un guarda solo para que verifique en persona"
                    ],
                    correctIndex: 2,
                    explanation: "Señal de ROBO = ROJO. NUNCA se llama al sitio (puede alertar al delincuente). La acción correcta: notificar al supervisor y despachar policía de inmediato.",
                    points: 20
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 3 · Protocolo ROJO</p>
            <h2 class="slide-title">🔴 Protocolo ROJO — Paso a Paso</h2>
            <p class="slide-text">Cuando llega una señal ROJA, tu vida puede depender de seguir estos pasos <strong>exactamente</strong>:</p>
            <ul class="slide-list">
              <li><strong>1. NO llames al sitio</strong> — Si hay un robo con rehenes, una llamada puede delatar que hay vigilancia y poner vidas en peligro</li>
              <li><strong>2. Verifica en cámara</strong> — Si tienes acceso visual, confirma la situación</li>
              <li><strong>3. Notifica al supervisor</strong> — Comunica la señal y ubicación exacta</li>
              <li><strong>4. Contacta Red de Apoyo</strong> — Policía, bomberos según corresponda</li>
              <li><strong>5. Documenta TODO</strong> — Hora exacta, acciones tomadas, personas notificadas</li>
            </ul>
            <div class="slide-warning"><strong>¿Por qué NO se llama al sitio?</strong> Imagina una joyería con 3 ladrones armados. Si suena el teléfono, los ladrones se ponen nerviosos y pueden agredir a las víctimas. Tu trabajo es coordinar la respuesta DESDE AFUERA, no intervenir directamente.</div>
            <div class="slide-example"><strong>Caso real:</strong> 11:00PM — Señal de ROBO en "Joyería El Sol".<br>OMT verifica cámara: 2 personas con pasamontañas dentro.<br>OMT a Supervisor: "Señal roja confirmada, Joyería El Sol, cámara 7 confirma intrusión".<br>Supervisor despacha policía. OMT extrae video en tiempo real.<br>Resultado: Policía llega en 8 minutos. Captura exitosa gracias a la descripción exacta del OMT.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál es el SEGUNDO paso del Protocolo ROJO, después de NO llamar al sitio?",
                    options: [
                        "Contactar a la policía inmediatamente",
                        "Verificar la situación en cámara",
                        "Documentar todo en la minuta",
                        "Esperar instrucciones del supervisor"
                    ],
                    correctIndex: 1,
                    explanation: "El orden del Protocolo ROJO es: 1) NO llamar. 2) Verificar en cámara. 3) Notificar al supervisor. 4) Contactar policía. 5) Documentar todo.",
                    points: 15
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 3 · Protocolos AMARILLO y VERDE</p>
            <h2 class="slide-title">🟡 Amarillo y 🟢 Verde</h2>
            <div class="semaphore-card semaphore-yellow">
              <h4>🟡 Protocolo AMARILLO</h4>
              <p><strong>SÍ se puede llamar al sitio</strong> para verificar. Ejemplo: "Buenos días, detectamos que el sistema reporta fallo de batería en su local. ¿Pueden confirmar si hay alguna novedad?"<br><br>Si no contestan o la situación es sospechosa, <strong>se escala a ROJO</strong>.</p>
            </div>
            <div class="semaphore-card semaphore-green">
              <h4>🟢 Protocolo VERDE</h4>
              <p><strong>No requiere acción.</strong> Solo se registra en el sistema. Pero ojo: si una apertura "normal" ocurre a las 3AM en un local que siempre abre a las 8AM... eso es sospechoso y se debe <strong>escalar a AMARILLO</strong>.</p>
            </div>
            <div class="slide-example"><strong>Caso:</strong> Llega señal de "Apertura" en farmacia a las 4AM (normalmente abre a las 7AM). ¿Es verde? NO. Aunque es señal de apertura, el horario es anormal. El OMT inteligente lo escala a AMARILLO y llama al contacto del local para verificar.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "Recibes señal de 'Apertura Normal' de un banco a las 3AM de un domingo. ¿Qué haces?",
                    options: [
                        "Nada, es señal verde — apertura normal",
                        "Lo escalo a AMARILLO porque el horario es sospechoso y llamo a verificar",
                        "Lo escalo a ROJO inmediatamente",
                        "Apago la señal y sigo con las demás"
                    ],
                    correctIndex: 1,
                    explanation: "Aunque la señal dice 'apertura normal', un banco a las 3AM un domingo es anormal. Un OMT inteligente analiza el contexto y escala a AMARILLO para verificar.",
                    points: 10
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál de estas opciones describe correctamente los 5 pasos del Protocolo ROJO en orden?",
                    options: [
                        "Llamar al sitio → Verificar cámara → Notificar supervisor → Policía → Documentar",
                        "NO llamar → Verificar cámara → Notificar supervisor → Contactar policía → Documentar",
                        "Documentar → Policía → Supervisor → Verificar → NO llamar",
                        "Verificar cámara → Llamar al sitio → Policía → Supervisor → Documentar"
                    ],
                    correctIndex: 1,
                    explanation: "Protocolo ROJO: 1) NO llamar al sitio. 2) Verificar en cámara. 3) Notificar al supervisor. 4) Contactar policía/bomberos. 5) Documentar TODO con hora exacta.",
                    points: 15
                }
            ],
            professorSlides: [
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 3 · El Semáforo (1.5 horas)</p>
            <h2 class="slide-title">El Semáforo del OMT — Clasificación de Señales</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Esta es la clase MÁS IMPORTANTE del curso. Que memoricen los 3 colores y sus protocolos de memoria. Tiempo total: 4 horas (incluyendo simulaciones).</p></div>
            <div class="prof-tip"><p><strong>🎬 Abre con dramatismo:</strong> "Imaginen que están SOLOS en la central de monitoreo a las 11 de la noche. Su compañero salió al baño. De repente, suena una alarma. La pantalla dice: ROBO — JOYERÍA EL SOL. ¿Qué hacen?" Deja que 3-4 estudiantes respondan. Muchos dirán "llamo al sitio para verificar" — y ahí los corriges: "¡Acabas de poner en peligro a las víctimas! NUNCA se llama en señal ROJA."</p></div>
            <div class="prof-answer"><p><strong>🔴 ROJO — SEÑAL DE ALARMA (Acción Inmediata):</strong><br>• Situaciones: Pánico silencioso, Robo, Coacción (alguien obligado), Fuego/Incendio<br>• Protocolo: ¡NO SE LLAMA AL SITIO JAMÁS!<br>• Se despacha inmediatamente al supervisor<br>• Se notifica a Policía / Bomberos según corresponda<br>• Se documenta TODO con hora exacta<br><br><strong>🟡 AMARILLO — SEÑAL DE VERIFICACIÓN (Anomalía):</strong><br>• Situaciones: Fallo de batería, puerta no cerrada, apertura fuera de horario, zona sin señal<br>• Protocolo: SÍ se puede llamar al sitio o a contactos de emergencia<br>• Se verifica si la anomalía es real o falsa<br>• Si no contestan o algo es sospechoso → SE ESCALA A ROJO<br><br><strong>🟢 VERDE — SEÑAL INFORMATIVA (Sin Operativo):</strong><br>• Situaciones: Apertura/cierre en horario normal, test del sistema, mantenimiento programado<br>• Protocolo: No requiere acción. Solo se registra automáticamente<br>• PERO: si la señal verde ocurre en HORARIO ANORMAL → escalar a AMARILLO</p></div>
            <div class="prof-tip"><p><strong>🔑 Frase para memorizar:</strong> "ROJO: No llamo, despacho. AMARILLO: Llamo y verifico. VERDE: Registro y sigo. Si hay duda, SIEMPRE escalar al color de arriba."</p></div>
            <div class="prof-tip"><p><strong>⚠️ POR QUÉ NO se llama en ROJO — explícalo con este caso:</strong><br>"Imaginen una joyería con 3 ladrones armados adentro. Tienen 2 empleados de rehenes. Si suena el teléfono del local, pasan dos cosas: 1) Los ladrones se ponen nerviosos y pueden agredir a los rehenes. 2) Los ladrones descubren que hay monitoreo y pueden destruir las cámaras o escapar más rápido. Tu trabajo NO es intervenir — es coordinar la respuesta DESDE AFUERA para que la policía llegue con toda la información posible."</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 3 · Protocolo ROJO en Detalle (1 hora)</p>
            <h2 class="slide-title">Protocolo ROJO — Paso a Paso + Casos</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que aprendan los 5 pasos del protocolo ROJO de memoria y puedan aplicarlos bajo presión.</p></div>
            <div class="prof-answer"><p><strong>Los 5 pasos del Protocolo ROJO:</strong><br><br><strong>PASO 1 — NO llamar al sitio</strong><br>"Esta es la regla más contraintuitiva. Tu instinto dice 'llamo para verificar'. Pero NO. Una llamada puede costar vidas."<br><br><strong>PASO 2 — Verificar en cámara</strong><br>"Si tienes acceso visual al sitio, busca cámaras internas y externas. ¿Ves algo? ¿Cuántas personas hay? ¿Están armadas? ¿Hay rehenes?"<br><br><strong>PASO 3 — Notificar al supervisor</strong><br>"Central para Supervisor: Señal roja confirmada en [ubicación], cámara [número] confirma [situación]. A las [hora exacta]."<br><br><strong>PASO 4 — Contactar Red de Apoyo</strong><br>"Policía: 123. Si hay fuego: Bomberos 119. Si hay heridos: Ambulancia 125. Proporciona: dirección exacta, tipo de emergencia, número de personas involucradas."<br><br><strong>PASO 5 — Documentar TODO</strong><br>"Hora exacta de cada acción. Personas notificadas con nombre. Acciones tomadas. Observaciones de cámara. Este registro puede terminar en un juzgado."</p></div>
            <div class="prof-tip"><p><strong>📖 Caso real para narrar:</strong> "En Bogotá, 2022. 11:47PM. Señal de PÁNICO silencioso en una droguería. El OMT verificó en cámara: vio a dos individuos encapuchados obligando al farmaceuta a abrir la caja. El OMT NO llamó. Notificó a su supervisor a las 11:48. Policía despachada a las 11:49. El OMT proporcionó descripción exacta: 'dos masculinos, uno con buzo negro y gorra roja, otro con chaqueta gris. Uno armado con arma corta. Farmaceuta cooperando.' La policía llegó en 6 minutos. Captura exitosa. El fiscal felicitó al OMT por la calidad de la información que proporcionó. El video fue evidencia clave en el juicio."</p></div>
            <div class="prof-tip"><p><strong>📖 Caso contrario (mala práctica):</strong> "En otra ciudad, un OMT novato recibió señal de robo y su primer instinto fue llamar al local. El ladrón contestó el teléfono, se dio cuenta que había monitoreo, amenazó a los empleados, rompió las cámaras y huyó antes de que llegara la policía. El OMT fue despedido y la empresa perdió al cliente. Todo por una llamada."</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 3 · Simulaciones + Trampas (1.5 horas)</p>
            <h2 class="slide-title">Actividades Prácticas y Trampas</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Practicar los protocolos con simulaciones realistas. Incluye "trampas" para que aprendan a pensar críticamente. Tiempo: 1.5 horas.</p></div>
            <div class="prof-tip"><p><strong>🎮 Simulación 1 — Protocolo ROJO:</strong><br>"Son las 11PM. Llega señal de ROBO en Joyería El Sol, código cliente 4521." Pide a un estudiante que narre paso a paso qué haría. Evalúa:<br>✅ ¿Dijo que NO llama? ✅ ¿Verificó cámara? ✅ ¿Notificó al supervisor con datos precisos? ✅ ¿Contactó policía? ✅ ¿Documentó todo con horas?</p></div>
            <div class="prof-tip"><p><strong>🎮 Simulación 2 — Protocolo AMARILLO:</strong><br>"Son las 9AM de un martes. Llega señal de FALLO DE BATERÍA en Oficinas ABC, código 7823." Otro estudiante narra el protocolo:<br>✅ ¿Llamó al contacto del cliente? ✅ ¿Verificó si hay novedad? ✅ ¿Registró la llamada y el resultado?</p></div>
            <div class="prof-tip"><p><strong>🎮 Simulación 3 — TRAMPA 1:</strong><br>"3AM de un domingo. Señal de APERTURA NORMAL en un banco." A ver quién cae y dice "no hay que hacer nada, es verde". Respuesta correcta: Un banco NO abre a las 3AM un domingo. Aunque la señal dice "apertura normal", el CONTEXTO es anormal. Se escala a AMARILLO y se llama a verificar.<br><br><strong>💡 Lección:</strong> "El OMT inteligente no solo lee la señal — analiza el CONTEXTO. Una señal verde a hora incorrecta puede ser más peligrosa que una señal roja."</p></div>
            <div class="prof-tip"><p><strong>🎮 Simulación 4 — TRAMPA 2:</strong><br>"Son las 2PM. Señal AMARILLA de 'Puerta Abierta' en un almacén. Llamas al contacto y nadie contesta. Llamas 3 veces. Nada. ¿Qué haces?" Respuesta: Se ESCALA A ROJO. Si no contestan después de múltiples intentos, se asume que algo puede estar mal. Se despacha supervisor/policía para verificación física.</p></div>
            <div class="prof-tip"><p><strong>🎮 Simulación 5 — TRAMPA 3:</strong><br>"Llega señal de PÁNICO en una residencia, pero 30 segundos después llega señal de CANCELACIÓN del mismo sistema." ¿Cancelamos todo? NUNCA. Las señales de cancelación después de pánico son sospechosas — el delincuente puede estar obligando a la víctima a desactivar la alarma. Se mantiene protocolo ROJO hasta confirmar con el contacto de emergencia usando una CLAVE SECRETA preestablecida.</p></div>
            <div class="prof-tip"><p><strong>📖 Sobre claves secretas:</strong> Muchas empresas de seguridad asignan a cada cliente una "clave de seguridad" o "clave de coacción". Si al verificar, el contacto da la clave correcta, todo está bien. Si da una clave diferente o no la sabe, se asume coacción y se mantiene el operativo. Esto es muy profesional y marca la diferencia de un buen servicio.</p></div>
            <div class="prof-tip"><p><strong>🏁 Cierre Clase 3:</strong> "El semáforo los va a salvar en este trabajo. Memorícenlo: ROJO — nunca llamo, despacho. AMARILLO — llamo y verifico. VERDE — registro. Y la regla de oro: si hay DUDA, siempre escalas al color de arriba. En la próxima y última clase aprenderán CÓMO comunicar todo esto por radio de forma profesional y cómo redactar informes que sirvan como evidencia legal."</p></div>`
                }
            ]
        },
        // ==============================
        // CLASE 4: COMUNICACIÓN
        // ==============================
        {
            id: 4,
            num: "CLASE 4",
            title: "Comunicación y Mejores Prácticas",
            desc: "Radio, código fonético, informes y recomendaciones finales",
            icon: "📻",
            color: "#ffd600",
            studentSlides: [
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 4 · Comunicación Radial</p>
            <h2 class="slide-title">Comunicación Radial Efectiva</h2>
            <p class="slide-text">Ya sabes monitorear, ya conoces los equipos, ya sabes responder a alarmas. Pero nada sirve si no puedes <strong>comunicar</strong> lo que ves de forma eficiente.</p>
            <div class="slide-highlight"><strong>Las 3 "C" del Radio:</strong><br>🔵 <strong>Clara</strong> — Que se entienda sin dudas<br>🔵 <strong>Concisa</strong> — Solo lo necesario, sin rodeos<br>🔵 <strong>Calmada</strong> — Sin pánico, especialmente en emergencias</div>
            <div class="slide-example"><strong>❌ MAL:</strong> "¡Hey hey! ¡Acá hay un tipo raro que está haciendo cosas raras en la puerta esa del fondo, creo que es la del parqueadero, no sé bien...!"<br><br><strong>✅ BIEN:</strong> "Central para Puesto 3. Reporte: individuo sospechoso en puerta 7-B del parqueadero norte. Solicito verificación visual por cámara 12."</div>`
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 4 · Código Fonético</p>
            <h2 class="slide-title">Código Fonético Internacional</h2>
            <p class="slide-text">Cuando necesitas deletrear un nombre por radio para que no haya confusión, usas el <strong>Código Fonético Internacional</strong>:</p>
            <div class="slide-highlight" style="font-size:13px; line-height:2">
              <strong>A</strong>-Alfa &nbsp; <strong>B</strong>-Bravo &nbsp; <strong>C</strong>-Charlie &nbsp; <strong>D</strong>-Delta &nbsp; <strong>E</strong>-Echo<br>
              <strong>F</strong>-Foxtrot &nbsp; <strong>G</strong>-Golf &nbsp; <strong>H</strong>-Hotel &nbsp; <strong>I</strong>-India &nbsp; <strong>J</strong>-Juliet<br>
              <strong>K</strong>-Kilo &nbsp; <strong>L</strong>-Lima &nbsp; <strong>M</strong>-Mike &nbsp; <strong>N</strong>-November &nbsp; <strong>O</strong>-Oscar<br>
              <strong>P</strong>-Papa &nbsp; <strong>Q</strong>-Quebec &nbsp; <strong>R</strong>-Romeo &nbsp; <strong>S</strong>-Sierra &nbsp; <strong>T</strong>-Tango<br>
              <strong>U</strong>-Uniform &nbsp; <strong>V</strong>-Victor &nbsp; <strong>W</strong>-Whiskey &nbsp; <strong>X</strong>-X-ray &nbsp; <strong>Y</strong>-Yankee &nbsp; <strong>Z</strong>-Zulu
            </div>
            <div class="slide-example"><strong>Ejemplo:</strong> Necesitas deletrear "ROBO" por radio:<br>"Romeo-Oscar-Bravo-Oscar"</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cómo se deletrea correctamente 'CCTV' usando el código fonético internacional?",
                    options: [
                        "Colombia-Colombia-Tango-Venezuela",
                        "Charlie-Charlie-Tango-Victor",
                        "Charlie-Carol-Tango-Victor",
                        "Charlie-Charlie-Toronto-Victor"
                    ],
                    correctIndex: 1,
                    explanation: "C=Charlie, C=Charlie, T=Tango, V=Victor. El código fonético internacional es estándar: Alpha, Bravo, Charlie, Delta, Echo, Foxtrot...",
                    points: 10
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 4 · Estructura del Mensaje</p>
            <h2 class="slide-title">Estructura de un Mensaje Radial</h2>
            <p class="slide-text">Todo mensaje por radio sigue <strong>4 pasos</strong>:</p>
            <ul class="slide-list">
              <li><strong>1. QUIÉN LLAMA Y A QUIÉN:</strong> "Central para Supervisor Zeta 1, me copia."</li>
              <li><strong>2. MENSAJE:</strong> "Reporto dos individuos en actitud sospechosa en el perímetro norte, cerca de cámara 8."</li>
              <li><strong>3. ACCIÓN/SOLICITUD:</strong> "Favor realizar ronda de verificación por el sector."</li>
              <li><strong>4. CIERRE:</strong> "Copiado Central. Procedo al punto."</li>
            </ul>
            <div class="slide-example"><strong>Mensaje completo de ejemplo:</strong><br><em>"Central para Supervisor Zeta 1, me copia."</em><br><em>"Reporto vehículo sin placas estacionado frente a puerta principal desde hace 45 minutos."</em><br><em>"Solicito verificación y posible registro de placa."</em><br><em>"Copiado Central, entendido. Procedo."</em></div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál es el TERCER paso de la estructura de un mensaje radial?",
                    options: [
                        "Identificar quién llama y a quién",
                        "El mensaje o reporte de la situación",
                        "La acción o solicitud específica",
                        "El cierre confirmando que fue recibido"
                    ],
                    correctIndex: 2,
                    explanation: "Estructura de 4 pasos: 1) Quién llama a quién. 2) El mensaje/reporte. 3) La acción o solicitud. 4) Cierre (confirmación de recibido).",
                    points: 15
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 4 · Informes</p>
            <h2 class="slide-title">Redacción de Informes y Minutas</h2>
            <div class="slide-highlight"><strong>Principio Fundamental:</strong><br>"Lo que no está escrito, NO SUCEDIÓ".<br>El informe es tu respaldo legal y profesional.</div>
            <p class="slide-text">Un buen informe tiene 4 propiedades:</p>
            <ul class="slide-list">
              <li><strong>Claro:</strong> ¿Se entiende lo que pasó?</li>
              <li><strong>Oportuno:</strong> ¿Se reportó de inmediato?</li>
              <li><strong>Preciso:</strong> ¿Contiene datos exactos (hora, lugar, descripción)?</li>
              <li><strong>Completo:</strong> Responde a: ¿Qué? ¿Quién? ¿Cuándo? ¿Dónde? ¿Cómo?</li>
            </ul>
            <div class="slide-example"><strong>Ejemplo de minuta correcta:</strong><br><em>"Fecha: 15/03/2026 — Hora: 23:15 — OMT: J. Pérez<br>Evento: Señal de alarma tipo ROBO en cliente 'Joyería El Sol' (Cód. 4521).<br>Acción: Se verificó en cámara 7 — confirmada intrusión de 2 individuos con pasamontañas. Se notificó a Supervisor Zeta 1 a las 23:16. Policía despachada a las 23:17. Captura efectuada a las 23:25.<br>Resultado: Video extraído, copia entregada a autoridades."</em></div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "Una minuta de emergencia es válida como evidencia legal cuando incluye obligatoriamente:",
                    options: [
                        "Solo la descripción general del evento, sin fechas ni nombres",
                        "Fecha, hora exacta, descripción del evento, acciones tomadas y personas notificadas",
                        "El nombre del supervisor y la firma del gerente de la empresa",
                        "El número de cámaras que grabaron el evento y la marca del equipo"
                    ],
                    correctIndex: 1,
                    explanation: "Una minuta completa responde las 5W: ¿Qué? ¿Quién? ¿Cuándo? (hora exacta) ¿Dónde? ¿Cómo? + acciones tomadas + personas notificadas. Sin estos datos, no sirve como evidencia.",
                    points: 20
                },
                {
                    type: "info",
                    html: `<p class="slide-section">Clase 4 · Mejores Prácticas</p>
            <h2 class="slide-title">Recomendaciones Finales</h2>
            <p class="slide-text">Para cerrar el curso, estas son las <strong>4 reglas de oro</strong> del OMT profesional:</p>
            <ul class="slide-list">
              <li><strong>🔍 Atención y Proactividad:</strong> No seas un espectador. Anticipa los problemas antes de que ocurran.</li>
              <li><strong>🔒 Confidencialidad Absoluta:</strong> No compartas claves, procedimientos ni detalles de la operación con nadie.</li>
              <li><strong>😮‍💨 Manejo del Estrés:</strong> En una emergencia, tu calma es la que coordina a todos. Respira y sigue el protocolo.</li>
              <li><strong>🗺️ Conoce tu Entorno:</strong> Estudia los puntos ciegos, las zonas vulnerables y los procedimientos del lugar que vigilas.</li>
            </ul>
            <div class="slide-warning"><strong>Recuerda siempre:</strong> Tu rol como OMT salva vidas. No eres solo alguien mirando pantallas — eres el primer eslabón en la cadena de seguridad. Tu profesionalismo marca la diferencia entre una tragedia y una operación exitosa.</div>
            <div class="slide-example"><strong>Historia final:</strong> Un OMT novato en su primer turno nocturno notó que una cámara del perímetro se "congeló" por 2 minutos. En vez de ignorarlo, reportó la anomalía. Resultó ser que alguien había cubierto la cámara. La alerta temprana del OMT permitió interceptar un robo en progreso. Ser proactivo salvó ese día.</div>`
                },
                {
                    type: "exercise",
                    exerciseType: "multiple",
                    question: "¿Cuál es el principio más importante de la redacción de informes?",
                    options: [
                        "Usar palabras complicadas para sonar profesional",
                        "Lo que no está escrito, no sucedió",
                        "Escribir lo mínimo posible para ahorrar tiempo",
                        "Solo escribir si el supervisor lo pide"
                    ],
                    correctIndex: 1,
                    explanation: "\"Lo que no está escrito, no sucedió.\" El informe es tu respaldo legal. Todo evento debe documentarse de inmediato con precisión.",
                    points: 10
                }
            ],
            professorSlides: [
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 4 · Comunicación Radial (1.5 horas)</p>
            <h2 class="slide-title">Comunicación Radial + Código Fonético</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que dominen la comunicación por radio: las 3 C, la estructura del mensaje y el código fonético. Tiempo: 1.5 horas con actividades prácticas.</p></div>
            <div class="prof-tip"><p><strong>🎬 Actividad de apertura (rompe-hielo, 15 min):</strong><br>Pide a cada estudiante que se ponga de pie y deletree su APELLIDO usando el código fonético internacional. Ejemplo: ZAPATA = Zulu-Alfa-Papa-Alfa-Tango-Alfa. Si se equivocan, que lo intenten de nuevo. Esto los engancha de inmediato y practican sin darse cuenta.</p></div>
            <div class="prof-answer"><p><strong>Las 3 "C" del Radio — explicación detallada:</strong><br><br>🔵 <strong>CLARA:</strong> "Que se entienda sin repetir. No murmures, no hables rápido, no uses jerga que el otro no entienda. Si el supervisor te pide repetir, ya fallaste en la primera C."<br><br>🔵 <strong>CONCISA:</strong> "Solo lo necesario. El radio es compartido — si tú hablas 2 minutos, nadie más puede comunicar. Imaginen que el canal de radio es como un puente de un solo carril: mientras tú pasas, nadie más puede cruzar."<br><br>🔵 <strong>CALMADA:</strong> "Esta es la más difícil. En una emergencia real, tu adrenalina sube. Quieres gritar. Pero si gritas por radio, transmites pánico a TODO el equipo. El OMT que habla calmado genera confianza. El que grita genera caos."</p></div>
            <div class="prof-tip"><p><strong>📖 Historia:</strong> "En una empresa de seguridad en Medellín, un OMT detectó un incendio en un piso de oficinas. Por radio dijo: [nervioso] '¡FUEGO FUEGO HAY FUEGO EN EL PISO 3 MANDEN A ALGUIEN!' El supervisor no entendió bien, los guardas se confundieron, hubo desorden en la evacuación. Afortunadamente no hubo heridos graves. Después, en la revisión, entrenaron al OMT para decir: 'Central para Supervisor. Reporte de emergencia: incendio confirmado en Piso 3, sector norte. Solicito activación de protocolo de evacuación y despacho de bomberos 119. Hora: 14:32.' Clara, concisa, calmada. Esa diferencia SALVA VIDAS."</p></div>
            <div class="prof-tip"><p><strong>📻 Estructura del mensaje — 4 pasos:</strong><br><br><strong>1. QUIÉN llama a QUIÉN:</strong> "Central para Supervisor Zeta 1, me copia."<br>— Siempre identificas quién eres y a quién llamas.<br><br><strong>2. MENSAJE / REPORTE:</strong> "Reporto dos individuos en actitud sospechosa en el perímetro norte, cerca de cámara 8. Uno con mochila grande, otro con gorra roja."<br>— Datos concretos: qué ves, cuántos, dónde exactamente, descripción física.<br><br><strong>3. ACCIÓN / SOLICITUD:</strong> "Favor realizar ronda de verificación por el sector y confirmar identidad."<br>— Qué necesitas que hagan.<br><br><strong>4. CIERRE:</strong> "Copiado Central. Procedo al punto."<br>— Confirma que recibiste y entendiste.</p></div>
            <div class="prof-tip"><p><strong>🎮 Actividad práctica (30 min):</strong><br>Haz parejas. Uno es el OMT en la central y otro es el Supervisor en terreno. Tú (profesor) les das un escenario y ellos deben comunicarse usando la estructura de 4 pasos.<br><br><strong>Escenario 1:</strong> "Un vehículo sin placas lleva 45 minutos frente a la puerta principal."<br><strong>Escenario 2:</strong> "Detectas por cámara que un empleado se guarda productos en la maleta."<br><strong>Escenario 3:</strong> "Se activó alarma de incendio en el piso 5."<br><br>Evalúa: ¿Usaron las 3 C? ¿Siguieron los 4 pasos? ¿La descripción fue precisa?</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 4 · Informes y Minutas (1.5 horas)</p>
            <h2 class="slide-title">Redacción de Informes + Práctica</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Que entiendan la importancia legal del informe y puedan redactar una minuta básica correcta. Tiempo: 1.5 horas.</p></div>
            <div class="prof-tip"><p><strong>🔑 Principio fundamental — grítalo:</strong><br>"LO QUE NO ESTÁ ESCRITO, NO SUCEDIÓ."<br><br>Repítelo 3 veces con los alumnos. Que lo memoricen. Este principio los va a proteger legalmente en toda su carrera. Si mañana hay un juicio y tú dices "yo reporté eso" pero no hay informe escrito, es tu palabra contra nada. El juez NO te va a creer sin evidencia documental.</p></div>
            <div class="prof-answer"><p><strong>Las 4 propiedades de un buen informe:</strong><br><br>✅ <strong>CLARO:</strong> ¿Se entiende lo que pasó sin necesidad de explicación adicional? Si tu supervisor lee tu informe sin haberte hablado, ¿entiende TODO?<br><br>✅ <strong>OPORTUNO:</strong> ¿Lo escribiste de inmediato o 3 horas después cuando ya se te olvidaron los detalles? Un informe escrito 30 minutos después del evento pierde el 50% de los detalles.<br><br>✅ <strong>PRECISO:</strong> ¿Contiene datos exactos? Hora: 23:15 (no "como a las 11"). Ubicación: Puerta 7-B del parqueadero norte (no "por ahí por el parqueadero"). Descripción: masculino, aprox 1.75m, buzo negro, gorra roja (no "un tipo de negro").<br><br>✅ <strong>COMPLETO:</strong> Responde las 5W:<br>• ¿QUÉ pasó? — Señal de robo confirmada por CCTV<br>• ¿QUIÉN estuvo involucrado? — 2 individuos, farmaceuta como víctima<br>• ¿CUÁNDO? — 23:47 del 15/03/2026<br>• ¿DÓNDE? — Droguería La Salud, Calle 45 #23-12<br>• ¿CÓMO? — Ingresaron por puerta principal, obligaron a abrir caja</p></div>
            <div class="prof-tip"><p><strong>📝 Ejemplo de minuta PERFECTA (muéstralo como modelo):</strong><br><br>"<em>Fecha: 15/03/2026 — Hora: 23:47 — OMT: Juan Pérez — Turno: Nocturno<br>Evento: A las 23:47 se recibió señal de PÁNICO silencioso del cliente 'Droguería La Salud' (Cód. 8421), ubicado en Calle 45 #23-12, Barrio Centro.<br>Verificación: Se verificó en cámaras 3 y 4 del cliente. Se confirmó presencia de 2 individuos encapuchados obligando al farmaceuta a abrir la registradora.<br>Acciones: 23:48 — Se notificó a Supervisor de turno Sr. Rodríguez por canal 3. 23:49 — Se reportó al 123 (Policía Nacional), caso #45-2026-1847. Se proporcionó dirección y descripción de sospechosos.<br>Resultado: Policía llegó a las 23:55. Captura de ambos individuos. Video extraído de cámaras 3 y 4, copia entregada a Sargento Martínez con acta de recibido.<br>Firma: Juan Pérez — OMT Certificado</em>"</p></div>
            <div class="prof-tip"><p><strong>🎮 Actividad práctica (30 min):</strong><br>Usa el caso de la joyería de la Clase 3. Pide que redacten una minuta en su cuaderno o en la app. Dales 15 minutos. Luego, lee 2-3 minutas en voz alta y evalúa:<br>✅ ¿Tiene fecha y hora exacta?<br>✅ ¿Describe el evento claramente?<br>✅ ¿Dice qué acciones se tomaron?<br>✅ ¿Incluye nombres de personas notificadas?<br>✅ ¿Tiene resultado?<br>Los mejores pueden recibir un punto extra.</p></div>
            <div class="prof-tip"><p><strong>📖 Historia de advertencia:</strong> "Un OMT en Cali reportó verbalmente un incidente pero nunca hizo el informe escrito. Semanas después, el cliente demandó a la empresa de seguridad porque dijo que nadie reportó nada. El OMT decía 'yo sí reporté, se lo dije al supervisor por radio'. Pero sin informe escrito, fue como si no hubiera pasado. La empresa perdió el contrato y al OMT lo despidieron. Todo porque no escribió 5 párrafos."</p></div>`
                },
                {
                    html: `<p class="slide-section">GUÍA PROFESOR · Clase 4 · Cierre del Curso (1 hora)</p>
            <h2 class="slide-title">Mejores Prácticas + Cierre Ceremonial</h2>
            <div class="prof-tip"><p><strong>🎯 Objetivo:</strong> Cerrar el curso con las 4 reglas de oro, revisar puntuaciones, y hacer un cierre motivacional que los deje orgullosos de su profesión. Tiempo: 1 hora.</p></div>
            <div class="prof-answer"><p><strong>Las 4 Reglas de Oro del OMT Profesional:</strong><br><br>🔍 <strong>1. ATENCIÓN Y PROACTIVIDAD</strong><br>"No seas un espectador. No estés mirando el celular mientras las cámaras muestran el mundo. Tu trabajo es ANTICIPAR problemas. Detectar lo que otros no ven."<br><br>🔒 <strong>2. CONFIDENCIALIDAD</strong><br>"Ya lo vimos en detalle: conducto regular. Si tienes dudas sobre quién puede ver qué, pregunta a tu supervisor antes de actuar."<br><br>😮‍💨 <strong>3. MANEJO DEL ESTRÉS</strong><br>"En una emergencia real, tu calma es la que coordina a todos. Si tú pierdes la cabeza, todo el equipo la pierde. Practica esto: antes de hablar por radio en una emergencia, toma UNA respiración profunda de 3 segundos. Esos 3 segundos te salvan de decir incoherencias."<br><br>🗺️ <strong>4. CONOCE TU ENTORNO</strong><br>"Cuando llegues a un puesto nuevo, lo PRIMERO que haces es estudiar: ¿dónde están los puntos ciegos? ¿cuáles son las zonas más vulnerables? ¿cuáles son los procedimientos específicos de ese lugar? Un OMT que llega y ni sabe dónde está la salida de emergencia no va a poder proteger a nadie."</p></div>
            <div class="prof-tip"><p><strong>📖 Historia final motivacional:</strong><br>"Para cerrar el curso, les cuento esta historia. Un OMT novato, en su PRIMER turno nocturno en una bodega, notó algo que nadie más habría notado: una de las cámaras del perímetro se 'congeló' por exactamente 2 minutos y luego volvió. La mayoría habría pensado 'se fue la señal un momento, normal.' Pero este OMT NO lo dejó pasar. Reportó la anomalía a su supervisor. Mandaron un guarda a verificar. Resultó que alguien había cubierto la cámara con una bolsa mientras intentaba saltar la cerca. La alerta temprana del OMT permitió interceptar el intento de robo ANTES de que se concretara.<br><br>Ese OMT no tenía experiencia, no tenía años de trabajo. Lo que tenía era ATENCIÓN, PROACTIVIDAD, y los PROTOCOLOS que aprendió en su curso. Exactamente lo que ustedes acaban de aprender."</p></div>
            <div class="prof-tip"><p><strong>🏁 Cierre ceremonial:</strong><br><br>1. Revisa las puntuaciones de los estudiantes en la app. Felicita públicamente al que tenga mejor puntaje.<br><br>2. Discurso final: "Hoy terminamos formalmente las 16 horas del curso de Operadores de Medios Tecnológicos. Ahora son operadores CAPACITADOS bajo el Decreto 1565 de 2022. Recuerden siempre las 4 reglas: Atención, Confidencialidad, Calma y Conocimiento del entorno. Esto NO es solo un trabajo — es una responsabilidad con la sociedad. Cada vez que se sienten frente a esas pantallas, están protegiendo vidas, bienes y el sustento de familias enteras. Sean profesionales. Sean los mejores."<br><br>3. Si aplica, explica el proceso de certificación y próximos pasos administrativos.</p></div>`
                }
            ]
        }
    ]
};
