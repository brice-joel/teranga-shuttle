<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Charts\CircularChartService;
use App\Services\Charts\HistogrammeChartService;
use App\Services\ReservationsService;
use App\Services\Statistics\Statistic;
use App\Models\Reservation;
use App\Models\Trajet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class MyController extends Controller
{
    //
    public function dashboard(): View
    {

        $nb_users = User::count(); // get all users
        $nb_reservations = Reservation::count(); // get all reservations
        $total_reservations_price = Reservation::sum('price'); // get total price of all reservations

        // Récupère les 10 utilisateurs ayant le plus de réservations
        $users_with_most_reservations = Statistic::getUsersWithMostReservations(5);
        // Récupere les 5 utilisateurs ayant les réservations les plus couteuses
        $user_with_most_expensive_reservations = Statistic::getUsersWithMostExpensiveReservations(5);
        // Récupère le trajet le plus populaire
        $most_popular_trajet = Statistic::getMostPopularTrajet();

        // données de l'histogramme du prix total des réservations par trajet          
        $total_reservations_price_by_trajet = HistogrammeChartService::getTrajetsAndTotalPriceReservations();
        $circular_chart_datas = CircularChartService::getCircularChartData();
        //dd($data);
        return view('admin.dashboard', [
            'nb_users' => $nb_users,
            'nb_reservations' => $nb_reservations,
            'most_popular_trajet' => $most_popular_trajet,
            'total_reservations_price' => $total_reservations_price,
            'users_with_most_reservations' => $users_with_most_reservations,
            'user_with_most_expensive_reservations' => $user_with_most_expensive_reservations,

            'total_reservations_price_by_trajet' => $total_reservations_price_by_trajet,
            'circular_chart_datas' => $circular_chart_datas
        ]);
    }


    public function users()
    {
        $users = User::all();
        return view('admin.users', compact('users'));
    }
}
