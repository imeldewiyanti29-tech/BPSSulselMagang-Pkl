import React from 'react';
import { NavPage, DivisionInfo } from '../types';
import { INITIAL_DIVISIONS } from '../data/mockData';
import { 
  Layers, 
  Users, 
  CheckCircle2, 
  Briefcase, 
  ChevronRight, 
  Award, 
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

interface DivisiExplorerProps {
  setCurrentPage: (page: NavPage) => void;
  setSelectedDivision: (div: DivisionInfo) => void;
}

export const DivisiExplorer: React.FC<DivisiExplorerProps> = ({ setCurrentPage, setSelectedDivision }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredDivisions = INITIAL_DIVISIONS.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="bg-blue-100 text-[#022B59] font-extrabold text-xs px-3 py-1 rounded-full border border-blue-200">
            FUNGSI STATISTIK BPS SULSEL
          </span>
          <span className="text-xs text-slate-500">
            Total Kuota Gelombang Ini: <strong>44 Kursi</strong>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Daftar Divisi Penempatan & Monitoring Kuota Magang
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Setiap Fungsi di Badan Pusat Statistik Provinsi Sulawesi Selatan memiliki fokus keilmuan dan ruang lingkup tugas yang spesifik. Pilih fungsi yang sesuai dengan kualifikasi dan rencana topik riset Anda.
        </p>

        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari divisi atau keahlian (contoh: Python, GIS, Inflasi)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Division Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDivisions.map((div) => (
          <div 
            key={div.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#022B59] transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 bg-[#022B59] text-white font-black text-xs rounded">
                    {div.code}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{div.name}</h3>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    div.availableQuota > 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800'
                  }`}>
                    {div.availableQuota} Slot Tersisa
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Dari Kuota {div.totalQuota} Kursi</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {div.description}
              </p>

              {/* Head & Skills */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <p className="text-[11px] font-bold text-slate-700">
                  Pembina Fungsi: <span className="text-[#022B59] font-semibold">{div.headName}</span>
                </p>

                <p className="text-[11px] font-bold text-slate-700">Kualifikasi / Skill yang Dibutuhkan:</p>
                <div className="flex flex-wrap gap-1.5">
                  {div.requiredSkills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-white text-slate-700 rounded border border-slate-300 font-medium">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                  Contoh Penugasan & Kegiatan Praktik:
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {div.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start space-x-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Lokasi: Kantor BPS Sulsel
              </span>
              <button
                onClick={() => {
                  setSelectedDivision(div);
                  setCurrentPage('form');
                }}
                className="px-4 py-2 bg-[#022B59] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1"
              >
                <span>Daftar Ke Divisi Ini</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
