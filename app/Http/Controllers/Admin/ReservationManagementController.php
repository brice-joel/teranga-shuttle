<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ConfirmReservationMail;
use App\Mail\DeniedReservationMail;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;

class ReservationManagementController extends Controller
{
    //
    public function index()
    {

        $reservations = Reservation::with(['user', 'service'])->latest()->get();
        //dd($reservations);


        return inertia('admin/reservation/Index', ['reservations' => $reservations]);
    }

    public function confirm(Reservation $reservation)
    {
        // Si vous voulez des colonnes spécifiques des relations pour éviter de charger toutes les colonnes,
        // vous pouvez faire ceci :
        $data_reservation = Reservation::with([
            'user' => function ($query) {
                $query->select('id', 'name', 'email'); // Sélectionnez les colonnes de l'utilisateur
            },
            'service' => function ($query) {
                $query->select('*'); // Sélectionnez les colonnes du service
            }
        ])->find($reservation->id);

        // dd($data_reservation);
        // Envoi de l'email de confirmation
        Mail::to($data_reservation->user->email)->send(new ConfirmReservationMail($data_reservation));

        $reservation->update([
            'status' => 'confirmer'
        ]);


        return redirect()->back()->with('success', 'Votre reservation a bien ete confirmer');
    }
    public function destroy(Reservation $reservation)
    {

        $data_reservation = Reservation::with([
            'user' => function ($query) {
                $query->select('id', 'name', 'email'); // Sélectionnez les colonnes de l'utilisateur
            },
            'service' => function ($query) {
                $query->select('*'); // Sélectionnez les colonnes du service
            }
        ])->find($reservation->id);

        //dd($data_reservation);
        // Envoi de l'email de refus
        Mail::to($data_reservation->user->email)->send(new DeniedReservationMail($data_reservation));
        $reservation->update([
            'status' => 'annuler'
        ]);
        return redirect()->back()->with('success', 'Cette réservation a bien été Refuser');
    }
}
