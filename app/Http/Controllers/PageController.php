<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Booking;
use App\Models\PricingRule;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PageController extends Controller
{
    //


    public function home()
    {
        $bookings = Booking::all();
        //dd($booking);
        return inertia('Home', [
            'trips' => Trip::where('is_active', true)->get(),
            'pricing' => PricingRule::pluck('value', 'key'),
            'bookings' => $bookings
        ]);
    }

    public function services()
    {
        return inertia('Services');
    }

    public function trips()
    {
        return inertia('Trips', [
            'trips' => Trip::where('is_active', true)->get()
        ]);
    }

    public function events()
    {
        return inertia('Events');
    }

    public function contact()
    {
        return inertia('Contact');
    }

    public function contactForm(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required',
        ]);
        // Envoi du mail à l'administrateur
        $contactMail = env('ADMIN_EMAIL');
        Mail::to($contactMail)->send(new ContactMail($validated));

        return back()->with('success', 'Message envoyé. Nous vous contactons sous peu !');
    }
}
