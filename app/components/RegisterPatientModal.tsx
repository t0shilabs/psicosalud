import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { X, UserCheck, UserPlus, Phone, Mail, IdCard, Users, Check } from 'lucide-react';

export const RegisterPatientModal: React.FC = () => {
  const {
    isPatientModalOpen,
    setIsPatientModalOpen,
    patients,
    currentPatient,
    setCurrentPatient,
    registerPatient,
  } = useClinic();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dni: '',
    birthDate: '',
    emergencyContact: '',
  });

  if (!isPatientModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    registerPatient({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || '+51 900 000 000',
      dni: formData.dni.trim() || '12345678',
      birthDate: formData.birthDate || '1998-05-15',
      emergencyContact: formData.emergencyContact.trim() || 'Familiar cercano - 999 000 111',
    });

    setIsCreatingNew(false);
    setIsPatientModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <UserCheck className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Registro de Paciente</h3>
              <p className="text-teal-100 text-xs mt-0.5">
                Crea tu perfil clínico para separar citas y recibir recordatorios
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPatientModalOpen(false)}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Patient Switcher / Preview */}
          {!isCreatingNew && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pacientes Registrados
                </span>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(true)}
                  className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Registrar Nuevo Paciente</span>
                </button>
              </div>

              <div className="space-y-2">
                {patients.map((pat) => {
                  const isSelected = currentPatient?.id === pat.id;
                  return (
                    <div
                      key={pat.id}
                      onClick={() => setCurrentPatient(pat)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-500 ring-1 ring-teal-500'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                          isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {pat.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{pat.fullName}</p>
                          <p className="text-xs text-slate-500">
                            DNI: {pat.dni} · {pat.email}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-1 text-teal-600 text-xs font-semibold">
                          <Check className="w-4 h-4" />
                          <span>Activo</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPatientModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Continuar con Paciente Seleccionado
                </button>
              </div>
            </div>
          )}

          {/* New Patient Form */}
          {isCreatingNew && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm font-bold text-slate-800">Completa tus datos personales</span>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Volver a la lista
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombres y Apellidos Completos *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Camila Sofía Rojas"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Documento de Identidad (DNI/CE)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <IdCard className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="78945612"
                      value={formData.dni}
                      onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="paciente@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="+51 999 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contacto de Emergencia (Nombre y Teléfono)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ej. Roberto Rojas (Hermano) - 987 654 321"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm"
                >
                  Guardar Paciente
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
