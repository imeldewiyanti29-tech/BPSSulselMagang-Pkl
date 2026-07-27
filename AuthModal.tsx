import React from 'react';
import { UserSession, NavPage } from '../types';
import bpsLogo from '../assets/images/bps_symbol_logo_clean_1785123554734.jpg';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  Phone,
  GraduationCap
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
  setCurrentPage: (page: NavPage) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  setSession,
  setCurrentPage
}) => {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');
  
  // Login State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Register State
  const [regName, setRegName] = React.useState('');
  const [regNim, setRegNim] = React.useState('');
  const [regCampus, setRegCampus] = React.useState('Universitas Hasanuddin (UNHAS)');
  const [regPhone, setRegPhone] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('bps')) {
      setSession({
        isLoggedIn: true,
        role: 'admin',
        name: 'Ir. Hendra Wijaya, M.Si. (BPS)',
        email: email || 'admin.bps@bps.go.id'
      });
      setCurrentPage('admin');
    } else {
      setSession({
        isLoggedIn: true,
        role: 'applicant',
        applicantId: 'app-001',
        name: regName || 'Andi Muhammad Resky',
        email: email || 'andiresky@student.unhas.ac.id'
      });
      setCurrentPage('status');
    }
    onClose();
  };

  const handleDemoLogin = (role: 'applicant' | 'admin') => {
    if (role === 'admin') {
      setSession({
        isLoggedIn: true,
        role: 'admin',
        name: 'Ir. Hendra Wijaya, M.Si. (BPS)',
        email: 'admin.bps7300@bps.go.id'
      });
      setCurrentPage('admin');
    } else {
      setSession({
        isLoggedIn: true,
        role: 'applicant',
        applicantId: 'app-001',
        name: 'Andi Muhammad Nur Resky',
        email: 'andiresky@student.unhas.ac.id'
      });
      setCurrentPage('status');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl relative my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 z-10 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Branding Banner (Image 1) */}
        <div className="bg-[#022B59] text-white p-6 sm:p-8 space-y-3 text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto p-1 shadow-lg">
            <img 
              src={bpsLogo} 
              alt="Logo BPS" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              PORTAL REKRUTMEN
            </p>
            <h2 className="text-lg font-black text-white tracking-wide">
              BADAN PUSAT STATISTIK
            </h2>
            <p className="text-[11px] text-blue-200 mt-1 italic">
              "Satu Langkah Menuju Kontribusi Nyata Bagi Bangsa"
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Mode Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all text-center ${
                mode === 'login' ? 'bg-[#022B59] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Masuk Akun
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all text-center ${
                mode === 'register' ? 'bg-[#022B59] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {/* LOGIN FORM (Image 1) */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Alamat Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Instruksi reset kata sandi telah dikirimkan ke email Anda.'); }} className="text-[11px] text-[#022B59] hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#022B59] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              {/* Preset Quick Logins */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
                  Uji Coba Portal (Akses Cepat Demo)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('applicant')}
                    className="p-2.5 bg-blue-50 hover:bg-blue-100 text-[#022B59] rounded-xl border border-blue-200 text-[11px] font-bold text-center"
                  >
                    Demo Mahasiswa 🎓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin')}
                    className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl border border-amber-300 text-[11px] font-bold text-center"
                  >
                    Demo Admin BPS 🏛️
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap Mahasiswa</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Contoh: Andi Muhammad Resky"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">NIM Kampus</label>
                  <input
                    type="text"
                    required
                    value={regNim}
                    onChange={(e) => setRegNim(e.target.value)}
                    placeholder="NIM / NPM"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">No. WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Perguruan Tinggi</label>
                <input
                  type="text"
                  required
                  value={regCampus}
                  onChange={(e) => setRegCampus(e.target.value)}
                  placeholder="Nama Universitas / Institut"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Kampus / Pribadi</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="nama@student.ac.id"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Buat Kata Sandi</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 Karakter"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#022B59] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all"
              >
                Daftar & Buat Akun Pendaftar
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
