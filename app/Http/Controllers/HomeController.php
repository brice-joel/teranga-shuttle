<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Models\Ride;
use App\Models\Trajet;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    //
    function index(): View
    {
        $trajets = Trajet::all();
        $rides = Ride::all();

        $starts = Trajet::distinct()->orderBy('start')->pluck('start');
        $destinations = Trajet::distinct()->orderBy('destination')->pluck('destination');

        return view(
            'index',
            [
                'trajets' => $trajets,
                'rides' => $rides,
                'starts' => $starts,
                'destinations' => $destinations
            ]
        );
    }

    function contact()
    {
        return view('contact');
    }

    function service()
    {
        return view('service');
    }

    function terms()
    {
        return view('terms');
    }

    function doFormContact(ContactFormRequest $request)
    {
        dd($request->validated());
    }
}
