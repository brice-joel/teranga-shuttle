@extends('admin.template')
@section('content')
    <section class="">
        <section>
            <div class="">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">Tableau de Bord</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {{-- Carte Clients --}}
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-users text-blue-500 text-2xl mr-4"></i> {{-- Icône Font Awesome --}}
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Clients Totaux</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $nb_users }}</p>
                            </div>
                        </div>
                        <span class="inline-block py-1 px-2 rounded bg-blue-100 text-blue-600 text-xs font-semibold">
                            <i class="fas fa-arrow-up mr-1"></i>
                            20%
                        </span>
                    </div>

                    {{-- Carte Réservations --}}
                    <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-calendar-check text-green-500 text-2xl mr-4"></i> {{-- Icône Font Awesome --}}
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Réservations Totales</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $nb_reservations }}</p>
                            </div>
                        </div>
                        <span class="inline-block py-1 px-2 rounded bg-green-100 text-green-600 text-xs font-semibold">
                            <i class="fas fa-arrow-up mr-1"></i>
                            23%
                        </span>
                    </div>

                    {{-- Carte Revenus --}}
                    <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-money-bill-wave text-purple-500 text-2xl mr-4"></i> {{-- Icône Font Awesome --}}
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Revenu Total Généré</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $total_reservations_price }}
                                    FCFA</p>
                            </div>
                        </div>
                        <span class="inline-block py-1 px-2 rounded bg-purple-100 text-purple-600 text-xs font-semibold">
                            <i class="fas fa-arrow-up mr-1"></i>
                            100%
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="mb-5">

                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">Les clients ayant
                    réservé le plus de réservations</h1>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nom
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tel
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    NB de réservations
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Prix total
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users_with_most_reservations as $uwmr)
                                <tr
                                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row"
                                        class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ $loop->iteration }}
                                    </th>
                                    <th scope="row"
                                        class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ $uwmr->email }}
                                    </th>
                                    <td class="px-3 py-2">
                                        {{ $uwmr->name }}
                                    </td>
                                    <td class="px-3 py-2">
                                        {{ $uwmr->phone }}
                                    </td>

                                    <td class="px-3 py-2 ">
                                        {{ $uwmr->total_reservations }}
                                    </td>
                                    <td class="px-3 py-2">
                                        {{ $uwmr->total_price }} FCFA
                                    </td>

                                </tr>
                            @endforeach



                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mb-5">

                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">Les réservations
                    les plus couteuses</h1>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nom
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tel
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Prix Total
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nb Réservations
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($user_with_most_expensive_reservations as $uwmer)
                                <tr
                                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" class="px-3 py-2">
                                        {{ $loop->iteration }}
                                    </th>
                                    <th scope="row"
                                        class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ $uwmer->email }}
                                    </th>
                                    <td class="px-3 py-2">
                                        {{ $uwmer->name }}
                                    </td>
                                    <td class="px-3 py-2">
                                        {{ $uwmer->phone }}
                                    </td>

                                    <td class="px-3 py-2">
                                        {{ $uwmer->total_price }}
                                    </td>

                                    <td class="px-3 py-2">
                                        {{ $uwmer->total_reservations }}
                                    </td>


                                </tr>
                            @endforeach



                        </tbody>
                    </table>
                </div>
            </div>



        </section>




        <section>

            <div class="container mx-auto p-4 md:p-6 lg:p-8">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">Trajet le Plus
                    Emprunté</h1>

                <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                    @if ($most_popular_trajet)
                        <!-- ($trajetLePlusEmprunte) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Départ:</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $most_popular_trajet->start }}</p>
                            </div>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Destination:</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $most_popular_trajet->destination }} </p>
                            </div>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Nombre de fois emprunté:
                                </h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $most_popular_trajet->total_reservations }} fois</p>
                            </div>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Prix:</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $most_popular_trajet->price }} FCFA</p>
                            </div>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Durée Moyenne:</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $most_popular_trajet->duration }} min</p>
                            </div>
                        </div>
                    @else
                        <p class="text-gray-500 dark:text-gray-400">Aucun trajet n'a été emprunté pour le moment.</p>
                    @endif
                </div>
            </div>


        </section>

        <section>

            <div class="container mx-auto p-4 md:p-6 lg:p-8">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">
                    Somme Totale des Réservations par Trajet
                </h1>

                <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Histogramme
                    </h2>
                    <div class="flex justify-center">
                        <div class="w-full">
                            <canvas id="trajetsHistogram" class="w-full h-64"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section>
            <div class="container mx-auto p-4 md:p-6 lg:p-8">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">Tableau de Bord
                </h1>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {{-- Carte Clients --}}
                    <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-users text-blue-500 text-2xl mr-4"></i>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Clients Totaux</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $circular_chart_datas['totalClients'] }}</p>
                            </div>
                        </div>
                        <span class="inline-block py-1 px-2 rounded bg-blue-100 text-blue-600 text-xs font-semibold">
                            <i class="fas fa-arrow-up mr-1"></i>
                            {{ $circular_chart_datas['clientPercentageChange'] }}%
                        </span>
                    </div>

                    {{-- Carte Réservations --}}
                    <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-calendar-check text-green-500 text-2xl mr-4"></i>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Réservations Totales
                                </h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $circular_chart_datas['totalReservations'] }}</p>
                            </div>
                        </div>
                        <span class="inline-block py-1 px-2 rounded bg-green-100 text-green-600 text-xs font-semibold">
                            <i class="fas fa-arrow-up mr-1"></i>
                            {{ $circular_chart_datas['reservationPercentageChange'] }}%
                        </span>
                    </div>

                    {{-- Carte Revenus --}}
                    <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-money-bill-wave text-purple-500 text-2xl mr-4"></i>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Revenu Total</h2>
                                <p class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ $circular_chart_datas['totalRevenue'] }}</p>
                            </div>
                        </div>
                        <span class="inline-block py-1 px-2 rounded bg-purple-100 text-purple-600 text-xs font-semibold">
                            <i class="fas fa-arrow-up mr-1"></i>
                            {{ $circular_chart_datas['revenuePercentageChange'] }}%
                        </span>
                    </div>
                </div>

                {{-- Diagramme Circulaire Réservations --}}
                <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Pourcentage des Réservations
                        par
                        Statut</h2>
                    <div class="flex justify-center">
                        <div class="w-full md:w-1/2">
                            <canvas id="reservationsChart" width="400" height="400"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </section>
