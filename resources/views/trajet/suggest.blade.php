@extends('template')
@section('title', 'Prix du Trajet')
@section('content')

    <section class="bg-gradient-to-r from-indigo-100 to-purple-100 py-16 min-h-screen">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">

                <div class="mb-10 text-center">
                    <h3 class="text-3xl font-extrabold text-indigo-700 mb-4">
                        <i class="fas fa-route mr-2"></i> Résultat de la Recherche
                    </h3>
                    <p class="text-gray-600">Voici les détails de votre trajet.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="flex items-center">
                        <i class="fas fa-map-marker-alt text-indigo-500 mr-3 text-lg"></i>
                        <p class="text-lg text-gray-800"><strong class="font-semibold">Départ :</strong>
                            {{ $trajet->start }}</p>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-flag-checkered text-purple-500 mr-3 text-lg"></i>
                        <p class="text-lg text-gray-800"><strong class="font-semibold">Destination :</strong>
                            {{ $trajet->destination }}</p>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-money-bill-wave text-green-500 mr-3 text-lg"></i>
                        <p class="text-lg font-bold text-gray-800"><strong class="font-semibold">Prix :</strong>
                            {{ $trajet->price }} XOF</p>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-clock text-yellow-500 mr-3 text-lg"></i>
                        <p class="text-lg text-gray-800"><strong class="font-semibold">Durée Moyenne :</strong>
                            {{ $trajet->duration }} Minutes</p>
                    </div>
                </div>

                <div class="text-center">
                    <a id="reservation"
                        href="{{ route('reservation.form', [
                            'type' => 'trajet',
                            'type_id' => $trajet,
                            'price' => $trajet->price,
                            'start' => $trajet->start,
                            'destination' => $trajet->destination,
                        ]) }}"
                        class="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-300">
                        <i class="fas fa-calendar-check mr-2"></i> Passer à la Réservation
                    </a>
                </div>

            </div>
        </div>
    </section>

@endsection
