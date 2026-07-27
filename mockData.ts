import { DivisionInfo, ApplicantData, FAQItem } from '../types';

export const INITIAL_DIVISIONS: DivisionInfo[] = [
  {
    id: 'ipds',
    code: 'IPDS',
    name: 'Integrasi Pengolahan & Diseminasi Statistik',
    fullName: 'Fungsi Integrasi Pengolahan dan Diseminasi Data Statistik',
    description: 'Mengelola infrastruktur TI, pengolahan data survei/sensus, aplikasi web, basis data, GIS, dan diseminasi publikasi statistik.',
    totalQuota: 10,
    availableQuota: 3,
    requiredSkills: ['React / Web Dev', 'Python / R Data Analysis', 'Database SQL', 'Desain Grafis / GIS', 'Sistem Informasi'],
    tasks: [
      'Mengembangkan dan memelihara aplikasi portal data statistik daerah',
      'Pengolahan dan validasi hasil entry data survei sensus',
      'Pembuatan infografis visualisasi data indikator strategis Sulsel',
      'Pengelolaan basis data Spasial & SIG BPS Sulawesi Selatan'
    ],
    headName: 'Ir. Ahmad Syaifuddin, M.Si.',
    iconName: 'Server'
  },
  {
    id: 'sosial',
    code: 'SOSIAL',
    name: 'Statistik Sosial',
    fullName: 'Fungsi Statistik Sosial',
    description: 'Menyediakan data indikator kependudukan, kemiskinan, ketenagakerjaan (Sakernas), pendidikan, dan kesejahteraan rakyat (Susenas).',
    totalQuota: 8,
    availableQuota: 2,
    requiredSkills: ['Statistika Dasar', 'SPSS / Stata / R', 'Metode Penarikan Sampel', 'Analisis Kebijakan Publik'],
    tasks: [
      'Penyusunan publikasi Indikator Pembangunan Manusia (IPM) Sulsel',
      'Tabulasi dan validasi survei Angkatan Kerja Nasional (Sakernas)',
      'Analisis tematik isu kemiskinan dan ketimpangan daerah',
      'Uji kualitas data modul Susenas'
    ],
    headName: 'Dra. Hj. Nurhidayah, M.Stat.',
    iconName: 'Users'
  },
  {
    id: 'nerwilis',
    code: 'NERWILIS',
    name: 'Neraca Wilayah & Analisis Statistik',
    fullName: 'Fungsi Neraca Wilayah dan Analisis Statistik',
    description: 'Penyusunan Produk Domestik Regional Bruto (PDRB) atas dasar harga berlaku dan konstanta, neraca arus dana, serta pemodelan makro ekonomi.',
    totalQuota: 6,
    availableQuota: 1,
    requiredSkills: ['Ekonomi Pembangunan', 'Ekonometrika', 'Excel Tingkat Lanjut', 'Pemodelan Input-Output'],
    tasks: [
      'Perhitungan komputasi PDRB Menurut Lapangan Usaha dan Pengeluaran',
      'Penyusunan Tabel Input-Output Sulawesi Selatan',
      'Analisis Pertumbuhan Ekonomi Regional & Struktur Ekonomi Sulsel',
      'Penyusunan Analisis Lintas Sektor Makro Ekonomi'
    ],
    headName: 'Dr. Muhammad Rizal, S.SE., M.E.',
    iconName: 'TrendingUp'
  },
  {
    id: 'produksi',
    code: 'PRODUKSI',
    name: 'Statistik Produksi',
    fullName: 'Fungsi Statistik Produksi',
    description: 'Pendataan lapangan dan pengolahan sektor Pertanian, Tanaman Pangan, Peternakan, Perikanan, Industri Manufaktur, dan Konstruksi.',
    totalQuota: 8,
    availableQuota: 4,
    requiredSkills: ['Statistika Terapan', 'Agribisnis / Pertanian', 'Manajemen Data', 'GIS Dasar'],
    tasks: [
      'Penyusunan estimasi luas panen dan produksi padi (KSA Pertanian)',
      'Survei Industri Besar dan Sedang (IBS) Sulawesi Selatan',
      'Pengolahan Indeks Produksi Manufaktur',
      'Komputasi data sektor konstruksi dan pertambangan'
    ],
    headName: 'Ir. Supratman, M.P.',
    iconName: 'Factory'
  },
  {
    id: 'distribusi',
    code: 'DISTRIBUSI',
    name: 'Statistik Distribusi',
    fullName: 'Fungsi Statistik Distribusi',
    description: 'Pemantauan Indeks Harga Konsumen (Inflasi), Perdagangan Dalam/Luar Negeri, Ekspor-Impor, Pariwisata, dan Transportasi Sulsel.',
    totalQuota: 7,
    availableQuota: 2,
    requiredSkills: ['Ekonomi / Manajemen', 'Analisis Deret Waktu (Time Series)', 'Excel / R', 'Statistika Perdagangan'],
    tasks: [
      'Pemantauan harga komoditas pasar harian & bulanan (IHK/Inflasi)',
      'Penyusunan berita resmi statistik (BRS) Pariwisata & Transportasi',
      'Pengolahan dokumen pabean Ekspor Impor Pelabuhan Makassar',
      'Survei Perdagangan Eceran dan Besar'
    ],
    headName: 'Andi Asrul, S.S.T., M.Si.',
    iconName: 'ShoppingBag'
  },
  {
    id: 'umum',
    code: 'UMUM',
    name: 'Bagian Umum & Kehumasan',
    fullName: 'Bagian Umum (Keuangan, SDM, Kehumasan, Protokoler)',
    description: 'Pengelolaan operasional perkantoran, hubungan masyarakat (Humas), pengelolaan arsip digital, dan pelayanan statistik terpadu (PST).',
    totalQuota: 5,
    availableQuota: 2,
    requiredSkills: ['Public Relations / Komunikasi', 'Administrasi Perkantoran', 'Content Writing / Social Media', 'Manajemen Kearsipan'],
    tasks: [
      'Pelayanan pengunjung Pelayanan Statistik Terpadu (PST) BPS Sulsel',
      'Pengelolaan konten media sosial resmi & press release',
      'Pengarsipan digital surat keputusan & sertifikat magang',
      'Pendampingan kegiatan protokoler pimpinan'
    ],
    headName: 'H. Kaharuddin, S.E., M.M.',
    iconName: 'Briefcase'
  }
];

