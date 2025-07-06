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
        Schema::create('reservations', function (Blueprint $table) {

            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('trajet_id')->nullable();
            $table->foreign('trajet_id')->references('id')->on('trajets')->onDelete('cascade');
            $table->unsignedBigInteger('ride_id')->nullable();
            $table->foreign('ride_id')->references('id')->on('rides')->onDelete('cascade');

            $table->string('type');
            $table->float('price');
            $table->integer('places');
            $table->string('luggage');
            $table->string('comment')->nullable();
            $table->string('status')->default('en attente');
            $table->date('start_date');
            $table->time('start_hour'); //->default(null);            
            $table->time('end_hour'); //default(DB::raw('CURRENT_DATE')); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
