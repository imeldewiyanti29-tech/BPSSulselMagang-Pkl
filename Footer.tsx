import React from 'react';
import { NavPage } from '../types';
import { OFFICE_INFO } from '../data/mockData';
import bpsLogo from '../assets/images/bps_symbol_logo_clean_1785123554734.jpg';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-[#021B38] text-slate-300 pt-12 pb-8 border-t-4 border-[#F2A900]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-1 shadow">
                <img 
                  src={bpsLogo} 
                  alt="Logo BPS Sulsel" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm tracking-wide">
                  BADAN PUSAT STATISTIK
                </h3>
                <p className="text-amber-400 text-xs font-semibold">
                  PROVINSI SULAWESI SELATAN
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Portal Resmi Layanan Pengajuan Praktik Kerja Lapangan (PKL) & Magang Mahasiswa BPS Provinsi Sulawesi Selatan. Menyediakan data berkualitas untuk Indonesia Maju.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-900/80 text-blue-200 border border-blue-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Layanan Publik Gratis
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider text-amber-400">
              Navigasi Layanan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Beranda Portal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('divisi')}
                  className="hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Daftar Divisi & Kuota Magang</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('form')}
                  className="hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Formulir Pengajuan PKL Online</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('status')}
                  className="hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Lacak Status Permohonan</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('support')}
                  className="hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Pusat Bantuan & FAQ</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className="hover:text-amber-300 flex items-center space-x-1 transition-colors text-slate-400"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Portal Administrator BPS</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider text-amber-400">
              Kontak & Lokasi Kantor
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>{OFFICE_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{OFFICE_INFO.phone} / WA: {OFFICE_INFO.whatsapp}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{OFFICE_INFO.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{OFFICE_INFO.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Sites & Tautan Terkait */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider text-amber-400">
              Tautan Resmi BPS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://sulsel.bps.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-1.5 hover:text-white text-slate-300 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Website BPS Prov. Sulsel</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://bps.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-1.5 hover:text-white text-slate-300 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>BPS Republik Indonesia</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sardine.bps.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-1.5 hover:text-white text-slate-300 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Layanan PST BPS Online</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400">Media Sosial Resmi:</p>
              <div className="flex space-x-2 pt-1 text-xs">
                <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-amber-300 font-mono">
                  {OFFICE_INFO.social.instagram}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© 2025 Badan Pusat Statistik Provinsi Sulawesi Selatan. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-[11px] text-slate-400">
            Satu Data Indonesia • BPS Sulsel Digital Transformation Portal
          </p>
        </div>
      </div>
    </footer>
  );
};
