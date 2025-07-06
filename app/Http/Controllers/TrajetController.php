<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrajetCheckFormRequest;
use App\Models\Trajet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class TrajetController extends Controller
{

    public function index(): View
    {
        $trajets = Trajet::all();
        return view('trajet.index', ['trajets' => $trajets]);
    }

    public function show(Trajet $trajet): View
    {
        return view('trajet.show', ['trajet' => $trajet]);
    }

    public function suggest(Trajet $trajet): View
    {
        return view('trajet.suggest', ['trajet' => $trajet]);
    }

    public function check(TrajetCheckFormRequest $request)
    {

        $data = DB::table('trajets')
            ->where("start", $request->start)
            ->where('destination', $request->destination)
            ->select('*')
            ->get()
            ->all();

        if (empty($data)) {
            // Des résultats ont été trouvés
            return redirect()->back()->with('error', 'Aucun trajet trouvé');
        }

        return redirect()->route('trajet.suggest', ['trajet' => $data[0]->id]);
    }
}
