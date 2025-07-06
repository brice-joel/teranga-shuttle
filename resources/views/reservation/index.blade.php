@extends('template')
@section('title', 'reservations')

@section('content')



    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-semibold text-gray-800 mb-2">
                            <i class="fas fa-file-invoice mr-2 text-blue-500"></i> Facture N° {{ $data_reservation->id }}
                        </h2>
                        <p class="text-sm text-gray-600">Date : {{ date('d/m/Y') }}</p>
                    </div>
                    <div class="text-right">
                        <img src="{{ asset('images/logo.png') }}" alt="Logo teranga shuttle"
                            class="w-20 h-20 rounded-full mx-auto">
                    </div>
                </div>

                <div class="mb-10">
                    <h3 class="text-2xl font-semibold mb-6 text-gray-800">
                        <i class="fas fa-user mr-2 text-blue-500"></i> Informations du Client
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p class="text-gray-700"><strong class="font-medium">Nom :</strong> {{ Auth::user()->name }}</p>
                        <p class="text-gray-700"><strong class="font-medium">Email :</strong> {{ Auth::user()->email }}
                        </p>
                        <p class="text-gray-700"><strong class="font-medium">Téléphone :</strong>
                            {{ Auth::user()->phone }}</p>
                    </div>
                </div>

                <div class="mb-10">
                    <h3 class="text-2xl font-semibold mb-6 text-gray-800">
                        <i class="fas fa-info-circle mr-2 text-blue-500"></i> Informations de la Réservation
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p class="text-gray-700">
                            <strong class="font-medium">Type de réservation :</strong> {{ $data_reservation->type }}
                        </p>
                        @if ($data_reservation->type == 'trajet')
                            <p class="text-gray-700"><strong class="font-medium">Départ :</strong>
                                {{ $data_reservation->start }}</p>
                            <p class="text-gray-700"><strong class="font-medium">Destination :</strong>
                                {{ $data_reservation->destination }}</p>
                        @else
                            <p class="text-gray-700"><strong class="font-medium">Course :</strong>
                                {{ $data_reservation->label }}</p>
                        @endif
                        <p class="text-gray-700"><strong class="font-medium">Date de Réservation :</strong>
                            {{ $data_reservation->start_date }}</p>
                        <p class="text-gray-700"><strong class="font-medium">Heure de Réservation :</strong>
                            {{ $data_reservation->start_hour }}</p>
                        <div class="uppercase">
                            <strong class="font-medium">Statut :</strong>
                            @if ($data_reservation->status == 'en attente')
                                <span
                                    class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full">
                                    {{ $data_reservation->status }}
                                </span>
                            @elseif ($data_reservation->status == 'confirmer')
                                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full">
                                    {{ $data_reservation->status }}
                                </span>
                            @elseif ($data_reservation->status == 'annuler')
                                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full">
                                    {{ $data_reservation->status }}
                                </span>
                            @endif
                        </div>
                        <p class="text-gray-700"><strong class="font-medium">Durée moyenne :</strong>
                            {{ $data_reservation->duration }} Minutes</p>
                        <p class="text-gray-700"><strong class="font-medium">Nb Passagers :</strong>
                            {{ $data_reservation->places }}
                        </p>
                        <p class="text-gray-700"><strong class="font-medium">Baggages :</strong>
                            {{ $data_reservation->luggage }}</p>

                        <p class="text-xl font-bold text-gray-800">
                            <strong class="font-medium">Prix :</strong> <span
                                class="underline">{{ $data_reservation->price }} XOF</span>
                        </p>
                    </div>
                </div>

                <div class="text-center mt-8">
                    @if ($data_reservation->status == 'en attente')
                        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
                            <form action="{{ route('payment.create-checkout-session') }}" method="POST">
                                @csrf
                                <input type="hidden" name="amount" value="{{ $data_reservation->price }}" readonly
                                    required>
                                <input type="number" name="id_reservation" value="{{ $data_reservation->id }}" hidden
                                    required>
                                <button
                                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors text-lg flex items-center">
                                    <i class="fas fa-credit-card mr-2"></i> Payer maintenant
                                </button>
                            </form>

                            <form action="{{ route('reservation.cancel', $data_reservation->id) }}" method="POST">
                                @csrf
                                @method('PUT')
                                <button type="submit"
                                    class="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors text-sm flex items-center">
                                    <i class="fas fa-times-circle mr-2"></i> Annuler la réservation
                                </button>
                            </form>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </section>




@endsection
