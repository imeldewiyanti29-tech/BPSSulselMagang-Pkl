import React from 'react';
import { NavPage, UserSession } from '../types';
import bpsLogo from '../assets/images/bps_symbol_logo_clean_1785123554734.jpg';
import { 
  Building2, 
  FileText, 
  SearchCheck, 
  HelpCircle, 
  ShieldCheck, 
  User, 
  LogOut, 
  Layers, 
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
  openAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  session,
  setSession,
  openAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    setSession({ isLoggedIn: false, role: null });
    setCurrentPage('home');
  };

  const navItems = [
    { id: 'home' as NavPage, label: 'Beranda', icon: Building2 },
    { id: 'divisi' as NavPage, label: 'Divisi & Kuota', icon: Layers },
    { id: 'form' as NavPage, label: 'Pengajuan PKL', icon: FileText },
    { id: 'status' as NavPage, label: 'Status Pengajuan', icon: SearchCheck },
    { id: 'support' as NavPage, label: 'Pusat Bantuan', icon: HelpCircle },
    { id: 'admin' as NavPage, label: 'Portal Pengelola', icon: ShieldCheck, badge: 'BPS' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#022B59] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#F2A900] text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide">
              RESMI
            </span>
            <span className="text-slate-200 hidden sm:inline">
              Portal Rekrutmen PKL & Magang BPS Provinsi Sulawesi Selatan Tahun 2025
            </span>
            <span className="text-slate-200 sm:hidden">BPS Prov. Sulsel Portal Magang</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-300">
            <span>Makassar, WITA</span>
            <span className="text-slate-500">|</span>
            <a href="https://sulsel.bps.go.id" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">
              sulsel.bps.go.id ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Agency Identity */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
            id="bps-logo-button"
          >
            {/* BPS Emblem Logo Graphic */}
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-slate-200 group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src={bpsLogo} 
                alt="Logo BPS Sulawesi Selatan" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-base font-extrabold text-[#022B59] tracking-tight group-hover:text-blue-800">
                  BADAN PUSAT STATISTIK
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-600 tracking-wider uppercase">
                PROVINSI SULAWESI SELATAN
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Satu Data • Penyedia Data Statistik Terpercaya
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#022B59] border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-[#022B59] hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#022B59]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Auth Section */}
          <div className="hidden sm:flex items-center space-x-3">
            {session.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-800">
                    {session.name || 'Pengguna'}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {session.role === 'admin' ? 'Pengelola BPS' : 'Mahasiswa Pemohon'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Keluar / Logout"
                  id="logout-btn"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={openAuthModal}
                  id="header-login-btn"
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#022B59] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </button>
                
                <button
                  onClick={() => setCurrentPage('form')}
                  id="header-[#022B59]-cta-btn"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#022B59] hover:bg-blue-900 shadow-md transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ajukan PKL</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-[#022B59] font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-[#022B59]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2">
            {session.isLoggedIn ? (
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{session.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {session.role === 'admin' ? 'Administrator BPS' : 'Mahasiswa'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 text-center text-xs font-bold text-[#022B59] bg-slate-100 rounded-lg border border-slate-300"
                >
                  Masuk Akun
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('form');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 text-center text-xs font-bold text-white bg-[#022B59] rounded-lg shadow-sm"
                >
                  Form Pengajuan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
