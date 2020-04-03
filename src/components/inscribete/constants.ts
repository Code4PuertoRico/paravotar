import EighteenPlus from "../../assets/icons/eighteen-plus.svg"
import BornInTerritory from "../../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../../assets/icons/born-in-other-countries.svg"
import AbsenteeVoterIcon from "../../assets/icons/absentee-voter.svg"
import EarlyVoterIcon from "../../assets/icons/early-voter.svg"
import { Voter, SpecialVoter, AbsenteeAndEarlyVoting } from "./types"

export const VoterDocs: Voter[] = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Puerto Rico",
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Dirección física",
      "Número de teléfono",
      "Número de Seguro Social",
      "Estatura",
    ],
    recommendedDocsText:
      "Recomendamos que lleves uno o más de los siguientes documentos:",
    recommendedDocs: [
      "Licencia de conducir o identificación con foto expedida por Gobierno Estatal, Municipal o Federal.",
      "Certificado de Nacimiento original. Puede ser necesario en el caso de que la CEE no encuentre tu información en el sistema del Registro Demográfico.",
    ],
    requiredDocsText: "Documentos requeridos:",
    requiredDocs: ["Ninguno"],
    optionalDocs: [
      "Factura con la dirección del lugar en donde vives. Esto puede ser necesario en el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
    srText: "personas nacidas en Puerto Rico",
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description: "Estados Unidos, Continentales, Territorios o Posesiones",
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Dirección física",
      "Número de teléfono",
      "Estatura",
    ],
    recommendedDocs: [
      "Licencia de conducir o identificación con foto expedida por Gobierno Estatal, Municipal o Federal.",
    ],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: [
      "Pasaporte de Estados Unidos de América vigente",
      "Certificado de Nacimiento original",
    ],
    optionalDocs: [
      "Factura con la dirección del lugar en donde vives. Esto puede ser necesario en el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
    srText:
      "personas nacidas en Estados Unidos, incluyendo cualquiera de sus territorios continentales o posesiones.",
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Un país extranjero y resido en Puerto Rico",
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Dirección física",
      "Número de teléfono",
      "Estatura",
    ],
    recommendedDocs: [
      "Licencia de conducir o identificación con foto expedida por Gobierno Estatal, Municipal o Federal.",
    ],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: [
      "Pasaporte de Estados Unidos de América vigente",
      "Certificado de Naturalización",
      "Certificación del Departamento de Estado con acreditación",
    ],
    optionalDocs: [
      "Factura con la dirección del lugar en donde vives. Esto puede ser necesario en el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
    srText:
      "personas nacidas en un país extranjero y que residen en Puerto Rico.",
  },
]

