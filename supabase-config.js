/* =====================================================
   SUPABASE CONFIG - Konfigurasi koneksi Supabase
   ===================================================== */

const SUPABASE_URL = 'https://vbjhnqlcpjcnbvhhgsoa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiamhucWxjcGpjbmJ2aGhnc29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDgwMjksImV4cCI6MjA5NTEyNDAyOX0.SwnoF60fHAjRrzwOhumjI6ikjC073X4FhQgM9riephk';

// Inisialisasi Supabase client
const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase initialized successfully');
