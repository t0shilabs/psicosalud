import React from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { X, Calendar, Clock, Video, MapPin, AlertCircle, CheckCircle2, User, ChevronRight } from 'lucide-react';

export const MyAppointmentsModal: React.FC = () => {
  const {
    isAppointmentsModalOpen,
    setIsAppointmentsModalOpen,
    appointments,
    cancelAppointment,
    setCurrentSection,
  } = useClinic();

  if (!isAppointmentsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-6">
        {/* Header - High Density */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 p-3.5 sm:p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Calendar className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">Mis Citas Agendadas</h3>
              <p className="text-teal-100 text-[11px] mt-0.5">
                Historial y próximas sesiones con tus psicólogos
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAppointmentsModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4 space-y-3 max-h-[75vh] overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto text-teal-600">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-slate-800">Aún no tienes citas registradas</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explora nuestro equipo de psicólogos y separa tu primera sesión en el horario que más te convenga.
              </p>
              <button
                onClick={() => {
                  setIsAppointmentsModalOpen(false);
                  setCurrentSection('booking');
                }}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold text-xs hover:bg-teal-700 shadow-xs cursor-pointer"
              >
                Agendar una Cita Ahora
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {appointments.map((item) => {
                const isCancelled = item.status === 'cancelada';
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-3 sm:p-3.5 transition-all ${
                      isCancelled
                        ? 'bg-slate-50/70 border-slate-200 opacity-70'
                        : 'bg-white border-slate-200 hover:border-teal-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.psychologistAvatar}
                          alt={item.psychologistName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                            {item.code}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm mt-0.5">{item.psychologistName}</h4>
                          <p className="text-[11px] text-slate-500">{item.serviceTitle}</p>
                        </div>
                      </div>

                      <div className="text-right sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1 ${
                            isCancelled
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isCancelled ? (
                            <>
                              <AlertCircle className="w-2.5 h-2.5" /> Cancelada
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5" /> Confirmada
                            </>
                          )}
                        </span>
                        <span className="text-xs font-bold text-slate-800 sm:mt-1">
                          S/. {item.totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="text-[11px]">Fecha: <strong>{item.date}</strong></span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="text-[11px]">Horario: <strong>{String(item.hour).padStart(2, '0')}:00 hrs</strong></span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.modality === 'online' ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                            <span className="text-cyan-800 font-semibold text-[11px]">Online (Video)</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="text-amber-800 font-semibold text-[11px]">Presencial (San Isidro)</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Patient detail */}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Paciente: <strong className="text-slate-700">{item.patientName}</strong> ({item.patientEmail})</span>
                      </div>

                      {!isCancelled && (
                        <button
                          type="button"
                          onClick={() => cancelAppointment(item.id)}
                          className="text-rose-600 hover:text-rose-800 text-[11px] font-semibold hover:underline cursor-pointer"
                        >
                          Cancelar Cita
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            Total citas: {appointments.length}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsAppointmentsModalOpen(false);
              setCurrentSection('booking');
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 shadow-xs cursor-pointer"
          >
            <span>Nueva Cita</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
