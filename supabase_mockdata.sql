-- ============================================================
-- MOCK DATA SUPABASE - Portfolio Nopian Hadi 2025
-- Jalankan SETELAH supabase_schema.sql berhasil dijalankan!
-- ============================================================

-- Bersihkan data lama agar tidak terjadi duplikasi saat script dijalankan ulang
TRUNCATE TABLE public.contact_messages RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.testimonials RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.articles RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.projects RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.creative_works RESTART IDENTITY CASCADE;

-- ============================================================
-- MOCK DATA: projects (5 proyek portfolio)
-- ============================================================
INSERT INTO public.projects (
  title, client, year, category,
  hero_image, overview, challenge, solution,
  results, technologies, duration, role,
  images, live_demo, source_code, status,
  testimonial_quote, testimonial_author, testimonial_position
) VALUES

-- Project 1: E-Commerce Platform
(
  'E-Commerce Platform Modern',
  'PT Belanja Nusantara',
  '2024',
  'Web Development',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  'Membangun platform e-commerce modern yang mampu menangani ribuan produk dan transaksi harian dengan performa tinggi dan pengalaman pengguna yang mulus.',
  'Klien membutuhkan migrasi dari sistem lama yang lambat dan tidak skalabel ke platform modern yang mendukung mobile, memiliki checkout cepat, dan terintegrasi dengan berbagai payment gateway lokal Indonesia.',
  'Menggunakan arsitektur microservices dengan Next.js di frontend dan Node.js di backend. Mengintegrasikan Midtrans dan DANA sebagai payment gateway, serta mengoptimalkan performa dengan CDN dan lazy loading.',
  ARRAY[
    'Peningkatan konversi penjualan sebesar 45%',
    'Waktu loading halaman turun dari 8s menjadi 1.2s',
    'Jumlah transaksi harian naik 3x lipat',
    'Rating kepuasan pengguna 4.8/5 di App Store'
  ],
  ARRAY['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Midtrans API', 'Docker'],
  '4 Bulan',
  'Full Stack Developer & Tech Lead',
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80'
  ],
  'https://demo.belanjanus.id',
  'https://github.com/nopianhadi/ecommerce-platform',
  'Published',
  'Nopian adalah developer luar biasa. Platform yang dibangun sangat cepat dan mudah digunakan. Penjualan kami meningkat drastis sejak launch!',
  'Budi Santoso',
  'CEO, PT Belanja Nusantara'
),

-- Project 2: Social Media Design
(
  'Social Media Content Strategy & Design',
  'Startup Kuliner Nusantara',
  '2024',
  'Desain Konten Medsos',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
  'Merancang dan memproduksi konten media sosial (Instagram & TikTok) untuk startup kuliner, fokus pada peningkatan engagement dan brand awareness.',
  'Klien kesulitan mendapatkan engagement yang konsisten di media sosial. Konten sebelumnya kurang menarik secara visual dan tidak memiliki identitas brand yang kuat.',
  'Mengembangkan strategi konten bulanan, merancang template desain feed/story yang kohesif dengan Figma, dan membuat konten interaktif (carousel, polling, kuis).',
  ARRAY[
    'Engagement rate meningkat 150% dalam 2 bulan',
    'Followers organik bertambah 10k+',
    'Konversi dari media sosial ke pemesanan naik 40%'
  ],
  ARRAY['Figma', 'Photoshop', 'Canva Pro', 'Copywriting', 'Instagram Analytics'],
  '3 Bulan',
  'Content Designer & Strategist',
  ARRAY[
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&q=80'
  ],
  'https://instagram.com',
  NULL,
  'Published',
  'Desain konten dari Nopian sangat kreatif dan sesuai dengan target market kami. Engagement Instagram kami naik drastis!',
  'Sari Dewi',
  'CMO, Startup Kuliner Nusantara'
),

-- Project 3: Video Editing
(
  'Video Promosi & Motion Graphics',
  'TechGadget Review',
  '2023',
  'Video Editing',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
  'Mengedit video review gadget dan membuat motion graphics intro/outro untuk channel YouTube dengan 500k+ subscribers.',
  'Klien membutuhkan editor yang bisa mengedit video dengan ritme cepat, menambahkan B-roll menarik, dan membuat motion graphics untuk menjelaskan spesifikasi teknis.',
  'Menggunakan Adobe Premiere Pro untuk pemotongan dinamis dan color grading, serta After Effects untuk menganimasikan teks dan spesifikasi produk secara visual.',
  ARRAY[
    'Retensi penonton YouTube meningkat 25%',
    'Rata-rata view per video naik dari 50k ke 80k',
    'Mendapat pujian dari viewers mengenai kualitas editing'
  ],
  ARRAY['Adobe Premiere Pro', 'After Effects', 'Color Grading', 'Audio Mixing'],
  '5 Bulan',
  'Video Editor & Motion Designer',
  ARRAY[
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80'
  ],
  'https://youtube.com',
  NULL,
  'Published',
  'Editing dari Nopian sangat smooth dan kekinian. B-roll dan motion graphics-nya bikin video review kita terlihat jauh lebih profesional!',
  'Reza Pahlevi',
  'Creator, TechGadget Review'
),

