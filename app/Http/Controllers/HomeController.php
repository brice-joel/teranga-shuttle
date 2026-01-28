<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Models\Service;
use App\Models\Trajet;

class HomeController extends Controller
{
    //
    function index()
    {
        $trajets = Service::where('type', 'Trajet')->get();
        $locations = Service::where('type', 'Location')->get();

        return inertia('Index', ['trajets' => $trajets, 'locations' => $locations]);
    }


    function contact()
    {
        return inertia('Contact');
    }

    public function tarifs()
    {
        return inertia('Tarifs');
    }

    public function service()
    {
        return inertia('Service');
    }

    function terms()
    {
        return inertia('Terms');
    }

    function doFormContact(ContactFormRequest $request)
    {
        dd($request->validated());
    }
}
