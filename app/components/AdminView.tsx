import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { Patient, Psychologist } from '@/app/types';
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Search, 
  BriefcaseMedical, 
  Calendar, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Clock, 
  Phone, 
  Mail, 
  IdCard, 
  Sparkles,
  DollarSign,
  FileText,
  KeyRound,
  ChevronRight,
  UserCheck,
  ArrowUpDown,
  Filter,
  Check,
  CalendarX,
  Video,
  MapPin,
  RefreshCw
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    patients, 
    createPatient, 
    updatePatient, 
    deletePatient,
    psychologists,
    addPsychologist,
    deletePsychologist,
    appointments,
    cancelAppointment,
    updateAppointmentStatus,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    setIsColleagueModalOpen
  } = useClinic();

  // Login form state
  const [adminUser, setAdminUser] = useState('admin@psicosalud.pe');
  const [adminPass, setAdminPass] = useState('admin123');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'users' | 'psychologists' | 'appointments'>('users');

  // User search & filter
  const [userSearch, setUserSearch] = useState('');

  // Appointments filters & sorting
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [appointmentSortOrder, setAppointmentSortOrder] = useState<'asc' | 'desc'>('asc');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<'todas' | 'confirmada' | 'completada' | 'cancelada'>('todas');
  const [appointmentModalityFilter, setAppointmentModalityFilter] = useState<'todas' | 'online' | 'presencial'>('todas');

  // User Modal State (Create or Edit)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [userForm, setUserForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dni: '',
    birthDate: '',
    emergencyContact: '',
    notes: '',
    status: 'activo' as 'activo' | 'inactivo'
  });

  // User deletion confirm modal
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [psyToDelete, setPsyToDelete] = useState<Psychologist | null>(null);

  // Handle Admin Login
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminUser, adminPass);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setAdminUser('admin@psicosalud.pe');
    setAdminPass('admin123');
    loginAdmin('admin@psicosalud.pe', 'admin123');
    setLoginError(false);
  };

  // User Modal Handlers
  const handleOpenCreateUser = () => {
    setEditingPatient(null);
    setUserForm({
      fullName: '',
      email: '',
      phone: '+51 ',
      dni: '',
      birthDate: '',
      emergencyContact: '',
      notes: '',
      status: 'activo'
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (patient: Patient) => {
    setEditingPatient(patient);
    setUserForm({
      fullName: patient.fullName,
      email: patient.email,
      phone: patient.phone,
      dni: patient.dni,
      birthDate: patient.birthDate || '',
      emergencyContact: patient.emergencyContact || '',
      notes: patient.notes || '',
      status: patient.status || 'activo'
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.fullName.trim() || !userForm.email.trim() || !userForm.dni.trim()) {
      alert('Por favor completa los campos obligatorios (Nombre, Email, DNI).');
      return;
    }

    if (editingPatient) {
      updatePatient(editingPatient.id, {
        fullName: userForm.fullName.trim(),
        email: userForm.email.trim(),
        phone: userForm.phone.trim(),
        dni: userForm.dni.trim(),
        birthDate: userForm.birthDate || undefined,
        emergencyContact: userForm.emergencyContact.trim() || undefined,
        notes: userForm.notes.trim() || undefined,
        status: userForm.status
      });
    } else {
      createPatient({
        fullName: userForm.fullName.trim(),
        email: userForm.email.trim(),
        phone: userForm.phone.trim(),
        dni: userForm.dni.trim(),
        birthDate: userForm.birthDate || undefined,
        emergencyContact: userForm.emergencyContact.trim() || undefined,
        notes: userForm.notes.trim() || undefined,
        status: userForm.status
      });
    }

    setIsUserModalOpen(false);
    setEditingPatient(null);
  };

  // Filtered Users list
  const filteredPatients = patients.filter((p) => {
    const q = userSearch.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.dni.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q)
    );
  });

  // Filtered & Chronologically Sorted Appointments for Admin
  const chronologicallySortedAppointments = [...appointments]
    .filter((app) => {
      if (appointmentSearch.trim()) {
        const q = appointmentSearch.toLowerCase();
        const matchPatient = app.patientName.toLowerCase().includes(q) || app.patientEmail.toLowerCase().includes(q) || app.patientPhone.includes(q);
        const matchPsy = app.psychologistName.toLowerCase().includes(q);
        const matchCode = app.code.toLowerCase().includes(q);
        const matchDate = app.date.includes(q);
        if (!matchPatient && !matchPsy && !matchCode && !matchDate) return false;
      }
      if (appointmentStatusFilter !== 'todas' && app.status !== appointmentStatusFilter) return false;
      if (appointmentModalityFilter !== 'todas' && app.modality !== appointmentModalityFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const dateComp = a.date.localeCompare(b.date);
      if (dateComp !== 0) {
        return appointmentSortOrder === 'asc' ? dateComp : -dateComp;
      }
      return appointmentSortOrder === 'asc' ? a.hour - b.hour : b.hour - a.hour;
    });

  // IF NOT AUTHENTICATED: SHOW ADMIN LOGIN GATE
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white text-center space-y-2">
            <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center mx-auto border border-teal-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300 bg-teal-900/60 px-2.5 py-0.5 rounded-full border border-teal-700/50">
              Acceso Restringido
            </span>
            <h2 className="text-xl font-bold tracking-tight">Panel Administrativo</h2>
            <p className="text-xs text-slate-300">
              Gestión central de psicólogos colegas, usuarios registrados y citas
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleAdminLoginSubmit} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Credenciales incorrectas. Verifica tu usuario y contraseña.</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Usuario / Correo de Administrador
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="admin@psicosalud.pe"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Iniciar Sesión como Admin</span>
            </button>

            {/* Quick Demo Login Box */}
            <div className="pt-3 border-t border-slate-100 text-center space-y-2">
              <span className="text-[11px] text-slate-500 block">
                ¿Deseas probar el panel inmediatamente?
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Acceso Rápido Demo (1 Clic)</span>
              </button>
              <p className="text-[10px] text-slate-400">
                Credenciales demo: <strong>admin@psicosalud.pe</strong> / <strong>admin123</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
      {/* Top Banner with Admin Identity & Metrics */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded border border-teal-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Panel de Administración</span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Sesión Activa</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Control de Usuarios, Colegas y Servicios
          </h1>
          <p className="text-xs text-slate-500">
            Gestión de pacientes registrados, alta de profesionales psicólogos y supervisión de citas clínicas.
          </p>
        </div>

        {/* Quick actions & Logout */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsColleagueModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <BriefcaseMedical className="w-3.5 h-3.5" />
            <span>+ Registrar Colega</span>
          </button>
          <button
            onClick={handleOpenCreateUser}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Nuevo Usuario</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Cerrar sesión de Administrador"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Usuarios</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{patients.length}</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-teal-600 font-medium">Pacientes registrados</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Colegas Psicólogos</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{psychologists.length}</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <BriefcaseMedical className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-cyan-600 font-medium">Cuerpo profesional C.Ps.P.</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Citas Totales</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{appointments.length}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Sesiones programadas</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Recaudado</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">
              S/. {appointments.reduce((acc, curr) => acc + curr.totalPrice, 0)}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Facturación de citas</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
            activeTab === 'users'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Usuarios Registrados ({patients.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('psychologists')}
          className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
            activeTab === 'psychologists'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BriefcaseMedical className="w-3.5 h-3.5" />
          <span>Colegas Psicólogos ({psychologists.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
            activeTab === 'appointments'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Historial de Citas ({appointments.length})</span>
        </button>
      </div>

      {/* TAB 1: GESTIÓN DE USUARIOS REGISTRADOS */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
          {/* Header controls for Users */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Buscar usuario por nombre, DNI, correo..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[11px] text-slate-500">
                Mostrando <strong>{filteredPatients.length}</strong> de {patients.length} usuarios
              </span>
              <button
                onClick={handleOpenCreateUser}
                className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Crear Usuario</span>
              </button>
            </div>
          </div>

          {/* Users Table / List */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-3 py-2.5">Usuario / Paciente</th>
                  <th className="px-3 py-2.5">DNI</th>
                  <th className="px-3 py-2.5">Contacto</th>
                  <th className="px-3 py-2.5">Fecha Registro</th>
                  <th className="px-3 py-2.5">Citas</th>
                  <th className="px-3 py-2.5">Estado</th>
                  <th className="px-3 py-2.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      No se encontraron usuarios registrados con los criterios de búsqueda.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    const userAppointments = appointments.filter((a) => a.patientId === patient.id || a.patientEmail.toLowerCase() === patient.email.toLowerCase());
                    return (
                      <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                              {patient.fullName.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">{patient.fullName}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{patient.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-slate-800 font-medium">
                          {patient.dni}
                        </td>
                        <td className="px-3 py-2.5 space-y-0.5">
                          <div className="text-slate-800">{patient.email}</div>
                          <div className="text-slate-400 text-[10px]">{patient.phone}</div>
                        </td>
                        <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">
                          {patient.registeredAt}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold text-[10px] border border-teal-200">
                            {userAppointments.length} cita(s)
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            patient.status === 'inactivo' 
                              ? 'bg-slate-100 text-slate-600' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {patient.status || 'activo'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditUser(patient)}
                              className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
                              title="Editar Usuario"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setPatientToDelete(patient)}
                              className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Eliminar Usuario"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: GESTIÓN DE COLEGAS PSICÓLOGOS */}
      {activeTab === 'psychologists' && (
        <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Equipo Médico y Psicológico</h3>
              <p className="text-xs text-slate-500">
                Registra nuevos colegas con número de colegiatura C.Ps.P. para integrarlos a la agenda clínica.
              </p>
            </div>
            <button
              onClick={() => setIsColleagueModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <BriefcaseMedical className="w-3.5 h-3.5" />
              <span>Registrar Nuevo Colega</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {psychologists.map((psy) => (
              <div
                key={psy.id}
                className="bg-slate-50/60 rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 hover:border-teal-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <img
                      src={psy.avatarUrl}
                      alt={psy.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-white px-1.5 py-0.5 rounded border border-teal-200">
                        {psy.colegiatura}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs mt-1 truncate">{psy.name}</h4>
                      <p className="text-[10px] text-teal-700 font-semibold truncate">{psy.titles[0]}</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Tarifa sesión:</span>
                      <strong className="text-slate-900">S/. {psy.consultationFee}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Horario:</span>
                      <span>{psy.workingHours.start}:00 - {psy.workingHours.end}:00 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Enfoque:</span>
                      <span className="truncate max-w-[160px] text-right">{psy.approach}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">ID: {psy.id}</span>
                  <button
                    onClick={() => setPsyToDelete(psy)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HISTORIAL DE TODAS LAS CITAS EN ORDEN CRONOLÓGICO */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-5">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>Supervisión Cronológica de Citas Clínicas</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Todas las citas agendadas en orden temporal con el paciente y el profesional asociados.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-bold border border-teal-200">
                Total: {appointments.length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                Confirmadas: {appointments.filter((a) => a.status === 'confirmada').length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                Completadas: {appointments.filter((a) => a.status === 'completada').length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                Canceladas: {appointments.filter((a) => a.status === 'cancelada').length}
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por paciente, psicólogo, código..."
                value={appointmentSearch}
                onChange={(e) => setAppointmentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={appointmentStatusFilter}
              onChange={(e) => setAppointmentStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="todas">Todos los Estados</option>
              <option value="confirmada">Confirmadas / Vigentes</option>
              <option value="completada">Completadas</option>
              <option value="cancelada">Canceladas</option>
            </select>

            {/* Modality Filter */}
            <select
              value={appointmentModalityFilter}
              onChange={(e) => setAppointmentModalityFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="todas">Todas las Modalidades</option>
              <option value="online">Virtual / Online</option>
              <option value="presencial">Presencial (San Isidro)</option>
            </select>

            {/* Sort Order Toggle */}
            <button
              onClick={() => setAppointmentSortOrder(appointmentSortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Cambiar orden cronológico"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-teal-600" />
              <span>
                {appointmentSortOrder === 'asc'
                  ? 'Cronológico: Próximas primero'
                  : 'Cronológico: Más lejanas primero'}
              </span>
            </button>
          </div>

          {/* Chronological Table of Appointments */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-3.5 py-3">Fecha & Turno</th>
                  <th className="px-3.5 py-3">Paciente Relacionado</th>
                  <th className="px-3.5 py-3">Profesional Relacionado</th>
                  <th className="px-3.5 py-3">Servicio & Modalidad</th>
                  <th className="px-3.5 py-3">Monto</th>
                  <th className="px-3.5 py-3">Estado</th>
                  <th className="px-3.5 py-3 text-right">Acción Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chronologicallySortedAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No se encontraron citas con los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  chronologicallySortedAppointments.map((app) => {
                    const relatedPsy = psychologists.find((p) => p.id === app.psychologistId);
                    const relatedPatient = patients.find(
                      (p) => p.id === app.patientId || p.email.toLowerCase() === app.patientEmail.toLowerCase()
                    );
                    const isCancelled = app.status === 'cancelada';
                    const isCompleted = app.status === 'completada';

                    return (
                      <tr 
                        key={app.id} 
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isCancelled ? 'bg-slate-50/60 opacity-70' : ''
                        }`}
                      >
                        {/* 1. Date & Chronological Slot */}
                        <td className="px-3.5 py-3 align-top whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                            <div>
                              <span className="font-bold text-slate-900 block">{app.date}</span>
                              <span className="text-[11px] text-slate-500 font-mono">
                                {String(app.hour).padStart(2, '0')}:00 hrs
                              </span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-bold bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded border border-teal-200 mt-1 inline-block">
                            {app.code}
                          </span>
                        </td>

                        {/* 2. Related Patient */}
                        <td className="px-3.5 py-3 align-top">
                          <div className="font-bold text-slate-900 text-xs">
                            {app.patientName}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <span className="font-mono">DNI: {relatedPatient?.dni || 'No reg.'}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex flex-col mt-0.5 space-y-0.5">
                            <span className="flex items-center gap-1">
                              <Mail className="w-2.5 h-2.5" /> {app.patientEmail}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-2.5 h-2.5" /> {app.patientPhone}
                            </span>
                          </div>
                          {app.reason && (
                            <div className="text-[10px] text-teal-700 bg-teal-50/70 px-1.5 py-0.5 rounded border border-teal-100 mt-1 line-clamp-1 max-w-xs" title={app.reason}>
                              Motivo: {app.reason}
                            </div>
                          )}
                        </td>

                        {/* 3. Related Professional */}
                        <td className="px-3.5 py-3 align-top">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={relatedPsy?.avatarUrl || app.psychologistAvatar}
                              alt={app.psychologistName}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 text-xs">
                                {app.psychologistName}
                              </div>
                              <div className="text-[10px] text-teal-700 font-mono font-semibold">
                                {relatedPsy?.colegiatura || app.psychologistTitle}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                                {relatedPsy?.approach || 'Especialista clínico'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 4. Service & Modality */}
                        <td className="px-3.5 py-3 align-top">
                          <span className="font-medium text-slate-800 block text-xs">
                            {app.serviceTitle}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold mt-1 inline-flex items-center gap-1 ${
                              app.modality === 'online'
                                ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {app.modality === 'online' ? (
                              <>
                                <Video className="w-2.5 h-2.5" /> Virtual
                              </>
                            ) : (
                              <>
                                <MapPin className="w-2.5 h-2.5" /> Presencial
                              </>
                            )}
                          </span>
                        </td>

                        {/* 5. Total Price */}
                        <td className="px-3.5 py-3 align-top font-bold text-slate-900 whitespace-nowrap">
                          S/. {app.totalPrice}
                        </td>

                        {/* 6. Status Badge */}
                        <td className="px-3.5 py-3 align-top">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                              isCancelled
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : isCompleted
                                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {isCancelled ? 'Cancelada' : isCompleted ? 'Completada' : 'Confirmada'}
                          </span>
                        </td>

                        {/* 7. Admin Actions */}
                        <td className="px-3.5 py-3 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {!isCompleted && !isCancelled && (
                              <button
                                onClick={() => updateAppointmentStatus(app.id, 'completada')}
                                className="px-2 py-1 rounded bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-[11px] font-bold transition-colors cursor-pointer"
                                title="Marcar como atendida / completada"
                              >
                                Completar
                              </button>
                            )}

                            {!isCancelled && (
                              <button
                                onClick={() => cancelAppointment(app.id)}
                                className="px-2 py-1 rounded text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-[11px] font-medium transition-colors cursor-pointer"
                                title="Cancelar cita administrativa"
                              >
                                Cancelar
                              </button>
                            )}

                            {isCancelled && (
                              <button
                                onClick={() => updateAppointmentStatus(app.id, 'confirmada')}
                                className="px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 text-[11px] font-medium transition-colors cursor-pointer"
                                title="Reactivar cita"
                              >
                                Reactivar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT USER MODAL */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-6">
            <div className="bg-gradient-to-r from-teal-800 to-slate-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <UserPlus className="w-4 h-4 text-teal-200" />
                </div>
                <h3 className="font-bold text-sm">
                  {editingPatient ? 'Editar Datos de Usuario' : 'Crear Nuevo Usuario / Paciente'}
                </h3>
              </div>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="p-4 sm:p-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre Completo y Apellidos *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Rodrigo Salazar Morales"
                  value={userForm.fullName}
                  onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rodrigo@email.com"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    DNI / Documento de Identidad *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    placeholder="74819203"
                    value={userForm.dni}
                    onChange={(e) => setUserForm({ ...userForm, dni: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+51 987 654 321"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={userForm.birthDate}
                    onChange={(e) => setUserForm({ ...userForm, birthDate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contacto de Emergencia (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Carmen Morales (Madre) - 991 223 344"
                  value={userForm.emergencyContact}
                  onChange={(e) => setUserForm({ ...userForm, emergencyContact: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estado del Usuario
                  </label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value as 'activo' | 'inactivo' })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white cursor-pointer"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notas Administrativas
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Paciente derivado / preferencial"
                    value={userForm.notes}
                    onChange={(e) => setUserForm({ ...userForm, notes: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {editingPatient ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE USER MODAL */}
      {patientToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 border border-slate-100 shadow-2xl text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">¿Eliminar este usuario?</h3>
            <p className="text-xs text-slate-500">
              Se eliminará a <strong>{patientToDelete.fullName}</strong> (DNI: {patientToDelete.dni}) del registro del sistema. Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPatientToDelete(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deletePatient(patientToDelete.id);
                  setPatientToDelete(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE PSYCHOLOGIST MODAL */}
      {psyToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 border border-slate-100 shadow-2xl text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">¿Retirar colega del directorio?</h3>
            <p className="text-xs text-slate-500">
              Se dará de baja a <strong>{psyToDelete.name}</strong> ({psyToDelete.colegiatura}).
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPsyToDelete(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deletePsychologist(psyToDelete.id);
                  setPsyToDelete(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white cursor-pointer"
              >
                Retirar Colega
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
