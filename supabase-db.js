/* =====================================================
   SUPABASE OPERATIONS - Fungsi CRUD untuk database
   ===================================================== */

// ============================================================
// 1. KRITERIA OPERATIONS - CRUD LENGKAP
// ============================================================

// CREATE - Tambah kriteria baru ke Supabase
async function tambahKriteriaBaru(nama, bobot, tipe) {
  if (!nama || !bobot || !tipe) {
    alert('Nama, bobot, dan tipe harus diisi!');
    return false;
  }

  const { data, error } = await db
    .from('kriteria')
    .insert([{
      nama: nama,
      bobot: parseFloat(bobot),
      tipe: tipe
    }])
    .select();

  if (error) {
    console.error('❌ Error tambah kriteria:', error.message);
    alert('❌ Gagal menambah kriteria: ' + error.message);
    return false;
  }

  console.log('✅ Kriteria baru ditambahkan:', data);
  alert('✅ Kriteria berhasil ditambahkan!');
  return true;
}

// READ - Ambil kriteria dari Supabase
async function ambilKriteria() {
  console.log('⏳ Mengambil kriteria dari Supabase...');
  
  const { data, error } = await db
    .from('kriteria')
    .select('id, nama, bobot, tipe')
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Error ambil kriteria:', error.message);
    alert('❌ Gagal mengambil data: ' + error.message);
    return [];
  }

  console.log('✅ Kriteria berhasil diambil dari Supabase:', data);
  
  // Konversi ke format lokal
  kriteria = data.map(k => ({
    nama: k.nama,
    bobot: k.bobot,
    tipe: k.tipe
  }));

  renderKriteria();
  renderAlternatif();
  
  return data;
}

// UPDATE - Edit kriteria
async function editKriteria(id, nama, bobot, tipe) {
  if (!nama || !bobot || !tipe) {
    alert('Semua field harus diisi!');
    return false;
  }

  const { data, error } = await db
    .from('kriteria')
    .update({
      nama: nama,
      bobot: parseFloat(bobot),
      tipe: tipe
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('❌ Error edit kriteria:', error.message);
    alert('❌ Gagal mengedit kriteria: ' + error.message);
    return false;
  }

  console.log('✅ Kriteria diperbarui:', data);
  alert('✅ Kriteria berhasil diperbarui!');
  return true;
}

// DELETE - Hapus kriteria berdasarkan ID
async function hapusKriteriaDariSupabase(id) {
  if (!confirm('Yakin ingin menghapus kriteria ini?')) {
    return false;
  }

  console.log('⏳ Menghapus kriteria ID:', id);
  
  const { error } = await db
    .from('kriteria')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ Error hapus kriteria:', error.message);
    alert('❌ Gagal menghapus: ' + error.message);
    return false;
  }

  console.log('✅ Kriteria ID ' + id + ' berhasil dihapus');
  alert('✅ Kriteria berhasil dihapus!');
  
  // Refresh data
  await ambilKriteria();
  return true;
}

// DELETE ALL - Hapus semua kriteria (dengan konfirmasi)
async function hapusSemuaKriteria() {
  if (!confirm('⚠️ PERHATIAN: Ini akan menghapus SEMUA kriteria dari Supabase!\n\nLanjutkan?')) {
    return false;
  }

  if (!confirm('Yakin untuk menghapus semua? Data tidak bisa dikembalikan!')) {
    return false;
  }

  console.log('⏳ Menghapus semua kriteria...');
  
  const { error } = await db
    .from('kriteria')
    .delete()
    .gte('id', 0);

  if (error) {
    console.error('❌ Error hapus semua kriteria:', error.message);
    alert('❌ Gagal menghapus semua: ' + error.message);
    return false;
  }

  console.log('✅ Semua kriteria berhasil dihapus');
  alert('✅ Semua kriteria berhasil dihapus!');
  
  return true;
}

