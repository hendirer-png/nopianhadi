-- ============================================================
-- SCHEMA SUPABASE - Portfolio Nopian Hadi 2025
-- Project URL: https://mkvasrbfzngdvmffhiep.supabase.co
-- Jalankan file ini di Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. TABEL: projects
-- Menyimpan data portfolio / karya / proyek yang dikerjakan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id          UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT          NOT NULL,
  client      TEXT          NOT NULL DEFAULT '',
  year        TEXT          NOT NULL DEFAULT '',
  category    TEXT          NOT NULL DEFAULT '',
  hero_image  TEXT          NOT NULL DEFAULT '',
  overview    TEXT          NOT NULL DEFAULT '',
  challenge   TEXT          NOT NULL DEFAULT '',
  solution    TEXT          NOT NULL DEFAULT '',
  results     TEXT[]        NOT NULL DEFAULT '{}',
  technologies TEXT[]       NOT NULL DEFAULT '{}',
  duration    TEXT          NOT NULL DEFAULT '',
  role        TEXT          NOT NULL DEFAULT '',
  images      TEXT[]        NOT NULL DEFAULT '{}',
  video       TEXT,
  live_demo   TEXT,
  source_code TEXT,
  status      TEXT          NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  -- Kolom testimonial inline (opsional, dari project spesifik)
  testimonial_quote    TEXT,
  testimonial_author   TEXT,
  testimonial_position TEXT,
  created_at  TIMESTAMPTZ   DEFAULT now(),
  updated_at  TIMESTAMPTZ   DEFAULT now()
);

-- ============================================================
-- 2. TABEL: articles
-- Menyimpan artikel / blog post yang ditulis Nopian
-- ============================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id          UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT          NOT NULL,
  excerpt     TEXT          NOT NULL DEFAULT '',
  content     TEXT          NOT NULL DEFAULT '',
  category    TEXT          NOT NULL DEFAULT '',
  status      TEXT          NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  date        DATE          NOT NULL DEFAULT CURRENT_DATE,
  image       TEXT          NOT NULL DEFAULT '',
  author      TEXT          NOT NULL DEFAULT 'Nopian Hadi',
  author_name TEXT,
  author_bio  TEXT,
  author_avatar TEXT,
  tags        TEXT[]        NOT NULL DEFAULT '{}',
  read_time   TEXT          NOT NULL DEFAULT '5 min read',
  created_at  TIMESTAMPTZ   DEFAULT now(),
  updated_at  TIMESTAMPTZ   DEFAULT now()
);

-- ============================================================
-- 3. TABEL: testimonials
-- Menyimpan testimoni dari klien
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id        UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  name      TEXT          NOT NULL,
  position  TEXT          NOT NULL DEFAULT '',
  company   TEXT          NOT NULL DEFAULT '',
  message   TEXT          NOT NULL DEFAULT '',
  rating    INTEGER       NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image     TEXT          NOT NULL DEFAULT '',
  date      DATE          NOT NULL DEFAULT CURRENT_DATE,
  status    TEXT          NOT NULL DEFAULT 'Pending' CHECK (status IN ('Published', 'Pending')),
  created_at TIMESTAMPTZ  DEFAULT now(),
  updated_at TIMESTAMPTZ  DEFAULT now()
);

-- ============================================================
-- 4. TABEL: contact_messages
-- Menyimpan pesan yang masuk dari form kontak website
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT          NOT NULL,
  email      TEXT          NOT NULL,
  subject    TEXT          NOT NULL DEFAULT '',
  message    TEXT          NOT NULL DEFAULT '',
  status     TEXT          NOT NULL DEFAULT 'Unread'
               CHECK (status IN ('Unread', 'Read', 'Replied', 'Archived')),
  created_at TIMESTAMPTZ   DEFAULT now(),
  updated_at TIMESTAMPTZ   DEFAULT now()
);

-- ============================================================
-- 5. TABEL: user_profiles
-- Menyimpan profil admin/pemilik website (terhubung ke auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id        UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name      TEXT          NOT NULL DEFAULT '',
  email     TEXT          NOT NULL DEFAULT '',
  phone     TEXT,
  location  TEXT,
  bio       TEXT,
  avatar    TEXT,
  website   TEXT,
  github    TEXT,
  linkedin  TEXT,
  twitter   TEXT,
  instagram TEXT,
  created_at TIMESTAMPTZ  DEFAULT now(),
  updated_at TIMESTAMPTZ  DEFAULT now()
);

-- ============================================================
-- 6. TABEL: creative_works
-- Menyimpan portfolio desain grafis dan video editing
-- ============================================================
CREATE TABLE IF NOT EXISTS public.creative_works (
  id          UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT          NOT NULL,
  category    TEXT          NOT NULL DEFAULT 'Design',
  image       TEXT          NOT NULL DEFAULT '',
  video_url   TEXT,
  status      TEXT          NOT NULL DEFAULT 'Published' CHECK (status IN ('Published', 'Draft')),
  created_at  TIMESTAMPTZ   DEFAULT now(),
  updated_at  TIMESTAMPTZ   DEFAULT now()
);

-- ============================================================
-- TRIGGERS: auto-update kolom updated_at saat ada perubahan
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk tabel projects
DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger untuk tabel articles
DROP TRIGGER IF EXISTS set_articles_updated_at ON public.articles;
CREATE TRIGGER set_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger untuk tabel testimonials
DROP TRIGGER IF EXISTS set_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER set_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger untuk tabel contact_messages
DROP TRIGGER IF EXISTS set_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER set_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger untuk tabel user_profiles
DROP TRIGGER IF EXISTS set_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER set_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger untuk tabel creative_works
DROP TRIGGER IF EXISTS set_creative_works_updated_at ON public.creative_works;
CREATE TRIGGER set_creative_works_updated_at
  BEFORE UPDATE ON public.creative_works
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS pada semua tabel
ALTER TABLE public.projects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_works  ENABLE ROW LEVEL SECURITY;

