<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ConfirmReservationMail;
use App\Mail\FormContactMail;
use App\Mail\TestMail;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;
use Carbon\CarbonInterval;

class MailController extends Controller
{

    function index(): View
    {
        return view('emails.index');
    }

    function ConfirmReservation(Reservation $reservation)
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
                'rides.duration',


                'name',
                'email',
                'phone'



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

                'name',
                'email',
                'phone'
            );
        }
        $query->join('users', 'reservations.user_id', '=', 'users.id');

        $data_reservation = $query
            ->where('user_id', Auth::user()->id)
            ->where('reservations.id', $reservation->id)
            ->first();

        //dd($data_reservation);

        // Envoyer le mail de confirmation
        Mail::to(Auth::user()->email)->send(new ConfirmReservationMail($data_reservation));
        // Rediriger ou retourner une réponse
        return redirect()->back()->with('success', 'Le formulaire de contact a été envoyé.');
    }

    function FormContact(ContactFormRequest $request)
    {
        //dd($request->validated());
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => Auth::user()->phone,
            'message' => $request->message,
        ];

        /*  Mail::send('emails.form_contact', $data, function ($message) use ($data) {
            $message->to('votre-email@example.com');
            $message->subject('Nouveau Message de Contact');
        });
        */
        // Envoyer le mail de confirmation
        Mail::to('info@terangashuttle.com')->send(new FormContactMail($data));

        // Rediriger ou retourner une réponse
        return redirect()->back()->with('success', 'Le formulaire de contact a été envoyé.');


        // return view('emails.form_contact', compact($data));
    }
    //
    public function store()
    {
        // Valider et créer la réservation
        $data = [
            'name' => 'Joel Brice',
            'email' => 'Hello@gmail.com'
        ];

        // Envoyer le mail de confirmation
        Mail::to(Auth::user()->email)->send(new TestMail($data));

        // Rediriger ou retourner une réponse
        return redirect()->route('index')->with('success', 'Réservation créée et mail envoyé avec succès!');
    }

    function devis()
    {
        return view('emails.devis');
    }
}
