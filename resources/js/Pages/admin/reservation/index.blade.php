@extends('admin/template')
@section('content')
    <section>
        <h1>Liste de Réservations</h1>
        <div class=" md:p-3">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">Nom client</th>
                            <th scope="col" class="px-6 py-3">Email</th>
                            <th scope="col" class="px-6 py-3">Date</th>
                            <th scope="col" class="px-6 py-3">Heure</th>
                            <th scope="col" class="px-6 py-3">Statut</th>
                            <th scope="col" class="px-6 py-3">Prix</th>
                            <th scope="col" class="px-6 py-3">Départ</th>
                            <th scope="col" class="px-6 py-3">Destination</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($reservations as $reservation)
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-{{ $reservation->id }}" type="checkbox"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-table-search-{{ $reservation->id }}"
                                            class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ $reservation->name }}
                                </th>
                                <td class="px-6 py-4">{{ $reservation->email }}</td>
                                <td class="px-6 py-4">{{ $reservation->start_date }}</td>
                                <td class="px-6 py-4">
                                    {{ \Carbon\Carbon::parse($reservation->start_hour)->format('H:i') }}</td>
                                <td class="px-6 py-4">
                                    <span @class([
                                        'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full',
                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' =>
                                            $reservation->status == 'annuler',
                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' =>
                                            $reservation->status == 'confirmer',
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' =>
                                            $reservation->status == 'en attente',
                                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' => !in_array(
                                            $reservation->status,
                                            ['annuler', 'confirmer', 'en attente']),
                                    ])>{{ $reservation->status }}</span>
                                </td>
                                <td class="px-6 py-4">XOF{{ $reservation->price }}</td>
                                <td class="px-6 py-4">{{ $reservation->start }}</td>
                                <td class="px-6 py-4">{{ $reservation->destination }}</td>
                                <td class="flex items-center px-6 py-4">
                                    <button
                                        class="py-1 px-3 border border-white text-lg text-green-600 dark:text-green-500 hover:underline me-2">
                                        <i class="fa fa-check"></i>
                                    </button>
                                    <button
                                        class="py-1 px-3 border border-white text-lg text-red-600 dark:text-red-500 hover:underline">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>


        </div>


    </section>

    <section>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="p-4">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>

                </tr>
            </thead>
            <tbody class="flex">
                @foreach ($reservations as $reservation)
                    @include('admin.reservation.reservation-card', ['reservation' => $reservation])
                @endforeach
            </tbody>
        </table>
    </section>

    <section class="bg-gradient-to-r from-indigo-100 to-purple-100 py-16">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-extrabold text-indigo-800 text-center mb-10">
                <i class="fas fa-calendar-check mr-2"></i> Réservations
            </h1>

            <div class="mb-10">
                <ul class="flex flex-wrap justify-center text-sm font-medium text-center space-x-4" id="reservation-tabs"
                    role="tablist">
                    <li class="mb-2 md:mb-0" role="presentation">
                        <button
                            class="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none"
                            id="all-tab" data-tabs-target="#all" type="button" role="tab" aria-controls="all"
                            aria-selected="true">
                            <i class="fas fa-list-ul mr-2"></i> Tout(s)
                        </button>
                    </li>
                    <li class="mb-2 md:mb-0" role="presentation">
                        <button
                            class="px-6 py-3 rounded-full border border-green-600 text-green-600 hover:bg-green-50 transition-colors focus:outline-none"
                            id="confirmed-tab" data-tabs-target="#confirmed" type="button" role="tab"
                            aria-controls="confirmed" aria-selected="false">
                            <i class="fas fa-check-circle mr-2"></i> Confirmé
                        </button>
                    </li>
                    <li class="mb-2 md:mb-0" role="presentation">
                        <button
                            class="px-6 py-3 rounded-full border border-yellow-600 text-yellow-600 hover:bg-yellow-50 transition-colors focus:outline-none"
                            id="pending-tab" data-tabs-target="#pending" type="button" role="tab"
                            aria-controls="pending" aria-selected="false">
                            <i class="fas fa-clock mr-2"></i> En attente
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            class="px-6 py-3 rounded-full border border-red-600 text-red-600 hover:bg-red-50 transition-colors focus:outline-none"
                            id="cancelled-tab" data-tabs-target="#cancelled" type="button" role="tab"
                            aria-controls="cancelled" aria-selected="false">
                            <i class="fas fa-ban mr-2"></i> Annulé
                        </button>
                    </li>
                </ul>
            </div>

            <div id="reservation-tabs-content">
                <div class="p-6 rounded-lg bg-white shadow-md" id="all" role="tabpanel" aria-labelledby="all-tab">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        @foreach ($reservations as $reservation)
                            @include('components.reservation-card', ['reservation' => $reservation])
                        @endforeach
                    </div>
                </div>

                <div class="hidden p-6 rounded-lg bg-white shadow-md" id="confirmed" role="tabpanel"
                    aria-labelledby="confirmed-tab">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        @foreach ($reservations as $reservation)
                            @if ($reservation->status == 'confirmer')
                                @include('components.reservation-card', ['reservation' => $reservation])
                            @endif
                        @endforeach
                    </div>
                </div>

                <div class="hidden p-6 rounded-lg bg-white shadow-md" id="pending" role="tabpanel"
                    aria-labelledby="pending-tab">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        @foreach ($reservations as $reservation)
                            @if ($reservation->status == 'en attente')
                                @include('components.reservation-card', ['reservation' => $reservation])
                            @endif
                        @endforeach
                    </div>
                </div>

                <div class="hidden p-6 rounded-lg bg-white shadow-md" id="cancelled" role="tabpanel"
                    aria-labelledby="cancelled-tab">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        @foreach ($reservations as $reservation)
                            @if ($reservation->status == 'annuler')
                                @include('components.reservation-card', ['reservation' => $reservation])
                            @endif
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection



@section('script')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const tabs = document.querySelectorAll('#reservation-tabs button');
            const tabContents = document.querySelectorAll('#reservation-tabs-content > div');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = document.querySelector(tab.getAttribute('data-tabs-target'));

                    tabs.forEach(t => t.setAttribute('aria-selected', false));
                    tabContents.forEach(content => content.classList.add('hidden'));

                    tab.setAttribute('aria-selected', true);
                    target.classList.remove('hidden');
                });
            });

            // Set the 'Tout' tab as active by default
            document.getElementById('all-tab').click();
        });
    </script>
@endsection
