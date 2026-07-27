import React from 'react';
import { FAQ_LIST, OFFICE_INFO } from '../data/mockData';
import bpsOfficeBuilding from '../assets/images/bps_building_photo_1785123684907.jpg';
import { 
  HelpCircle, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  MessageSquare, 
  Building2, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [openFaqId, setOpenFaqId] = React.useState<string | null>('faq-1');
  const [messageSubmitted, setMessageSubmitted] = React.useState(false);

  // Form State
  const [senderName, setSenderName] = React.useState('');
  const [senderEmail, setSenderEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [messageBody, setMessageBody] = React.useState('');

  const filteredFaqs = FAQ_LIST.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSendHelpdesk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !messageBody) return;
    setMessageSubmitted(true);
    setTimeout(() => {
      setMessageSubmitted(false);
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessageBody('');
      alert('Pesan Anda telah berhasil terkirim ke Sekretariat BPS Sulsel!');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner (Image 6) */}
      <div className="bg-[#022B59] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
          PUSAT BANTUAN & HELPDESK RESMI
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Bagaimana kami bisa membantu Anda hari ini?
        </h1>
        <p className="text-xs sm:text-sm text-blue-200 max-w-2xl mx-auto">
          Temukan jawaban seputar syarat pendaftaran PKL, jadwal seleksi, konversi SKS kampus, atau hubungi Sekretariat BPS Sulawesi Selatan.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan (contoh: surat pengantar, durasi, WFO)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-slate-900 text-xs sm:text-sm focus:outline-none shadow-lg placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'Semua Pertanyaan' },
          { id: 'persyaratan', label: 'Persyaratan & Syarat' },
          { id: 'berkas', label: 'Berkas Dokumen' },
          { id: 'pelaksanaan', label: 'Pelaksanaan & Durasi' },
          { id: 'sertifikat', label: 'Sertifikat & Surat' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#022B59] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div 
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full text-left p-5 flex justify-between items-center space-x-4 hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-sm text-slate-900">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#022B59] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Office Contact Info & Map Section (Image 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Office Details Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">LOKASI KANTOR WILAYAH</span>
            <h2 className="text-xl font-black text-slate-900">{OFFICE_INFO.name}</h2>
            <p className="text-xs text-slate-500">Badan Pusat Statistik Provinsi Sulawesi Selatan</p>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Alamat Lengkap Kantor:</p>
                <p className="text-slate-600 mt-0.5">{OFFICE_INFO.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center space-x-2 text-[#022B59] font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Telepon / WA Hotline</span>
                </div>
                <p className="font-mono text-slate-800">{OFFICE_INFO.phone}</p>
                <p className="font-mono text-emerald-700 font-bold">WA: {OFFICE_INFO.whatsapp}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center space-x-2 text-[#022B59] font-bold">
                  <Mail className="w-4 h-4" />
                  <span>Email Surat Menyurat</span>
                </div>
                <p className="text-slate-800 font-bold">{OFFICE_INFO.email}</p>
                <p className="text-[10px] text-slate-400">Respon 1x24 jam kerja</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center space-x-2 text-[#022B59] font-bold">
                <Clock className="w-4 h-4" />
                <span>Jam Operasional Layanan Terpadu (PST)</span>
              </div>
              <p className="text-slate-800 font-medium">{OFFICE_INFO.workingHours}</p>
            </div>
          </div>

          {/* Location Map & Building Photo Preview */}
          <div className="bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-lg relative group">
            <div className="relative h-44 overflow-hidden">
              <img 
                src={bpsOfficeBuilding} 
                alt="Foto Gedung BPS Sulsel" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                <span className="px-2.5 py-1 bg-slate-900/90 text-amber-400 font-bold text-[11px] rounded-lg border border-slate-700/80 shadow">
                  Gedung Kantor BPS Prov. Sulsel
                </span>
                <a 
                  href="https://maps.google.com/?q=BPS+Provinsi+Sulawesi+Selatan" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-lg flex items-center space-x-1 shadow hover:bg-amber-300"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-slate-200 bg-slate-900/80 backdrop-blur-xs p-2 rounded-xl border border-slate-700/60">
                <div className="flex items-center space-x-2 truncate">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Jalan H. Bau No. 6, Kota Makassar, Kode Pos 90125</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Direct Helpdesk Inquiry Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#022B59] uppercase tracking-wider">KIRIM PESAN LANGSUNG</span>
            <h2 className="text-xl font-black text-slate-900">Formulir Layanan Pertanyaan</h2>
            <p className="text-xs text-slate-500">
              Isi formulir di bawah jika Anda memiliki pertanyaan khusus mengenai berkas atau kendala teknis portal.
            </p>
          </div>

          <form onSubmit={handleSendHelpdesk} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Lengkap Anda</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Alamat Email Aktif</label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="email@mahasiswa.ac.id"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subjek Pertanyaan</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Pertanyaan Syarat Proposal Magang IPDS"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Isi Pesan / Pertanyaan Detail</label>
              <textarea
                rows={4}
                required
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Tuliskan pertanyaan Anda secara lengkap..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#022B59] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={messageSubmitted}
              className="w-full py-3 rounded-xl bg-[#022B59] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {messageSubmitted ? (
                <span>Mengirimkan Pesan...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Kirimkan Pesan Ke Admin</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};
