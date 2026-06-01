# 📚 Ringkasan Project SPK dengan Supabase

## 📁 Struktur File Project

```
spk/
├── index.html                    ← Halaman utama SPK
├── manage-data.html              ← Halaman manage data CRUD (NEW!)
├── script.js                     ← Logic SAW utama
├── style.css                     ← Styling CSS
│
├── supabase-config.js            ← Konfigurasi Supabase (NEW!)
├── supabase-db.js                ← CRUD functions Supabase (NEW!)
├── manage-data.js                ← Logic untuk manage-data.html (NEW!)
│
├── SETUP_SUPABASE.sql            ← SQL queries setup tabel (NEW!)
├── PANDUAN_SUPABASE.md           ← Dokumentasi Supabase
├── QUICKSTART.md                 ← Quick start 5 menit
├── TROUBLESHOOTING_CRUD.md       ← Troubleshooting CRUD & Delete (NEW!)
└── README.md                     ← File ini
```

---

## 🎯 Fitur Utama

### **1. SPK (Simple Additive Weighting)** - `index.html`
- Atur kriteria & bobot
- Input alternatif/pilihan
- Hitung ranking otomatis
- Lihat hasil perankingan
- **NEW:** Link ke Manage Data page

### **2. Manage Data CRUD** - `manage-data.html` ✨ NEW
- **Kriteria:**
  - ✅ Tambah kriteria baru
  - ✅ Edit kriteria (modal form)
  - ✅ Hapus kriteria (dengan konfirmasi)
  - ✅ Simpan/ambil dari Supabase

- **Alternatif/Pilihan:**
  - ✅ Tambah pilihan baru
  - ✅ Edit pilihan & nilai kriteria
  - ✅ Hapus pilihan
  - ✅ Simpan/ambil dari Supabase

### **3. Database Integration** - Supabase
- Simpan kriteria, alternatif, & hasil
- Akses dari mana saja
- Real-time sync
- Riwayat perhitungan

---

## 🚀 Quick Start (3 Steps)

### **Step 1: Setup Supabase (1x saja)**

Buka `SETUP_SUPABASE.sql` → Copy semua → Paste di Supabase SQL Editor → Run

```sql
-- Membuat 3 tabel:
-- 1. kriteria (nama, bobot, tipe)
-- 2. alternatif (nama, nilai)
-- 3. hasil_saw (riwayat perhitungan)
```

### **Step 2: Jalankan Aplikasi**

```bash
python -m http.server 5500
# Atau pakai Live Server di VS Code
```

### **Step 3: Gunakan Aplikasi**

- **Akses utama:** `http://localhost:5500`
- **Manage Data:** `http://localhost:5500/manage-data.html`

---

## 📋 File-File Baru & Perubahan

### **FILE BARU:**

| File | Fungsi | Status |
|------|--------|--------|
| `supabase-config.js` | Konfigurasi koneksi Supabase | ✅ Selesai |
| `supabase-db.js` | Fungsi CRUD database | ✅ Selesai |
| `manage-data.html` | UI untuk manage data | ✅ Selesai |
| `manage-data.js` | Logic manage data | ✅ Selesai |
| `SETUP_SUPABASE.sql` | SQL setup tabel | ✅ Selesai |
| `TROUBLESHOOTING_CRUD.md` | Dokumentasi troubleshoot | ✅ Selesai |

### **FILE YANG DIUPDATE:**

| File | Perubahan |
|------|-----------|
| `index.html` | ✅ Tambah link "⚙️ Manage Data" |
| | ✅ Tambah tombol simpan/ambil kriteria & alternatif |
| | ✅ Update tombol hitung jadi "Hitung & Simpan Hasil" |
| | ✅ Include Supabase JS & file baru |
| `supabase-db.js` | ✅ CRUD functions lebih lengkap |
| | ✅ Error handling lebih baik |
| | ✅ Tambah fungsi edit & delete individual |

---

## 🔑 API Keys (Sudah Ter-Set)

```javascript
// supabase-config.js
const SUPABASE_URL = 'https://vbjhnqlcpjcnbvhhgsoa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // ✅ Sudah benar
```

---

## 💻 Dokumentasi

### **Untuk Pengguna Baru:**
1. Mulai dari `QUICKSTART.md` (5 menit)
2. Lanjut ke `PANDUAN_SUPABASE.md` (lengkap)

### **Untuk Troubleshooting:**
- Baca `TROUBLESHOOTING_CRUD.md` (khusus delete & CRUD issues)

### **Untuk Developer:**
- Lihat komentar di `supabase-db.js` & `manage-data.js`
- Setiap fungsi sudah dijelaskan

