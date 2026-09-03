import { Psychologist, Service, BlogPost, Testimonial, Patient, Appointment } from '@/app/types';

export const CLINIC_INFO = {
  name: 'PsicoSalud',
  tagline: 'Clínica Virtual y Presencial de Psicología & Bienestar Emocional',
  phone: '+51 (01) 480-9230',
  whatsapp: '+51 987 654 321',
  email: 'contacto@psicosalud-clinica.com',
  address: 'Av. Javier Prado Este 2450, Piso 8, San Isidro, Lima - Perú',
  emergencyHotline: 'Línea de Apoyo Emocional 24/7: 113 opción 5 (Gratuita)',
  openingHours: 'Lunes a Sábado: 8:00 AM - 9:00 PM | Domingo: 9:00 AM - 2:00 PM (Solo Online)',
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'terapia-individual',
    title: 'Terapia Psicológica Individual',
    shortDescription: 'Espacio confidencial para trabajar autoconocimiento, gestión de emociones, ansiedad, autoestima y crecimiento personal.',
    durationMinutes: 50,
    basePrice: 120,
    iconName: 'User',
    targetAudience: 'Adultos y jóvenes desde los 18 años',
  },
  {
    id: 'ansiedad-depresion',
    title: 'Tratamiento de Ansiedad y Depresión',
    shortDescription: 'Abordaje clínico especializado basado en evidencia para superar episodios de pánico, tristeza persistente y rumiación.',
    durationMinutes: 50,
    basePrice: 130,
    iconName: 'HeartPulse',
    targetAudience: 'Personas con síntomas de ansiedad, fobias o desánimo',
  },
  {
    id: 'terapia-pareja',
    title: 'Terapia de Pareja y Vínculos',
    shortDescription: 'Orientación para restaurar la comunicación asertiva, resolver conflictos reiterativos y fortalecer la confianza mutua.',
    durationMinutes: 75,
    basePrice: 160,
    iconName: 'Users',
    targetAudience: 'Parejas en cualquier etapa de convivencia o matrimonio',
  },
  {
    id: 'terapia-infantil',
    title: 'Psicología Infantil y Adolescentes',
    shortDescription: 'Apoyo terapéutico lúdico y conductual para dificultades emocionales, conducta escolar, duelo y cambios familiares.',
    durationMinutes: 45,
    basePrice: 110,
    iconName: 'Sparkles',
    targetAudience: 'Niños de 4 a 12 años y adolescentes',
  },
  {
    id: 'orientacion-vocacional',
    title: 'Orientación Vocacional y Profesional',
    shortDescription: 'Batería psicométrica y entrevistas reflexivas para descubrir talentos, intereses y proyectar una carrera con propósito.',
    durationMinutes: 60,
    basePrice: 100,
    iconName: 'Compass',
    targetAudience: 'Estudiantes escolares, universitarios y personas en transición de carrera',
  },
  {
    id: 'evaluacion-psicologica',
    title: 'Evaluación Psicológica y Diagnóstica',
    shortDescription: 'Aplicación de pruebas estandarizadas con informe formal para fines médicos, académicos o personales.',
    durationMinutes: 60,
    basePrice: 180,
    iconName: 'FileText',
    targetAudience: 'Pacientes que requieren informe clínico o psicodiagnóstico',
  },
];

