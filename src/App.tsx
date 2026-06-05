import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS, SERVICES, BLOGS, TESTIMONIALS } from './data/dentalData';
import { Booking, PatientRecord, Blog, Testimonial } from './types';
import { LANGUAGES, TRANSLATIONS, Language } from './translations';
import { useTranslation } from './context/TranslationContext';

// Importing components
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import BookingForm from './components/BookingForm';
import BeforeAfter from './components/BeforeAfter';
import Facilities from './components/Facilities';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BlogList from './components/Blog';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';

import { Sparkles, Calendar, Menu, X, Landmark, Compass, Clock, MapPin, Phone, Mail, Globe, ChevronDown } from 'lucide-react';

export default function App() {
  // Mobile menu control
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Unified global Language state from TranslationContext
  const { lang, setLanguage, t } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const staticT = TRANSLATIONS[lang] || TRANSLATIONS.en;


  // Core Global States synchronizing Booking and Dashboard Portal
  const [appointments, setAppointments] = useState<Booking[]>([
    {
      id: "book_sophia_01",
      patientName: "Sophia Richardson",
      patientPhone: "(555) 019-2834",
      patientEmail: "sophia@luxury.com",
      doctorId: "dr-elena-lumina",
      treatmentId: "porcelain-veneers",
      date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // 2 days from now
      time: "10:30 AM",
      status: "approved",
      notes: "Lower anterior enamel alignment configuration review",
      createdAt: new Date().toISOString()
    },
    {
      id: "book_alex_02",
      patientName: "Alexander Vance",
      patientPhone: "(555) 123-4567",
      patientEmail: "alex@vance.com",
      doctorId: "dr-julian-vane",
      treatmentId: "robotic-implants",
      date: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0], // 4 days from now
      time: "02:30 PM",
      status: "pending",
      notes: "Request surgical sedation configuration details",
      createdAt: new Date().toISOString()
    }
  ]);

  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>([
    {
      id: "pat_sophia",
      name: "Sophia Richardson",
      phone: "(555) 019-2834",
      email: "sophia@luxury.com",
      lastVisit: "2026-05-18",
      status: "Active",
      diagnostics: "Porcelain laminate mockup test complete. Good tissue health.",
      treatmentPlan: "Affix porcelain veneer structures lower molar corridor"
    },
    {
      id: "pat_alexander",
      name: "Alexander Vance",
      phone: "(555) 123-4567",
      email: "alex@vance.com",
      lastVisit: "2026-06-01",
      status: "Active",
      diagnostics: "Dental implants titanium bone integration solid. Clean scans.",
      treatmentPlan: "CAD/CAM zirconia crown placement surgery"
    },
    {
      id: "pat_emily",
      name: "Emily Zhao",
      phone: "(555) 987-6543",
      email: "emily.zhao@decor.com",
      lastVisit: "2026-05-30",
      status: "Active",
      diagnostics: "Slight gingival friction quadrant 4.",
      treatmentPlan: "Prophylactic cleanings + cool-blue laser whitening bleach"
    }
  ]);

  const [blogsList, setBlogsList] = useState<Blog[]>(BLOGS);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(
    TESTIMONIALS.map((t, idx) => ({ ...t, id: `testi_${idx}`, approved: true }))
  );

  // States handling smooth landing selection to booking pre-population
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-fill selection triggers
  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection('booking-section');
  };

  const handleBookDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    scrollToSection('booking-section');
  };

  // Local add callbacks passed to BookingForm
  const handleAddNewAppointment = (newApp: Booking) => {
    // Add to appointments
    setAppointments((prev) => [newApp, ...prev]);

    // Check if patient email already exists, if not, enroll a profile!
    const exists = patientRecords.some(p => p.email.toLowerCase() === newApp.patientEmail.toLowerCase());
    if (!exists) {
      const newRec: PatientRecord = {
        id: "pat_" + Math.random().toString(36).substr(2, 5),
        name: newApp.patientName,
        phone: newApp.patientPhone,
        email: newApp.patientEmail,
        lastVisit: newApp.date,
        status: "Active",
        diagnostics: `Awaiting initial scan under practitioner assigned. Notes: ${newApp.notes || "None"}`,
        treatmentPlan: "Pending post-consultation mapping strategy."
      };
      setPatientRecords((prev) => [...prev, newRec]);
    }
  };

  const navMenuItems = [
    { label: staticT.nav.about, id: "about-section" },
    { label: staticT.nav.services, id: "services-section" },
    { label: staticT.nav.doctors, id: "doctors-section" },
    { label: staticT.nav.gallery, id: "before-after-gallery" },
    { label: staticT.nav.spaces, id: "facilities-section" },
    { label: staticT.nav.pricing, id: "pricing-section" },
    { label: staticT.nav.blogs, id: "blogs-section" },
    { label: staticT.nav.contact, id: "contact-section" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-teal-500 selection:text-white flex flex-col font-sans antialiased">
      
      {/* Premium Floating Header Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Elegant display logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 cursor-pointer text-left">
            <div className="p-2.5 bg-slate-900 rounded-xl text-teal-400">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-950 font-sans tracking-tight">Chatpata Dental</h1>
              <p className="text-[9px] font-mono tracking-widest text-teal-700 font-bold uppercase leading-none">{staticT.header.subLogo}</p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-semibold text-slate-600 hover:text-teal-700 transition duration-150 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Direct CTA Header buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Elegant custom language switcher dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                onBlur={() => setTimeout(() => setIsLangDropdownOpen(false), 200)}
                className="px-3 py-2 border border-slate-200/80 hover:bg-slate-50 flex items-center gap-1.5 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
                aria-label="Toggle language menu"
                id="lang-selector-btn"
              >
                <Globe className="h-3.5 w-3.5 text-slate-500" />
                <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
                <span className="uppercase font-mono">{lang}</span>
                <ChevronDown className={`h-3 w-3 transition duration-150 ${isLangDropdownOpen ? 'rotate-180': ''}`} />
              </button>
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200/80 rounded-xl shadow-xl overflow-hidden z-50 py-1"
                  >
                    {LANGUAGES.map((langItem) => (
                      <button
                        key={langItem.code}
                        onMouseDown={(e) => {
                          e.preventDefault(); // prevent blur before selection triggers
                          setLanguage(langItem.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs font-medium font-sans flex items-center justify-between transition cursor-pointer ${
                          lang === langItem.code ? 'text-teal-700 bg-teal-50/40 font-semibold' : 'text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{langItem.flag}</span>
                          <span>{langItem.name}</span>
                        </span>
                        {lang === langItem.code && (
                          <span className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection('dashboard-system')}
              className="px-4 py-2 hover:bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
            >
              {staticT.header.dashboard}
            </button>
            <button
              onClick={() => scrollToSection('booking-section')}
              className="px-4 py-2 bg-slate-900 text-teal-450 hover:text-teal-350 text-white font-bold rounded-lg text-xs tracking-wider transition hover:scale-101 active:scale-99 cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="h-3.5 w-3.5" /> {staticT.header.bookSlot}
            </button>
          </div>

          {/* Mobile Hamburguer selector */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Simple Mobile language inline selector representation */}
            <div className="flex gap-1 flex-wrap justify-end max-w-[200px]">
              {LANGUAGES.slice(0, 6).map((langItem) => (
                <button
                  key={langItem.code}
                  onClick={() => setLanguage(langItem.code)}
                  className={`px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase transition ${
                    lang === langItem.code
                      ? 'border-teal-600 bg-teal-600 text-white'
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                  }`}
                  title={langItem.name}
                >
                  <span>{langItem.flag}</span>
                </button>
              ))}
              {/* Dropdown triggers other languages easily for perfect premium access */}
              <select 
                value={lang} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="px-1 py-0.5 rounded border border-slate-200 text-[9px] font-bold uppercase bg-white text-slate-700 cursor-pointer"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.code.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => scrollToSection('booking-section')}
              className="p-2 bg-slate-900 text-teal-400 rounded-xl text-xs font-bold"
              title="Secure scheduling slot"
            >
              <Calendar className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Slide Layout */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-slate-200 z-30 shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm font-semibold text-slate-700 hover:text-teal-700 py-1 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-4 pt-4 border-t border-slate-100 shrink-0">
                <button
                  onClick={() => scrollToSection('dashboard-system')}
                  className="flex-1 py-3 text-center bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  {staticT.header.dashboard}
                </button>
                <button
                  onClick={() => scrollToSection('booking-section')}
                  className="flex-1 py-3 text-center bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  {staticT.header.bookSlotNow}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Body Wrapper */}
      <main className="flex-1">
        
        {/* HERO */}
        <Hero
          onBookClick={() => scrollToSection('booking-section')}
          onServicesClick={() => scrollToSection('services-section')}
          onExploreClinicClick={() => scrollToSection('about-section')}
        />

        {/* CLINIC ABOUT AND REPUTATION TIMELINE */}
        <About />

        {/* 10 DETAILED SERVICES */}
        <Services onBookService={handleBookService} />

        {/* BEFORE AFTER SLIDER SHIELD */}
        <BeforeAfter />

        {/* REGISTERED CLINICAL SPECIALISTS */}
        <Doctors onBookDoctor={handleBookDoctor} />

        {/* FACILITY SPACES GUEST WALK */}
        <Facilities />

        {/* TRANSPARENT PACKAGE RATE SETS + MORTGAGE CALCULATOR */}
        <Pricing />

        {/* REVOLVING CUSTOMER REVIEWS */}
        <Testimonials />

        {/* SECURE RESERVATION BOOKING FORM */}
        <BookingForm
          preselectedServiceId={selectedServiceId}
          preselectedDoctorId={selectedDoctorId}
          onAddAppointment={handleAddNewAppointment}
          onNavigateToDashboard={() => scrollToSection('dashboard-system')}
        />

        {/* DEDICATED APPOINTMENTS AND MANAGEMENT DASHBOARD PORTAL */}
        <Dashboard
          appointments={appointments}
          patientRecords={patientRecords}
          blogs={blogsList}
          testimonials={testimonialsList}
          onUpdateAppointments={setAppointments}
          onUpdatePatientRecords={setPatientRecords}
          onUpdateBlogs={setBlogsList}
          onUpdateTestimonials={setTestimonialsList}
        />

        {/* HYGIENE JOURNAL GUIDELINE LIBRARY */}
        <BlogList />

        {/* SECURE MAP CONTACT RESERVATION SECTION */}
        <Contact />

      </main>

      {/* ORAL ASSISTANT FLOATING CHAT COMPONENT */}
      <Chatbot />

      {/* LUXURY DESIGN CLINICAL FOOTER */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 py-16 text-left font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
            
            {/* Branding division */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-slate-900 rounded-xl text-teal-400">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">Chatpata Dental</h3>
                  <p className="text-[9px] font-mono tracking-widest text-teal-400 font-bold uppercase">{staticT.header.biologicalSurgery}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Pioneering state-of-the-art robotic prosthetic aligners and biomimetic dental reconstructions safely.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 text-xs font-sans font-light">
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-teal-400">{staticT.footer.treatments}</h4>
              <ul className="space-y-2.5 text-slate-350">
                <li><button onClick={() => handleBookService('porcelain-veneers')} className="hover:text-white cursor-pointer text-left">Porcelain Veneers</button></li>
                <li><button onClick={() => handleBookService('robotic-implants')} className="hover:text-white cursor-pointer text-left">Robotic Implants</button></li>
                <li><button onClick={() => handleBookService('dental-crowns')} className="hover:text-white cursor-pointer text-left">3D CAD Crowns</button></li>
                <li><button onClick={() => handleBookService('laser-whitening')} className="hover:text-white cursor-pointer text-left">Zoom Laser Light</button></li>
              </ul>
            </div>

            {/* Clinical Hours */}
            <div className="space-y-4 text-xs font-sans font-light text-slate-350">
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-teal-400">{staticT.footer.admittance}</h4>
              <div className="space-y-2">
                <p><span className="font-semibold text-white">{staticT.footer.monFri}:</span> 08:30 AM – 06:00 PM</p>
                <p><span className="font-semibold text-white">{staticT.footer.saturdays}:</span> 09:00 AM – 02:00 PM ({staticT.footer.emergencyOnly})</p>
                <p className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span>{staticT.footer.onDuty}</span>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4 text-xs font-sans font-light text-slate-350">
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-teal-400">{staticT.footer.headquarters}</h4>
              <div className="space-y-2">
                <p className="flex items-start gap-2"><MapPin className="h-4 w-4 text-slate-400 shrink-0" /> 800 Ethereal Crest Parkway, Suite 50, San Francisco CA</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" /> (555) 019-2834</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" /> concierge@luminadental.com</p>
              </div>
            </div>

          </div>

          {/* Secure compliance disclaimer banner */}
          <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-400">
            <p>© 2026 Chatpata Dental Studio. {staticT.footer.rightsReserved}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">{staticT.footer.privacy}</a>
              <a href="#" className="hover:text-white">{staticT.footer.fda}</a>
              <a href="#" className="hover:text-white">{staticT.footer.insurance}</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
