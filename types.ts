export type NavPage = 'home' | 'form' | 'status' | 'divisi' | 'admin' | 'support' | 'login';

export type ApplicationStatusType = 'Submitted' | 'Under Review' | 'Interview' | 'Accepted' | 'Rejected';

export interface DivisionInfo {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string;
  totalQuota: number;
  availableQuota: number;
  requiredSkills: string[];
  tasks: string[];
  headName?: string;
  iconName: string;
}

export interface ApplicantDocument {
  id: string;
  type: 'surat_rekomendasi' | 'krs' | 'ktm' | 'transkrip' | 'cv' | string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'Verified' | 'Pending Review' | 'Needs Revision';
  fileUrl?: string;
}

export interface ApplicantNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface ApplicantData {
  id: string;
  regNumber: string; // e.g. BPS-PKL-2025-0842
  fullName: string;
  nik: string;
  nim: string;
  university: string;
  major: string;
  semester: number;
  email: string;
  phone: string;
  divisionId: string;
  divisionName: string;
  startDate: string;
  endDate: string;
  durationMonths: number;
  proposalTitle: string;
  status: ApplicationStatusType;
  submissionDate: string;
  completionPercentage: number;
  documents: ApplicantDocument[];
  notifications: ApplicantNotification[];
  notes?: string;
  interviewDate?: string;
  interviewLink?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'persyaratan' | 'berkas' | 'pelaksanaan' | 'sertifikat';
}

export interface UserSession {
  isLoggedIn: boolean;
  role: 'applicant' | 'admin' | null;
  applicantId?: string;
  name?: string;
  email?: string;
}
