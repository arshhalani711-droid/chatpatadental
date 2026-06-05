import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/dentalData';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-roll active review
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials-section" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Absolute shapes */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-sky-200/25 rounded-full blur-3xlpointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Patient Experiences</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Smiles Renewed, Trust Earned
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel card container */}
        <div className="relative min-h-[290px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-slate-250 p-8 sm:p-10 shadow-xl relative text-left"
            >
              {/* Giant Quote icon behind */}
              <MessageSquareQuote className="absolute right-8 top-8 h-20 w-20 text-slate-100 -z-0 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Comment content */}
                <p className="text-slate-700 font-sans text-base leading-relaxed font-light italic">
                  "{TESTIMONIALS[activeIndex].comment}"
                </p>

                {/* Patient Signature */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 font-sans">
                      {TESTIMONIALS[activeIndex].patientName}
                    </h4>
                    <p className="text-[10px] text-slate-400 tracking-wider font-mono font-medium mt-0.5">
                      VERIFIED RECONSTRUCTION PATIENT // {TESTIMONIALS[activeIndex].date}
                    </p>
                  </div>

                  {/* Previous Next buttons inside card bottom */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition duration-200 cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
