@extends('template')
@section('content')
    <section class="bg-gradient-to-r from-gray-100 to-gray-200 py-4">
        <div class="container mx-auto px-4">
            <h1 class="text-2xl font-extrabold text-center text-blue-800 mb-12">
                Nos Trajets Exclusifs
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                @foreach ($trajets as $trajet)
                    <div
                        class="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div class="p-8">
                            <h2 class="text-xl font-semibold text-indigo-700 mb-6">
                                <i class="fas fa-route text-indigo-500 mr-2"></i> {{ $trajet->start }} <i
                                    class="fas fa-arrow-right mx-3 text-gray-500"></i> {{ $trajet->destination }}
                            </h2>
                            <p class="text-sm text-gray-700 mb-4">
                                <i class="fas fa-car text-gray-500 mr-2"></i> Mercedes Classe 220VD
                            </p>
                            <p class="text-lg text-gray-700 mb-6">
                                <i class="fas fa-clock text-gray-500 mr-2"></i> {{ $trajet->duration }}
                                minutes
                            </p>
                            <div class="flex justify-between items-center mb-4">
                                <span
                                    class="text-xl font-bold text-blue-600">{{ number_format($trajet->price, 0, ',', ' ') }}
                                    XOF</span>
                            </div>
                            <a href="{{ route('trajet.show', ['trajet' => $trajet]) }}"
                                class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 rounded-xl transition-colors text-lg">
                                Découvrir le trajet
                            </a>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection

<!--
        <div
                        class="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img src="https://th.bing.com/th/id/OIP.WN0Xxf8fcPDY6LSKbucFFwHaFj?rs=1&pid=ImgDetMain"
                            alt="Voiture de location" class="w-full h-64 object-cover object-center">
                        <div class="p-8">
                            <h2 class="text-3xl font-semibold text-indigo-700 mb-6">
                                <i class="fas fa-route text-indigo-500 mr-2"></i> {{ $trajet->start }} <i
                                    class="fas fa-arrow-right mx-3 text-gray-500"></i> {{ $trajet->destination }}
                            </h2>
                            <p class="text-lg text-gray-700 mb-4">
                                <i class="fas fa-car text-gray-500 mr-2"></i> Mercedes Classe 220VD
                            </p>
                            <p class="text-lg text-gray-700 mb-6">
                                <i class="fas fa-clock text-gray-500 mr-2"></i> {{ $trajet->duration }}
                                minutes
                            </p>
                            <div class="flex justify-between items-center mb-8">
                                <span
                                    class="text-3xl font-bold text-blue-600">{{ number_format($trajet->price, 0, ',', ' ') }}
                                    XOF</span>
                            </div>
                            <a href="{{ route('trajet.show', ['trajet' => $trajet]) }}"
                                class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-lg">
                                Découvrir le trajet
                            </a>
                        </div>
                    </div>
-->
