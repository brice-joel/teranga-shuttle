<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormReservationResquest;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class ReservationController extends Controller
{
    //


    public function index(Reservation $reservation): View
    {

        $query = DB::table('reservations');

        if ($reservation->type === 'ride') {
            $query->join('rides', 'reservations.ride_id', '=', 'rides.id');
            $query->select(
                'reservations.id',
                'reservations.status',
                'reservations.start_date',
                'reservations.start_hour',
                'reservations.price',
                'reservations.type',
                'reservations.places',
                'reservations.luggage',

                'rides.label',

            );
        } else {
            $query->join('trajets', 'reservations.trajet_id', '=', 'trajets.id');
            $query->select(
                'reservations.id',
                'reservations.status',
                'reservations.start_date',
                'reservations.start_hour',
                'reservations.price',
                'reservations.type',
                'reservations.places',
                'reservations.luggage',

                'trajets.start',
                'trajets.destination',
                'trajets.duration',
            );
        }

        $data_reservation = $query
            ->where('user_id', Auth::user()->id)
            ->where('reservations.id', $reservation->id)
            ->first();



        if (!$data_reservation) {
            abort(404, 'Reservation not found.');
        }

        return view('reservation.index', ['data_reservation' => $data_reservation]);
    }

    public function form(Request $request, $type, $type_id) //($type, $type_id, $duration)
    {

        $duration = $request->input('duration') / 60; //la duree en heure
        $reservations = Reservation::all();
        //dd($reservations);
        return view('reservation.form', ['type' => $type, 'duration' => $duration, 'type_id' => $type_id, 'reservations' => $reservations]);
    }

    public function show($trajet_id): View
    {
        return view(
            'reservation.show',
            [
                'trajet_id' => $trajet_id
            ]
        );
    }


    public function store(FormReservationResquest $request)
    {
        //afficher la liste des reservation de l'utilisateur connecté
        $user = Auth::user();
        $reservationData = [
            'price' => $request->price,
            'type' => $request->type,
            'places' => $request->places,
            'luggage' => $request->luggage,
            'start_date' => $request->start_date,
            'start_hour' => $request->start_hour,
            'end_hour' => $request->end_hour,
            'comment' => $request->comment,

            'user_id' => $user->id,
            ($request->type == 'ride' ? 'ride_id' : 'trajet_id') => $request->type_id

        ];


        $reservation = Reservation::create($reservationData);



        return redirect()->route('reservation.index', ['reservation' => $reservation])
            ->with('success', 'Votre reservation a bien été prise en compte');
    }

    public function cancel(Reservation $reservation)
    {
        $reservation->update([
            'status' => 'annuler'
        ]);
        // $reservation->save();
        return redirect()->route('reservation.index', ['reservation' => $reservation])->with('success', 'Votre reservation a bien été annuler');
    }
}
