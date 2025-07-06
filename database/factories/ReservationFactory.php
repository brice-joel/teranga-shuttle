<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
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
            'status' => 'en attente',
            'price' => $this->faker->randomNumber(5),
            'start_date' => $this->faker->date(),
            'start_hour' => $this->faker->time(),
            'places' => $this->faker->randomNumber(5),
            'luggage' => $this->faker->boolean(),
            'comment' => $this->faker->text(),
            'user_id' => $this->faker->randomNumber(5),
            'trajet_id' => $this->faker->randomNumber(5),
            'ride_id' => $this->faker->randomNumber(5),
        ];
    }
}
