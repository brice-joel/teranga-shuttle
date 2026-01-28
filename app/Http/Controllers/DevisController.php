<?php

namespace App\Http\Controllers;

use App\Http\Requests\DevisFormRequest;
use App\Mail\DevisMail;
use App\Mail\WelcomeMail;
use App\Models\Devis;
use Illuminate\Support\Facades\Mail;

class DevisController extends Controller
{
    //
    function index()
    {
        $request = request();
        return inertia('devis/Index', ['request' => $request]);
        //return view('devis.index', compact('request'));
    }

    function store(DevisFormRequest $request)
    {
        //dd($request->validated());
        $devis = Devis::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'start' => $request->start,
            'destination' => $request->destination,
            'places' => $request->places,
            'luggages' => $request->luggages,
            'start_date' => $request->start_date,
            'start_hour' => $request->start_hour,
            'subject' => $request->subject
        ]);

        // Envoyer le mail de confirmation
        Mail::to('info@terangashuttle.com')->send(new DevisMail($devis));
        return redirect()->back()->with('success', 'Votre devis a bien été envoyé. Nous vous contacterons dans quelques instants');
    }
}
