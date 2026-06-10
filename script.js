/* =============================================
   SPK Pemilihan Sekolah & Beasiswa - script.js
   Metode: SAW (Simple Additive Weighting)
   =============================================
   
   ALUR METODE SAW:
   1. Tentukan kriteria & bobot (total bobot = 100%)
   2. Buat matriks keputusan (nilai tiap alternatif per kriteria)
   3. Normalisasi matriks:
      - Benefit: nilai / nilai_maks_kolom
      - Cost:    nilai_min_kolom / nilai
   4. Hitung skor akhir = jumlah (nilai_normalisasi × bobot)
   5. Ranking berdasarkan skor tertinggi
   ============================================= */

// ============================================================
// DATA AWAL (contoh data — bisa diubah langsung di tabel)
// ============================================================

let kriteria = [
  { nama: 'Nilai Akademik',  bobot: 30, tipe: 'benefit' },
  { nama: 'Biaya Kuliah',    bobot: 25, tipe: 'cost'    },
  { nama: 'Nilai Beasiswa',  bobot: 25, tipe: 'benefit' },
  { nama: 'Jarak / Lokasi',  bobot: 10, tipe: 'cost'    },
  { nama: 'Reputasi Kampus', bobot: 10, tipe: 'benefit' }
];

let alternatif = [
  { nama: 'Univ. Indonesia',  nilai: [85, 15000000, 20000000, 10, 90], lokasi: 'Jakarta, Indonesia' },
  { nama: 'Univ. Gadjah Mada',nilai: [80, 12000000, 18000000, 30, 88], lokasi: 'Yogyakarta, Indonesia' },
  { nama: 'Beasiswa LPDP',    nilai: [90,         0, 25000000, 50, 95], lokasi: 'Jakarta, Indonesia' },
  { nama: 'Univ. Brawijaya',  nilai: [75, 10000000, 15000000, 20, 80], lokasi: 'Malang, Indonesia' }
];

let clockIntervalId = null;

const usernameAliases = {
  admin: 'admin@scholarpath.com',
  user: 'user@domain.com'
};

function showLoginError(message, success = false) {
  const el = document.getElementById('loginError');
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
  el.classList.toggle('login-success', success);
}

function clearLoginError() {
  const el = document.getElementById('loginError');
  if (!el) return;
  el.textContent = '';
  el.style.display = 'none';
  el.classList.remove('login-success');
}

