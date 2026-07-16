<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $client = User::where('email', '!=', 'admin@teranga.sn')->first()
            ?? User::factory()->create(['name' => 'Client Test', 'email' => 'client@test.com']);

        // 1. Une réservation déjà PAYÉE (Passée)
        Booking::create([
            'user_id' => $client->id,
            'type' => 'course_fixed',
            'status' => 'paid',
            'start_time' => Carbon::now()->subDays(2)->setTime(10, 0),
            'end_time' => Carbon::now()->subDays(2)->setTime(11, 30),
            'pickup_address' => 'Dakar Plateau',
            'dropoff_address' => 'Aéroport DSS',
            'adults_count' => 2,
            'total_amount' => 25000,
        ]);

        // 2. Une réservation VALIDÉE par l'admin (En attente de paiement par le client)
        Booking::create([
            'user_id' => $client->id,
            'type' => 'event_hourly',
            'status' => 'validated',
            'start_time' => Carbon::now()->addDays(1)->setTime(14, 0),
            'end_time' => Carbon::now()->addDays(1)->setTime(18, 0), // 4 heures
            'pickup_address' => 'Saly Portudal',
            'adults_count' => 4,
            'total_amount' => 60000, // 15000 * 4h
        ]);

        // 3. Une demande de réservation EN ATTENTE (Nouvelle demande)
        Booking::create([
            'user_id' => $client->id,
            'type' => 'course_distance',
            'status' => 'pending',
            'start_time' => Carbon::now()->addDays(3)->setTime(9, 0),
            'end_time' => Carbon::now()->addDays(3)->setTime(10, 30),
            'pickup_address' => 'Almadies',
            'dropoff_address' => 'Somone',
            'adults_count' => 1,
            'total_amount' => 45000,
        ]);
    }
}
