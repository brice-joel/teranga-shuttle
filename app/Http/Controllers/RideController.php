<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;

class RideController extends Controller
{
    //
    public function index()
    {
        $rides = Ride::all();
        return view('ride.index', ['rides' => $rides]);
    }

    public function search(Request $request)
    {
        $ride_id = $request->input('ride_id');
        $ride = Ride::find($ride_id);

        if ($ride) {
            session(['price' => $ride->price]);

            // Logique pour récupérer le prix
            return response()->json([
                'price' => $ride->price,
                'label' => $ride->label,
                'ride_id' => $ride->id
            ]);
        }

        return response()->json(['error' => 'Course non trouvée.'], 404);
    }
}
