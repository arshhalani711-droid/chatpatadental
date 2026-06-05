import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Star, Users } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
  onExploreClinicClick: () => void;
}

export default function Hero({ onBookClick, onServicesClick, onExploreClinicClick }: HeroProps) {
  // Stats data
  const stats = [
    { label: "Successful Implants", value: "99.4%", desc: "Direct Clinical Rate", icon: ShieldCheck },
    { label: "Expert Consultants", value: "20+", desc: "Years Average Practice", icon: Star },
    { label: "Active Smiles Renewed", value: "15k+", desc: "Satisfied Patient Profiles", icon: Users }
  ];

  return (
    <div id="lumina-hero" className="relative min-h-screen bg-slate-50 flex flex-col justify-between overflow-hidden pt-24 pb-12">
      {/* Background visual art - Premium soft gradient and animated glowing shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-turquoise-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse duration-10000" />
        <div className="absolute bottom-1/4 -left-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#3b82f6]/10 to-teal-100/30 rounded-full blur-3xl" />
        
        {/* Floating background grids and subtle line patterns representing architectural design */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 px-4 py-2 rounded-full w-fit shadow-xs"
          >
            <Sparkles className="h-4 w-4 text-teal-600 animate-spin duration-3000" />
            <span className="text-xs font-semibold tracking-wider text-teal-800 uppercase font-sans">
              Ethereal Laser & robotic Dental Systems
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 leading-tight">
              Creating Healthy & <br />
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Beautiful Smiles
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-sans font-light leading-relaxed">
              Advanced Clinical Care utilizing modern guided technologies, laser precision therapy, and Ivy-League specialized dental artists for a premium healing experience.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <button
              id="hero-book-cta"
              onClick={onBookClick}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
            
            <button
              id="hero-services-cta"
              onClick={onServicesClick}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm font-medium px-6 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm cursor-pointer"
            >
              Learn Services
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              id="hero-explore-cta"
              onClick={onExploreClinicClick}
              className="flex items-center justify-center gap-1.5 text-teal-700 hover:text-teal-800 font-semibold px-4 py-2 rounded-lg text-xs leading-none transition-colors duration-300 cursor-pointer"
            >
              Explore 3D Suite
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            </button>
          </motion.div>

          {/* Core clinical assurances */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 max-w-lg"
          >
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans font-medium">Anesthesia</p>
              <p className="text-xs font-semibold text-slate-700 font-sans">100% Computerized</p>
            </div>
            <div className="text-left border-l border-slate-200 pl-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans font-medium">Crowns</p>
              <p className="text-xs font-semibold text-slate-700 font-sans">One-Visit CAD/CAM</p>
            </div>
            <div className="text-left border-l border-slate-200 pl-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans font-medium">Sterility</p>
              <p className="text-xs font-semibold text-slate-700 font-sans">Class 100 Standards</p>
            </div>
          </motion.div>
        </div>

        {/* 3D Visual Section - Glassmorphic display framing the interactive tooth rotating sculpture */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] sm:h-[420px] lg:h-[480px]">
          {/* Circular orbiting glowing elements */}
          <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] border border-dashed border-teal-500/20 rounded-full animate-spin duration-30000 z-0" />
          <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] border border-slate-200 rounded-full animate-pulse z-0" />

          {/* Premium Glassmorphic floating card framing the sculpture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] bg-white/75 backdrop-blur-md rounded-3xl border border-white/80 shadow-2xl p-6 flex flex-col justify-between items-center relative z-10 group cursor-grab active:cursor-grabbing"
            style={{ perspective: 1000 }}
          >
            <div className="w-full flex justify-between items-center text-slate-400 font-mono text-[10px]">
              <span>[LUMINA ROTATING MODEL]</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-700 font-semibold tracking-wider uppercase">3D Render</span>
              </div>
            </div>

            {/* Rotating sculpture image */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="relative w-44 h-44 sm:w-48 sm:h-48 flex justify-center items-center filter drop-shadow-[0_15px_15px_rgba(20,184,166,0.2)]"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABgQYHXs4Up2_PUpc3KxTscXBtemWaaUXAZHnCG9jzLYzEruEjBC0eKo6B_xuculVgaMuA8qbUrs455LFH0qnHSCwfw2AVYtDKcDbtTlbkFAf-rFwrQmZhZQSn4S7tUZ-FNpZk2No6AnWdGOupk-cdVuMbEMKbiRdl0S5U0cxt66-dMe_uCCKC0fvcY9gUBlkE988519FK4P1hJSndjpUt8OVik8-9KDknTDtRqIDZOMt5-njgzGmftx7uE5tZ0mXJwqODnMedVlQ"
                alt="3D Molar Sculpture"
                className="w-full h-full object-contain filter hover:brightness-105 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {/* Dynamic glowing core behind sculpture */}
              <div className="absolute inset-4 bg-teal-400/10 rounded-full filter blur-xl -z-10 animate-pulse" />
            </motion.div>

            {/* User instruction to interact */}
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-800 font-sans tracking-wide">Glass Molar Structure</p>
              <p className="text-[10px] text-slate-400 mt-1 font-sans">Simulating laser density alignment</p>
            </div>

            {/* Micro details */}
            <div className="absolute -bottom-3 -right-3 bg-slate-900 text-teal-400 font-mono text-[9px] px-3 py-1.5 rounded-lg shadow-md border border-slate-800">
              ROT_Z: 45°
            </div>
            <div className="absolute -top-3 -left-3 bg-white text-slate-800 font-sans text-[10px] font-semibold px-3 py-1.5 rounded-lg shadow-md border border-slate-100 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-yellow-500 animate-bounce" />
              Opaline finish
            </div>
          </motion.div>

          {/* Floating tech nodes */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-10 bg-white/90 backdrop-blur-xs shadow-lg border border-slate-100 rounded-xl p-3 z-20 flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span className="text-[10px] font-semibold text-slate-700 font-mono">LASER_ACTIVE</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-2 bottom-12 bg-white/90 backdrop-blur-xs shadow-lg border border-slate-100 rounded-xl p-3 z-20 flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-semibold text-slate-700 font-mono">BIOMETRIC: PASS</span>
          </motion.div>
        </div>
      </div>

      {/* Stats Board at footer with continuous micro animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 sm:mt-24 z-10 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/70 p-6 sm:p-8 shadow-xl">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className={`flex items-start gap-4 ${idx > 0 ? 'md:border-l md:border-slate-200 md:pl-8' : ''}`}
              >
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-semibold text-slate-900 tracking-tight font-sans">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-1 font-sans">{stat.label}</p>
                  <p className="text-xs text-slate-400 font-light mt-0.5 font-sans">{stat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
