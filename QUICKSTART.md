# ⚡ QUICK START - Setup Supabase dalam 5 Menit

## 🎯 Ringkas Langkah

### 1️⃣ **Buka Supabase Dashboard**
Pergi ke: https://app.supabase.com

### 2️⃣ **Buka SQL Editor**
- Klik project Anda
- Sidebar kiri → **SQL Editor**
- Klik **New Query** atau **+**

### 3️⃣ **Copy-Paste SQL Queries**
Buka file `SETUP_SUPABASE.sql` dan copy semua isi (dari baris pertama sampai baris terakhir).

Paste ke SQL Editor Supabase, lalu klik **Run** ▶️

### 4️⃣ **Tunggu Berhasil**
Tunggu sampai muncul ✅ "Success" atau tulisan hijau.

### 5️⃣ **Jalankan Aplikasi**
Terminal:
```bash
python -m http.server 5500
```

Buka browser: `http://localhost:5500`

---

## 🧪 Testing Cepat

### Coba Simpan Data:
1. Isi form kriteria & alternatif (bisa pakai default)
2. Klik **💾 Simpan Kriteria**
3. Klik **💾 Simpan Pilihan**
4. Klik **Hitung & Simpan Hasil**

### Cek Console Browser:
Tekan **F12** → Tab **Console**

Lihat pesan berhasil:
```
✅ Kriteria tersimpan
✅ Alternatif tersimpan
✅ Hasil SAW tersimpan
```

---

## 📋 SQL Queries Lengkap

Jika mau copas manual, gunakan queries di bawah:

### **Query 1: Buat Tabel Kriteria**
```sql
CREATE TABLE IF NOT EXISTS kriteria (
  id INTEGER PRIMARY KEY,
  nama VARCHAR(255) NOT NULL UNIQUE,
  bobot DECIMAL(5,2) NOT NULL CHECK (bobot > 0 AND bobot <= 100),
  tipe VARCHAR(20) NOT NULL CHECK (tipe IN ('benefit', 'cost')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Query 2: Buat Tabel Alternatif**
```sql
CREATE TABLE IF NOT EXISTS alternatif (
  id INTEGER PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  nilai JSONB NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Query 3: Buat Tabel Hasil SAW**
```sql
CREATE TABLE IF NOT EXISTS hasil_saw (
  id BIGSERIAL PRIMARY KEY,
  nama_pengguna VARCHAR(255),
  timestamp TIMESTAMP DEFAULT NOW(),
  kriteria_data JSONB NOT NULL,
  bobot_normal JSONB NOT NULL,
  hasil_ranking JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Query 4: Insert Data Contoh (Opsional)**
```sql
INSERT INTO kriteria (id, nama, bobot, tipe) VALUES
(0, 'Nilai Akademik', 30, 'benefit'),
(1, 'Biaya Kuliah', 25, 'cost'),
(2, 'Nilai Beasiswa', 25, 'benefit'),
(3, 'Jarak / Lokasi', 10, 'cost'),
(4, 'Reputasi Kampus', 10, 'benefit')
ON CONFLICT (id) DO NOTHING;

INSERT INTO alternatif (id, nama, nilai) VALUES
(0, 'Univ. Indonesia', '[85, 15000000, 20000000, 10, 90]'),
(1, 'Univ. Gadjah Mada', '[80, 12000000, 18000000, 30, 88]'),
(2, 'Beasiswa LPDP', '[90, 0, 25000000, 50, 95]'),
(3, 'Univ. Brawijaya', '[75, 10000000, 15000000, 20, 80]')
ON CONFLICT (id) DO NOTHING;
```

---

## ✅ Checklist

- [ ] Buat 3 tabel di Supabase (kriteria, alternatif, hasil_saw)
- [ ] Insert contoh data (opsional tapi helpful)
- [ ] Jalankan `python -m http.server 5500`
- [ ] Buka `http://localhost:5500`
- [ ] Klik "Simpan Kriteria" dan lihat console
- [ ] Cek di Supabase Dashboard apakah data tersimpan

---

## 🔧 Debugging

Jika error, cek ini:

### Error: "CORS error" atau "Failed to fetch"
→ Pastikan Supabase URL dan KEY benar di `supabase-config.js`

### Error: "Table does not exist"
→ Jalankan SQL queries lagi, pastikan berhasil (✅ green)

### Error: "Unauthorized"
→ Cek API Key di Supabase (Project Settings → API → Anon Key)

### Data tidak muncul di Supabase
→ Buka browser Console (F12) dan lihat error message detail

---

## 📚 File-File Penting

| File | Isi |
|------|-----|
| `supabase-config.js` | Konfigurasi URL & Key |
| `supabase-db.js` | Fungsi-fungsi CRUD |
| `SETUP_SUPABASE.sql` | Query SQL semua tabel |
| `PANDUAN_SUPABASE.md` | Dokumentasi lengkap |
| `QUICKSTART.md` | File ini |

---

**🎉 Selesai! Aplikasi Anda sudah terhubung ke Supabase!**
