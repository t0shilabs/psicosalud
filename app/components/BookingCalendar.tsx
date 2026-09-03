import React, { useState, useMemo } from 'react';
import { Psychologist, Appointment } from '@/app/types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Sunset, 
  Moon, 
  Check, 
  AlertCircle,
  CalendarCheck
} from 'lucide-react';

interface BookingCalendarProps {
  selectedPsychologist: Psychologist;
  selectedDate: string; // 'YYYY-MM-DD'
  onSelectDate: (dateIso: string) => void;
  selectedHour: number | null;
  onSelectHour: (hour: number | null) => void;
  appointments: Appointment[];
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAY_HEADERS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const DAY_NAMES_FULL = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedPsychologist,
  selectedDate,
  onSelectDate,
  selectedHour,
  onSelectHour,
  appointments,
}) => {
  // Calendar View month & year (initialized from selectedDate or September 2026)
  const [viewYear, setViewYear] = useState<number>(() => {
    if (selectedDate) {
      const y = parseInt(selectedDate.split('-')[0], 10);
      if (!isNaN(y)) return y;
    }
    return 2026;
  });

  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (selectedDate) {
      const m = parseInt(selectedDate.split('-')[1], 10) - 1;
      if (!isNaN(m)) return m;
    }
    return 8; // September (0-indexed)
  });

  // Base simulation date: September 3, 2026
  const minDateIso = '2026-09-03';

  // Navigate month
  const handlePrevMonth = () => {
    if (viewYear === 2026 && viewMonth <= 8) {
      return; // Do not go before September 2026
    }
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const canGoPrev = !(viewYear === 2026 && viewMonth <= 8);

  // Helper to format ISO date
  const toIso = (y: number, m: number, d: number) => {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  // Check availability for any date
  const checkDateAvailability = (dateIso: string) => {
    const parts = dateIso.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dateObj = new Date(y, m, d);

    if (dateIso < minDateIso) {
      return { isAvailable: false, isPast: true, reason: 'Fecha pasada', count: 0 };
    }

    const dayOfWeek = dateObj.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const availableDays = selectedPsychologist.availableDays || [1, 2, 3, 4, 5, 6];

    if (!availableDays.includes(dayOfWeek)) {
      return { 
        isAvailable: false, 
        isPast: false, 
        reason: dayOfWeek === 0 ? 'No atiende domingos' : 'Día no laboral', 
        count: 0 
      };
    }

    const start = selectedPsychologist.workingHours?.start || 8;
    const end = selectedPsychologist.workingHours?.end || 19;
    let freeCount = 0;

    for (let h = start; h <= end; h++) {
      const isUnavailable =
        selectedPsychologist.unavailableSlots?.some(
          (s) => s.date === dateIso && s.hour === h
        ) ||
        appointments.some(
          (a) =>
            a.psychologistId === selectedPsychologist.id &&
            a.date === dateIso &&
            a.hour === h &&
            a.status !== 'cancelada'
        );

      if (!isUnavailable) {
        freeCount++;
      }
    }

    if (freeCount === 0) {
      return { isAvailable: false, isPast: false, reason: 'Sin cupos disponibles', count: 0 };
    }

    return { isAvailable: true, isPast: false, reason: `${freeCount} horarios`, count: freeCount };
  };

  // Calendar days grid calculation
  const calendarGrid = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // In JS: getDay() gives 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
    // Monday start index: 0 = Mon, 1 = Tue, ..., 6 = Sun
    const leadingBlanks = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];

    // Blank cells before first of the month
    for (let i = 0; i < leadingBlanks; i++) {
      days.push({ type: 'blank', key: `blank-${i}` });
    }

    // Month days
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const iso = toIso(viewYear, viewMonth, dayNum);
      const avail = checkDateAvailability(iso);
      days.push({
        type: 'day',
        key: iso,
        dayNumber: dayNum,
        iso,
        ...avail,
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedPsychologist, appointments]);

  // Compute time slots for currently selected date
  const currentDaySlots = useMemo(() => {
    if (!selectedDate) return [];

    const dateAvail = checkDateAvailability(selectedDate);
    if (!dateAvail.isAvailable) return [];

    const start = selectedPsychologist.workingHours?.start || 8;
    const end = selectedPsychologist.workingHours?.end || 19;
    const slots = [];

    for (let h = start; h <= end; h++) {
      const isUnavailable =
        selectedPsychologist.unavailableSlots?.some(
          (s) => s.date === selectedDate && s.hour === h
        ) ||
        appointments.some(
          (a) =>
            a.psychologistId === selectedPsychologist.id &&
            a.date === selectedDate &&
            a.hour === h &&
            a.status !== 'cancelada'
        );

      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const label12 = `${String(hour12).padStart(2, '0')}:00 ${period}`;
      const label24 = `${String(h).padStart(2, '0')}:00`;

      let shift: 'mañana' | 'tarde' | 'noche' = 'mañana';
      if (h >= 19) shift = 'noche';
      else if (h >= 13) shift = 'tarde';

      slots.push({
        hour: h,
        label12,
        label24,
        shift,
        isAvailable: !isUnavailable,
      });
    }

    return slots;
  }, [selectedDate, selectedPsychologist, appointments]);

  // Split slots by shift
  const morningSlots = currentDaySlots.filter((s) => s.shift === 'mañana');
  const afternoonSlots = currentDaySlots.filter((s) => s.shift === 'tarde');
  const eveningSlots = currentDaySlots.filter((s) => s.shift === 'noche');

  // Friendly formatted text for selectedDate
  const selectedDateText = useMemo(() => {
    if (!selectedDate) return '';
    const parts = selectedDate.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dateObj = new Date(y, m, d);
    const dayName = DAY_NAMES_FULL[dateObj.getDay()];
    const monthName = MONTH_NAMES[m];
    return `${dayName} ${d} de ${monthName}, ${y}`;
  }, [selectedDate]);

  return (
    <div className="space-y-4">
      {/* 2-Step Layout: Step A (Calendar Date Selection) + Step B (Time Slot Selection) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* COLUMN 1: INTERACTIVE CALENDAR */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
          {/* Calendar Header with Month Navigation */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider">
                Paso 3.1
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-teal-600" />
                <span>Selecciona una Fecha Disponible</span>
              </h3>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-0.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                title={canGoPrev ? 'Mes anterior' : 'No disponible'}
                className={`p-1.5 rounded-lg transition-colors ${
                  canGoPrev 
                    ? 'text-slate-700 hover:bg-white hover:shadow-xs cursor-pointer' 
                    : 'text-slate-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-xs font-bold text-slate-800 px-2 min-w-[120px] text-center select-none">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                title="Mes siguiente"
                className="p-1.5 rounded-lg text-slate-700 hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAY_HEADERS.map((dh, idx) => (
              <div 
                key={dh} 
                className={`text-[11px] font-bold py-1 select-none ${
                  idx >= 5 ? 'text-amber-700 font-semibold' : 'text-slate-500'
                }`}
              >
                {dh}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarGrid.map((cell) => {
              if (cell.type === 'blank') {
                return (
                  <div 
                    key={cell.key} 
                    className="h-11 sm:h-12 rounded-xl bg-slate-50/40 border border-transparent" 
                  />
                );
              }

              const isSelected = selectedDate === cell.iso;
              const isAvailable = cell.isAvailable;

              return (
                <button
                  key={cell.key}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    if (isAvailable && cell.iso) {
                      onSelectDate(cell.iso);
                      onSelectHour(null); // Reset hour when date changes so user picks newly available slot
                    }
                  }}
                  title={
                    isAvailable
                      ? `${cell.dayNumber} de ${MONTH_NAMES[viewMonth]}: ${cell.count} horarios disponibles`
                      : cell.reason
                  }
                  className={`relative h-11 sm:h-12 rounded-xl text-center flex flex-col items-center justify-center transition-all p-1 select-none ${
                    isSelected
                      ? 'bg-teal-600 text-white font-bold shadow-md ring-2 ring-teal-500 ring-offset-1 z-10'
                      : isAvailable
                      ? 'bg-emerald-50/60 hover:bg-teal-100/70 border border-emerald-200 text-slate-800 hover:border-teal-400 font-semibold cursor-pointer active:scale-95'
                      : 'bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span className={`text-xs sm:text-sm leading-none ${isSelected ? 'text-white' : ''}`}>
                    {cell.dayNumber}
                  </span>

                  {/* Availability badge/dot */}
                  {isAvailable && (
                    <span 
                      className={`mt-1 text-[9px] leading-tight px-1 rounded-full font-bold ${
                        isSelected 
                          ? 'bg-teal-700 text-white' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {cell.count} cupos
                    </span>
                  )}

                  {!isAvailable && !cell.isPast && (
                    <span className="mt-0.5 text-[8px] text-slate-400 leading-none truncate max-w-full">
                      {cell.reason?.includes('domingos') ? 'Cerrado' : 'No aten.'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Con cupos disponibles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0" />
              <span>Fecha seleccionada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 shrink-0" />
              <span>No disponible / Cerrado</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: TIME SLOTS SELECTION FOR CHOSEN DATE */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
          {/* Header */}
          <div className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider">
                Paso 3.2
              </span>
              {selectedHour && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Horario Confirmado
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Selecciona tu Horario de Atención</span>
            </h3>

            {/* Selected Date banner */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-teal-50/70 border border-teal-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <div>
                  <span className="text-[10px] text-teal-700 font-bold block uppercase tracking-wide">
                    Fecha Seleccionada:
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 capitalize">
                    {selectedDateText || 'Ninguna fecha seleccionada'}
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-teal-800 font-bold bg-white px-2 py-1 rounded-lg border border-teal-200 shadow-2xs">
                {currentDaySlots.filter(s => s.isAvailable).length} horarios libres
              </span>
            </div>
          </div>

          {/* Time Slots Area */}
          {currentDaySlots.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <AlertCircle className="w-6 h-6 text-amber-500 mx-auto" />
              <h4 className="text-xs font-bold text-slate-800">
                No hay horarios disponibles para esta fecha
              </h4>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                El psicólogo seleccionado no atiende o ya no cuenta con turnos libres este día. Por favor elige una fecha en verde en el calendario.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {/* Turno Mañana */}
              {morningSlots.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Turno Mañana (08:00 AM - 12:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {morningSlots.map((slot) => {
                      const isSelected = selectedHour === slot.hour;
                      if (!slot.isAvailable) {
                        return (
                          <div
                            key={slot.hour}
                            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-center select-none"
                            title="Horario reservado"
                          >
                            <span className="text-xs font-medium line-through block">{slot.label12}</span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">Ocupado</span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={slot.hour}
                          type="button"
                          onClick={() => onSelectHour(slot.hour)}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm ring-2 ring-teal-500 ring-offset-1'
                              : 'bg-teal-50/50 hover:bg-teal-600 hover:text-white border-teal-200 text-teal-900 font-semibold active:scale-95'
                          }`}
                        >
                          <span className="text-xs block">{slot.label12}</span>
                          <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-teal-100' : 'text-teal-700'}`}>
                            {slot.label24} hrs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Turno Tarde */}
              {afternoonSlots.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Sunset className="w-3.5 h-3.5 text-orange-500" />
                    <span>Turno Tarde (01:00 PM - 06:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {afternoonSlots.map((slot) => {
                      const isSelected = selectedHour === slot.hour;
                      if (!slot.isAvailable) {
                        return (
                          <div
                            key={slot.hour}
                            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-center select-none"
                            title="Horario reservado"
                          >
                            <span className="text-xs font-medium line-through block">{slot.label12}</span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">Ocupado</span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={slot.hour}
                          type="button"
                          onClick={() => onSelectHour(slot.hour)}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm ring-2 ring-teal-500 ring-offset-1'
                              : 'bg-teal-50/50 hover:bg-teal-600 hover:text-white border-teal-200 text-teal-900 font-semibold active:scale-95'
                          }`}
                        >
                          <span className="text-xs block">{slot.label12}</span>
                          <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-teal-100' : 'text-teal-700'}`}>
                            {slot.label24} hrs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Turno Noche */}
              {eveningSlots.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Turno Noche (07:00 PM - 09:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {eveningSlots.map((slot) => {
                      const isSelected = selectedHour === slot.hour;
                      if (!slot.isAvailable) {
                        return (
                          <div
                            key={slot.hour}
                            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-center select-none"
                            title="Horario reservado"
                          >
                            <span className="text-xs font-medium line-through block">{slot.label12}</span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">Ocupado</span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={slot.hour}
                          type="button"
                          onClick={() => onSelectHour(slot.hour)}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm ring-2 ring-teal-500 ring-offset-1'
                              : 'bg-teal-50/50 hover:bg-teal-600 hover:text-white border-teal-200 text-teal-900 font-semibold active:scale-95'
                          }`}
                        >
                          <span className="text-xs block">{slot.label12}</span>
                          <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-teal-100' : 'text-teal-700'}`}>
                            {slot.label24} hrs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Selection Feedback Alert */}
          <div className="pt-2 border-t border-slate-100">
            {selectedHour ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <p>
                    <span className="font-bold">Cita agendada para: </span> 
                    {selectedDateText} a las <span className="font-bold">{String(selectedHour).padStart(2, '0')}:00 hrs</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectHour(null)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 cursor-pointer underline"
                >
                  Cambiar hora
                </button>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Por favor pulsa sobre un horario disponible para continuar con la confirmación.
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