const AbsenteeVoterReasons: AbsenteeAndEarlyVoting[] = [
  {
    summary: "Personal activo en las Fuerzas Armadas",
    details:
      "Personas destacadas en servicio activo en las Fuerzas Armadas, en la Guardia Costanera, en el Servicio de Salud Pública, la Administración Nacional Oceánica y Atmosférica de los Estados Unidos de América, o en la Guardia Nacional de Puerto Rico.",
  },
  {
    summary: "Personas cursando estudios",
    details:
      "Personas cursando estudios en alguna institución de enseñanza debidamente acreditada por autoridad competente del sitio donde ubica la institución.",
  },
  {
    summary: "Empleados del Programa de Empleos Agrícolas",
    details:
      "Personas trabajando en el Programa de Empleos Agrícolas mediante contrato tramitado por el Departamento del Trabajo y Recursos Humanos de Puerto Rico.",
  },
  {
    summary: "Empleados del servicio diplomático",
    details:
      "Personas destacadas en el servicio diplomático o de ayuda exterior del Gobierno de los Estados Unidos de América o en un programa de intercambio de personal entre el Gobierno de Puerto Rico y un gobierno extranjero.",
  },
  // Los cónyuges, hijas e hijos o parientes dependientes del elector que se encuentren en cualquiera de los cuatro (4) grupos anteriores y que formen parte de su grupo familiar inmediato bajo el mismo techo con el elector siempre que reúnan los requisitos para ser elector de acuerdo con lo dispuesto en esta Ley.

  {
    summary: "Tripulantes de líneas aéreas comerciales y marinos mercantes",
    details:
      "Tripulantes de líneas aéreas comerciales y los marinos mercantes así como todo tripulante de transporte aéreo o marítimo privado cuyas tareas asignadas le obligan a estar ausente de Puerto Rico en la fecha de las elecciones.",
  },
  {
    summary: "Confinados en instituciones penales",
    details:
      "Confinados en instituciones penales en los Estados Unidos de América que fueron sentenciados en los tribunales de Puerto Rico o en el Tribunal de Distrito de los Estados Unidos para el Distrito de Puerto Rico y que estuvieran domiciliados en Puerto Rico al momento de ser sentenciados.",
  },
  {
    summary: "Empleado o funcionario del Gobierno de Puerto Rico",
    details:
      "Cualquier empleado o funcionario del Gobierno de Puerto Rico, sus ramas, subdivisiones, dependencias y gobiernos municipales que se encuentre en esa fecha fuera de Puerto Rico en funciones oficiales.",
  },
  {
    summary:
      "Atletas y personal técnico que estén laborando o entrenando fuera de Puerto Rico",
    details:
      "Atletas y personal técnico de apoyo participando en competencias deportivas (o atletas de alto rendimiento que se encuentren en programas de entrenamiento fuera de Puerto Rico el día de una elección) representando a Puerto Rico el día de una elección y certificados por el Comité Olímpico de Puerto Rico o alguna de sus federaciones.",
  },
  {
    summary:
      "Personas que se encuentren fuera de la isla por razones de estudio o trabajo",
    details:
      "Profesionales y su núcleo familiar que reside en Puerto Rico pero que por razón de trabajo o estudio tengan que estar destacados en el exterior temporeramente por un término no mayor de once (11) meses.",
  },
  {
    summary: "Personas proveyendo servicios fuera de la isla",
    details:
      "Cualquier otra persona domiciliada en Puerto Rico cuyo patrono le requiera realizar servicios o trabajos lícitos de cualquier tipo fuera de la Isla por cualquier período que incluya la fecha de las elecciones y a quien el patrono no provea licencia compensada para regresar a Puerto Rico para ejercer el voto.",
  },
  {
    summary: "Personas que estén bajo tratamiento médico fuera de la isla.",
    details:
      "Cualquier persona que para la fecha de una elección general este recibiendo un tratamiento médico fuera de Puerto Rico por causa de una enfermedad catastrófica, y que así se acredite mediante declaración jurada y la certificación de la institución médica que va a administrar el tratamiento. También podrá solicitarlo cualquier familiar o persona que esté haciendo compañía de la persona que recibe el tratamiento.",
  },
]

