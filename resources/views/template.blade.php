@php

    use Illuminate\Support\Facades\Auth;
    use App\Models\Trajet;
    use App\Models\Ride;
    $trajets = Trajet::all();
    $rides = Ride::all();

@endphp


<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-N3TJ9H8X');
    </script>
    <!-- End Google Tag Manager -->
    <!-- google recaptcha -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <!-- End google recaptcha -->
    <!-- font awesome-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- toaststr -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
        integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- google font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap?family=Nunito:wght@400;600;700&display=swap"
        rel="stylesheet">
    <!-- animate css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <!-- full calender css -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!--  <link href='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.css' rel='stylesheet' /> -->

    <style>
        body {
            font-family: 'Roboto', sans-serif;
            font-family: 'Nunito', sans-serif;
        }
    </style>



    @yield('style')
</head>

<body>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N3TJ9H8X" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->


    <!-- header -->
    <header class="sticky top-0 z-50">
        <nav class="bg-gray-100 border-gray-200 dark:bg-gray-900 dark:text-gray-100">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
                <a href="https://terangashuttle.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 hidden" alt="Flowbite Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Teranga
                        Shuttle</span>
                </a>

                <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    @auth

                        <button type="button"
                            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom">
                            <span class="sr-only">Open user menu</span>
                            <img class="w-8 h-8 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="user photo">

                        </button>
                        <!-- Dropdown menu -->
                        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown">
                            <div class="px-4 py-3">
                                <span class="block text-sm text-gray-900 dark:text-white">{{ Auth::user()->name }}</span>
                                <span
                                    class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ Auth::user()->email }}</span>
                            </div>
                            <ul class="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="{{ route('account.index') }}"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Mon compte</a>
                                </li>
                                <li>
                                    <a href="{{ route('account.reservation') }}"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Mes reservations</a>
                                </li>


                                <li>
                                    <form action="{{ route('auth.logout') }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button
                                            class="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white bg-red-900">
                                            <i class="fa-solid fa-right-from-bracket"></i> Déconnexion
                                        </button>

                                    </form>
                                </li>
                            </ul>
                        </div>

                    @endauth

                    @guest
                        <ul class="flex text-white">


                            <li>
                                <a href="{{ route('auth.login') }}"
                                    class="block border rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    <i class="fa-solid fa-user"></i>
                                </a>
                            </li>

                        </ul>
                    @endguest
                    <button data-collapse-toggle="navbar-user" type="button"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul
                        class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="{{ route('index') }}"
                                class="block py-2 px-3 text-sm text-white bg-blue-700 rounded-sm   md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 "aria-current="page">Accueil</a>
                        </li>
                        <li>

                            <a href="{{ route('trajet.index', $trajets) }}"
                                class="block py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                @class(['active' => request()->routeIs('index')])>
                                Trajets
                            </a>
                        </li>


                        <li>

                            <a href="{{ route('ride.index', $rides) }}"
                                class="block py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                @class(['active' => request()->routeIs('index')])>
                                Location
                            </a>
                        </li>

                        <li>

                            <a href="{{ route('service') }}"
                                class="block py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                @class(['active' => request()->routeIs('index')])>
                                Services
                            </a>
                        </li>

                        <li>
                            <a href="{{ route('contact') }}"
                                class="block py-2 px-3 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li>
                        <li>
                            <a href="{{ route('devis.index') }}"
                                class="block p-5 bg-blue-700 text-sm text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Obtenir un dévis
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    </header>

    <!--
    BACK BUTTON

    <div class="back-button relative top-10 left-20 ">
        <a href="{{ url()->previous() }}" class="p-1 text-2xl hover:scale-110 bg-gray-100 rounded-full"><i
                class="fa-solid fa-left-long"></i></a>
    </div>
    -->


    <main class="">
        @yield('content')
    </main>



    <!--
        STATIC  BUTTONS
    -->
    <a href="{{ route('devis.index') }}"
        class="fixed bottom-4 left-4 z-50
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          py-3 px-5 rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center space-x-2
          text-sm md:text-base lg:text-lg
          transform hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75">
        <i class="fas fa-file-invoice-dollar text-white"></i> {{-- Icône Font Awesome pour le devis --}}
        <span class="hidden sm:inline">Demander un Devis</span> {{-- Texte visible sur écrans plus grands --}}
        <span class="sm:hidden">Devis</span> {{-- Texte court pour petits écrans --}}
    </a>
    <a href="https://wa.me/+41763233400?text=R%C3%A9servation%20d'une%20course%20sur%20Teranga%20Shuttle%0ABonjour%2C%20J'aimerai%20prendre%20une%20r%C3%A9servation"
        target="_blank"
        class="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out animate-pulse hover:animate-none">
        <i class="fab fa-whatsapp text-2xl"></i>
    </a>



    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-10 md:py-12"> {{-- Padding vertical légèrement réduit --}}
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-10">
                {{-- Gap ajusté, et passage à 2 colonnes sur md, 4 sur lg --}}
                {{-- Section 1: Logo & Slogan --}}
                <div>
                    <h1 class="text-xl md:text-2xl font-bold uppercase mb-3 tracking-wide">Teranga-shuttle</h1>
                    {{-- Taille du titre ajustée, font-bold, tracking-wide --}}
                    <p class="text-gray-400 text-sm leading-relaxed mb-4"> {{-- Taille de texte réduite, mb ajusté --}}
                        Véhicules de luxe et chauffeurs professionnels pour des déplacements en toute sérénité.
                    </p>
                    <a href="{{ route('devis.index') }}" {{-- Lien direct vers le formulaire de devis --}}
                        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Obtenir un devis
                    </a>
                </div>

                {{-- Section 2: Services --}}
                <div>
                    <h2 class="text-lg md:text-xl font-semibold uppercase mb-3">Services</h2> {{-- Taille des titres de section ajustée --}}
                    <ul class="space-y-2 text-sm md:text-base"> {{-- Espacement et taille de texte ajustés --}}
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Location de
                                voiture</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Transferts
                                aéroport</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Circuits
                                touristiques</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Événements
                                spéciaux</a></li> {{-- Ajout d'un service pour l'exemple --}}
                    </ul>
                </div>

                {{-- Section 3: Contact --}}
                <div>
                    <h2 class="text-lg md:text-xl font-semibold uppercase mb-3">Contact</h2>
                    <ul class="space-y-2 text-sm md:text-base">
                        <li>
                            <a href="mailto:info@terangashuttle.com"
                                class="text-gray-400 hover:text-white transition-colors flex items-center">
                                <i class="fas fa-envelope mr-2 text-base md:text-lg"></i> info@terangashuttle.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+221782936412"
                                class="text-gray-400 hover:text-white transition-colors flex items-center">
                                <i class="fas fa-phone-alt mr-2 text-base md:text-lg"></i> +221 78 293 64 12
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="text-gray-400 hover:text-white transition-colors flex items-center">
                                <i class="fas fa-map-marker-alt mr-2 text-base md:text-lg"></i> Dakar, Sénégal
                            </a>
                        </li>
                    </ul>
                </div>

                {{-- Section 4: À propos --}}
                <div>
                    <h2 class="text-lg md:text-xl font-semibold uppercase mb-3">À propos</h2>
                    <ul class="space-y-2 text-sm md:text-base">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Notre
                                histoire</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Notre
                                équipe</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Témoignages</a>
                        </li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                        {{-- Ajout d'un lien pour l'exemple --}}
                    </ul>
                </div>
            </div>

            {{-- Section Réseaux Sociaux --}}
            <div class="border-t border-gray-700 pt-8 mt-8"> {{-- Ligne de séparation plus fine, padding et marge ajustés --}}
                <h2 class="text-center text-lg md:text-xl font-semibold mb-5 text-gray-300">Rejoignez-nous sur nos
                    réseaux sociaux</h2> {{-- Taille et couleur de titre ajustées --}}
                <ul class="flex justify-center space-x-6 text-2xl md:text-3xl"> {{-- Taille des icônes ajustée --}}
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors"><i
                                class="fa-brands fa-facebook-f"></i></a></li> {{-- Icône Facebook moderne --}}
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors"><i
                                class="fa-brands fa-whatsapp"></i></a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors"><i
                                class="fa-brands fa-linkedin-in"></i></a></li> {{-- Icône LinkedIn moderne --}}
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors"><i
                                class="fa-brands fa-instagram"></i></a></li> {{-- Ajout d'Instagram, très pertinent --}}
                </ul>
            </div>

            <p class="text-center text-xs md:text-sm text-gray-500 mt-8"> {{-- Taille de copyright réduite --}}
                &copy; {{ date('Y') }} Teranga-shuttle. Tous droits réservés.
            </p>
        </div>
    </footer>



    <script src="https://cdn.tailwindcss.com"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- script for include cdn  flowbite -->
    <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>

    <!-- script for toaststr -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"
        integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- script for full calender js -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js'></script>

    <script>
        //script for navbar responsive design
        $(document).ready(function() {
            let button = $('.drop')
            let menu = $('.menu')

            button.on('click', function() {
                menu.toggleClass('hidden');
            })
        })
    </script>
    <script>
        toastr.options = {
            "closeButton": true,
            "progressBar": false,
            "positionClass": "toast-bottom-left"
        }
        /* ALL TESTS FOR TOASTSTR GOES HERE */
        /*
        toastr.success('Hello, world!', 'Toastr is working!');
        toastr.error('Hello, world!', 'Toastr is working!');
        toastr.warning('Hello, world!', 'Toastr is working!');
        toastr.info('Hello, world!', 'Toastr is working!');
        */
        @if (session()->has('success'))
            toastr.success('', '{{ session('success') }}');
        @endif
        @if (session()->has('error'))
            toastr.error('', '{{ session('error') }}');
        @endif
    </script>



    @yield('script')



</body>

</html>
