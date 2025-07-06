@extends('template')
@section('title', 'Teranga Shuttle Services - Nos Offres Exclusives')
@section('content')


    <section class="bg-gradient-to-r from-gray-50 to-blue-50 py-16 md:py-20"> {{-- Couleurs de fond plus douces, padding ajusté --}}
        <div class="container mx-auto px-4">
            <h1 class="text-2xl md:text-2xl font-extrabold text-center text-gray-900 mb-10 md:mb-12 leading-tight">
                {{-- Taille de titre principale ajustée, leading-tight pour moins d'espace --}}
                Découvrez Nos <span class="text-blue-600">Services d'Exception</span>
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> {{-- Espacement des cartes ajusté --}}

                {{-- Service 1: Transfert Privé à la Course --}}
                <div
                    class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-xl flex flex-col">
                    {{-- Rounded-2xl, shadow-lg, hover effects améliorés --}}
                    <div class="p-6 md:p-8 flex-grow flex flex-col"> {{-- Padding ajusté, flex-grow pour contenu uniforme --}}
                        <h2 class="text-2xl md:text-2xl font-bold text-indigo-700 mb-3 flex items-center">
                            {{-- Taille de titre de service ajustée --}}
                            <i class="fas fa-car text-indigo-500 mr-3 text-2xl"></i> Transfert Privé VIP
                        </h2>
                        <p class="text-base text-gray-700 mb-4 flex-grow"> {{-- Taille de texte réduite à base, flex-grow pour descriptions uniformes --}}
                            Profitez d'un service de chauffeur privé sur mesure pour tous vos déplacements. Confort,
                            ponctualité et discrétion garantis pour une expérience exclusive.
                        </p>
                        <a href="#"
                            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-base mt-auto">
                            {{-- Taille de texte du lien ajustée, mt-auto pour aligner les liens en bas --}}
                            En savoir plus <i class="fas fa-arrow-right ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>

                {{-- Service 2: Événements Spéciaux --}}
                <div
                    class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-xl flex flex-col">
                    <div class="p-6 md:p-8 flex-grow flex flex-col">
                        <h2 class="text-2xl md:text-2xl font-bold text-indigo-700 mb-3 flex items-center">
                            <i class="fas fa-glass-cheers text-indigo-500 mr-3 text-2xl"></i> Événements Spéciaux
                        </h2>
                        <p class="text-base text-gray-700 mb-4 flex-grow">
                            Conférences, mariages, soirées... Nous assurons le transport de vos invités avec élégance et
                            professionnalisme, pour que chaque détail compte.
                        </p>
                        <a href="#"
                            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-base mt-auto">
                            Organiser mon événement <i class="fas fa-arrow-right ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>

                {{-- Service 3: Excursions et Découvertes --}}
                <div
                    class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-xl flex flex-col">
                    <div class="p-6 md:p-8 flex-grow flex flex-col">
                        <h2 class="text-2xl md:text-2xl font-bold text-indigo-700 mb-3 flex items-center">
                            <i class="fas fa-route text-indigo-500 mr-3 text-2xl"></i> Aventures Sur Mesure
                        </h2>
                        <p class="text-base text-gray-700 mb-4 flex-grow">
                            Partez à la découverte des plus beaux sites avec nos excursions personnalisées. Confort et
                            sécurité pour une expérience mémorable et unique.
                        </p>
                        <a href="#"
                            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-base mt-auto">
                            Planifier mon aventure <i class="fas fa-arrow-right ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>

                {{-- Nouveau Service (Exemple pour montrer l'extensibilité) --}}
                <div
                    class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-xl flex flex-col">
                    <div class="p-6 md:p-8 flex-grow flex flex-col">
                        <h2 class="text-2xl md:text-2xl font-bold text-indigo-700 mb-3 flex items-center">
                            <i class="fas fa-plane-departure text-indigo-500 mr-3 text-2xl"></i> Transferts Aéroports
                        </h2>
                        <p class="text-base text-gray-700 mb-4 flex-grow">
                            Voyagez sereinement vers et depuis les aéroports. Service rapide, fiable et sans stress,
                            disponible 24h/24 et 7j/7.
                        </p>
                        <a href="#"
                            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-base mt-auto">
                            Réserver mon transfert <i class="fas fa-arrow-right ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>



@endsection
