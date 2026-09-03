import React, { createContext, useContext, useState, useEffect } from 'react';
import { Psychologist, Patient, Appointment, BlogPost, Service, SectionType } from '@/app/types';
import { 
  INITIAL_PSYCHOLOGISTS, 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_SERVICES 
} from '@/app/data/initialData';

export type { SectionType };

interface ClinicContextType {
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  psychologists: Psychologist[];
  addPsychologist: (colleague: Omit<Psychologist, 'id' | 'rating' | 'reviewCount'>) => Psychologist;
  updatePsychologist: (id: string, updated: Partial<Psychologist>) => void;
  deletePsychologist: (id: string) => void;
  services: Service[];
  patients: Patient[];
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  currentPsychologist: Psychologist | null;
  setCurrentPsychologist: (psy: Psychologist | null) => void;
  registerPatient: (patientData: Omit<Patient, 'id' | 'registeredAt'>) => Patient;
  createPatient: (patientData: Omit<Patient, 'id' | 'registeredAt'>) => Patient;
  updatePatient: (id: string, updated: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  loginPatient: (emailOrDni: string, password?: string) => Patient | null;
  logoutPatient: () => void;
  loginPsychologist: (emailOrColegiatura: string, password?: string) => Psychologist | null;
  logoutPsychologist: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
  appointments: Appointment[];
  createAppointment: (appointmentData: Omit<Appointment, 'id' | 'code' | 'createdAt' | 'status'>) => Appointment;
  cancelAppointment: (appointmentId: string) => void;
  updateAppointmentStatus: (appointmentId: string, status: 'confirmada' | 'pendiente' | 'completada' | 'cancelada') => void;
  blogPosts: BlogPost[];
  selectedPsychologistForBooking: Psychologist | null;
  setSelectedPsychologistForBooking: (psychologist: Psychologist | null) => void;
  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (post: BlogPost | null) => void;
  isColleagueModalOpen: boolean;
  setIsColleagueModalOpen: (open: boolean) => void;
  isPatientModalOpen: boolean;
  setIsPatientModalOpen: (open: boolean) => void;
  isAppointmentsModalOpen: boolean;
  setIsAppointmentsModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [selectedPsychologistForBooking, setSelectedPsychologistForBooking] = useState<Psychologist | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const [isColleagueModalOpen, setIsColleagueModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAppointmentsModalOpen, setIsAppointmentsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('psicosalud_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Psychologists
  const [psychologists, setPsychologists] = useState<Psychologist[]>(() => {
    try {
      const saved = localStorage.getItem('psicosalud_psychologists');
      return saved ? JSON.parse(saved) : INITIAL_PSYCHOLOGISTS;
    } catch {
      return INITIAL_PSYCHOLOGISTS;
    }
  });

  // Current logged in psychologist
  const [currentPsychologist, setCurrentPsychologist] = useState<Psychologist | null>(() => {
    try {
      const saved = localStorage.getItem('psicosalud_current_psychologist');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Patients (All registered users)
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem('psicosalud_patients');
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  // Current logged in patient (Default to null if no user is saved so login appears when booking)
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(() => {
    try {
      const saved = localStorage.getItem('psicosalud_current_patient');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('psicosalud_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Page Posts
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [services] = useState<Service[]>(INITIAL_SERVICES);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('psicosalud_psychologists', JSON.stringify(psychologists));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [psychologists]);

  useEffect(() => {
    try {
      if (currentPsychologist) {
        localStorage.setItem('psicosalud_current_psychologist', JSON.stringify(currentPsychologist));
      } else {
        localStorage.removeItem('psicosalud_current_psychologist');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentPsychologist]);

  useEffect(() => {
    try {
      localStorage.setItem('psicosalud_patients', JSON.stringify(patients));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [patients]);

  useEffect(() => {
    try {
      if (currentPatient) {
        localStorage.setItem('psicosalud_current_patient', JSON.stringify(currentPatient));
      } else {
        localStorage.removeItem('psicosalud_current_patient');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentPatient]);

  useEffect(() => {
    try {
      localStorage.setItem('psicosalud_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [appointments]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const addPsychologist = (colleague: Omit<Psychologist, 'id' | 'rating' | 'reviewCount'>): Psychologist => {
    const newId = `psy-${Date.now()}`;
    const newPsychologist: Psychologist = {
      ...colleague,
      id: newId,
      rating: 5.0,
      reviewCount: 1,
      unavailableSlots: colleague.unavailableSlots || [],
    };
    setPsychologists((prev) => [newPsychologist, ...prev]);
    showToast(`Colega ${newPsychologist.name} registrado con éxito en el directorio.`);
    return newPsychologist;
  };

  const updatePsychologist = (id: string, updated: Partial<Psychologist>) => {
    setPsychologists((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    if (currentPsychologist && currentPsychologist.id === id) {
      setCurrentPsychologist((prev) => (prev ? { ...prev, ...updated } : null));
    }
    showToast('Datos del profesional actualizados correctamente.');
  };

  const deletePsychologist = (id: string) => {
    setPsychologists((prev) => prev.filter((item) => item.id !== id));
    if (currentPsychologist && currentPsychologist.id === id) {
      setCurrentPsychologist(null);
    }
    showToast('Colega retirado del directorio.');
  };

  const registerPatient = (patientData: Omit<Patient, 'id' | 'registeredAt'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Date.now()}`,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'activo',
    };
    setPatients((prev) => [newPatient, ...prev]);
    setCurrentPatient(newPatient);
    showToast(`Bienvenido/a ${newPatient.fullName}. Registro completado.`);
    return newPatient;
  };

  const createPatient = (patientData: Omit<Patient, 'id' | 'registeredAt'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Date.now()}`,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'activo',
    };
    setPatients((prev) => [newPatient, ...prev]);
    showToast(`Usuario ${newPatient.fullName} creado con éxito.`);
    return newPatient;
  };

  const updatePatient = (id: string, updated: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    if (currentPatient && currentPatient.id === id) {
      setCurrentPatient((prev) => (prev ? { ...prev, ...updated } : null));
    }
    showToast('Usuario actualizado correctamente.');
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((item) => item.id !== id));
    if (currentPatient && currentPatient.id === id) {
      setCurrentPatient(null);
    }
    showToast('Usuario eliminado del sistema.');
  };

  const loginPatient = (emailOrDni: string, _password?: string): Patient | null => {
    const clean = emailOrDni.trim().toLowerCase();
    const found = patients.find(
      (p) => p.email.toLowerCase() === clean || p.dni.trim() === clean
    );
    if (found) {
      setCurrentPatient(found);
      setCurrentPsychologist(null); // Switch to patient
      showToast(`¡Hola de nuevo, ${found.fullName.split(' ')[0]}! Has iniciado sesión.`);
      return found;
    }
    return null;
  };

  const logoutPatient = () => {
    setCurrentPatient(null);
    try {
      localStorage.removeItem('psicosalud_current_patient');
    } catch {}
    showToast('Has cerrado sesión de paciente.');
  };

  const loginPsychologist = (emailOrColegiatura: string, _password?: string): Psychologist | null => {
    const clean = emailOrColegiatura.trim().toLowerCase().replace(/\s+/g, '');
    const found = psychologists.find((p) => {
      const emailClean = p.email.toLowerCase().replace(/\s+/g, '');
      const colClean = p.colegiatura.toLowerCase().replace(/\s+/g, '');
      const nameClean = p.name.toLowerCase();
      return emailClean === clean || colClean.includes(clean) || clean.includes(colClean) || nameClean.includes(clean);
    });

    if (found) {
      setCurrentPsychologist(found);
      setCurrentPatient(null); // Switch to psychologist
      showToast(`¡Bienvenido/a colega ${found.name}! Portal profesional habilitado.`);
      return found;
    }
    return null;
  };

  const logoutPsychologist = () => {
    setCurrentPsychologist(null);
    try {
      localStorage.removeItem('psicosalud_current_psychologist');
    } catch {}
    showToast('Has cerrado sesión como colega psicólogo.');
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    const u = username.trim().toLowerCase();
    const p = pass.trim();
    // Accept admin@psicosalud.pe or admin with password admin123 or admin
    if ((u === 'admin@psicosalud.pe' || u === 'admin') && (p === 'admin123' || p === 'admin')) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('psicosalud_admin_auth', 'true');
      } catch {}
      showToast('Sesión de Administrador iniciada correctamente.');
      return true;
    }
    showToast('Credenciales de Administrador incorrectas.');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('psicosalud_admin_auth');
    } catch {}
    showToast('Sesión de Administrador cerrada.');
  };

  const createAppointment = (
    data: Omit<Appointment, 'id' | 'code' | 'createdAt' | 'status'>
  ): Appointment => {
    const randomCode = `CITA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      ...data,
      id: `app-${Date.now()}`,
      code: randomCode,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    };

    // Add to appointments
    setAppointments((prev) => [newAppointment, ...prev]);

    // Also mark this slot as unavailable for the psychologist
    setPsychologists((prev) =>
      prev.map((psy) => {
        if (psy.id === data.psychologistId) {
          const currentSlots = psy.unavailableSlots || [];
          return {
            ...psy,
            unavailableSlots: [...currentSlots, { date: data.date, hour: data.hour }],
          };
        }
        return psy;
      })
    );

    showToast(`¡Cita ${randomCode} confirmada exitosamente con ${data.psychologistName}!`);
    return newAppointment;
  };

  const cancelAppointment = (appointmentId: string) => {
    const target = appointments.find((a) => a.id === appointmentId);
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: 'cancelada' } : app
      )
    );

    // Free up psychologist slot if was reserved
    if (target) {
      setPsychologists((prev) =>
        prev.map((psy) => {
          if (psy.id === target.psychologistId && psy.unavailableSlots) {
            return {
              ...psy,
              unavailableSlots: psy.unavailableSlots.filter(
                (s) => !(s.date === target.date && s.hour === target.hour)
              ),
            };
          }
          return psy;
        })
      );
    }

    showToast('La cita ha sido cancelada exitosamente.');
  };

  const updateAppointmentStatus = (
    appointmentId: string, 
    status: 'confirmada' | 'pendiente' | 'completada' | 'cancelada'
  ) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === appointmentId ? { ...app, status } : app))
    );
    showToast(`Estado de la cita actualizado a: ${status}.`);
  };

  return (
    <ClinicContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        psychologists,
        addPsychologist,
        updatePsychologist,
        deletePsychologist,
        services,
        patients,
        currentPatient,
        setCurrentPatient,
        currentPsychologist,
        setCurrentPsychologist,
        registerPatient,
        createPatient,
        updatePatient,
        deletePatient,
        loginPatient,
        logoutPatient,
        loginPsychologist,
        logoutPsychologist,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        appointments,
        createAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        blogPosts,
        selectedPsychologistForBooking,
        setSelectedPsychologistForBooking,
        selectedBlogPost,
        setSelectedBlogPost,
        isColleagueModalOpen,
        setIsColleagueModalOpen,
        isPatientModalOpen,
        setIsPatientModalOpen,
        isAppointmentsModalOpen,
        setIsAppointmentsModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
