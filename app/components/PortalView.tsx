import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { 
  User, 
  BriefcaseMedical, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  Phone, 
  Mail, 
  IdCard, 
  Save, 
  MessageCircle, 
  Check, 
  CalendarX, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  UserCheck,
  Edit3,
  DollarSign
} from 'lucide-react';

export const PortalView: React.FC = () => {
  const {
    currentPatient,
    updatePatient,
    logoutPatient,
    currentPsychologist,
    updatePsychologist,
    logoutPsychologist,
    appointments,
    cancelAppointment,
    updateAppointmentStatus,
    patients,
    setSelectedPsychologistForBooking,
    setCurrentSection,
    setIsLoginModalOpen,
  } = useClinic();

  // Patient tabs
  const [patientTab, setPatientTab] = useState<'profile' | 'appointments'>('appointments');
  const [appointmentFilter, setAppointmentFilter] = useState<'vigentes' | 'pasadas' | 'todas'>('vigentes');

  // Psychologist tabs
  const [psyTab, setPsyTab] = useState<'appointments' | 'profile'>('appointments');
  const [psyAppointmentFilter, setPsyAppointmentFilter] = useState<'vigentes' | 'pasadas' | 'todas'>('vigentes');

  // Cancellation confirm modal state
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);

  // Patient edit profile state
  const [patientForm, setPatientForm] = useState(() => ({
    fullName: currentPatient?.fullName || '',
    email: currentPatient?.email || '',
    phone: currentPatient?.phone || '',
    dni: currentPatient?.dni || '',
    birthDate: currentPatient?.birthDate || '',
    emergencyContact: currentPatient?.emergencyContact || '',
    notes: currentPatient?.notes || '',
  }));

  // Psychologist edit profile state
  const [psyForm, setPsyForm] = useState(() => ({
    name: currentPsychologist?.name || '',
    email: currentPsychologist?.email || '',
    phone: currentPsychologist?.phone || '',
    colegiatura: currentPsychologist?.colegiatura || '',
    consultationFee: currentPsychologist?.consultationFee || 130,
    approach: currentPsychologist?.approach || '',
    experienceYears: currentPsychologist?.experienceYears || 5,
    bio: currentPsychologist?.bio || '',
    avatarUrl: currentPsychologist?.avatarUrl || '',
    startHour: currentPsychologist?.workingHours.start || 9,
    endHour: currentPsychologist?.workingHours.end || 19,
    titlesText: currentPsychologist?.titles.join('\n') || '',
    specialties: currentPsychologist?.specialties || [],
  }));

  // Keep forms in sync if user changes
  React.useEffect(() => {
    if (currentPatient) {
      setPatientForm({
        fullName: currentPatient.fullName,
        email: currentPatient.email,
        phone: currentPatient.phone,
        dni: currentPatient.dni,
        birthDate: currentPatient.birthDate || '',
        emergencyContact: currentPatient.emergencyContact || '',
        notes: currentPatient.notes || '',
      });
    }
  }, [currentPatient]);

  React.useEffect(() => {
    if (currentPsychologist) {
      setPsyForm({
        name: currentPsychologist.name,
        email: currentPsychologist.email,
        phone: currentPsychologist.phone,
        colegiatura: currentPsychologist.colegiatura,
        consultationFee: currentPsychologist.consultationFee,
        approach: currentPsychologist.approach,
        experienceYears: currentPsychologist.experienceYears,
        bio: currentPsychologist.bio,
        avatarUrl: currentPsychologist.avatarUrl,
        startHour: currentPsychologist.workingHours.start,
        endHour: currentPsychologist.workingHours.end,
        titlesText: currentPsychologist.titles.join('\n'),
        specialties: currentPsychologist.specialties,
      });
    }
  }, [currentPsychologist]);

  const handlePatientSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPatient) return;
    if (!patientForm.fullName.trim() || !patientForm.email.trim() || !patientForm.dni.trim()) {
      alert('Por favor completa los campos obligatorios (Nombre, Correo y DNI).');
      return;
    }

    updatePatient(currentPatient.id, {
      fullName: patientForm.fullName.trim(),
      email: patientForm.email.trim(),
      phone: patientForm.phone.trim(),
      dni: patientForm.dni.trim(),
      birthDate: patientForm.birthDate || undefined,
      emergencyContact: patientForm.emergencyContact.trim() || undefined,
      notes: patientForm.notes.trim() || undefined,
    });
  };

  const handlePsySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPsychologist) return;
    if (!psyForm.name.trim() || !psyForm.email.trim() || !psyForm.colegiatura.trim()) {
      alert('Por favor completa nombre, email y número de colegiatura.');
      return;
    }

    const titlesArray = psyForm.titlesText
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    updatePsychologist(currentPsychologist.id, {
      name: psyForm.name.trim(),
      email: psyForm.email.trim(),
      phone: psyForm.phone.trim(),
      colegiatura: psyForm.colegiatura.trim(),
      consultationFee: Number(psyForm.consultationFee),
      approach: psyForm.approach.trim(),
      experienceYears: Number(psyForm.experienceYears),
      bio: psyForm.bio.trim(),
      avatarUrl: psyForm.avatarUrl.trim() || currentPsychologist.avatarUrl,
      workingHours: {
        start: Number(psyForm.startHour),
        end: Number(psyForm.endHour),
      },
      titles: titlesArray.length > 0 ? titlesArray : currentPsychologist.titles,
      specialties: psyForm.specialties,
    });
  };

  // Helper to determine if an appointment is "vigente"
  // Simulated reference date: 2026-09-03
  const isAppointmentVigente = (dateStr: string, status: string) => {
    if (status === 'cancelada' || status === 'completada') return false;
    return dateStr >= '2026-09-03';
  };

  // ----------------------------------------------------
  // VIEW: GUEST / NOT LOGGED IN
  // ----------------------------------------------------
  if (!currentPatient && !currentPsychologist) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Mi Perfil & Gestión de Citas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Inicia sesión para modificar tus datos personales, ver tus citas vigentes o pasadas, y gestionar tus consultas psicológicas.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Iniciar Sesión en Mi Cuenta</span>
            </button>

            <button
              onClick={() => setCurrentSection('booking')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Agendar una Cita Nueva</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW: LOGGED-IN PATIENT
  // ----------------------------------------------------
  if (currentPatient) {
    // Filter appointments for this patient
    const patientAppointments = appointments.filter(
      (a) => a.patientId === currentPatient.id || a.patientEmail.toLowerCase() === currentPatient.email.toLowerCase()
    );

    const vigentes = patientAppointments.filter((a) => isAppointmentVigente(a.date, a.status));
    const pasadas = patientAppointments.filter((a) => !isAppointmentVigente(a.date, a.status));

    const displayedAppointments = 
      appointmentFilter === 'vigentes'
        ? vigentes
        : appointmentFilter === 'pasadas'
        ? pasadas
        : patientAppointments;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Patient Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-900 rounded-2xl p-5 sm:p-7 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-white flex items-center justify-center text-xl font-bold">
              {currentPatient.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold bg-teal-500/20 text-teal-200 px-2 py-0.5 rounded-full border border-teal-400/30">
                  Paciente Registrado
                </span>
                <span className="text-xs text-teal-200">DNI: {currentPatient.dni}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                {currentPatient.fullName}
              </h1>
              <p className="text-xs text-teal-100 flex items-center gap-3 mt-1">
                <span>{currentPatient.email}</span>
                <span>•</span>
                <span>{currentPatient.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setCurrentSection('booking')}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Nueva Cita</span>
            </button>
            <button
              onClick={logoutPatient}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all border border-white/20 cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-4">
          <button
            onClick={() => setPatientTab('appointments')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              patientTab === 'appointments'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Mis Citas Agendadas</span>
            <span className="ml-1 px-2 py-0.2 bg-teal-50 text-teal-700 rounded-full text-xs font-bold border border-teal-200">
              {patientAppointments.length}
            </span>
          </button>

          <button
            onClick={() => setPatientTab('profile')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              patientTab === 'profile'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Modificar Información Personal</span>
          </button>
        </div>

        {/* TAB 1: MIS CITAS AGENDADAS (VIGENTES Y PASADAS) */}
        {patientTab === 'appointments' && (
          <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-5">
            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAppointmentFilter('vigentes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    appointmentFilter === 'vigentes'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Citas Vigentes ({vigentes.length})</span>
                </button>

                <button
                  onClick={() => setAppointmentFilter('pasadas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    appointmentFilter === 'pasadas'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Citas Pasadas / Historial ({pasadas.length})</span>
                </button>

                <button
                  onClick={() => setAppointmentFilter('todas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    appointmentFilter === 'todas'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>Todas ({patientAppointments.length})</span>
                </button>
              </div>

              <div className="text-xs text-slate-400">
                Horario de atención oficial: Lunes a Sábado 08:00 a 20:00 hrs
              </div>
            </div>

            {/* List of Appointments */}
            {displayedAppointments.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-slate-700">
                  {appointmentFilter === 'vigentes' 
                    ? 'No tienes citas vigentes en este momento'
                    : 'No se encontraron citas en esta categoría'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Puedes agendar una sesión con nuestros especialistas de forma rápida e inmediata.
                </p>
                <button
                  onClick={() => setCurrentSection('booking')}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Agendar Cita</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {displayedAppointments.map((app) => {
                  const isVigente = isAppointmentVigente(app.date, app.status);
                  const isCancelled = app.status === 'cancelada';
                  const isCompleted = app.status === 'completada';

                  return (
                    <div
                      key={app.id}
                      className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                        isCancelled
                          ? 'bg-slate-50 border-slate-200 opacity-75'
                          : isVigente
                          ? 'bg-white border-teal-200 shadow-xs hover:border-teal-300 ring-1 ring-teal-500/10'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        {/* Psychologist meta */}
                        <div className="flex items-center gap-3">
                          <img
                            src={app.psychologistAvatar}
                            alt={app.psychologistName}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                {app.code}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">
                                Servicio: <strong className="text-slate-700">{app.serviceTitle}</strong>
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-base mt-0.5">
                              {app.psychologistName}
                            </h4>
                            <p className="text-xs text-slate-500">{app.psychologistTitle}</p>
                          </div>
                        </div>

                        {/* Status Badge & Price */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 ${
                              isCancelled
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : isCompleted
                                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {isCancelled ? (
                              <>
                                <AlertCircle className="w-3 h-3" /> Cita Cancelada
                              </>
                            ) : isCompleted ? (
                              <>
                                <Check className="w-3 h-3 text-slate-600" /> Sesión Completada
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cita Vigente y Confirmada
                              </>
                            )}
                          </span>
                          <span className="text-sm font-black text-slate-900 sm:mt-1">
                            S/. {app.totalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs text-slate-600">
                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Fecha programada</span>
                            <span className="font-bold text-slate-800">{app.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Hora de inicio</span>
                            <span className="font-bold text-slate-800">{String(app.hour).padStart(2, '0')}:00 hrs (50 min)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {app.modality === 'online' ? (
                            <>
                              <Video className="w-4 h-4 text-cyan-600 shrink-0" />
                              <div>
                                <span className="text-[10px] text-cyan-600 uppercase font-bold block">Modalidad</span>
                                <span className="font-bold text-cyan-900">Virtual (Enlace por correo)</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                              <div>
                                <span className="text-[10px] text-amber-600 uppercase font-bold block">Modalidad</span>
                                <span className="font-bold text-amber-900">Presencial (Sede San Isidro)</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Consultation reason if specified */}
                      {app.reason && (
                        <div className="mt-3 p-2.5 rounded-lg bg-teal-50/60 border border-teal-100 text-xs text-slate-700">
                          <span className="font-semibold text-teal-900">Motivo registrado: </span>
                          <span>{app.reason}</span>
                        </div>
                      )}

                      {/* Action Bar for Patient */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="text-[11px] text-slate-400">
                          Contacto del especialista: <span className="font-medium text-slate-600">consultas@psicosalud.pe</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Cancellation button: ONLY allowed for active/vigente appointments as requested */}
                          {isVigente && !isCancelled && (
                            <button
                              type="button"
                              onClick={() => setAppointmentToCancel(app.id)}
                              className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <CalendarX className="w-3.5 h-3.5 text-rose-600" />
                              <span>Cancelar Cita</span>
                            </button>
                          )}

                          {/* Re-booking for past or completed appointments */}
                          {!isVigente && (
                            <button
                              type="button"
                              onClick={() => {
                                const psy = currentPsychologist;
                                if (psy) setSelectedPsychologistForBooking(psy);
                                setCurrentSection('booking');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <span>Agendar Nueva Cita</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MODIFICAR INFORMACIÓN PERSONAL DEL PACIENTE */}
        {patientTab === 'profile' && (
          <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-teal-600" />
                <span>Mis Datos Personales</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Mantén actualizada tu información para que tus psicólogos tratantes puedan comunicarse contigo y coordinar tus sesiones.
              </p>
            </div>

            <form onSubmit={handlePatientSave} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre Completo y Apellidos *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={patientForm.fullName}
                    onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={patientForm.email}
                      onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    DNI / Documento de Identidad *
                  </label>
                  <div className="relative">
                    <IdCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      maxLength={12}
                      value={patientForm.dni}
                      onChange={(e) => setPatientForm({ ...patientForm, dni: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={patientForm.phone}
                      onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={patientForm.birthDate}
                    onChange={(e) => setPatientForm({ ...patientForm, birthDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contacto de Emergencia (Nombre, relación y teléfono)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Lucía Morales (Hermana) - 987 654 321"
                  value={patientForm.emergencyContact}
                  onChange={(e) => setPatientForm({ ...patientForm, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notas o Información Médica Relevante
                </label>
                <textarea
                  rows={3}
                  placeholder="Alergias, antecedentes, o notas para el equipo clínico..."
                  value={patientForm.notes}
                  onChange={(e) => setPatientForm({ ...patientForm, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {appointmentToCancel && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <CalendarX className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  ¿Confirmas la cancelación de tu cita?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Al cancelar, el horario quedará inmediatamente disponible para otros pacientes. Puedes volver a agendar en cualquier momento según la disponibilidad del especialista.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setAppointmentToCancel(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  No, mantener mi cita
                </button>
                <button
                  onClick={() => {
                    cancelAppointment(appointmentToCancel);
                    setAppointmentToCancel(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Sí, Cancelar Cita
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW: LOGGED-IN PSYCHOLOGIST (COLEGA)
  // ----------------------------------------------------
  if (currentPsychologist) {
    // Filter appointments for this psychologist
    const colleagueAppointments = appointments.filter(
      (a) => a.psychologistId === currentPsychologist.id
    );

    const psyVigentes = colleagueAppointments.filter((a) => isAppointmentVigente(a.date, a.status));
    const psyPasadas = colleagueAppointments.filter((a) => !isAppointmentVigente(a.date, a.status));

    const displayedPsyAppointments =
      psyAppointmentFilter === 'vigentes'
        ? psyVigentes
        : psyAppointmentFilter === 'pasadas'
        ? psyPasadas
        : colleagueAppointments;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Psychologist Header Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-5 sm:p-7 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentPsychologist.avatarUrl}
              alt={currentPsychologist.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold bg-teal-400/20 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-400/40">
                  Colega Psicólogo / Staff Clínico
                </span>
                <span className="text-xs text-teal-200 font-mono font-bold">
                  {currentPsychologist.colegiatura}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                {currentPsychologist.name}
              </h1>
              <p className="text-xs text-teal-100 flex flex-wrap items-center gap-2 mt-1">
                <span>{currentPsychologist.titles[0]}</span>
                <span>•</span>
                <span>Tarifa: S/. {currentPsychologist.consultationFee}</span>
                <span>•</span>
                <span>Atención: {currentPsychologist.workingHours.start}:00 a {currentPsychologist.workingHours.end}:00 hrs</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={logoutPsychologist}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 cursor-pointer"
            >
              Cerrar Sesión Profesional
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Psychologist */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-4">
          <button
            onClick={() => setPsyTab('appointments')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              psyTab === 'appointments'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Citas de Pacientes Agendadas</span>
            <span className="ml-1 px-2 py-0.2 bg-teal-50 text-teal-700 rounded-full text-xs font-bold border border-teal-200">
              {colleagueAppointments.length}
            </span>
          </button>

          <button
            onClick={() => setPsyTab('profile')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
              psyTab === 'profile'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar Mi Información Profesional</span>
          </button>
        </div>

        {/* TAB 1: CITAS DE PACIENTES CON INFORMACIÓN SUFICIENTE PARA COMUNICACIÓN */}
        {psyTab === 'appointments' && (
          <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-5">
            {/* Filter pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPsyAppointmentFilter('vigentes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    psyAppointmentFilter === 'vigentes'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Próximas / Vigentes ({psyVigentes.length})</span>
                </button>

                <button
                  onClick={() => setPsyAppointmentFilter('pasadas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    psyAppointmentFilter === 'pasadas'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Pasadas / Atendidas ({psyPasadas.length})</span>
                </button>

                <button
                  onClick={() => setPsyAppointmentFilter('todas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    psyAppointmentFilter === 'todas'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>Todas ({colleagueAppointments.length})</span>
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Información de contacto directa para coordinación clínica
              </div>
            </div>

            {/* List */}
            {displayedPsyAppointments.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-slate-700">
                  No hay citas de pacientes en esta sección
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tus turnos disponibles en el calendario están visibles para nuevos pacientes en la plataforma.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedPsyAppointments.map((app) => {
                  const isCancelled = app.status === 'cancelada';
                  const isCompleted = app.status === 'completada';

                  // Search patient in database for extra details (like emergency contact or DNI)
                  const patientObj = patients.find(
                    (p) => p.id === app.patientId || p.email.toLowerCase() === app.patientEmail.toLowerCase()
                  );

                  // WhatsApp URL formatting
                  const cleanPhone = app.patientPhone.replace(/\D/g, '');
                  const waNumber = cleanPhone.startsWith('51') ? cleanPhone : `51${cleanPhone}`;
                  const waMessage = encodeURIComponent(
                    `Hola ${app.patientName}, le saluda ${currentPsychologist.name} de PsicoSalud respecto a su sesión programada para el ${app.date} a las ${String(app.hour).padStart(2, '0')}:00 hrs.`
                  );
                  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

                  return (
                    <div
                      key={app.id}
                      className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                        isCancelled
                          ? 'bg-slate-50 border-slate-200 opacity-70'
                          : 'bg-white border-slate-200 shadow-xs hover:border-teal-300'
                      }`}
                    >
                      {/* Top bar */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {app.code}
                          </span>
                          <span className="text-xs text-slate-600 font-semibold">
                            {app.serviceTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${
                              isCancelled
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : isCompleted
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {isCancelled ? 'Cancelada' : isCompleted ? 'Atendida / Completada' : 'Confirmada y Vigente'}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            Honorarios: S/. {app.totalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Patient Information Section (Clear, Complete for Communication) */}
                      <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Patient contact info card */}
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                            Información del Paciente
                          </span>

                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {app.patientName.charAt(0)}
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 text-sm">{app.patientName}</h5>
                              <p className="text-[11px] text-slate-500">
                                DNI: <strong className="font-mono text-slate-700">{patientObj?.dni || 'No registrado'}</strong>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span className="font-medium">{app.patientPhone}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-slate-700 truncate">
                              <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span className="truncate">{app.patientEmail}</span>
                            </div>
                          </div>

                          {patientObj?.emergencyContact && (
                            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                              <strong className="text-slate-700">Emergencia:</strong> {patientObj.emergencyContact}
                            </p>
                          )}
                        </div>

                        {/* Appointment schedule & modality card */}
                        <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 space-y-2">
                          <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                            Detalles de la Consulta
                          </span>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-teal-700 shrink-0" />
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Fecha</span>
                                <span className="font-bold text-slate-800">{app.date}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Horario</span>
                                <span className="font-bold text-slate-800">{String(app.hour).padStart(2, '0')}:00 hrs</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs pt-1">
                            {app.modality === 'online' ? (
                              <>
                                <Video className="w-4 h-4 text-cyan-700 shrink-0" />
                                <span className="text-cyan-900 font-semibold">
                                  Modalidad Virtual (Sesión Online por Videollamada)
                                </span>
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                                <span className="text-amber-900 font-semibold">
                                  Modalidad Presencial (Consultorio San Isidro)
                                </span>
                              </>
                            )}
                          </div>

                          {app.reason && (
                            <div className="text-[11px] text-slate-700 bg-white/80 p-2 rounded border border-teal-200/60">
                              <span className="font-semibold text-teal-900">Motivo del paciente: </span>
                              <span>{app.reason}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct Communication Buttons & Actions for Psychologist */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        {/* Direct communication tools */}
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Abrir chat de WhatsApp con mensaje listo"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Contactar por WhatsApp</span>
                          </a>

                          <a
                            href={`mailto:${app.patientEmail}?subject=Sesión PsicoSalud ${app.code}&body=Estimado/a ${app.patientName},`}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span>Enviar Correo</span>
                          </a>

                          <a
                            href={`tel:${app.patientPhone.replace(/\s+/g, '')}`}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            <span>Llamar</span>
                          </a>
                        </div>

                        {/* Status updates */}
                        <div className="flex items-center gap-2">
                          {!isCompleted && !isCancelled && (
                            <button
                              type="button"
                              onClick={() => updateAppointmentStatus(app.id, 'completada')}
                              className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Marcar como Atendida</span>
                            </button>
                          )}

                          {!isCancelled && (
                            <button
                              type="button"
                              onClick={() => cancelAppointment(app.id)}
                              className="px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer"
                              title="Cancelar sesión"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EDITAR INFORMACIÓN PROFESIONAL DEL PSICÓLOGO */}
        {psyTab === 'profile' && (
          <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <BriefcaseMedical className="w-5 h-5 text-teal-600" />
                <span>Mi Ficha Profesional en PsicoSalud</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                La información registrada se muestra a los pacientes en el directorio médico y en el motor de agendamiento.
              </p>
            </div>

            <form onSubmit={handlePsySave} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre Profesional y Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={psyForm.name}
                    onChange={(e) => setPsyForm({ ...psyForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número de Colegiatura Oficial (C.Ps.P.) *
                  </label>
                  <input
                    type="text"
                    required
                    value={psyForm.colegiatura}
                    onChange={(e) => setPsyForm({ ...psyForm, colegiatura: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico Profesional *
                  </label>
                  <input
                    type="email"
                    required
                    value={psyForm.email}
                    onChange={(e) => setPsyForm({ ...psyForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={psyForm.phone}
                    onChange={(e) => setPsyForm({ ...psyForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tarifa de Consulta (S/.) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">S/.</span>
                    <input
                      type="number"
                      required
                      min={50}
                      max={500}
                      value={psyForm.consultationFee}
                      onChange={(e) => setPsyForm({ ...psyForm, consultationFee: Number(e.target.value) })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enfoque Terapéutico Principal
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Terapia Cognitivo-Conductual, Mindfulness y DBT"
                    value={psyForm.approach}
                    onChange={(e) => setPsyForm({ ...psyForm, approach: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Años de Experiencia Clínica
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={psyForm.experienceYears}
                    onChange={(e) => setPsyForm({ ...psyForm, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Horario de Inicio (08 a 14)
                  </label>
                  <input
                    type="number"
                    min={7}
                    max={14}
                    value={psyForm.startHour}
                    onChange={(e) => setPsyForm({ ...psyForm, startHour: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Horario de Cierre (15 a 22)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={22}
                    value={psyForm.endHour}
                    onChange={(e) => setPsyForm({ ...psyForm, endHour: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Grados Académicos y Títulos (Uno por línea)
                </label>
                <textarea
                  rows={2}
                  placeholder="Licenciada en Psicología Clínica - UNMSM&#10;Máster en Terapia Cognitivo Conductual"
                  value={psyForm.titlesText}
                  onChange={(e) => setPsyForm({ ...psyForm, titlesText: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Foto de Perfil (URL de imagen)
                </label>
                <input
                  type="url"
                  value={psyForm.avatarUrl}
                  onChange={(e) => setPsyForm({ ...psyForm, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Biografía Profesional y Trayectoria
                </label>
                <textarea
                  rows={4}
                  value={psyForm.bio}
                  onChange={(e) => setPsyForm({ ...psyForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Información Profesional</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  return null;
};
