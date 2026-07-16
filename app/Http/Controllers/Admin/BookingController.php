<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\Admin\BookingCancelledMail;
use App\Mail\Admin\BookingValidatedMail;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    //
    public function index()
    {
        Booking::closeExpiredBookings(); // Ferme les réservations expirées avant de les afficher               

        $bookings = Booking::with('user')->orderBy('start_time', 'desc')->orderBy('updated_at', 'desc')->get();

        return inertia('Admin/Bookings/Index', compact('bookings'));
    }
    public function update(Request $request, int  $id)
    {
        $status = $request->input('status');
        if (!in_array($status, ['validated', 'cancelled'])) {
            return back()->with('error', 'Statut de réservation invalide.');
        }

        $booking = Booking::with('user')->findOrFail($id);
        $booking->status = $request->input('status');
        $booking->save();



        // on envoie un email de confirmation au client
        if ($status === 'validated') {
            Mail::to($booking->user->email)->send(new BookingValidatedMail($booking));
        } elseif ($status === 'cancelled') {
            Mail::to($booking->user->email)->send(new BookingCancelledMail($booking));
        }


        return back()->with('success', 'Statut de réservation mis à jour avec succès.');
    }
}