-- Project 4: Graphic Design Branding
(
  'Rebranding & Visual Identity',
  'Kopi Kenangan Senja',
  '2023',
  'Graphic Design',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&q=80',
  'Melakukan rebranding menyeluruh, termasuk logo, kemasan produk, dan materi pemasaran digital untuk kedai kopi lokal.',
  'Kedai kopi ini ingin melakukan ekspansi dan membutuhkan identitas visual yang lebih modern, eye-catching, dan relevan dengan target pasar anak muda.',
  'Melakukan riset kompetitor, merancang logo baru yang minimalis, memilih palet warna earth-tone, dan mengaplikasikannya ke desain cup, daftar menu, serta feed Instagram.',
  ARRAY[
    'Brand recognition meningkat di kalangan Gen-Z',
    'Penjualan merchandise dengan logo baru habis terjual dalam 1 minggu',
    'Mendapat banyak ulasan positif tentang estetika kedai'
  ],
  ARRAY['Adobe Illustrator', 'Photoshop', 'Brand Strategy', 'Print Design'],
  '6 Minggu',
  'Graphic & Brand Designer',
  ARRAY[
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80',
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80'
  ],
  NULL,
  NULL,
  'Published',
  'Rebranding yang dilakukan Nopian sangat luar biasa. Desain kemasan baru kami sering difoto dan masuk story pelanggan!',
  'Handoko Wijaya',
  'Owner, Kopi Kenangan Senja'
),

