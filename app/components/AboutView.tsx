import React from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  HeartHandshake, 
  Award, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  BookOpen, 
  CalendarCheck,
  Star
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { psychologists, setCurrentSection, setSelectedPsychologistForBooking } = useClinic();

  const handleBook = (psy: typeof psychologists[0]) => {
    setSelectedPsychologistForBooking(psy);
    setCurrentSection('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    {
      title: 'Confidencialidad Médica Absoluta',
      desc: 'Cumplimos rigurosamente con el secreto profesional deontológico del Colegio de Psicólogos del Perú y estándares internacionales de privacidad clínica.',
      icon: ShieldCheck,
      color: 'teal',
    },
    {
      title: 'Rigor Científico y Basado en Evidencia',
      desc: 'Nuestros tratamientos integran modelos con sustento empírico como la Terapia Cognitivo-Conductual (TCC), Terapia de Aceptación y Compromiso (ACT) y Enfoque Sistémico.',
      icon: Award,
      color: 'cyan',
    },
    {
      title: 'Empatía Radical y Espacio Libre de Juicios',
      desc: 'Creemos que el vínculo terapéutico es el pilar de la sanación. Acompañamos tu proceso desde el respeto total a tu identidad, creencias y vivencias personales.',
      icon: HeartHandshake,
      color: 'emerald',
    },
    {
      title: 'Accesibilidad e Inclusión',
      desc: 'La salud mental debe estar al alcance de todos. Ofrecemos modalidades online para romper barreras geográficas y horarios flexibles adaptados a tu vida.',
      icon: Sparkles,
      color: 'amber',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Hero Header - High Density */}
      <section className="bg-gradient-to-b from-teal-50/70 via-slate-50 to-white pt-4 pb-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center max-w-2xl space-y-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-700 bg-teal-100/70 px-2.5 py-0.5 rounded-full border border-teal-200">
            Nuestra Esencia y Compromiso
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Quiénes Somos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Somos una clínica virtual y presencial fundada por profesionales de la psicología clínica comprometidos con transformar vidas a través de la ciencia, la empatía y la escucha consciente.
          </p>
        </div>
      </section>

      {/* Misión y Visión Section - High Density */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Misión */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs relative overflow-hidden group hover:border-teal-400 transition-all">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              Nuestro Propósito
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 mb-2">
              Nuestra Misión
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Brindar atención psicológica clínica de excelencia y calidez humana, facilitando que cada paciente desarrolle herramientas emocionales sólidas para superar el sufrimiento, potenciar su bienestar y construir relaciones saludables y significativas.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Atención clínica personalizada e integral</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Prevención y psicoeducación comunitaria</span>
              </div>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs relative overflow-hidden group hover:border-cyan-400 transition-all">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
              Hacia Dónde Vamos
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 mb-2">
              Nuestra Visión
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidarnos como el centro de referencia en telepsicología y salud mental en Iberoamérica, reconocido por los más altos estándares éticos, rigor metodológico en psicoterapia y la continua formación de nuestro equipo clínico interdisciplinario.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>Innovación en herramientas clínicas y teleconsulta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span>Desestigmatización de la salud mental en la sociedad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores que Guían Nuestra Labor - High Density */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 space-y-1">
          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
            Principios Éticos
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Los Valores que Guían Nuestra Labor Profesional
          </h2>
          <p className="text-xs text-slate-600">
            Cada sesión, informe y orientación psicológica se rige por un marco de integridad insoslayable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-xs transition-all space-y-2"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs">{v.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* EQUIPO MÉDICO / CLÍNICO COMPLETO - High Density */}
      <section className="bg-slate-50/80 py-6 sm:py-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
              Equipo Médico & Clínico
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Nuestros Especialistas y Colegas
            </h2>
            <p className="text-xs text-slate-600">
              Conoce las credenciales académicas, trayectoria y títulos profesionales de quienes velan por tu salud mental.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {psychologists.map((psy) => (
              <div
                key={psy.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={psy.avatarUrl}
                      alt={psy.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span>{psy.rating.toFixed(1)}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                      {psy.colegiatura}
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{psy.name}</h3>
                      <p className="text-[11px] text-teal-700 font-semibold line-clamp-1">{psy.titles[0]}</p>
                    </div>

                    <div className="space-y-0.5 text-[10px] text-slate-600">
                      {psy.titles.slice(1).map((t, idx) => (
                        <p key={idx} className="line-clamp-1 italic text-slate-500">• {t}</p>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {psy.bio}
                    </p>

                    <div className="pt-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">
                        Áreas principales:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {psy.specialties.map((s, i) => (
                          <span key={i} className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Tarifa sesión</span>
                    <span className="text-xs font-bold text-slate-900">S/. {psy.consultationFee}</span>
                  </div>
                  <button
                    onClick={() => handleBook(psy)}
                    className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <CalendarCheck className="w-3 h-3" />
                    <span>Separar Cita</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
