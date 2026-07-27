import React from 'react';
import { NavPage, ApplicantData, ApplicationStatusType } from '../types';
import { INITIAL_APPLICANTS } from '../data/mockData';
import { 
  SearchCheck, 
  FileText, 
  Bell, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileCheck, 
  Download, 
  ExternalLink, 
  User, 
  Calendar, 
  Building, 
  Video, 
  Info, 
  AlertTriangle,
  Award,
  Sparkles,
  ChevronRight,
  Printer
} from 'lucide-react';

interface ApplicantDashboardProps {
  applicants: ApplicantData[];
  setCurrentPage: (page: NavPage) => void;
}

export const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({ applicants, setCurrentPage }) => {
  const [activeTab, setActiveTab] = React.useState<'status' | 'documents' | 'notifications'>('status');
  const [selectedRegInput, setSelectedRegInput] = React.useState<string>('BPS-PKL-2025-0842');
  const [activeApplicant, setActiveApplicant] = React.useState<ApplicantData>(
    applicants[0] || INITIAL_APPLICANTS[0]
  );
  const [showLetterModal, setShowLetterModal] = React.useState<boolean>(false);

  const handleSearchReg = (e: React.FormEvent) => {
    e.preventDefault();
    const found = applicants.find(a => a.regNumber.toLowerCase() === selectedRegInput.trim().toLowerCase());
    if (found) {
      setActiveApplicant(found);
    } else {
      alert(`Nomor registrasi "${selectedRegInput}" tidak ditemukan dalam sistem. Menampilkan sampel pendaftaran.`);
    }
  };

  const getStatusStepIndex = (status: ApplicationStatusType): number => {
    switch (status) {
      case 'Submitted': return 1;
      case 'Under Review': return 2;
      case 'Interview': return 3;
      case 'Accepted': return 4;
      case 'Rejected': return 2;
      default: return 1;
    }
  };

  const currentStepIdx = getStatusStepIndex(activeApplicant.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Search & Selector Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <SearchCheck className="w-6 h-6 text-[#022B59]" />
            <span>Pelacakan Status Pengajuan PKL / Magang</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Masukkan Nomor Registrasi pendaftaran Anda untuk mengecek progres verifikasi secara real-time.
          </p>
        </div>

        <form onSubmit={handleSearchReg} className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            value={selectedRegInput}
            onChange={(e) => setSelectedRegInput(e.target.value)}
            placeholder="Contoh: BPS-PKL-2025-0842"
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-mono w-full md:w-64 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#022B59] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition-colors shrink-0"
          >
            Cari Status
          </button>
        </form>
      </div>

      {/* Tabs Header (Status Aplikasi, Dokumen & Berkas, Pemberitahuan) */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'status'
              ? 'border-[#022B59] text-[#022B59]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <SearchCheck className="w-4 h-4" />
          <span>Status Aplikasi</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'documents'
              ? 'border-[#022B59] text-[#022B59]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Dokumen Terunggah ({activeApplicant.documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 relative ${
            activeTab === 'notifications'
              ? 'border-[#022B59] text-[#022B59]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Pemberitahuan Terbaru</span>
          {activeApplicant.notifications.some(n => !n.read) && (
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          )}
        </button>
      </div>

      {/* TAB 1: STATUS APLIKASI & TRACKER (Matching Image 4) */}
      {activeTab === 'status' && (
        <div className="space-y-8">
          
          {/* Top Status Banner & Progress bar */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[11px] font-mono text-slate-500">REGISTRATION NO: {activeApplicant.regNumber}</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{activeApplicant.fullName}</h2>
                <p className="text-xs text-slate-600">{activeApplicant.university} • {activeApplicant.major}</p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status Terakhir:</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase ${
                    activeApplicant.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : activeApplicant.status === 'Under Review' || activeApplicant.status === 'Interview'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : activeApplicant.status === 'Rejected'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {activeApplicant.status === 'Accepted' && '✓ DITERIMA (ACCEPTED)'}
                    {activeApplicant.status === 'Under Review' && '⏳ VERIFIKASI (UNDER REVIEW)'}
                    {activeApplicant.status === 'Interview' && '💬 JADWAL WAWANCARA'}
                    {activeApplicant.status === 'Submitted' && '📥 TERKIRIM (SUBMITTED)'}
                    {activeApplicant.status === 'Rejected' && '✕ DITOLAK (REJECTED)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Kelengkapan Profil & Berkas Administrasi</span>
                <span className="text-[#022B59]">{activeApplicant.completionPercentage}% Selesai</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-[#022B59] to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeApplicant.completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Interactive Timeline Stepper Tracker (Image 4) */}
            <div className="pt-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                Alur Pelacakan Permohonan:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                
                {/* Step 1: Submitted */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  currentStepIdx >= 1 ? 'bg-blue-50/80 border-blue-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-[#022B59] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Submitted</h4>
                    <p className="text-[11px] text-slate-500">Berkas Diterima</p>
                    <p className="text-[10px] text-slate-400 mt-1">{activeApplicant.submissionDate}</p>
                  </div>
                </div>

                {/* Step 2: Under Review */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  currentStepIdx >= 2 ? 'bg-amber-50/80 border-amber-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    {currentStepIdx >= 2 ? (
                      <Clock className="w-5 h-5 text-amber-600 animate-spin" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-slate-300"></span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Under Review</h4>
                    <p className="text-[11px] text-slate-500">Verifikasi Berkas</p>
                    <p className="text-[10px] text-slate-400 mt-1">Tim Sekretariat BPS</p>
                  </div>
                </div>

                {/* Step 3: Interview / Confirmation */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  currentStepIdx >= 3 ? 'bg-purple-50/80 border-purple-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    {currentStepIdx >= 3 ? (
                      <Video className="w-5 h-5 text-purple-600" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-slate-300"></span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Interview</h4>
                    <p className="text-[11px] text-slate-500">Wawancara Pembina</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {activeApplicant.interviewDate || 'Menunggu Jadwal'}
                    </p>
                  </div>
                </div>

                {/* Step 4: Accepted & Official Letter */}
                <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  activeApplicant.status === 'Accepted' ? 'bg-emerald-50/80 border-emerald-400' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    {activeApplicant.status === 'Accepted' ? (
                      <Award className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-slate-300"></span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Accepted</h4>
                    <p className="text-[11px] text-slate-500">Surat Balasan Terbit</p>
                    {activeApplicant.status === 'Accepted' ? (
                      <button
                        onClick={() => setShowLetterModal(true)}
                        className="mt-1 text-[10px] font-bold text-emerald-800 underline"
                      >
                        Unduh Surat Resmi ↗
                      </button>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1">Pending</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Note & Interview Banner */}
            {activeApplicant.interviewLink && activeApplicant.status === 'Interview' && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Video className="w-6 h-6 text-purple-700 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-purple-900">Sesi Wawancara Daring Ditetapkan</p>
                    <p className="text-[11px] text-purple-700">Jadwal: {activeApplicant.interviewDate}</p>
                  </div>
                </div>
                <a
                  href={activeApplicant.interviewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-purple-700 text-white font-bold text-xs rounded-lg shadow hover:bg-purple-800"
                >
                  Gabung Zoom ↗
                </a>
              </div>
            )}

            {/* Acceptance Letter Quick Download Card if Accepted */}
            {activeApplicant.status === 'Accepted' && (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-600 text-white rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-emerald-950">
                      Selamat! Permohonan PKL Disetujui BPS Sulsel
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Surat Balasan Penerimaan Resmi SK-PKL-BPS-7300/2025 telah diterbitkan.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowLetterModal(true)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Lihat & Cetak Surat Balasan</span>
                </button>
              </div>
            )}

          </div>

          {/* Applicant Profile Information Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <User className="w-4 h-4 text-[#022B59]" />
                <span>Rincian Pengajuan Penempatan</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Fungsi / Divisi Tujuan:</span>
                  <span className="font-bold text-[#022B59]">{activeApplicant.divisionName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Rencana Periode PKL:</span>
                  <span className="font-bold text-slate-800">{activeApplicant.startDate} s/d {activeApplicant.endDate} ({activeApplicant.durationMonths} Bulan)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Tanggal Pengajuan:</span>
                  <span className="font-bold text-slate-800">{activeApplicant.submissionDate}</span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-slate-500 block">Topik / Judul Proposal:</span>
                  <p className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    "{activeApplicant.proposalTitle}"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Building className="w-4 h-4 text-[#022B59]" />
                <span>Kontak & Data Mahasiswa</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">NIM / NPM:</span>
                  <span className="font-mono font-bold text-slate-800">{activeApplicant.nim}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">NIK KTP:</span>
                  <span className="font-mono text-slate-700">{activeApplicant.nik}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Email Mahasiswa:</span>
                  <span className="font-bold text-slate-800">{activeApplicant.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">WhatsApp Active:</span>
                  <span className="font-mono font-bold text-slate-800">{activeApplicant.phone}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: DOKUMEN & BERKAS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Daftar Dokumen Administrasi Terunggah</h2>
              <p className="text-xs text-slate-500">Berikut adalah file persyaratan yang telah diterima oleh Sekretariat BPS Sulsel.</p>
            </div>
            <button 
              onClick={() => setCurrentPage('form')}
              className="px-3 py-1.5 text-xs font-bold text-[#022B59] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
            >
              + Tambah / Perbarui Berkas
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {activeApplicant.documents.map((doc) => (
              <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 text-[#022B59] rounded-xl border border-blue-200">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{doc.title}</h4>
                    <p className="text-[11px] text-slate-500">{doc.fileName} • {doc.fileSize}</p>
                    <p className="text-[10px] text-slate-400">Diunggah: {doc.uploadDate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    doc.status === 'Verified' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {doc.status === 'Verified' ? '✓ Dokumen Valid' : '⏳ Verifikasi Berkas'}
                  </span>

                  <button 
                    onClick={() => alert(`Mengunduh sampel berkas: ${doc.fileName}`)}
                    className="p-2 text-slate-500 hover:text-[#022B59] hover:bg-slate-100 rounded-lg border border-slate-200"
                    title="Unduh File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PEMBERITAHUAN TERBARU */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            Pemberitahuan & Update Sistem
          </h2>

          <div className="space-y-3">
            {activeApplicant.notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 rounded-xl border transition-all ${
                  notif.type === 'success' ? 'bg-emerald-50/70 border-emerald-200' :
                  notif.type === 'warning' ? 'bg-amber-50/70 border-amber-200' :
                  notif.type === 'alert' ? 'bg-red-50/70 border-red-200' :
                  'bg-blue-50/70 border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-xs text-slate-900">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFICIAL ACCEPTANCE LETTER PREVIEW MODAL */}
      {showLetterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-slate-300 shadow-2xl relative my-8">
            
            <button
              onClick={() => setShowLetterModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              ✕
            </button>

            {/* Official BPS Header Simulation */}
            <div className="border-b-4 border-double border-slate-900 pb-4 text-center space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <span className="font-black text-[#022B59] text-base">BADAN PUSAT STATISTIK</span>
              </div>
              <p className="font-extrabold text-xs uppercase text-slate-900">PROVINSI SULAWESI SELATAN</p>
              <p className="text-[10px] text-slate-600">Jalan H. Bau No. 6, Kota Makassar, Kode Pos 90125, Telp: (0411) 854838, Website: sulsel.bps.go.id</p>
            </div>

            {/* Document Content */}
            <div className="space-y-4 text-xs text-slate-800 font-serif leading-relaxed">
              <div className="flex justify-between text-[11px] font-sans">
                <div>
                  <p>Nomor : B-7300/PKL/08/2025</p>
                  <p>Sifat : Biasa</p>
                  <p>Hal : Surat Balasan Persetujuan PKL/Magang</p>
                </div>
                <p>Makassar, 20 Juni 2025</p>
              </div>

              <p className="pt-2 font-sans">Yth. Dekan / Ketua Program Studi<br /><strong>{activeApplicant.university}</strong></p>

              <p>
                Menindaklanjuti Surat Pengantar Permohonan Praktik Kerja Lapangan (PKL) atas nama mahasiswa:
              </p>

              <div className="bg-slate-50 p-4 rounded-lg font-sans text-xs space-y-1 border border-slate-200">
                <p><strong>Nama</strong> : {activeApplicant.fullName}</p>
                <p><strong>NIM</strong> : {activeApplicant.nim}</p>
                <p><strong>Program Studi</strong> : {activeApplicant.major}</p>
                <p><strong>Penempatan</strong> : {activeApplicant.divisionName}</p>
                <p><strong>Periode PKL</strong> : {activeApplicant.startDate} s.d. {activeApplicant.endDate}</p>
              </div>

              <p>
                Dengan ini disampaikan bahwa BPS Provinsi Sulawesi Selatan <strong>DAPAT Menerima</strong> mahasiswa tersebut di atas untuk melaksanakan Praktik Kerja Lapangan sesuai jadwal yang diajukan.
              </p>

              <p>
                Demikian surat balasan ini disampaikan untuk dipergunakan sebagaimana mestinya.
              </p>

              {/* Official Stamp Simulation */}
              <div className="pt-6 flex justify-end font-sans">
                <div className="text-center space-y-1 relative">
                  <p className="text-[11px]">a.n. Kepala BPS Provinsi Sulawesi Selatan</p>
                  <p className="text-[11px] font-bold">Kepala Bagian Umum</p>
                  
                  {/* Digital Stamp graphic */}
                  <div className="w-24 h-24 border-2 border-blue-600 rounded-full mx-auto my-2 flex items-center justify-center opacity-70 rotate-[-12deg] text-[9px] text-blue-700 font-bold p-1">
                    BPS SULSEL TERVERIFIKASI DIGITAL
                  </div>

                  <p className="font-bold underline">H. Kaharuddin, S.E., M.M.</p>
                  <p className="text-[10px] text-slate-500">NIP. 19680512 199003 1 002</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#022B59] text-white text-xs font-bold rounded-lg flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button
                onClick={() => setShowLetterModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-bold rounded-lg"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
