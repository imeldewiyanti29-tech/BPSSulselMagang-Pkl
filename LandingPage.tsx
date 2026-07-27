import React from 'react';
import { NavPage, DivisionInfo } from '../types';
import { INITIAL_DIVISIONS, FAQ_LIST, OFFICE_INFO } from '../data/mockData';
import { HeroBanner } from './HeroBanner';
import { 
  FileCheck2, 
  CalendarDays, 
  PieChart, 
  Clock, 
  HelpCircle, 
  UserPlus, 
  FileText, 
  Search, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Building,
  Award,
  BookOpen,
  Send,
  Users
} from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: NavPage) => void;
  openAuthModal: () => void;
  setSelectedDivision?: (div: DivisionInfo) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  setCurrentPage, 
  openAuthModal,
  setSelectedDivision 
}) => {
  const [openFaqId, setOpenFaqId] = React.useState<string | null>('faq-1');

  const highlightCards = [
    {
      icon: FileCheck2,
      title: 'Persyaratan Administrasi',
      desc: 'Mahasiswa aktif D3/D4/S1 dengan Surat Pengantar resmi dari Kampus, Transkrip IPK, CV, dan Proposal.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-600 text-white'
    },
    {
      icon: CalendarDays,
      title: 'Jadwal & Gelombang',
      desc: 'Pendaftaran dibuka sepanjang tahun dalam 4 Gelombang Periodik (Jan, Apr, Jul, Okt) atau MBKM Kampus Merdeka.',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-500 text-white'
    },
    {
      icon: PieChart,
      title: 'Divisi & Kuota Interaktif',
      desc: '6 Fungsi Statistik pilihan (IPDS, Sosial, Nerwilis, Produksi, Distribusi, Umum) dengan monitoring sisa slot real-time.',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white'
    },
    {
      icon: Clock,
      title: 'Durasi & Fleksibilitas',
      desc: 'Durasi PKL 1–3 bulan (Magang Reguler) hingga 6 bulan (MBKM Mandiri). Jam kerja operasional Senin - Jumat 08:00 - 16:00 WITA.',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-600 text-white'
    },
    {
      icon: HelpCircle,
      title: 'Layanan Kontak Admin',
      desc: 'Dukungan Helpdesk via WhatsApp Hotline BPS Sulsel, email resmi bps7300@bps.go.id, dan Pelayanan Statistik Terpadu (PST).',
      color: 'bg-slate-50 text-slate-800 border-slate-200',
      iconBg: 'bg-[#022B59] text-white'
    }
  ];

  const stepsFlow = [
    {
      step: '1',
      title: 'Registrasi Akun',
      desc: 'Buat akun pemohon baru dengan NIM, Nama, dan Universitas Anda.',
      icon: UserPlus
    },
    {
      step: '2',
      title: 'Lengkapi Form & Berkas',
      desc: 'Pilih Divisi Tujuan, tanggal magang, dan unggah PDF Surat Pengantar & CV.',
      icon: FileText
    },
    {
      step: '3',
      title: 'Seleksi Administrasi',
      desc: 'Tim Sekretariat BPS Sulsel memverifikasi keabsahan dokumen dalam 2-3 hari kerja.',
      icon: Search
    },
    {
      step: '4',
      title: 'Konfirmasi / Wawancara',
      desc: 'Pembina Fungsi terkait melakukan konfirmasi jadwal dan kecocokan topik.',
      icon: UserCheck
    },
    {
      step: '5',
      title: 'Surat Penerimaan',
      desc: 'Unduh Surat Balasan Resmi BPS Sulsel dan bersiap Onboarding.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="space-y-16 pb-16 bg-slate-50">
      
      {/* Hero Banner Section */}
      <HeroBanner setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} />

      {/* 1. Highlights Info Cards Section (As in Image 8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-extrabold text-[#022B59] uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Informasi Utama Program
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Panduan & Ketentuan Magang di BPS Sulawesi Selatan
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Pelajari setiap komponen persyaratan dan kemudahan proses administrasi online yang kami sediakan untuk mahasiswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${card.color}`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-xl ${card.iconBg} shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{card.title}</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}

          {/* Quick Stats Summary Card */}
          <div className="p-6 rounded-2xl bg-[#022B59] text-white shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                Statistik Pengajuan
              </span>
              <h3 className="text-xl font-black text-white">2,800+ Mahasiswa</h3>
              <p className="text-xs text-blue-200 leading-relaxed">
                Telah mendaftar dan menimba ilmu statistik terapan di kantor BPS Provinsi Sulawesi Selatan.
              </p>
            </div>
            <div className="pt-4 border-t border-blue-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-300">Kepuasan Alumni:</span>
              <span className="font-extrabold text-amber-400">98.5% Sangat Memuaskan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tahapan Pengajuan PKL & Magang (5-Step Visual Flow) */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Alur Pendaftaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              5 Tahapan Pengajuan PKL & Magang
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Proses serba digital dari pengisian formulir hingga penerbitan Surat Penerimaan Resmi BPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stepsFlow.map((stepItem, index) => {
              const StepIcon = stepItem.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#022B59] text-white font-black text-xs flex items-center justify-center shadow">
                      {stepItem.step}
                    </span>
                    <StepIcon className="w-5 h-5 text-amber-500" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#022B59] transition-colors">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-snug">
                      {stepItem.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-semibold text-blue-700">
                      Estimasi: 1-2 Hari
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentPage('form')}
              id="landing-step-cta"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#022B59] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <span>Mulai Pengajuan Sekarang</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. Division & Quota Preview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Pilihan Penempatan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Divisi & Kuota Magang Tersedia
            </h2>
            <p className="text-sm text-slate-600">
              Pilih Fungsi Statistik yang sesuai dengan latar belakang minat dan program studi Anda.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('divisi')}
            className="text-xs font-bold text-[#022B59] hover:text-amber-600 flex items-center space-x-1 underline underline-offset-4"
          >
            <span>Lihat Seluruh Detail Divisi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_DIVISIONS.map((div) => (
            <div 
              key={div.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-blue-100 text-[#022B59] font-black text-xs rounded-lg">
                    {div.code}
                  </span>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                    div.availableQuota > 0 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${div.availableQuota > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span>Sisa Kuota: {div.availableQuota} / {div.totalQuota}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 line-clamp-1">
                  {div.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {div.description}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] font-bold text-slate-500 mb-1">Keahlian Dibutuhkan:</p>
                  <div className="flex flex-wrap gap-1">
                    {div.requiredSkills.slice(0, 3).map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {skill}
                      </span>
                    ))}
                    {div.requiredSkills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                        +{div.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Ketua: {div.headName?.split(',')[0]}
                </span>
                <button
                  onClick={() => {
                    if (setSelectedDivision) setSelectedDivision(div);
                    setCurrentPage('form');
                  }}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-[#022B59] hover:text-white text-[#022B59] text-xs font-bold rounded-lg border border-blue-200 transition-colors"
                >
                  Pilih Divisi
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Internship at BPS Sulsel (Mengapa Magang di BPS) */}
      <section className="bg-[#022B59] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider bg-blue-900/80 px-3 py-1 rounded-full border border-blue-700">
              Nilai & Manfaat
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Mengapa Mengambil Magang di BPS Sulsel?
            </h2>
            <p className="text-sm text-blue-200">
              Pengalaman nyata dalam ekosistem Satu Data Indonesia dan pemodelan statistik regional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-blue-900/40 rounded-2xl border border-blue-700/60 space-y-3">
              <Award className="w-8 h-8 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Sertifikat Resmi Instansi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mendapatkan Sertifikat Resmi dari Badan Pusat Statistik yang diakui secara nasional sebagai bukti portofolio kerja.
              </p>
            </div>

            <div className="p-5 bg-blue-900/40 rounded-2xl border border-blue-700/60 space-y-3">
              <Users className="w-8 h-8 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">Bimbingan Statistisi Senior</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Didampingi langsung oleh Statistisi Ahli dan Pranata Komputer BPS dalam pengerjaan tugas & riset skripsi.
              </p>
            </div>

            <div className="p-5 bg-blue-900/40 rounded-2xl border border-blue-700/60 space-y-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <h3 className="font-bold text-sm text-white">Akses Data & Metodologi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Akses eksklusif ke metodologi survei, sensus, dan sistem mikrodata resmi BPS Provinsi Sulawesi Selatan.
              </p>
            </div>

            <div className="p-5 bg-blue-900/40 rounded-2xl border border-blue-700/60 space-y-3">
              <Building className="w-8 h-8 text-purple-400" />
              <h3 className="font-bold text-sm text-white">Konversi SKS & MBKM</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Laporan magang dan jam kerja yang kompatibel dengan skema konversi SKS mata kuliah kampus Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Preview Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Pertanyaan Populer
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-sm text-slate-600">
            Temukan jawaban langsung seputar prosedur, jadwal, dan syarat berkas magang.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.slice(0, 4).map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-sm text-slate-900">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#022B59] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentPage('support')}
            className="text-xs font-bold text-[#022B59] hover:text-amber-600 underline underline-offset-4"
          >
            Lihat Seluruh Pusat Bantuan & Pertanyaan Lainnya
          </button>
        </div>
      </section>

      {/* 6. Bottom Banner CTA (As in Image 8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#022B59] to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 max-w-xl">
            <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
              GELOMBANG BERJALAN
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Siap Memulai Karir & Pengalaman Statistik Anda?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              Daftarkan diri Anda hari ini dan jadilah bagian dari penyediaan data statistik terpercaya di Provinsi Sulawesi Selatan.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setCurrentPage('form')}
              className="px-6 py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all text-center"
            >
              Ajukan PKL Sekarang
            </button>
            <button
              onClick={() => setCurrentPage('support')}
              className="px-5 py-3.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-center"
            >
              Hubungi Admin BPS
            </button>
          </div>

          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </section>

    </div>
  );
};
