import React from 'react';
import { NavPage, DivisionInfo, ApplicantData, ApplicantDocument } from '../types';
import { INITIAL_DIVISIONS } from '../data/mockData';
import bpsLogo from '../assets/images/bps_symbol_logo_clean_1785123554734.jpg';
import { 
  User, 
  GraduationCap, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  FileCheck, 
  X, 
  Info, 
  Sparkles,
  Calendar,
  Building,
  Lock
} from 'lucide-react';

interface ApplicationFormProps {
  setCurrentPage: (page: NavPage) => void;
  addNewApplicant: (applicant: ApplicantData) => void;
  preselectedDivision?: DivisionInfo | null;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  setCurrentPage,
  addNewApplicant,
  preselectedDivision
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = React.useState<boolean>(false);
  const [createdRegNumber, setCreatedRegNumber] = React.useState<string>('');

  // Step 1 State: Identitas Diri
  const [fullName, setFullName] = React.useState('');
  const [nik, setNik] = React.useState('');
  const [nim, setNim] = React.useState('');
  const [university, setUniversity] = React.useState('Universitas Hasanuddin (UNHAS)');
  const [customUniversity, setCustomUniversity] = React.useState('');
  const [major, setMajor] = React.useState('Teknik Informatika');
  const [semester, setSemester] = React.useState<number>(6);
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  // Step 2 State: Akademik & Rencana
  const [startDate, setStartDate] = React.useState('2025-08-01');
  const [endDate, setEndDate] = React.useState('2025-10-31');
  const [durationMonths, setDurationMonths] = React.useState<number>(3);
  const [selectedDivId, setSelectedDivId] = React.useState<string>(
    preselectedDivision ? preselectedDivision.id : 'ipds'
  );
  const [proposalTitle, setProposalTitle] = React.useState('');

  // Step 3 State: Uploaded Documents status
  const [filesState, setFilesState] = React.useState<{
    surat_rekomendasi: File | null | string;
    krs: File | null | string;
    ktm: File | null | string;
    transkrip: File | null | string;
    cv: File | null | string;
  }>({
    surat_rekomendasi: 'Surat_Rekomendasi_Magang_UNHAS.pdf',
    krs: 'KRS_Semester_6_Aktif.pdf',
    ktm: 'KTM_Mahasiswa_Andi.pdf',
    transkrip: 'Transkrip_Nilai_Akademik.pdf',
    cv: 'CV_Terbaru_2025.pdf'
  });

  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>({});

  const activeDivision = INITIAL_DIVISIONS.find(d => d.id === selectedDivId) || INITIAL_DIVISIONS[0];

  const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

