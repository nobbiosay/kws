<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('wtp_entries', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->enum('wtp', ['kerenceng','cidanau']);
            $table->json('flowmeter')->nullable();
            $table->json('chemicals')->nullable();
            $table->json('electricity')->nullable();
            $table->json('quality')->nullable();
            $table->json('durations')->nullable();
            $table->json('pressure')->nullable();
            $table->json('filters')->nullable();
            $table->timestamps();
            $table->unique(['date','wtp']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wtp_entries');
    }
};
