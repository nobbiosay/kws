<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'operator_id' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('operator_id', $data['operator_id'])->first();
        if(!$user || !Hash::check($data['password'], $user->password)){
            return response()->json(['message' => 'ID atau password salah'], 422);
        }
        $token = $user->createToken('api')->plainTextToken;
        return response()->json(['token' => $token]);
    }
}
