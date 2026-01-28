<div
    class="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
    <a href="{{ route('reservation.index', $reservation->id) }}" class="block p-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
            <div class="flex items-center mb-2 md:mb-0">
                <i class="fas fa-map-marker-alt text-indigo-600 mr-1"></i>
                <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ $reservation->start }}</span>
                <i class="fas fa-arrow-right mx-1 text-gray-500 dark:text-gray-400"></i>
                <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ $reservation->destination }}</span>
            </div>
            <div class="text-[10px] text-gray-600 dark:text-gray-300">
                <i class="fas fa-calendar-alt mr-1"></i> {{ $reservation->start_date }}
            </div>
        </div>

        <div class="mb-2 flex flex-wrap flex-col md:flex-row items-start md:items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                <i class="fas fa-clock mr-1"></i> Heure: {{ $reservation->start_hour }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                <i class="fas fa-hourglass-half mr-1"></i> Durée: {{ $reservation->duration }} min
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
                <i class="fas fa-money-bill-wave mr-1"></i> Prix: {{ $reservation->price }} XOF
            </div>
        </div>

        <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
            <p class="text-base font-medium text-gray-700 dark:text-gray-200 mb-2 md:mb-0">
                Statut
            </p>
            @if ($reservation->status === 'confirmer')
                <span
                    class="inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
                    <i class="fas fa-check-circle mr-1"></i> Confirmé
                </span>
            @elseif($reservation->status === 'en attente')
                <span
                    class="inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-yellow-100 bg-yellow-600 rounded-full">
                    <i class="fas fa-clock mr-1"></i> En attente
                </span>
            @elseif($reservation->status === 'annuler')
                <span
                    class="inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    <i class="fas fa-ban mr-1"></i> Annulé
                </span>
            @endif
        </div>
    </a>
</div>
