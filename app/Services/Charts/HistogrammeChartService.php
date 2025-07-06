<?php

namespace App\Services\Charts;

use App\Models\Reservation;
use App\Models\Trajet;

class HistogrammeChartService
{

    public static function getTrajetsAndTotalPriceReservations()
    {
        // Récupérer tous les trajets depuis la table Trajets.
        $trajets = Trajet::all();

        // Initialiser le tableau qui contiendra les résultats.
        $total_reservations_price_by_trajet = [];

        // Parcourir chaque trajet.
        foreach ($trajets as $trajet) {
            // Calculer la somme totale des réservations pour ce trajet.
            $total_price = Reservation::where('trajet_id', $trajet->id)->sum('price');

            // Ajouter le trajet et sa somme totale au tableau.
            $total_reservations_price_by_trajet[$trajet->start . ' - ' . $trajet->destination] = $total_price;
        }

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