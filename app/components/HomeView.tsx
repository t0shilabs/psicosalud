import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { CLINIC_INFO } from '@/app/data/initialData';
import { 
  CalendarCheck, 
  Users, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Clock, 
  UserCheck, 
  Send, 
  Check, 
  BookOpen,
  MessageSquare
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setCurrentSection,
    psychologists,
    services,
    blogPosts,
    setSelectedPsychologistForBooking,
    setSelectedBlogPost,
    showToast,
  } = useClinic();

  // Contact form inside home page
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Terapia Psicológica Individual',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    showToast('¡Gracias por tu mensaje! Un psicólogo del equipo se comunicará contigo en breve.');
    setTimeout(() => {
      setContactForm({
        name: '',
        email: '',
        phone: '',
        serviceInterest: 'Terapia Psicológica Individual',
        message: '',
      });
      setContactSubmitted(false);
    }, 4000);
  };

  const handleBookWithPsychologist = (psy: typeof psychologists[0]) => {
    setSelectedPsychologistForBooking(psy);
    setCurrentSection('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-10">
      {/* 1. HERO SECTION (HIGH DENSITY COMPACT HERO) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-slate-50 to-white pt-4 pb-8 lg:py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-[11px] font-bold tracking-wide border border-teal-200/80">
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Atención Psicológica Virtual & Presencial</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Un espacio seguro para <span className="text-teal-600">sanar</span>, comprenderte y recuperar tu <span className="text-teal-800">bienestar</span>.
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Acompañamiento psicológico clínico especializado con profesionales colegiados. Tratamientos basados en evidencia científica, confidencialidad absoluta y calidez humana adaptada a tu ritmo.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 pt-1">
                <button
                  id="hero-cta-booking"
                  onClick={() => setCurrentSection('booking')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Separa tu Cita Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id="hero-cta-psychologists"
                  onClick={() => setCurrentSection('psychologists')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-300 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Conocer a los Psicólogos</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-teal-100 text-teal-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">100% Colegiados</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Registro C.Ps.P. oficial</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-cyan-100 text-cyan-700">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">Confidencial</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Secreto profesional ético</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">4.9 / 5.0</p>
                    <p className="text-[10px] text-slate-500 leading-tight">+500 pacientes atendidos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                  alt="Consulta Psicológica Profesional"
                  className="w-full h-[280px] sm:h-[320px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300">
                      Disponibilidad Inmediata
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold">Sesiones por Videollamada HD o Consultorio</h3>
                  <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                    Plataforma segura de videollamada con recordatorios automáticos y flexibilidad horaria.
                  </p>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl p-2.5 shadow-lg border border-slate-200 hidden sm:flex items-center gap-2.5 max-w-[260px]">
                <img
                  src="https://images.unsplash.com/photo-1594824813576-0046b4129b00?auto=format&fit=crop&w=80&q=80"
                  alt="Psicóloga Destacada"
                  className="w-9 h-9 rounded-lg object-cover border border-teal-500 shrink-0"
                />
                <div>
                  <div className="flex items-center text-amber-400 text-[10px]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Dra. Mariana Valdivia</p>
                  <p className="text-[9px] text-teal-700 font-medium leading-tight">Terapia Cognitivo-Conductual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUIÉNES SOMOS (RESUMEN EN HOME) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
                Quiénes Somos
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                Una clínica fundada por y para profesionales de la salud mental
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nacimos con el compromiso de acercar la psicoterapia de alta especialización a personas que buscan un cambio real en sus vidas, eliminando barreras geográficas mediante la telepsicología sin perder la calidez del vínculo humano.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setCurrentSection('about')}
                  className="inline-flex items-center gap-1.5 text-teal-700 font-bold text-xs hover:text-teal-800 transition-colors cursor-pointer"
                >
                  <span>Conoce nuestra misión, visión y valores</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Rigor Científico</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Tratamientos respaldados por protocolos empíricamente validados como TCC, ACT y Terapia Sistémica.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100">
                <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center mb-2">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Empatía y Sin Juicios</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Tu historia es única. Te escuchamos sin prejuicios en un clima de aceptación incondicional y respeto.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Colegiatura y Posgrados</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Todos nuestros terapeutas cuentan con colegiatura vigente y estudios de posgrado en prestigiosas universidades.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Flexibilidad de Horarios</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Sesiones de lunes a sábado desde las 8:00 AM hasta las 9:00 PM para ajustarnos a tu rutina laboral o académica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUÉ HACEMOS (SERVICIOS Y ESPECIALIDADES) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
            Qué Hacemos
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Especialidades Clínicas y Servicios Terapéuticos
          </h2>
          <p className="text-xs text-slate-600">
            Diseñamos planes de intervención individualizados para niños, adolescentes, adultos, parejas y familias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {srv.durationMinutes} min
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                    Dirigido a:
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium">{srv.targetAudience}</span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Inversión por sesión</span>
                  <span className="text-sm font-black text-slate-900">S/. {srv.basePrice}</span>
                </div>

                <button
                  onClick={() => setCurrentSection('booking')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-teal-600 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NUESTROS PSICÓLOGOS DESTACADOS */}
      <section className="bg-slate-50/80 py-8 sm:py-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
                Equipo Especializado
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Conoce a Nuestros Colegas Psicólogos
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Especialistas verificados con amplia trayectoria clínica en salud mental.
              </p>
            </div>
            <button
              onClick={() => setCurrentSection('psychologists')}
              className="inline-flex items-center gap-1.5 text-teal-700 font-bold text-xs hover:text-teal-800 cursor-pointer"
            >
              <span>Ver todo el equipo ({psychologists.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {psychologists.slice(0, 4).map((psy) => (
              <div
                key={psy.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo with badges */}
                  <div className="relative h-44 bg-slate-200 overflow-hidden">
                    <img
                      src={psy.avatarUrl}
                      alt={psy.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span>{psy.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute bottom-2 left-2 bg-teal-900/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {psy.colegiatura}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 space-y-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{psy.name}</h3>
                      <p className="text-[11px] text-teal-700 font-semibold line-clamp-1">
                        {psy.titles[0] || 'Psicólogo Clínico'}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {psy.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {psy.specialties.slice(0, 2).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom action */}
                <div className="p-3 pt-2 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Tarifa</span>
                    <span className="text-xs font-bold text-slate-900">S/. {psy.consultationFee}</span>
                  </div>

                  <button
                    onClick={() => handleBookWithPsychologist(psy)}
                    className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <CalendarCheck className="w-3 h-3" />
                    <span>Agendar Cita</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CÓMO FUNCIONA (PROCESO SENCILLO DE 3 PASOS) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 rounded-2xl p-5 sm:p-7 text-white shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">
              Paso a Paso
            </span>
            <h2 className="text-lg sm:text-xl font-bold">
              ¿Cómo agendar tu primera sesión?
            </h2>
            <p className="text-xs text-teal-100">
              Proceso 100% digital, transparente y sin trámites complejos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-2 text-center sm:text-left">
              <div className="w-7 h-7 rounded-lg bg-teal-400 text-teal-950 font-black flex items-center justify-center text-sm mx-auto sm:mx-0">
                1
              </div>
              <h4 className="font-bold text-sm">Elige a tu Psicólogo</h4>
              <p className="text-xs text-teal-100 leading-relaxed">
                Revisa perfiles, colegiaturas, especialidades y tarifas de nuestros profesionales para elegir el que mejor sintonice contigo.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-2 text-center sm:text-left">
              <div className="w-7 h-7 rounded-lg bg-teal-400 text-teal-950 font-black flex items-center justify-center text-sm mx-auto sm:mx-0">
                2
              </div>
              <h4 className="font-bold text-sm">Selecciona Fecha y Horario</h4>
              <p className="text-xs text-teal-100 leading-relaxed">
                Consulta el calendario en tiempo real con horarios separados por hora. Las horas ocupadas se muestran con su respectiva etiqueta.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-2 text-center sm:text-left">
              <div className="w-7 h-7 rounded-lg bg-teal-400 text-teal-950 font-black flex items-center justify-center text-sm mx-auto sm:mx-0">
                3
              </div>
              <h4 className="font-bold text-sm">Recibe tu Confirmación</h4>
              <p className="text-xs text-teal-100 leading-relaxed">
                Generamos tu comprobante con código de cita y enlace seguro para tu videollamada o datos de consultorio físico.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/20 text-center">
            <button
              onClick={() => setCurrentSection('booking')}
              className="px-5 py-2.5 rounded-lg bg-white text-teal-900 font-bold text-xs hover:bg-teal-50 transition-all shadow-sm active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Comenzar ahora: Separa tu Cita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIOS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
            Testimonios
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Experiencias de Personas que Confiaron en Nosotros
          </h2>
          <p className="text-xs text-slate-600">
            Historias reales de recuperación emocional, superación de crisis y bienestar integral.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              author: 'Patricia G.',
              age: 34,
              service: 'Tratamiento de Ansiedad',
              therapist: 'Dra. Mariana Valdivia',
              text: 'Llegué con crisis de pánico constantes. La calidez y las técnicas de respiración y reestructuración de Mariana me devolvieron la tranquilidad. Hoy vivo sin miedo a salir.',
            },
            {
              author: 'Fernando & Andrea',
              age: 41,
              service: 'Terapia de Pareja',
              therapist: 'Mg. Carlos Mendoza',
              text: 'Estábamos al borde de la separación por problemas de comunicación. Carlos nos ayudó a desarmar reclamos y aprender a escucharnos. Fue un antes y un después.',
            },
            {
              author: 'Rodrigo M.',
              age: 28,
              service: 'Terapia Individual',
              therapist: 'Dr. Alejandro Benítez',
              text: 'Sentía un burnout aplastante en el trabajo. En terapia aprendí a fijar límites firmes sin culpa y redescubrí el placer en mis proyectos personales.',
            },
            {
              author: 'Lorena H.',
              age: 37,
              service: 'Psicología Infantil',
              therapist: 'Lic. Sofia Alarcón',
              text: 'Sofía tuvo una conexión hermosa con mi hijo Mateo. Las pautas de crianza respetuosa que nos dio a nosotros cambiaron el clima de todo nuestro hogar.',
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-900">{t.author} ({t.age} años)</p>
                <p className="text-[11px] text-teal-700 font-semibold">{t.service}</p>
                <p className="text-[10px] text-slate-400">Atendido por: {t.therapist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BLOG DESTACADO CON IMÁGENES */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
              Artículos y Salud Mental
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Publicaciones Recientes de Nuestro Blog
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Lecturas profesionales para cuidar tu salud emocional con consejos prácticos.
            </p>
          </div>
          <button
            onClick={() => setCurrentSection('blog')}
            className="inline-flex items-center gap-1.5 text-teal-700 font-bold text-xs hover:text-teal-800 cursor-pointer"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedBlogPost(post)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-40 overflow-hidden bg-slate-100 relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-3.5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 block">{post.readTime} · {post.date}</span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-700 truncate max-w-[180px] text-[11px]">
                  Por {post.authorName}
                </span>
                <span className="text-teal-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                  <span>Leer</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FORMULARIO DE CONTACTO DIRECTO EN HOME */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600">
                Contáctanos Directamente
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                ¿Tienes dudas sobre qué servicio es el adecuado para ti?
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Envíanos tu consulta de forma totalmente confidencial. Nuestro equipo de recepción psicológica te orientará sobre la modalidad y el especialista idóneo.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span className="text-[11px]">Respuesta personalizada en menos de 2 horas hábiles.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span className="text-[11px]">Total confidencialidad y protección de tus datos.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span className="text-[11px]">Atención por WhatsApp directo al {CLINIC_INFO.whatsapp}.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-base">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Hemos recibido tu mensaje. Nos comunicaremos contigo a la brevedad por correo o WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Tu Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Martín Delgado"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tu@correo.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+51 987 654 321"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Servicio de Interés
                      </label>
                      <select
                        value={contactForm.serviceInterest}
                        onChange={(e) => setContactForm({ ...contactForm, serviceInterest: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Otra consulta">Otra consulta</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      ¿En qué podemos ayudarte? (Mensaje o motivo de consulta) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Cuéntanos brevemente qué te motiva a consultar o tus dudas sobre horarios..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Consulta Confidencial</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
