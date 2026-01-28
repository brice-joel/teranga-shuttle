@extends('template')
@section('title', 'mon compte')
@section('content')

    <section class="bg-gradient-to-r from-indigo-100 to-purple-100 py-16">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-extrabold text-indigo-800 text-center mb-10">
                <i class="fas fa-calendar-check mr-2"></i> Mes Réservations
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
