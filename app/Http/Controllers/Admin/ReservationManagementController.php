<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class ReservationManagementController extends Controller
{
    //
    public function index(): View
    {

        $reservations = DB::table('reservations')
            ->join('trajets', 'trajets.id', '=', 'reservations.trajet_id')
            ->join('users', 'users.id', '=', 'reservations.user_id')
            ->select(
                'reservations.id',
                'reservations.start_date',
                'reservations.start_hour',
                'reservations.status',
                'reservations.price',
                'users.name',
                'users.email',
                'users.phone',
                'trajets.start',
                'trajets.destination',
                'trajets.duration',
            )

            ->get()->all();
        //        dd($reservations);


        return view('admin.reservation.index', ['reservations' => $reservations]);
    }
}
