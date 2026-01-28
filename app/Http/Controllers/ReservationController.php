<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormReservationResquest;
use App\Mail\ConfirmReservationMail;
use App\Mail\NewReservationMail;
use App\Models\Reservation;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;
use Carbon\Carbon;

class ReservationController extends Controller
{
    //

    public function index(Reservation $reservation)
    {
        $user = Auth::user();
        //get data of this reservation an join tables services with ELoquent
        $data_reservation = $user->reservations()->with('service')->where('reservations.id', $reservation->id)->first();
        //$data_reservation = $user->reservations()->with('service')->get();
        //dd($data_reservation);
        return inertia('reservation/Index', ['data_reservation' => $data_reservation]);
    }
    /*
    public function index(Reservation $reservation)
    {

        $query = DB::table('reservations');
        $user = Auth::user();

     

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

        return inertia('reservation/Index', ['data_reservation' => $data_reservation]);
    }
*/
    public function form(Service $service)
    {
        $reservations = Reservation::with('service')->get();
        $query = Reservation::with('service');
        $query = $query->where('status', '<>', 'annuler');
        $reservations = $query->get()->map(function ($reservation) {
            $date_start = $reservation->start_date . 'T' . $reservation->start_hour;
            return [
                'id' => $reservation->id,
                'title' => 'Indisponible',
                'start' => $reservation->start_date . 'T' . $reservation->start_hour,
                'end' => $this->getEndTime($date_start, $reservation->service->duration),
                'color' => "pink",
                'display' => "auto",
                'allDay' => false
            ];
        });
        //dd($reservations);

        return inertia(
            'reservation/Form',
            ['service' => $service, 'reservations' => $reservations]
        );
    }

    public function show() //
    {
        //return inertia('reservation/Show', ['reservation' => $reservation]);

        return view(
            'reservation.show',
            [
                'trajet_id' => $trajet_id
            ]
        );
    }


    public function store(FormReservationResquest $request)
    {
        $user = Auth::user();
        $service = Service::find($request->_service_id);

        $reservation = new Reservation;
        $reservation->start_date = $request->start_date;
        $reservation->start_hour = $request->start_hour;
        $reservation->places = $request->places;
        $reservation->luggage = $request->luggage;
        $reservation->comment = $request->comment;
        $reservation->user_id = Auth::user()->id;
        $reservation->service_id = $service->id;
        $reservation->vehicle_id = 1;
        $reservation->save();

        // Récupérer l'utilisateur connecté avec sa dernière réservation et le service associé
        $user = Auth::user()->load(['reservations' => function ($query) use ($reservation) {
            $query->where('id', $reservation->id)->with('service');
        }]);

        // On utilise la dernière réservation qui vient d'être créée pour l'email
        $data_reservation = $user->reservations->first();
        // dd($data_reservation);

        //Mail::to('info@terangashuttle.com')->send(new NewReservationMail($data_reservation));
        return redirect()->route('reservation.send');
        /*return redirect()->route('reservation.index', ['reservation' => $reservation])
            ->with('success', 'Votre reservation a bien été prise enregistréee');
*/
        /*
        $user = Auth::user();
        $service = Service::find($request->_service_id);

        $reservationData = [
            'start_date' => $request->start_date,
            'start_hour' => $request->start_hour,
            'places' => $request->places,
            'luggage' => $request->luggage,
            'comment' => $request->comment,
            'vehicle_id' => 1,
            'service_id' => $service->id,
            'user_id' => $user->id,
        ];

        $reservation = Reservation::create($reservationData);

        dd($datas);

        // Envoyer le mail de confirmation
        Mail::to(Auth::user()->email)->send(new ConfirmReservationMail($reservation));

        return redirect()->route('reservation.index', ['reservation' => $reservation])
            ->with('success', 'Votre reservation a bien été prise enregistréee');
            */
    }

    public function cancel(Reservation $reservation)
    {
        $reservation->update([
            'status' => 'annuler'
        ]);
        // $reservation->save();
        return redirect()->route('reservation.index', ['reservation' => $reservation])->with('success', 'Votre reservation a bien été annuler');
    }

    public function send()
    {
        return inertia('reservation/SuccessSendReservationMail');
    }

    public function getEndTime(string $dateTimeString, int $minutes): string
    {
        // Crée une instance Carbon à partir de la chaîne de date/heure
        // Carbon est très flexible et peut parser de nombreux formats,
        // y compris le format ISO 8601 "YYYY-MM-DDTHH:MM:SS" (similaire à "c" ou "ATOM").
        $date = Carbon::parse($dateTimeString);

        // Ajoute le nombre spécifié de minutes
        $newDate = $date->addMinutes($minutes);

        // Retourne la nouvelle date/heure au format souhaité
        // 'c' est le format ISO 8601 complet (ex: 2004-02-12T15:19:21+00:00)
        // Pour correspondre exactement à "YYYY-MM-DDTHH:MM:SS", nous utiliserons 'Y-m-d\TH:i:s'
        return $newDate->format('Y-m-d\TH:i:s');
    }
}