@endsection

@section('script')
    <script>
        // script qui affiche le diagramme circulaire des réservations
        const ctxReservations = document.getElementById('reservationsChart').getContext('2d');
        const reservationsChart = new Chart(ctxReservations, {
            type: 'pie',
            data: {
                labels: ['Confirmées', 'Annulées', 'En Attente'],
                datasets: [{
                    label: 'Réservations',
                    //data est en bas de ce fichier
                    data: [{{ $circular_chart_datas['confirmedReservationsCount'] }},
                        {{ $circular_chart_datas['cancelledReservationsCount'] }},
                        {{ $circular_chart_datas['pendingReservationsCount'] }}
                    ],



                    backgroundColor: [
                        'rgba(0, 200, 0, 0.5)', // vert
                        'rgba(200, 0, 0, 0.5)', // Rouge
                        'rgba(255, 255, 0, 0.5)' // yellow
                    ],
                    borderColor: [
                        'rgba(56, 189, 248, 1)',
                        'rgba(244, 114, 182, 1)',
                        'rgba(252, 211, 77, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            fontColor: '#6b7280', // Couleur du texte de la légende
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Couleur de fond de la tooltip
                        titleColor: '#fff', // Couleur du titre de la tooltip
                        bodyColor: '#fff', // Couleur du texte de la tooltip
                        borderColor: '#cbd5e0', // Couleur de la bordure de la tooltip
                        borderWidth: 1,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (context.parsed !== null) {
                                    label += ': ' + context.parsed + ' (' + context.dataset.data[context
                                        .dataIndex] + ')';
                                }
                                return label;
                            }
                        }
                    },
                }
            }
        });
    </script>

    <script>
        // script qui affiche l'histogramme des trajets

        // recuperations des donnes de trajet du controller
        const data = @json($total_reservations_price_by_trajet);

        const trajetLabels = Object.keys(data); // recuperation des trajets (clés de  l'objet)
        const trajetData = Object.values(data); // Récuperation du prix du trajet (valeur de l'objet)
        console.log(trajetData, trajetLabels);

        const ctxHistogram = document.getElementById('trajetsHistogram').getContext('2d');
        const trajetsHistogram = new Chart(ctxHistogram, {
            type: 'bar',
            data: {
                labels: trajetLabels,
                datasets: [{
                    label: 'Somme Totale des Réservations (FCFA)',
                    data: trajetData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 232, 90, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 232, 90, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Trajet',
                            font: {
                                size: 14,
                                family: 'Inter'
                            },
                            color: '#6b7280'
                        },
                        ticks: {
                            font: {
                                family: 'Inter'
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Somme Totale des Réservations (FCFA)',
                            font: {
                                size: 14,
                                family: 'Inter'
                            },
                            color: '#6b7280'
                        },
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            fontColor: '#6b7280',
                            font: {
                                family: 'Inter'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#cbd5e0',
                        borderWidth: 1,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (context.parsed.y !== null) {
                                    label += ': ' + context.parsed.y + ' FCFA';
                                }
                                return label;
                            }
                        }
                    },
                },
                font: {
                    family: 'Inter'
                }
            }
        });
    </script>
@endsection

@php
    //   data: [{{ $confirmedReservationsCount }}, {{ $cancelledReservationsCount }}, {{ $pendingReservationsCount }}                    ],
    // Déclaration statique des données pour trajetLabels et trajetData
    //        const trajetLabels = ['Yaoundé - Douala', 'Douala - Kribi', 'Yaoundé - Bafoussam', 'Bafoussam - Kribi'];
    //      const trajetData = [2400000, 1700000, 4000000, 1000000];
@endphp
