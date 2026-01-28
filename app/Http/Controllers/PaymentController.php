<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PaymentController extends Controller
{
    //
    public function index(): View
    {
        return view('payment.index');
    }



    public function createCheckoutSession(Request $request)
    {
        $id_reservation = $request->input('id_reservation');

        // get the data of reservation
        Stripe::setApiKey(config('services.stripe.secret'));

        $amount = $request->input('amount'); //* 100; // Stripe uses cents

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'xof', // ou la devise de votre choix
                    'unit_amount' => $amount,
                    'product_data' => [
                        'name' => 'Paiement de la réservation No ' . $id_reservation,
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.checkout-success', ['id_reservation' => $id_reservation]),
            'cancel_url' => route('payment.checkout-cancel',  ['id_reservation' => $id_reservation]),
        ]);
        //return $session->url;
        return response()->json(['url' => $session->url]);
        // return redirect()->away($session->url);
    }


    public function success($id_reservation)
    {
        $reservation = Reservation::find($id_reservation);
        $reservation->update(['status' => 'confirmer', 'payment_status' => 'paid']);

        return  redirect()->route('reservation.index', ['reservation' => $reservation])->with('success', 'Paiement réussi !');
    }


    public function cancel($id_reservation)
    {

        $reservation = Reservation::find($id_reservation);
        return  redirect()->route('reservation.index', ['reservation' => $reservation])->with('error', 'Erreur de paiement !');
    }
}


    /*
    public function store(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'card_number' => 'required',
            'expiry_date' => 'required',
            'cvv' => 'required',
            'card_holder' => 'required',
            'country' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Erreur de validation.'], 400);
        }

        // Logique de paiement (à adapter)
        // ...

        return response()->json(['message' => 'Paiement réussi !']);
    }
        */

           /*
    public function checkout(Request $request)
    {
        /*
        $stripePriceId = 'price_1QzcBBQPCrrCqChpokWDieX2';

        $quantity = 10;

        return $request->user()->checkout([$stripePriceId => $quantity], [
            'success_url' => route('payment.checkout-success'),
            'cancel_url' => route('payment.checkout-cancel'),
        ]);
        
    }
        */
