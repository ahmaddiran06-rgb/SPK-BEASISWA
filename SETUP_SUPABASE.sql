/* ======================================================
   SETUP SUPABASE - SQL QUERIES TO CREATE TABLES
   ======================================================
   
   CARA MENGGUNAKAN:
   1. Login ke Supabase (https://supabase.com)
   2. Buka Project Anda
   3. Pergi ke SQL Editor (klik "+" → SQL Editor)
   4. Copy-paste setiap query di bawah ini
   5. Klik "Run" untuk menjalankan setiap query
   
   ====================================================== */

-- ========================================================
-- 1. BUAT TABEL KRITERIA
-- ========================================================
-- Menyimpan data kriteria (Nilai Akademik, Biaya, dll)

CREATE TABLE IF NOT EXISTS kriteria (
  id INTEGER PRIMARY KEY,
  nama VARCHAR(255) NOT NULL UNIQUE,
  bobot DECIMAL(5,2) NOT NULL CHECK (bobot > 0 AND bobot <= 100),
  tipe VARCHAR(20) NOT NULL CHECK (tipe IN ('benefit', 'cost')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk pencarian cepat
CREATE INDEX idx_kriteria_nama ON kriteria(nama);

-- ========================================================
-- 2. BUAT TABEL ALTERNATIF
-- ========================================================
-- Menyimpan pilihan universitas/beasiswa

CREATE TABLE IF NOT EXISTS alternatif (
  id INTEGER PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  nilai JSONB NOT NULL, -- Array nilai [85, 15000000, 20000000, 10, 90]
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk pencarian
CREATE INDEX idx_alternatif_nama ON alternatif(nama);

-- ========================================================
-- 3. BUAT TABEL HASIL SAW
-- ========================================================
-- Menyimpan riwayat hasil perhitungan SAW

CREATE TABLE IF NOT EXISTS hasil_saw (
  id BIGSERIAL PRIMARY KEY,
  nama_pengguna VARCHAR(255),
  timestamp TIMESTAMP DEFAULT NOW(),
  kriteria_data JSONB NOT NULL, -- Simpan kriteria yang digunakan saat perhitungan
  bobot_normal JSONB NOT NULL,  -- Simpan bobot yang sudah dinormalisasi
  hasil_ranking JSONB NOT NULL, -- Simpan ranking hasil SAW
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk pencarian berdasarkan tanggal dan user
CREATE INDEX idx_hasil_saw_timestamp ON hasil_saw(timestamp DESC);
CREATE INDEX idx_hasil_saw_user ON hasil_saw(nama_pengguna);

-- ========================================================
-- 4. BUAT TABEL USERS (OPSIONAL - untuk login)
-- ========================================================
-- Jika Anda ingin menambahkan user management

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  nama_lengkap VARCHAR(255),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- ========================================================
-- 5. TESTING DATA - MASUKKAN CONTOH DATA
-- ========================================================

-- Insert contoh kriteria
INSERT INTO kriteria (id, nama, bobot, tipe) VALUES
(0, 'Nilai Akademik', 30, 'benefit'),
(1, 'Biaya Kuliah', 25, 'cost'),
(2, 'Nilai Beasiswa', 25, 'benefit'),
(3, 'Jarak / Lokasi', 10, 'cost'),
(4, 'Reputasi Kampus', 10, 'benefit')
ON CONFLICT (id) DO NOTHING;

-- Insert contoh alternatif
INSERT INTO alternatif (id, nama, nilai) VALUES
(0, 'Univ. Indonesia', '[85, 15000000, 20000000, 10, 90]'),
(1, 'Univ. Gadjah Mada', '[80, 12000000, 18000000, 30, 88]'),
(2, 'Beasiswa LPDP', '[90, 0, 25000000, 50, 95]'),
(3, 'Univ. Brawijaya', '[75, 10000000, 15000000, 20, 80]')
ON CONFLICT (id) DO NOTHING;

-- ========================================================
-- 6. ENABLE RLS (ROW LEVEL SECURITY) - OPSIONAL
-- ========================================================
-- Untuk keamanan, bisa aktifkan RLS dan policy

-- ALTER TABLE kriteria ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE alternatif ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE hasil_saw ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- STRUKTUR TABEL YANG SUDAH DIBUAT
-- ========================================================

/*
TABEL: kriteria
├── id (INTEGER) - Primary Key
├── nama (VARCHAR) - Nama kriteria
├── bobot (DECIMAL) - Bobot 0-100%
├── tipe (VARCHAR) - 'benefit' atau 'cost'
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

TABEL: alternatif
├── id (INTEGER) - Primary Key
├── nama (VARCHAR) - Nama pilihan
├── nilai (JSONB) - Array nilai per kriteria
├── timestamp (TIMESTAMP)
└── created_at (TIMESTAMP)

TABEL: hasil_saw
├── id (BIGSERIAL) - Primary Key
├── nama_pengguna (VARCHAR) - Siapa yang menghitung
├── timestamp (TIMESTAMP) - Kapan
├── kriteria_data (JSONB) - Data kriteria saat perhitungan
├── bobot_normal (JSONB) - Bobot yang sudah dinormalisasi
├── hasil_ranking (JSONB) - Hasil ranking
└── created_at (TIMESTAMP)

TABEL: users
├── id (UUID) - Primary Key
├── email (VARCHAR) - Email pengguna
├── nama_lengkap (VARCHAR) - Nama
├── password_hash (VARCHAR) - Hash password
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
*/

-- ========================================================
-- QUERY BERGUNA UNTUK TESTING
-- ========================================================

-- Lihat semua kriteria
-- SELECT * FROM kriteria ORDER BY id;

-- Lihat semua alternatif
-- SELECT * FROM alternatif ORDER BY id;

-- Lihat riwayat hasil 10 terakhir
-- SELECT id, nama_pengguna, timestamp FROM hasil_saw ORDER BY timestamp DESC LIMIT 10;

-- Hapus semua data (HATI-HATI!)
-- DELETE FROM hasil_saw;
-- DELETE FROM alternatif;
-- DELETE FROM kriteria;
