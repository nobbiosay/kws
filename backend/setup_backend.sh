#!/usr/bin/env bash
set -euo pipefail
echo "==> Setting up Laravel backend with overlay files"
if [ ! -d "laravel-app" ]; then
  composer create-project laravel/laravel laravel-app
fi
cd laravel-app
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --force

# CORS config
mkdir -p config
cp -f ../config/cors.php config/cors.php

# Copy overlay files
mkdir -p app/Http/Controllers app/Models database/migrations
cp -f ../app/Http/Controllers/AuthController.php app/Http/Controllers/AuthController.php
cp -f ../app/Http/Controllers/WtpEntryController.php app/Http/Controllers/WtpEntryController.php
cp -f ../app/Http/Controllers/DashboardController.php app/Http/Controllers/DashboardController.php
cp -f ../app/Models/WtpEntry.php app/Models/WtpEntry.php
cp -f ../routes/api.php routes/api.php

STAMP=$(date +%Y_%m_%d_%H%M%S)
cp -f ../database/migrations/create_wtp_entries_table.php "database/migrations/${STAMP}_create_wtp_entries_table.php"
STAMP2=$(date +%Y_%m_%d_%H%M%S)
cp -f ../database/migrations/add_operator_id_to_users_table.php "database/migrations/${STAMP2}_add_operator_id_to_users_table.php"

# Seeder
mkdir -p database/seeders
cp -f ../database/seeders/DatabaseSeeder.php database/seeders/DatabaseSeeder.php

# Patch User fillable (manual note)
echo '=== NOTE === Tambahkan operator_id ke $fillable di app/Models/User.php'

php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000
