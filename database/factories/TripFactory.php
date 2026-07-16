<?php

namespace Database\Factories;

use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cities = ['Dakar Plateau', 'Aéroport DSS', 'Saly', 'Somone', 'Saint-Louis', 'Thiès'];
        return [
            'departure_city' => $this->faker->randomElement($cities),
            'arrival_city' => $this->faker->randomElement($cities),
            'fixed_price' => $this->faker->randomElement([25000, 35000, 45000, 60000]),
            'estimated_duration_minutes' => $this->faker->numberBetween(45, 180),
            'is_active' => true,
        ];
    }
}
