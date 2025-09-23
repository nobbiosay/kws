<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Demo-only: terima id & password apapun -> token acak
    public function login(Request $request)
    {
        $request->validate([
            'operator_id' => 'required|string',
            'password' => 'required|string'
        ]);

        // NOTE: Ganti dengan autentikasi user table di produksi
        $token = Str::random(40);
        return response()->json(['token' => $token]);
    }
}
