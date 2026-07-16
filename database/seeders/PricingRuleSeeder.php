<?php

namespace Database\Seeders;

use App\Models\PricingRule;
use Illuminate\Database\Seeder;

class PricingRuleSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            ['key' => 'price_per_km', 'value' => 800, 'description' => 'Prix au kilomètre pour les courses libres'],
            ['key' => 'price_per_hour', 'value' => 15000, 'description' => 'Prix par heure pour événements'],
            ['key' => 'price_per_adult_extra', 'value' => 2000, 'description' => 'Supplément par adulte au-delà du 1er'],
            ['key' => 'min_event_hours', 'value' => 2, 'description' => 'Minimum d\'heures pour un événement'],
        ];

        foreach ($rules as $rule) {
            PricingRule::create($rule);
        }
    }
}
