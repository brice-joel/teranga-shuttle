@extends('admin.template')
@section('content')
    <section>
        <div class="bg-white shadow-md rounded-lg p-6">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">
                Créer un Trajet

            </h1>
            @include('admin.trajet.form')
        </div>

    </section>
@endsection
