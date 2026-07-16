<?php

namespace Database\Seeders;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Créer un admin pour toi
        User::factory()->create([
            'name' => 'Admin Teranga',
            'email' => 'admin@terangashuttle.com',
            'phone' => '+221770000000',
            'role' => 'admin',
            'password' => bcrypt('admin'), // Changez ceci pour une meilleure sécurité
        ]);
        User::factory()->create([
            'name' => 'Brice Taketsa',
            'email' => 'joeltaketsa2@gmail.com',
            'phone' => '+221770000000',
            'role' => 'user',
            'password' => bcrypt('password'), // Changez ceci pour une meilleure sécurité
        ]);

        // 2. Créer les règles de prix (essentiel pour les calculs)
        $this->call(PricingRuleSeeder::class);

        // 3. Créer les trajets prédéfinis
        $this->call(TripSeeder::class);

        // 4. Créer les réservations de démonstration
        $this->call(BookingSeeder::class);

        // 5. Créer quelques clients avec des réservations
        User::factory(5)->hasBookings(3)->create();
    }
}
