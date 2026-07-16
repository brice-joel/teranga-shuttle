<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{

    //
    public  function index()
    {
        $trajets = Trip::orderBy('created_at', 'desc')->get();
        return inertia('Admin/Trip/Index', [
            'trips' => $trajets
        ]);
    }
    public function store(Request $request)
    {

        $request->validate([
            'departure_city' => 'required|string|max:255',
            'arrival_city' => 'required|string|max:255',
            'estimated_duration_minutes' => 'required|integer',
            'fixed_price' => 'required|integer',
            'is_active' => 'nullable|boolean',
        ]);

        Trip::create([
            'departure_city' => $request->departure_city,
            'arrival_city' => $request->arrival_city,
            'estimated_duration_minutes' => $request->estimated_duration_minutes,
            'fixed_price' => $request->fixed_price,
            'is_active' => $request->is_active
        ]);
        return back()->with('success', 'Trajet ajouté !');
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'departure_city' => 'required|string',
            'arrival_city' => 'required|string',
            'estimated_duration_minutes' => 'required|integer',
            'fixed_price' => 'required|integer',
            'is_active' => 'nullable|boolean',
        ]);
        $trip = Trip::findOrFail($id);
        $trip->update([
            'departure_city' => $request->departure_city,
            'arrival_city' => $request->arrival_city,
            'estimated_duration_minutes' => $request->estimated_duration_minutes,
            'fixed_price' => $request->fixed_price,
            'is_active' => $request->is_active,
        ]);
        return back()->with('success', 'Trajet mis à jour !');
    }
    public function destroy(int $id)
    {
        $trip = Trip::findOrFail($id);
        $trip->delete();

        return back()->with('success', 'Trajet supprimé !');
    }
}
