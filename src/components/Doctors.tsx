import { motion } from 'motion/react';
import { DOCTORS } from '../data/dentalData';
import { Mail, Phone, Clock, Award, Star, ThumbsUp, Linkedin, Twitter } from 'lucide-react';

interface DoctorsProps {
  onBookDoctor: (doctorId: string) => void;
}

export default function Doctors({ onBookDoctor }: DoctorsProps) {
  return (
    <section id="doctors-section" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Board-Certified Specialists</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Our Elite Clinical Specialists
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light font-sans">
            Meet our Ivy-League accredited medical board pioneering state-of-the-art robotic and aesthetic reconstructions.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group"
            >
              
              {/* Doctor portrait layout */}
              <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-sm border border-white/50 text-[10px] font-mono font-semibold text-teal-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span>On duty today</span>
                </div>

                {/* Rating display */}
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] text-white flex items-center gap-1 font-mono">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span>{doctor.rating}</span>
                </div>
              </div>

              {/* Informational area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-teal-700 font-mono text-[10px] font-bold uppercase tracking-wider">{doctor.role}</p>
                  <h3 className="text-base font-semibold text-slate-800 font-sans mt-1 group-hover:text-teal-700 transition-colors duration-200">
                    {doctor.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 font-medium font-sans mt-1.5 line-clamp-1 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-teal-600" />
                    {doctor.specialization}
                  </p>

                  <p className="text-[11px] text-slate-400 font-sans font-light mt-1.5 leading-relaxed line-clamp-2">
                    {doctor.bio}
                  </p>

                  {/* Micro credentials */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 font-sans">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{doctor.availability.days.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <ThumbsUp className="h-3.5 w-3.5 text-slate-300" />
                      <span>{doctor.consultationsCount}+ Successful Renovations</span>
                    </div>
                  </div>
                </div>

                {/* Links and CTA */}
                <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${doctor.email}`}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                      title={doctor.email}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => onBookDoctor(doctor.id)}
                    className="bg-slate-900 group-hover:bg-teal-700 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-xl text-xs tracking-wide transition-all duration-300 cursor-pointer"
                  >
                    Book Doctor
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
