<?php

namespace App\Http\Controllers;

use App\Http\Requests\DevisFormRequest;
use App\Mail\DevisMail;
use App\Models\Devis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DevisController extends Controller
{
    //
    function index()
    {
        $request = request();
        return view('devis.index', compact('request'));
    }

    function store(DevisFormRequest $request)
    {

        $user = Auth::user();

        //dd($request->validated());
        $devis = Devis::create([
            'user_id' => $user->id,
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

        return redirect()->back()->with('success', 'Votre devis a bien été envoyé. Nous vous contacterons sous peu');
    }
}
