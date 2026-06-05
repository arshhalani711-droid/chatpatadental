import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, ShieldAlert, Cpu, HeartHandshake, History, Award } from 'lucide-react';

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  const timelineData = [
    {
      year: "2012",
      title: "Founding Philosophy",
      desc: "Dr. Elena Lumina opened the boutique clinical studio with standard digital scanners, aiming to remove the cold, clinical ambiance of standard dentals.",
      achievement: "Zero metal, bio-compatible composites launch."
    },
    {
      year: "2017",
      title: "Robotic Guided Suite",
      desc: "Chatpata pioneered robotic guided implant anchors, combining real-time optical tracking cameras with robotic physical arms.",
      achievement: "Placed over 2,000 implants with 99.4% safety."
    },
    {
      year: "2021",
      title: "Biological Restoration",
      desc: "Complete implementation of CAD/CAM in-office ceramic mills, allowing custom crown fabrications in under 12 minutes.",
      achievement: "92% of prosthetic work completed in single visit."
    },
    {
      year: "2026",
      title: "Virtual AI Diagnostics",
      desc: "Integrated near-infrared light scanners and real-time deep checking systems to pre-emptively discover cavity structures before decay starts.",
      achievement: "Pioneered virtual clinical avatar guidance."
    }
  ];

  const highlights = [
    {
      title: "Surgical-Grade Robotics",
      desc: "Our automated arm guides implants within microscopic tolerances.",
      icon: Cpu
    },
    {
      title: "Biomimetic Composition",
      desc: "Porcelains match standard teeth thermal expandability, preventing fracture.",
      icon: Compass
    },
    {
      title: "Empathetic Connection",
      desc: "Interactive tablets and specialized soothing sound therapies relieve anxiety.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="about-section" className="py-24 bg-white relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-slate-50 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">
            Luxury Practice, Revolutionary Tech
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Redefining Dental Medicine
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Core Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Clinic Photo & Counter Banner */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-2xl filter blur-xl transform -rotate-1" />
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 relative bg-slate-900 aspect-video lg:aspect-[4/3] group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbGI8gAqOvlqStioI1KvgZ8JzmDNqJDmX59kMXElo_SAi_kFiOGWJTubKmpOzBtNeWNlpm_NvlABjTyhSKeD-yft_RiYT7D0a9yFgBk__NkUUMv-jtChSi1krAJmSuUhRDZH2JIth4NhpWTRA0GfUhN4zau60IvXeYSrX_o3kPOZXMa0KwcJ6yU7TYMUu-NwOi6zlXE-FewE6b27jFSgCPpweXoHFK3X2squnlSMNfzbamcW6Sbf-9QHq8asECog1mLEbbf9wsVdw"
                alt="Luxury Dental Lounge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              {/* Overlay Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/50 p-4 shadow-lg flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-600">
                  <Award className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400 font-sans">Recognized Practice</p>
                  <p className="text-sm font-semibold text-slate-800 font-sans">#1 Premium Digital Clinic Award 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Technology features */}
          <div className="lg:col-span-6 flex flex-col space-y-8 text-left">
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight font-sans">
              Ethereals of Biological Surgery
            </h3>
            <p className="text-slate-600 font-sans leading-relaxed font-light">
              We design with biological unity. That means never utilizing foreign metals or aggressive materials that fight native bone. Under surgical cleanroom guidelines, our clinicians integrate 3D diagnostics with custom restorations for absolute therapeutic protection.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col space-y-2 border-l border-slate-200 pl-4">
                    <div className="p-1 text-teal-600 w-fit">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-normal font-sans font-light">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Carousel - Interactive Time-hop */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-8 sm:p-10 text-left">
          <div className="flex items-center gap-2 mb-6">
            <History className="h-5 w-5 text-teal-600" />
            <h3 className="text-base font-semibold text-slate-800 font-sans tracking-wide uppercase">Interactive Clinical Chapters</h3>
          </div>

          {/* Timeline Navigation Dots & Lines */}
          <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 border-b border-slate-200/80 pb-6">
            {timelineData.map((node, index) => (
              <button
                key={index}
                onClick={() => setActiveTimeline(index)}
                className={`relative flex items-center md:flex-col gap-3 py-2 text-left md:text-center group transition-all duration-300 ${activeTimeline === index ? 'text-teal-600 scale-102 font-medium' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${activeTimeline === index ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'}`}>
                  {node.year}
                </div>
                <div className="flex flex-col text-left md:text-center">
                  <span className="text-xs font-semibold leading-none">{node.year}</span>
                  <span className="text-[11px] mt-0.5 max-w-[120px] overflow-hidden truncate">{node.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Displayed timeline block */}
          <div className="min-h-[140px] relative bg-white/60 p-6 rounded-xl border border-slate-200/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimeline}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-8 flex flex-col space-y-2">
                  <span className="text-teal-600 font-mono text-xs font-bold uppercase tracking-wider">CH. {activeTimeline + 1} // {timelineData[activeTimeline].year}</span>
                  <h4 className="text-lg font-semibold text-slate-800 font-sans">{timelineData[activeTimeline].title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans font-light">{timelineData[activeTimeline].desc}</p>
                </div>
                <div className="md:col-span-4 bg-teal-500/5 border border-teal-500/15 p-4 rounded-xl flex flex-col justify-center space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-800 font-sans flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3" /> Core Milestone
                  </p>
                  <p className="text-xs text-slate-700 font-medium font-sans mt-1">{timelineData[activeTimeline].achievement}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
