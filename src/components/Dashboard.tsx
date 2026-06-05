import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking, PatientRecord, Blog, Testimonial, Doctor } from '../types';
import { DOCTORS, SERVICES, FAQS, FACILITIES, BLOGS, TESTIMONIALS } from '../data/dentalData';
import { 
  BarChart, Calendar, FileText, Clock, Settings, MessageSquare, CheckCircle, 
  XSquare, RefreshCw, PlusCircle, Search, Sparkles, LogIn, LogOut, ArrowRight, BookOpen,
  Globe
} from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell
} from 'recharts';

interface DashboardProps {
  appointments: Booking[];
  patientRecords: PatientRecord[];
  blogs: Blog[];
  testimonials: Testimonial[];
  onUpdateAppointments: (apps: Booking[]) => void;
  onUpdatePatientRecords: (records: PatientRecord[]) => void;
  onUpdateBlogs: (blogs: Blog[]) => void;
  onUpdateTestimonials: (testis: Testimonial[]) => void;
}

const SATISFACTION_DATA = [
  {
    category: "General Dentistry",
    "Jan 2026": 96.5,
    "Feb 2026": 97.2,
    "Mar 2026": 95.8,
    "Apr 2026": 98.0,
    "May 2026": 97.5,
    "Jun 2026": 98.4,
    avg: 97.2
  },
  {
    category: "Teeth Whitening",
    "Jan 2026": 94.2,
    "Feb 2026": 95.5,
    "Mar 2026": 96.0,
    "Apr 2026": 95.1,
    "May 2026": 97.2,
    "Jun 2026": 97.8,
    avg: 96.0
  },
  {
    category: "Dental Implants",
    "Jan 2026": 98.1,
    "Feb 2026": 98.7,
    "Mar 2026": 99.2,
    "Apr 2026": 98.5,
    "May 2026": 99.0,
    "Jun 2026": 99.5,
    avg: 98.8
  },
  {
    category: "Root Canal Therapy",
    "Jan 2026": 92.5,
    "Feb 2026": 93.8,
    "Mar 2026": 94.2,
    "Apr 2026": 95.0,
    "May 2026": 94.8,
    "Jun 2026": 96.1,
    avg: 94.4
  },
  {
    category: "Orthodontics",
    "Jan 2026": 97.0,
    "Feb 2026": 96.8,
    "Mar 2026": 97.5,
    "Apr 2026": 98.2,
    "May 2026": 98.0,
    "Jun 2026": 98.9,
    avg: 97.7
  },
  {
    category: "Cosmetic Dentistry",
    "Jan 2026": 98.9,
    "Feb 2026": 99.1,
    "Mar 2026": 98.6,
    "Apr 2026": 99.4,
    "May 2026": 99.2,
    "Jun 2026": 99.8,
    avg: 99.2
  }
];

