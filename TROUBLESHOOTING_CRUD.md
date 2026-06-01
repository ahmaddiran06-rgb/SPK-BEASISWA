# 🔧 Troubleshooting - Fitur Delete & CRUD

## ❌ Masalah: Data Tidak Bisa Dihapus di Supabase

### 🎯 Solusi Cepat

Jika mengalami error saat hapus data, kemungkinan penyebabnya:

### **1. RLS (Row Level Security) Supabase**

Supabase menerapkan RLS yang membatasi akses. **Ini adalah solusinya:**

#### **Step 1: Disable RLS (Cara Termudah)**

1. Buka Supabase Dashboard
2. Pergi ke **SQL Editor** → **New Query**
3. Jalankan query ini untuk semua tabel:

```sql
ALTER TABLE kriteria DISABLE ROW LEVEL SECURITY;
ALTER TABLE alternatif DISABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_saw DISABLE ROW LEVEL SECURITY;
```

✅ Setelah itu, delete harus berfungsi.

---

#### **Step 2: Jika Ingin Tetap Aktif RLS (Lebih Secure)**

Buat policy yang memungkinkan operasi delete:

```sql
-- Untuk tabel kriteria
CREATE POLICY "allow_delete_kriteria" ON kriteria
  FOR DELETE
  USING (true);

-- Untuk tabel alternatif
CREATE POLICY "allow_delete_alternatif" ON alternatif
  FOR DELETE
  USING (true);

-- Untuk tabel hasil_saw
CREATE POLICY "allow_delete_hasil_saw" ON hasil_saw
  FOR DELETE
  USING (true);
```

---

### **2. Masalah Network / Live Server**

Live Server tidak ada hubungannya dengan Supabase database. Masalahnya biasanya:

✅ **Pastikan:**
- Supabase URL benar di `supabase-config.js`
- Anon Key benar di `supabase-config.js`
- Internet connection aktif
- RLS tidak menghalangi delete

---

### **3. Verifikasi Koneksi Supabase**

Buka **Browser Console** (F12 → Console tab) dan jalankan:

```javascript
// Cek koneksi
console.log(db); // Pastikan ada objek client
console.log(SUPABASE_URL); // Pastikan URL benar

// Test delete
await db.from('kriteria').delete().eq('id', 0);
```

Jika ada error, catat pesan error dan cek bagian Solution dibawah.

---

## 📁 File CRUD Baru yang Dibuat

| File | Fungsi |
|------|--------|
| **manage-data.html** | Page UI untuk manage data |
| **manage-data.js** | Logic CRUD untuk manage data |
| Updated **supabase-db.js** | CRUD functions yang lebih lengkap |

---

## 🎯 Fitur CRUD yang Sekarang Tersedia

### **Kriteria**
- ✅ CREATE (Tambah) - `tambahKriteriaBaru()`
- ✅ READ (Ambil) - `ambilKriteria()`
- ✅ UPDATE (Edit) - `editKriteria()`
- ✅ DELETE (Hapus) - `hapusKriteriaDariSupabase()`
- ✅ DELETE ALL (Hapus Semua) - `hapusSemuaKriteria()`

### **Alternatif/Pilihan**
- ✅ CREATE (Tambah) - `tambahAlternatiiBaru()`
- ✅ READ (Ambil) - `ambilAlternatif()`
- ✅ UPDATE (Edit) - `editAlternatif()`
- ✅ DELETE (Hapus) - `hapusAlternatiDariSupabase()`
- ✅ DELETE ALL (Hapus Semua) - `hapusSemuaAlternatif()`

---

## 🚀 Cara Menggunakan Manage Data Page

### **1. Akses Manage Data**
- Di halaman utama SPK, klik tombol **⚙️ Manage Data** di header
- Atau langsung akses: `http://localhost:5500/manage-data.html`

### **2. Manage Kriteria**

**Tambah Kriteria:**
1. Isi Nama Kriteria
2. Isi Bobot (%)
3. Pilih Tipe (Benefit/Cost)
4. Klik **Tambah**

