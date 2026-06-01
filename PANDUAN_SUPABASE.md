# 📚 PANDUAN SETUP SUPABASE UNTUK SPK

## 🎯 Langkah-Langkah Setup

### **STEP 1: Buat Tabel di Supabase**

1. Buka [Supabase Dashboard](https://app.supabase.com) → Pilih project Anda
2. Klik **SQL Editor** (di sidebar kiri)
3. Klik **"New Query"** atau **"+"**
4. Copy-paste seluruh isi file `SETUP_SUPABASE.sql`
5. Klik **"Run"** (tombol ▶️)
6. Tunggu sampai berhasil ✅

---

### **STEP 2: Verifikasi Tabel Sudah Dibuat**

Setelah query dijalankan, cek di **Table Editor**:
- Sidebar kiri → **Table Editor**
- Pastikan ada 4 tabel:
  - ✅ `kriteria`
  - ✅ `alternatif`
  - ✅ `hasil_saw`
  - ✅ `users` (opsional)

---

### **STEP 3: Konfigurasi Sudah Benar**

Credentials Anda sudah ter-set di file `supabase-config.js`:
```javascript
const SUPABASE_URL = 'https://vbjhnqlcpjcnbvhhgsoa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...';
```
✅ Sudah benar!

---

### **STEP 4: Jalankan Aplikasi**

1. Buka terminal di VS Code
2. Jalankan:
   ```bash
   python -m http.server 5500
   ```
3. Buka browser: `http://localhost:5500`
4. Aplikasi sudah siap dengan Supabase! 🎉

---

## 📁 File-File Baru Yang Dibuat

| File | Fungsi |
|------|--------|
| `supabase-config.js` | Konfigurasi koneksi ke Supabase |
| `supabase-db.js` | Fungsi CRUD (Create, Read, Update, Delete) |
| `SETUP_SUPABASE.sql` | Query SQL untuk membuat tabel |
| `PANDUAN_SUPABASE.md` | File ini (dokumentasi) |

---

## 🔧 Fungsi-Fungsi yang Tersedia

### **Simpan Data**
```javascript
simpanKriteria()      // Simpan kriteria ke Supabase
simpanAlternatif()    // Simpan alternatif/pilihan ke Supabase
simpanHasilSAW()      // Simpan hasil perhitungan otomatis
```

### **Ambil Data**
```javascript
ambilKriteria()       // Ambil kriteria dari Supabase
ambilAlternatif()     // Ambil alternatif dari Supabase
ambilRiwayatHasil()   // Ambil riwayat hasil perhitungan (10 terakhir)
```

### **Hitung & Simpan**
```javascript
hitungDanSimpan()     // Hitung SAW dan otomatis simpan hasil
```

---

## 📊 Struktur Data di Supabase

### **Tabel: kriteria**
```
id (int)      | nama (text)       | bobot (decimal) | tipe (text)
---|-----------|-----------|------
0  | Nilai Akademik | 30     | benefit
1  | Biaya Kuliah   | 25     | cost
2  | Nilai Beasiswa | 25     | benefit
```

### **Tabel: alternatif**
```
id (int) | nama (text)          | nilai (JSON array)
---|-----------|-----------|------
0  | Univ. Indonesia | [85, 15000000, 20000000, 10, 90]
1  | Univ. Gadjah Mada | [80, 12000000, 18000000, 30, 88]
```

### **Tabel: hasil_saw**
```
id (int) | nama_pengguna | timestamp | kriteria_data (JSON) | hasil_ranking (JSON)
---|-----------|-----------|------
1  | User 1 | 2026-05-28... | {...}  | [...]
2  | User 1 | 2026-05-28... | {...}  | [...]
```

---

## 🎨 Tombol-Tombol Baru di Aplikasi

| Tombol | Fungsi |
|--------|--------|
| 💾 Simpan Kriteria | Simpan data kriteria ke Supabase |
| 📥 Ambil Kriteria | Ambil kriteria yang pernah disimpan |
| 💾 Simpan Pilihan | Simpan alternatif/pilihan ke Supabase |
| 📥 Ambil Pilihan | Ambil alternatif yang pernah disimpan |
| Hitung & Simpan Hasil | Hitung SAW dan otomatis simpan hasil |

---

## ❓ FAQ & Troubleshooting

### **Q: Dapat error "Unauthorized" saat simpan data?**
**A:** Pastikan key sudah benar di `supabase-config.js`. Cek di Project Settings → API → Anon Key.

### **Q: Data tidak muncul saat ambil?**
**A:** 
1. Pastikan tabel sudah dibuat dengan menjalankan SQL di STEP 1
2. Pastikan sudah pernah klik "Simpan" sebelum "Ambil"
3. Buka console browser (F12) untuk lihat error detail

### **Q: Bagaimana kalau data di Supabase mau dihapus semua?**
**A:** Di SQL Editor Supabase, jalankan query:
```sql
DELETE FROM hasil_saw;
DELETE FROM alternatif;
DELETE FROM kriteria;
```

### **Q: Bisa nambah user login?**
**A:** Ya! Supabase punya built-in authentication. Bisa diatur nanti di project settings.

---

## 🚀 Fitur Selanjutnya (Opsional)

1. **Authentication (Login/Register)** - Gunakan Supabase Auth
2. **Real-time Sync** - Update data secara real-time antar pengguna
3. **Export PDF** - Laporan perhitungan dalam format PDF
4. **Dashboard** - Lihat statistik dan riwayat perhitungan
5. **Share Hasil** - Bagikan hasil perhitungan dengan link

---

## 📞 Support

Jika ada error, buka **Browser Console** (F12 → Console tab) dan lihat pesan error detail.

Semua log akan ditampilkan di console dengan format:
- ✅ Berhasil: `✅ Kriteria tersimpan`
- ❌ Error: `❌ Error simpan kriteria: ...`

**Happy coding! 🎉**
