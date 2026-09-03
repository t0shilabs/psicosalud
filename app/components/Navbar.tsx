import React, { useState } from 'react';
import {
  HeartHandshake, 
  CalendarCheck, 
  Users, 
  BookOpen, 
  PhoneCall, 
  Home, 
  Menu, 
  X, 
  UserPlus, 
  Clock, 
  UserCheck, 
  ShieldCheck,
  BriefcaseMedical,
  LogIn,
  User,
  LogOut
} from 'lucide-react';
import {SectionType, useClinic} from "@/app/context/ClinicContext";
import {useRouter} from "next/navigation";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const {
    currentSection,
    setCurrentSection,
    appointments,
    currentPatient,
    logoutPatient,
    currentPsychologist,
    logoutPsychologist,
    isAdminAuthenticated,
    setIsAppointmentsModalOpen,
    setIsLoginModalOpen,
  } = useClinic();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAppointmentsCount = appointments.filter(
    (a) => a.status === 'confirmada'
  ).length;

  const handleNavClick = (section: SectionType, route: string) => {
    router.push(route);
    setCurrentSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: SectionType; route: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Inicio', icon: Home, route: '/' },
    { id: 'about', label: 'Quiénes Somos', icon: ShieldCheck, route: '/about' },
    { id: 'psychologists', label: 'Nuestros Psicólogos', icon: Users, route: '/psychologists' },
    { id: 'blog', label: 'Blog', icon: BookOpen, route: '/blog' },
    { id: 'portal', label: 'Mi Portal', icon: User, route: '/portal' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-all flex-shrink-0">
      {/* Top emergency announcement bar - compact high density */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 text-white text-[11px] py-1 px-4 border-b border-teal-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="font-medium">Clínica Virtual y Presencial · Registro Sanitario & Colegiatura Oficial C.Ps.P.</span>
          </div>
          <div className="flex items-center gap-3 text-teal-200 justify-center text-[10px]">
            <span className="hidden md:inline">Atención de urgencia:</span>
            <span className="font-bold text-white">Línea 113 (opción 5)</span>
            <span className="text-teal-400">•</span>
            <span>WhatsApp: +51 987 654 321</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - h-16 High Density */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Greek Psi badge */}
          <div 
            onClick={() => handleNavClick('home', '/')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            id="nav-logo"
          >
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-teal-700 transition-colors">
              Ψ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-teal-800 font-sans">
                  Psico<span className="text-teal-600">Salud</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                  Virtual
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id, item.route)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-teal-700 font-bold border-b-2 border-teal-600 -mb-[2px] pb-1.5'
                      : 'text-slate-600 hover:text-teal-600'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions on Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Appointments Quick Button */}
            <button
              id="btn-my-appointments"
              onClick={() => setIsAppointmentsModalOpen(true)}
              className="relative flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer"
              title="Ver mis citas agendadas"
            >
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Mis Citas</span>
              {activeAppointmentsCount > 0 && (
                <span className="ml-1 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeAppointmentsCount}
                </span>
              )}
            </button>

            {/* If Psychologist is Logged In */}
            {currentPsychologist && (
              <div 
                className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs text-slate-800"
                title={`Sesión iniciada como Psicólogo: ${currentPsychologist.name}`}
              >
                <img
                  src={currentPsychologist.avatarUrl}
                  alt={currentPsychologist.name}
                  onClick={() => handleNavClick('portal', '/portal')}
                  className="w-5 h-5 rounded-full object-cover border border-cyan-300 cursor-pointer"
                />
                <span 
                  onClick={() => handleNavClick('portal', '/portal')}
                  className="font-bold text-cyan-950 text-xs truncate max-w-[95px] cursor-pointer hover:underline"
                >
                  {currentPsychologist.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-cyan-700 font-bold bg-cyan-100 px-1 rounded">
                  Col.
                </span>
                <button
                  onClick={logoutPsychologist}
                  className="text-[10px] text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer font-bold px-1"
                  title="Cerrar sesión de psicólogo"
                >
                  ✕
                </button>
              </div>
            )}

            {/* If Not Logged In as either: Login Button */}
            {!currentPatient && !currentPsychologist && (
              <button
                id="btn-nav-login"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs cursor-pointer"
                title="Iniciar sesión en la plataforma"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-600" />
                <span>Ingresar</span>
              </button>
            )}

            {/* Admin Section Access */}
            <button
              id="btn-nav-admin"
              onClick={() => handleNavClick('admin', '/admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                currentSection === 'admin'
                  ? 'border-slate-800 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              title="Panel exclusivo para Administradores"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isAdminAuthenticated ? 'text-emerald-500' : 'text-slate-500'}`} />
              <span>Admin</span>
              {isAdminAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>

            {/* Primary CTA */}
            <button
              id="btn-cta-booking"
              onClick={() => handleNavClick('booking', '/booking')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsAppointmentsModalOpen(true)}
              className="relative p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              title="Mis citas"
            >
              <Clock className="w-5 h-5 text-teal-600" />
              {activeAppointmentsCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeAppointmentsCount}
                </span>
              )}
            </button>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.route)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-left ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {/* Patient Mobile Session */}
            {currentPatient && (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-xs">
                <div 
                  onClick={() => handleNavClick('portal', '/portal')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentPatient.fullName.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{currentPatient.fullName}</span>
                    <span className="text-[10px] text-teal-700 font-semibold">Paciente · Ver mi Portal</span>
                  </div>
                </div>
                <button
                  onClick={logoutPatient}
                  className="text-[11px] font-semibold text-rose-600 hover:underline px-2 py-1"
                >
                  Cerrar
                </button>
              </div>
            )}

            {/* Psychologist Mobile Session */}
            {currentPsychologist && (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-50 border border-cyan-200 text-xs">
                <div 
                  onClick={() => handleNavClick('portal', '/portal')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={currentPsychologist.avatarUrl}
                    alt={currentPsychologist.name}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-300"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">{currentPsychologist.name}</span>
                    <span className="text-[10px] text-cyan-800 font-semibold">{currentPsychologist.colegiatura} · Portal</span>
                  </div>
                </div>
                <button
                  onClick={logoutPsychologist}
                  className="text-[11px] font-semibold text-rose-600 hover:underline px-2 py-1"
                >
                  Cerrar
                </button>
              </div>
            )}

            {/* If neither logged in */}
            {!currentPatient && !currentPsychologist && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-800 text-sm font-semibold hover:bg-teal-100 transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-teal-600" />
                <span>Iniciar Sesión (Paciente / Psicólogo)</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('admin', '/admin')}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                currentSection === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Panel Administrativo {isAdminAuthenticated ? '(Activo)' : ''}</span>
            </button>

            <button
              onClick={() => handleNavClick('booking', '/booking')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-600 text-white text-base font-semibold shadow-sm"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Separa tu Cita Ahora</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
