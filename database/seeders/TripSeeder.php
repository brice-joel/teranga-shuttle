<?php

namespace Database\Seeders;

use App\Models\Trip;
use Illuminate\Database\Seeder;

class TripSeeder extends Seeder
{
    public function run(): void
    {
        $trips = [
            [
                'departure_city' => 'Dakar Plateau',
                'arrival_city' => 'Aéroport Blaise Diagne (DSS)',
                'fixed_price' => 25000,
                'estimated_duration_minutes' => 90,
                'is_active' => true
            ],
            [
                'departure_city' => 'Aéroport Blaise Diagne (DSS)',
                'arrival_city' => 'Saly Portudal',
                'fixed_price' => 35000,
                'estimated_duration_minutes' => 60,
                'is_active' => true
            ],
            [
                'departure_city' => 'Dakar Plateau',
                'arrival_city' => 'Saint-Louis',
                'fixed_price' => 90000,
                'estimated_duration_minutes' => 240,
                'is_active' => true
            ],
            [
                'departure_city' => 'Dakar',
                'arrival_city' => 'Lac Rose',
                'fixed_price' => 30000,
                'estimated_duration_minutes' => 75,
                'is_active' => true
            ],
        ];

        foreach ($trips as $trip) {
            Trip::create($trip);
        }
    }
}