const EarlyVoterReasons: AbsenteeAndEarlyVoting[] = [
  {
    summary: "Integrantes de la Policía de Puerto Rico",
    details:
      "los integrantes de la Policía de Puerto Rico, hasta un máximo de dos mil quinientos (2,500) electores; de los Cuerpos de Policía Municipal, del Cuerpo de Oficiales de Custodia de la Administración de Corrección, del Cuerpo de Oficiales de Servicios Juveniles de la Administración de Instituciones Juveniles y del Cuerpo de Bomberos de Puerto Rico que estarán de turno en servicio activo durante las horas de votación del día de una elección y que no se encuentren disfrutando de alguna licencia concedida por la agencia concernida",
  },
  {
    summary:
      "Personas bajo la custodia de la Administración de Instituciones Juveniles",
    details:
      "personas que al día de la elección hayan cumplido dieciocho (18) años, que estén bajo la custodia de la Administración de Instituciones Juveniles",
  },
  {
    summary: "Comisionados(as) Electorales",
    details:
      "los miembros de la Comisión, el Secretario, los Vicepresidentes y los Subsecretarios; los comisionados alternos; los miembros de las comisiones locales de elecciones, sus alternos y los miembros de las juntas de inscripción permanente, así como los empleados de la Comisión asignados a funciones indispensables el día de las elecciones, asesores legales de los Comisionados y los empleados de la Comisión asignados a las Oficinas de Los (las) Comisionados (as) Electorales. En el caso de una elección especial o primaria también podrán votar por adelantado las personas que designe la Comisión para realizar funciones indispensables el día de la elección; los Presidentes de las Comisiones Locales podrán emitir su voto por correo o en persona según se disponga por la Comisión",
  },
  {
    summary:
      "Empleados de empresas privadas contratadas por la Comisión y empleados de agencias de gobierno",
    details:
      "empleados de empresas privadas contratadas por la Comisión y empleados de agencias de gobierno requeridos para proveer servicios técnicos y de apoyo el día de una elección",
  },
  {
    summary: "Profesionales y empleados de la salud",
    details:
      "profesionales y empleados de la salud que el día de una elección ofrecerán servicios indispensables durante el horario de votación y que acrediten tal situación",
  },
  {
    summary: "Periodistas y foto-periodistas",
    details:
      "periodistas y foto-periodistas acreditados por el Departamento de Estado que estén asignados a trabajar el día de una elección para un medio de comunicación y que acrediten tal situación",
  },
  {
    summary: "Personas recluidas en una institución hospitalaria",
    details:
      "personas que se encuentren recluidas en una institución hospitalaria o de tratamiento o cuidado de salud a largo plazo debidamente autorizada y que se certifique que continuarán internadas el día de una elección",
  },
  {
    summary: "Jueces y juezas",
    details:
      "los jueces y juezas del Tribunal de Primera Instancia y del Tribunal de Apelaciones que sean designados por el Tribunal Supremo, de conformidad con las reglas de administración que adopte a esos fines, para atender los casos electorales que estén laborando el día de la elección.",
  },
  {
    summary: "Candidatos a ocupar cargos electivos",
    details:
      "los candidatos a ocupar cargos electivos en la elección que se esté llevando a cabo podrán de forma voluntaria votar de forma adelantada.",
  },
  {
    summary: "Personas con impedimentos de movilidad",
    details:
      "las personas con impedimentos de movilidad (encamados) que cualifiquen como electores de Fácil Acceso en el Domicilio. La Comisión Local será responsable de verificar, evaluar y aprobar la solicitud, conforme al Reglamento aplicable. Los miembros de las Juntas de Inscripción Permanente deberán grabar la solicitud como una transacción de fácil acceso. La Junta Administrativa del Voto Ausente (JAVA) será responsable de trabajar la votación como voto adelantado y la adjudicación de estos votos.",
  },
]

export const AbsenteeVoter: SpecialVoter = {
  icon: AbsenteeVoterIcon,
  summary:
    "Votantes ausentes son residentes de Puerto Rico que aparezcan como votantes activos en el registro de la CEE, pero que por alguna razón certificada no estarán en Puerto Rico el día de la elección.",
  documents: [
    "http://ww2.ceepur.org/es-pr/EducacionyAdiestramiento/Documentos%20de%20JAVA/Solicitud%20Voto%20Ausente.pdf",
  ],
  deadline: "4 de septiembre de 2020",
  reasons: AbsenteeVoterReasons,
}

export const EarlyVoter: SpecialVoter = {
  icon: EarlyVoterIcon,
  summary:
    "Votantes ADELANTADOS son una discreción especial para residentes de Puerto Rico que aparezcan como votantes activos en el registro de la CEE, pero que aunque estarán en PR el día de las elecciones, por alguna razón certificada necesitan votar por adelantado.",
  documents: [
    "http://ww2.ceepur.org/es-pr/EducacionyAdiestramiento/Documentos%20de%20JAVA/Solicitud%20de%20Voto%20Adelantado.pdf",
    "http://ww2.ceepur.org/es-pr/EducacionyAdiestramiento/Documentos%20de%20JAVA/ Solicitud%20para%20Voto%20en%20el%20Domicilio.pdf",
    "http://ww2.ceepur.org/es-pr/EducacionyAdiestramiento/Documentos%20de%20JAVA/ Solicitud%20para%20Voto%20por%20Tel%C3%A9fono.pdf",
  ],
  deadline: "19 de noviembre de 2020",
  reasons: EarlyVoterReasons,
}
