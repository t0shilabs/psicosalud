import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { X, UserPlus, Image, Award, Clock, DollarSign, Check, AlertCircle } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1594824813576-0046b4129b00?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
];

const AVAILABLE_SPECIALTY_OPTIONS = [
  'Ansiedad y Estrés',
  'Depresión y Estado de Ánimo',
  'Terapia de Pareja',
  'Psicología Infantil',
  'Adolescentes',
  'Duelo y Pérdida',
  'Autoestima y Crecimiento',
  'TOC y Fobias',
  'Evaluación Psicológica',
  'Trauma y EMDR',
];

export const RegisterPsychologistModal: React.FC = () => {
  const { isColleagueModalOpen, setIsColleagueModalOpen, addPsychologist } = useClinic();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    colegiatura: '',
    primaryTitle: '',
    secondaryTitle: '',
    approach: 'Terapia Cognitivo-Conductual (TCC)',
    experienceYears: 5,
    consultationFee: 120,
    bio: '',
    avatarUrl: PRESET_AVATARS[0],
    customAvatarUrl: '',
    startHour: 9,
    endHour: 18,
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    'Ansiedad y Estrés',
    'Autoestima y Crecimiento',
  ]);

  const [error, setError] = useState<string | null>(null);

  if (!isColleagueModalOpen) return null;

  const handleSpecialtyToggle = (spec: string) => {
    if (selectedSpecialties.includes(spec)) {
      if (selectedSpecialties.length > 1) {
        setSelectedSpecialties(selectedSpecialties.filter((s) => s !== spec));
      }
    } else {
      setSelectedSpecialties([...selectedSpecialties, spec]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.colegiatura.trim()) {
      setError('Por favor completa los campos obligatorios (Nombre, Correo y Colegiatura).');
      return;
    }

    const titlesList: string[] = [];
    if (formData.primaryTitle.trim()) titlesList.push(formData.primaryTitle.trim());
    if (formData.secondaryTitle.trim()) titlesList.push(formData.secondaryTitle.trim());
    if (titlesList.length === 0) {
      titlesList.push('Licenciado/a en Psicología Clínica');
    }

    const avatarFinal = formData.customAvatarUrl.trim() || formData.avatarUrl;

    addPsychologist({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || '+51 980 000 000',
      titles: titlesList,
      colegiatura: formData.colegiatura.trim(),
      specialties: selectedSpecialties,
      approach: formData.approach,
      experienceYears: Number(formData.experienceYears) || 3,
      bio: formData.bio.trim() || 'Profesional de la psicología dedicado al acompañamiento clínico de calidad con calidez y rigor ético.',
      avatarUrl: avatarFinal,
      consultationFee: Number(formData.consultationFee) || 120,
      availableDays: [1, 2, 3, 4, 5],
      workingHours: {
        start: Number(formData.startHour) || 9,
        end: Number(formData.endHour) || 18,
      },
      unavailableSlots: [],
    });

    setIsColleagueModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <UserPlus className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Registro de Colega Psicólogo</h3>
              <p className="text-teal-100 text-xs mt-0.5">
                Incorpora a un colega al equipo médico con sus títulos y credenciales oficiales
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsColleagueModalOpen(false)}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section: Datos Personales & Contacto */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b pb-1">
              <Award className="w-4 h-4 text-teal-600" />
              1. Datos Personales y Profesionales
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre Completo con Título *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Dra. Valeria Campos Mendoza"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  N° de Colegiatura Profesional (C.Ps.P.) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. C.Ps.P. 26580"
                  value={formData.colegiatura}
                  onChange={(e) => setFormData({ ...formData, colegiatura: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico Institucional/Personal *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@psicosalud-clinica.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono / WhatsApp de Contacto
                </label>
                <input
                  type="tel"
                  placeholder="+51 981 000 111"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Títulos y Grados Académicos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b pb-1">
              <Award className="w-4 h-4 text-teal-600" />
              2. Títulos y Grados Académicos
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Título Profesional Principal
              </label>
              <input
                type="text"
                placeholder="Ej. Licenciada en Psicología Clínica - Univ. Nacional Mayor de San Marcos"
                value={formData.primaryTitle}
                onChange={(e) => setFormData({ ...formData, primaryTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Posgrado / Maestría / Diplomado
              </label>
              <input
                type="text"
                placeholder="Ej. Magíster en Psicoterapia Breve y Sistémica - Univ. de Salamanca"
                value={formData.secondaryTitle}
                onChange={(e) => setFormData({ ...formData, secondaryTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enfoque Terapéutico
                </label>
                <select
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
                >
                  <option value="Terapia Cognitivo-Conductual (TCC)">Terapia Cognitivo-Conductual (TCC)</option>
                  <option value="Terapia Familiar Sistémica">Terapia Familiar Sistémica</option>
                  <option value="Terapia de Aceptación y Compromiso (ACT)">Terapia de Aceptación y Compromiso (ACT)</option>
                  <option value="Psicología Humanista y Gestalt">Psicología Humanista y Gestalt</option>
                  <option value="Neuropsicología Clínica">Neuropsicología Clínica</option>
                  <option value="Terapia del Juego Infantil">Terapia del Juego Infantil</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Años de Experiencia Clínica
                </label>
                <input
                  type="number"
                  min={1}
                  max={45}
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Specialties Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Especialidades de Atención (Selecciona una o más)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SPECIALTY_OPTIONS.map((spec) => {
                  const isSelected = selectedSpecialties.includes(spec);
                  return (
                    <button
                      type="button"
                      key={spec}
                      onClick={() => handleSpecialtyToggle(spec)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 font-medium'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{spec}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section: Foto del Profesional */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b pb-1">
              <Image className="w-4 h-4 text-teal-600" />
              3. Fotografía Profesional
            </h4>

            <p className="text-xs text-slate-500">
              Selecciona una fotografía clínica predefinida o ingresa la URL de la foto de tu colega:
            </p>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-teal-600 shadow-sm shrink-0">
                <img
                  src={formData.customAvatarUrl.trim() || formData.avatarUrl}
                  alt="Vista previa de foto"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <input
                  type="url"
                  placeholder="O pega URL de foto personalizada (https://...)"
                  value={formData.customAvatarUrl}
                  onChange={(e) => setFormData({ ...formData, customAvatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, avatarUrl: url, customAvatarUrl: '' })}
                      className={`w-10 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        formData.avatarUrl === url && !formData.customAvatarUrl
                          ? 'border-teal-600 scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Tarifa, Horarios y Bio */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b pb-1">
              <Clock className="w-4 h-4 text-teal-600" />
              4. Tarifa por Sesión y Horarios
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tarifa por Sesión (S/.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min={50}
                    max={500}
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hora de Inicio (24h)
                </label>
                <input
                  type="number"
                  min={7}
                  max={14}
                  value={formData.startHour}
                  onChange={(e) => setFormData({ ...formData, startHour: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hora de Fin (24h)
                </label>
                <input
                  type="number"
                  min={15}
                  max={22}
                  value={formData.endHour}
                  onChange={(e) => setFormData({ ...formData, endHour: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Biografía y Presentación Profesional
              </label>
              <textarea
                rows={3}
                placeholder="Breve reseña sobre su trayectoria clínica, especialidad y forma de trabajo..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t">
            <button
              type="button"
              onClick={() => setIsColleagueModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Guardar y Registrar Colega
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
