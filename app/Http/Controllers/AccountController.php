<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormEditProfileRequest;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    //
    public function account()
    {
        // Return the inertia for the account page
        return inertia('account/Index');
    }

    public function reservation()
    {
        $user = Auth::user();

        $reservations = $user->reservations()->with('service')->latest()->get();


        /*
        $reservations = DB::table('reservations')
            ->join('trajets', 'trajets.id', '=', 'reservations.trajet_id')
            ->select(
                'reservations.id',
                'reservations.start_date',
                'reservations.start_hour',
                'reservations.status',
                'reservations.price',
                'trajets.start',
                'trajets.destination',
                'trajets.duration',
            )
            ->where('user_id', Auth::user()->id)
            ->orderBy('reservations.start_date', 'asc')
            ->orderBy('reservations.start_hour', 'asc')
            ->get()->all();

*/
        //dd($reservations);

        //dd($reservations);
        return inertia('account/Reservation', ['reservations' => $reservations]);
        return inertia('account/reservation', ['reservations' => $reservations]);
    }

    public function edit()
    {
        return inertia('account/Edit');
    }

    public function update(FormEditProfileRequest $request)
    {
        //   dd($request->validated());
        $user = Auth::user();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            //   'phone' => $request->phone,
        ]);

        return redirect()->back()->with('success', 'Profil mis à jour avec succès.');
    }
}
