import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { 
  X, 
  User, 
  BriefcaseMedical, 
  ShieldCheck, 
  LogIn, 
  KeyRound, 
  Mail, 
  IdCard, 
  ArrowRight,
  UserCheck,
  Sparkles
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginPatient,
    loginPsychologist,
    loginAdmin,
    psychologists,
    patients,
    setCurrentSection,
    setIsPatientModalOpen,
  } = useClinic();

  const [roleTab, setRoleTab] = useState<'patient' | 'psychologist' | 'admin'>('patient');

  // Form states
  const [patientInput, setPatientInput] = useState('');
  const [psychologistInput, setPsychologistInput] = useState('');
  const [adminUser, setAdminUser] = useState('admin@psicosalud.pe');
  const [adminPass, setAdminPass] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!patientInput.trim()) {
      setErrorMsg('Por favor ingresa tu correo electrónico o número de DNI.');
      return;
    }
    const user = loginPatient(patientInput);
    if (user) {
      setIsLoginModalOpen(false);
      setCurrentSection('portal');
    } else {
      setErrorMsg('No encontramos una cuenta con ese correo o DNI. Verifica tus datos o regístrate como nuevo paciente.');
    }
  };

  const handlePsychologistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!psychologistInput.trim()) {
      setErrorMsg('Por favor ingresa tu correo institucional o número de Colegiatura C.Ps.P.');
      return;
    }
    const psy = loginPsychologist(psychologistInput);
    if (psy) {
      setIsLoginModalOpen(false);
      setCurrentSection('portal');
    } else {
      setErrorMsg('No se encontró un colega psicólogo con ese correo o número de colegiatura.');
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const success = loginAdmin(adminUser, adminPass);
    if (success) {
      setIsLoginModalOpen(false);
      setCurrentSection('admin');
    } else {
      setErrorMsg('Credenciales administrativas incorrectas. (Demo: admin@psicosalud.pe / admin123)');
    }
  };

  const handleQuickPatient = (email: string) => {
    const user = loginPatient(email);
    if (user) {
      setIsLoginModalOpen(false);
      setCurrentSection('portal');
    }
  };

  const handleQuickPsychologist = (email: string) => {
    const psy = loginPsychologist(email);
    if (psy) {
      setIsLoginModalOpen(false);
      setCurrentSection('portal');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
              <LogIn className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Iniciar Sesión en PsicoSalud</h3>
              <p className="text-[11px] text-teal-200 mt-0.5">
                Accede a tu perfil, citas y gestión personalizada
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRoleTab('patient');
              setErrorMsg(null);
            }}
            className={`py-2.5 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              roleTab === 'patient'
                ? 'border-teal-600 bg-white text-teal-700 font-bold shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Soy Paciente</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRoleTab('psychologist');
              setErrorMsg(null);
            }}
            className={`py-2.5 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              roleTab === 'psychologist'
                ? 'border-teal-600 bg-white text-teal-700 font-bold shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BriefcaseMedical className="w-3.5 h-3.5" />
            <span>Soy Colega</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRoleTab('admin');
              setErrorMsg(null);
            }}
            className={`py-2.5 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              roleTab === 'admin'
                ? 'border-teal-600 bg-white text-teal-700 font-bold shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrador</span>
          </button>
        </div>

        {/* Body Form */}
        <div className="p-4 sm:p-5 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <span className="font-bold">•</span>
              <p>{errorMsg}</p>
            </div>
          )}

          {/* TAB 1: PACIENTE */}
          {roleTab === 'patient' && (
            <form onSubmit={handlePatientSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico o DNI
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="ej. camila.rojas@gmail.com o 74829103"
                    value={patientInput}
                    onChange={(e) => setPatientInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Ingresa el mismo correo o DNI con el que agendaste tu cita o te registraste.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ingresar a Mi Cuenta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Demo quick accounts */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Acceso Rápido de Prueba (1 Clic)</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {patients.slice(0, 2).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleQuickPatient(p.email)}
                      className="p-2 text-left rounded-lg border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all text-[11px] cursor-pointer"
                    >
                      <span className="font-bold text-slate-800 block truncate">{p.fullName.split(' ')[0]}</span>
                      <span className="text-[9px] text-slate-500 font-mono block truncate">{p.email}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">¿Aún no tienes cuenta? </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsPatientModalOpen(true);
                  }}
                  className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                >
                  Regístrate aquí
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PSICÓLOGO COLEGA */}
          {roleTab === 'psychologist' && (
            <form onSubmit={handlePsychologistSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico o N° de Colegiatura (C.Ps.P.)
                </label>
                <div className="relative">
                  <IdCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="ej. mariana.valdivia@psicosalud.pe o C.Ps.P. 24890"
                    value={psychologistInput}
                    onChange={(e) => setPsychologistInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Permite a los profesionales revisar citas de pacientes y actualizar su perfil.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Acceder a Portal Profesional</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Demo quick psychologists */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Colegas Registrados para Prueba (1 Clic)</span>
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {psychologists.slice(0, 4).map((psy) => (
                    <button
                      key={psy.id}
                      type="button"
                      onClick={() => handleQuickPsychologist(psy.email)}
                      className="p-2 text-left rounded-lg border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all text-[11px] cursor-pointer flex items-center gap-2"
                    >
                      <img
                        src={psy.avatarUrl}
                        alt={psy.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <div className="truncate">
                        <span className="font-bold text-slate-800 block truncate">{psy.name}</span>
                        <span className="text-[9px] text-teal-700 font-semibold block">{psy.colegiatura}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: ADMIN */}
          {roleTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Usuario o Correo Administrador
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contraseña de Administrador
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Credenciales demo: <strong>admin@psicosalud.pe</strong> / <strong>admin123</strong>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ingresar al Panel Administrativo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
