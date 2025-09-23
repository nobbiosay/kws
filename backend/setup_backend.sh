#!/usr/bin/env bash
set -euo pipefail
echo "==> Setting up Laravel backend with overlay files"
if [ ! -d "laravel-app" ]; then
  composer create-project laravel/laravel laravel-app
fi
cd laravel-app
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --force

# Copy overlay files relative to this script's location
SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
cp -f "$SRC_DIR/app/Http/Controllers/AuthController.php" app/Http/Controllers/AuthController.php
cp -f "$SRC_DIR/app/Http/Controllers/WtpEntryController.php" app/Http/Controllers/WtpEntryController.php
cp -f "$SRC_DIR/app/Http/Controllers/DashboardController.php" app/Http/Controllers/DashboardController.php
mkdir -p app/Models
cp -f "$SRC_DIR/app/Models/WtpEntry.php" app/Models/WtpEntry.php
cp -f "$SRC_DIR/routes/api.php" routes/api.php
STAMP=$(date +%Y_%m_%d_%H%M%S)
cp -f "$SRC_DIR/database/migrations/create_wtp_entries_table.php" "database/migrations/${STAMP}_create_wtp_entries_table.php"

php artisan migrate
php artisan serve --host=0.0.0.0 --port=8000
