<?php

namespace App\Services\Statistics;

use App\Models\Reservation;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class Statistic
{
    public static function getBestTrajet() {}
    public static function getUsersWithMostReservations(int $limit = 5)
    {
        // Récupère les utilisateurs ayant le plus de réservations (a supprimer)
        $data = Reservation::join('users', 'users.id', '=', 'reservations.user_id')
            ->join('services', 'services.id', '=', 'reservations.service_id')
            ->select(
                'users.id as user_id', // Préfixez les colonnes pour éviter l'ambiguïté
                'users.name',
                'users.email',
                'users.phone',
                DB::raw('count(*) as reservations_count'),
                DB::raw('sum(services.price) as total_price')
            )
            ->groupBy('users.id', 'users.name', 'users.email', 'users.phone') // Group By toutes les colonnes non agrégées
            ->orderBy('reservations_count', 'desc')
            ->where('status', 'confirmer')
            ->limit($limit)
            ->get();

        return $data;
    }

    public static function getMostPopularTrajet()
    {
        $data = Service::query()->join('reservations', 'services.id', '=', 'reservations.service_id')
            ->where('type', 'Trajet') // Filtre pour ne prendre que les services de type 'trajet'
            ->withCount('reservations') // Compte le nombre de réservations pour chaque service
            ->orderByDesc('reservations_count') // Trie par le nombre de réservations (du plus grand au plus petit)
            ->where('reservations.status', 'confirmer')
            ->first(); // Prend le premier résultat (le plus populaire)     
        return $data;
    }

    public static function getUsersWithMostExpensiveReservations(int $limit = 5): Collection
    {
        $data = User::query()
            ->select('users.id', 'users.name', 'users.email') // Sélectionnez les colonnes de l'utilisateur que vous voulez
            ->join('reservations', 'users.id', '=', 'reservations.user_id') // Joignez la table des réservations
            ->join('services', 'reservations.service_id', '=', 'services.id') // Joignez la table des services pour accéder au prix
            ->selectRaw('count(*) as reservations_count, SUM(services.price) as total_spent') // Calculez la somme des prix des services pour chaque groupe
            ->where('reservations.status', 'confirmer')
            ->groupBy('users.id', 'users.name', 'users.email') // Groupe par utilisateur pour sommer leurs dépenses
            ->orderByDesc('total_spent') // Triez par la somme totale dépensée, du plus grand au plus petit
            ->take(5) // Prenez les 5 premiers résultats
            ->get(); // Exécutez la requête et récupérez la collection de résultats

        return $data;
    }
}
