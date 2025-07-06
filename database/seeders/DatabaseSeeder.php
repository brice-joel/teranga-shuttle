<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Ride;
use App\Models\Trajet;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'samouramamba@gmail.com',
            'password' => Hash::make('Admin-teranga.shuttle*41'),
            'role' => 'admin',
            'phone' => '0041763233400',
        ]);

        User::factory()->create([
            'name' => 'Brice TAKETSA',
            'email' => 'joeltaketsa2@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'user',
            'phone' => '77888888',
        ]);
        User::factory(5)->create();

        Trajet::factory()->create([
            'start' => 'AIBD',
            'destination' => 'Dakar',
            'price' => 50000.00,
            'duration' => 60
        ]);
        Trajet::factory()->create([
            'start' => 'Dakar',
            'destination' => 'AIBD',
            'price' => 50000.00,
            'duration' => 60
        ]);
        Trajet::factory()->create([
            'start' => 'AIBD',
            'destination' => 'Saly (Hôtels)',
            'price' => 50000.00,
            'duration' => 60
        ]);
        Trajet::factory()->create([
            'start' => 'Saly (Hôtels)',
            'destination' => 'Dakar',
            'price' => 50000.00,
            'duration' => 60
        ]);



        Ride::factory()->create([
            'label' => 'Location Demie Journée (5h)',
            'price' => 50000.00,
            'duration' => 300
        ]);
        Ride::factory()->create([
            'label' => 'Location Journalière (10h)',
            'price' => 100000.00,
            'duration' => 600
        ]);

        // Reservation::factory(5)->create();
    }
}
