<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Brice TAKETSA',
            'email' => 'joeltaketsa2@gmail.com',
            'password' => Hash::make('1234'),
            'role' => 'user',
            'phone' => '696031156',
        ]);

        User::factory()->create([
            'name' => 'Samoura Mamba',
            'email' => 'samouramamba@gmail.com',
            'password' => Hash::make('Samoura_teranga6'),
            'role' => 'admin',
            'phone' => '+41763233400',
        ]);

        Vehicle::create([
            'name' => 'Mercedes 22d classe v',
            'plate_number' => 'BZ-1234',
            'capacity' => 8,
            'image_url' => 'images/mercedes.jpg',
        ]);

        //Trajets
        Service::create([
            'label' => 'Trajet de ville',
            'description' => 'Trajet de ville',
            'departure' => "",
            'destination' => 'Aéroport internationa de Dakar-Blaise Diagne(AIBD)',
            'price' => 50000,
            'duration' => 60,
            'type' => 'Trajet'
        ]);
        Service::create([
            'label' => 'Trajet de ville',
            'description' => 'Trajet de ville',
            'departure' => "Dakar",
            'destination' => 'Saly',
            'price' => 60000,
            'duration' => 60,
            'type' => 'Trajet'
        ]);
        Service::create([
            'label' => 'Trajet de ville',
            'description' => 'Trajet de ville',
            'departure' => "",
            'destination' => 'Formule AR',
            'price' => 100000,
            'duration' => 60,
            'type' => 'Trajet'
        ]);
        Service::create([
            'label' => 'Trajet de ville',
            'description' => 'Trajet de ville',
            'departure' => "Dakar",
            'destination' => ' Popenguine (huites de Dayana)',
            'price' => 100000,
            'duration' => 60,
            'type' => 'Trajet'
        ]);
        Service::create([
            'label' => 'Trajet de ville',
            'description' => 'Trajet de ville',
            'departure' => "Dakar",
            'destination' => 'Saint Louis',
            'price' => 250000,
            'duration' => 60,
            'type' => 'Trajet'
        ]);
        Service::create([
            'label' => 'Trajet de ville',
            'description' => 'Trajet de ville',
            'departure' => "Dakar",
            'destination' => 'Sine Saloum',
            'price' => 200000,
            'duration' => 60,
            'type' => 'Trajet'
        ]);

        //Location
        Service::create([
            'label' => 'Location d\une demi-journée',
            'description' => 'Location demi-journée',
            'price' => 50000,
            'duration' => 300,
            'type' => 'Location',
        ]);


        Service::create([
            'label' => 'Location d\'une journée',
            'description' => 'Location d\'une journée',
            'price' => 120000,
            'duration' => 600,
            'type' => 'Location',
        ]);
    }
}
