<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
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
            'label' => $this->faker->text(10),
            'description' => $this->faker->text(10),
            'departure' => $this->faker->text(10),
            'destination' => $this->faker->text(10),
            'price' => $this->faker->randomFloat(2),
            'duration' => $this->faker->text(10),
            'type' => $this->faker->text(10),

        ];
    }
}
