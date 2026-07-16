<?php

namespace App\Http\Controllers;

use App\Mail\NewBookingMail;
use App\Models\Booking;
use App\Models\Trip;
use App\Services\BookingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BookingController extends Controller
{
    //
    public function __construct(protected BookingService $bookingService) {}

    public function index()
    {


        $bookings = Booking::where('user_id', Auth::user()->id)
            ->with('trip') // Charge les détails du trajet fixe si existant
            ->latest()
            ->get();

        return inertia('Booking/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function calculateQuote(Request $request)
    {
        // Logique simplifiée pour l'exemple
        // Dans un cas réel, vous utiliseriez Google Distance Matrix API ici
        $type = $request->type;
        $basePrice = 0;
        $durationMinutes = 0;

        if ($type === 'course') {
            if ($request->trip_id) {
                $trip = Trip::find($request->trip_id);
                $basePrice = $trip->fixed_price;
                $durationMinutes = $trip->estimated_duration_minutes;
            } else {
                // Calcul par distance (Ex: 800 FCFA/km)
                $distance = $request->distance ?? 10; // km
                $basePrice = $distance * 800;
                $durationMinutes = $distance * 2; // Estimation simple
            }
        } else {
            // Événement
            $hours = $request->duration_hours ?? 1;
            $basePrice = $hours * 15000;
            $durationMinutes = $hours * 60;
        }

        // Frais passagers (Ex: 2000 par personne sup)
        $extraPax = max(0, $request->adults - 1) * 2000;

        return response()->json([
            'total_price' => $basePrice + $extraPax,
            'duration_minutes' => $durationMinutes,
            'end_time' => Carbon::parse($request->start_time)->addMinutes($durationMinutes)->toIso8601String(),
        ]);
    }


    /**
     * Détails pour un trajet prédéfini (Transfert)
     */
    public function showTripDetails(Request $request)
    {
        // On récupère le trajet sélectionné via l'ID
        $trip = Trip::findOrFail($request->trip_id);
        $trips = Trip::all();
        $bookings = Booking::all();
        //dd($booking);
        return Inertia::render('Booking/TripDetails', [
            'trip' => $trip,
            'bookingData' => [
                'start_time' => $request->start_time ?? "",
                'adults'     => (int) $request->adults ?? 1,
                'luggage'    => (int) $request->luggage ?? 0,
                'type' => $request->type,
            ],
            'trips' => $trips,
            'bookings' => $bookings
        ]);
    }

    /**
     * Détails pour une mise à disposition (Événement)
     */
    public function showEventDetails(Request $request)
    {
        $bookings = Booking::all();
        return Inertia::render('Booking/EventDetails', [
            'bookingData' => [
                'pickup_address' => $request->pickup_address,
                'start_time'     => $request->start_time,
                'duration_hours' => (int) $request->duration_hours ?? 2,
                'adults'         => (int) $request->adults ?? 1,
                'luggage'        => (int) $request->luggage ?? 0,
            ],
            'pricing' => [
                'hourly_rate' => 15000, // Tarif par heure (modifiable en admin plus tard)
            ],
            'bookings' => $bookings
        ]);
    }

    public function store(Request $request)
    {
        //dd($request->all());
        $validated = $request->validate([
            'trip_id' => 'nullable|exists:trips,id',
            'type' => 'required|in:course_fixed,event_hourly',
            'start_time' => 'required|date|after:now',
            'adults_count' => 'required|integer|min:1',
            'luggage_count' => 'integer|min:0',
            'notes' => 'nullable|string',
            'pickup_address' => 'required_if:type,event_hourly|string',
            // 'duration_hours' => 'required_if:type,event_hourly|integer',
        ]);
        // dd($request->all());
        $startTime = Carbon::parse($request->start_time);
        $totalAmount = 0;
        $endTime = null;
        $pickup = "";
        $dropoff = "";


        if ($request->type === 'course_fixed') {
            $trip = Trip::find($request->trip_id);
            $totalAmount = $trip->fixed_price;
            $endTime = $startTime->copy()->addMinutes($trip->estimated_duration_minutes);
            $pickup = $trip->departure_city;
            $dropoff = $trip->arrival_city;
        } else {
            // Logique pour événement (Mise à disposition)
            $hourlyRate = 15000; // À récupérer depuis PricingRule plus tard
            $totalAmount = $request->duration_hours * $hourlyRate;
            $endTime = $startTime->copy()->addHours($request->duration_hours);
            $pickup = $request->pickup_address;
        }
        //       dd($request->all());
        $booking = Booking::create([
            'user_id' => Auth::user()->id, // On assume que l'user est connecté
            'trip_id' => $request->trip_id,
            'type' => $request->type,
            'status' => 'pending',
            'start_time' => $startTime,
            'end_time' => $endTime,
            'pickup_address' => $pickup,
            'dropoff_address' => $dropoff,
            'adults_count' => $request->adults_count,
            'luggage_count' => $request->luggage_count,
            'total_amount' => $totalAmount,
            'notes' => $request->notes,
        ]);

        // ENVOI DU MAIL AU CHAUFFEUR        
        Mail::to(env('ADMIN_EMAIL'))->send(new NewBookingMail($booking));

        // REDIRECTION VERS LA PAGE DE CONFIRMATION
        return redirect()->route('booking.confirmation', ['booking' => $booking->id]);

        // Redirection vers la page de paiement ou de confirmation
        //return redirect()->route('payment.checkout', ['booking' => $booking->id]);

        //  return back()->with('success', 'La réservation à été passé avec success. Vous etes en attente de validation. Nous vous contacterons dans quelques instants');
    }

    public function update(Request $request, int $id)
    {
        $booking = Booking::findOrFail($id);
        $status = $request->input('status');

        // Vérification que l'utilisateur est propriétaire de la réservation
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($status, ['cancelled'])) {
            return back()->with('error', 'Statut de réservation invalide.');
        }

        $booking->status = $status;
        $booking->save();

        return back()->with('success', 'Statut de réservation mis à jour avec succès.');
    }

    public function showConfirmation(Booking $booking)
    {
        return inertia('Booking/Confirmation', [
            'booking' => $booking->load('trip')
        ]);
    }
}
