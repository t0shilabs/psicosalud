import React, { useState, useMemo, useEffect } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { Psychologist, ServiceType } from '@/app/types';
import { BookingCalendar } from './BookingCalendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Award, 
  ShieldCheck, 
  Video, 
  MapPin, 
  DollarSign, 
  ChevronRight, 
  Search, 
  Star, 
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  IdCard,
  Check,
  Lock,
  LogIn,
  UserPlus,
  ArrowRight
} from 'lucide-react';

export const BookingView: React.FC = () => {
  const {
    psychologists,
    services,
    patients,
    appointments,
    currentPatient,
    selectedPsychologistForBooking,
    setSelectedPsychologistForBooking,
    createAppointment,
    loginPatient,
    registerPatient,
    logoutPatient,
    setIsAppointmentsModalOpen,
  } = useClinic();

  // Login Gate State (when not logged in)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regDni, setRegDni] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Selected state
  const [selectedPsy, setSelectedPsy] = useState<Psychologist>(() => {
    return selectedPsychologistForBooking || psychologists[0];
  });

  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>('terapia-individual');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-03');
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [modality, setModality] = useState<'online' | 'presencial'>('online');
  const [reason, setReason] = useState('');

  // Patient inputs (prefilled if currentPatient exists)
  const [patientName, setPatientName] = useState(currentPatient?.fullName || '');
  const [patientEmail, setPatientEmail] = useState(currentPatient?.email || '');
  const [patientPhone, setPatientPhone] = useState(currentPatient?.phone || '');
  const [patientDni, setPatientDni] = useState(currentPatient?.dni || '');

  // Search filter for psychologists
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('Todos');

  // Booking confirmation step
  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    date: string;
    hour: number;
    psychologist: Psychologist;
    serviceTitle: string;
    totalPrice: number;
    modality: 'online' | 'presencial';
    patientName: string;
  } | null>(null);

  // Synchronize when selectedPsychologistForBooking changes
  React.useEffect(() => {
    if (selectedPsychologistForBooking) {
      setSelectedPsy(selectedPsychologistForBooking);
    }
  }, [selectedPsychologistForBooking]);

  // Synchronize patient details
  React.useEffect(() => {
    if (currentPatient) {
      setPatientName(currentPatient.fullName);
      setPatientEmail(currentPatient.email);
      setPatientPhone(currentPatient.phone);
      setPatientDni(currentPatient.dni);
    }
  }, [currentPatient]);

  // Ensure selectedDate is valid and available for selectedPsy
  useEffect(() => {
    if (!selectedPsy) return;
    const parts = selectedDate.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dateObj = new Date(y, m, d);
    const dayOfWeek = dateObj.getDay();
    const availableDays = selectedPsy.availableDays || [1, 2, 3, 4, 5, 6];

    // If current selectedDate is past or psychologist doesn't attend this day
    if (!availableDays.includes(dayOfWeek) || selectedDate < '2026-09-03') {
      const base = new Date(2026, 8, 3);
      for (let i = 0; i < 35; i++) {
        const testD = new Date(base);
        testD.setDate(base.getDate() + i);
        if (availableDays.includes(testD.getDay())) {
          const iso = `${testD.getFullYear()}-${String(testD.getMonth() + 1).padStart(2, '0')}-${String(testD.getDate()).padStart(2, '0')}`;
          setSelectedDate(iso);
          setSelectedHour(null);
          break;
        }
      }
    }
  }, [selectedPsy, selectedDate]);

  // Filtered psychologists
  const filteredPsychologists = useMemo(() => {
    return psychologists.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.titles.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialty = specialtyFilter === 'Todos' || p.specialties.includes(specialtyFilter);
      return matchesSearch && matchesSpecialty;
    });
  }, [psychologists, searchQuery, specialtyFilter]);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const totalPrice = selectedPsy ? selectedPsy.consultationFee : selectedService.basePrice;

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHour) return;

    if (!patientName.trim() || !patientEmail.trim()) {
      alert('Por favor completa el nombre y correo electrónico del paciente.');
      return;
    }

    const appt = createAppointment({
      psychologistId: selectedPsy.id,
      psychologistName: selectedPsy.name,
      psychologistTitle: selectedPsy.titles[0] || 'Psicólogo Clínico',
      psychologistAvatar: selectedPsy.avatarUrl,
      serviceId: selectedServiceId,
      serviceTitle: selectedService.title,
      date: selectedDate,
      hour: selectedHour,
      modality,
      patientId: currentPatient?.id || `pat-guest-${Date.now()}`,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim() || '+51 900 000 000',
      reason: reason.trim() || 'Consulta psicológica general',
      totalPrice,
    });

    setConfirmedBooking({
      code: appt.code,
      date: selectedDate,
      hour: selectedHour,
      psychologist: selectedPsy,
      serviceTitle: selectedService.title,
      totalPrice,
      modality,
      patientName: patientName.trim(),
    });
  };

  const handleResetForNew = () => {
    setConfirmedBooking(null);
    setSelectedHour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUCCESS CONFIRMATION VOUCHER
  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ¡Cita Confirmada con Éxito!
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Comprobante de Reserva Psicológica
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hemos enviado los detalles y el enlace seguro de acceso a <strong>{patientEmail}</strong>.
            </p>
          </div>

          {/* Ticket Body */}
          <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-2xl p-6 border border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Código de Cita</span>
                <span className="text-2xl font-black font-mono text-teal-800 tracking-wider">
                  {confirmedBooking.code}
                </span>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-xs text-slate-400 block font-medium">Inversión</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  S/. {confirmedBooking.totalPrice}
                </span>
              </div>
            </div>

            {/* Psychologist info */}
            <div className="flex items-center gap-4">
              <img
                src={confirmedBooking.psychologist.avatarUrl}
                alt={confirmedBooking.psychologist.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{confirmedBooking.psychologist.name}</h4>
                <p className="text-xs text-teal-700 font-semibold">{confirmedBooking.psychologist.titles[0]}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Colegiatura: {confirmedBooking.psychologist.colegiatura}</p>
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-1">Servicio:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.serviceTitle}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-1">Fecha y Hora:</span>
                <span className="font-bold text-slate-800">
                  {confirmedBooking.date} a las {String(confirmedBooking.hour).padStart(2, '0')}:00 hrs
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-1">Modalidad:</span>
                <span className="font-bold text-teal-700">
                  {confirmedBooking.modality === 'online' ? 'Videollamada Encriptada' : 'Presencial (San Isidro)'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-teal-900 text-white rounded-xl text-xs space-y-1">
              <p className="font-bold">Indicaciones previas a tu sesión:</p>
              <p className="text-teal-200">
                {confirmedBooking.modality === 'online'
                  ? 'Recibirás el enlace de Google Meet / Zoom clínico 30 minutos antes. Conéctate desde un espacio privado y con buena conexión.'
                  : 'Te esperamos en nuestra sede de Av. Javier Prado Este 2450, Piso 8, San Isidro. Se recomienda llegar 10 minutos antes.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={() => setIsAppointmentsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Ver en Mis Citas
            </button>

            <button
              onClick={handleResetForNew}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-md transition-colors"
            >
              Agendar Otra Cita
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBookingLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginIdentifier.trim()) {
      setAuthError('Por favor ingresa tu correo electrónico o número de DNI.');
      return;
    }
    const pat = loginPatient(loginIdentifier.trim(), loginPassword);
    if (!pat) {
      setAuthError('No encontramos una cuenta con ese correo o DNI. Verifica los datos o regístrate como nuevo paciente.');
    }
  };

  const handleQuickDemoLogin = (email: string) => {
    setAuthError('');
    loginPatient(email, '');
  };

  const handleBookingRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!regFullName.trim() || !regDni.trim() || !regEmail.trim() || !regPhone.trim()) {
      setAuthError('Por favor completa todos los campos obligatorios (*).');
      return;
    }
    const pat = registerPatient({
      fullName: regFullName.trim(),
      dni: regDni.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      password: regPassword || 'paciente123',
    });
    if (!pat) {
      setAuthError('Ya existe una cuenta registrada con este correo o DNI. Intenta iniciar sesión.');
    }
  };

  // If user is not logged in, display the Login / Register screen for booking
  if (!currentPatient) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {/* Header Notice */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Identificación Requerida
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Inicia Sesión para Agendar tu Cita
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Para garantizar la confidencialidad de tus consultas y registrar tu cita médica, ingresa con tu cuenta de paciente o regístrate en segundos.
            </p>
          </div>

          {/* Toggle Tab Buttons */}
          <div className="flex items-center justify-center pt-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5 text-teal-600" />
                  Iniciar Sesión
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-teal-600" />
                  Soy Nuevo Paciente
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authMode === 'login' ? (
            <form onSubmit={handleBookingLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo Electrónico o DNI del Paciente *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="ej. camila.rojas@gmail.com o 74829103"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Contraseña
                  </label>
                  <span className="text-[11px] text-slate-400">
                    (paciente123 para cuentas de prueba)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Acceder y Continuar con la Cita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Login shortcuts */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block mb-2">
                  O accede rápidamente con un paciente de demostración registrado:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {patients.slice(0, 2).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleQuickDemoLogin(p.email)}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 text-left transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {p.fullName.charAt(0)}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-800 block truncate">
                          {p.fullName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          DNI: {p.dni}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleBookingRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombres y Apellidos Completos *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="ej. Lucía Fernández Salazar"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DNI o Documento de Identidad *
                  </label>
                  <div className="relative">
                    <IdCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      maxLength={8}
                      placeholder="8 dígitos"
                      value={regDni}
                      onChange={(e) => setRegDni(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="tu.correo@ejemplo.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+51 987 654 321"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crear una Contraseña (opcional para demo)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="Al menos 6 caracteres"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 text-[11px] text-teal-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p>
                  Tus datos están protegidos bajo la Ley N° 29733 de Protección de Datos Personales y el secreto profesional del Colegio de Psicólogos del Perú.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Registrarme y Proceder a la Agenda</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* High Density Accent Banner */}
      <div className="bg-teal-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden flex items-center justify-between shadow-xs">
        <div className="relative z-10 sm:w-2/3 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-800 text-[10px] font-bold text-teal-200 uppercase tracking-wider">
            <span>Agenda Clínica en Línea</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Tu bienestar mental es nuestra prioridad.</h1>
          <p className="text-teal-100 text-xs sm:text-sm">Reserva sesiones con expertos colegiados desde la comodidad de tu hogar o consultorio presencial.</p>
        </div>
        <div className="hidden sm:flex absolute right-0 top-0 h-full w-1/3 bg-teal-800 items-center justify-center rotate-12 translate-x-4 opacity-40 text-6xl font-serif italic pointer-events-none select-none">
          &ldquo;
        </div>
      </div>

      {/* Patient Verification Bar */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            {currentPatient.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{currentPatient.fullName}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Sesión de Paciente Activa
              </span>
            </div>
            <p className="text-slate-500 text-[11px] mt-0.5">
              DNI: <span className="font-mono font-medium text-slate-700">{currentPatient.dni}</span> • Correo: <span className="font-medium text-slate-700">{currentPatient.email}</span> • Tel: <span className="font-medium text-slate-700">{currentPatient.phone}</span>
            </p>
          </div>
        </div>
        <button
          onClick={logoutPatient}
          className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 hover:text-rose-600 hover:border-rose-300 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
        >
          Cerrar Sesión / Cambiar Paciente
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: SELECTION FLOW */}
        <div className="lg:col-span-8 space-y-5">
          {/* PASO 1: SELECCIONAR PROFESIONAL */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Selecciona a tu Profesional</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Elige al psicólogo/a especialista según tu motivo de consulta
                </p>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar especialista..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Specialty Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['Todos', 'Ansiedad y Pánico', 'Terapia de Pareja', 'Psicología Infantil', 'Autoestima'].map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSpecialtyFilter(spec)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap text-xs transition-all ${
                    specialtyFilter === spec
                      ? 'bg-teal-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Psychologists horizontal / grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredPsychologists.map((psy) => {
                const isSelected = selectedPsy?.id === psy.id;
                return (
                  <div
                    key={psy.id}
                    id={`psychologist-card-${psy.id}`}
                    onClick={() => {
                      setSelectedPsy(psy);
                      setSelectedHour(null); // Reset hour when specialist changes
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/40 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={psy.avatarUrl}
                        alt={psy.name}
                        className="w-12 h-12 rounded-lg object-cover object-top border border-slate-200"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white text-amber-500 rounded-full p-0.5 shadow-xs flex items-center">
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>

                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{psy.name}</h4>
                        <span className="text-xs font-bold text-teal-800 shrink-0">
                          S/. {psy.consultationFee}
                        </span>
                      </div>

                      <p className="text-[11px] text-teal-700 font-semibold line-clamp-1">
                        {psy.titles[0]}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-medium">
                          {psy.colegiatura}
                        </span>
                        <span>{psy.experienceYears} años exp.</span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-teal-600 text-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PASO 2: SELECCIONAR SERVICIO Y MODALIDAD */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3.5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span>Selecciona el Servicio y Modalidad</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Define la duración y el formato de tu sesión
              </p>
            </div>

            {/* Modality toggle */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Modalidad de Consulta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModality('online')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    modality === 'online'
                      ? 'border-teal-600 bg-teal-50/60 text-teal-900 ring-1 ring-teal-500'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-teal-600" />
                  <div className="text-left">
                    <p className="font-bold text-xs">Teleconsulta Online</p>
                    <p className="text-[10px] text-slate-500">Videollamada encriptada y cómoda</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('presencial')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    modality === 'presencial'
                      ? 'border-teal-600 bg-teal-50/60 text-teal-900 ring-1 ring-teal-500'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <div className="text-left">
                    <p className="font-bold text-xs">Presencial en Consultorio</p>
                    <p className="text-[10px] text-slate-500">Sede San Isidro, Lima</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tipo de Terapia
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/70 font-semibold ring-1 ring-teal-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{srv.title}</p>
                        <p className="text-[10px] text-slate-500">{srv.durationMinutes} minutos</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-teal-800">S/. {srv.basePrice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PASO 3: CALENDARIO INTERACTIVO Y HORARIOS DISPONIBLES */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>Selección de Fecha y Horario</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Especialista seleccionado: <span className="font-semibold text-slate-800">{selectedPsy.name}</span> &bull; {selectedPsy.titles[0]}
                </p>
              </div>
            </div>

            <BookingCalendar
              selectedPsychologist={selectedPsy}
              selectedDate={selectedDate}
              onSelectDate={(newDate) => {
                setSelectedDate(newDate);
                setSelectedHour(null);
              }}
              selectedHour={selectedHour}
              onSelectHour={(newHour) => setSelectedHour(newHour)}
              appointments={appointments}
            />
          </div>

          {/* PASO 4: DATOS DEL PACIENTE */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <span>Datos de Registro del Paciente</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Información para tu historia clínica y confirmación de la cita
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                  {currentPatient ? 'Paciente Verificado' : 'Datos de Contacto'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Nombres y Apellidos Completos *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Camila Sofía Rojas Benavides"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="paciente@correo.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+51 991 223 344"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Documento de Identidad (DNI/CE)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <IdCard className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      placeholder="74829103"
                      value={patientDni}
                      onChange={(e) => setPatientDni(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Motivo Breve de Consulta (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Manejo del estrés laboral, ansiedad..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED PSYCHOLOGIST PROFILE & SUMMARY CARD */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          {/* Selected Psychologist Full Profile Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3.5">
            <div className="text-center pb-3 border-b border-slate-100">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <img
                  src={selectedPsy.avatarUrl}
                  alt={selectedPsy.name}
                  className="w-full h-full rounded-xl object-cover object-top border-2 border-teal-600 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-white">
                  Activo
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{selectedPsy.name}</h3>
              <p className="text-xs font-semibold text-teal-700 mt-0.5">{selectedPsy.titles[0]}</p>

              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-500">
                <span className="bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200 text-[10px]">
                  {selectedPsy.colegiatura}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedPsy.rating.toFixed(1)}</span>
                </span>
              </div>
            </div>

            {/* Academic Titles & Degrees */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                Títulos Profesionales
              </h5>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedPsy.titles.map((title, i) => (
                  <li key={i} className="flex items-start gap-1 text-[11px]">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Approach and specialties */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Enfoque:</span>
                <span className="text-slate-800 font-medium text-[11px]">{selectedPsy.approach}</span>
              </div>

              <div className="pt-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Especialidades:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedPsy.specialties.map((spec, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 text-[9px] font-medium px-1.5 py-0.5 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
              <h5 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 text-xs">Resumen de tu Cita</h5>

              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Servicio:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[150px]">{selectedService.title}</span>
              </div>

              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Fecha:</span>
                <span className="font-semibold text-slate-900">{selectedDate}</span>
              </div>

              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Horario:</span>
                <span className={`font-semibold ${selectedHour ? 'text-teal-700 font-bold' : 'text-amber-700'}`}>
                  {selectedHour ? `${String(selectedHour).padStart(2, '0')}:00 hrs` : 'Por seleccionar'}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Modalidad:</span>
                <span className="font-semibold text-slate-900 capitalize">{modality}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-xs">
                <span className="font-bold text-slate-900">Total a Pagar:</span>
                <span className="text-base font-black text-teal-800">S/. {totalPrice}</span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              disabled={!selectedHour}
              onClick={handleConfirmAppointment}
              className={`w-full py-2.5 rounded-lg font-bold text-xs shadow-md shadow-teal-100 transition-all flex items-center justify-center gap-1.5 ${
                selectedHour
                  ? 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmar Selección</span>
            </button>
            
            <p className="text-[10px] text-slate-400 text-center">
              Cancelación o reprogramación gratuita hasta 24 horas antes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