// ============================================================
// RENDER TABEL KRITERIA
// ============================================================
function renderKriteria() {
  const tbody = document.getElementById('tbody-kriteria');
  tbody.innerHTML = '';

  kriteria.forEach((k, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="text" value="${k.nama}"
          onchange="kriteria[${i}].nama = this.value; renderAlternatif()"
          style="min-width:160px" />
      </td>
      <td>
        <div class="slider-wrap">
          <input type="range" min="1" max="100" step="1" value="${k.bobot}"
            oninput="kriteria[${i}].bobot = +this.value;
                     this.nextElementSibling.textContent = this.value + '%'" />
          <span class="slider-label">${k.bobot}%</span>
        </div>
      </td>
      <td>
        <button class="tipe-btn ${k.tipe === 'benefit' ? 'aktif-benefit' : ''}"
          onclick="setTipe(${i}, 'benefit')">Benefit</button>
        <button class="tipe-btn ${k.tipe === 'cost' ? 'aktif-cost' : ''}"
          onclick="setTipe(${i}, 'cost')" style="margin-left:4px">Cost</button>
      </td>
      <td class="text-center">
        ${kriteria.length > 1
          ? `<button class="btn-hapus" onclick="hapusKriteria(${i})">Hapus</button>`
          : '—'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ============================================================
// RENDER TABEL ALTERNATIF
// ============================================================
function renderAlternatif() {
  const thead = document.getElementById('thead-alternatif');
  thead.innerHTML = `
    <tr>
      <th style="min-width:140px">Nama Pilihan</th>
      <th style="min-width:180px">Lokasi Sekolah</th>
      <th style="min-width:120px">Peta</th>
      ${kriteria.map(k => `<th style="min-width:100px">${k.nama}</th>`).join('')}
      <th style="width:60px">Hapus</th>
    </tr>
  `;

  const tbody = document.getElementById('tbody-alternatif');
  tbody.innerHTML = '';

  alternatif.forEach((a, i) => {
    const query = a.lokasi?.trim() || a.nama?.trim() || '';
    const mapUrl = query
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
      : '#';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="text" value="${a.nama}"
          oninput="alternatif[${i}].nama = this.value; renderAlternatif()"
          placeholder="Nama kampus / beasiswa"
          style="min-width:130px" />
      </td>
      <td>
        <input type="text" value="${a.lokasi || ''}"
          oninput="alternatif[${i}].lokasi = this.value; renderAlternatif()"
          placeholder="Alamat / kota"
          style="min-width:180px" />
      </td>
      <td>
        ${query
          ? `<a class="btn btn-sm btn-outline-primary" href="${mapUrl}" target="_blank" rel="noopener">📍 Lihat Peta</a>`
          : 'Isi nama kampus atau lokasi'}
      </td>
      ${kriteria.map((k, j) => `
        <td>
          <input type="number" value="${a.nilai[j] ?? 0}"
            onchange="alternatif[${i}].nilai[${j}] = +this.value" />
        </td>
      `).join('')}
      <td class="text-center">
        ${alternatif.length > 1
          ? `<button class="btn-hapus" onclick="hapusAlternatif(${i})">Hapus</button>`
          : '—'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function handleLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const credential = email.toLowerCase();

  clearLoginError();

  if (!email || !password) {
    showLoginError('Email dan kata sandi harus diisi.');
    return;
  }

  let emailAddress = credential;
  if (!credential.includes('@')) {
    emailAddress = usernameAliases[credential] || credential;
  }

  if (!emailAddress.includes('@')) {
    showLoginError('Masukkan email yang valid atau username terdaftar.');
    return;
  }

  const { data, error } = await db.auth.signInWithPassword({
    email: emailAddress,
    password: password
  });

  if (error) {
    console.error('❌ Supabase Auth error:', error.message);
    if (error.message && error.message.toLowerCase().includes('email not confirmed')) {
      showLoginError('Email belum dikonfirmasi. Cek inbox atau folder spam untuk tautan verifikasi.');
    } else {
      showLoginError(error.message || 'Login gagal. Coba lagi.');
    }
    return;
  }

  if (!data?.session) {
    showLoginError('Login gagal. Periksa kembali email dan kata sandi.');
    return;
  }

  emailInput.value = '';
  passwordInput.value = '';
  showApp();
}

function showApp() {
  document.getElementById('loginPage').classList.add('d-none');
  document.getElementById('appContent').classList.remove('d-none');
  clearLoginError();
  clearRegisterError();
  renderKriteria();
  renderAlternatif();
  startClock();
}

function updateClock() {
  const dateEl = document.getElementById('clock-date');
  const timeEl = document.getElementById('clock-time');
  if (!dateEl || !timeEl) return;

  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = `🗓️ ${new Intl.DateTimeFormat('id-ID', options).format(now)}`;
  timeEl.textContent = `⏰ ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}

function startClock() {
  if (clockIntervalId) {
    clearInterval(clockIntervalId);
  }
  updateClock();
  clockIntervalId = setInterval(updateClock, 1000);
}

async function handleLogout() {
  try {
    const { error } = await db.auth.signOut();
    if (error) {
      console.error('❌ Supabase signOut error:', error.message);
    }
  } catch (error) {
    console.error('❌ Logout failed:', error);
  }

  document.getElementById('appContent').classList.add('d-none');
  document.getElementById('loginPage').classList.remove('d-none');
  if (clockIntervalId) {
    clearInterval(clockIntervalId);
    clockIntervalId = null;
  }
  showLoginForm();
  clearLoginError();
  clearRegisterError();
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

function showRegisterForm(event) {
  if (event) event.preventDefault();
  document.getElementById('loginForm').classList.add('d-none');
  document.getElementById('registerForm').classList.remove('d-none');
  clearLoginError();
  clearRegisterError();
}

function showLoginForm(event) {
  if (event) event.preventDefault();
  document.getElementById('registerForm').classList.add('d-none');
  document.getElementById('loginForm').classList.remove('d-none');
  clearLoginError();
  clearRegisterError();
}

function showRegisterError(message) {
  const el = document.getElementById('registerError');
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function clearRegisterError() {
  const el = document.getElementById('registerError');
  if (!el) return;
  el.textContent = '';
  el.style.display = 'none';
}

async function handleRegister(event) {
  event.preventDefault();
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const passwordConfirmInput = document.getElementById('register-password-confirm');
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordConfirm = passwordConfirmInput.value.trim();

  clearRegisterError();

  if (!email || !password || !passwordConfirm) {
    showRegisterError('Semua kolom pendaftaran harus diisi.');
    return;
  }

  if (password !== passwordConfirm) {
    showRegisterError('Kata sandi dan konfirmasi tidak cocok.');
    return;
  }

  if (password.length < 6) {
    showRegisterError('Kata sandi minimal 6 karakter.');
    return;
  }

  const { data, error } = await db.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error('❌ Supabase SignUp error:', error.message);
    showRegisterError(error.message || 'Pendaftaran gagal. Coba lagi.');
    return;
  }

  emailInput.value = '';
  passwordInput.value = '';
  passwordConfirmInput.value = '';

  showLoginForm();
  showLoginError('Pendaftaran berhasil. Silakan masuk menggunakan email Anda.', true);
}

// ============================================================
// TAMBAH & HAPUS KRITERIA
// ============================================================
function tambahKriteria() {
  kriteria.push({ nama: 'Kriteria ' + (kriteria.length + 1), bobot: 10, tipe: 'benefit' });
  // Tambah kolom nilai 0 ke semua alternatif
  alternatif.forEach(a => a.nilai.push(0));
  renderKriteria();
  renderAlternatif();
}

function hapusKriteria(i) {
  kriteria.splice(i, 1);
  alternatif.forEach(a => a.nilai.splice(i, 1));
  renderKriteria();
  renderAlternatif();
}

function setTipe(i, tipe) {
  kriteria[i].tipe = tipe;
  renderKriteria();
}

// ============================================================
// TAMBAH & HAPUS ALTERNATIF
// ============================================================
function tambahAlternatif() {
  alternatif.push({
    nama: '',
    lokasi: '',
    nilai: kriteria.map(() => 0)
  });
  renderAlternatif();
}

function hapusAlternatif(i) {
  alternatif.splice(i, 1);
  renderAlternatif();
}

// ============================================================
// HITUNG SAW
// ============================================================
function hitung() {

  // --- Validasi: pastikan ada data ---
  if (kriteria.length === 0 || alternatif.length === 0) {
    alert('Tambahkan minimal 1 kriteria dan 1 alternatif terlebih dahulu.');
    return;
  }

  // --- Ambil nilai terbaru dari input di tabel ---
  bacaNilaiDariInput();

  // --- Normalisasi bobot (total = 1) ---
  const totalBobot = kriteria.reduce((s, k) => s + k.bobot, 0) || 1;
  const bobotNormal = kriteria.map(k => k.bobot / totalBobot);

  // --- Normalisasi matriks keputusan ---
  // Untuk setiap kolom (kriteria), cari max dan min
  const matriksNormal = alternatif.map(a => {
    return kriteria.map((k, j) => {
      const kolom = alternatif.map(x => x.nilai[j]);
      const maks  = Math.max(...kolom);
      const min   = Math.min(...kolom);

      if (maks === min) return 1; // semua nilai sama → normalisasi = 1

      if (k.tipe === 'benefit') {
        // Benefit: nilai dibagi nilai terbesar
        return a.nilai[j] / maks;
      } else {
        // Cost: nilai terkecil dibagi nilai
        return a.nilai[j] === 0 ? 0 : min / a.nilai[j];
      }
    });
  });

  // --- Hitung skor akhir tiap alternatif ---
  const skor = matriksNormal.map((baris, i) => ({
    nama  : alternatif[i].nama,
    lokasi: alternatif[i].lokasi,
    skor  : baris.reduce((total, val, j) => total + val * bobotNormal[j], 0),
    baris : baris // simpan untuk tabel normalisasi
  }));

  // --- Urutkan dari skor tertinggi ---
  skor.sort((a, b) => b.skor - a.skor);

  // --- Tampilkan hasil ---
  tampilkanHasil(skor);
  tampilkanNormalisasi(skor, bobotNormal);
}

// ============================================================
// BACA NILAI DARI INPUT (sinkronisasi data sebelum hitung)
// ============================================================
function bacaNilaiDariInput() {
  const rows = document.querySelectorAll('#tbody-alternatif tr');
  rows.forEach((tr, i) => {
    if (!alternatif[i]) return;
    const inputs = tr.querySelectorAll('input');
    // inputs[0] = nama, inputs[1] = lokasi, inputs[2..] = nilai kriteria
    alternatif[i].nama = inputs[0].value;
    alternatif[i].lokasi = inputs[1].value;
    kriteria.forEach((_, j) => {
      alternatif[i].nilai[j] = parseFloat(inputs[j + 2]?.value) || 0;
    });
  });
}

// ============================================================
// TAMPILKAN HASIL PERANKINGAN
// ============================================================
function tampilkanHasil(skorSorted) {
  const container = document.getElementById('hasil-container');
  container.innerHTML = '';

  const skorTertinggi = skorSorted[0].skor || 1;

  skorSorted.forEach((item, idx) => {
    const persen   = Math.round((item.skor / skorTertinggi) * 100);
    const skorTeks = (item.skor * 100).toFixed(2); // tampilkan dalam skala 0–100
    const isRank1  = idx === 0;

    const lokasiHtml = item.lokasi
      ? `<div class="hasil-lokasi"><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.lokasi)}" target="_blank" rel="noreferrer">${item.lokasi}</a></div>`
      : '';

    const div = document.createElement('div');
    div.className = `hasil-item ${isRank1 ? 'rank-1' : 'rank-lain'}`;
    div.innerHTML = `
      <div class="rank-circle">${idx + 1}</div>
      <div class="hasil-nama">
        ${item.nama}
        ${isRank1 ? '<span class="label-terbaik">Terbaik</span>' : ''}
        ${lokasiHtml}
      </div>
      <div class="bar-container">
        <div class="bar-isi" style="width: ${persen}%"></div>
      </div>
      <div class="hasil-skor">${skorTeks}</div>
    `;
    container.appendChild(div);
  });

  // Tampilkan section hasil
  document.getElementById('section-hasil').style.display = 'block';
  document.getElementById('section-normalisasi').style.display = 'block';
  document.getElementById('section-hasil').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// TAMPILKAN TABEL NORMALISASI
// ============================================================
function tampilkanNormalisasi(skorSorted, bobotNormal) {
  const tbl = document.getElementById('tbl-normalisasi');
  tbl.innerHTML = '';

  // Header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Alternatif</th>
      ${kriteria.map((k, j) =>
        `<th>${k.nama}<br><small style="font-weight:400;color:#6c757d">(${(bobotNormal[j]*100).toFixed(1)}%)</small></th>`
      ).join('')}
      <th>Skor Akhir</th>
    </tr>
  `;
  tbl.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  // Urutkan sesuai ranking
  skorSorted.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.nama}</strong></td>
      ${item.baris.map(v => `<td>${v.toFixed(3)}</td>`).join('')}
      <td><strong>${(item.skor * 100).toFixed(2)}</strong></td>
    `;
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
}

// ============================================================
// RESET SEMUA DATA KE DEFAULT
// ============================================================
function resetSemua() {
  if (!confirm('Reset semua data ke contoh awal?')) return;

  kriteria = [
    { nama: 'Nilai Akademik',  bobot: 30, tipe: 'benefit' },
    { nama: 'Biaya Kuliah',    bobot: 25, tipe: 'cost'    },
    { nama: 'Nilai Beasiswa',  bobot: 25, tipe: 'benefit' },
    { nama: 'Jarak / Lokasi',  bobot: 10, tipe: 'cost'    },
    { nama: 'Reputasi Kampus', bobot: 10, tipe: 'benefit' }
  ];
  alternatif = [
    { nama: 'Univ. Indonesia',   nilai: [85, 15000000, 20000000, 10, 90], lokasi: 'Jakarta, Indonesia' },
    { nama: 'Univ. Gadjah Mada', nilai: [80, 12000000, 18000000, 30, 88], lokasi: 'Yogyakarta, Indonesia' },
    { nama: 'Beasiswa LPDP',     nilai: [90,         0, 25000000, 50, 95], lokasi: 'Jakarta, Indonesia' },
    { nama: 'Univ. Brawijaya',   nilai: [75, 10000000, 15000000, 20, 80], lokasi: 'Malang, Indonesia' }
  ];

  document.getElementById('section-hasil').style.display = 'none';
  document.getElementById('section-normalisasi').style.display = 'none';
  renderKriteria();
  renderAlternatif();
}

// ============================================================
// CETAK / SIMPAN PDF
// ============================================================
function cetakHasil() {
  window.print();
}

// ============================================================
// INISIALISASI — jalankan saat halaman pertama dibuka
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
      showApp();
      return;
    }
  } catch (error) {
    console.warn('Supabase session check failed:', error);
  }

  renderKriteria();
  renderAlternatif();
});