-- ---- PROJECTS ----
-- Siapa saja (publik) bisa membaca project yang Published
CREATE POLICY "projects_select_published"
  ON public.projects FOR SELECT
  USING (status = 'Published');

-- Admin (authenticated) bisa baca semua project termasuk Draft
CREATE POLICY "projects_select_all_authenticated"
  ON public.projects FOR SELECT
  TO authenticated
  USING (true);

-- Hanya admin yang bisa insert, update, delete
CREATE POLICY "projects_insert_authenticated"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "projects_update_authenticated"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "projects_delete_authenticated"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- ---- ARTICLES ----
-- Publik bisa baca artikel Published
CREATE POLICY "articles_select_published"
  ON public.articles FOR SELECT
  USING (status = 'Published');

-- Admin bisa baca semua
CREATE POLICY "articles_select_all_authenticated"
  ON public.articles FOR SELECT
  TO authenticated
  USING (true);

-- Hanya admin bisa tulis, edit, hapus
CREATE POLICY "articles_insert_authenticated"
  ON public.articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "articles_update_authenticated"
  ON public.articles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "articles_delete_authenticated"
  ON public.articles FOR DELETE
  TO authenticated
  USING (true);

-- ---- TESTIMONIALS ----
-- Publik bisa baca testimoni Published
CREATE POLICY "testimonials_select_published"
  ON public.testimonials FOR SELECT
  USING (status = 'Published');

-- Admin bisa baca semua
CREATE POLICY "testimonials_select_all_authenticated"
  ON public.testimonials FOR SELECT
  TO authenticated
  USING (true);

-- Hanya admin bisa tulis, edit, hapus
CREATE POLICY "testimonials_insert_authenticated"
  ON public.testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "testimonials_update_authenticated"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "testimonials_delete_authenticated"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (true);

-- ---- CONTACT MESSAGES ----
-- Siapa saja (publik) bisa INSERT (kirim pesan dari form kontak)
CREATE POLICY "contact_messages_insert_public"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- Hanya admin yang bisa baca semua pesan
CREATE POLICY "contact_messages_select_authenticated"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Hanya admin yang bisa update status pesan
CREATE POLICY "contact_messages_update_authenticated"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (true);

-- Hanya admin yang bisa hapus pesan
CREATE POLICY "contact_messages_delete_authenticated"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- ---- USER PROFILES ----
-- User hanya bisa baca dan edit profil mereka sendiri
CREATE POLICY "user_profiles_select_own"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "user_profiles_insert_own"
  ON public.user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_profiles_update_own"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- ---- CREATIVE WORKS ----
-- Publik bisa baca yang Published
CREATE POLICY "creative_works_select_published"
  ON public.creative_works FOR SELECT
  USING (status = 'Published');

-- Admin bisa baca semua
CREATE POLICY "creative_works_select_all_authenticated"
  ON public.creative_works FOR SELECT
  TO authenticated
  USING (true);

-- Hanya admin bisa modifikasi
CREATE POLICY "creative_works_insert_authenticated"
  ON public.creative_works FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "creative_works_update_authenticated"
  ON public.creative_works FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "creative_works_delete_authenticated"
  ON public.creative_works FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- STORAGE BUCKET: public (untuk avatar dan gambar lainnya)
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public',
  'public',
  true,
  5242880, -- max 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Policy storage: siapa saja bisa baca file yang ada di bucket public
DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
CREATE POLICY "storage_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public');

-- Hanya user terotentikasi yang bisa upload
DROP POLICY IF EXISTS "storage_public_upload" ON storage.objects;
CREATE POLICY "storage_public_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'public');

-- Hanya user terotentikasi yang bisa hapus file mereka
DROP POLICY IF EXISTS "storage_public_delete" ON storage.objects;
CREATE POLICY "storage_public_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'public');

-- ============================================================
-- INDEX: untuk performa query yang lebih baik
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_status       ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at   ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_status       ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_date         ON public.articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_status   ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_creative_works_status   ON public.creative_works(status);
CREATE INDEX IF NOT EXISTS idx_creative_works_created  ON public.creative_works(created_at DESC);

-- ============================================================
-- TABLE: user_profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id          UUID          PRIMARY KEY, -- Maps to auth.users.id
  name        TEXT          NOT NULL,
  email       TEXT          NOT NULL,
  phone       TEXT,
  location    TEXT,
  bio         TEXT,
  avatar      TEXT,
  website     TEXT,
  github      TEXT,
  linkedin    TEXT,
  twitter     TEXT,
  instagram   TEXT,
  created_at  TIMESTAMPTZ   DEFAULT now(),
  updated_at  TIMESTAMPTZ   DEFAULT now()
);

-- Trigger for user_profiles updated_at
DROP TRIGGER IF EXISTS set_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER set_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS untuk user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Publik bisa membaca profil user
DROP POLICY IF EXISTS "user_profiles_select_public" ON public.user_profiles;
CREATE POLICY "user_profiles_select_public"
  ON public.user_profiles FOR SELECT
  USING (true);

-- User hanya bisa insert profil mereka sendiri
DROP POLICY IF EXISTS "user_profiles_insert_own" ON public.user_profiles;
CREATE POLICY "user_profiles_insert_own"
  ON public.user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User hanya bisa update profil mereka sendiri
DROP POLICY IF EXISTS "user_profiles_update_own" ON public.user_profiles;
CREATE POLICY "user_profiles_update_own"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
