import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/dentalData';
import { Service } from '../types';
import * as Icons from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import { formatPriceRange } from '../translations';

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const { t, lang } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Helper to render dynamic lucide icons
  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    // Dynamic fallback matching mapping
    switch (name) {
      case "Stethoscope":
        return <Icons.Stethoscope className={className} />;
      case "Sparkles":
        return <Icons.Sparkles className={className} />;
      case "Anchor":
        return <Icons.Anchor className={className} />;
      case "Activity":
        return <Icons.Activity className={className} />;
      case "Shuffle":
        return <Icons.Shuffle className={className} />;
      case "Award":
        return <Icons.Award className={className} />;
      case "Heart":
        return <Icons.Heart className={className} />;
      case "Shield":
        return <Icons.Shield className={className} />;
      case "Scissors":
        return <Icons.Scissors className={className} />;
      case "AlertTriangle":
        return <Icons.AlertTriangle className={className} />;
      default:
        return <Icons.Activity className={className} />;
    }
  };

  return (
    <section id="services-section" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">
            {t("Specialized Treatment Suites")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            {t("Our Elite Healthcare Services")}
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light font-sans">
            {t("Explore our curated selection of 10 fully digital dental treatments administered with surgical robotic support.")}
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid (10 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-2xl border border-slate-200/60 p-6 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between items-stretch text-left"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  {renderIcon(service.iconName, "h-5 w-5")}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors duration-300 mt-6 font-sans">
                  {t(service.name)}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed font-sans font-light mt-2 line-clamp-3">
                  {t(service.shortDesc)}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                <span className="text-[11px] font-mono font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded-sm">
                  {formatPriceRange(service.priceRange, lang)}
                </span>
                <span className="text-xs font-semibold text-teal-600 flex items-center gap-1 group-hover:underline">
                  {t("Compare Steps")} <Icons.ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Pop-up Service Detail Dialog */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 w-full max-w-3xl relative z-10 max-h-[85vh] overflow-y-auto overflow-x-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all duration-200 cursor-pointer"
              >
                <Icons.X className="h-5 w-5" />
              </button>

              {/* Header Title with Icon */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="p-3.5 bg-teal-500/10 text-teal-600 rounded-xl">
                  {renderIcon(selectedService.iconName, "h-6 w-6")}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 font-sans tracking-tight">
                    {t(selectedService.name)}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1"><Icons.DollarSign className="h-3.5 w-3.5 text-teal-600" /> {formatPriceRange(selectedService.priceRange, lang)}</span>
                    <span className="flex items-center gap-1"><Icons.Clock className="h-3.5 w-3.5 text-blue-500" /> {t(selectedService.duration)}</span>
                    <span className="flex items-center gap-1"><Icons.Heart className="h-3.5 w-3.5 text-red-400" /> {t("Recovery")}: {t(selectedService.recoveryTime)}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                {/* Left block description + steps */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">{t("Description")}</h4>
                    <p className="text-sm font-light text-slate-600 mt-1.5 leading-relaxed font-sans">
                      {t(selectedService.longDesc)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Icons.Workflow className="h-3.5 w-3.5 text-teal-600" /> {t("Step-by-Step Procedure")}
                    </h4>
                    <ol className="mt-2 text-xs space-y-2">
                      {selectedService.procedure.map((step, index) => (
                        <li key={index} className="flex gap-2.5 items-start text-slate-600">
                          <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[10px] text-slate-500 font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed font-sans">{t(step)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Right advantages checklist + Book Trigger */}
                <div className="flex flex-col justify-between space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Icons.CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> {t("Core Clinical Advantages")}
                    </h4>
                    <ul className="mt-3 text-xs space-y-2.5">
                      {selectedService.advantages.map((adv, index) => (
                        <li key={index} className="flex gap-2 items-start text-slate-700 font-semibold font-sans">
                          <Icons.Sparkles className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{t(adv)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Link inside modal */}
                  <div className="border-t border-slate-200/60 pt-4 mt-6">
                    <button
                      onClick={() => {
                        onBookService(selectedService.id);
                        setSelectedService(null);
                      }}
                      className="w-full bg-slate-900 group-hover:bg-teal-700 hover:bg-slate-800 text-white font-medium py-3.5 px-4 rounded-xl text-center text-xs flex justify-center items-center gap-2 transition-all duration-200 cursor-pointer"
                    >
                      <Icons.CalendarRange className="h-4 w-4" />
                      {t("Configure Appointment")}
                    </button>
                    <p className="text-[10px] text-zinc-400 text-center mt-2 font-sans font-light">
                      *{t("Initial digital diagnostics included in overall pricing scope.")}
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
