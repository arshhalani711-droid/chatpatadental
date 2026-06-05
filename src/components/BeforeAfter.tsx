import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MoveHorizontal, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Drag handlers
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleStopDragging = () => {
    isDragging.current = false;
  };

  // Add event listeners globally for smoother slide response
  useEffect(() => {
    const handleMouseUpGlobal = () => { isDragging.current = false; };
    const handleTouchEndGlobal = () => { isDragging.current = false; };

    window.addEventListener('mouseup', handleMouseUpGlobal);
    window.addEventListener('touchend', handleTouchEndGlobal);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpGlobal);
      window.removeEventListener('touchend', handleTouchEndGlobal);
    };
  }, []);

  return (
    <section id="before-after-gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Aesthetic Case Studies</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Smile Renovation Showcase
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light font-sans">
            Slide the interactive central control to experience porcelain veneers alignment and restoration transformation.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Comparative Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Comparative Slide box */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full max-w-[550px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 select-none cursor-ew-resize"
              onMouseDown={() => { isDragging.current = true; }}
              onTouchStart={() => { isDragging.current = true; }}
              onMouseMove={(e) => handleMove(e.clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            >
              
              {/* BEFORE IMAGE (Full Background) */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBycv6GOFXzyE-seVenS3bU-IBttYSm8ek2n5ThlbP7Rc0DHlyudWWTcJpbw3FbSZYhoWf17wM96yayTKr6ex3_PK54fUgjwZDnYjoFH2goAVn2bxUBCw2VvPc0Qtxwvt3c3K99YKq6jcaJQ4NOjiP3RGFQnJgJYcWsmG0yYmNAnSHfUtYiFwvwd84tnNq8T1jEJK7BTmHk6NqLmtYdbSlEhIthOjv9kDX6pxvglaYW955Z4ogzqe5HPxm4J8OachpxwTWMmzWNepk"
                alt="Before Alignment Surgery"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-md pointer-events-none uppercase">
                Original Alignment
              </div>

              {/* AFTER IMAGE (Clip Frame, stacked on top) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfPH7VSGOnMWFuWyTHNWl5HKnk_gJL5wePWv237_NvTo2DaUyS95TmErs1M-uW3qOLn6LL5jlOIT6Tii7J8G4h4MKO26x7zDo-0Upr_rWlmUY3YVfRs9TdxWeREkVFtEfIL22yd9Ii-OYAkwKTcLUFnjq99AaX30ZHcJmhUrtjLj06SnoNP5Kff-Oz5y4BWXjfg02KmWGPddZ3j1Gvm6yFEkbSZHl1ZM33mifUBFf3ZOJsi-G8MnJLaiEvzxc9qTZ3tcRKGrnLCww"
                  alt="After Lumina Cosmetic Renewal"
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-teal-600/90 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-md pointer-events-none uppercase flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-300 animate-pulse" />
                  Lumina Ceramic Completed
                </div>
              </div>

              {/* SLIDER LINE & HANDLE CAP */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center shadow-2xl border-2 border-white pointer-events-none">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>

            </div>
          </div>

          {/* Details & Patient Feedback Text block */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            <span className="text-xs font-mono font-bold text-teal-600 uppercase tracking-wider">// Aesthetic Case #048A</span>
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight font-sans">Handcrafted Porcelain Veneers</h3>
            <p className="text-slate-600 font-sans leading-relaxed font-light">
              This restoration case addresses enamel micro-erosion and crowding. Under Dr. Marcus Chen, custom multi-layer veneers were fabricated in our porcelain lab to align physical spacing parameters, restore micro-rotations, and create up to 8 shades lighter reflection safely.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3 items-center text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>Full-mouth bite re-alignment completed in 2 sessions.</span>
              </div>
              <div className="flex gap-3 items-center text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>Integrated Cool-Blue Zoom Laser bleach treatment.</span>
              </div>
              <div className="flex gap-3 items-center text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>Comfortable recovery period with zero gingival irritation.</span>
              </div>
            </div>

            {/* Micro receipt tag */}
            <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 [display:block]">PRACTITIONER</span>
                <span className="text-slate-700 font-bold font-sans">Dr. Marcus Chen</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 [display:block]">TREATMENT DURATION</span>
                <span className="text-slate-700 font-bold">2 Visits Complete</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