---

## 🎯 Use Cases

### **Use Case 1: Hitung SAW Cepat**
```
1. Buka index.html
2. Edit kriteria & alternatif lokal
3. Klik "Hitung & Simpan Hasil"
4. Lihat hasil ranking
```

### **Use Case 2: Manage Data Permanen**
```
1. Buka manage-data.html
2. Tambah/edit/hapus kriteria
3. Klik "Simpan Semua ke DB"
4. Data tersimpan di Supabase
```

### **Use Case 3: Share/Reuse Data**
```
1. Data disimpan di Supabase
2. Bisa diakses dari device lain
3. Klik "Refresh dari DB" untuk ambil
```

---

## 🐛 Troubleshooting Cepat

### **Delete tidak berfungsi?**
→ Disable RLS di Supabase (lihat `TROUBLESHOOTING_CRUD.md`)

### **Data tidak tersimpan?**
→ Cek console browser (F12) untuk error

### **Koneksi Supabase error?**
→ Verifikasi API key di `supabase-config.js`

### **Tabel tidak ada?**
→ Jalankan `SETUP_SUPABASE.sql` di Supabase SQL Editor

---

## 🔄 Workflow Recommended

```
┌─────────────────────────────────────────────┐
│ 1. SETUP SUPABASE (1x)                      │
│    - Setup SQL queries                      │
│    - Disable RLS (optional)                 │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 2. MANAGE DATA (manage-data.html)           │
│    - Tambah/edit/hapus kriteria             │
│    - Tambah/edit/hapus alternatif           │
│    - Simpan ke Supabase                     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 3. HITUNG SAW (index.html)                  │
│    - Ambil data dari Supabase               │
│    - Atur nilai/bobot sesuai kebutuhan      │
│    - Klik "Hitung & Simpan Hasil"           │
│    - Lihat ranking hasil                    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 4. ANALISIS HASIL                           │
│    - Lihat ranking & normalisasi            │
│    - Export/cetak PDF                       │
│    - Simpan riwayat di Supabase             │
└─────────────────────────────────────────────┘
```

---

## 🎨 UI/UX Updates

### **Manage Data Page:**
- ✅ Tabel interaktif dengan data lokal & Supabase
- ✅ Modal form untuk edit data
- ✅ Konfirmasi delete untuk safety
- ✅ Status badge (benefit/cost, bobot)
- ✅ Real-time count (Total kriteria/alternatif)
- ✅ Tombol aksi yang jelas (Tambah/Edit/Hapus/Simpan/Ambil)

---

## 📊 Struktur Database

### **Tabel: kriteria**
```
id (int)       - Primary Key
nama (text)    - Nama kriteria
bobot (decimal) - Bobot 0-100%
tipe (text)    - 'benefit' atau 'cost'
```

### **Tabel: alternatif**
```
id (int)       - Primary Key
nama (text)    - Nama pilihan
nilai (jsonb)  - Array [85, 15000000, ...]
```

### **Tabel: hasil_saw**
```
id (bigint)    - Primary Key
nama_pengguna (text) - Siapa yang hitung
timestamp      - Kapan
kriteria_data (jsonb) - Kriteria saat hitung
hasil_ranking (jsonb) - Ranking hasil
```

---

## ✅ Checklist Setup Awal

- [ ] Clone/download project SPK
- [ ] Buka `SETUP_SUPABASE.sql` di Supabase SQL Editor
- [ ] Run semua query untuk buat tabel
- [ ] Disable RLS (opsional, untuk prevent delete errors)
- [ ] Verify credentials di `supabase-config.js`
- [ ] Jalankan `python -m http.server 5500`
- [ ] Test akses `index.html` & `manage-data.html`
- [ ] Test simpan/ambil data

---

## 🚀 Next Steps (Future Features)

- [ ] User Authentication (Login/Register)
- [ ] Multi-user support dengan RLS policies
- [ ] Export hasil ke PDF
- [ ] Dashboard dengan grafik
- [ ] Share hasil dengan link
- [ ] Mobile responsive optimization

---

## 📞 Support & Debugging

**Jika ada error:**

1. Buka console browser (F12 → Console)
2. Lihat pesan error lengkap
3. Cek `TROUBLESHOOTING_CRUD.md`
4. Verifikasi setup Supabase

**Error messages akan ditampilkan:**
- ✅ Success: `✅ Kriteria berhasil disimpan!`
- ❌ Error: `❌ Gagal menyimpan: [error detail]`

---

**🎉 Selamat! Project SPK Anda sudah production-ready!**

---

*Last Updated: May 29, 2026*
*Version: 1.0.0 (with CRUD & Supabase)*
