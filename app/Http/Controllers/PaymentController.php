<?php

namespace App\Http\Controllers;

use App\Jobs\SendReservationEmailJob;
use App\Models\Booking;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        // On récupère les infos de la réservation 
        $data = $request->validate([
            'total_amount' => 'required|numeric',
            'booking_id' => 'required|integer',
            'token' => 'required',
        ]);
        // dd($request->all());

        // Idéalement, récupère le prix depuis ta DB, ne fais jamais confiance au prix envoyé par le client.
        $stripe_secret = config('services.stripe.secret');
        Stripe::setApiKey($stripe_secret);

        $checkout_session = Session::create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'xaf',
                    'product_data' => [
                        'name' => 'Réservation Teranga Shuttle',
                    ],
                    'unit_amount' => $data['total_amount'] * 1, // Stripe attend le montant en centimes
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success') . '?session_id={CHECKOUT_SESSION_ID}'  . '&booking_id=' . $data['booking_id'] . '&total_amount=' . $data['total_amount'],
            'cancel_url' => route('payment.cancel'),
        ]);

        // On redirige vers l'URL fournie par Stripe
        return Inertia::location($checkout_session->url);
    }
    public function success(Request $request,)
    {
        $session_id = $request->query('session_id');
        $booking_id = $request->query('booking_id');
        $total_amount = $request->query('total_amount');

        if (!$session_id or !$booking_id or !$total_amount) {
            throw new \Exception('Missing required parameters: session_id or booking_id, or total_amount');
        }

        // enregistrer le paiement
        Payment::create([
            'booking_id' => $booking_id,
            'stripe_session_id' => $session_id,
            'amount' => $total_amount,
        ]);

        $booking = Booking::with(['trip', 'user', 'payment'])->find($booking_id);
        // mettre a jour le  statut de la reservation
        $booking->update([
            'status' => 'paid',
            'total_amount' => $total_amount,
        ]);
        //charger les donnees pour le mail de confirmation
        $reservationData = [
            'user_email' => $booking->user->email,
            'user_name' => $booking->user->name,
            'user_phone' => $booking->user->phone,
            'booking_id' => $booking->id,
            'booking_pickup_address' => $booking->pickup_address,
            'booking_dropoff_address' => $booking->dropoff_address,
            'booking_type' => $booking->type,
            'booking_start_time' =>  date('d M Y H:i', strtotime($booking->start_time)), // transformer le timestamp en format lisible
            'booking_end_time' => date('d M Y H:i', strtotime($booking->end_time)), // transformer le timestamp en format lisible en francais
            'nombre_personnes' => $booking->adults_count,
            'nombre_bagages' => $booking->luggage_count,
            'booking_duration' => Carbon::parse($booking->start_time)->diffInMinutes(Carbon::parse($booking->end_time)), //difference entre start et end time
            'total_amount' => $booking->total_amount,

        ];
        if ($booking->type == 'course_fixed') {
            $reservationData['booking_type'] = 'Course avec Trajet défini';
        }
        if ($booking->type == 'event_hourly') {
            $reservationData['booking_type'] = 'Location à l\'heure';
        }



        //dd($reservationData);


        // Expédition du Job dans la file d'attente
        SendReservationEmailJob::dispatch($reservationData); //envoyer le mail

        return inertia('Payment/Success');
    }

    public function cancel()
    {
        return redirect(route('booking.index'))->with('error', 'Paiement annulé.');
    }

    public function handleWebhook(Request $request)
    {
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            // Ici, tu mets à jour ta base de données :
            // Reservation::where('stripe_id', $session->id)->update(['status' => 'paid']);
        }

        return back()->with('success', 'Successfully received Stripe webhook');
    }
}
