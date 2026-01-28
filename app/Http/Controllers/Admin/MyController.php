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
    public function dashboard()
    {
        $reservations = Reservation::all();

        $statisticService = new Statistic();
        $circularChartService = new CircularChartService();
        $histogrammeChartService = new HistogrammeChartService();

        $total_clients = User::count();
        $total_reservations = Reservation::count();

        $total_revenus = $reservations->where('status', 'confirmer')->sum('service.price');

        $data = [
            'total_clients' => $total_clients,
            'total_reservations' => $total_reservations,
            'total_revenus' => $total_revenus
        ];
        $users_with_most_reservations = $statisticService->getUsersWithMostReservations();
        $user_with_most_expensive_reservations = $statisticService->getUsersWithMostExpensiveReservations();
        $most_popular_trajet = $statisticService->getMostPopularTrajet();

        $data_statistics = [
            'users_with_most_reservations' => $users_with_most_reservations,
            'user_with_most_expensive_reservations' => $user_with_most_expensive_reservations,
            'most_popular_trajet' => $most_popular_trajet
        ];
        //circular chart data
        $data_circular_chart = CircularChartService::getCircularChartData();
        $total_reservations_price_by_trajet = $histogrammeChartService->getTrajetsAndTotalPriceReservations();
        //dd($total_reservations_price_by_trajet);

        // dd(['data_total_reservations_price_by_trajet' => $total_reservations_price_by_trajet]);

        return inertia('admin/Dashboard', [
            'data' => $data,
            'data_statistics' => $data_statistics,
            'data_circular_chart' => $data_circular_chart,
            'data_total_reservations_price_by_trajet' => $total_reservations_price_by_trajet
        ]);
    }


    public function users()
    {
        $users = User::all();
        return view('admin.users', compact('users'));
    }
}
