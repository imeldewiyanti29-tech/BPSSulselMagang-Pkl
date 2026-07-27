import React from 'react';
import { ApplicantData, ApplicationStatusType, DivisionInfo } from '../types';
import { INITIAL_DIVISIONS } from '../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  MoreHorizontal, 
  Check, 
  X, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Building2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface AdminDashboardProps {
  applicants: ApplicantData[];
  setApplicants: React.Dispatch<React.SetStateAction<ApplicantData[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ applicants, setApplicants }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [selectedDivisionFilter, setSelectedDivisionFilter] = React.useState<string>('All');
  const [selectedApplicant, setSelectedApplicant] = React.useState<ApplicantData | null>(null);
  const [reviewNoteInput, setReviewNoteInput] = React.useState('');
  const [interviewDateInput, setInterviewDateInput] = React.useState('');

  // Calculate Metrics
  const totalApplicantsCount = 2840 + applicants.length;
  const pendingCount = applicants.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length + 412;
  const acceptedCount = applicants.filter(a => a.status === 'Accepted').length + 2156;
  const rejectedCount = applicants.filter(a => a.status === 'Rejected').length + 272;

  // Filter List
  const filteredList = applicants.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.regNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesDiv = selectedDivisionFilter === 'All' || app.divisionId === selectedDivisionFilter;

    return matchesSearch && matchesStatus && matchesDiv;
  });

  const handleUpdateStatus = (appId: string, newStatus: ApplicationStatusType) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: newStatus,
          notes: reviewNoteInput || a.notes,
          interviewDate: interviewDateInput || a.interviewDate,
          notifications: [
            ...a.notifications,
            {
              id: `notif-${Date.now()}`,
              title: `Status Diperbarui: ${newStatus}`,
              message: `Tim Pengelola BPS Sulsel telah memperbarui status pengajuan Anda menjadi "${newStatus}".`,
              timestamp: 'Baru saja',
              read: false,
              type: newStatus === 'Accepted' ? 'success' : newStatus === 'Rejected' ? 'alert' : 'info'
            }
          ]
        };
      }
      return a;
    }));

    if (selectedApplicant && selectedApplicant.id === appId) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nomor Registrasi', 'Nama Lengkap', 'Universitas', 'Jurusan', 'Divisi', 'Status', 'Tanggal Pengajuan'];
    const rows = filteredList.map(a => [
      a.regNumber,
      `"${a.fullName}"`,
      `"${a.university}"`,
      `"${a.major}"`,
      `"${a.divisionName}"`,
      a.status,
      a.submissionDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pendaftaran_PKL_BPS_Sulsel_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title Header */}
      <div className="bg-[#022B59] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
              PANEL PENGELOLA BPS
            </span>
            <span className="text-xs text-blue-200">Badan Pusat Statistik Provinsi Sulawesi Selatan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Dashboard Analitik & Verifikasi Pendaftaran PKL
          </h1>
          <p className="text-xs text-blue-200 max-w-xl">
            Kelola berkas masuk, verifikasi syarat administrasi, jadwal wawancara, dan terbitkan Surat Penerimaan Balasan untuk mahasiswa.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards (Matching Image 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Pendaftar</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalApplicantsCount.toLocaleString()}</h3>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4% dari bulan lalu
            </p>
          </div>
          <div className="p-3.5 bg-blue-50 text-[#022B59] rounded-2xl border border-blue-200">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Menunggu Review</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingCount.toLocaleString()}</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">Perlu Verifikasi Segera</p>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Diterima / Disetujui</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{acceptedCount.toLocaleString()}</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">SK Balasan Terbit</p>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ditolak / Kuota Penuh</p>
            <h3 className="text-2xl font-black text-red-600 mt-1">{rejectedCount.toLocaleString()}</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">Gelombang Ditunggu</p>
          </div>
          <div className="p-3.5 bg-red-50 text-red-600 rounded-2xl border border-red-200">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Visual Charts Section (Image 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Application Volume Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[#022B59]" />
                <span>Tren Volume Pengajuan PKL 2025</span>
              </h3>
              <p className="text-[11px] text-slate-500">Jumlah pendaftaran per bulan di BPS Sulawesi Selatan</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">Bulanan</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { month: 'Jan', val: 180, height: '40%' },
              { month: 'Feb', val: 240, height: '52%' },
              { month: 'Mar', val: 310, height: '65%' },
              { month: 'Apr', val: 420, height: '80%' },
              { month: 'Mei', val: 560, height: '95%' },
              { month: 'Jun', val: 480, height: '88%' },
              { month: 'Jul', val: 390, height: '70%' },
            ].map((bar, bIdx) => (
              <div key={bIdx} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-[10px] font-bold text-[#022B59] opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.val}
                </span>
                <div 
                  className="w-full bg-[#022B59] hover:bg-amber-400 rounded-t-lg transition-all duration-300 shadow-xs"
                  style={{ height: bar.height }}
                ></div>
                <span className="text-[10px] text-slate-500 font-semibold">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Division Distribution Mix */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-[#022B59]" />
              <span>Distribusi Peminatan Divisi</span>
            </h3>
            <p className="text-[11px] text-slate-500">Persentase pilihan fungsi statistik oleh mahasiswa</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Integrasi Pengolahan & Diseminasi (IPDS)', pct: 38, color: 'bg-[#022B59]' },
              { label: 'Statistik Sosial', pct: 24, color: 'bg-emerald-600' },
              { label: 'Neraca Wilayah (Nerwilis)', pct: 16, color: 'bg-amber-500' },
              { label: 'Statistik Produksi', pct: 12, color: 'bg-purple-600' },
              { label: 'Statistik Distribusi & Umum', pct: 10, color: 'bg-blue-400' },
            ].map((item, iIdx) => (
              <div key={iIdx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className="shrink-0">{item.pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Applications Management Table (Matching Image 5) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
        
        {/* Table Controls Header */}
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-base text-slate-900">
                Daftar Permohonan Masuk ({filteredList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Verifikasi dokumen pendaftar dan perbarui status seleksi administrasi.
              </p>
            </div>

            <button
              onClick={exportToCSV}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Rekap CSV</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Nama, NIM, atau Perguruan Tinggi..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              />
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              >
                <option value="All">Semua Status Permohonan</option>
                <option value="Submitted">Submitted (Baru)</option>
                <option value="Under Review">Under Review (Verifikasi)</option>
                <option value="Interview">Interview (Wawancara)</option>
                <option value="Accepted">Accepted (Disetujui)</option>
                <option value="Rejected">Rejected (Ditolak)</option>
              </select>
            </div>

            <div>
              <select
                value={selectedDivisionFilter}
                onChange={(e) => setSelectedDivisionFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              >
                <option value="All">Semua Divisi Penempatan</option>
                {INITIAL_DIVISIONS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">No. Registrasi / Nama</th>
                <th className="py-3 px-4">Kampus & NIM</th>
                <th className="py-3 px-4">Divisi Tujuan</th>
                <th className="py-3 px-4">Periode PKL</th>
                <th className="py-3 px-4">Status Seleksi</th>
                <th className="py-3 px-4 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Name & Reg */}
                  <td className="py-3.5 px-4">
                    <p className="font-mono text-[10px] text-slate-400">{app.regNumber}</p>
                    <p className="font-bold text-slate-900 text-xs">{app.fullName}</p>
                    <p className="text-[10px] text-slate-500">{app.email}</p>
                  </td>

                  {/* Campus */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{app.university}</p>
                    <p className="text-[11px] text-slate-500">{app.major} (Sem {app.semester})</p>
                    <p className="font-mono text-[10px] text-slate-400">NIM: {app.nim}</p>
                  </td>

                  {/* Division */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-[#022B59] font-bold text-[10px] rounded border border-blue-200">
                      {app.divisionName}
                    </span>
                  </td>

                  {/* Dates */}
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-800">{app.startDate} s/d</p>
                    <p className="font-medium text-slate-800">{app.endDate}</p>
                    <span className="text-[10px] text-slate-400">{app.durationMonths} Bulan</span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase inline-block ${
                      app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      app.status === 'Interview' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                      app.status === 'Under Review' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-300' :
                      'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {app.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => {
                          setSelectedApplicant(app);
                          setReviewNoteInput(app.notes || '');
                          setInterviewDateInput(app.interviewDate || '');
                        }}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-[#022B59] hover:text-white text-[#022B59] font-bold text-[11px] rounded-lg border border-blue-200 transition-colors"
                      >
                        Detail & Review
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* DETAIL & VERIFICATION REVIEW MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-slate-300 shadow-2xl relative my-8">
            
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="font-mono text-xs text-slate-400">REGISTRATION: {selectedApplicant.regNumber}</span>
              <h2 className="text-xl font-black text-slate-900">{selectedApplicant.fullName}</h2>
              <p className="text-xs text-slate-600">{selectedApplicant.university} • {selectedApplicant.major}</p>
            </div>

            {/* Application Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold">NIM / NIK:</span>
                <p className="font-mono font-bold text-slate-800">{selectedApplicant.nim} / {selectedApplicant.nik}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold">Kontak Mahasiswa:</span>
                <p className="font-bold text-slate-800">{selectedApplicant.phone} • {selectedApplicant.email}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold">Divisi Penempatan:</span>
                <p className="font-bold text-[#022B59]">{selectedApplicant.divisionName}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold">Periode Rencana:</span>
                <p className="font-bold text-slate-800">{selectedApplicant.startDate} s/d {selectedApplicant.endDate}</p>
              </div>
            </div>

            {/* Document Verification Checklist */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Dokumen Administrasi Terunggah:
              </h4>

              <div className="space-y-2">
                {selectedApplicant.documents.map((doc) => (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#022B59]" />
                      <div>
                        <p className="font-bold text-xs text-slate-900">{doc.title}</p>
                        <p className="text-[10px] text-slate-500">{doc.fileName} ({doc.fileSize})</p>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Membuka berkas: ${doc.fileName}`)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded border border-slate-300"
                    >
                      Lihat File ↗
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Notes & Interview Inputs */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Catatan Review Verifikator BPS:</label>
                <textarea
                  rows={2}
                  value={reviewNoteInput}
                  onChange={(e) => setReviewNoteInput(e.target.value)}
                  placeholder="Masukkan catatan internal verifikasi berkas..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Jadwal Wawancara (Jika Diperlukan):</label>
                <input
                  type="text"
                  value={interviewDateInput}
                  onChange={(e) => setInterviewDateInput(e.target.value)}
                  placeholder="Contoh: 25 Juni 2025 10:00 WITA"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons to Change Status */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateStatus(selectedApplicant.id, 'Under Review')}
                  className="px-3 py-2 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl hover:bg-amber-200"
                >
                  Set Under Review
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApplicant.id, 'Interview')}
                  className="px-3 py-2 bg-purple-100 text-purple-900 font-bold text-xs rounded-xl hover:bg-purple-200"
                >
                  Set Interview
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateStatus(selectedApplicant.id, 'Rejected')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  ✕ Tolak Permohonan
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApplicant.id, 'Accepted')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  ✓ Setujui & Terbitkan SK
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
