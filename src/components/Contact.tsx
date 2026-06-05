import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    if (!name || !email || !message) {
      setContactError("Please fill out your name, status, and message.");
      return;
    }
    setIsSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact-section" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Connect With Chatpata</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Clinics Location & Inquiries
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Informative Sidebar (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left">
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 font-sans tracking-tight">Our Luxury Lounge</h3>
              <p className="text-sm text-slate-500 font-sans font-light leading-relaxed">
                Experience biological dentistry in our architectural lounge. We facilitate comfortable validation parking slots and custom digital registration setups.
              </p>

              {/* Informative details */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4 items-start text-xs text-slate-705">
                  <div className="p-2.5 bg-white shadow-xs rounded-xl border border-slate-100 text-teal-600 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Chatpata Suite</h4>
                    <p className="text-slate-550 mt-0.5">800 Ethereal Crest Parkway, Suite 50, San Francisco CA</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start text-xs text-slate-705">
                  <div className="p-2.5 bg-white shadow-xs rounded-xl border border-slate-100 text-teal-600 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Direct Inquiries</h4>
                    <p className="text-slate-550 mt-0.5">(555) 019-2834 — Priority Reception</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start text-xs text-slate-705">
                  <div className="p-2.5 bg-white shadow-xs rounded-xl border border-slate-100 text-teal-600 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Electronic Mail</h4>
                    <p className="text-slate-550 mt-0.5">concierge@luminadental.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start text-xs text-slate-705">
                  <div className="p-2.5 bg-white shadow-xs rounded-xl border border-slate-100 text-teal-600 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Clinical Hours</h4>
                    <p className="text-slate-550 mt-0.5">Monday – Friday: 08:30 AM – 06:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom static note banner */}
            <div className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center justify-between text-[11px] font-mono shrink-0">
              <span className="text-slate-400">GPS COORDINATES</span>
              <span className="text-teal-700 font-bold">37.7749° N, 122.4194° W</span>
            </div>

          </div>

          {/* Electronic Contact Form (4 Columns) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-left shadow-lg flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-slate-800 font-sans tracking-tight mb-4">Send Secure Message</h3>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4 my-auto">
                {contactError && (
                  <div role="alert" className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 animate-ping" />
                    <span>{contactError}</span>
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder=" Sophia Richardson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="sophia@luxury.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-sans">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your enquiry regarding veneers composite standard options..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-500/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5 text-teal-400" />
                  Transmit Inquiry
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-850 font-sans">Inquiry Dispatched</h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed max-w-[200px]">
                  Your direct secure message has been routed to our clinical caretakers. Expect contact within 8 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="text-xs font-semibold text-teal-600 flex items-center gap-1 hover:underline cursor-pointer pt-2"
                >
                  Send another <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Simulating Interactive Google Maps (4 Columns) */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-slate-200 group bg-slate-900 min-h-[300px] flex items-stretch">
            
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUV88Gvq4i6fuVRQsahIlFt3CGe_iwPf3o7SsJDE-vmjBu2tNr_Q-SbQW3S2xG59F-lZ5wqC10swT8av8pgH1CEzAka43e8pGOqx7KMb9fvsLp6i6aIoGMzjDW6UcXHDtx4IrZMBA0j8a8s6QQkiuCFX1Tw8LE2rSJBOAOfq0WRJk2orlY-3elVjeX6XLZzWTXBa_c3uBUNgAnoSJsIcvQp2PVB7_mIn9CXqr9tCmWBkNuolclWlpN8hOaK19HXcemgjYHmNS4KYI"
              alt="Lumina Location Map"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            
            {/* Dynamic Map HUD hover cover */}
            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-xs text-white border border-slate-800 font-mono text-[9px] px-3 py-1.5 rounded-lg pointer-events-none flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
              <span>MAP SATELLITE: LOCKED</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-teal-900/90 backdrop-blur-xs rounded-xl p-3 text-left pointer-events-none border border-teal-800/80">
              <h4 className="text-[11px] font-bold text-white font-sans uppercase">San Francisco Crest Suite</h4>
              <p className="text-[10px] text-teal-200/90 font-sans mt-0.5 leading-normal">
                Double validation parking slots situated right beside the executive central gardens.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
