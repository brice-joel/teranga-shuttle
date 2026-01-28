@extends('template')
@section('title', 'accueil-teranga-shuttle')

@section('content')
    <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
            <div id="default-carousel" class="relative w-full" data-carousel="slide">
                <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <div
                            class="absolute block w-full flex flex-col md:flex-row items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-4">
                            <div class="w-full md:w-1/2 p-0 text-center md:text-left">
                                <h3 class="text-sm font-semibold text-gray-800 mb-4">Voyagez avec Confort et Fiabilité</h3>
                                <p class="text-gray-600">Profitez de trajets agréables avec nos chauffeurs professionnels et
                                    nos véhicules confortables.
                                </p>
                            </div>
                            <div class="w-full md:w-1/2">
                                <img src="{{ asset('assets/images/mercedez-rouge.png') }}" alt="Confort et Fiabilité"
                                    class="w-3/5 mx-auto rounded-lg">
                            </div>
                        </div>
                    </div>

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <div
                            class="absolute block w-full flex flex-col md:flex-row items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-4">
                            <div class="w-full md:w-1/2 text-center md:text-left">
                                <h3 class="text-sm font-semibold text-gray-800 mb-4">Réservation Facile et Rapide</h3>
                                <p class="text-gray-600">
                                    Choisissez votre destination, l'heure et le type de véhicule, et c'est parti !
                                </p>
                            </div>
                            <div class="w-full md:w-1/2">
                                <img src="{{ asset('assets/images/mercedez-bleu.png') }}" alt="Réservation Facile"
                                    class="w-3/5 mx-auto rounded-lg">
                            </div>
                        </div>
                    </div>

                    <div class="hidden duration-700 ease-in-out" data-carousel-item>
                        <div
                            class="absolute block w-full flex flex-col md:flex-row items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-4">
                            <div class="w-full md:w-1/2 px-3 text-center md:text-left">
                                <h3 class="text-sm font-semibold text-gray-800 mb-4">Chauffeurs Professionnels et Locaux
                                </h3>
                                <p class="text-gray-600 px-5">Nos chauffeurs vous garantissent un trajet sûr et agréable.
                                </p>
                            </div>
                            <div class="w-full md:w-1/2">
                                <img src="{{ asset('assets/images/mercedez-noire.png') }}" alt="Chauffeurs Professionnels"
                                    class="w-3/5 mx-auto rounded-lg">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                        data-carousel-slide-to="0"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                        data-carousel-slide-to="1"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                        data-carousel-slide-to="2"></button>
                </div>

                <!-- Slider controls -->
                <button type="button"
                    class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev>
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d=" M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button"
                    class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next>
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </div>
    </section>


    <section class="my-5 px-5">
        <button data-modal-target="popup-modal" data-modal-toggle="popup-modal"
            class="block text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mx-auto"
            type="button">
            Choisir une Réservation
        </button>
    </section>

    <section class="py-12 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4">


            <div class="flex flex-col lg:flex-row justify-around gap-8">
                <div class="w-full lg:w-1/2">
                    <h3 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Choisissez et réservez un trajet
                    </h3>
                    <form action="{{ route('trajet.check') }}" method="POST" class="space-y-4">
                        @csrf
                        <p class="text-gray-700 dark:text-gray-300">
                            Ajoutez les détails de votre course, le départ et la destination.
                        </p>

                        <div class="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
                            <span class="mr-3 text-2xl text-gray-600 dark:text-gray-400">
                                <i class="fa-solid fa-car-side"></i>
                            </span>
                            <select name="start" id="start"
                                class="flex-1 bg-transparent border-none text-sm md:text-base text-gray-800 dark:text-gray-200 focus:ring-0">
                                <option value="">Sélectionner un départ</option>
                                @foreach ($starts as $start)
                                    <option value="{{ $start }}">{{ $start }}
                                    </option>
                                @endforeach
                            </select>
                            <span class="text-red-600 text-xs">
                                @error('start')
                                    Sélectionner un départ
                                @enderror
                            </span>
                            <span class="ml-3 text-2xl text-gray-600 dark:text-gray-400">
                                <i class="fa-solid fa-location-arrow"></i>
                            </span>
                        </div>

                        <div class="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
                            <span class="mr-3 text-2xl text-gray-600 dark:text-gray-400">
                                <i class="fa-solid fa-car-side"></i>
                            </span>
                            <select name="destination" id="destination"
                                class="flex-1 bg-transparent border-none text-sm md:text-base text-gray-800 dark:text-gray-200 focus:ring-0">
                                <option value="">Sélectionner une destination</option>
                                @foreach ($destinations as $destination)
                                    <option value="{{ $destination }}">{{ $destination }}
                                    </option>
                                @endforeach
                            </select>
                            <span class="text-red-600 text-xs">
                                @error('destination')
                                    Sélectionner une destination
                                @enderror
                            </span>
                            <span class="ml-3 text-2xl text-gray-600 dark:text-gray-400">
                                <i class="fa-solid fa-location-arrow"></i>
                            </span>
                        </div>

                        <div class="flex flex-col sm:flex-row justify-around gap-4">
                            <button type="submit"
                                class="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors w-full sm:w-auto">
                                Voir les prix
                            </button>
                            <button
                                class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto">
                                Planifier pour plus tard
                            </button>
                        </div>
                    </form>
                </div>

                <div class="w-full lg:w-1/2">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1683919251/assets/42/a29147-e043-42f9-8544-ecfffe0532e9/original/travel-ilustra.png"
                        alt="Teranga Shuttle" class="w-full rounded-lg shadow-lg">
                </div>
            </div>
        </div>
    </section>



    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h1 class="text-center font-bold text-3xl text-gray-800 uppercase mb-10">Choisissez votre Course</h1>
            <div class="relative overflow-hidden">
                <div id="course-carousel" class="flex transition-transform duration-500">
                    @foreach ($rides as $ride)
                        <div class="carousel-item w-full flex-shrink-0 px-4 md:px-2 lg:px-4">
                            <div
                                class="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
                                <div class="p-6">
                                    <div class="flex items-center justify-center mb-4">
                                        <div class="text-4xl text-blue-600">
                                            <i class="fa-solid fa-car-side"></i>
                                        </div>
                                    </div>
                                    <h2 class="text-xl font-semibold text-gray-900 mb-3 text-center">{{ $ride->label }}
                                    </h2>
                                    <p class="text-gray-700 text-center mb-4">
                                        <strong>Prix :</strong> {{ $ride->price }} XOF
                                    </p>
                                    <div class="flex justify-center">
                                        <a href="{{ route('reservation.form', ['type' => 'ride', 'type_id' => $ride->id, 'duration' => $ride->duration, 'price' => $ride->price]) }}"
                                            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                                            Réserver
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
                    <button id="prev-btn" class="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button id="next-btn" class="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <h2 class="text-center ">
            <a href="{{ route('ride.index', ['rides' => $rides]) }}"
                class="text-2xl text-blue-700 border border-gray-800 px-3 py-4 mt-3">
                Voir plus de courses ->
            </a>
        </h2>

    </section>




    <section class="py-12 bg-gray-100" id="search">
        <h1 class="text-center font-semibold text-4xl uppercase mb-10 text-gray-800">Découvrez les Trajets
        </h1>

        <div class="container mx-auto px-4 max-w-7xl">
            <div id="trajetsCarousel" class="relative">
                <div class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 p-6">
                    @foreach ($trajets as $trajet)
                        <div
                            class="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 snap-center bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl">
                            <div class="p-6">
                                <h2 class="text-2xl font-semibold mb-4 text-gray-900">
                                    <i class="fa-solid fa-plane-departure fa-sm mr-2 text-blue-500"></i>
                                    {{ $trajet->start }}
                                    <i class="fa-solid fa-arrow-right fa-sm mx-3 text-gray-500"></i>
                                    <i class="fa-solid fa-city fa-sm mr-2 text-green-500"></i>
                                    {{ $trajet->destination }}
                                </h2>
                                <p class="text-gray-700 mb-3">
                                    <i class="fa-solid fa-car-side fa-sm mr-2 text-gray-500"></i> Mercedes
                                    Classe 220VD
                                </p>
                                <p class="text-gray-700 mb-5">
                                    <i class="fa-solid fa-clock fa-sm mr-2 text-gray-500"></i> Durée :
                                    {{ $trajet->duration }} Minutes
                                </p>
                                <div class="flex justify-between items-center mb-6">
                                    <span class="text-blue-600 font-bold text-3xl">{{ $trajet->price }} XOF</span>
                                </div>
                                <a href="{{ route('trajet.show', ['trajet' => $trajet]) }}"
                                    class="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors">
                                    Voir le trajet
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>



    <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
            <h3 class="text-3xl font-semibold mb-8 text-gray-800">Suggestion</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl">
                    <div class="p-6">
                        <div class="text-lg font-semibold text-gray-900 mb-4">Course</div>
                        <div class="flex flex-col md:flex-row justify-between items-center">
                            <p class="text-sm text-gray-700 mb-4 md:mb-0 md:w-1/2 leading-relaxed">
                                Allez où vous voulez grâce à notre véhicule, faites vos réservations, et on
                                s'occupe du
                                reste.
                            </p>
                            <div class="md:w-1/2 flex justify-end">
                                <img src="https://cn-geo1.uber.com/static/mobile-content/launch-experience/ride.png"
                                    alt="Course" class="w-full md:w-48 h-auto object-contain">
                            </div>
                        </div>
                        <div class="mt-4">
                            <button class="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors">
                                Voir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="p-6">
                    <h3 class="text-3xl font-semibold mb-4 text-gray-900">
                        Réservez une course qui s'adapte à votre emploi du temps
                    </h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        Aujourd'hui plus que jamais, vous avez besoin de planifier votre quotidien. Réservez
                        une course haut
                        de gamme avec Teranga-shuttle afin de partir dès que vous le souhaitez.
                    </p>
                    <a href="{{ route('contact') }}"
                        class="inline-block px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors">
                        En savoir plus sur Teranga-Shuttle
                    </a>
                </div>
                <div class="p-6">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_648,w_1152/v1692117249/assets/dd/30a9e7-127d-46ad-b738-020614e5e08e/original/Planning_RingS-M.png"
                        alt="Teranga Shuttle" class="w-full rounded-lg shadow-md">
                </div>
            </div>
        </div>
    </section>

    <section class="py-12 bg-black text-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="p-6">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1693342284/assets/aa/618593-ad05-4700-8b9a-0eeea2a2c734/original/UBER-ONE_One_Membership_for_Uber_and_Uber_Eats_Interstitial-Full-750-x-6803x.png"
                        alt="Teranga Shuttle" class="w-full rounded-lg shadow-md">
                </div>
                <div class="p-6">
                    <h3 class="text-3xl font-semibold mb-4">
                        Allez où vous le voulez. Comme vous le voulez.
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Un abonnement unique pour profiter des prix et des avantages réservés aux membres
                        sur les trajets,
                        les livraisons et plus encore.
                    </p>
                    <a href="{{ route('contact') }}"
                        class="inline-block px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors">
                        En savoir plus sur Teranga-Shuttle
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold mb-8 text-gray-800">Déplacez-vous à votre façon</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1692743834/assets/54/f60161-cf6b-4401-a309-8bb196c0014c/original/U_CoastalCalifornia_White_Final-%281%29.jpg"
                        alt="Teranga Shuttle" class="w-full rounded-t-2xl">
                    <div class="p-6">
                        <h3 class="text-2xl font-semibold mb-4 text-center text-gray-900">Options de
                            courses</h3>
                        <p class="text-gray-600 mb-4 leading-relaxed">
                            Il existe plusieurs moyens de vous déplacer, où que vous soyez et quelle que
                            soit votre
                            destination.
                        </p>
                        <div class="flex justify-center">
                            <button
                                class="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">Trouvez
                                des options de courses</button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1692743890/assets/f9/ba27c4-665c-4cca-8161-9e3f87f49994/original/Airport-rides.png"
                        alt="Teranga Shuttle" class="w-full rounded-t-2xl">
                    <div class="p-6">
                        <h3 class="text-2xl font-semibold mb-4 text-center text-gray-900">+ de 10
                            destinations</h3>
                        <p class="text-gray-600 mb-4 leading-relaxed">
                            Vous pouvez commander une course au départ et à destination de la plupart des
                            milieux publiques.
                            Planifiez une course pour vous rendre n'importe où !
                        </p>
                        <div class="flex justify-center">
                            <a href="#search"
                                class="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">Recherchez
                                une destination</a>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1689609697/assets/b8/c39de0-6e13-485b-ba45-66511170c62a/original/SS_Commuter.jpg"
                        alt="Teranga Shuttle" class="w-full rounded-t-2xl">
                    <div class="p-6">
                        <h3 class="text-2xl font-semibold mb-4 text-center text-gray-900">Plusieurs
                            véhicules</h3>
                        <p class="text-gray-600 mb-4 leading-relaxed">
                            Profitez de nos véhicules rapides, confortables, climatisés et de bons tarifs
                            pour tous vos
                            déplacements.
                        </p>
                        <div class="flex justify-center">
                            <a href="#"
                                class="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section class="py-12 bg-black text-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="p-6">
                    <h3 class="text-3xl font-semibold mb-4">À la recherche de solutions pour les
                        entreprises ?</h3>
                    <div class="text-gray-300 mb-6 leading-relaxed">
                        <p class="text-lg font-semibold mb-2">Découvrez comment les entreprises tirent
                            parti Teranga
                            Shuttle pour leur Business :</p>
                        <ul class="text-sm mb-3 list-disc list-inside">
                            <li>Déplacements professionnels</li>
                            <li>Courses rapides pour des parties prenantes</li>
                            <li>Réservation de déplacement</li>
                        </ul>
                        <div>
                            <button
                                class="rounded-xl bg-white text-black py-3 px-6 hover:bg-gray-200 transition-colors">Commencez</button>
                            <button
                                class="rounded-xl underline text-white py-3 px-6 hover:bg-gray-800 transition-colors">Découvrez
                                nos solutions</button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_648,w_1152/v1691776332/assets/d6/48f5b6-bb5f-450e-8733-90aefecbd09e/original/U4B_Spot_U4BWebsite.jpg"
                        alt="Teranga Shuttle" class="w-full rounded-lg shadow-md">
                </div>
            </div>
        </div>
    </section>




    <section class="py-16 bg-gray-900 text-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="p-6">
                    <h2 class="text-4xl font-semibold mb-6">Notre Flotte de Luxe</h2>
                    <p class="text-lg text-gray-300 mb-8 leading-relaxed">
                        Teranga-shuttle met à votre disposition plusieurs catégories de véhicules de
                        prestige adaptées à vos
                        besoins et à votre budget. De larges gammes de voitures d'exception, conduites par
                        des chauffeurs
                        expérimentés.
                    </p>
                    <button
                        class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl uppercase transition-colors">Découvrez
                        nos gammes</button>
                </div>
                <div class="p-6">
                    <div id="luxuryFleetCarousel" class="relative w-full" data-carousel="slide">
                        <div class="relative h-64 overflow-hidden rounded-2xl md:h-96">
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="{{ asset('assets/images/mercedez-rouge.png') }}"
                                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                                    alt="Mercedes Classe V">
                            </div>
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="{{ asset('assets/images/mercedez-noire.png') }}"
                                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                                    alt="BMW Série 7">
                            </div>
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="{{ asset('assets/images/mercedez-bleu.png') }}"
                                    class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                                    alt="Audi A8">
                            </div>
                        </div>
                        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                            <button type="button"
                                class="w-3 h-3 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors"
                                aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                            <button type="button"
                                class="w-3 h-3 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors"
                                aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                            <button type="button"
                                class="w-3 h-3 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors"
                                aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        </div>
                        <button type="button"
                            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-prev>
                            <span
                                class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7"></path>
                                </svg>
                                <span class="sr-only">Précédent</span>
                            </span>
                        </button>
                        <button type="button"
                            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-next>
                            <span
                                class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7-7 7-7"></path>
                                </svg>
                                <span class="sr-only">Suivant</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- section modal -->
    <section>
        <!-- Modal terms and conditions      -->
        <section class="py-16 bg-gray-100 ">
            <div class="container mx-auto px-4">
                <button data-modal-target="terms-modal" data-modal-toggle="terms-modal"
                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                    Conditions d'utilisation
                </button>

                <div id="terms-modal" tabindex="-1" aria-hidden="true"
                    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-2xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <div
                                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Conditions d'utilisation de [Nom de l'application]
                                </h3>
                                <button type="button"
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="terms-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Fermer la fenêtre</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5 space-y-4 text-gray-700 dark:text-gray-300">
                                <p class="text-base leading-relaxed">
                                    Bienvenue sur [Nom de l'application], votre service de réservation de
                                    véhicules avec
                                    chauffeur. Les présentes conditions d'utilisation régissent votre accès
                                    et votre
                                    utilisation de notre application, que vous soyez au Sénégal ou ailleurs
                                    dans le monde.
                                </p>
                                <p class="text-base leading-relaxed">
                                    En utilisant [Nom de l'application], vous acceptez de vous conformer à
                                    ces conditions.
                                    Veuillez les lire attentivement.
                                </p>
                                <h2 class="text-lg font-semibold">1. Utilisation de l'application</h2>
                                <p class="text-base leading-relaxed">
                                    Vous acceptez d'utiliser l'application uniquement à des fins légales et
                                    conformément aux
                                    lois applicables. Vous ne devez pas utiliser l'application pour des
                                    activités illégales
                                    ou frauduleuses.
                                </p>
                                <h2 class="text-lg font-semibold">2. Réservations et paiements</h2>
                                <p class="text-base leading-relaxed">
                                    Les réservations sont soumises à la disponibilité des véhicules et des
                                    chauffeurs. Les
                                    tarifs sont indiqués dans l'application et peuvent varier. Les paiements
                                    sont effectués
                                    via les méthodes de paiement disponibles.
                                </p>
                                <h2 class="text-lg font-semibold">3. Annulations et remboursements</h2>
                                <p class="text-base leading-relaxed">
                                    Les politiques d'annulation et de remboursement sont détaillées dans
                                    l'application. Des
                                    frais d'annulation peuvent s'appliquer.
                                </p>
                                <h2 class="text-lg font-semibold">4. Responsabilité</h2>
                                <p class="text-base leading-relaxed">
                                    [Nom de l'application] ne peut garantir l'absence d'erreurs ou
                                    d'interruptions. Nous ne
                                    sommes pas responsables des dommages directs ou indirects résultant de
                                    l'utilisation de
                                    notre application.
                                </p>
                                <h2 class="text-lg font-semibold">5. Modifications</h2>
                                <p class="text-base leading-relaxed">
                                    Nous nous réservons le droit de modifier ces conditions à tout moment.
                                    Les modifications
                                    seront publiées dans l'application.
                                </p>
                            </div>
                            <div
                                class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-700">
                                <button data-modal-hide="terms-modal" type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    J'accepte
                                </button>
                                <button data-modal-hide="terms-modal" type="button"
                                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700">
                                    Je refuse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MODAL RESERVE -->

        <!-- Main modal -->
        <div id="crud-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Contactez-nous pour réserver
                        </h3>
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Fermer la fenêtre</span>
                        </button>
                    </div>
                    <form class="p-4 md:p-5" id="contactForm">
                        <div class="mb-4">
                            <label for="status"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vous
                                êtes ?</label>
                            <select name="status" id="status"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Particulier">Particulier</option>
                                <option value="Professionnel">Professionnel</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="nomPrenom"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom et
                                Prénom</label>
                            <input type="text" name="nomPrenom" id="nomPrenom"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Votre nom et prénom" required>
                        </div>
                        <div class="mb-4">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" readonly
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="votre@email.com" required>
                        </div>
                        <div class="mb-4">
                            <label for="telephone"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                            <input type="tel" name="telephone" id="telephone" readonly
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0123456789" required>
                        </div>
                        <div class="mb-4">
                            <label for="demande"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
                                demande</label>
                            <textarea name="demande" id="demande" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Votre message"></textarea>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- choice to reservation  modal -->

        <div id="popup-modal" tabindex="-1"
            class="hidden overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center p-4 md:inset-0">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow-md dark:bg-gray-700">
                    <button type="button"
                        class="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal" aria-label="Close modal">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Choisissez une réservation
                        </h3>
                        <div class="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
                            <a href="{{ route('ride.index') }}"
                                class="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Une Location
                            </a>
                            <a href="{{ route('trajet.index', $trajets) }}"
                                class="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Un Trajet
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </section>




@endsection

@section('script')

    <script>
        /* script for contact form */
        $(document).ready(function() {
            $('#contactForm').submit(function(e) {
                e.preventDefault();

                var formData = $(this).serialize();
                var submitButton = $(this).find('button[type="submit"]');

                submitButton.html('<span class="mr-2 animate-spin">&#9696;</span>Envoi...').prop('disabled',
                    true);

                $.ajax({
                    type: 'POST',
                    url: '/votre-route-de-traitement', // Remplacez par votre route
                    data: formData,
                    success: function(response) {
                        submitButton.html('Envoyer').prop('disabled', false);
                        alert('Message envoyé avec succès !');
                        $('#contactForm')[0].reset(); // Réinitialise le formulaire
                    },
                    error: function(error) {
                        submitButton.html('Envoyer').prop('disabled', false);
                        alert('Une erreur est survenue. Veuillez réessayer.');
                    }
                });
            });
        });
    </script>

    <script>
        /* script for carousel */
        document.addEventListener('DOMContentLoaded', function() {
            const carouselItems = document.getElementById('carouselItems');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            const itemWidth = carouselItems.children[0].offsetWidth + 16; // 16px pour l'espace entre les cartes

            nextButton.addEventListener('click', () => {
                carouselItems.scrollLeft += itemWidth;
            });

            prevButton.addEventListener('click', () => {
                carouselItems.scrollLeft -= itemWidth;
            });

            // Défilement automatique
            let autoScrollInterval = setInterval(() => {
                carouselItems.scrollLeft += itemWidth;
                if (carouselItems.scrollLeft >= carouselItems.scrollWidth - carouselItems.clientWidth) {
                    carouselItems.scrollLeft = 0; // Retour au début si on atteint la fin
                }
            }, 3000); // Défilement toutes les 3 secondes

            // Gestion du glissement (swipe)
            let touchStartX = 0;
            carouselItems.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                clearInterval(autoScrollInterval); // Arrête le défilement automatique lors du glissement
            });

            carouselItems.addEventListener('touchmove', (e) => {
                const touchEndX = e.touches[0].clientX;
                const deltaX = touchStartX - touchEndX;
                carouselItems.scrollLeft += deltaX;
                touchStartX = touchEndX;
            });

            carouselItems.addEventListener('touchend', () => {
                autoScrollInterval = setInterval(() => { // Redémarre le défilement automatique
                    carouselItems.scrollLeft += itemWidth;
                    if (carouselItems.scrollLeft >= carouselItems.scrollWidth - carouselItems
                        .clientWidth) {
                        carouselItems.scrollLeft = 0;
                    }
                }, 3000);
            });
        });
    </script>

    <script>
        /* script for caroussel rides */
        $(document).ready(function() {
            let currentSlide = 0;
            const slides = $('.carousel-item');
            const slideCount = slides.length;
            let slideWidth;

            function updateSlideWidth() {
                if ($(window).width() >= 768) { // md breakpoint
                    slideWidth = $('.container').width() / 3;
                    slides.css('width', slideWidth);
                } else {
                    slideWidth = $('.container').width();
                    slides.css('width', slideWidth);
                }
            }

            updateSlideWidth();
            $(window).resize(updateSlideWidth);

            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                $('#course-carousel').css('transform', 'translateX(-' + currentSlide * slideWidth + 'px)');
            }

            $('#next-btn').click(function() {
                currentSlide = (currentSlide + 1) % slideCount;
                goToSlide(currentSlide);
            });

            $('#prev-btn').click(function() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                goToSlide(currentSlide);
            });
        });
    </script>




@endsection
