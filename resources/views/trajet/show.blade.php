<?php
use Illuminate\Support\Facades\Auth;
?>

@extends('template')
@section('content')
    <section class="bg-gradient-to-r from-gray-100 to-gray-200 py-20">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-extrabold text-center text-blue-800 mb-12">
                Trajet Exclusif : {{ $trajet->start }} <i class="fas fa-arrow-right mx-3 text-gray-500"></i>
                {{ $trajet->destination }}
            </h1>

            <div class="bg-white rounded-3xl shadow-2xl overflow-hidden md:flex md:items-center">
                <div class="md:w-1/2">
                    <img src="https://th.bing.com/th/id/OIP.WN0Xxf8fcPDY6LSKbucFFwHaFj?rs=1&pid=ImgDetMain"
                        alt="Mercedes Classe 220VD" class="hidden w-full h-80 object-cover object-center">
                </div>
                <div class="p-10 md:w-1/2">
                    <h2 class="text-4xl font-semibold text-indigo-700 mb-8">
                        <i class="fas fa-route text-indigo-500 mr-3"></i> {{ $trajet->start }} <i
                            class="fas fa-arrow-right mx-3 text-gray-500"></i> {{ $trajet->destination }}
                    </h2>

                    <div class="space-y-6 mb-10">
                        <p class="text-lg text-gray-700 flex items-center">
                            <i class="fas fa-clock text-gray-500 mr-3"></i> Durée estimée : {{ $trajet->duration }} minutes
                        </p>
                        <p class="text-lg text-gray-700 flex items-center">
                            <i class="fas fa-money-bill-wave text-gray-500 mr-3"></i> Prix :
                            {{ number_format($trajet->price, 0, ',', ' ') }} XOF
                        </p>
                        <p class="text-lg text-gray-700 flex items-center">
                            <i class="fas fa-car text-gray-500 mr-3"></i> Véhicule : Mercedes Classe 220VD (Luxe et Confort)
                        </p>
                    </div>

                    <div class="flex justify-between items-center mb-10">
                        <span class="text-4xl font-bold text-blue-600">{{ number_format($trajet->price, 0, ',', ' ') }}
                            XOF</span>
                    </div>

                    <a href="{{ route('reservation.form', [
                        'type' => 'trajet',
                        'type_id' => $trajet->id,
                        'price' => $trajet->price,
                        'start' => $trajet->start,
                        'destination' => $trajet->destination,
                        'duration' => $trajet->duration,
                    ]) }}"
                        class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg">
                        Réserver ce trajet
                    </a>
                    <a href="{{ route('devis.index', ['start' => $trajet->start, 'destination' => $trajet->destination]) }}"
                        class="block w-full mt-10 text-center bg-gray-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg">
                        Demander un devis</a>

                </div>
            </div>
        </div>
    </section>
@endsection
