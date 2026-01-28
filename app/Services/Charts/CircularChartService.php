<?php

namespace App\Services\Charts;

use App\Services\ReservationsService;
use App\Models\Reservation;
use App\Models\User;

class CircularChartService
{
    public static function getCircularChartData()
    {
        $reservations = Reservation::all();

        $totalClients = User::count();
        $totalReservations = Reservation::count();
        $totalRevenue =  $reservations->where('status', 'confirmer')->sum('service.price');; // Assure-toi que ta table a une colonne 'total_price'

        $confirmedReservationsCount = ReservationsService::getCountReservations(['status' => 'confirmer']);
        $cancelledReservationsCount = ReservationsService::getCountReservations(['status' => 'annuler']);
        $pendingReservationsCount = ReservationsService::getCountReservations(['status' => 'en attente']);

        // Calcul des pourcentages de changement (exemple)
        $clientPercentageChange = 10;
        $reservationPercentageChange = 5;
        $revenuePercentageChange = 20;

        return [
            'totalClients' => $totalClients,
            'totalReservations' => $totalReservations,
            'totalRevenue' => $totalRevenue,
            'confirmedReservationsCount' => $confirmedReservationsCount,
            'cancelledReservationsCount' => $cancelledReservationsCount,
            'pendingReservationsCount' => $pendingReservationsCount,
            'clientPercentageChange' => $clientPercentageChange,
            'reservationPercentageChange' => $reservationPercentageChange,
            'revenuePercentageChange' => $revenuePercentageChange,
        ];
    }
}
