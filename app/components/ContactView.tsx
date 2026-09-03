import React, { useState } from 'react';
import { CLINIC_INFO } from '@/app/data/initialData';
import { useClinic } from '@/app/context/ClinicContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Navigation, 
  Car, 
  Train, 
  ShieldAlert,
  ExternalLink
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useClinic();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Orientación para primera cita',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Tu consulta ha sido enviada con éxito. Te responderemos en breve.');
    setTimeout(() => {
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Orientación para primera cita',
        message: '',
      });
      setIsSubmitted(false);
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6">
      {/* Header - High Density */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
          Canales de Atención
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Contacto y Ubicación
        </h1>
        <p className="text-xs text-slate-600">
          Estamos a tu disposición para orientarte sobre nuestros servicios, modalidades y citas. Comunícate por cualquiera de nuestros canales oficiales.
        </p>
      </div>

      {/* Grid: Map & Details + Direct Consultation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* LEFT: MAPA DE UBICACIÓN Y DATOS DE CONTACTO */}
        <div className="lg:col-span-6 space-y-4">
          {/* Stylized Location Map Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs space-y-3 p-3.5 sm:p-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Sede Principal San Isidro</h3>
                  <p className="text-[11px] text-slate-500">{CLINIC_INFO.address}</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Av.+Javier+Prado+Este+2450+San+Isidro+Lima"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-teal-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Visual Simulated Map Display */}
            <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <iframe
                title="Mapa de Ubicación Clínica PsicoSalud"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15605.344485547447!2d-77.0189032!3d-12.0905623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86211467439%3A0xe541785f7e6f8902!2sAv.+Javier+Prado+Este+2450%2C+San+Borja+15036!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
                className="w-full h-full border-0 grayscale-[20%] contrast-[1.05]"
                loading="lazy"
              ></iframe>

              {/* Floating clinic badge on map */}
              <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-1 rounded-lg shadow-xs border border-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Clínica PsicoSalud (Piso 8)</span>
              </div>
            </div>

            {/* Access details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-600">
              <div className="flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <Car className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 text-[11px] block">Estacionamiento:</span>
                  <span className="text-[10px] text-slate-500">Plazas para pacientes en sótano 1.</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <Train className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 text-[11px] block">Transporte Público:</span>
                  <span className="text-[10px] text-slate-500">A 2 cuadras del Metropolitano Javier Prado.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Teléfono Fijo & Central</h4>
              <p className="text-xs text-slate-600">{CLINIC_INFO.phone}</p>
              <p className="text-[10px] text-slate-400">Atención de 8:00 AM a 9:00 PM</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">WhatsApp Inmediato</h4>
              <p className="text-xs text-slate-600">{CLINIC_INFO.whatsapp}</p>
              <a
                href={`https://wa.me/51987654321?text=Hola,%20deseo%20información%20sobre%20citas%20en%20PsicoSalud`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-emerald-600 hover:underline block cursor-pointer"
              >
                Escribir por WhatsApp →
              </a>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Correo Electrónico</h4>
              <p className="text-xs text-slate-600">{CLINIC_INFO.email}</p>
              <p className="text-[10px] text-slate-400">Respuesta garantizada en 2h</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Horarios de Consulta</h4>
              <p className="text-xs text-slate-600">Lun - Sáb: 8:00 AM - 9:00 PM</p>
              <p className="text-[10px] text-slate-400">Dom: 9:00 AM - 2:00 PM (Online)</p>
            </div>
          </div>
        </div>

        {/* RIGHT: FORMULARIO DIRECTO DE CONSULTAS */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
              Formulario Confidencial
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Envíanos una Consulta Directa
            </h3>
            <p className="text-xs text-slate-500">
              Un psicólogo de nuestro comité de admisión revisará tu mensaje y te responderá de forma privada.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950">¡Mensaje Enviado con Éxito!</h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Hemos recibido tu solicitud de contacto. Nos comunicaremos contigo en menos de 2 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tu Nombre y Apellidos *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Andrés Morales"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="andres@correo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+51 987 654 321"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Asunto o Motivo de Consulta
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none bg-white cursor-pointer"
                >
                  <option value="Orientación para primera cita">Orientación para primera cita</option>
                  <option value="Consulta sobre Terapia Individual">Consulta sobre Terapia Individual</option>
                  <option value="Consulta sobre Terapia de Pareja">Consulta sobre Terapia de Pareja</option>
                  <option value="Consulta sobre Psicología Infantil">Consulta sobre Psicología Infantil</option>
                  <option value="Dudas sobre Modalidad Online o Presencial">Dudas sobre Modalidad Online o Presencial</option>
                  <option value="Convenio o Tarifas Especiales">Convenio o Tarifas Especiales</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detalle de tu Consulta *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe brevemente tus dudas o la situación para la que buscas apoyo psicológico..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Consulta Directa</span>
              </button>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota de emergencia:</strong> Si estás experimentando crisis aguda, llama gratis a la <strong>Línea 113 (opción 5)</strong> del MINSA.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
