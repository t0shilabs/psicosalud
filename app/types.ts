export type ServiceType = 
  | 'terapia-individual'
  | 'terapia-pareja'
  | 'terapia-infantil'
  | 'ansiedad-depresion'
  | 'orientacion-vocacional'
  | 'evaluacion-psicologica';

export interface Service {
  id: ServiceType;
  title: string;
  shortDescription: string;
  durationMinutes: number;
  basePrice: number;
  iconName: string;
  targetAudience: string;
}

export interface Psychologist {
  id: string;
  name: string;
  email: string;
  phone: string;
  titles: string[]; // e.g. ["Lic. en Psicología Clínica - UNMSM", "Máster en Terapia Cognitivo Conductual - Univ. de Barcelona"]
  colegiatura: string; // e.g. "C.Ps.P. 24890"
  specialties: string[];
  approach: string; // e.g. "Cognitivo-Conductual y Mindfulness"
  experienceYears: number;
  bio: string;
  avatarUrl: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  availableDays: number[]; // 1 = Lunes, 2 = Martes, ..., 6 = Sábado
  workingHours: {
    start: number; // e.g. 9
    end: number;   // e.g. 19
  };
  unavailableSlots?: { date: string; hour: number }[]; // specific booked slots
}

export type SectionType = 
  | 'home' 
  | 'booking' 
  | 'about' 
  | 'psychologists' 
  | 'blog' 
  | 'contact' 
  | 'admin'
  | 'portal';

export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  birthDate?: string;
  emergencyContact?: string;
  registeredAt: string;
  password?: string;
  notes?: string;
  status?: 'activo' | 'inactivo';
}

export interface Appointment {
  id: string;
  code: string; // e.g. "CITA-8492"
  psychologistId: string;
  psychologistName: string;
  psychologistTitle: string;
  psychologistAvatar: string;
  serviceId: ServiceType;
  serviceTitle: string;
  date: string; // YYYY-MM-DD
  hour: number; // 9, 10, etc.
  modality: 'online' | 'presencial';
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason?: string;
  status: 'confirmada' | 'pendiente' | 'completada' | 'cancelada';
  totalPrice: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Bienestar' | 'Ansiedad' | 'Relaciones' | 'Autoestima' | 'Crianza' | 'Salud Mental';
  authorId: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  age: number;
  psychologistName: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
