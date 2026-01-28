<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //

    public function show(Service $service)
    {
        return inertia('services/Show', ['service' => $service]);
    }
    public function trajets()
    {
        $trajets = Service::where('type', 'Trajet')->get();
        // dd($trajets);
        return inertia('services/Trajets', ['trajets' => $trajets]);
    }
    public function locations()
    {
        $locations = Service::where('type', 'Location')->get();
        return inertia('services/Locations', ['locations' => $locations]);
    }
}