  const handleFileUpload = (type: keyof typeof filesState, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
        const sizeMb = (uploadedFile.size / (1024 * 1024)).toFixed(2);
        alert(`Ukuran file "${uploadedFile.name}" (${sizeMb} MB) melebihi batas maksimal 2 MB. Silakan unggah file PDF berukuran maksimal 2 MB.`);
        event.target.value = '';
        return;
      }
      setFilesState(prev => ({ ...prev, [type]: uploadedFile }));
      setFormErrors(prev => ({ ...prev, [type]: '' }));
    }
  };

  const removeFile = (type: keyof typeof filesState) => {
    setFilesState(prev => ({ ...prev, [type]: null }));
  };

  const validateStep = (step: number): boolean => {
    const errors: { [key: string]: string } = {};

    if (step === 1) {
      if (!fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi.';
      if (!nik.trim() || nik.length < 16) errors.nik = 'NIK harus 16 digit angka.';
      if (!nim.trim()) errors.nim = 'NIM / NPM mahasiswa wajib diisi.';
      if (!phone.trim()) errors.phone = 'Nomor WhatsApp wajib diisi.';
      if (!email.trim() || !email.includes('@')) errors.email = 'Email tidak valid.';
    }

    if (step === 2) {
      if (!startDate) errors.startDate = 'Tanggal mulai wajib ditentukan.';
      if (!endDate) errors.endDate = 'Tanggal selesai wajib ditentukan.';
      if (!proposalTitle.trim()) errors.proposalTitle = 'Judul / Topik Rencana PKL wajib diisi.';
    }

    if (step === 3) {
      if (!filesState.surat_rekomendasi) errors.surat_rekomendasi = 'Internship Recommendation Letter from University wajib diunggah!';
      if (!filesState.krs) errors.krs = 'Kartu Rencana Studi (KRS) wajib diunggah!';
      if (!filesState.ktm) errors.ktm = 'Student ID Card (KTM) wajib diunggah!';
      if (!filesState.transkrip) errors.transkrip = 'Academic Transcript wajib diunggah!';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regNum = `BPS-PKL-2025-${randomNum}`;

    const docsList: ApplicantDocument[] = [
      {
        id: `doc-${Date.now()}-1`,
        type: 'surat_rekomendasi',
        title: 'Internship Recommendation Letter from University',
        fileName: typeof filesState.surat_rekomendasi === 'string' ? filesState.surat_rekomendasi : (filesState.surat_rekomendasi?.name || 'Surat_Rekomendasi.pdf'),
        fileSize: '1.2 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      },
      {
        id: `doc-${Date.now()}-2`,
        type: 'krs',
        title: 'Kartu Rencana Studi (KRS)',
        fileName: typeof filesState.krs === 'string' ? filesState.krs : (filesState.krs?.name || 'KRS.pdf'),
        fileSize: '780 KB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      },
      {
        id: `doc-${Date.now()}-3`,
        type: 'ktm',
        title: 'Student ID Card (KTM)',
        fileName: typeof filesState.ktm === 'string' ? filesState.ktm : (filesState.ktm?.name || 'KTM.pdf'),
        fileSize: '650 KB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      },
      {
        id: `doc-${Date.now()}-4`,
        type: 'transkrip',
        title: 'Academic Transcript',
        fileName: typeof filesState.transkrip === 'string' ? filesState.transkrip : (filesState.transkrip?.name || 'Transkrip.pdf'),
        fileSize: '1.8 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      }
    ];

    if (filesState.cv) {
      docsList.push({
        id: `doc-${Date.now()}-5`,
        type: 'cv',
        title: 'Curriculum Vitae (CV)',
        fileName: typeof filesState.cv === 'string' ? filesState.cv : (filesState.cv?.name || 'CV.pdf'),
        fileSize: '850 KB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      });
    }

    const finalUniversity = university === 'Lainnya' ? customUniversity : university;

    const newApp: ApplicantData = {
      id: `app-${Date.now()}`,
      regNumber: regNum,
      fullName,
      nik,
      nim,
      university: finalUniversity || 'Universitas Hasanuddin',
      major,
      semester,
      email,
      phone,
      divisionId: activeDivision.id,
      divisionName: activeDivision.name,
      startDate,
      endDate,
      durationMonths,
      proposalTitle,
      status: 'Submitted',
      submissionDate: new Date().toISOString().split('T')[0],
      completionPercentage: 80,
      documents: docsList,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Pengajuan Permohonan Terdaftar',
          message: `Formulir pengajuan Anda (${regNum}) berhasil tercatat. Tim BPS Sulsel akan memverifikasi kelengkapan berkas Anda.`,
          timestamp: 'Baru saja',
          read: false,
          type: 'success'
        }
      ]
    };

    setTimeout(() => {
      addNewApplicant(newApp);
      setIsSubmitting(false);
      setCreatedRegNumber(regNum);
      setSubmittedSuccess(true);
    }, 1200);
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
              PENDAFTARAN BERHASIL SUBMIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pengajuan PKL/Magang Tercatat di Sistem BPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Terima kasih! Permohonan Anda sedang masuk ke antrean verifikasi Sekretariat BPS Provinsi Sulawesi Selatan.
            </p>
          </div>

          {/* Registration Number Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-sm mx-auto space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Nomor Registrasi Pendaftaran:
            </p>
            <p className="text-2xl font-black text-[#022B59] tracking-widest font-mono">
              {createdRegNumber}
            </p>
            <p className="text-[11px] text-slate-500">
              Simpan nomor registrasi ini untuk mengecek status secara berkala.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setCurrentPage('status')}
              className="px-6 py-3 rounded-xl bg-[#022B59] hover:bg-blue-900 text-white font-bold text-xs shadow-md"
            >
              Cek Status & Pelacakan
            </button>
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setCurrentStep(1);
              }}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300"
            >
              Isi Form Baru Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Form Title (As in Image 3 & 9) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-200 shadow-xs shrink-0">
              <img 
                src={bpsLogo} 
                alt="Logo BPS" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="bg-[#022B59] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              PORTAL REKRUTMEN BPS SULSEL
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Formulir Pengajuan Resmi Tahun 2025
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Formulir Pengajuan PKL & Magang Mahasiswa
        </h1>

        <p className="text-xs sm:text-sm text-slate-600">
          Silakan lengkapi 3 tahapan data identitas, akademik, dan berkas persyaratan di bawah ini untuk mengajukan kegiatan praktik kerja lapangan di BPS Provinsi Sulawesi Selatan.
        </p>
      </div>

      {/* Stepper Header Tabs (1 Identitas, 2 Akademik & Tujuan, 3 Berkas Digital) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { step: 1, label: '1. Identitas Diri', icon: User },
          { step: 2, label: '2. Akademik & Rencana PKL', icon: GraduationCap },
          { step: 3, label: '3. Berkas Digital', icon: FileText }
        ].map(s => {
          const StepIcon = s.icon;
          const isActive = currentStep === s.step;
          const isDone = currentStep > s.step;
          return (
            <div
              key={s.step}
              className={`p-3 sm:p-4 rounded-xl border flex items-center justify-center sm:justify-start space-x-2 transition-all ${
                isActive
                  ? 'bg-[#022B59] text-white border-[#022B59] shadow-md font-bold'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                  : 'bg-white text-slate-500 border-slate-200 font-medium'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                isActive ? 'bg-amber-400 text-slate-950 font-black' : isDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {isDone ? '✓' : s.step}
              </div>
              <span className="text-xs hidden sm:inline">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Form Box */}
      <form onSubmit={handleSubmitForm} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        
        {/* STEP 1: IDENTITAS DIRI */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center space-x-2">
              <User className="w-5 h-5 text-[#022B59]" />
              <h2 className="text-lg font-bold text-slate-900">1. Data Identitas Diri Mahasiswa</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Nama Lengkap */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Nama Lengkap Mahasiswa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Andi Muhammad Nur Resky"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
                {formErrors.fullName && <p className="text-[11px] text-red-500 font-semibold">{formErrors.fullName}</p>}
              </div>

              {/* NIK */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  NIK (Nomor Induk Kependudukan) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  placeholder="16 digit NIK Sesuai KTP"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
                {formErrors.nik && <p className="text-[11px] text-red-500 font-semibold">{formErrors.nik}</p>}
              </div>

              {/* NIM */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  NIM / NPM Kampus <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Nomor Induk Mahasiswa"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
                {formErrors.nim && <p className="text-[11px] text-red-500 font-semibold">{formErrors.nim}</p>}
              </div>

              {/* Perguruan Tinggi */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Asal Perguruan Tinggi <span className="text-red-500">*</span>
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                >
                  <option value="Universitas Hasanuddin (UNHAS)">Universitas Hasanuddin (UNHAS)</option>
                  <option value="Universitas Negeri Makassar (UNM)">Universitas Negeri Makassar (UNM)</option>
                  <option value="UIN Alauddin Makassar">UIN Alauddin Makassar</option>
                  <option value="Universitas Muhammadiyah Makassar (Unismuh)">Universitas Muhammadiyah Makassar (Unismuh)</option>
                  <option value="Politeknik Negeri Ujung Pandang (PNUP)">Politeknik Negeri Ujung Pandang (PNUP)</option>
                  <option value="Politeknik Statistika STIS">Politeknik Statistika STIS</option>
                  <option value="Universitas Muslim Indonesia (UMI)">Universitas Muslim Indonesia (UMI)</option>
                  <option value="Lainnya">Perguruan Tinggi Lainnya...</option>
                </select>
                {university === 'Lainnya' && (
                  <input
                    type="text"
                    value={customUniversity}
                    onChange={(e) => setCustomUniversity(e.target.value)}
                    placeholder="Tuliskan nama Perguruan Tinggi Anda"
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                  />
                )}
              </div>

              {/* Program Studi */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Program Studi / Jurusan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="Contoh: S1 Statistika / S1 Teknik Informatika"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
              </div>

              {/* Semester */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Semester Saat Ini</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                >
                  {[4, 5, 6, 7, 8, 9, 10].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              {/* No WhatsApp */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx (untuk konfirmasi & Zoom)"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
                {formErrors.phone && <p className="text-[11px] text-red-500 font-semibold">{formErrors.phone}</p>}
              </div>

              {/* Email */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Alamat Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email.mahasiswa@student.ac.id"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
                {formErrors.email && <p className="text-[11px] text-red-500 font-semibold">{formErrors.email}</p>}
              </div>

            </div>
          </div>
        )}

        {/* STEP 2: AKADEMIK & RENCANA PKL */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-[#022B59]" />
              <h2 className="text-lg font-bold text-slate-900">2. Divisi Tujuan & Rencana Waktu PKL</h2>
            </div>

            {/* Division Selection with Interactive Quota Indicator */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Pilih Fungsi / Divisi Penempatan <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INITIAL_DIVISIONS.map((div) => {
                  const isSelected = selectedDivId === div.id;
                  return (
                    <div
                      key={div.id}
                      onClick={() => setSelectedDivId(div.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#022B59] bg-blue-50/70 shadow-xs ring-2 ring-[#022B59]/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-xs text-[#022B59] bg-white px-2 py-0.5 rounded border border-blue-200">
                          {div.code}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          div.availableQuota > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          Slot: {div.availableQuota} Tersisa
                        </span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 mb-1">{div.name}</h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{div.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Division Kuota Info Card (As in Image 9) */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500 text-white rounded-lg">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Penempatan Terpilih: {activeDivision.fullName}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Total Kuota: <strong className="text-slate-800">{activeDivision.totalQuota}</strong> • Slot Tersisa: <strong className="text-emerald-700">{activeDivision.availableQuota} Kursi</strong>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-amber-800 bg-amber-200/80 px-3 py-1 rounded-lg">
                  Kapasitas {Math.round(((activeDivision.totalQuota - activeDivision.availableQuota)/activeDivision.totalQuota)*100)}%
                </span>
              </div>
            </div>

            {/* Dates & Proposal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Tanggal Mulai PKL <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Tanggal Selesai PKL <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Durasi Estimasi</label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                >
                  <option value={1}>1 Bulan (4 Minggu)</option>
                  <option value={2}>2 Bulan (8 Minggu)</option>
                  <option value={3}>3 Bulan (Magang Standard)</option>
                  <option value={6}>6 Bulan (MBKM Kampus Merdeka)</option>
                </select>
              </div>
            </div>

            {/* Topik / Judul Proposal */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Topik / Judul Proposal Magang <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                placeholder="Contoh: Rancang Bangun Web GIS Pemetaan Data Komoditas Padi dan Jagung di BPS Provinsi Sulawesi Selatan"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              />
              {formErrors.proposalTitle && <p className="text-[11px] text-red-500 font-semibold">{formErrors.proposalTitle}</p>}
            </div>

          </div>
        )}

        {/* STEP 3: BERKAS DIGITAL */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#022B59]" />
                <h2 className="text-lg font-bold text-slate-900">3. Unggah Berkas Persyaratan (Format PDF, Maksimal 2 MB)</h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">Langkah Terakhir</span>
            </div>

            {/* Document Requirements Notice */}
            <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-slate-700 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-[#022B59] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#022B59]">Persyaratan Berkas Administrasi:</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Wajib mengunggah <strong>4 Dokumen Utama</strong> (Surat Rekomendasi, KRS, KTM, & Transkrip) dan <strong>1 Dokumen Opsional</strong> (CV). Semua file dalam format <strong>PDF</strong> dengan ukuran file maksimal <strong>2 MB</strong> per dokumen.
                </p>
              </div>
            </div>

            {/* Required Documents Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Required Documents (Dokumen Wajib)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Internship Recommendation Letter from University */}
                <div className={`p-4 rounded-xl border space-y-3.5 transition-all ${
                  filesState.surat_rekomendasi ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1">
                        <span>1. Internship Recommendation Letter from University</span>
                        <span className="text-red-500">*</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Surat Rekomendasi Magang / PKL Resmi dari Kampus</p>
                    </div>
                    
                    {/* Status Indicator */}
                    {filesState.surat_rekomendasi ? (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>

                  {/* PDF Icon + Size Spec */}
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-[10px] shrink-0 border border-red-200 shadow-2xs">
                      PDF
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Format: File PDF (.pdf)</p>
                      <p className="text-[10px] text-slate-500">Maximum file size: <strong>2 MB</strong></p>
                    </div>
                  </div>

                  {/* File Upload / Preview Box */}
                  {filesState.surat_rekomendasi ? (
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs text-slate-800 truncate font-medium">
                          {typeof filesState.surat_rekomendasi === 'string' ? filesState.surat_rekomendasi : filesState.surat_rekomendasi.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <label className="cursor-pointer text-[10px] font-bold text-[#022B59] hover:underline px-2 py-1 bg-blue-50 rounded">
                          Ganti
                          <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('surat_rekomendasi', e)} />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeFile('surat_rekomendasi')}
                          className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                          title="Hapus File"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#022B59] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#022B59] mb-1" />
                      <span className="text-xs font-bold text-[#022B59]">Upload Recommendation Letter</span>
                      <span className="text-[10px] text-slate-400">PDF, Max 2 MB</span>
                      <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('surat_rekomendasi', e)} />
                    </label>
                  )}
                  {formErrors.surat_rekomendasi && <p className="text-[11px] text-red-500 font-semibold">{formErrors.surat_rekomendasi}</p>}
                </div>

                {/* 2. Kartu Rencana Studi (KRS) */}
                <div className={`p-4 rounded-xl border space-y-3.5 transition-all ${
                  filesState.krs ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1">
                        <span>2. Kartu Rencana Studi (KRS)</span>
                        <span className="text-red-500">*</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">KRS Semester Berjalan / Aktif</p>
                    </div>
                    
                    {/* Status Indicator */}
                    {filesState.krs ? (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>

                  {/* PDF Icon + Size Spec */}
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-[10px] shrink-0 border border-red-200 shadow-2xs">
                      PDF
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Format: File PDF (.pdf)</p>
                      <p className="text-[10px] text-slate-500">Maximum file size: <strong>2 MB</strong></p>
                    </div>
                  </div>

                  {/* File Upload / Preview Box */}
                  {filesState.krs ? (
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs text-slate-800 truncate font-medium">
                          {typeof filesState.krs === 'string' ? filesState.krs : filesState.krs.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <label className="cursor-pointer text-[10px] font-bold text-[#022B59] hover:underline px-2 py-1 bg-blue-50 rounded">
                          Ganti
                          <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('krs', e)} />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeFile('krs')}
                          className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                          title="Hapus File"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#022B59] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#022B59] mb-1" />
                      <span className="text-xs font-bold text-[#022B59]">Upload KRS File</span>
                      <span className="text-[10px] text-slate-400">PDF, Max 2 MB</span>
                      <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('krs', e)} />
                    </label>
                  )}
                  {formErrors.krs && <p className="text-[11px] text-red-500 font-semibold">{formErrors.krs}</p>}
                </div>

                {/* 3. Student ID Card (KTM) */}
                <div className={`p-4 rounded-xl border space-y-3.5 transition-all ${
                  filesState.ktm ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1">
                        <span>3. Student ID Card (KTM)</span>
                        <span className="text-red-500">*</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Kartu Tanda Mahasiswa Aktif</p>
                    </div>
                    
                    {/* Status Indicator */}
                    {filesState.ktm ? (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>

                  {/* PDF Icon + Size Spec */}
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-[10px] shrink-0 border border-red-200 shadow-2xs">
                      PDF
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Format: File PDF (.pdf)</p>
                      <p className="text-[10px] text-slate-500">Maximum file size: <strong>2 MB</strong></p>
                    </div>
                  </div>

                  {/* File Upload / Preview Box */}
                  {filesState.ktm ? (
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs text-slate-800 truncate font-medium">
                          {typeof filesState.ktm === 'string' ? filesState.ktm : filesState.ktm.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <label className="cursor-pointer text-[10px] font-bold text-[#022B59] hover:underline px-2 py-1 bg-blue-50 rounded">
                          Ganti
                          <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('ktm', e)} />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeFile('ktm')}
                          className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                          title="Hapus File"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#022B59] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#022B59] mb-1" />
                      <span className="text-xs font-bold text-[#022B59]">Upload Student ID Card (KTM)</span>
                      <span className="text-[10px] text-slate-400">PDF, Max 2 MB</span>
                      <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('ktm', e)} />
                    </label>
                  )}
                  {formErrors.ktm && <p className="text-[11px] text-red-500 font-semibold">{formErrors.ktm}</p>}
                </div>

                {/* 4. Academic Transcript */}
                <div className={`p-4 rounded-xl border space-y-3.5 transition-all ${
                  filesState.transkrip ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1">
                        <span>4. Academic Transcript</span>
                        <span className="text-red-500">*</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Transkrip Nilai Akademik Terakhir</p>
                    </div>
                    
                    {/* Status Indicator */}
                    {filesState.transkrip ? (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>

                  {/* PDF Icon + Size Spec */}
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-[10px] shrink-0 border border-red-200 shadow-2xs">
                      PDF
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Format: File PDF (.pdf)</p>
                      <p className="text-[10px] text-slate-500">Maximum file size: <strong>2 MB</strong></p>
                    </div>
                  </div>

                  {/* File Upload / Preview Box */}
                  {filesState.transkrip ? (
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs text-slate-800 truncate font-medium">
                          {typeof filesState.transkrip === 'string' ? filesState.transkrip : filesState.transkrip.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <label className="cursor-pointer text-[10px] font-bold text-[#022B59] hover:underline px-2 py-1 bg-blue-50 rounded">
                          Ganti
                          <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('transkrip', e)} />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeFile('transkrip')}
                          className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                          title="Hapus File"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#022B59] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#022B59] mb-1" />
                      <span className="text-xs font-bold text-[#022B59]">Upload Academic Transcript</span>
                      <span className="text-[10px] text-slate-400">PDF, Max 2 MB</span>
                      <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('transkrip', e)} />
                    </label>
                  )}
                  {formErrors.transkrip && <p className="text-[11px] text-red-500 font-semibold">{formErrors.transkrip}</p>}
                </div>

              </div>
            </div>

            {/* Optional Document Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span>Optional Document (Dokumen Opsional)</span>
              </h3>

              {/* Curriculum Vitae (CV) */}
              <div className={`p-4 rounded-xl border space-y-3.5 transition-all max-w-2xl ${
                filesState.cv ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                      <span>Curriculum Vitae (CV)</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-semibold">Optional</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Daftar Riwayat Hidup / Resume Mahasiswa</p>
                  </div>
                  
                  {/* Status Indicator */}
                  {filesState.cv ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Uploaded</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-200/80 text-slate-700 border border-slate-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shrink-0">
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <span>Not Uploaded</span>
                    </span>
                  )}
                </div>

                {/* PDF Icon + Size Spec */}
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-[10px] shrink-0 border border-red-200 shadow-2xs">
                    PDF
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Format: File PDF (.pdf)</p>
                    <p className="text-[10px] text-slate-500">Maximum file size: <strong>2 MB</strong></p>
                  </div>
                </div>

                {/* File Upload / Preview Box */}
                {filesState.cv ? (
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs text-slate-800 truncate font-medium">
                        {typeof filesState.cv === 'string' ? filesState.cv : filesState.cv.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <label className="cursor-pointer text-[10px] font-bold text-[#022B59] hover:underline px-2 py-1 bg-blue-50 rounded">
                        Ganti
                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('cv', e)} />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeFile('cv')}
                        className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                        title="Hapus File"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#022B59] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#022B59] mb-1" />
                    <span className="text-xs font-bold text-[#022B59]">Upload Curriculum Vitae (CV)</span>
                    <span className="text-[10px] text-slate-400">PDF, Max 2 MB</span>
                    <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload('cv', e)} />
                  </label>
                )}
              </div>
            </div>

            {/* Terms Declaration Checkbox */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" defaultChecked required className="mt-1 rounded text-[#022B59] focus:ring-[#022B59]" />
                <span className="text-xs text-slate-700 leading-relaxed">
                  Saya menyatakan bahwa seluruh data dan dokumen yang diisikan adalah BENAR dan SAH dari institusi pendidikan asal. BPS Sulawesi Selatan berhak membatalkan permohonan apabila ditemukan ketidaksesuaian data.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#022B59] hover:bg-blue-900 text-white font-bold text-xs shadow-md flex items-center space-x-1"
            >
              <span>Lanjut ke Tahap {currentStep + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-[#F2A900] hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                  <span>Mengirimkan Permohonan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Kirimkan Form Pendaftaran</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>

    </div>
  );
};
