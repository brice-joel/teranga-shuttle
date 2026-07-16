<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\PricingRule;
use Carbon\Carbon;

class BookingService
{
    /**
     * Calcule le prix estimé selon le type de réservation.
     */
    public function calculatePrice(array $data): float
    {
        $basePrice = 0;
        $rules = PricingRule::pluck('value', 'key');

        if ($data['type'] === 'event_hourly') {
            $hours = Carbon::parse($data['start_time'])->diffInHours(Carbon::parse($data['end_time']));
            $basePrice = $hours * ($rules['price_per_hour'] ?? 15000);
        }

        // Ajout des frais par adulte supplémentaire
        $extraAdults = max(0, $data['adults_count'] - 1);
        $extraFees = $extraAdults * ($rules['price_per_adult'] ?? 2000);

        return $basePrice + $extraFees;
    }

    /**
     * Vérifie si le véhicule est disponible sur la plage horaire.
     */
    public function isVehicleAvailable($start, $end): bool
    {
        return !Booking::where(function ($query) use ($start, $end) {
            $query->whereBetween('start_time', [$start, $end])
                ->orWhereBetween('end_time', [$start, $end]);
        })->whereIn('status', ['validated', 'paid'])->exists();
    }
}