// SYNC - Simpan kriteria lokal ke Supabase (upsert)
async function simpanKriteria() {
  if (kriteria.length === 0) {
    alert('Tidak ada kriteria untuk disimpan!');
    return false;
  }

  console.log('⏳ Menyimpan kriteria ke Supabase...');

  // Hapus semua dulu, lalu insert ulang
  await db.from('kriteria').delete().gte('id', 0);

  const data = kriteria.map((k, idx) => ({
    id: idx,
    nama: k.nama,
    bobot: k.bobot,
    tipe: k.tipe
  }));

  const { error } = await db
    .from('kriteria')
    .insert(data);

  if (error) {
    console.error('❌ Error simpan kriteria:', error.message);
    alert('❌ Gagal menyimpan: ' + error.message);
    return false;
  }

  console.log('✅ Kriteria berhasil disimpan:', data);
  alert('✅ Semua kriteria berhasil disimpan!');
  return true;
}

// ============================================================
// 2. ALTERNATIF OPERATIONS - CRUD LENGKAP
// ============================================================

// CREATE - Tambah alternatif/pilihan baru
async function tambahAlternatiiBaru(nama, nilai) {
  if (!nama || !nilai || nilai.length === 0) {
    alert('Nama dan nilai harus diisi!');
    return false;
  }

  const { data, error } = await db
    .from('alternatif')
    .insert([{
      nama: nama,
      nilai: JSON.stringify(nilai)
    }])
    .select();

  if (error) {
    console.error('❌ Error tambah alternatif:', error.message);
    alert('❌ Gagal menambah pilihan: ' + error.message);
    return false;
  }

  console.log('✅ Alternatif baru ditambahkan:', data);
  alert('✅ Pilihan berhasil ditambahkan!');
  return true;
}

// READ - Ambil alternatif dari Supabase
async function ambilAlternatif() {
  console.log('⏳ Mengambil alternatif dari Supabase...');
  
  const { data, error } = await db
    .from('alternatif')
    .select('id, nama, nilai')
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Error ambil alternatif:', error.message);
    alert('❌ Gagal mengambil data: ' + error.message);
    return [];
  }

  console.log('✅ Alternatif berhasil diambil dari Supabase:', data);
  
  // Konversi dari JSON string ke array
  alternatif = data.map(a => ({
    nama: a.nama,
    nilai: JSON.parse(a.nilai)
  }));

  renderAlternatif();
  return data;
}

// UPDATE - Edit alternatif
async function editAlternatif(id, nama, nilai) {
  if (!nama || !nilai) {
    alert('Semua field harus diisi!');
    return false;
  }

  const { data, error } = await db
    .from('alternatif')
    .update({
      nama: nama,
      nilai: JSON.stringify(nilai)
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('❌ Error edit alternatif:', error.message);
    alert('❌ Gagal mengedit pilihan: ' + error.message);
    return false;
  }

  console.log('✅ Alternatif diperbarui:', data);
  alert('✅ Pilihan berhasil diperbarui!');
  return true;
}

// DELETE - Hapus alternatif berdasarkan ID
async function hapusAlternatiDariSupabase(id) {
  if (!confirm('Yakin ingin menghapus pilihan ini?')) {
    return false;
  }

  console.log('⏳ Menghapus alternatif ID:', id);
  
  const { error } = await db
    .from('alternatif')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ Error hapus alternatif:', error.message);
    alert('❌ Gagal menghapus: ' + error.message);
    return false;
  }

  console.log('✅ Alternatif ID ' + id + ' berhasil dihapus');
  alert('✅ Pilihan berhasil dihapus!');
  
  // Refresh data
  await ambilAlternatif();
  return true;
}

// DELETE ALL - Hapus semua alternatif
async function hapusSemuaAlternatif() {
  if (!confirm('⚠️ Ini akan menghapus SEMUA pilihan!\n\nLanjutkan?')) {
    return false;
  }

  if (!confirm('Yakin? Data tidak bisa dikembalikan!')) {
    return false;
  }

  console.log('⏳ Menghapus semua alternatif...');
  
  const { error } = await db
    .from('alternatif')
    .delete()
    .gte('id', 0);

  if (error) {
    console.error('❌ Error hapus semua alternatif:', error.message);
    alert('❌ Gagal menghapus semua: ' + error.message);
    return false;
  }

  console.log('✅ Semua alternatif berhasil dihapus');
  alert('✅ Semua pilihan berhasil dihapus!');
  
  return true;
}

