# ⚡ QUICK REFERENCE - Panduan Cepat SPK + Supabase

## 🎯 Yang Saya Buat Untuk Anda

### **✅ CRUD Lengkap untuk Kriteria**
- Tambah kriteria baru
- Edit kriteria (nama, bobot, tipe)
- **Hapus kriteria** (dengan fix untuk Supabase)
- Ambil/simpan dari Supabase

### **✅ CRUD Lengkap untuk Alternatif**
- Tambah pilihan sekolah/beasiswa
- Edit pilihan & isi nilai kriteria
- **Hapus pilihan** (dengan fix)
- Ambil/simpan dari Supabase

### **✅ New Page: Manage Data**
- Interface yang user-friendly untuk CRUD
- Modal form untuk edit data
- Tabel interaktif dengan aksi lengkap
- Sync ke Supabase

---

## ❓ Masalah DELETE yang Anda Alami

### **Penyebab: RLS (Row Level Security) Supabase**

Supabase punya fitur keamanan RLS yang memblokir delete jika tidak dikonfigurasi.

### **✅ Solusi (2 Pilihan):**

#### **Pilihan A: Cara Termudah - Disable RLS**

1. Buka Supabase Dashboard
2. SQL Editor → New Query
3. Copy-paste ini:
```sql
ALTER TABLE kriteria DISABLE ROW LEVEL SECURITY;
ALTER TABLE alternatif DISABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_saw DISABLE ROW LEVEL SECURITY;
```
4. Klik Run
5. ✅ Selesai! Delete sekarang berfungsi

**Kelebihan:** Delete akan langsung berfungsi
**Kekurangan:** Kurang secure (tapi untuk development OK)

---

#### **Pilihan B: Cara Aman - Buat Delete Policy**

1. Buka Supabase SQL Editor
2. Jalankan query ini:
```sql
CREATE POLICY "allow_delete_kriteria" ON kriteria
  FOR DELETE USING (true);

CREATE POLICY "allow_delete_alternatif" ON alternatif
  FOR DELETE USING (true);

CREATE POLICY "allow_delete_hasil_saw" ON hasil_saw
  FOR DELETE USING (true);
```
3. ✅ Delete berfungsi dengan RLS tetap aktif

**Kelebihan:** Tetap aman
**Kekurangan:** Setup sedikit lebih kompleks

---

## 🚀 Cara Pakai CRUD Baru

### **Akses Manage Data Page**
```
http://localhost:5500/manage-data.html
```

### **atau dari index.html**
Klik tombol **⚙️ Manage Data** di header

---

## 📋 Fungsi CRUD

### **Kriteria CRUD**

| Aksi | Caranya |
|------|---------|
| **Tambah** | Form di atas → Isi data → Klik "Tambah" |
| **Edit** | Tabel → Klik "✏️ Edit" → Modal form → "Simpan" |
| **Hapus** | Tabel → Klik "🗑️ Hapus" → Konfirmasi |
| **Simpan ke DB** | Klik "💾 Simpan Semua ke DB" |
| **Ambil dari DB** | Klik "🔄 Refresh dari DB" |

### **Alternatif/Pilihan CRUD**

| Aksi | Caranya |
|------|---------|
| **Tambah** | Form → Isi nama → Klik "Tambah & Isi Nilai" → Modal isi nilai → "Simpan" |
| **Edit** | Tabel → Klik "✏️ Edit" → Edit nama & nilai → "Simpan" |
| **Hapus** | Tabel → Klik "🗑️ Hapus" → Konfirmasi |
| **Simpan ke DB** | Klik "💾 Simpan Semua ke DB" |
| **Ambil dari DB** | Klik "🔄 Refresh dari DB" |

---

## 🔍 Verifikasi Delete Berfungsi

### **Test Delete di Manage Data:**

1. Pergi ke `manage-data.html`
2. Refresh dari DB (ambil data)
3. Klik "🗑️ Hapus" di salah satu kriteria
4. Konfirmasi

### **Lihat di Supabase:**
1. Buka Supabase Dashboard
2. Table Editor
3. Refresh tabel
4. Data harus sudah hilang ✅

### **Debug di Console:**
Tekan F12 → Console, cari:
```
✅ Kriteria ID 0 berhasil dihapus
```

Jika ada error:
```
❌ Error hapus kriteria: [pesan error]
```

---

## 📁 File Baru yang Dibuat

```
✅ manage-data.html      - Page UI untuk manage
✅ manage-data.js        - Logic CRUD page
✅ supabase-config.js    - Config (sudah ada)
✅ supabase-db.js        - DB functions (updated)
✅ TROUBLESHOOTING_CRUD.md - Doc troubleshoot
✅ README.md             - Doc lengkap
```

---

## 🎯 Workflow Recommended

```
1. Setup Supabase (fix RLS)
        ↓
2. Buka manage-data.html
        ↓
3. Tambah kriteria & alternatif
        ↓
4. Klik "Simpan Semua ke DB"
        ↓
5. Buka index.html (halaman SPK utama)
        ↓
6. Klik "Hitung & Simpan Hasil"
        ↓
7. Lihat ranking & hasil
```

---

## ⚠️ Important Notes

### **Jangan Lupa:**
- ✅ Fix RLS di Supabase (lihat di atas)
- ✅ Gunakan `manage-data.html` untuk CRUD yang robust
- ✅ Selalu "Simpan Semua ke DB" setelah edit
- ✅ Jangan langsung edit tabel di index.html kalau mau permanent

### **Perbedaan Local vs Supabase:**
- **Local (index.html):** Data hanya di browser, hilang saat refresh
- **Supabase (manage-data.html):** Data permanent, bisa diakses dari device lain

---

## 🐛 Kalau Masih Ada Error

### **Step Debugging:**

1. **Buka Browser Console:**
   - Tekan F12
   - Tab "Console"
   - Lihat error message

2. **Cek RLS Status:**
   Di Supabase SQL Editor jalankan:
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables WHERE tablename IN ('kriteria', 'alternatif', 'hasil_saw');
   ```
   Kalau `rowsecurity` = `true` → RLS aktif
   Kalau `false` → RLS disabled ✅

3. **Verifikasi Tabel Ada:**
   Di Supabase Table Editor, pastikan ada tabel:
   - ✅ kriteria
   - ✅ alternatif
   - ✅ hasil_saw

4. **Cek API Key:**
   Di `supabase-config.js`:
   ```javascript
   SUPABASE_URL = 'https://vbjhnqlcpjcnbvhhgsoa.supabase.co'
   SUPABASE_ANON_KEY = 'eyJhbGc...'
   ```
   Pastikan cocok dengan credentials Supabase Anda

---

## 🎓 Summary

**Masalah:** Delete tidak berfungsi
**Penyebab:** RLS Supabase
**Solusi:** Disable/configure RLS + gunakan manage-data.html

**Yang didapat:**
- ✅ CRUD lengkap dengan UI yang bagus
- ✅ Manage data tanpa khawatir error
- ✅ Data permanent di Supabase
- ✅ Error handling yang lebih baik

---

## 🚀 Next: Sekarang Tinggal...

1. ✅ Fix RLS di Supabase (langkah di atas)
2. ✅ Test delete di manage-data.html
3. ✅ Gunakan aplikasi SPK!

**Good luck! 🎉**

---

*Untuk detail lengkap, baca:*
- `TROUBLESHOOTING_CRUD.md` - Masalah CRUD
- `PANDUAN_SUPABASE.md` - Panduan Supabase lengkap
- `README.md` - Overview project
