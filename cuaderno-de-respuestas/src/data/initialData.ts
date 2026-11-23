import {Course, QuestionItem} from '../types/course';

export const MODULE_ONE_EXAM_COURSE: Course = {
  id: 'course-cultura-ciberseguridad',
  name: 'Cultura de ciberseguridad para personas servidoras públicas',
  description: 'Examen del módulo 1 de cultura de ciberseguridad.',
  createdAt: '2026-11-23T12:00:00.000Z',
};

export const MODULE_TWO_EXAM_COURSE: Course = {
  id: 'course-etica-servicio-publico',
  name: 'Ética, práctica y mística del servicio público',
  description: 'Examen del módulo 2 de ética y servicio público.',
  createdAt: '2026-11-23T12:00:00.000Z',
};

export const MODULE_THREE_EXAM_COURSE: Course = {
  id: 'course-formacion-igualdad-sustantiva',
  name: 'Formación en igualdad sustantiva y derechos de las mujeres',
  description: 'Examen del módulo 3 de igualdad sustantiva y derechos de las mujeres.',
  createdAt: '2026-11-23T12:00:00.000Z',
};

export const MODULE_FOUR_EXAM_COURSE: Course = {
  id: 'course-proteccion-datos-personales',
  name: 'Protección de datos personales: cumplimiento y buenas prácticas',
  description: 'Examen de protección de datos personales.',
  createdAt: '2026-11-23T12:00:00.000Z',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-igualdad-genero',
    name: 'Igualdad de Género y Desarrollo Social',
    description:
      'Módulos sobre autonomía económica, brechas salariales, corresponsabilidad y políticas públicas.',
    createdAt: '2026-11-20T09:00:00.000Z',
  },
  {
    id: 'course-competencias-digitales',
    name: 'Competencias Digitales y Seguridad',
    description:
      'Evaluaciones sobre ciudadanía digital, protección de datos personales y herramientas colaborativas.',
    createdAt: '2026-11-21T10:30:00.000Z',
  },
  MODULE_ONE_EXAM_COURSE,
  MODULE_TWO_EXAM_COURSE,
  MODULE_THREE_EXAM_COURSE,
  MODULE_FOUR_EXAM_COURSE,
];

const MODULE_ONE_QUESTION_DEFINITIONS: Pick<
  QuestionItem,
  'prompt' | 'options' | 'correctLetter'
