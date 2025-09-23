# Backend (Laravel Overlay)

## Fitur
- Sanctum Personal Access Token (Bearer) dengan **operator_id** + password
- Seeder pengguna default: operator_id=`operator`, password=`password`
- Endpoint CRUD entries + dashboard
- CORS terkonfigurasi untuk domain frontend (Vercel) via .env `FRONTEND_URL`

## Setup Cepat
```bash
composer create-project laravel/laravel backend
cd backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
# salin overlay ini ke direktori backend/ Anda (lihat struktur repo)
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000
```

Environment:
- Set `APP_URL` (contoh: http://localhost:8000)
- Set `FRONTEND_URL` (contoh: http://localhost:5173 atau domain vercel Anda)

Deploy backend ke layanan PHP (Railway, Render, DO App Platform, atau Laravel Vapor). Pastikan CORS `FRONTEND_URL` di .env sudah sesuai.
