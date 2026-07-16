<?php

namespace Database\Factories;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 month', '+1 month');
        return [
            'user_id' => \App\Models\User::factory(),
            'type' => $this->faker->randomElement(['course_fixed', 'course_distance', 'event_hourly']),
            'status' => $this->faker->randomElement(['pending', 'validated', 'paid', 'cancelled', 'finished']),
            'start_time' => $start,
            'end_time' => Carbon::instance($start)->addHours($this->faker->numberBetween(1, 5)),
            'pickup_address' => $this->faker->address,
            'dropoff_address' => $this->faker->address,
            'adults_count' => $this->faker->numberBetween(1, 6),
            'total_amount' => $this->faker->numberBetween(20000, 150000),
        ];
    }
}
