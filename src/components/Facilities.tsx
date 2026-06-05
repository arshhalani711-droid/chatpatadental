import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FACILITIES } from '../data/dentalData';
import { ShieldCheck, Compass, Eye, Sparkles } from 'lucide-react';

export default function Facilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="facilities-section" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Inside Chatpata Studio</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Surgical-Grade Clinical Spaces
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light font-sans">
            Explore our state-of-the-art biological treatment chambers configured with advanced particulate cleanroom air filtration.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Navigation Button Tabs */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {FACILITIES.map((fac, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer relative ${activeIndex === idx ? 'bg-white border-teal-500 shadow-xl scale-102' : 'bg-white/40 border-slate-200/60 hover:bg-white hover:border-slate-300'}`}
              >
                {activeIndex === idx && (
                  <div className="absolute top-0 right-0 overflow-hidden w-8 h-8 flex justify-end items-start">
                    <span className="w-16 h-16 bg-teal-500/10 rotate-45 transform translate-x-8 -translate-y-8 flex items-center justify-center font-mono text-teal-700" />
                  </div>
                )}
                
                <div className={`p-2.5 rounded-xl ${activeIndex === idx ? 'bg-teal-500/10 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="text-left">
                  <h3 className="text-sm font-semibold text-slate-800 font-sans tracking-tight">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-sans font-light">
                    {fac.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Image display with transitions */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="relative w-full max-w-[650px] aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  src={FACILITIES[activeIndex].image}
                  alt={FACILITIES[activeIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Glowing overlay filter */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Information overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-left text-white pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-teal-300 font-bold uppercase flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> SECURE STERILE STANDARD CLASS 100
                </span>
                <h4 className="text-lg font-semibold font-sans mt-1.5">{FACILITIES[activeIndex].title}</h4>
                <p className="text-xs text-slate-300 font-light mt-1 font-sans leading-relaxed">
                  {FACILITIES[activeIndex].desc}
                </p>
              </div>

              {/* Interactive Scope HUD */}
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white border border-slate-700 font-mono text-[9px] px-3 py-1.5 rounded-lg pointer-events-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>PRESSURE: BALANCED</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
