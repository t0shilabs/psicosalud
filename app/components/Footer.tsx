import React from 'react';
import { useClinic, SectionType } from '@/app/context/ClinicContext';
import { CLINIC_INFO } from '@/app/data/initialData';
import { 
  HeartHandshake, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentSection } = useClinic();

  const handleNavigate = (section: SectionType) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-8 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Urgent Crisis Support Notice - High Density Compact */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 rounded-xl p-3.5 sm:p-4 mb-6 border border-teal-800/40 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/15 rounded-lg text-teal-400 border border-teal-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">¿Estás pasando por un momento de crisis emocional?</h4>
              <p className="text-slate-400 text-[11px] mt-0.5 max-w-2xl leading-tight">
                No estás solo/a. Orientación de emergencia gratuita 24h a la central nacional o en nuestro canal prioritario.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <a
              href="tel:113"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Llamar al 113 (Opción 5)</span>
            </a>
            <button
              onClick={() => handleNavigate('booking')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Agendar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4-Column Grid - High Density */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-6 border-b border-slate-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                Ψ
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                Psico<span className="text-teal-400">Salud</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed pr-4">
              Centro virtual y presencial de atención psicológica integral. Respaldado por profesionales colegiados con maestría y amplia experiencia en psicoterapia basada en evidencia científica.
            </p>
            <div className="space-y-1 pt-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Colegiatura Oficial C.Ps.P. verificada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Confidencialidad médica y secreto profesional</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Modalidad 100% Online o Consultorio en San Isidro</span>
              </div>
            </div>
          </div>

          {/* Column 2: Secciones Rápidas */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs tracking-wider uppercase">Secciones</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNavigate('home')} className="hover:text-teal-400 transition-colors cursor-pointer">
                  Página Principal
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('booking')} className="hover:text-teal-400 transition-colors font-semibold text-teal-300 cursor-pointer">
                  Separa tu Cita
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="hover:text-teal-400 transition-colors cursor-pointer">
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('psychologists')} className="hover:text-teal-400 transition-colors cursor-pointer">
                  Equipo de Psicólogos
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('blog')} className="hover:text-teal-400 transition-colors cursor-pointer">
                  Blog de Bienestar
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('contact')} className="hover:text-teal-400 transition-colors cursor-pointer">
                  Contacto y Ubicación
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Administración y Calidad */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs tracking-wider uppercase">Administración</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleNavigate('admin')}
                  className="hover:text-teal-300 text-teal-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Portal Administrativo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('booking')} 
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Tarifas y Modalidades
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('about')} 
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Código Deontológico
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacto directo */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs tracking-wider uppercase">Contacto Central</h5>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{CLINIC_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} PsicoSalud - Clínica Virtual de Psicología. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-slate-400">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Consentimiento Informado</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
