export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialization: string;
  qualifications: string;
  experience: number;
  image: string;
  avatar: string;
  bio: string;
  availability: {
    days: string[];
    hours: string[];
  };
  rating: number;
  consultationsCount: number;
  email: string;
}

export interface Service {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  priceRange: string;
  duration: string;
  iconName: string;
  recoveryTime: string;
  advantages: string[];
  procedure: string[];
}

export interface Booking {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  treatmentId: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
  complaints?: string;
  createdAt: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  lastVisit: string;
  phone: string;
  email: string;
  status: string;
  diagnostics: string;
  treatmentPlan: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  comment: string;
  rating: number;
  date: string;
  approved: boolean;
}
