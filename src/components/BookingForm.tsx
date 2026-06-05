import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DOCTORS, SERVICES } from '../data/dentalData';
import { Booking } from '../types';
import { Sparkles, Calendar, Clock, Stethoscope, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  preselectedServiceId: string;
  preselectedDoctorId: string;
  onAddAppointment: (appointment: Booking) => void;
  onNavigateToDashboard: () => void;
}

export default function BookingForm({
  preselectedServiceId,
  preselectedDoctorId,
  onAddAppointment,
  onNavigateToDashboard
}: BookingFormProps) {
  // Booking state
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || DOCTORS[0].id);
  const [treatmentId, setTreatmentId] = useState(preselectedServiceId || SERVICES[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Synchronize pre-selections
  useEffect(() => {
    if (preselectedServiceId) {
      setTreatmentId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedDoctorId) {
      setDoctorId(preselectedDoctorId);
    }
  }, [preselectedDoctorId]);

  // Generate next 7 days for quick picking
  const getDates = () => {
    const list = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip Sundays
      if (d.getDay() === 0) continue;
      
      const dayName = weekdays[d.getDay()];
      const monthName = months[d.getMonth()];
      const dateNum = d.getDate();
      const fullISODate = d.toISOString().split("T")[0];
      
      list.push({ dayName, monthName, dateNum, fullISODate });
    }
    return list;
  };

  const dates = getDates();

  // Dynamic slots relative to doctors
  const timeSlots = [
    "09:00 AM", "10:30 AM", "11:00 AM", "01:00 PM", "02:30 PM", "03:30 PM", "05:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!patientName || !patientPhone || !patientEmail || !date || !time) {
      setFormError("Please select an appointment date, choose a time slot, and fill in all required patient information.");
      return;
    }

    const newBooking: Booking = {
      id: "book_" + Math.random().toString(36).substr(2, 9),
      patientName,
      patientPhone,
      patientEmail,
      doctorId,
      treatmentId,
      date,
      time,
      status: "pending",
      notes,
      createdAt: new Date().toISOString()
    };

    onAddAppointment(newBooking);
    setIsSubmitted(true);
  };

  // Find info safely for receipt
  const activeDoc = DOCTORS.find(d => d.id === doctorId);
  const activeService = SERVICES.find(s => s.id === treatmentId);

  return (
    <section id="booking-section" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative gradient core inside section background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Priority Operations Scheduling</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Secure Dental Reservation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-light font-sans">
            Direct schedule allocation in under 2 minutes. Configured with secure medical data token encryption.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Outer Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden min-h-[480px]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {formError && (
                <div role="alert" className="p-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 animate-ping" />
                  <span>{formError}</span>
                </div>
              )}
              
              {/* Step 1: Select Practitioner and Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <User className="h-4 w-4 text-teal-600" /> Choose Dental Practitioner
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="mt-2 w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {DOCTORS.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Stethoscope className="h-4 w-4 text-teal-600" /> Select Treatment Therapy
                  </label>
                  <select
                    value={treatmentId}
                    onChange={(e) => setTreatmentId(e.target.value)}
                    className="mt-2 w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.priceRange})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Date Picker list */}
              <div>
                <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Calendar className="h-4 w-4 text-teal-600" /> Choose Available Appointment Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-2">
                  {dates.map((dt) => (
                    <button
                      key={dt.fullISODate}
                      type="button"
                      onClick={() => setDate(dt.fullISODate)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${date === dt.fullISODate ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'}`}
                    >
                      <span className="text-[10px] font-mono leading-none tracking-wider text-slate-400">{dt.dayName}</span>
                      <span className="text-lg font-bold font-sans mt-1 leading-none">{dt.dateNum}</span>
                      <span className="text-[9px] font-semibold mt-1 font-sans">{dt.monthName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Time Picker Grid */}
              {date && (
                <div className="animate-fadeIn duration-500">
                  <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Clock className="h-4 w-4 text-teal-600" /> Choose Booking Slot Hour
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-3 px-4 rounded-xl border font-mono text-xs font-bold transition-all duration-200 cursor-pointer ${time === slot ? 'bg-teal-600 border-teal-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Personal Patient parameters */}
              <div className="border-t border-slate-100 pt-6">
                <label className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block mb-4">Patient Identification & Contacts</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-bold font-sans text-slate-500 uppercase">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Sophia Richardson"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold font-sans text-slate-500 uppercase">Secure Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 019-2834"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold font-sans text-slate-500 uppercase">E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="sophia@luxury.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>
                
                {/* Text area details */}
                <div className="mt-6">
                  <label className="text-[10px] font-bold font-sans text-slate-500 uppercase flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-slate-400" /> Principal Symptoms & Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., extreme cold sensitivity around lower molar, request sedation setup"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
                  />
                </div>
              </div>

              {/* Submit trigger */}
              <div className="border-t border-slate-100 pt-6 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Allocate Surgical Slot
                </button>
                <p className="text-[10px] text-zinc-400 mt-2 font-light">
                  By clicking, you secure priority reservation conforming to medical privacy safety.
                </p>
              </div>

            </form>
          ) : (
            /* CONGRATULATIONS SCREEN RECEIPT */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-10 text-center flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-bounce shadow-inner border border-emerald-100">
                <CheckCircle className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight font-sans">Slot Allocation Successful!</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto font-sans font-light">
                  Congratulations {patientName}. Your priority appointment is locked and sent directly to {activeDoc?.name}.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/50 p-5 w-full max-w-md text-left text-xs divide-y divide-slate-100 space-y-2.5">
                <div className="flex justify-between font-mono text-[9px] text-teal-700 pb-2.5 font-bold">
                  <span>RECEIPT NO: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  <span>STATUS: SECURE LOCK</span>
                </div>
                <div className="flex justify-between py-2 font-sans text-slate-600">
                  <span>Practitioner Assigned:</span>
                  <span className="font-semibold text-slate-800">{activeDoc?.name}</span>
                </div>
                <div className="flex justify-between py-2 font-sans text-slate-600">
                  <span>Therapy/Treatment:</span>
                  <span className="font-semibold text-slate-800">{activeService?.name}</span>
                </div>
                <div className="flex justify-between py-2 font-sans text-slate-600">
                  <span>Schedule Details:</span>
                  <span className="font-semibold text-slate-850 font-mono text-teal-800">
                    {date} at {time}
                  </span>
                </div>
                <div className="flex justify-between pt-2.5 font-sans text-[10px] text-slate-400">
                  <span>Clinic Contact Portal:</span>
                  <span>(555) 019-2834, open at 08:30 AM</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl text-xs transition duration-200 cursor-pointer"
                >
                  Schedule Another Appointment
                </button>
                <button
                  type="button"
                  onClick={onNavigateToDashboard}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-xs shadow-md transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-yellow-500 animate-pulse" />
                  View in Admin/Patient Portal
                </button>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
