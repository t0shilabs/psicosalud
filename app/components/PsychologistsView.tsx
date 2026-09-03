import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { Psychologist } from '@/app/types';
import { 
  UserPlus, 
  Search, 
  Star, 
  Award, 
  ShieldCheck, 
  CalendarCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Trash2,
  DollarSign
} from 'lucide-react';

export const PsychologistsView: React.FC = () => {
  const { 
    psychologists, 
    setCurrentSection, 
    setSelectedPsychologistForBooking, 
    setIsColleagueModalOpen,
    deletePsychologist 
  } = useClinic();

  const [search, setSearch] = useState('');
  const [selectedApproach, setSelectedApproach] = useState('Todos');

  const approaches = [
    'Todos',
    'Terapia Cognitivo-Conductual (TCC)',
    'Terapia Familiar Sistémica',
    'Terapia del Juego Infantil',
    'Neuropsicología Clínica',
  ];

  const filtered = psychologists.filter((psy) => {
    const matchesSearch = psy.name.toLowerCase().includes(search.toLowerCase()) ||
      psy.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      psy.titles.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesApproach = selectedApproach === 'Todos' || psy.approach.includes(selectedApproach);
    return matchesSearch && matchesApproach;
  });

  const handleBook = (psy: Psychologist) => {
    setSelectedPsychologistForBooking(psy);
    setCurrentSection('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
      {/* Header with Title - High Density */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
            <span>Cuerpo Profesional de Excelencia</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Directorio de Psicólogos Colegiados
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl">
            Conoce a nuestro equipo de psicoterapeutas acreditados por el Colegio de Psicólogos del Perú (C.Ps.P.), sus enfoques clínicos y reserva tu sesión directamente.
          </p>
        </div>
      </div>

      {/* Filters Bar - High Density */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nombre, especialidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] shrink-0">
            Enfoque:
          </span>
          {approaches.map((appr) => (
            <button
              key={appr}
              onClick={() => setSelectedApproach(appr)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedApproach === appr
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {appr}
            </button>
          ))}
        </div>
      </div>

      {/* List / Cards - High Density */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((psy) => (
          <div
            key={psy.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                <img
                  src={psy.avatarUrl}
                  alt={psy.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span>{psy.rating.toFixed(1)} ({psy.reviewCount})</span>
                </div>

                <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                  {psy.colegiatura}
                </div>
              </div>

              {/* Information */}
              <div className="p-4 space-y-2.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{psy.name}</h3>
                  <p className="text-[11px] font-semibold text-teal-700 mt-0.5">{psy.titles[0]}</p>
                </div>

                {/* Academic credentials */}
                <div className="space-y-0.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">
                    Títulos y Posgrados:
                  </span>
                  {psy.titles.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-1 text-[10px] leading-tight">
                      <span className="text-teal-600">•</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">
                    Enfoque y Modelo:
                  </span>
                  <p className="text-[11px] font-medium text-slate-800">{psy.approach}</p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {psy.bio}
                </p>

                {/* Specialties */}
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Especialidades Clínicas:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {psy.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-medium bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact info for psychologists */}
                <div className="pt-1 text-[11px] text-slate-500 space-y-0.5 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{psy.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{psy.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 pt-2.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block">Consulta (50 min)</span>
                <span className="text-sm font-black text-slate-900">S/. {psy.consultationFee}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {psy.id.startsWith('psy-') && !['psy-1', 'psy-2', 'psy-3', 'psy-4'].includes(psy.id) && (
                  <button
                    onClick={() => deletePsychologist(psy.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Retirar colega del directorio"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => handleBook(psy)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Separar Cita</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 space-y-2">
          <p className="text-sm font-semibold text-slate-800">No encontramos resultados para tu búsqueda.</p>
          <p className="text-xs text-slate-500">Prueba con otro término o registra un nuevo colega.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedApproach('Todos');
            }}
            className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-semibold text-xs cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};