-- Project 5: SaaS Platform (Draft)
(
  'Platform Manajemen Event SaaS',
  'EventPro Indonesia',
  '2025',
  'Web Development',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  'Membangun platform SaaS untuk manajemen event end-to-end: dari pendaftaran peserta, pembayaran tiket, check-in digital, hingga laporan analytics pasca event.',
  'Penyelenggara event menghabiskan waktu berjam-jam untuk mengelola pendaftaran peserta secara manual. Butuh platform terpadu yang bisa menangani ratusan event simultan dengan ribuan peserta.',
  'Menggunakan arsitektur multi-tenant dengan Next.js App Router, Supabase untuk database dan auth, Stripe untuk pembayaran, dan sistem QR code untuk check-in peserta yang terintegrasi real-time.',
  ARRAY[
    'Mengurangi waktu setup event dari 2 jam menjadi 15 menit',
    'Mendukung 500+ event simultan dalam beta testing',
    'Sistem check-in QR memproses 1000 peserta/jam'
  ],
  ARRAY['Next.js 14', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS', 'shadcn/ui', 'QR Code API', 'Vercel'],
  'Sedang Berlangsung',
  'Full Stack Developer & Product Designer',
  ARRAY[
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'
  ],
  NULL,
  'https://github.com/nopianhadi/eventpro-saas',
  'Draft',
  NULL, NULL, NULL
);

-- ============================================================
-- MOCK DATA: articles (4 artikel blog)
-- ============================================================
INSERT INTO public.articles (
  title, excerpt, content, category, status,
  date, image, author, author_name, author_bio,
  author_avatar, tags, read_time
) VALUES

-- Artikel 1
(
  'Tips Desain Konten Media Sosial yang Engagement-nya Tinggi',
  'Ingin konten Instagram dan TikTok Anda lebih banyak di-like dan share? Pelajari prinsip dasar desain visual yang terbukti meningkatkan engagement audiens.',
  '# Tips Desain Konten Media Sosial yang Engagement-nya Tinggi

## 1. Gunakan Hook Visual yang Kuat

3 detik pertama sangat krusial. Gunakan teks yang besar, warna yang kontras, atau elemen visual yang membuat orang berhenti scrolling (stop the scroll).

## 2. Hirarki Visual yang Jelas

Audiens tidak membaca, mereka men-scan (memindai) konten. Pastikan informasi terpenting adalah yang paling menonjol.
- **Headline**: Paling besar dan tebal
- **Sub-headline**: Sedikit lebih kecil
- **Body text**: Ukuran normal yang mudah dibaca

## 3. Whitespace adalah Teman Anda

Jangan penuhi setiap sudut desain Anda dengan elemen. Berikan ruang bernapas (whitespace) agar desain terlihat elegan dan mata audiens tidak cepat lelah.

## 4. Gunakan Wajah Manusia

Data menunjukkan bahwa postingan yang menampilkan wajah manusia mendapatkan engagement 38% lebih tinggi. Manusia secara alami merespons dan terhubung dengan wajah manusia lainnya.

## Kesimpulan

Desain yang baik bukan hanya tentang estetika, tapi tentang komunikasi. Desain yang efektif adalah desain yang pesannya tersampaikan dengan cepat dan jelas.
',
  'Desain Konten',
  'Published',
  '2024-12-15',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  'Nopian Hadi',
  'Nopian Hadi',
  'Desainer Kreatif & Video Editor dengan pengalaman dalam membangun brand presence di media sosial.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  ARRAY['Design', 'Social Media', 'Engagement', 'Instagram', 'Tips'],
  '5 min read'
),

-- Artikel 2
(
  'Cara Mengedit Video Pendek yang Viral di TikTok dan Reels',
  'Video pendek (short-form video) saat ini mendominasi algoritma media sosial. Ini adalah blueprint cara mengedit video yang menahan audiens dari detik pertama hingga akhir.',
  '# Cara Mengedit Video Pendek yang Viral

## Mengapa Editing Itu Penting?

Konten yang bagus bisa tenggelam jika editingnya membosankan. Retensi penonton adalah metrik utama di TikTok dan Instagram Reels. Semakin lama audiens menonton, semakin besar peluang video Anda menjadi viral.

## 1. Aturan 3 Detik Pertama

Jangan pernah memulai video dengan intro bertele-tele. Langsung masuk ke inti masalah (the hook).
Gunakan transisi cepat, zoom in mendadak, atau teks tebal di detik pertama untuk menarik perhatian.

## 2. Hapus Semua "Dead Air" (Jeda Kosong)

Potong (cut) semua bagian di mana Anda menarik napas, diam, atau berpikir (um.. ah..). Jump cut adalah gaya pengeditan standar untuk short-form video saat ini.

## 3. Tambahkan B-Roll dan Overlay

Jangan hanya menampilkan wajah yang berbicara (talking head) sepanjang video. Selingi dengan rekaman pendukung (B-roll), meme, screenshot, atau grafik yang relevan dengan apa yang Anda bicarakan.

## 4. Musik dan Efek Suara (SFX)

Musik latar (BGM) menentukan mood video. Jangan lupa gunakan efek suara (whoosh, pop, ding) saat memunculkan teks atau transisi untuk menambah kedinamisan.

## Kesimpulan

Editing video pendek adalah tentang mempertahankan ritme dan energi. Terus uji coba gaya editing baru untuk melihat apa yang paling disukai oleh audiens Anda.
',
  'Video Editing',
  'Published',
  '2024-11-20',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  'Nopian Hadi',
  'Nopian Hadi',
  'Desainer Kreatif & Video Editor dengan passion dalam pembuatan konten viral.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  ARRAY['Video Editing', 'TikTok', 'Reels', 'Premiere Pro', 'Tips'],
  '6 min read'
),

-- Artikel 3
(
  'Cara Membangun Portfolio Developer yang Berkesan',
  'Portfolio adalah kartu nama digital Anda. Pelajari strategi untuk membuat portfolio yang tidak hanya terlihat bagus, tapi juga berhasil mendatangkan klien dan pekerjaan impian.',
  '# Cara Membangun Portfolio Developer yang Berkesan

## Mengapa Portfolio Penting?

Sebagai developer, portfolio adalah bukti nyata kemampuan Anda. Ini lebih powerful dari sertifikasi apapun karena menunjukkan apa yang bisa Anda lakukan, bukan hanya apa yang Anda ketahui.

## Prinsip 1: Kualitas > Kuantitas

Lebih baik 3 project yang dikerjakan dengan sangat baik daripada 15 project asal jadi. Pilih project yang:
- Memecahkan masalah nyata
- Memiliki desain yang polished
- Menampilkan skill unggulan Anda

## Prinsip 2: Ceritakan Proses, Bukan Hanya Hasil

Rekruter ingin tahu bagaimana Anda berpikir. Untuk setiap project, ceritakan:
- **Problem**: Apa masalah yang dipecahkan?
- **Approach**: Bagaimana Anda mendekati masalah?
- **Solution**: Apa yang Anda bangun dan mengapa?
- **Impact**: Apa hasil yang dicapai?

## Prinsip 3: Buat Portfolio Anda Sendiri dari Scratch

Menggunakan template portfolio menunjukkan kurangnya inisiatif. Bangun sendiri dan jadikan portfolio itu sebagai project pertama yang Anda tampilkan.

## Prinsip 4: Jaga Agar Tetap Update

Portfolio yang terakhir diupdate 2 tahun lalu memberikan kesan negatif. Set reminder setiap 3 bulan untuk review dan update portfolio.

## Kesimpulan

Portfolio terbaik adalah yang jujur, fokus, dan terus berkembang. Mulai dengan satu project yang Anda banggakan dan kembangkan dari sana.
',
  'Career',
  'Published',
  '2024-10-05',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'Nopian Hadi',
  'Nopian Hadi',
  'Full Stack Developer & UI/UX Designer dengan passion dalam membangun produk digital yang berdampak.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  ARRAY['Career', 'Portfolio', 'Tips', 'Developer', 'Job Hunting'],
  '7 min read'
),

-- Artikel 4 (Draft)
(
  'Memahami Supabase: Database, Auth, dan Storage Dalam Satu Platform',
  'Supabase adalah alternatif open-source Firebase yang powerful. Artikel ini membahas cara memanfaatkan Supabase untuk membangun aplikasi fullstack modern dengan cepat.',
  '# Memahami Supabase: Database, Auth, dan Storage Dalam Satu Platform

## Draft - Akan Segera Diterbitkan

Artikel ini sedang dalam proses penulisan. Akan membahas:
- Setup Supabase dari awal
- Konfigurasi Row Level Security (RLS)
- Autentikasi dengan berbagai provider
- Real-time subscriptions
- Storage management
',
  'Web Development',
  'Draft',
  '2025-01-10',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  'Nopian Hadi',
  'Nopian Hadi',
  'Full Stack Developer & UI/UX Designer dengan passion dalam membangun produk digital yang berdampak.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  ARRAY['Supabase', 'PostgreSQL', 'Backend', 'Database', 'Auth'],
  '12 min read'
);

-- ============================================================
-- MOCK DATA: testimonials (5 testimoni klien)
-- ============================================================
INSERT INTO public.testimonials (
  name, position, company, message, rating, image, date, status
) VALUES
(
  'Budi Santoso',
  'CEO',
  'PT Belanja Nusantara',
  'Nopian adalah developer terbaik yang pernah kami ajak bekerja sama. Tidak hanya teknis yang mumpuni, tapi juga sangat komunikatif dan selalu memberikan solusi terbaik. Platform e-commerce kami meningkat pesat sejak dikerjakan oleh Nopian!',
  5,
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
  '2024-12-01',
  'Published'
),
(
  'Sari Dewi',
  'Head of Product',
  'DataViz Startup',
  'Desain UI/UX yang dibuat Nopian sangat clean dan intuitif. Selain itu, konten media sosial untuk campaign produk kami sangat menarik dan engagement-nya melesat tajam. Sangat direkomendasikan!',
  5,
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80',
  '2024-11-15',
  'Published'
),
(
  'Handoko Wijaya',
  'Direktur',
  'CV Maju Bersama Konstruksi',
  'Website yang dibuat Nopian sangat profesional dan modern. Banyak klien yang memuji tampilan website kami, dan yang lebih penting, inquiry bisnis kami meningkat tiga kali lipat dalam dua bulan pertama!',
  5,
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&q=80',
  '2024-09-20',
  'Published'
),
(
  'Mega Pratiwi',
  'Product Manager',
  'HealthLife Indonesia',
  'Nopian memahami kebutuhan kami dengan sangat baik. Aplikasi web yang dibangun terintegrasi sempurna dengan mobile app kami. The attention to detail dalam UX design sangat impressive!',
  5,
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
  '2024-08-10',
  'Published'
),
(
  'Rizky Firmansyah',
  'Co-Founder',
  'TechStartup.id',
  'Kerja keras dan dedikasi Nopian sangat luar biasa. Deadline selalu terpenuhi, kode bersih dan terdokumentasi dengan baik. Akan terus menggunakan jasanya untuk project-project kami ke depan.',
  4,
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  '2024-07-22',
  'Published'
);

-- ============================================================
-- MOCK DATA: contact_messages (beberapa pesan contoh)
-- ============================================================
INSERT INTO public.contact_messages (
  name, email, subject, message, status, created_at
) VALUES
(
  'Jane Smith',
  'jane.smith@example.com',
  'Kerjasama Proyek',
  'Halo Nopian, saya tertarik untuk mengajak Anda bekerja sama dalam proyek desain konten medsos kami.',
  'Unread',
  now() - interval '1 day'
),
(
  'Budi Santoso', 
  'budi.santoso@startup.com', 
  'ui-ux-design', 
  'Kami butuh desain ulang untuk aplikasi mobile startup kami.', 
  'Unread', 
  now() - interval '2 days'
),
(
  'David Wijaya',
  'david.w@example.com',
  'Tanya Layanan',
  'Berapa rate untuk pembuatan video profil perusahaan durasi 3 menit?',
  'Read',
  now() - interval '3 days'
),
(
  'Ahmad Fauzi',
  'ahmad.fauzi@gmail.com',
  'web-development',
  'Halo Nopian, saya tertarik untuk menggunakan jasa Anda dalam membangun website toko online untuk usaha fashion saya. Saya ingin fitur katalog produk, keranjang belanja, dan integrasi dengan payment gateway. Apakah bisa kita diskusi lebih lanjut?',
  'Unread',
  NOW() - INTERVAL '2 hours'
),
(
  'Lisa Hernandez',
  'lisa.hernandez@techcorp.com',
  'ui-ux-design',
  'Hi Nopian! I came across your portfolio and I am really impressed with your UI/UX and Graphic Design work. We are currently looking for a designer to revamp our brand identity and social media templates. Would you be available for a project starting next month?',
  'Unread',
  NOW() - INTERVAL '1 day'
),
(
  'Dimas Pratama',
  'dimas@startup.io',
  'consulting',
  'Selamat sore, Nopian. Kami adalah startup fintech yang baru saja selesai seri A funding. Kami membutuhkan konsultasi teknis untuk arsitektur sistem kami yang akan scale ke 1 juta user. Apakah Anda menerima layanan consulting?',
  'Read',
  NOW() - INTERVAL '3 days'
),
(
  'Nina Kusuma',
  'nina.k@agencydesign.com',
  'web-development',
  'Halo! Kami adalah digital agency yang sedang mencari talented developer untuk kolaborasi jangka panjang. Apakah Anda terbuka untuk kerjasama agency? Kami punya banyak project menarik.',
  'Replied',
  NOW() - INTERVAL '1 week'
),
(
  'Tommy Chen',
  'tommy@ecommerce.sg',
  'other',
  'Hello Nopian, I found your profile through LinkedIn. We are looking for a developer to build a Southeast Asian marketplace platform. The budget is substantial and we are looking for someone who can lead the technical team. Are you interested?',
  'Archived',
  NOW() - INTERVAL '2 weeks'
);

-- ============================================================
-- MOCK DATA: creative_works
-- ============================================================
INSERT INTO public.creative_works (title, category, image, video_url, status, created_at)
VALUES
  ('Social Media Campaign - Tech Startup', 'Design', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', NULL, 'Published', now()),
  ('Brand Identity - Kopi Kenangan', 'Design', 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', NULL, 'Published', now() - interval '2 days'),
  ('Product Launch Video - Smartphone XYZ', 'Video', 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Published', now() - interval '5 days'),
  ('Instagram Feed Puzzle Template', 'Design', 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', NULL, 'Published', now() - interval '7 days'),
  ('Event Aftermovie - Music Fest 2024', 'Video', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Published', now() - interval '10 days'),
  ('UI/UX App Redesign Concept', 'Design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', NULL, 'Published', now() - interval '12 days');

-- ============================================================
-- MOCK DATA: user_profiles
-- ============================================================
-- Catatan: UUID di sini hanyalah contoh ('00000000-0000-0000-0000-000000000000'). 
-- Pada praktiknya, id ini harus sesuai dengan id user yang ada di auth.users Supabase Anda.
INSERT INTO public.user_profiles (
  id, name, email, phone, location, bio, avatar, website, github, linkedin, twitter, instagram
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Nopian Hadi',
  'nopianhadi2@gmail.com',
  '+62 812 3456 7890',
  'Indonesia',
  'Seorang profesional kreatif yang passionate dalam Web Development, Desain Konten Medsos & Desain, serta Video Editing.',
  '/images/nopian-hadi.jpg',
  'https://nopianhadi.com',
  'https://github.com/nopianhadi',
  'https://www.linkedin.com/in/nopian-hadi-74041816a/',
  'https://twitter.com/nopianhadi',
  'https://www.instagram.com/nopianhadii/'
) ON CONFLICT (id) DO NOTHING;
