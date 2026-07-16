<?php

namespace App\Http\Controllers;

use App\Jobs\SendAdminNewDevisJob;
use App\Jobs\SendClientDevisJob;
use App\Models\Devis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class DevisController extends Controller
{
    //
    public function index(Request $request)
    {
        $queryParams = $request->query();
        //dd($queryParams);
        return inertia('Devis/Index', [
            // On passe les paramètres de l'URL s'ils existent
            'queryParams' => $request->query()
        ]);
    }
    /**
     * Enregistrer le devis en base de données
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'user_name'      => 'required|string|max:255',
            'user_email'     => 'required|email|max:255',
            'pickup_address' => 'required|string|max:255',
            // Requis uniquement si le type n'est pas une location horaire
            'dropoff_address' => 'required_unless:type,event_hourly|nullable|string|max:255',
            'start_time'     => 'required|date|after:now',
            'type'           => 'required|in:course_fixed,event_hourly,course_distance',
            'adults_count'   => 'required|integer|min:1',
            'luggage_count'  => 'required|integer|min:0',
            'notes'          => 'nullable|string',
        ], [
            'start_time.after' => 'La date de départ doit être dans le futur.',
            'dropoff_address.required_unless' => 'La destination est requise pour ce type de trajet.'
        ]);
        // start_time est tous la forme 2026-05-17T07:30:00Z'
        // transformer start_time en timestamp

        //$validated['start_time'] = strtotime($validated['start_time']);

        // Remplacer par ton modèle Devis réel :
        $devis = Devis::create($validated);

        // 2. Déclenchement des Jobs d'envoi asynchrones
        // SendAdminNewDevisJob::dispatch($devis); // Envoi de l'email a l'admin   

        SendClientDevisJob::dispatch($devis)->delay(now()->addSeconds(5));; // Envoi de l'email au client


        return redirect()->route('home')->with('success', 'Votre demande de devis a été envoyée avec succès ! Notre équipe vous répondra rapidement.');
    }
}
