  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td class="w-4 p-4">
          <div class="flex items-center">
              <input id="checkbox-table-search-{{ $reservation->id }}" type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-{{ $reservation->id }}" class="sr-only">checkbox</label>
          </div>
      </td>
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
          <button class="py-1 px-3 border border-white text-lg text-green-600 dark:text-green-500 hover:underline me-2">
              <i class="fa fa-check"></i>
          </button>
          <button class="py-1 px-3 border border-white text-lg text-red-600 dark:text-red-500 hover:underline">
              <i class="fa fa-trash"></i>
          </button>
      </td>
  </tr>



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