**Edit Kriteria:**
1. Di tabel kriteria, klik tombol **✏️ Edit**
2. Modal akan terbuka
3. Ubah data dan klik **Simpan**

**Hapus Kriteria:**
1. Di tabel kriteria, klik tombol **🗑️ Hapus**
2. Konfirmasi penghapusan

**Simpan ke Supabase:**
- Klik **💾 Simpan Semua ke DB**
- Data akan tersimpan/ter-update di Supabase

**Ambil dari Supabase:**
- Klik **🔄 Refresh dari DB**
- Data terbaru akan dimuat

---

### **3. Manage Alternatif/Pilihan**

**Tambah Pilihan:**
1. Isi Nama Sekolah/Beasiswa
2. Klik **Tambah & Isi Nilai**
3. Modal akan terbuka dengan form untuk isi nilai tiap kriteria
4. Isi semua nilai dan klik **Simpan**

**Edit Pilihan:**
1. Di tabel alternatif, klik **✏️ Edit**
2. Ubah nama dan/atau nilai
3. Klik **Simpan**

**Hapus Pilihan:**
1. Klik **🗑️ Hapus**
2. Konfirmasi penghapusan

**Simpan ke Supabase:**
- Klik **💾 Simpan Semua ke DB**

---

## 📊 Alur Data

```
Local (HTML/JS)
    ↓
    ├─ Tambah/Edit/Hapus lokal
    ├─ Render di tabel
    ↓
Simpan ke Supabase
    ↓
Supabase Database
    ↓
Ambil kembali (Refresh)
    ↓
Tampil di tabel lokal
```

---

## 🐛 Common Errors & Solutions

### **Error: "Unauthorized"**
```
❌ Error simpan kriteria: Unauthorized
```
**Solusi:**
- Cek API Key di Supabase (Project Settings → API)
- Pastikan key benar di `supabase-config.js`
- Disable RLS (lihat di atas)

---

### **Error: "Relation does not exist"**
```
❌ Error: relation "kriteria" does not exist
```
**Solusi:**
- Buka `SETUP_SUPABASE.sql` di Supabase SQL Editor
- Jalankan semua query untuk membuat tabel

---

### **Error: "Duplicate key"**
```
❌ Error: duplicate key value violates unique constraint
```
**Solusi:**
- Nama kriteria sudah ada sebelumnya
- Gunakan nama yang berbeda, atau hapus yang lama dulu

---

### **Data Tidak Muncul saat Ambil**
**Solusi:**
1. Pastikan sudah klik "Simpan Semua ke DB" sebelumnya
2. Buka Supabase Dashboard → Table Editor
3. Verifikasi data ada di sana
4. Cek browser console (F12) untuk error

---

## 🎯 Best Practices

### **Saat Menggunakan Aplikasi SPK**

1. **Untuk Lokal Editing** (belum sync ke Supabase):
   - Edit kriteria/alternatif di form utama (`index.html`)
   - Jalankan perhitungan
   - Data hanya ada di browser lokal (hilang jika reload)

2. **Untuk Menyimpan Permanen**:
   - Pergi ke **Manage Data** (`manage-data.html`)
   - Edit/tambah/hapus data di sana
   - Klik **Simpan Semua ke DB** untuk sync ke Supabase

3. **Untuk Ambil Data Lama**:
   - Pergi ke **Manage Data**
   - Klik **Refresh dari DB**
   - Data dari Supabase akan dimuat

---

## 📞 Debug Checklist

Jika masih ada masalah, cek ini:

- [ ] RLS sudah di-disable? (Query di atas)
- [ ] Credentials benar di `supabase-config.js`?
- [ ] Tabel sudah dibuat? (Cek di Supabase Table Editor)
- [ ] Browser console tidak ada error? (F12 → Console)
- [ ] Internet connection aktif?
- [ ] Supabase project status "healthy"?

---

**Masih ada error? Buka console (F12) dan bagikan pesan error lengkapnya! 🔍**
