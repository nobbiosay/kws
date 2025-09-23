<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // akun operator default
        if(!User::where('operator_id','operator')->exists()){
            User::create([
                'operator_id' => 'operator',
                'name' => 'Operator Default',
                'email' => 'operator@example.com',
                'password' => Hash::make('password'),
            ]);
        }
    }
}
