<?php

namespace App\Services\Statistics;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class Statistic
{
    public static function getBestTrajet() {}
    public static function getUsersWithMostReservations(int $limit = 5)
    {
        // Récupère les utilisateurs ayant le plus de réservations
        $data = Reservation::join('users', 'users.id', '=', 'reservations.user_id')
            ->select(
                'users.id as user_id', // Préfixez les colonnes pour éviter l'ambiguïté
                'users.name',
                'users.email',
                'users.phone',
                DB::raw('count(*) as total_reservations'),
                DB::raw('sum(price) as total_price')
            )
            ->groupBy('users.id', 'users.name', 'users.email', 'users.phone') // Group By toutes les colonnes non agrégées
            ->orderBy('total_reservations', 'desc')
            ->limit($limit)
            ->get();

        return $data;
    }

    public static function getMostPopularTrajet()
    {
        // Récupère le trajet le plus populaire
        $data = Reservation::join('trajets', 'trajets.id', '=', 'reservations.trajet_id')
            ->select(
                'trajets.id as trajet_id',
                'trajets.start',
                'trajets.destination',
                'trajets.duration',
                'trajets.price',
                DB::raw('count(*) as total_reservations')
            )
            ->groupBy('trajets.id', 'trajets.start', 'trajets.destination', 'trajets.duration', 'trajets.price')
            ->orderBy('total_reservations', 'desc')
            ->limit(1)
            ->first();

        return $data;
    }

    public static function getUsersWithMostExpensiveReservations(int $limit = 5): Collection
    {
        // Récupère les utilisateurs ayant les réservations les plus couteuses
        $data = Reservation::join('users', 'users.id', '=', 'reservations.user_id')
            ->select(
                'users.id as user_id', // Préfixez les colonnes pour éviter l'ambiguïté
                'users.name',
                'users.email',
                'users.phone',
                DB::raw('count(*) as total_reservations'),
                DB::raw('sum(price) as total_price')
            )
            ->groupBy('users.id', 'users.name', 'users.email', 'users.phone') // Group By toutes les colonnes non agrégées
            ->orderBy('total_price', 'desc')
            ->limit($limit)
            ->get();

        return $data;
    }
}