>[] = [
  {
    prompt:
      '¿En cuál de los siguientes documentos se establecen los lineamientos para la protección de la información digital en la Administración Pública Federal?',
    options: [
      {letter: 'A', text: 'Ley General de Responsabilidades Administrativas.'},
      {letter: 'B', text: 'Política General de Ciberseguridad.'},
      {letter: 'C', text: 'Ley General de Archivos.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      '¿Cuál de las siguientes situaciones representa un comportamiento sospechoso en un equipo institucional?',
    options: [
      {letter: 'A', text: 'Actualizaciones automáticas del antivirus.'},
      {letter: 'B', text: 'Solicitud periódica de cambio de contraseña.'},
      {letter: 'C', text: 'Lentitud inusual del equipo.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      '¿Cuál de las siguientes opciones representa una señal de alerta para identificar un sitio web potencialmente riesgoso?',
    options: [
      {letter: 'A', text: 'El sitio utiliza HTTPS con ícono de candado.'},
      {letter: 'B', text: 'El sitio incluye una sección de contacto.'},
      {letter: 'C', text: 'El sitio muestra publicidad ajena al contenido principal.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: '¿Por qué es importante reportar a la UTIC cualquier actividad sospechosa?',
    options: [
      {letter: 'A', text: 'Porque activa oportunamente los procesos de respuesta.'},
      {letter: 'B', text: 'Los sistemas detectan todo automáticamente.'},
      {letter: 'C', text: 'No importa cuándo se reporte.'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: '¿Cuál es uno de los riesgos de dejar una cuenta abierta en un equipo compartido?',
    options: [
      {letter: 'A', text: 'Que otras personas visualicen algunos datos.'},
      {letter: 'B', text: 'Que otra persona realice acciones haciéndose pasar por ti.'},
      {letter: 'C', text: 'Que la contraseña cambie automáticamente.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Cuál de las siguientes opciones es una vulnerabilidad?',
    options: [
      {letter: 'A', text: 'Una página fraudulenta en internet.'},
      {letter: 'B', text: 'El robo de datos de acceso.'},
      {letter: 'C', text: 'Escribir tu contraseña en una nota adhesiva.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: '¿Cuál es una medida de prevención ante un posible incidente de ciberseguridad?',
    options: [
      {letter: 'A', text: 'Reportar incidentes a la UTIC.'},
      {letter: 'B', text: 'Realizar respaldos periódicos en la nube institucional.'},
      {letter: 'C', text: 'Evitar manipular equipos afectados.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      'Cuando hablamos de ingeniería social, ¿qué elemento vulnerable buscan aprovechar los ciberdelincuentes?',
    options: [
      {letter: 'A', text: 'Los equipos sin antivirus.'},
      {
        letter: 'B',
        text: 'Las personas que usan sistemas o tienen acceso a información importante.',
      },
      {letter: 'C', text: 'Los sistemas desactualizados.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Cuál de las siguientes opciones es una señal de alerta del vishing?',
    options: [
      {letter: 'A', text: 'La persona verifica su identidad institucional.'},
      {letter: 'B', text: 'La persona que llama utiliza un tono de urgencia para ayudarte.'},
      {letter: 'C', text: 'La persona no solicita datos personales.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Cuál de las siguientes opciones es una buena práctica de privacidad para redes sociales?',
    options: [
      {letter: 'A', text: 'No tener más de una cuenta en redes sociales.'},
      {letter: 'B', text: 'Rechazar solicitudes de cuentas con amigos en común.'},
      {letter: 'C', text: 'Evitar sobreexponer tu vida personal y restringir tu perfil.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: '¿Qué acción debes realizar si detectas o sospechas de un incidente de ciberseguridad?',
    options: [
      {letter: 'A', text: 'Reportarlo de inmediato a la UTIC.'},
      {letter: 'B', text: 'Intentar resolverlo por tu cuenta.'},
      {letter: 'C', text: 'Manipular el equipo para investigar.'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: '¿Cuál de las siguientes situaciones representa una amenaza de ciberseguridad?',
    options: [
      {letter: 'A', text: 'Dejar el equipo bloqueado al ausentarte.'},
      {letter: 'B', text: 'Permitir que un compañero conecte una memoria USB personal a tu equipo.'},
      {letter: 'C', text: 'Mantener actualizado el antivirus institucional.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Cuál de los siguientes riesgos es un error al manejar credenciales institucionales?',
    options: [
      {letter: 'A', text: 'Crear contraseñas robustas.'},
      {letter: 'B', text: 'Compartir una contraseña institucional con otra persona.'},
      {letter: 'C', text: 'Cambiar la contraseña cuando el sistema lo solicita.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      '¿Cuál de las siguientes prácticas ayuda a proteger la información al compartir un archivo en la nube?',
    options: [
      {letter: 'A', text: 'Compartir acceso completo a todos los usuarios.'},
      {letter: 'B', text: 'Mantener el acceso abierto permanentemente.'},
      {letter: 'C', text: 'Enviar el enlace y compartir la contraseña por un canal distinto.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'El uso de contraseñas seguras es recomendable ________.',
    options: [
      {letter: 'A', text: 'sólo en cuentas importantes'},
      {letter: 'B', text: 'cuando no existe verificación en dos pasos'},
      {letter: 'C', text: 'en cualquier cuenta digital'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      '¿Por qué es necesario reportar oportunamente cualquier comportamiento sospechoso en tu equipo institucional a la UTIC?',
    options: [
      {letter: 'A', text: 'Porque permite determinar si existe un incidente de ciberseguridad.'},
      {letter: 'B', text: 'Porque elimina automáticamente cualquier amenaza.'},
      {letter: 'C', text: 'Porque el equipo volverá a funcionar de inmediato.'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: '¿Cuál es la práctica más adecuada para almacenar respaldos de información institucional?',
    options: [
      {letter: 'A', text: 'Conservar respaldos en una memoria personal.'},
      {letter: 'B', text: 'Utilizar servicios de nube no autorizados.'},
      {letter: 'C', text: 'Guardar respaldos en la nube institucional autorizada.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'Si vas a dejar tu área de trabajo por unos minutos, ¿cuál es la práctica más adecuada?',
    options: [
      {letter: 'A', text: 'Minimizar las ventanas.'},
      {letter: 'B', text: 'Bloquear la pantalla y verificar que no existan sesiones expuestas.'},
      {letter: 'C', text: 'Cerrar sólo los programas con información confidencial.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      'El incumplimiento de tus obligaciones legales, aun por causas como ________, puede llevar a faltas administrativas y sanciones.',
    options: [
      {letter: 'A', text: 'exceso de trabajo'},
      {letter: 'B', text: 'el descuido o desconocimiento'},
      {letter: 'C', text: 'falta de interés o de tiempo'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Cuál de las siguientes situaciones constituye un incidente de ciberseguridad?',
    options: [
      {letter: 'A', text: 'Actualización del antivirus.'},
      {letter: 'B', text: 'Uso no autorizado de credenciales institucionales.'},
      {letter: 'C', text: 'Cambio periódico de contraseña.'},
    ],
    correctLetter: 'B',
  },
];

export const MODULE_ONE_EXAM_QUESTIONS: QuestionItem[] =
  MODULE_ONE_QUESTION_DEFINITIONS.map((question, index) => ({
    ...question,
    id: `q-cultura-ciberseguridad-${index + 1}`,
    courseId: MODULE_ONE_EXAM_COURSE.id,
    moduleName: 'Módulo 1 · Cultura de ciberseguridad',
    questionNumber: `Pregunta ${index + 1}`,
    statements: [],
    createdAt: '2026-11-23T12:00:00.000Z',
    updatedAt: '2026-11-23T12:00:00.000Z',
  }));

type ExamQuestionDefinition = Pick<
  QuestionItem,
  'prompt' | 'options' | 'correctLetter'
> & {
  statements?: string[];
};

const MODULE_TWO_QUESTION_DEFINITIONS: ExamQuestionDefinition[] = [
  {
    prompt: 'Los 3 factores que contribuyen a que las mujeres sean más pobres son:',
    statements: [
      'La falta de acceso a Internet',
      'La dedicación a actividades domésticas',
      'La falta de acceso a servicios financieros',
      'El cuidado de personas sin remuneración',
      'La limitación para tener un empleo de tiempo completo por responsabilidades familiares',
    ],
    options: [
      {letter: 'A', text: '1, 3, 4'},
      {letter: 'B', text: '2, 3, 4'},
      {letter: 'C', text: '2, 4, 5'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'Un componente del análisis multidimensional de la pobreza es:',
    options: [
      {letter: 'A', text: 'El número de hijas e hijos'},
      {letter: 'B', text: 'La afiliación a la Seguridad Social'},
      {letter: 'C', text: 'La productividad laboral'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿De dónde proviene la misión del servicio público?',
    options: [
      {letter: 'A', text: 'De la tradición institucional del gobierno'},
      {letter: 'B', text: 'Del mandato popular'},
      {letter: 'C', text: 'De la formación profesional de los servidores'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Qué efectos tiene el combate a la corrupción en las instituciones públicas?',
    options: [
      {letter: 'A', text: 'Reduce la capacidad del Estado para regular los mercados'},
      {letter: 'B', text: 'Debilita los programas de infraestructura'},
      {letter: 'C', text: 'Fortalece las instituciones y amplía el presupuesto'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      '¿Qué caracteriza a los principios internacionales en el marco del derecho internacional?',
    options: [
      {
        letter: 'A',
        text: 'Son normas que orientan la relación entre Estados y buscan garantizar el respeto mutuo',
      },
      {
        letter: 'B',
        text: 'Son principios universalmente reconocidos, aunque no siempre respetados',
      },
      {
        letter: 'C',
        text: 'Son acuerdos establecidos por organismos internacionales para regular la cooperación entre países',
      },
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Qué papel tuvo la Constitución de 1917 en estas transformaciones?',
    options: [
      {letter: 'A', text: 'Es un reflejo de los avances derivados de la Revolución Mexicana'},
      {letter: 'B', text: 'Es una compilación de leyes virreinales'},
      {letter: 'C', text: 'Es un documento político sin implicaciones sociales'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: 'La mística humanista en el servicio público se puede definir como:',
    options: [
      {letter: 'A', text: 'Como un conjunto de normas jurídicas obligatorias'},
      {letter: 'B', text: 'Como un código administrativo de eficiencia gubernamental'},
      {letter: 'C', text: 'Como una fuerza colectiva basada en los principios del Humanismo Mexicano'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'En el diseño de políticas públicas, reconocer la diversidad de México implica considerar:',
    options: [
      {letter: 'A', text: 'Las condiciones económicas generales del país'},
      {letter: 'B', text: 'Las características culturales, lingüísticas y sociales de la población'},
      {letter: 'C', text: 'Las disposiciones administrativas estandarizadas del gobierno'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Cuál es una consecuencia de la corrupción, la evasión fiscal y el despilfarro en la sociedad?',
    options: [
      {letter: 'A', text: 'Benefician a unos pocos en detrimento del bienestar general'},
      {letter: 'B', text: 'Generan mayor equidad en la distribución de la riqueza'},
      {letter: 'C', text: 'Incrementan la eficiencia en el uso de los recursos públicos'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: '¿Cuál fue el primer aporte de las Leyes de Reforma en México?',
    options: [
      {letter: 'A', text: 'Establecer la primera Constitución en la Federación'},
      {letter: 'B', text: 'Otorgar tierra al campesinado'},
      {letter: 'C', text: 'Impulsar la igualdad jurídica de todas y todos los mexicanos'},
    ],
    correctLetter: 'C',
  },
];

export const MODULE_TWO_EXAM_QUESTIONS: QuestionItem[] =
  MODULE_TWO_QUESTION_DEFINITIONS.map((question, index) => ({
    ...question,
    id: `q-etica-servicio-${index + 1}`,
    courseId: MODULE_TWO_EXAM_COURSE.id,
    moduleName: 'Módulo 2 · Ética, práctica y mística del servicio público',
    questionNumber: `Pregunta ${index + 1}`,
    statements: question.statements ?? [],
    createdAt: '2026-11-23T12:00:00.000Z',
    updatedAt: '2026-11-23T12:00:00.000Z',
  }));

const MODULE_THREE_QUESTION_DEFINITIONS: ExamQuestionDefinition[] = [
  {
    prompt:
      'El lema «Nunca más un Estado sin nosotras» implica una visión en la que la participación política y democrática de las mujeres no sea un privilegio sino un derecho…',
    options: [
      {letter: 'A', text: 'Aprobado.'},
      {letter: 'B', text: 'Adquirido.'},
      {letter: 'C', text: 'Garantizado.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'El Protocolo para casos de acoso y hostigamiento sexual establece acciones orientadas a:',
    statements: ['Prevención', 'Atención', 'Sanción', 'Mediación', 'Conciliación'],
    options: [
      {letter: 'A', text: '1, 2, 4'},
      {letter: 'B', text: '1, 2, 3'},
      {letter: 'C', text: '2, 4, 5'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      'La violencia contra las mujeres comprende actos u omisiones basados en el ______ que les causan algún tipo de ______.',
    options: [
      {letter: 'A', text: 'género – menoscabo.'},
      {letter: 'B', text: 'género – daño.'},
      {letter: 'C', text: 'sexo – daño.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      '¿Cómo se denomina la figura jurídica que permite a las parejas del mismo sexo conformar una familia mediante un procedimiento legal para incorporar hijas o hijos?',
    options: [
      {letter: 'A', text: 'Matrimonio igualitario.'},
      {letter: 'B', text: 'Identidad de género.'},
      {letter: 'C', text: 'Adopción igualitaria.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: '¿Qué principio humanista incorpora la Cuarta Transformación respecto de los derechos de las mujeres?',
    options: [
      {
        letter: 'A',
        text: 'Que los derechos de las mujeres dependen de acciones privadas y no de responsabilidades públicas centrales.',
      },
      {
        letter: 'B',
        text: 'Que la igualdad de género debe atenderse después de resolver la agenda económica y administrativa del Estado.',
      },
      {
        letter: 'C',
        text: 'Que la vida, la dignidad y los derechos de las mujeres son una responsabilidad pública central y no una agenda secundaria.',
      },
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'El reconocimiento de los derechos de las mujeres en la Constitución ha transitado de un modelo de igualdad ______ a uno de igualdad ______.',
    options: [
      {letter: 'A', text: 'sustantiva – formal.'},
      {letter: 'B', text: 'informal – formal.'},
      {letter: 'C', text: 'formal – sustantiva.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: '¿Qué caracteriza a los micromachismos?',
    options: [
      {letter: 'A', text: 'Son conductas normalizadas que reproducen la desigualdad entre mujeres y hombres.'},
      {letter: 'B', text: 'Son actos de violencia física disfrazada que ocasionan lesiones contra las mujeres.'},
      {letter: 'C', text: 'Son prácticas laborales normalizadas que establecen desigualdad salarial entre mujeres y hombres.'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: 'La violencia obstétrica puede manifestarse mediante:',
    statements: [
      'Falta de acceso a servicios de salud reproductiva',
      'Trato cruel, inhumano o degradante',
      'Abuso de medicalización',
      'Administrar medicamentos equivocados',
      'Abandonar a la paciente en su etapa de recuperación',
    ],
    options: [
      {letter: 'A', text: '1, 2, 4'},
      {letter: 'B', text: '2, 4, 5'},
      {letter: 'C', text: '1, 2, 3'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'Se considera violencia digital cuando una persona:',
    statements: [
      'Comparte imágenes íntimas sin consentimiento',
      'Difunde videos íntimos sin autorización',
      'Transmite audios de contenido íntimo sexual sin aprobación',
      'Roba información de la víctima por medios extraíbles',
      'Difunde material audiovisual mediante redes sociales',
    ],
    options: [
      {letter: 'A', text: '1, 2, 4'},
      {letter: 'B', text: '1, 2, 3'},
      {letter: 'C', text: '2, 4, 5'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      '¿Cómo se caracteriza el patriarcado neoliberal en relación con las mujeres precarizadas económica, laboral, política y socialmente?',
    options: [
      {
        letter: 'A',
        text: 'Combina la promesa de libertad individual con una profundización de las desigualdades estructurales.',
      },
      {
        letter: 'B',
        text: 'Refuerza la división sexual del trabajo mediante nuevas formas de organización económica.',
      },
      {
        letter: 'C',
        text: 'Articula discursos de autonomía con mecanismos que reproducen jerarquías laborales.',
      },
    ],
    correctLetter: 'A',
  },
  {
    prompt: 'Es fundamental que las instituciones adopten políticas de igualdad, porque:',
    options: [
      {letter: 'A', text: 'sustituyen la necesidad de establecer mecanismos normativos.'},
      {letter: 'B', text: 'incrementan la eficiencia y la eficacia en el servicio público.'},
      {letter: 'C', text: 'constituyen una condición para garantizar un servicio digno y justo.'},
    ],
    correctLetter: 'C',
  },
  {
    prompt: 'El acoso laboral se caracteriza por realizar actos que afectan la:',
    statements: [
      'Estabilidad psicológica',
      'Personalidad',
      'Economía familiar',
      'Integridad',
      'Productividad',
    ],
    options: [
      {letter: 'A', text: '2, 4, 5'},
      {letter: 'B', text: '1, 2, 4'},
      {letter: 'C', text: '1, 2, 3'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: 'Son algunos de los objetivos del Anexo 31 del PEF:',
    statements: [
      'Ampliar la cobertura de los servicios de cuidados',
      'Reducir las barreras de acceso a estos servicios',
      'Garantizar la pertinencia de los cuidados',
      'Erradicar prácticas de acoso laboral',
      'Garantizar espacios libres de discriminación y violencia',
    ],
    options: [
      {letter: 'A', text: '1, 2, 4'},
      {letter: 'B', text: '2, 4, 5'},
      {letter: 'C', text: '1, 2, 3'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una institución pública debe organizar servicios médicos para personas con distinta edad, identidad de género, condición económica y lugar de residencia. ¿Qué principio debe orientar esa atención?',
    options: [
      {letter: 'A', text: 'El acceso a la salud debe limitarse a servicios físicos y de urgencia hospitalaria.'},
      {letter: 'B', text: 'Todas las personas tienen derecho a recibir atención médica de calidad, integral y gratuita.'},
      {letter: 'C', text: 'Las personas deben recibir atención médica diferenciada según su capacidad de pago.'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: 'En el ejercicio de derechos y oportunidades, la discriminación se caracteriza por:',
    statements: ['Negarlos', 'Obstaculizarlos', 'Impedirlos', 'Regularlos', 'Gestionarlos'],
    options: [
      {letter: 'A', text: '2, 4, 5'},
      {letter: 'B', text: '1, 2, 3'},
      {letter: 'C', text: '1, 2, 4'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: '¿Qué demostró la participación de las mujeres en la Revolución Mexicana?',
    options: [
      {
        letter: 'A',
        text: 'Su capacidad para tomar decisiones, organizarse y liderar, rompiendo con la idea de que solo debían estar en el hogar.',
      },
      {
        letter: 'B',
        text: 'Su dependencia de las estructuras militares, sin incidencia en la vida pública ni comunitaria.',
      },
      {
        letter: 'C',
        text: 'Su incorporación exclusiva a tareas domésticas, reforzando la idea de que debían permanecer en el hogar.',
      },
    ],
    correctLetter: 'A',
  },
  {
    prompt:
      'La reforma «Paridad en todo» (2019) fortaleció la participación política de las mujeres al establecer la obligación de garantizar la paridad de género en:',
    options: [
      {letter: 'A', text: 'todos los órganos del poder público.'},
      {letter: 'B', text: 'los cargos de elección popular del Congreso.'},
      {letter: 'C', text: 'las plazas del Poder Ejecutivo Federal.'},
    ],
    correctLetter: 'A',
  },
  {
    prompt:
      'En lo que respecta a las mujeres y personas gestantes, la legislación reconoce el derecho a conservar el empleo y a contar con una licencia de maternidad de al menos ___ meses.',
    options: [
      {letter: 'A', text: '3'},
      {letter: 'B', text: '2'},
      {letter: 'C', text: '4'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: 'Son algunos de los propósitos de la Reforma de Igualdad Sustantiva (2024):',
    statements: [
      'El acceso a la justicia',
      'El trabajo digno',
      'El crecimiento económico',
      'La educación',
      'La participación política',
      'La simplificación administrativa',
    ],
    options: [
      {letter: 'A', text: '1, 2, 4, 5'},
      {letter: 'B', text: '2, 3, 5, 6'},
      {letter: 'C', text: '1, 3, 4, 5'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: 'Se considera abuso sexual cuando una persona:',
    statements: [
      'Realiza actos sexuales sin consentimiento',
      'Obliga a otra a observar un acto sexual',
      'Obliga a otra a exhibir su cuerpo',
      'Difunde información personal de la víctima',
      'Formula críticas sobre la vestimenta de la víctima',
    ],
    options: [
      {letter: 'A', text: '1, 2, 3'},
      {letter: 'B', text: '2, 4, 5'},
      {letter: 'C', text: '1, 2, 4'},
    ],
    correctLetter: 'A',
  },
];

export const MODULE_THREE_EXAM_QUESTIONS: QuestionItem[] =
  MODULE_THREE_QUESTION_DEFINITIONS.map((question, index) => ({
    ...question,
    id: `q-igualdad-sustantiva-${index + 1}`,
    courseId: MODULE_THREE_EXAM_COURSE.id,
    moduleName: 'Módulo 3 · Formación en igualdad sustantiva y derechos de las mujeres',
    questionNumber: `Pregunta ${index + 1}`,
    statements: question.statements ?? [],
    createdAt: '2026-11-23T12:00:00.000Z',
    updatedAt: '2026-11-23T12:00:00.000Z',
  }));

const MODULE_FOUR_QUESTION_DEFINITIONS: ExamQuestionDefinition[] = [
  {
    prompt:
      'Una empresa desarrolla una aplicación móvil para servicios financieros. Durante el registro, muestra un aviso breve con información general sobre el tratamiento de los datos personales y un enlace para consultar el aviso completo. Sin embargo, el enlace dirige a un documento extenso, con lenguaje altamente técnico y apartados difíciles de localizar. ¿Qué problema se presenta en la situación anterior?',
    options: [
      {letter: 'A', text: 'La licitud del tratamiento ya que no deben recopilarse datos por medios engañosos'},
      {letter: 'B', text: 'El uso de modalidades simplificadas debido a que no están permitidas en la iniciativa privada'},
      {letter: 'C', text: 'La información dirigida a las personas titulares no permite la comprensión efectiva'},
      {letter: 'D', text: 'Faltan datos de contacto para consultar dudas con el responsable del tratamiento'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Durante la atención de una solicitud ARCO, una persona servidora pública retrasa deliberadamente la respuesta y proporciona información incompleta con el objetivo de dificultar el ejercicio del derecho solicitado. ¿Cuál es la consecuencia de esta conducta?',
    options: [
      {letter: 'A', text: 'Vista inmediata al Órgano Interno de Control'},
      {letter: 'B', text: 'Inhabilitación por 30 días naturales'},
      {letter: 'C', text: 'Notificación al superior jerárquico para que amoneste'},
      {letter: 'D', text: 'Sancionar por negligencia o mala fe'},
    ],
    correctLetter: 'D',
  },
  {
    prompt:
      'Durante una llamada telefónica para contratar un servicio, una clienta escucha un mensaje automatizado indicando que el aviso de privacidad puede consultarse posteriormente en internet. Al concluir la contratación, la clienta manifiesta no haber tenido oportunidad real de conocer el uso de sus datos personales antes de proporcionar la información solicitada. ¿Cuál acción debió realizar la empresa para actuar adecuadamente?',
    options: [
      {letter: 'A', text: 'Solo brindar información sobre el servicio por teléfono'},
      {letter: 'B', text: 'Enviar el aviso de privacidad físico una vez que se contrata el servicio'},
      {letter: 'C', text: 'Permitir el acceso al aviso de privacidad antes o al momento del tratamiento'},
      {letter: 'D', text: 'Indicar durante la llamada que el plazo máximo para revisar el aviso es de 5 días'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una institución pública pone a disposición de las personas un aviso de privacidad claro, accesible y redactado en lenguaje sencillo, en el que explica quién tratará los datos personales, para qué serán utilizados y cómo pueden ejercerse los derechos correspondientes. ¿Qué principio refleja esta actuación?',
    options: [
      {letter: 'A', text: 'Información'},
      {letter: 'B', text: 'Finalidad'},
      {letter: 'C', text: 'Calidad'},
      {letter: 'D', text: 'Consentimiento'},
    ],
    correctLetter: 'A',
  },
  {
    prompt: '¿Cuál es el plazo definido en el sector público para responder una solicitud para ejercer los derechos ARCO?',
    options: [
      {letter: 'A', text: 'Un mes'},
      {letter: 'B', text: '20 días'},
      {letter: 'C', text: '10 días'},
      {letter: 'D', text: '15 días'},
    ],
    correctLetter: 'B',
  },
  {
    prompt: 'Capacitar al personal, implementar controles de acceso y documentar procedimientos internos son ejemplos de:',
    options: [
      {letter: 'A', text: 'buenas prácticas que provienen del sector privado'},
      {letter: 'B', text: 'principios de licitud y proporcionalidad'},
      {letter: 'C', text: 'obligaciones derivadas del tratamiento de datos personales'},
      {letter: 'D', text: 'derechos de las personas titulares'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una organización busca acreditar que determinados procesos internos cumplen estándares y buenas prácticas en materia de protección de datos personales. Este objetivo corresponde con el mecanismo de:',
    options: [
      {letter: 'A', text: 'sanción'},
      {letter: 'B', text: 'medida de apremio'},
      {letter: 'C', text: 'verificación'},
      {letter: 'D', text: 'certificación'},
    ],
    correctLetter: 'D',
  },
  {
    prompt:
      'Una institución pública solicita a la autoridad competente revisar de manera proactiva sus procedimientos internos relacionados con el tratamiento de datos personales para detectar áreas de mejora. La descripción anterior se refiere a:',
    options: [
      {letter: 'A', text: 'procedimiento de verificación'},
      {letter: 'B', text: 'recurso de revisión'},
      {letter: 'C', text: 'auditoría voluntaria'},
      {letter: 'D', text: 'procedimiento sancionador'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una institución pública solicita a las personas usuarias su nombre, CURP, correo electrónico y fotografía para integrar un expediente digital. Esta información corresponde con datos personales porque:',
    options: [
      {letter: 'A', text: 'toda la información digital es confidencial'},
      {letter: 'B', text: 'puede consultarse o transferirse sin tener mecanismos de control'},
      {letter: 'C', text: 'permite identificar o hacer identificable a una persona física'},
      {letter: 'D', text: 'pueden tener acceso a esta información muchas personas'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una empresa señala en su aviso de privacidad que los datos personales serán utilizados “para fines relacionados con el servicio”, sin especificar actividades concretas ni distinguir entre finalidades principales y secundarias. ¿Qué riesgo existe en esta práctica?',
    options: [
      {letter: 'A', text: 'La falta de claridad para las personas titulares sobre el uso específico de su información'},
      {letter: 'B', text: 'El tratamiento se convierta automáticamente en ilícito'},
      {letter: 'C', text: 'La desaparición de los derechos ARCO'},
      {letter: 'D', text: 'La falta de medidas de seguridad de carácter administrativo, físico y técnico'},
    ],
    correctLetter: 'A',
  },
  {
    prompt:
      'Una institución pública implementa controles de acceso y capacita a su personal para proteger expedientes con datos personales. ¿Qué busca con estas acciones?',
    options: [
      {letter: 'A', text: 'Reducir riesgos y proteger la información'},
      {letter: 'B', text: 'Incrementar la confianza ciudadana'},
      {letter: 'C', text: 'Reconocer algunos derechos del control de la información'},
      {letter: 'D', text: 'Consolidarse como órgano garante'},
    ],
    correctLetter: 'A',
  },
  {
    prompt:
      'Una persona solicita que una empresa deje de utilizar sus datos personales para enviar promociones comerciales, aunque desea conservar activa su cuenta y continuar utilizando el servicio contratado. ¿Qué derecho desea ejercer?',
    options: [
      {letter: 'A', text: 'Rectificación'},
      {letter: 'B', text: 'Acceso'},
      {letter: 'C', text: 'Cancelación'},
      {letter: 'D', text: 'Oposición'},
    ],
    correctLetter: 'D',
  },
  {
    prompt: '¿Cuál situación corresponde con un esquema preventivo?',
    options: [
      {letter: 'A', text: 'Establecer mecanismos de cero tolerancia al incumplimiento legal y tecnológico'},
      {letter: 'B', text: 'Especializar a todo el personal como auditores ante la imposición de multas por incumplimientos acreditados'},
      {letter: 'C', text: 'Revisar integralmente la normativa para evitar responsabilidades administrativas'},
      {letter: 'D', text: 'Revisar anticipadamente los riesgos antes de implementar nuevos tratamientos de datos personales'},
    ],
    correctLetter: 'D',
  },
  {
    prompt:
      'Una persona presenta una solicitud para ejercer sus derechos ARCO ante una institución pública. En el escrito señala que desea “corregir su información”, pero no indica qué dato está incorrecto ni adjunta documento que acredite la modificación solicitada. En este caso, la institución…',
    options: [
      {letter: 'A', text: 'debe desechar la solicitud por presentar inconsistencias'},
      {letter: 'B', text: 'debe revisar toda la información para corregir sus registros'},
      {letter: 'C', text: 'debe remitir el caso directamente a la autoridad garante'},
      {letter: 'D', text: 'puede prevenir a la persona para que complete la información faltante'},
    ],
    correctLetter: 'D',
  },
  {
    prompt: '¿Cuál es el objetivo de un procedimiento de verificación?',
    options: [
      {letter: 'A', text: 'Analizar los reportes recibidos y detectar deficiencias y ordenar ajustes inmediatos'},
      {letter: 'B', text: 'Revisar que las medidas administrativas y técnicas sean implementadas y actualizadas'},
      {letter: 'C', text: 'Analizar si el responsable cumple con las obligaciones previstas en la normativa aplicable'},
      {letter: 'D', text: 'Evaluar la eficacia y eficiencia del sistema de gestión de datos personales'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una persona pide a una empresa que le informe qué datos personales tiene registrados, para qué los utiliza y bajo qué condiciones los trata. No solicita modificar, eliminar ni limitar el uso de la información. ¿Qué derecho está ejerciendo?',
    options: [
      {letter: 'A', text: 'Cancelación'},
      {letter: 'B', text: 'Oposición'},
      {letter: 'C', text: 'Acceso'},
      {letter: 'D', text: 'Rectificación'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Durante una visita de verificación, una empresa se niega injustificadamente a permitir el acceso a documentación relacionada con el tratamiento de datos personales. La acción anterior se considera:',
    options: [
      {letter: 'A', text: 'un ejercicio válido del responsable con el deber de confidencialidad'},
      {letter: 'B', text: 'un acto de limitación de acceso'},
      {letter: 'C', text: 'obstrucción de actos de verificación de la autoridad'},
      {letter: 'D', text: 'un derecho de oposición institucional'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'La Secretaría Anticorrupción y Buen Gobierno impone una multa económica derivada de un procedimiento sancionador en el sector privado. ¿Quién debe ejecutar el cobro?',
    options: [
      {letter: 'A', text: 'La Unidad de Transparencia correspondiente'},
      {letter: 'B', text: 'El Servicio de Administración Tributaria'},
      {letter: 'C', text: 'El Ministerio Público'},
      {letter: 'D', text: 'El Órgano Interno de Control'},
    ],
    correctLetter: 'B',
  },
  {
    prompt:
      'Durante una investigación previa se detectan elementos suficientes que podrían acreditar violaciones a la normativa aplicable en materia de protección de datos personales. En este caso lo recomendable es:',
    options: [
      {letter: 'A', text: 'determinar las medidas de apremio a imponerse'},
      {letter: 'B', text: 'comenzar un recurso de revisión'},
      {letter: 'C', text: 'iniciar un procedimiento de verificación'},
      {letter: 'D', text: 'determinar la resolución'},
    ],
    correctLetter: 'C',
  },
  {
    prompt:
      'Una persona presenta una denuncia ante la Secretaría Anticorrupción y Buen Gobierno porque considera que una empresa privada utilizó indebidamente sus datos personales para fines comerciales. Sin embargo, del análisis inicial se advierte que los hechos denunciados realmente corresponden a una institución pública estatal. ¿Qué paso deben realizarse en este caso?',
    options: [
      {letter: 'A', text: 'La Secretaría debe instruir a la institución pública estatal para dar continuidad'},
      {letter: 'B', text: 'Responder por la vía formal a la persona denunciante la improcedencia'},
      {letter: 'C', text: 'Dar cumplimiento a la demanda sin importar quien sea la instancia responsable'},
      {letter: 'D', text: 'Desechar la denuncia y orientar a la autoridad competente'},
    ],
    correctLetter: 'D',
  },
];

export const MODULE_FOUR_EXAM_QUESTIONS: QuestionItem[] =
  MODULE_FOUR_QUESTION_DEFINITIONS.map((question, index) => ({
    ...question,
    id: `q-proteccion-datos-${index + 1}`,
    courseId: MODULE_FOUR_EXAM_COURSE.id,
    moduleName: 'Módulo 4 · Protección de datos personales',
    questionNumber: `Pregunta ${index + 1}`,
    statements: question.statements ?? [],
    createdAt: '2026-11-23T12:00:00.000Z',
    updatedAt: '2026-11-23T12:00:00.000Z',
  }));

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: 'q-factores-pobreza-mujeres',
    courseId: 'course-igualdad-genero',
    moduleName: 'Módulo 1 · Autonomía Económica',
    questionNumber: 'Pregunta 1',
    prompt: 'Los 3 factores que contribuyen a que las mujeres sean más pobres son:',
    statements: [
      'La falta de acceso a Internet',
      'La dedicación a actividades domésticas',
      'La falta de acceso a servicios financieros',
      'El cuidado de personas sin remuneración',
      'La limitación para tener un empleo de tiempo completo por responsabilidades familiares',
    ],
    options: [
      {letter: 'A', text: '1, 3, 4'},
      {letter: 'B', text: '2, 3, 4'},
      {letter: 'C', text: '2, 4, 5'},
    ],
    correctLetter: 'C',
    explanation:
      'La dedicación a actividades domésticas (2), el cuidado de personas sin remuneración (4) y la limitación para acceder a empleos de tiempo completo por responsabilidades familiares (5) concentran la carga de trabajo no remunerado y reducen los ingresos propios.',
    createdAt: '2026-11-20T09:15:00.000Z',
    updatedAt: '2026-11-20T09:15:00.000Z',
  },
  {
    id: 'q-corresponsabilidad-cuidados',
    courseId: 'course-igualdad-genero',
    moduleName: 'Módulo 2 · Corresponsabilidad',
    questionNumber: 'Pregunta 2',
    prompt:
      '¿Qué acciones fortalecen la corresponsabilidad social y familiar en las labores de cuidado?',
    statements: [
      'Licencias parentales equitativas para madres y padres',
      'Asignar el trabajo doméstico exclusivamente a un integrante del hogar',
      'Servicios públicos accesibles de cuidado infantil y para personas mayores',
      'Horarios laborales flexibles que permitan conciliar la vida personal y profesional',
    ],
    options: [
      {letter: 'A', text: '1, 2, 3'},
      {letter: 'B', text: '1, 3, 4'},
      {letter: 'C', text: '2, 3, 4'},
      {letter: 'D', text: '1, 2, 4'},
    ],
    correctLetter: 'B',
    explanation:
      'Las licencias equitativas (1), los servicios públicos de cuidado (3) y la flexibilidad laboral (4) redistribuyen el cuidado entre familias, Estado y empresas.',
    createdAt: '2026-11-20T09:25:00.000Z',
    updatedAt: '2026-11-20T09:25:00.000Z',
  },
  {
    id: 'q-seguridad-digital-phishing',
    courseId: 'course-competencias-digitales',
    moduleName: 'Unidad 1 · Seguridad de la Información',
    questionNumber: 'Pregunta 1',
    prompt:
      'Al recibir un correo electrónico que solicita verificar urgentemente una contraseña bancaria mediante un enlace externo, ¿cuál es la práctica segura recomendada?',
    statements: [],
    options: [
      {
        letter: 'A',
        text: 'Ingresar al enlace desde el correo para comprobar si la cuenta fue bloqueada.',
      },
      {
        letter: 'B',
        text: 'Reenviar el correo a otros contactos para preguntar si recibieron el mismo aviso.',
      },
      {
        letter: 'C',
        text: 'No hacer clic en el enlace y acceder directamente escribiendo la dirección oficial en el navegador.',
      },
      {
        letter: 'D',
        text: 'Responder el mensaje solicitando confirmación del remitente.',
      },
    ],
    correctLetter: 'C',
    explanation:
      'Nunca se debe acceder a enlaces sospechosos desde mensajes no solicitados; la verificación debe realizarse directamente en el sitio oficial.',
    createdAt: '2026-11-21T11:00:00.000Z',
    updatedAt: '2026-11-21T11:00:00.000Z',
  },
  ...MODULE_ONE_EXAM_QUESTIONS,
  ...MODULE_TWO_EXAM_QUESTIONS,
  ...MODULE_THREE_EXAM_QUESTIONS,
  ...MODULE_FOUR_EXAM_QUESTIONS,
];
