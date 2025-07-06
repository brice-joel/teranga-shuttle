@extends('template')
@section('title', 'Teranga Shuttle Services - Dfemande d\'un dévis')
@section('content')

    <div class="container mx-auto p-4 sm:p-6 lg:p-8">
        <div class="bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">

            <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                <i class="fas fa-car-alt text-blue-600 mr-3"></i> Demande de Devis pour Votre Trajet
            </h1>
            <p class="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                Besoin d'un chauffeur pour votre prochain déplacement ? Remplissez ce formulaire et obtenez un devis
                personnalisé rapidement.
            </p>

            <form action="{{ route('devis.store') }}" method="POST">
                @csrf

                <div class="mb-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-id-card text-blue-600 mr-3"></i> Vos Coordonnées
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nom
                                Complet</label>
                            <input type="text" id="name" name="name" disabled
                                value="{{ old('name', Auth::user()->name ?? '') }}"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 @error('nom_complet') border-red-500 @enderror"
                                placeholder="Votre Nom Complet" required>
                            @error('name')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Adresse
                                E-mail</label>
                            <input disabled type="email" id="email" name="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 @error('email') border-red-500 @enderror"
                                placeholder="votre.email@example.com" value="{{ old('email', Auth::user()->email) }}"
                                required>
                            @error('email')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Numéro de
                                Téléphone</label>
                            <input type="tel" id="phone" name="phone" disabled
                                value="{{ old('phone', Auth::user()->phone) }}"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 @error('telephone') border-red-500 @enderror"
                                placeholder="+221 XX XX XX XX">
                            @error('phone')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>

                <div class="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-route text-green-600 mr-3"></i> Détails de Votre Trajet
                    </h2>

                    <div class="mb-6">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Détails du Trajet</label>
                        <!-- start and destination input -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="start" class="block mb-2 text-sm font-medium text-gray-900">Départ</label>
                                <input type="text" id="start" name="start"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=" départ" value="{{ old('start', $request->start ?? '') }}">
                                @error('start')
                                    <span class="text-red-500 text-xs italic mt-1">{{ $message }}</span>
                                @enderror
                            </div>
                            <div>
                                <label for="destination" class="block mb-2 text-sm font-medium text-gray-900">Destination
                                </label>
                                <input type="text" id="destination" name="destination"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=" destination"
                                    value="{{ old('destination', $request->destination ?? '') }}">
                                @error('destination')
                                    <span class="text-red-500 text-xs italic mt-1">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="start_date" class="block mb-2 text-sm font-medium text-gray-900">Date du
                                    Trajet</label>
                                <div class="relative max-w-sm">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input type="date" id="start_date" name="start_date" value="{{ old('start_date') }}"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 @error('start_date') border-red-500 @enderror"
                                        placeholder="Sélectionnez la date" required>
                                </div>
                                @error('start_date')
                                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                            <div>
                                <label for="start_hour" class="block mb-2 text-sm font-medium text-gray-900">Heure de
                                    Prise en Charge Souhaitée</label>
                                <input type="time" id="start_hour" value="{{ old('start_hour') }}" name="start_hour"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 @error('start_hour') border-red-500 @enderror"
                                    required>
                                @error('start_hour')
                                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>




                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="places" class="block mb-2 text-sm font-medium text-gray-900">Nombre
                                    de
                                    Passagers</label>
                                <input type="number" id="places" name="places" min="1" max="15"
                                    value="1"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 @error('nombre_passagers') border-red-500 @enderror"
                                    required>
                                @error('places')
                                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                            <div>
                                <label for="luggages" class="block mb-2 text-sm font-medium text-gray-900">Nombre de
                                    Bagages (grandes valises)</label>
                                <input type="number" id="luggages" name="luggages" min="0" max="20"
                                    value="0"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 @error('nombre_bagages') border-red-500 @enderror">
                                @error('luggages')
                                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div>
                            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900">Informations
                                Complémentaires ou
                                Requêtes
                                Spéciales</label>
                            <textarea id="subject" name="subject" rows="4" placeholder="{{ old('subject') }}"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 @error('subject') border-red-500 @enderror"></textarea>
                            @error('subject')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <div class="text-center mt-8">
                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-3 text-center transition duration-300 ease-in-out transform hover:scale-105">
                            <i class="fas fa-paper-plane mr-2"></i> Demander mon Devis
                        </button>
                    </div>
            </form>

            <p class="text-center text-gray-500 text-sm mt-8">
                En soumettant ce formulaire, vous recevrez un devis détaillé par e-mail dans les plus brefs délais.
            </p>

        </div>
    </div>

@endsection