// SYNC - Simpan alternatif lokal ke Supabase (reset & insert)
async function simpanAlternatif() {
  if (alternatif.length === 0) {
    alert('Tidak ada pilihan untuk disimpan!');
    return false;
  }

  console.log('⏳ Menyimpan alternatif ke Supabase...');

  // Hapus semua dulu, lalu insert ulang
  await db.from('alternatif').delete().gte('id', 0);

  const data = alternatif.map((a, idx) => ({
    id: idx,
    nama: a.nama,
    nilai: JSON.stringify(a.nilai)
  }));

  const { error } = await db
    .from('alternatif')
    .insert(data);

  if (error) {
    console.error('❌ Error simpan alternatif:', error.message);
    alert('❌ Gagal menyimpan: ' + error.message);
    return false;
  }

  console.log('✅ Alternatif berhasil disimpan:', data);
  alert('✅ Semua pilihan berhasil disimpan!');
  return true;
}

// ============================================================
// 3. HASIL SAW OPERATIONS
// ============================================================

// Simpan hasil perhitungan SAW ke Supabase
async function simpanHasilSAW(skorSorted, bobotNormal) {
  const hasilData = {
    nama_pengguna: 'User ' + new Date().getTime(), // bisa diganti dengan nama user
    timestamp: new Date(),
    kriteria_data: JSON.stringify(kriteria),
    bobot_normal: JSON.stringify(bobotNormal),
    hasil_ranking: JSON.stringify(skorSorted)
  };

  const { data, error } = await db
    .from('hasil_saw')
    .insert([hasilData]);

  if (error) {
    console.error('❌ Error simpan hasil:', error);
    alert('Gagal menyimpan hasil perhitungan!');
  } else {
    console.log('✅ Hasil SAW tersimpan:', data);
    alert('Hasil perhitungan berhasil disimpan!');
  }
}

// Ambil riwayat hasil SAW
async function ambilRiwayatHasil() {
  const { data, error } = await db
    .from('hasil_saw')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(10);

  if (error) {
    console.error('❌ Error ambil riwayat:', error);
    return [];
  }

  console.log('✅ Riwayat hasil:', data);
  return data;
}

// Hapus hasil berdasarkan ID
async function hapusHasil(id) {
  const { error } = await db
    .from('hasil_saw')
    .delete()
    .eq('id', id);

  if (error) console.error('❌ Error hapus hasil:', error);
  else {
    console.log('✅ Hasil dihapus');
    alert('Hasil berhasil dihapus!');
  }
}

// ============================================================
// 4. INTEGRASI DENGAN FUNGSI HITUNG YANG SUDAH ADA
// ============================================================

// Modifikasi fungsi hitung untuk otomatis simpan hasil
async function hitungDanSimpan() {
  // Jalankan hitung seperti biasa
  if (kriteria.length === 0 || alternatif.length === 0) {
    alert('Tambahkan minimal 1 kriteria dan 1 alternatif terlebih dahulu.');
    return;
  }

  bacaNilaiDariInput();

  const totalBobot = kriteria.reduce((s, k) => s + k.bobot, 0) || 1;
  const bobotNormal = kriteria.map(k => k.bobot / totalBobot);

  const matriksNormal = alternatif.map(a => {
    return kriteria.map((k, j) => {
      const kolom = alternatif.map(x => x.nilai[j]);
      const maks  = Math.max(...kolom);
      const min   = Math.min(...kolom);

      if (maks === min) return 1;

      if (k.tipe === 'benefit') {
        return a.nilai[j] / maks;
      } else {
        return a.nilai[j] === 0 ? 0 : min / a.nilai[j];
      }
    });
  });

  const skor = matriksNormal.map((baris, i) => ({
    nama  : alternatif[i].nama,
    skor  : baris.reduce((total, val, j) => total + val * bobotNormal[j], 0),
    baris : baris
  }));

  skor.sort((a, b) => b.skor - a.skor);

  // Tampilkan hasil
  tampilkanHasil(skor);
  tampilkanNormalisasi(skor, bobotNormal);

  // SIMPAN KE SUPABASE
  await simpanHasilSAW(skor, bobotNormal);
}

// ============================================================
// 5. LOAD DATA SAAT HALAMAN DIBUKA
// ============================================================

async function loadDataDariSupabase() {
  console.log('⏳ Memuat data dari Supabase...');
  await ambilKriteria();
  await ambilAlternatif();
  console.log('✅ Semua data dimuat');
}