export const INITIAL_APPLICANTS: ApplicantData[] = [
  {
    id: 'app-001',
    regNumber: 'BPS-PKL-2025-0842',
    fullName: 'Andi Muhammad Nur Resky',
    nik: '7371101203990001',
    nim: 'H071211024',
    university: 'Universitas Hasanuddin (UNHAS)',
    major: 'S1 Teknik Informatika',
    semester: 6,
    email: 'andiresky@student.unhas.ac.id',
    phone: '081245678910',
    divisionId: 'ipds',
    divisionName: 'Integrasi Pengolahan & Diseminasi Statistik',
    startDate: '2025-08-01',
    endDate: '2025-10-31',
    durationMonths: 3,
    proposalTitle: 'Pengembangan Dashboard Visualisasi Data Spasial Kemiskinan Berbasis Web GIS di BPS Sulawesi Selatan',
    status: 'Under Review',
    submissionDate: '2025-06-15',
    completionPercentage: 85,
    notes: 'Berkas lengkap. Menunggu verifikasi lanjutan dari Pembina Teknis Fungsi IPDS.',
    interviewDate: '2025-06-25 10:00 WITA',
    interviewLink: 'https://bps.zoom.us/j/8429103859',
    documents: [
      { id: 'doc-101', type: 'surat_rekomendasi', title: 'Surat Rekomendasi Magang (UNHAS)', fileName: 'Surat_Rekomendasi_UNHAS_Resky.pdf', fileSize: '1.2 MB', uploadDate: '2025-06-15', status: 'Verified' },
      { id: 'doc-102', type: 'krs', title: 'Kartu Rencana Studi (KRS)', fileName: 'KRS_Semester_6_UNHAS.pdf', fileSize: '780 KB', uploadDate: '2025-06-15', status: 'Verified' },
      { id: 'doc-103', type: 'ktm', title: 'Kartu Tanda Mahasiswa (KTM)', fileName: 'KTM_Andi_Muhammad_Resky.pdf', fileSize: '650 KB', uploadDate: '2025-06-15', status: 'Verified' },
      { id: 'doc-104', type: 'transkrip', title: 'Academic Transcript (IPK 3.82)', fileName: 'Transkrip_Nilai_Resky.pdf', fileSize: '1.8 MB', uploadDate: '2025-06-15', status: 'Verified' },
      { id: 'doc-105', type: 'cv', title: 'Curriculum Vitae (CV)', fileName: 'CV_Andi_Muhammad_Resky.pdf', fileSize: '850 KB', uploadDate: '2025-06-15', status: 'Verified' }
    ],
    notifications: [
      { id: 'notif-1', title: 'Pendaftaran Berhasil Dikirim', message: 'Formulir pengajuan PKL Anda dengan nomor BPS-PKL-2025-0842 telah tercatat di sistem BPS Sulsel.', timestamp: '15 Juni 2025, 14:30 WITA', read: true, type: 'success' },
      { id: 'notif-2', title: 'Verifikasi Berkas Administrasi', message: 'Surat Pengantar dan Transkrip Nilai Anda telah dinyatakan VALID oleh Verifikator Administrasi.', timestamp: '16 Juni 2025, 09:15 WITA', read: true, type: 'info' },
      { id: 'notif-3', title: 'Jadwal Wawancara Ditetapkan', message: 'Wawancara daring dijadwalkan pada 25 Juni 2025 pukul 10:00 WITA via Zoom.', timestamp: '18 Juni 2025, 11:00 WITA', read: false, type: 'warning' }
    ]
  },
  {
    id: 'app-002',
    regNumber: 'BPS-PKL-2025-0843',
    fullName: 'Siti Nurhaliza Putri',
    nik: '7371084509010003',
    nim: '105841103221',
    university: 'Universitas Muhammadiyah Makassar (Unismuh)',
    major: 'S1 Statistika',
    semester: 6,
    email: 'sitinurhaliza@unismuh.ac.id',
    phone: '085299887766',
    divisionId: 'sosial',
    divisionName: 'Statistik Sosial',
    startDate: '2025-07-15',
    endDate: '2025-09-15',
    durationMonths: 2,
    proposalTitle: 'Analisis Faktor-Faktor Pengaruh Indeks Pembangunan Manusia (IPM) Sulawesi Selatan Menggunakan Regresi Data Panel',
    status: 'Accepted',
    submissionDate: '2025-05-10',
    completionPercentage: 100,
    notes: 'Selamat! Permohonan PKL Anda disetujui. Surat Balasan Penerimaan Resmi telah diterbitkan.',
    documents: [
      { id: 'doc-201', type: 'surat_pengantar', title: 'Surat Pengantar Unismuh', fileName: 'Surat_Pengantar_Unismuh.pdf', fileSize: '1.1 MB', uploadDate: '2025-05-10', status: 'Verified' },
      { id: 'doc-202', type: 'cv', title: 'CV Siti Nurhaliza', fileName: 'CV_Siti_Nurhaliza.pdf', fileSize: '900 KB', uploadDate: '2025-05-10', status: 'Verified' },
      { id: 'doc-203', type: 'transkrip', title: 'Transkrip Akademik IPK 3.90', fileName: 'Transkrip_Siti.pdf', fileSize: '1.8 MB', uploadDate: '2025-05-10', status: 'Verified' },
      { id: 'doc-204', type: 'proposal', title: 'Proposal Analisis IPM Sulsel', fileName: 'Proposal_IPM_Sulsel.pdf', fileSize: '2.8 MB', uploadDate: '2025-05-10', status: 'Verified' }
    ],
    notifications: [
      { id: 'notif-201', title: 'Surat Balasan Penerimaan Diterbitkan', message: 'Silakan unduh Surat Penerimaan Resmi (SK-PKL-BPS-7300/2025) untuk diserahkan ke Fakultas.', timestamp: '20 Mei 2025, 08:00 WITA', read: true, type: 'success' }
    ]
  },
  {
    id: 'app-003',
    regNumber: 'BPS-PKL-2025-0844',
    fullName: 'Fajar Kurniawan Ramadhan',
    nik: '7306021408020002',
    nim: '210901502011',
    university: 'Universitas Negeri Makassar (UNM)',
    major: 'S1 Ekonomi Pembangunan',
    semester: 7,
    email: 'fajar.kurniawan@unm.ac.id',
    phone: '082190001122',
    divisionId: 'nerwilis',
    divisionName: 'Neraca Wilayah & Analisis Statistik',
    startDate: '2025-09-01',
    endDate: '2025-11-30',
    durationMonths: 3,
    proposalTitle: 'Kajian Dampak Inflasi Komoditas Pangan Terhadap Pertumbuhan PDRB Pengeluaran Sulawesi Selatan',
    status: 'Submitted',
    submissionDate: '2025-06-20',
    completionPercentage: 70,
    notes: 'Aplikasi baru diterima, siap diproses oleh Sekretariat Pendaftaran PKL BPS Sulsel.',
    documents: [
      { id: 'doc-301', type: 'surat_pengantar', title: 'Surat Pengantar UNM', fileName: 'Surat_Pengantar_UNM_Fajar.pdf', fileSize: '1.4 MB', uploadDate: '2025-06-20', status: 'Pending Review' },
      { id: 'doc-302', type: 'cv', title: 'CV Fajar Kurniawan', fileName: 'CV_Fajar.pdf', fileSize: '780 KB', uploadDate: '2025-06-20', status: 'Pending Review' },
      { id: 'doc-303', type: 'transkrip', title: 'Transkrip Nilai', fileName: 'Transkrip_UNM_Fajar.pdf', fileSize: '1.9 MB', uploadDate: '2025-06-20', status: 'Pending Review' }
    ],
    notifications: [
      { id: 'notif-301', title: 'Pendaftaran Berhasil', message: 'Pengajuan Anda BPS-PKL-2025-0844 telah tersimpan.', timestamp: '20 Juni 2025, 16:45 WITA', read: false, type: 'info' }
    ]
  },
  {
    id: 'app-004',
    regNumber: 'BPS-PKL-2025-0845',
    fullName: 'Rizky Amalia Syarif',
    nik: '7371125105010005',
    nim: '60200121045',
    university: 'UIN Alauddin Makassar',
    major: 'S1 Sistem Informasi',
    semester: 6,
    email: 'rizky.amalia@uin-alauddin.ac.id',
    phone: '081355443322',
    divisionId: 'ipds',
    divisionName: 'Integrasi Pengolahan & Diseminasi Statistik',
    startDate: '2025-08-01',
    endDate: '2025-10-31',
    durationMonths: 3,
    proposalTitle: 'Rancang Bangun Sistem Informasi Arsip Digital Laporan Publikasi BPS Provinsi Sulawesi Selatan',
    status: 'Interview',
    submissionDate: '2025-06-01',
    completionPercentage: 90,
    interviewDate: '2025-06-24 14:00 WITA',
    interviewLink: 'https://bps.zoom.us/j/9128374650',
    documents: [
      { id: 'doc-401', type: 'surat_pengantar', title: 'Surat Pengantar UIN Alauddin', fileName: 'Surat_Pengantar_UIN.pdf', fileSize: '1.0 MB', uploadDate: '2025-06-01', status: 'Verified' },
      { id: 'doc-402', type: 'cv', title: 'CV Rizky Amalia', fileName: 'CV_Rizky.pdf', fileSize: '820 KB', uploadDate: '2025-06-01', status: 'Verified' },
      { id: 'doc-403', type: 'transkrip', title: 'Transkrip Nilai IPK 3.75', fileName: 'Transkrip_Rizky.pdf', fileSize: '1.5 MB', uploadDate: '2025-06-01', status: 'Verified' },
      { id: 'doc-404', type: 'proposal', title: 'Proposal Sistem Arsip Digital', fileName: 'Proposal_Arsip_Digital_BPS.pdf', fileSize: '3.1 MB', uploadDate: '2025-06-01', status: 'Verified' }
    ],
    notifications: [
      { id: 'notif-401', title: 'Undangan Wawancara Daring', message: 'Anda diundang untuk mengikuti wawancara dengan Kepala Tim Fungsi IPDS pada 24 Juni 2025 pukul 14:00 WITA.', timestamp: '18 Juni 2025, 10:00 WITA', read: false, type: 'warning' }
    ]
  },
  {
    id: 'app-005',
    regNumber: 'BPS-PKL-2025-0846',
    fullName: 'Bambang Triatmojo',
    nik: '7371051904000004',
    nim: '1920104012',
    university: 'Politeknik Negeri Ujung Pandang (PNUP)',
    major: 'D4 Akuntansi Manajerial',
    semester: 8,
    email: 'bambang.tri@pnup.ac.id',
    phone: '085311223344',
    divisionId: 'distribusi',
    divisionName: 'Statistik Distribusi',
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    durationMonths: 3,
    proposalTitle: 'Studi Komparasi Indeks Harga Konsumen Kota Makassar dan Kota Parepare',
    status: 'Rejected',
    submissionDate: '2025-05-02',
    completionPercentage: 100,
    notes: 'Kuota Fungsi Statistik Distribusi untuk periode Juli-September telah terpenuhi.',
    documents: [
      { id: 'doc-501', type: 'surat_pengantar', title: 'Surat Pengantar PNUP', fileName: 'Surat_Pengantar_PNUP.pdf', fileSize: '1.3 MB', uploadDate: '2025-05-02', status: 'Verified' }
    ],
    notifications: [
      { id: 'notif-501', title: 'Status Pengajuan Ditolak', message: 'Mohon maaf, kuota untuk periode yang diajukan sudah terpenuhi. Silakan mendaftar di gelombang berikutnya.', timestamp: '12 Mei 2025, 14:20 WITA', read: true, type: 'alert' }
    ]
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'persyaratan',
    question: 'Siapa saja yang dapat mendaftar program PKL / Magang di BPS Provinsi Sulawesi Selatan?',
    answer: 'Program ini terbuka untuk mahasiswa aktif D3, D4, dan S1 dari seluruh perguruan tinggi negeri maupun swasta yang telah memenuhi jumlah SKS minimal sesuai ketentuan program studi masing-masing (biasanya semester 5 ke atas).'
  },
  {
    id: 'faq-2',
    category: 'berkas',
    question: 'Dokumen apa saja yang wajib diunggah saat mengajukan permohonan?',
    answer: 'Dokumen wajib meliputi: 1) Surat Pengantar resmi dari Kampus/Fakultas ditujukan kepada Kepala BPS Provinsi Sulawesi Selatan, 2) Curriculum Vitae (CV) terbaru, 3) Transkrip Nilai Kumulatif terbaru, 4) Proposal Rencana Kegiatan PKL/Magang, dan 5) Pas Foto formal berlatar merah/biru.'
  },
  {
    id: 'faq-3',
    category: 'pelaksanaan',
    question: 'Berapa lama durasi pelaksanaan PKL / Magang di BPS Sulsel?',
    answer: 'Durasi standar magang berkisar antara 1 hingga 3 bulan (dapat disesuaikan hingga 6 bulan untuk program MBKM Magang Mandiri) dengan jam kerja operasional Senin - Jumat pkl 08:00 - 16:00 WITA.'
  },
  {
    id: 'faq-4',
    category: 'pelaksanaan',
    question: 'Apakah kegiatan Magang di BPS Sulsel dilaksanakan secara WFO, WFH, atau Hibrida?',
    answer: 'Secara umum, kegiatan Magang dilaksanakan secara Work From Office (WFO) di Kantor BPS Provinsi Sulawesi Selatan (Jalan H. Bau No. 6, Kota Makassar, Kode Pos 90125) agar mahasiswa mendapat pengalaman langsung pengolahan data dan operasional statistik.'
  },
  {
    id: 'faq-5',
    category: 'sertifikat',
    question: 'Apakah peserta akan mendapatkan Surat Balasan Resmi dan Sertifikat Magang?',
    answer: 'Ya. Peserta yang pendaftarannya disetujui akan mendapatkan Surat Penerimaan Resmi (SK BPS Sulsel) untuk diserahkan ke kampus. Setelah menyelesaikan masa magang dan laporan, peserta berhak memperoleh Sertifikat Resmi BPS Sulsel beserta Nilai Evaluasi Kinerja.'
  },
  {
    id: 'faq-6',
    category: 'persyaratan',
    question: 'Apakah ada biaya pendaftaran atau biaya administrasi?',
    answer: 'Sama sekali TIDAK ADA biaya (Gratis 100%). BPS Provinsi Sulawesi Selatan tidak memungut biaya apapun dalam seluruh tahapan seleksi dan pelaksanaan PKL/Magang.'
  }
];

export const OFFICE_INFO = {
  name: 'Badan Pusat Statistik Provinsi Sulawesi Selatan',
  address: 'Jalan H. Bau No. 6, Kota Makassar, Kode Pos 90125',
  phone: '(0411) 854838',
  fax: '(0411) 854838',
  email: 'bps7300@bps.go.id',
  whatsapp: '(0411) 854838',
  website: 'https://sulsel.bps.go.id',
  workingHours: 'Senin - Jumat: 08:00 - 16:00 WITA',
  social: {
    instagram: '@bps_sulsel',
    youtube: 'BPS Provinsi Sulawesi Selatan',
    facebook: 'BPS Provinsi Sulawesi Selatan'
  }
};
