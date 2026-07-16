<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('user_name');
            $table->string('user_email');

            $table->string('pickup_address');
            $table->string('dropoff_address')->nullable();
            $table->dateTime('start_time');

            $table->enum('type', ['course_fixed', 'event_hourly', 'course_distance']);

            $table->integer('adults_count')->default(1);
            $table->integer('luggage_count')->default(0);
            $table->text('notes')->nullable(); // Pour les instructions spéciales


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
