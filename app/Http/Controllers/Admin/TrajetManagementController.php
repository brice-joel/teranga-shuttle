<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TrajetFormRequest;
use App\Models\Service;
use App\Models\Trajet;
use Illuminate\Http\Request;

class TrajetManagementController extends Controller
{
    //
    public function index()
    {
        $trajets = Service::where('type', 'Trajet')->get();
        return inertia('admin/trajet/Index', ['trajets' => $trajets]);
    }
    public function create(Service $service)
    {
        return inertia('admin/trajet/Create', ['trajet' => $service]);
    }
    public function edit(Service $service)
    {
        return inertia('admin/trajet/Edit', ['trajet' => $service]);
    }
    public function store(TrajetFormRequest $request)
    {
        $data = $request->validated();
        Service::create($data);

        return to_route('admin.trajet.index')->with('success', 'Le Trajet à été créer avec success');
    }
    public function update(TrajetFormRequest $request, Service $service)
    {
        $data = $request->validated();
        // Trajet::update($data);
        $service->update($data);

        return to_route('admin.trajet.index')->with('success', 'Le Trajet à été modifier avec success');
    }

    public function delete(Service $service)
    {
        $service->delete();
        return to_route('admin.trajet.index')->with('success', 'Le Trajet à été supprimer avec success');
    }
}
