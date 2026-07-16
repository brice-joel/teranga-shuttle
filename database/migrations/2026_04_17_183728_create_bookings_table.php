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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('trip_id')->nullable()->constrained()->onDelete('set null'); // Liaison avec le trajet fixe

            $table->enum('type', ['course_fixed', 'event_hourly', 'course_distance']);
            //course_fixed : pour les trajets avec des points de départ et d'arrivée définis (courte distance) ex: aéroport, gare
            //event_hourly : pour les locations à l'heure (ex: mariage, événement)
            //course_distance : pas encore definie dans le systeme 

            $table->enum('status', ['pending', 'validated', 'paid', 'cancelled', 'finished'])->default('pending');
            //pending: réservation en attente de validation par l'admin
            //validated: réservation validée par l'admin, en attente de paiement
            //paid: réservation payée par le client
            //cancelled: réservation annulée (par le client ou l'admin)
            //finished: réservation terminée (après la date de fin) donc clôturée automatiquement

            // Dates & Heures
            $table->dateTime('start_time');
            $table->dateTime('end_time'); // Calculé ou défini par l'utilisateur

            // Adresses
            $table->string('pickup_address');
            $table->string('dropoff_address')->nullable(); // Optionnel si location horaire

            // Passagers et Bagages
            $table->integer('adults_count')->default(1);
            $table->integer('children_count')->default(0);
            $table->integer('luggage_count')->default(0);
            $table->text('notes')->nullable(); // Pour les instructions spéciales

            // Argent
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
