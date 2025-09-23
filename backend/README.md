# Backend (Laravel Overlay)

Ini adalah *overlay* file untuk Laravel API. Ikuti langkah berikut untuk men-setup dari nol:

1) Buat proyek Laravel baru dan Sanctum
```bash
composer create-project laravel/laravel backend
cd backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

2) Salin file overlay ini ke dalam proyek Laravel yang baru dibuat:
- `app/Http/Controllers/AuthController.php`
- `app/Http/Controllers/WtpEntryController.php`
- `app/Http/Controllers/DashboardController.php`
- `app/Models/WtpEntry.php`
- `database/migrations/YYYY_MM_DD_create_wtp_entries_table.php`
- Tambahkan route ke `routes/api.php` (file sudah disertakan di folder ini)

3) Jalankan server
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

4) Frontend akan mengakses `http://localhost:8000/api`
