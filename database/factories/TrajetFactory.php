<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trajet>
 */
class TrajetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'start' => $this->faker->city(),
            'destination' => $this->faker->city(),
            'price' => $this->faker->randomFloat(2, 1, 100),
            'duration' => $this->faker->randomNumber(2),

        ];
    }
}