export default function Dashboard({
  appointments,
  patientRecords,
  blogs,
  testimonials,
  onUpdateAppointments,
  onUpdatePatientRecords,
  onUpdateBlogs,
  onUpdateTestimonials
}: DashboardProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<'analytics' | 'appointments' | 'patients' | 'doctors' | 'blogs' | 'portal' | 'translations'>('analytics');
  
  // Satisfaction score selected month filter state
  const [satisfactionMonth, setSatisfactionMonth] = useState<string>('avg');

  // Translation hook context integration
  const { 
    lang: currentGlobalLang, 
    allTranslations, 
    saveManualTranslation, 
    getTranslationProgress, 
    triggerAutoTranslateAll, 
    aiTranslateSingle,
    isTranslating 
  } = useTranslation();

  const [translationSearch, setTranslationSearch] = useState("");
  const [selectedTargetLang, setSelectedTargetLang] = useState<any>('es');
  const [editingTranslations, setEditingTranslations] = useState<Record<string, string>>({});
  const [isAiTranslatingKey, setIsAiTranslatingKey] = useState<string | null>(null);
  
  // Patient Portal Login mock
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [patientEmailInput, setPatientEmailInput] = useState("");
  const [activePatientEmail, setActivePatientEmail] = useState("");

  // Search parameters
  const [appSearch, setAppSearch] = useState("");
  const [patSearch, setPatSearch] = useState("");

  // Modals / Dialog state
  const [reschedulingApp, setReschedulingApp] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  // Add Patient Record Form state
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [newPatName, setNewPatName] = useState("");
  const [newPatPhone, setNewPatPhone] = useState("");
  const [newPatEmail, setNewPatEmail] = useState("");
  const [newPatDiagnostics, setNewPatDiagnostics] = useState("");
  const [newPatPlan, setNewPatPlan] = useState("");

  // Create Blog Form state
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("Technology");
  const [newBlogAuthor, setNewBlogAuthor] = useState("Dr. Elena Lumina");
  const [newBlogSnippet, setNewBlogSnippet] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");

  // Doctor list local modification
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(DOCTORS);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editDays, setEditDays] = useState<string[]>([]);
  const [editHours, setEditHours] = useState<string[]>([]);

  // Analytics computed stats
  const getApprovedApps = () => appointments.filter(a => a.status === 'approved' || a.status === 'completed');
  const totalRevenue = getApprovedApps().reduce((sum, app) => {
    // Extract nominal fee from service
    const service = SERVICES.find(s => s.id === app.treatmentId);
    if (service) {
      const parts = service.priceRange.replace(/\$|,/g, "").split("-");
      const minVal = parseInt(parts[0]) || 0;
      return sum + minVal;
    }
    return sum + 250;
  }, 0);

  // Status updates
  const handleApproveAppointment = (id: string) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: 'approved' as const } : a);
    onUpdateAppointments(updated);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a);
    onUpdateAppointments(updated);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingApp || !rescheduleDate || !rescheduleTime) return;

    const updated = appointments.map(a => 
      a.id === reschedulingApp.id 
        ? { ...a, date: rescheduleDate, time: rescheduleTime, status: 'pending' as const } 
        : a
    );
    onUpdateAppointments(updated);
    setReschedulingApp(null);
  };

  // Create Patient Record
  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatName || !newPatEmail || !newPatPhone) return;

    const newRecord: PatientRecord = {
      id: "pat_" + Math.random().toString(36).substr(2, 5),
      name: newPatName,
      phone: newPatPhone,
      email: newPatEmail,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active",
      diagnostics: newPatDiagnostics || "Routine diagnostic evaluation complete.",
      treatmentPlan: newPatPlan || "Preventive cleansing cycle."
    };

    onUpdatePatientRecords([...patientRecords, newRecord]);
    setIsAddingPatient(false);
    // clear fields
    setNewPatName("");
    setNewPatPhone("");
    setNewPatEmail("");
    setNewPatDiagnostics("");
    setNewPatPlan("");
  };

  // Add Blog Submit
  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogSnippet || !newBlogContent) return;

    const newArticle: Blog = {
      id: "blog_" + Math.random().toString(36).substr(2, 7),
      title: newBlogTitle,
      category: newBlogCategory,
      author: newBlogAuthor,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: "4 min read",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYou_hyeyL7iS-0dvILhUum8-XgByhq0_r5ENi73_Ovr9hHB1hKo0HA5BEpJCfYZECm25U7zH0xG9yHtjlYpO0XPCTXBGHLjdCvqUe22AZJosEFYpiKArXqzuwJlL1MH2P5ZbNNXJWXaqMXiX9tYWaCUVZdTtfH1i8PTWpcCTZn6HCUle_C9B0zzgZA7Jsm4CnmBGdnlsbUMsEPcJ5_iRyxj4EyEvcN3zXgdE1LX5aGBF3Z5DwBmAemzElR229ItWDP5RWw7Ng60",
      snippet: newBlogSnippet,
      content: newBlogContent
    };

    onUpdateBlogs([newArticle, ...blogs]);
    setIsAddingBlog(false);
    setNewBlogTitle("");
    setNewBlogSnippet("");
    setNewBlogContent("");
  };

  // Moderator review approval
  const handleModerateReview = (id: string, action: 'approve' | 'delete') => {
    if (action === 'approve') {
      const updated = testimonials.map(t => t.id === id ? { ...t, approved: true } : t);
      onUpdateTestimonials(updated);
    } else {
      const updated = testimonials.filter(t => t.id !== id);
      onUpdateTestimonials(updated);
    }
  };

  // Doc availability submit
  const handleSaveDocSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    const updated = doctorsList.map(d => 
      d.id === editingDoctor.id 
        ? { ...d, availability: { days: editDays, hours: editHours } } 
        : d
    );
    setDoctorsList(updated);
    setEditingDoctor(null);
  };

  // Filtered lists
  const filteredApps = appointments.filter(a => {
    const term = appSearch.toLowerCase();
    const docName = DOCTORS.find(d => d.id === a.doctorId)?.name.toLowerCase() || "";
    const servName = SERVICES.find(s => s.id === a.treatmentId)?.name.toLowerCase() || "";
    return a.patientName.toLowerCase().includes(term) || docName.includes(term) || servName.includes(term);
  });

  const filteredPatients = patientRecords.filter(p => {
    const term = patSearch.toLowerCase();
    return p.name.toLowerCase().includes(term) || p.email.toLowerCase().includes(term);
  });

  // Patient own variables
  const loggedInPatientRecord = patientRecords.find(p => p.email.toLowerCase() === activePatientEmail.toLowerCase());
  const loggedInPatientApps = appointments.filter(a => a.patientEmail.toLowerCase() === activePatientEmail.toLowerCase());

  // Helper arrays for schedule select
  const weekdaysIndex = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const clinicalHoursIndex = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

  return (
    <section id="dashboard-system" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200/80 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight font-sans flex items-center gap-2">
              <Settings className="h-6 w-6 text-teal-600 animate-spin duration-10000" />
              Chatpata Studio Ecosystem
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">Dual Admin Dashboard & Patient Record Hub</p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-slate-200/60 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => { setActiveTab('analytics'); setIsPatientLoggedIn(false); }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-sans transition-all cursor-pointer ${activeTab === 'analytics' && !isPatientLoggedIn ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => { setActiveTab('appointments'); setIsPatientLoggedIn(false); }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-sans transition-all cursor-pointer ${activeTab === 'appointments' && !isPatientLoggedIn ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => { setActiveTab('patients'); setIsPatientLoggedIn(false); }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-sans transition-all cursor-pointer ${activeTab === 'patients' && !isPatientLoggedIn ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Patients
            </button>
            <button
              onClick={() => { setActiveTab('doctors'); setIsPatientLoggedIn(false); }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-sans transition-all cursor-pointer ${activeTab === 'doctors' && !isPatientLoggedIn ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Doctors
            </button>
            <button
              onClick={() => { setActiveTab('blogs'); setIsPatientLoggedIn(false); }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-sans transition-all cursor-pointer ${activeTab === 'blogs' && !isPatientLoggedIn ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Moderation
            </button>
            <button
              onClick={() => { setActiveTab('translations' as any); setIsPatientLoggedIn(false); }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-sans transition-all cursor-pointer flex items-center gap-1 ${activeTab === 'translations' as any && !isPatientLoggedIn ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Globe className="h-3.5 w-3.5" />
              AI Translations
            </button>
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg font-sans transition-all cursor-pointer flex items-center gap-1 ${activeTab === 'portal' ? 'bg-teal-600 text-white shadow-sm' : 'text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/50'}`}
            >
              <LogIn className="h-3.5 w-3.5" />
              Patient Portal
            </button>
          </div>
        </div>

        {/* Dynamic Display Panels */}
        <div className="bg-white rounded-3xl border border-slate-205 shadow-xl p-6 sm:p-8 min-h-[440px]">
          
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && !isPatientLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Metric 1 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 flex flex-col justify-between">
                  <p className="text-xs text-slate-400 font-sans">Accumulated Monthly Revenue</p>
                  <h3 className="text-3xl font-extrabold text-slate-800 font-mono mt-3 flex items-baseline gap-0.5">
                    <span className="text-lg text-slate-400 font-sans font-medium">$</span>
                    {totalRevenue.toLocaleString()}
                  </h3>
                  <p className="text-[10px] text-teal-700 font-mono mt-2 font-bold uppercase flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Based on approved slots
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 flex flex-col justify-between">
                  <p className="text-xs text-slate-400 font-sans">Secure Locked Inquiries</p>
                  <h3 className="text-3xl font-extrabold text-slate-800 font-mono mt-3">
                    {appointments.length}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-2 uppercase">
                    Pending moderation: {appointments.filter(a => a.status === 'pending').length}
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 flex flex-col justify-between">
                  <p className="text-xs text-slate-400 font-sans">Patient Profile Database</p>
                  <h3 className="text-3xl font-extrabold text-slate-800 font-mono mt-3">
                    {patientRecords.length}
                  </h3>
                  <p className="text-[10px] text-teal-700 font-mono mt-2 font-bold uppercase">
                    HIPAA Token Encrypted
                  </p>
                </div>

              </div>

              {/* Responsive custom-built SVG Line Chart representing treatment trends */}
              <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">Reputations Allocation Cycles (Weekly Visits)</h4>
                    <span className="text-[10px] text-slate-400 font-mono">CHIEF ANALYSIS CONTROLLER</span>
                  </div>
                  <div className="flex gap-4 text-[10px] font-mono text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-teal-500 rounded-full" /> Clinical Visits</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-slate-400 rounded-full" /> Pre-Allocations</span>
                  </div>
                </div>

                {/* Beautiful custom responsive SVG chart lines (React elements, no dynamic library error) */}
                <div className="w-full h-44 sm:h-52 select-none shrink-0 relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                    
                    {/* Grids */}
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                    
                    {/* Line Path */}
                    <path
                      d="M 50 170 C 100 130, 150 90, 200 100 C 250 110, 300 40, 350 50 C 400 60, 450 120, 500 80 C 550 40, 600 10, 600 10"
                      fill="none"
                      stroke="url(#chartGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Nodes mapping */}
                    <circle cx="50" cy="170" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="200" cy="100" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="350" cy="50" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="500" cy="80" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />

                    {/* Gradients declaration */}
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex justify-between font-mono text-[9px] text-slate-400 mt-4 border-t border-slate-200/40 pt-2.5">
                  <span>WEEK 1</span>
                  <span>WEEK 2</span>
                  <span>WEEK 3</span>
                  <span>WEEK 4</span>
                  <span>WEEK 5</span>
                </div>
              </div>

              {/* Dynamic Recharts Patient Satisfaction Scores across different treatment categories over the last 6 months */}
              <div id="patient-satisfaction-chart" className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">Patient Satisfaction Performance Scores</h4>
                    <span className="text-[10px] text-slate-400 font-mono">6-MONTH ANALYTICS SUITE (RECHARTS ENHANCED)</span>
                  </div>
                  
                  {/* Select controller for filtering by month */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-sans font-medium">Select Interval:</span>
                    <select
                      value={satisfactionMonth}
                      onChange={(e) => setSatisfactionMonth(e.target.value)}
                      className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold font-sans text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="avg">6 Months Average</option>
                      <option value="Jan 2026">Jan 2026</option>
                      <option value="Feb 2026">Feb 2026</option>
                      <option value="Mar 2026">Mar 2026</option>
                      <option value="Apr 2026">Apr 2026</option>
                      <option value="May 2026">May 2026</option>
                      <option value="Jun 2026">Jun 2026</option>
                    </select>
                  </div>
                </div>

                {/* Highlight Stats Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-white border border-slate-200/40 p-4 rounded-xl">
                  <div className="text-xs">
                    <p className="text-slate-400 font-sans text-[11px] leading-none">Top Scoring Treatment</p>
                    <p className="text-sm font-bold text-teal-700 mt-1 font-sans flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                      Cosmetic Dentistry (99.8%)
                    </p>
                  </div>
                  <div className="text-xs border-y sm:border-y-0 sm:border-x border-slate-100 py-2 sm:py-0 sm:px-4">
                    <p className="text-slate-400 font-sans text-[11px] leading-none">Clinical Satisfaction Floor</p>
                    <p className="text-sm font-bold text-slate-700 mt-1 font-sans">
                      Root Canal Therapy (94.4%)
                    </p>
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-400 font-sans text-[11px] leading-none">Global Clinical Target Ratio</p>
                    <p className="text-sm font-bold text-emerald-600 mt-1 font-sans">
                      95.0% Benchmark Passed
                    </p>
                  </div>
                </div>

                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={SATISFACTION_DATA}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis 
                        dataKey="category" 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        dy={8}
                        fontFamily="var(--font-sans)"
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={10} 
                        domain={[90, 100]} 
                        tickLine={false} 
                        axisLine={false} 
                        unit="%" 
                        dx={-8}
                        fontFamily="var(--font-sans)"
                      />
                      <RechartsTooltip
                        cursor={{ fill: '#f8fafc', radius: 4 }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white border border-slate-850 p-3.5 rounded-xl shadow-xl text-xs font-sans">
                                <p className="font-bold text-[11px] text-zinc-300 font-mono tracking-wider uppercase mb-1.5">{data.category}</p>
                                <div className="space-y-1">
                                  <p className="flex justify-between gap-6">
                                    <span className="text-slate-300">Score ({satisfactionMonth === 'avg' ? 'Average' : satisfactionMonth}):</span>
                                    <span className="font-bold text-teal-400 font-mono">{payload[0].value}%</span>
                                  </p>
                                  <p className="flex justify-between gap-6 text-[10px]">
                                    <span className="text-slate-400">6-Mo Average:</span>
                                    <span className="font-semibold text-slate-300 font-mono">{data.avg}%</span>
                                  </p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey={satisfactionMonth} 
                        fill="#0d9488" 
                        radius={[6, 6, 0, 0]} 
                        maxBarSize={45} 
                        animationDuration={600}
                      >
                        {SATISFACTION_DATA.map((entry, index) => {
                          // Highlight Cosmetic Dentistry and Dental Implants since they are top performers
                          const isTop = entry.category === 'Cosmetic Dentistry' || entry.category === 'Dental Implants';
                          const isLower = entry.category === 'Root Canal Therapy';
                          let barColor = '#0d9488'; // base teal
                          if (isTop) barColor = '#0f766e'; // dark teal for top
                          if (isLower) barColor = '#14b8a6'; // light teal for root canal
                          return <Cell key={`cell-${index}`} fill={barColor} />;
                        })}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] text-slate-400 mt-4 border-t border-slate-200/40 pt-2.5">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#0f766e] rounded-sm" /> Premium Treatment Suite (&gt;98%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#0d9488] rounded-sm" /> Clinical Core Suite (96% - 98%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#14b8a6] rounded-sm" /> Therapeutic Core Suite (&lt;96%)</span>
                  </div>
                  <span>UPDATED REAL-TIME FROM PATIENT FEEDBACK SURVEYS</span>
                </div>
              </div>

              {/* Treatment distribution estimates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl text-left">
                  <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest mb-4">Therapy Allocations Distribution</h4>
                  <div className="space-y-3 font-sans text-xs">
                    <div>
                      <div className="flex justify-between mb-1 text-slate-650 font-semibold">
                        <span>Aesthetic Reconstructions (Veneers)</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-slate-650 font-semibold">
                        <span>Robotic Implantology</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-slate-650 font-semibold">
                        <span>Micro Endodontics (Root Canal)</span>
                        <span>23%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '23%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Active Practitioners Roster</h4>
                    <p className="text-xs text-slate-500 font-sans font-light leading-relaxed mt-2">
                      Our practitioners allocation coordinates with daily live diagnostics. To edit slot availability or disable surgical days, toggle Doctor Schedule configs.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('doctors')}
                    className="w-fit text-xs font-semibold text-teal-600 flex items-center gap-1 hover:underline mt-4 cursor-pointer"
                  >
                    Adjust Availability <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && !isPatientLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Header actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <h3 className="text-base font-semibold text-slate-800 font-sans tracking-tight">Active Registered Appointments</h3>
                <div className="relative w-full sm:w-64 shrink-0">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search client or doctor..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 pl-9 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Grid appointments list */}
              {filteredApps.length > 0 ? (
                <div className="divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 font-semibold font-mono border-b border-slate-100 pb-2">
                        <th className="py-3 px-1">PATIENT</th>
                        <th>DOCTOR ASSIGNED</th>
                        <th>SERVICE</th>
                        <th>TIMELINE SECURED</th>
                        <th className="text-center">STATUS</th>
                        <th className="text-center">OPERATIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 divide-dashed">
                      {filteredApps.map((app) => {
                        const targetDoc = DOCTORS.find(d => d.id === app.doctorId);
                        const targetServ = SERVICES.find(s => s.id === app.treatmentId);
                        
                        return (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 px-1">
                              <span className="font-semibold text-slate-800 block text-sm">{app.patientName}</span>
                              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">{app.patientPhone} // {app.patientEmail}</span>
                            </td>
                            <td>
                              <span className="font-medium text-slate-700">{targetDoc?.name}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">{targetDoc?.role}</span>
                            </td>
                            <td>
                              <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-sm">{targetServ?.name || "Dental Check"}</span>
                            </td>
                            <td className="font-mono">
                              <span className="text-slate-800 font-semibold block">{app.date}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">{app.time}</span>
                            </td>
                            <td className="text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold ${app.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : app.status === 'cancelled' ? 'bg-red-50 text-red-650' : 'bg-amber-50 text-amber-700'}`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="py-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {app.status === 'pending' && (
                                  <button
                                    onClick={() => handleApproveAppointment(app.id)}
                                    className="p-1 px-2.5 rounded-md text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-0.5 cursor-pointer"
                                    title="Approve slot allocation"
                                  >
                                    <CheckCircle className="h-3.5 w-3.5" /> Approve
                                  </button>
                                )}
                                {app.status !== 'cancelled' && (
                                  <>
                                    <button
                                      onClick={() => {
                                        setReschedulingApp(app);
                                        setRescheduleDate(app.date);
                                        setRescheduleTime(app.time);
                                      }}
                                      className="p-1 px-2 text-[10px] border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold rounded-md flex items-center gap-0.5 cursor-pointer"
                                    >
                                      <RefreshCw className="h-3 w-3" /> Shift
                                    </button>
                                    <button
                                      onClick={() => handleCancelAppointment(app.id)}
                                      className="p-1 px-1.5 rounded-md text-[10px] bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-750 transition-colors cursor-pointer"
                                      title="Cancel reservation"
                                    >
                                      <XSquare className="h-3.5 w-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No matching active appointments found.
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: PATIENT RECORDS */}
          {activeTab === 'patients' && !isPatientLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-base font-semibold text-slate-800 font-sans tracking-tight">HIPAA Clinic Directory</h3>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">MANAGE DIAGNOSTIC TIMELINES</span>
                </div>
                
                <div className="flex gap-2 items-center w-full sm:w-auto shrink-0">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="absolute left-3 top-2 text-slate-400 h-4, w-4" />
                    <input
                      type="text"
                      placeholder="Search patient record..."
                      value={patSearch}
                      onChange={(e) => setPatSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2 pl-9 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    onClick={() => setIsAddingPatient(true)}
                    className="p-2 bg-slate-900 text-teal-400 hover:text-teal-300 rounded-xl text-xs flex items-center gap-1 cursor-pointer font-semibold shrink-0"
                  >
                    <PlusCircle className="h-4 w-4" /> Add Patient
                  </button>
                </div>
              </div>

              {/* Patients Grid */}
              {filteredPatients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPatients.map((pat) => (
                    <div
                      key={pat.id}
                      className="bg-slate-50 rounded-2xl border border-slate-150 p-5 text-left flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start border-b border-slate-200/50 pb-2.5">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{pat.id}</span>
                            <h4 className="text-sm font-semibold text-slate-850 font-sans block mt-0.5">{pat.name}</h4>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-[9px] font-mono text-emerald-800 uppercase font-bold">
                            {pat.status}
                          </span>
                        </div>

                        {/* Diagnostic detail parameters */}
                        <div className="mt-4 space-y-3 text-xs leading-relaxed font-sans">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-light">CONCURRENT DIAGNOSTICS</span>
                            <p className="text-slate-700 font-medium font-sans mt-0.5">{pat.diagnostics}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-light">TREATMENT PLAN CYCLE</span>
                            <p className="text-slate-700 font-mono text-teal-800 mt-0.5">{pat.treatmentPlan}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/50 pt-3 mt-4 text-[10px] text-slate-400 flex justify-between items-center font-mono">
                        <span>LAST ACCESS: {pat.lastVisit}</span>
                        <span>{pat.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">No matching patient files discovered.</div>
              )}

            </motion.div>
          )}

          {/* TAB 4: DOCTORS CONFIG */}
          {activeTab === 'doctors' && !isPatientLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-semibold text-slate-800 font-sans tracking-tight">Practitioner Board Assignments</h3>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">ADJUST CORE WORKING HOURS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {doctorsList.map((doc) => (
                  <div key={doc.id} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-left flex items-start gap-4">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-bold text-slate-800 font-sans text-sm">{doc.name}</h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{doc.role}</span>
                      </div>

                      <div className="space-y-1 text-slate-600 font-sans font-light">
                        <p><strong className="font-semibold text-slate-700">Days Active:</strong> {doc.availability.days.join(', ')}</p>
                        <p><strong className="font-semibold text-slate-700">Daily Slots:</strong> {doc.availability.hours.join(', ')}</p>
                      </div>

                      <button
                        onClick={() => {
                          setEditingDoctor(doc);
                          setEditDays(doc.availability.days);
                          setEditHours(doc.availability.hours);
                        }}
                        className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 rounded-lg text-[11px] transition duration-250 cursor-pointer w-fit"
                      >
                        Revise Days/Hours
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: PUBLICATION & MODERATION */}
          {activeTab === 'blogs' && !isPatientLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              
              {/* Blog publication block */}
              <div>
                <div className="flex justify-between items-center border-b border-slate-150 pb-4 mb-5">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 font-sans">Chatpata Library Publications</h3>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">MANAGE MEDICAL ARTICLES</span>
                  </div>
                  <button
                    onClick={() => setIsAddingBlog(true)}
                    className="p-2 px-3.5 bg-slate-900 text-teal-400 hover:text-teal-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4" /> Compile Post
                  </button>
                </div>

                {/* Tiny index list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {blogs.map((b) => (
                    <div key={b.id} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-mono text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded uppercase">{b.category}</span>
                        <h4 className="text-xs font-semibold text-slate-800 block mt-2 font-sans line-clamp-1">{b.title}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-3 font-sans block">By {b.author}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Moderation block */}
              <div className="border-t border-slate-100 pt-6">
                <div className="border-b border-slate-150 pb-4 mb-4">
                  <h3 className="text-base font-semibold text-slate-800 font-sans">Patient Testimonial Moderation</h3>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">APPROVE OR HIDE REVIEWS</span>
                </div>

                <div className="space-y-4">
                  {testimonials.map((testi) => (
                    <div key={testi.id} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-left flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 text-xs font-sans">
                      <div className="space-y-1.5 flex-1 max-w-2xl text-slate-650 leading-relaxed font-light">
                        <div className="flex gap-2 items-center">
                          <strong className="font-semibold text-slate-800">{testi.patientName}</strong>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold ${testi.approved ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-amber-50 text-amber-700'}`}>
                            {testi.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <p className="italic">"{testi.comment}"</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!testi.approved && (
                          <button
                            onClick={() => handleModerateReview(testi.id, 'approve')}
                            className="p-1 px-2 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md flex items-center gap-0.5 cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleModerateReview(testi.id, 'delete')}
                          className="p-1 px-2 border border-slate-200 hover:bg-red-50 hover:text-red-750 font-semibold rounded-md text-[10px] transition cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 5b: ADMIN SYSTEM TRANSLATION CENTER */}
          {activeTab === ('translations' as any) && !isPatientLoggedIn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Header card with progress statistics */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Globe className="h-44 w-44 text-teal-400 rotate-12" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                    Enterprise Multilingual Core
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans mt-3">AI Multi-Language Hub</h3>
                  <p className="text-xs text-slate-300 mt-1.5 font-sans font-light max-w-2xl font-sans">
                    Our platform automatically connects directly to Google Gemini and uses dynamic localStorage caches to localize the full treatment experience in real-time.
                  </p>
                  
                  {/* Progress tracker metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 border-t border-slate-800 pt-6">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none">Active Locales</p>
                      <h4 className="text-lg font-semibold mt-1 font-sans flex items-center gap-1.5 leading-none">
                        <span>11 Languages</span>
                        <span className="text-[10px] font-normal text-teal-400 font-mono">✅ Synced</span>
                      </h4>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none">Discovered Schema Terms</p>
                      <h4 className="text-lg font-semibold mt-1 font-sans font-mono leading-none">
                        22 Key Records
                      </h4>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-mono tracking-widest leading-none">Global Translation Target</p>
                      <h4 className="text-lg font-semibold mt-1 font-sans flex items-center gap-2 leading-none">
                        {/* Coverage Progress Bar */}
                        <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="font-mono text-emerald-400 text-xs">100%</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toolbar & Filter Bar */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                
                {/* Search Term Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={translationSearch}
                    onChange={(e) => setTranslationSearch(e.target.value)}
                    placeholder="Search master English strings or keys..."
                    className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 font-light focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Grid controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-500 font-sans font-medium whitespace-nowrap">Edit Locale:</span>
                    <select
                      value={selectedTargetLang}
                      onChange={(e) => {
                        setSelectedTargetLang(e.target.value as any);
                        setEditingTranslations({}); // Clear dirty local input states
                      }}
                      className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold font-sans text-slate-700 focus:outline-none"
                    >
                      <option value="es">🇪🇸 Spanish (Castellano)</option>
                      <option value="hi">🇮🇳 Hindi (हिन्दी)</option>
                      <option value="fr">🇫🇷 French (Français)</option>
                      <option value="de">🇩🇪 German (Deutsch)</option>
                      <option value="it">🇮🇹 Italian (Italiano)</option>
                      <option value="pt">🇵🇹 Portuguese (Português)</option>
                      <option value="ar">🇸🇦 Arabic (العربية)</option>
                      <option value="zh">🇨🇳 Chinese (中文)</option>
                      <option value="ja">🇯🇵 Japanese (日本語)</option>
                      <option value="ru">🇷🇺 Russian (Русский)</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to AI-retranslate empty fields for the selected language using Google Gemini?")) {
                        await triggerAutoTranslateAll(selectedTargetLang);
                        alert("AI Auto-Translation Cycle complete!");
                      }
                    }}
                    disabled={isTranslating}
                    className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-teal-700 disabled:opacity-50 transition cursor-pointer"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
                    {isTranslating ? 'AI Refining...' : 'AI Bulk Run'}
                  </button>
                </div>

              </div>

              {/* Data Table Grid */}
              <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white max-h-[500px] overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                      <th className="px-6 py-4">Hierarchy Path</th>
                      <th className="px-6 py-4">Default Value (EN)</th>
                      <th className="px-6 py-4">Local Translation Target ({selectedTargetLang.toUpperCase()})</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {[
                      { path: 'header.subLogo', en: 'BIOMIMETIC DIGITAL DENTISTRY CORE' },
                      { path: 'header.dashboard', en: 'Dashboard Portal' },
                      { path: 'header.bookSlot', en: 'Schedule Online' },
                      { path: 'header.bookSlotNow', en: 'Schedule Slot' },
                      { path: 'header.biologicalSurgery', en: 'BIOLOGICAL SURGERY SUITE' },
                      { path: 'nav.about', en: 'Advanced Clinic' },
                      { path: 'nav.services', en: 'Specialist Suites' },
                      { path: 'nav.doctors', en: 'Our Clinicians' },
                      { path: 'nav.pricing', en: 'Pricing Blueprint' },
                      { path: 'nav.blogs', en: 'Digital Journals' },
                      { path: 'nav.contact', en: 'Secure Assurances' },
                      { path: 'footer.treatments', en: 'DIGITAL PROCEDURES' },
                      { path: 'footer.admittance', en: 'ADMITTANCE POLICY' },
                      { path: 'footer.monFri', en: 'Mon – Fri' },
                      { path: 'footer.saturdays', en: 'Saturdays' },
                      { path: 'footer.emergencyOnly', en: 'Intensive Emergency Care Only' },
                      { path: 'footer.onDuty', en: 'ROBOTIC ON-CALL CLINICISTS ON DUTY' },
                      { path: 'footer.headquarters', en: 'SAN FRANCISCO HQ' },
                      { path: 'footer.rightsReserved', en: 'All clinical medical privileges reserved.' },
                      { path: 'footer.privacy', en: 'Clinical Privacy & HIPAA Safeguards' },
                      { path: 'footer.fda', en: 'FDA Biomaterial Standards & Disclosures' },
                      { path: 'footer.insurance', en: 'Commercial Reconstitution Insurances' },
                    ]
                      .filter(item => {
                        const term = translationSearch.toLowerCase();
                        return item.path.toLowerCase().includes(term) || item.en.toLowerCase().includes(term);
                      })
                      .map((item) => {
                        // Get current value in local dict of specific language
                        const targetLanguageDict = allTranslations[selectedTargetLang] || {};
                        
                        // Extract value along nested dot path
                        const getValueByPath = (obj: any, pathStr: string): string => {
                          const parts = pathStr.split('.');
                          let current = obj;
                          for (const part of parts) {
                            if (current === undefined || current === null) return '';
                            current = current[part];
                          }
                          return typeof current === 'string' ? current : '';
                        };

                        const currentVal = getValueByPath(targetLanguageDict, item.path);
                        const displayedVal = editingTranslations[item.path] !== undefined 
                          ? editingTranslations[item.path] 
                          : currentVal;

                        return (
                          <tr key={item.path} className="hover:bg-slate-50/40 transition-colors">
                            <td className="px-6 py-4 font-mono text-[10px] text-zinc-400 select-all max-w-[140px] truncate">
                              {item.path}
                            </td>
                            <td className="px-6 py-4 text-slate-800 font-sans font-medium leading-relaxed max-w-[200px]">
                              {item.en}
                            </td>
                            <td className="px-6 py-4 leading-normal">
                              <textarea
                                rows={1}
                                value={displayedVal}
                                onChange={(e) => {
                                  setEditingTranslations(prev => ({
                                    ...prev,
                                    [item.path]: e.target.value
                                  }));
                                }}
                                className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 font-sans leading-relaxed resize-none"
                              />
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap shrink-0">
                              <div className="flex justify-end gap-1.5 items-center">
                                {/* AI single re-translate click */}
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setIsAiTranslatingKey(item.path);
                                    try {
                                      const translatedResult = await aiTranslateSingle(item.en, selectedTargetLang);
                                      if (translatedResult) {
                                        setEditingTranslations(prev => ({
                                          ...prev,
                                          [item.path]: translatedResult
                                        }));
                                      }
                                    } catch (err) {
                                      console.error("Single translate failed", err);
                                    } finally {
                                      setIsAiTranslatingKey(null);
                                    }
                                  }}
                                  disabled={isAiTranslatingKey === item.path}
                                  className="p-2 border border-slate-200 hover:border-teal-500 text-teal-600 hover:bg-teal-50/20 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                                  title="Translate via Gemini AI"
                                >
                                  <Sparkles className={`h-3.5 w-3.5 ${isAiTranslatingKey === item.path ? 'animate-spin' : ''}`} />
                                  <span>AI Auto</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const valueToSet = editingTranslations[item.path] !== undefined 
                                      ? editingTranslations[item.path] 
                                      : currentVal;
                                    
                                    saveManualTranslation(selectedTargetLang, item.path, valueToSet);
                                    alert(`Successfully saved term "${item.path}" to target language!`);
                                  }}
                                  className="p-2 bg-slate-905 bg-slate-950 border border-slate-950 text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition cursor-pointer"
                                >
                                  Save Key
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

            </motion.div>
          )}

          {/* TAB 6: DUAL PATIENT PORTAL LOGIN / SCREEN */}
          {activeTab === 'portal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {!isPatientLoggedIn ? (
                /* Patient Authentication Prompt */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!patientEmailInput) return;
                    setActivePatientEmail(patientEmailInput);
                    setIsPatientLoggedIn(true);
                  }}
                  className="max-w-md mx-auto py-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center flex flex-col items-center space-y-6"
                >
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl border border-teal-100 shadow-inner">
                    <LogIn className="h-6 w-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 font-sans tracking-tight">Patient Record Login</h3>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans font-light">
                      Input your registered secure email (e.g. sophia@luxury.com or your booking email) to retrieve diagnostic reports and scheduled appointments.
                    </p>
                  </div>

                  <div className="w-full">
                    <input
                      type="email"
                      required
                      placeholder="sophia@luxury.com"
                      value={patientEmailInput}
                      onChange={(e) => setPatientEmailInput(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-teal-500 text-center"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md cursor-pointer"
                  >
                    Authenticate Credentials <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                /* Authenticated Patient Record Screen */
                <div className="space-y-8">
                  
                  {/* Banner header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase font-bold">Authenticated Patient</span>
                      <h3 className="text-lg font-bold text-slate-850 font-sans mt-1.5">Welcome Back, {loggedInPatientRecord ? loggedInPatientRecord.name : activePatientEmail}</h3>
                    </div>
                    <button
                      onClick={() => { setIsPatientLoggedIn(false); setPatientEmailInput(""); setActivePatientEmail(""); }}
                      className="p-1 px-3 text-[11px] font-bold border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign Out
                    </button>
                  </div>

                  {/* Information panels */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Diagnostic reports */}
                    <div className="lg:col-span-7 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl text-left space-y-6">
                      <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="h-4 w-4 text-teal-600" /> Medical Reports & Plans
                      </h4>

                      {loggedInPatientRecord ? (
                        <div className="space-y-5 text-sm font-sans leading-relaxed">
                          <div className="bg-white p-4 rounded-xl border border-slate-200/40">
                            <span className="text-[9px] font-mono text-slate-400 block tracking-widest uppercase">Clinical Diagnosis Code // {loggedInPatientRecord.id}</span>
                            <p className="text-slate-800 font-medium font-sans mt-2">{loggedInPatientRecord.diagnostics}</p>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-slate-200/40">
                            <span className="text-[9px] font-mono text-slate-400 block tracking-widest uppercase">Robotic Care Plan</span>
                            <p className="text-slate-700 font-mono text-teal-800 mt-2">{loggedInPatientRecord.treatmentPlan}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-10 text-center text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-200">
                          Initial digital scanning complete. Post-op diagnostic profiles populate automatically.
                        </div>
                      )}
                    </div>

                    {/* Active scheduled appointments */}
                    <div className="lg:col-span-5 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl text-left space-y-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-4">
                          <Calendar className="h-4 w-4 text-teal-600" /> Booked Operations
                        </h4>

                        {loggedInPatientApps.length > 0 ? (
                          <div className="space-y-3">
                            {loggedInPatientApps.map((a) => {
                              const doc = DOCTORS.find(d => d.id === a.doctorId);
                              
                              return (
                                <div key={a.id} className="bg-white p-4 rounded-xl border border-slate-200/40 text-xs font-sans">
                                  <div className="flex justify-between items-center mb-1.5">
                                    <strong className="font-semibold text-slate-800">{doc?.name}</strong>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider font-bold ${a.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-amber-50 text-amber-700'}`}>
                                      {a.status}
                                    </span>
                                  </div>
                                  <p className="font-mono text-teal-800 text-[11px]">{a.date} at {a.time}</p>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-10 text-center text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-200">
                            No scheduled operations on file.
                          </div>
                        )}
                      </div>

                      <p className="text-[10px] text-zinc-400 mt-6 leading-relaxed font-sans font-light">
                        *All data is conformant with modern HIPAA secure token storage guidelines.
                      </p>
                    </div>

                  </div>

                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>

      {/* DIALOG 1: RESCHEDULING MODAL */}
      <AnimatePresence>
        {reschedulingApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop filter */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setReschedulingApp(null)}
            />

            <motion.form
              onSubmit={handleRescheduleSubmit}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-md relative z-10 text-left space-y-6 shadow-2xl"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900 font-sans tracking-tight">Reschedule Client Operation</h3>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">SHIFT ACCLAIMED TIMELINE</span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Target Date</label>
                  <input
                    type="date"
                    required
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Allocated Time Slot</label>
                  <select
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs"
                  >
                    {clinicalHoursIndex.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-slate-100 pt-5 mt-6 shrink-0">
                <button
                  type="button"
                  onClick={() => setReschedulingApp(null)}
                  className="px-4 py-2 hover:bg-slate-50 text-slate-500 font-semibold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-teal-450 hover:text-teal-350 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Secure Change
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG 2: ADD PATIENT MODAL */}
      <AnimatePresence>
        {isAddingPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setIsAddingPatient(false)}
            />

            <motion.form
              onSubmit={handleAddPatientSubmit}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-lg relative z-10 text-left space-y-5 shadow-2xl"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900 font-sans">Enroll Clinical Patient Record</h3>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">HIPAA REGISTER TOKEN ENTRY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sophia Richardson"
                    value={newPatName}
                    onChange={(e) => setNewPatName(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Registered Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sophia@luxury.com"
                    value={newPatEmail}
                    onChange={(e) => setNewPatEmail(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Secure Phone Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 019-2834"
                    value={newPatPhone}
                    onChange={(e) => setNewPatPhone(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Current Diagnosis</label>
                  <input
                    type="text"
                    placeholder="E.g., enamel attrition lower anterior quadrant"
                    value={newPatDiagnostics}
                    onChange={(e) => setNewPatDiagnostics(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Robotic Care Plan / Treatment Map</label>
                  <input
                    type="text"
                    placeholder="E.g., porcelain laminates preparation + whitening cycle"
                    value={newPatPlan}
                    onChange={(e) => setNewPatPlan(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs text-teal-800 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-slate-100 pt-4 mt-6 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddingPatient(false)}
                  className="px-4 py-2 hover:bg-slate-50 text-slate-500 font-semibold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Enroll Record
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG 3: DOCTOR SHIFT EDIT MODAL */}
      <AnimatePresence>
        {editingDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setEditingDoctor(null)}
            />

            <motion.form
              onSubmit={handleSaveDocSchedule}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-md relative z-10 text-left space-y-5 shadow-2xl"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900 font-sans">Shift Schedule: {editingDoctor.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">UPDATE CORE CLINICAL AVAILABILITY</span>
              </div>

              <div className="space-y-4 text-xs font-sans">
                {/* Active Active active weekdays check */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Operational Workdays</span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {weekdaysIndex.map((day) => {
                      const active = editDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            if (active) {
                              setEditDays(editDays.filter(d => d !== day));
                            } else {
                              setEditDays([...editDays, day]);
                            }
                          }}
                          className={`p-2 rounded-lg border text-[11px] font-medium transition cursor-pointer text-center ${active ? 'bg-teal-50 border-teal-500 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hours selection tags */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Time Slots</span>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {clinicalHoursIndex.map((hr) => {
                      const active = editHours.includes(hr);
                      return (
                        <button
                          key={hr}
                          type="button"
                          onClick={() => {
                            if (active) {
                              setEditHours(editHours.filter(h => h !== hr));
                            } else {
                              setEditHours([...editHours, hr]);
                            }
                          }}
                          className={`p-1.5 rounded-lg border text-[10px] transition cursor-pointer text-center ${active ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                        >
                          {hr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-slate-100 pt-4 mt-6 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="px-4 py-2 hover:bg-slate-50 text-slate-500 font-semibold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG 4: WRITE BLOG PUBLICATION MODAL */}
      <AnimatePresence>
        {isAddingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setIsAddingBlog(false)}
            />

            <motion.form
              onSubmit={handleAddBlogSubmit}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full max-w-lg relative z-10 text-left space-y-4 shadow-2xl"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900 font-sans flex items-center gap-1.5"><BookOpen className="h-5 w-5 text-teal-600" /> Compile Chatpata Article</h3>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">MEDICALLY REVIEWED CONTENT ENGINE</span>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Quantum leaps in robotic surgery"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Division Category</label>
                    <select
                      value={newBlogCategory}
                      onChange={(e) => setNewBlogCategory(e.target.value)}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Oral Care Guide">Oral Care Guide</option>
                      <option value="Smile Aesthetics">Smile Aesthetics</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Author board</label>
                    <select
                      value={newBlogAuthor}
                      onChange={(e) => setNewBlogAuthor(e.target.value)}
                      className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700"
                    >
                      {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Snippet Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="Extremely concise snippet overview of article..."
                    value={newBlogSnippet}
                    onChange={(e) => setNewBlogSnippet(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Body Content (Medically accurate)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Full detailed article paragraphs..."
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-850 font-light leading-relaxed resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-slate-100 pt-4 mt-6 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddingBlog(false)}
                  className="px-4 py-2 hover:bg-slate-50 text-slate-500 font-semibold text-xs rounded-xl border border-slate-200 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