export const INITIAL_PSYCHOLOGISTS: Psychologist[] = [
  {
    id: 'psy-1',
    name: 'Dra. Mariana Valdivia Ramos',
    email: 'mvaldivia@psicosalud-clinica.com',
    phone: '+51 981 123 456',
    titles: [
      'Licenciada en Psicología Clínica - Univ. Nacional Mayor de San Marcos',
      'Magíster en Terapia Cognitivo-Conductual - Univ. de Barcelona (España)',
      'Especialista en Trastornos del Estado de Ánimo y Mindfulness',
    ],
    colegiatura: 'C.Ps.P. 18942',
    specialties: ['Ansiedad y Pánico', 'Depresión', 'Mindfulness', 'Autoestima'],
    approach: 'Terapia Cognitivo-Conductual (TCC) de Tercera Generación y Terapia de Aceptación y Compromiso (ACT)',
    experienceYears: 12,
    bio: 'Psicóloga clínica con más de una década acompañando a personas en la comprensión y regulación de sus emociones. Mi enfoque combina la calidez humana con herramientas científicas validadas para generar cambios sostenibles.',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813576-0046b4129b00?auto=format&fit=crop&w=600&q=80',
    consultationFee: 130,
    rating: 4.9,
    reviewCount: 148,
    availableDays: [1, 2, 3, 4, 5], // Lun - Vie
    workingHours: { start: 8, end: 18 },
    unavailableSlots: [
      { date: '2026-09-03', hour: 9 },
      { date: '2026-09-03', hour: 11 },
      { date: '2026-09-03', hour: 16 },
      { date: '2026-09-04', hour: 10 },
      { date: '2026-09-04', hour: 15 },
    ],
  },
  {
    id: 'psy-2',
    name: 'Mg. Carlos Mendoza Thorne',
    email: 'cmendoza@psicosalud-clinica.com',
    phone: '+51 982 234 567',
    titles: [
      'Licenciado en Psicología - Pontificia Universidad Católica del Perú',
      'Máster en Terapia Familiar Sistémica - Instituto Tavistock (Londres)',
      'Diplomado en Intervención en Crisis y Duelo Complejo',
    ],
    colegiatura: 'C.Ps.P. 14205',
    specialties: ['Terapia de Pareja', 'Conflictos Familiares', 'Duelo y Pérdida', 'Comunicación Asertiva'],
    approach: 'Enfoque Sistémico y Terapia Focalizada en las Emociones (TFE)',
    experienceYears: 15,
    bio: 'Especialista en dinámicas de pareja y sistemas familiares. Trabajo desde un espacio de respeto absoluto, facilitando que las relaciones se reconstruyan sobre bases de seguridad emocional y entendimiento mutuo.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    consultationFee: 150,
    rating: 4.8,
    reviewCount: 112,
    availableDays: [1, 2, 4, 5, 6],
    workingHours: { start: 10, end: 20 },
    unavailableSlots: [
      { date: '2026-09-03', hour: 10 },
      { date: '2026-09-03', hour: 17 },
      { date: '2026-09-04', hour: 11 },
      { date: '2026-09-05', hour: 10 },
    ],
  },
  {
    id: 'psy-3',
    name: 'Lic. Sofia Alarcón Fuentes',
    email: 'salarcon@psicosalud-clinica.com',
    phone: '+51 983 345 678',
    titles: [
      'Licenciada en Psicología Infantil y Educativa - Univ. de Lima',
      'Posgrado en Terapia del Juego y Neurodesarrollo - Univ. Complutense de Madrid',
      'Certificada en Abordaje de TDAH y Dificultades de Aprendizaje',
    ],
    colegiatura: 'C.Ps.P. 22310',
    specialties: ['Psicología Infantil', 'Adolescentes', 'Pautas de Crianza', 'TDAH y Concentración'],
    approach: 'Terapia del Juego, Psicología Positiva y Orientación a Familias',
    experienceYears: 8,
    bio: 'Dedicada al bienestar emocional de niños y adolescentes. A través del juego estructurado y la escucha activa, ayudo a que los más jóvenes reconozcan sus fortalezas y a sus padres a ejercer una crianza consciente.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    consultationFee: 115,
    rating: 4.95,
    reviewCount: 94,
    availableDays: [1, 2, 3, 5, 6],
    workingHours: { start: 9, end: 17 },
    unavailableSlots: [
      { date: '2026-09-03', hour: 14 },
      { date: '2026-09-03', hour: 15 },
      { date: '2026-09-04', hour: 9 },
    ],
  },
  {
    id: 'psy-4',
    name: 'Dr. Alejandro Benítez Castro',
    email: 'abenitez@psicosalud-clinica.com',
    phone: '+51 984 456 789',
    titles: [
      'Doctor en Neurociencias y Conducta - Univ. de Salamanca',
      'Licenciado en Psicología con Mención Clínica - UPCH',
      'Investigador y Docente Universitario en Psicopatología',
    ],
    colegiatura: 'C.Ps.P. 11048',
    specialties: ['Evaluación Neuropsicológica', 'Estrés Laboral y Burnout', 'Trastornos Obsesivos (TOC)', 'Trauma Complejo'],
    approach: 'Neuropsicología Clínica y EMDR (Desensibilización y Reprocesamiento)',
    experienceYears: 18,
    bio: 'Investigador y terapeuta apasionado por la neurobiología del trauma y el estrés crónico. Ofrezco diagnósticos clínicos de alta precisión y protocolos de tratamiento basados en la plasticidad cerebral.',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    consultationFee: 160,
    rating: 4.9,
    reviewCount: 160,
    availableDays: [2, 3, 4, 5],
    workingHours: { start: 11, end: 19 },
    unavailableSlots: [
      { date: '2026-09-03', hour: 12 },
      { date: '2026-09-04', hour: 16 },
    ],
  },
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    fullName: 'Camila Rojas Benavides',
    email: 'camila.rojas@gmail.com',
    phone: '+51 991 223 344',
    dni: '74829103',
    birthDate: '1995-04-12',
    emergencyContact: 'Raúl Rojas (Padre) - 991 887 766',
    registeredAt: '2026-08-15',
  },
  {
    id: 'pat-2',
    fullName: 'David Pacheco Morales',
    email: 'david.pacheco@outlook.com',
    phone: '+51 988 554 433',
    dni: '45612389',
    birthDate: '1988-11-20',
    emergencyContact: 'Lucía Morales (Esposa) - 988 112 233',
    registeredAt: '2026-08-28',
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    code: 'CITA-4921',
    psychologistId: 'psy-1',
    psychologistName: 'Dra. Mariana Valdivia Ramos',
    psychologistTitle: 'Licenciada en Psicología Clínica, Magíster en TCC',
    psychologistAvatar: 'https://images.unsplash.com/photo-1594824813576-0046b4129b00?auto=format&fit=crop&w=600&q=80',
    serviceId: 'ansiedad-depresion',
    serviceTitle: 'Tratamiento de Ansiedad y Depresión',
    date: '2026-09-04',
    hour: 9,
    modality: 'online',
    patientId: 'pat-1',
    patientName: 'Camila Rojas Benavides',
    patientEmail: 'camila.rojas@gmail.com',
    patientPhone: '+51 991 223 344',
    reason: 'Sesión de seguimiento para manejo de crisis de ansiedad y rumiación.',
    status: 'confirmada',
    totalPrice: 130,
    createdAt: '2026-08-30T10:15:00Z',
  },
  {
    id: 'app-2',
    code: 'CITA-5810',
    psychologistId: 'psy-2',
    psychologistName: 'Mg. Carlos Mendoza Thorne',
    psychologistTitle: 'Máster en Terapia Familiar Sistémica',
    psychologistAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    serviceId: 'terapia-pareja',
    serviceTitle: 'Terapia de Pareja y Vínculos',
    date: '2026-09-05',
    hour: 11,
    modality: 'presencial',
    patientId: 'pat-2',
    patientName: 'David Pacheco Morales',
    patientEmail: 'david.pacheco@outlook.com',
    patientPhone: '+51 988 554 433',
    reason: 'Consulta inicial de pareja para acuerdos de convivencia y límites afectivos.',
    status: 'confirmada',
    totalPrice: 160,
    createdAt: '2026-09-01T14:20:00Z',
  },
  {
    id: 'app-3',
    code: 'CITA-2319',
    psychologistId: 'psy-1',
    psychologistName: 'Dra. Mariana Valdivia Ramos',
    psychologistTitle: 'Licenciada en Psicología Clínica, Magíster en TCC',
    psychologistAvatar: 'https://images.unsplash.com/photo-1594824813576-0046b4129b00?auto=format&fit=crop&w=600&q=80',
    serviceId: 'terapia-individual',
    serviceTitle: 'Terapia Psicológica Individual',
    date: '2026-08-20',
    hour: 10,
    modality: 'online',
    patientId: 'pat-1',
    patientName: 'Camila Rojas Benavides',
    patientEmail: 'camila.rojas@gmail.com',
    patientPhone: '+51 991 223 344',
    reason: 'Primera sesión diagnóstica y establecimiento de objetivos terapéuticos.',
    status: 'completada',
    totalPrice: 130,
    createdAt: '2026-08-15T09:00:00Z',
  },
  {
    id: 'app-4',
    code: 'CITA-7412',
    psychologistId: 'psy-3',
    psychologistName: 'Lic. Sofía Alarcón Bellido',
    psychologistTitle: 'Especialista en Psicoterapia Infanto-Juvenil',
    psychologistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    serviceId: 'terapia-infantil',
    serviceTitle: 'Psicoterapia Infantil y Adolescentes',
    date: '2026-09-08',
    hour: 15,
    modality: 'presencial',
    patientId: 'pat-1',
    patientName: 'Camila Rojas Benavides',
    patientEmail: 'camila.rojas@gmail.com',
    patientPhone: '+51 991 223 344',
    reason: 'Evaluación de habilidades sociales y concentración escolar.',
    status: 'confirmada',
    totalPrice: 120,
    createdAt: '2026-09-02T11:00:00Z',
  },
  {
    id: 'app-5',
    code: 'CITA-9102',
    psychologistId: 'psy-2',
    psychologistName: 'Mg. Carlos Mendoza Thorne',
    psychologistTitle: 'Máster en Terapia Familiar Sistémica',
    psychologistAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    serviceId: 'terapia-individual',
    serviceTitle: 'Terapia Psicológica Individual',
    date: '2026-08-25',
    hour: 16,
    modality: 'presencial',
    patientId: 'pat-2',
    patientName: 'David Pacheco Morales',
    patientEmail: 'david.pacheco@outlook.com',
    patientPhone: '+51 988 554 433',
    reason: 'Manejo de estrés laboral y sobrecarga ejecutiva.',
    status: 'completada',
    totalPrice: 150,
    createdAt: '2026-08-20T17:00:00Z',
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 estrategias psicológicas comprobadas para regular la ansiedad cotidiana',
    slug: 'estrategias-regular-ansiedad-cotidiana',
    excerpt: 'Aprende a diferenciar el estrés adaptativo de la ansiedad patológica y descubre técnicas respiratorias y cognitivas para recuperar la calma.',
    content: `La ansiedad no es un enemigo que debamos eliminar, sino un sistema de alarma que en ocasiones se descalibra. Cuando percibimos amenazas en situaciones cotidianas que en realidad no atentan contra nuestra integridad, nuestro cuerpo reacciona como si estuviéramos frente a un peligro inminente.

### 1. La técnica de respiración diafragmática 4-7-8
Al inhalar en 4 segundos, retener 7 segundos y exhalar suavemente durante 8 segundos por la boca, enviamos una señal directa al nervio vago para activar el sistema nervioso parasimpático, reduciendo el pulso cardíaco en menos de tres minutos.

### 2. El anclaje sensorial 5-4-3-2-1
En momentos de desbordamiento, nombra en voz alta:
- 5 cosas que puedes ver a tu alrededor
- 4 cosas que puedes tocar físicamente
- 3 sonidos que escuchas en la distancia
- 2 olores que puedes distinguir
- 1 sabor presente en tu boca

### 3. Cuestionar el pensamiento catastrófico
Pregúntate con amabilidad: "¿Qué evidencia real y objetiva tengo de que esto sucederá? ¿Qué es lo peor que podría pasar y cómo lo resolvería? ¿Qué le diría a mi mejor amigo en este instante?"

Recuerda que buscar acompañamiento profesional no es signo de debilidad, sino un acto de valentía y autocuidado.`,
    category: 'Ansiedad',
    authorId: 'psy-1',
    authorName: 'Dra. Mariana Valdivia Ramos',
    authorTitle: 'Especialista en TCC y Trastornos de Ansiedad',
    authorAvatar: 'https://images.unsplash.com/photo-1594824813576-0046b4129b00?auto=format&fit=crop&w=600&q=80',
    date: '28 de Agosto, 2026',
    readTime: '5 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    tags: ['Ansiedad', 'Mindfulness', 'Salud Emocional'],
  },
  {
    id: 'blog-2',
    title: 'Cómo cultivar una comunicación asertiva en la pareja sin llegar al conflicto',
    slug: 'comunicacion-asertiva-pareja',
    excerpt: 'Aprende a expresar tus necesidades emocionales desde la primera persona y transformar reclamos en acuerdos constructivos.',
    content: `Uno de los motivos de consulta más frecuentes en terapia de pareja no es la falta de amor, sino el desgaste en los canales de comunicación. Cuando la queja se convierte en crítica personal, la otra parte se coloca inmediatamente a la defensiva.

### El poder de la 'Comunicación en Primera Persona'
En lugar de decir: *"Tú nunca tienes tiempo para mí y siempre te olvidas de lo que te pido"*, prueba estructurar tu sentir así:
*"Me siento triste y distante cuando pasamos varios días sin conversar tranquilamente. Me gustaría mucho que reservemos 30 minutos esta noche para ponernos al día."*

### Escucha activa sin réplica inmediata
Escuchar no es esperar nuestro turno para defendernos. Implica validar la experiencia emocional de nuestra pareja antes de ofrecer soluciones o justificaciones. Validar no significa estar 100% de acuerdo con su postura, sino reconocer que su sentimiento es legítimo.`,
    category: 'Relaciones',
    authorId: 'psy-2',
    authorName: 'Mg. Carlos Mendoza Thorne',
    authorTitle: 'Máster en Terapia Familiar Sistémica',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    date: '22 de Agosto, 2026',
    readTime: '6 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    tags: ['Pareja', 'Comunicación', 'Relaciones Sanas'],
  },
  {
    id: 'blog-3',
    title: 'El impacto del Burnout laboral y claves para proteger tu salud mental',
    slug: 'impacto-burnout-laboral-salud-mental',
    excerpt: 'Señales físicas y psicológicas del agotamiento profesional y herramientas prácticas para fijar límites claros en el trabajo.',
    content: `La Organización Mundial de la Salud reconoció el Síndrome de Burnout como una afección ocupacional caracterizada por agotamiento físico, despersonalización o cinismo hacia las tareas laborales y baja autoeficacia.

### Síntomas que no debes ignorar
- Despertar con sensación de agotamiento a pesar de haber dormido 8 horas.
- Irritabilidad constante ante correos o solicitudes de rutina.
- Dolores de cabeza tensionales y malestares digestivos recurrentes.
- Sensación de que tus esfuerzos nunca son suficientes.

### Establecer micro-límites cotidianos
1. Desactiva notificaciones laborales de correo y mensajería fuera de tu jornada estipulada.
2. Realiza pausas de recuperación cognitiva cada 90 minutos de trabajo continuo.
3. Recuerda que tu valor personal no se reduce a tu productividad diaria.`,
    category: 'Salud Mental',
    authorId: 'psy-4',
    authorName: 'Dr. Alejandro Benítez Castro',
    authorTitle: 'Doctor en Neurociencias y Conducta',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    date: '15 de Agosto, 2026',
    readTime: '4 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    tags: ['Burnout', 'Estrés', 'Bienestar'],
  },
  {
    id: 'blog-4',
    title: 'Crianza respetuosa: Límites con empatía para niños y adolescentes',
    slug: 'crianza-respetuosa-limites-empatia',
    excerpt: 'Descubre cómo establecer normas claras en el hogar sin recurrir a gritos ni castigos, reforzando la autorregulación.',
    content: `La crianza respetuosa a menudo se confunde erróneamente con la permisividad. Educar con respeto implica comprender el cerebro en desarrollo del niño sin dejar de lado la firmeza afectuosa.

Los límites son necesarios: le brindan al niño un mapa predecible del mundo que reduce su angustia. Sin embargo, un límite expresado con calma tiene un impacto neurológico mucho más constructivo que un grito.

### Conectar antes de corregir
Cuando un niño experimenta una rabieta, su corteza prefrontal (encargada del razonamiento) queda desconectada por el sistema límbico. En ese instante, razonar no funciona; se necesita presencia física, tono de voz pausado y contención hasta que el sistema vuelva a la calma.`,
    category: 'Crianza',
    authorId: 'psy-3',
    authorName: 'Lic. Sofia Alarcón Fuentes',
    authorTitle: 'Especialista en Psicología Infantil',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    date: '08 de Agosto, 2026',
    readTime: '5 min de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tags: ['Crianza', 'Infancia', 'Familia'],
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Patricia G.',
    age: 34,
    psychologistName: 'Dra. Mariana Valdivia',
    service: 'Tratamiento de Ansiedad',
    rating: 5,
    comment: 'Llegué a PsicoSalud con ataques de pánico recurrentes que me impedían salir con tranquilidad. La empatía de Mariana y las técnicas prácticas que me enseñó transformaron por completo mi calidad de vida. Hoy me siento en control y con paz.',
    date: 'Agosto 2026',
    verified: true,
  },
  {
    id: 'test-2',
    clientName: 'Fernando & Andrea',
    age: 41,
    psychologistName: 'Mg. Carlos Mendoza',
    service: 'Terapia de Pareja',
    rating: 5,
    comment: 'Estábamos en una crisis muy profunda donde cualquier conversación terminaba en reproche. Carlos nos brindó un espacio seguro y neutral para volver a escucharnos de verdad. Fue la mejor decisión de nuestro matrimonio.',
    date: 'Julio 2026',
    verified: true,
  },
  {
    id: 'test-3',
    clientName: 'Rodrigo M.',
    age: 28,
    psychologistName: 'Dr. Alejandro Benítez',
    service: 'Terapia Individual',
    rating: 5,
    comment: 'Tenía un agotamiento laboral extremo y síndrome del impostor. Trabajar con Alejandro me permitió comprender mis patrones de sobreexigencia y aprender a poner límites firmes en el trabajo sin sentir culpa.',
    date: 'Agosto 2026',
    verified: true,
  },
  {
    id: 'test-4',
    clientName: 'Lorena H. (Mamá de Mateo, 8 años)',
    age: 37,
    psychologistName: 'Lic. Sofia Alarcón',
    service: 'Psicología Infantil',
    rating: 5,
    comment: 'Sofía tuvo una conexión mágica con mi hijo desde el primer día. Las pautas que nos dio a nosotros como padres fueron oro puro para manejar sus miedos nocturnos.',
    date: 'Junio 2026',
    verified: true,
  },
];
