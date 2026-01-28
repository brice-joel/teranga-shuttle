<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TrajetFormRequest;
use App\Models\Trajet;
use Illuminate\Http\Request;

class TrajetManagementController extends Controller
{
    //
    public function index()
    {
        $trajets = Trajet::all();
        return view('admin.trajet.index', compact('trajets'));
    }
    public function create(Trajet $trajet)
    {
        return view('admin.trajet.create', ['trajet' => $trajet]);
    }
    public function edit(Trajet $trajet)
    {
        return view('admin.trajet.edit', ['trajet' => $trajet]);
    }
    public function store(TrajetFormRequest $request)
    {
        $data = $request->validated();
        Trajet::create($data);

        return to_route('admin.trajet.index')->with('success', 'Le Trajet à été créer avec success');
    }
    public function update(TrajetFormRequest $request, Trajet $trajet)
    {
        $data = $request->validated();
        // Trajet::update($data);
        $trajet->update($data);

        return to_route('admin.trajet.index')->with('success', 'Le Trajet à été modifier avec success');
    }

    public function delete(Trajet $trajet)
    {
        $trajet->delete();
        return to_route('admin.trajet.index')->with('success', 'Le Trajet à été supprimer avec success');
    }
}
