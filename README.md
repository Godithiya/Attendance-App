# Attendance App

Attendance App adalah aplikasi sederhana berbasis web yang digunakan untuk mengelola data kehadiran. Aplikasi ini dibangun menggunakan ReactJS untuk frontend dan Supabase sebagai backend untuk penyimpanan data.
### Fitur:
    1. **Tambah Data**
        -Formulir input untuk menambahkan data kehadiran.
    2. **Hapus Data Individu**
        -Hapus data berdasarkan ID dengan konfirmasi terlebih dahulu.
    3. **Generate Data Acak**
        -Secara otomatis menghasilkan 50 data acak menggunakan library Chance.js.
    4. **Pilih dan Hapus Banyak Data**
        -Pilih beberapa data sekaligus menggunakan checkbox dan hapus secara massal.
    5. **Tabel Data**
        -Tampilkan data dari database Supabase dalam bentuk tabel interaktif.
    6. **Update Data (Placeholder)**
        -Tombol untuk update data disediakan (fungsionalitas dapat ditambahkan).

## Teknologi yang Digunakan
    1. ReactJS: Library frontend untuk membangun antarmuka pengguna.
    2. Supabase: Backend sebagai layanan untuk menyimpan dan mengelola data dengan API.
    3. Chance.js: Library untuk menghasilkan data acak seperti nama, alamat, nomor telepon, dan email.
    4. Tailwind CSS: Framework CSS untuk styling antarmuka pengguna.

## Cara Menjalankan Aplikasi
    1. Clone repository ini:
        ``git clone <repository-url>
        cd attendance-app``
    
    2. Install dependencies:
        ``npm install``

    3. Konfigurasi Supabase:
        Buat project di Supabase dan buat tabel attendances dengan kolom berikut:
            -id (Primary Key)
            -fullname (Text)
            -email (Text)
            -phone (Text)
            -address (Text)
        Salin URL dan Key dari Supabase ke file konektor Supabase (connector.js).

## Catatan
    Anda dapat menyesuaikan fungsi Update untuk mengubah data di Supabase.
    Aplikasi ini menggunakan checkbox untuk memilih beberapa baris data di tabel, memungkinkan penghapusan secara massal.