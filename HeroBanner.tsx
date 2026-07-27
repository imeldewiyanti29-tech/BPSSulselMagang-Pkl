import React from 'react';
import { NavPage } from '../types';
import bpsLogo from '../assets/images/bps_symbol_logo_clean_1785123554734.jpg';
import bpsOfficeBuilding from '../assets/images/bps_building_photo_1785123684907.jpg';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Award, 
  Calendar, 
  Sparkles,
  FileCheck2
} from 'lucide-react';

interface HeroBannerProps {
  setCurrentPage: (page: NavPage) => void;
  openAuthModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ setCurrentPage, openAuthModal }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#022B59] via-[#022349] to-[#011832] text-white py-12 lg:py-16">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Action CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-900/80 border border-blue-500/40 text-amber-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Pendaftaran Gelombang II Tahun 2025 Telah Dibuka!</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Portal Pengajuan <span className="text-amber-400">PKL & Magang</span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-blue-200">
                Badan Pusat Statistik Provinsi Sulawesi Selatan
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              "Satu Langkah Menuju Kontribusi Nyata Bagi Bangsa" — Dapatkan pengalaman profesional langsung dalam pengolahan data, statistik terapan, analisis makro ekonomi, dan teknologi informasi statistik di instansi pemerintah terpercaya.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage('form')}
                id="hero-apply-btn"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-[#F2A900] hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 hover:scale-[1.02]"
              >
                <span>Ajukan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('divisi')}
                id="hero-divisi-btn"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center space-x-2 backdrop-blur-xs"
              >
                <span>Pelajari Selengkapnya</span>
              </button>

              <button
                onClick={openAuthModal}
                id="hero-login-link"
                className="text-xs font-semibold text-blue-300 hover:text-white underline underline-offset-4 ml-2"
              >
                Sudah punya akun? Masuk
              </button>
            </div>

            {/* Key Value Points */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-blue-900/80 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">Proses Online 100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">Sertifikat Resmi BPS</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">Bimbingan Mentor Senior</span>
              </div>
            </div>

          </div>

          {/* Right Column: BPS Building Graphic Card (as in Image 2 & 8) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-amber-400/30 via-blue-400/20 to-emerald-400/30 shadow-2xl">
              <div className="relative bg-slate-900 rounded-xl overflow-hidden group">
                
                {/* Building Visual Photo */}
                <div className="relative h-72 sm:h-80 flex flex-col justify-between p-6 overflow-hidden">
                  
                  {/* Real Photo of BPS Sulsel Office Building */}
                  <img 
                    src={bpsOfficeBuilding} 
                    alt="Gedung Kantor BPS Provinsi Sulawesi Selatan"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20"></div>

                  {/* Floating Top Badge with Logo */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md p-1.5 pr-3 rounded-xl border border-slate-700/80 shadow-lg">
                      <img 
                        src={bpsLogo} 
                        alt="Logo BPS" 
                        className="w-7 h-7 object-contain bg-white rounded-lg p-0.5" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-white text-xs font-black uppercase tracking-wider">
                        Gedung BPS Sulsel
                      </span>
                    </div>

                    <span className="px-2.5 py-1 bg-emerald-500/90 text-white border border-emerald-400/50 rounded-full text-[11px] font-bold flex items-center space-x-1 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span>Layanan PST BPS</span>
                    </span>
                  </div>

                  {/* Building Address & Quick Stats Box */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-slate-200 bg-slate-900/80 backdrop-blur-xs p-2 rounded-lg border border-slate-700/60">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate font-medium">Jalan H. Bau No. 6, Kota Makassar, Kode Pos 90125</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-slate-900/85 backdrop-blur-xs p-2 rounded-lg border border-slate-700/80">
                        <p className="text-[10px] text-slate-400">Total Alumni PKL</p>
                        <p className="text-sm font-bold text-amber-400">500+ Mahasiswa</p>
                      </div>
                      <div className="bg-slate-900/85 backdrop-blur-xs p-2 rounded-lg border border-slate-700/80">
                        <p className="text-[10px] text-slate-400">Divisi Penempatan</p>
                        <p className="text-sm font-bold text-blue-400">6 Fungsi Utama</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
