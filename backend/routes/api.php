<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WtpEntryController;
use App\Http\Controllers\DashboardController;

Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('entries', WtpEntryController::class);
    Route::get('/entries/by-date/{date}/{wtp}', [WtpEntryController::class,'byDate']);
    Route::get('/dashboard/{date}', [DashboardController::class,'show']);
});
