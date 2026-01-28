<?php

namespace App\Services\Charts;

use App\Models\Reservation;
use App\Models\Service;
use App\Models\Trajet;

class HistogrammeChartService
{

    public static function getTrajetsAndTotalPriceReservations()
    {
        // Récupérer tous les trajets depuis la table Trajets.
        $trajets = Service::where('type', 'Trajet')->get();
        $reservations = Reservation::all();

        // Initialiser le tableau qui contiendra les résultats.
        $total_reservations_price_by_trajet = [];

        // Parcourir chaque trajet.
        foreach ($trajets as $trajet) {
            // Calculer la somme totale des réservations pour ce trajet.
            $total_price = $reservations->where('status', 'confirmer')->where('service_id', $trajet->id)->sum('service.price');
            /* $total_price = Reservation::with('service')->where('service_id', $trajet->id)->sum(function ($reservation) {
                return $reservation->service->price; // Somme le prix de chaque service associé
            });
            */

            // Ajouter le trajet et sa somme totale au tableau.
            $total_reservations_price_by_trajet[$trajet->departure . ' - ' . $trajet->destination] = $total_price;
        }
        //dd($total_reservations_price_by_trajet);
        return $total_reservations_price_by_trajet;
    }
}

/* 
public static function getTrajetsAndTotalPriceReservations()
{
    // données de l'histogramme du prix total des réservations par trajet
        //liste total de trajet (depart - destinations)

        $trajets = Reservation::join('trajets', 'trajets.id', '=', 'reservations.trajet_id')
            ->select('trajets.start', 'trajets.destination')
            ->groupBy('trajets.start', 'trajets.destination')
            ->get();

        $total_reservations_price_by_trajet = [];
        foreach ($trajets as $trajet) {
            $total_reservations_price_by_trajet[$trajet->start . ' - ' . $trajet->destination] = Reservation::where('trajet_id', $trajet->id)->sum('price');
        }

        return $total_reservations_price_by_trajet;
    }
*/