 <form method="POST" action="{{ $trajet->id ? route('admin.trajet.update', $trajet) : route('admin.trajet.store') }}"
     class="space-y-4">
     @if ($trajet->id)
         @method('PUT')
     @endif

     @csrf
     <div>
         <label for="start" class="block text-gray-700 text-sm font-bold mb-2">Départ</label>
         <input type="text" name="start" id="start" value="{{ old('start', $trajet->start) }}" required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             placeholder="Ville de départ">
         @error('start')
             <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
         @enderror
     </div>

     <div>
         <label for="destination" class="block text-gray-700 text-sm font-bold mb-2">Destination</label>
         <input type="text" name="destination" id="destination"
             value="{{ old('destination', $trajet->destination) }}" required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             placeholder="Ville de destination">
         @error('destination')
             <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
         @enderror
     </div>

     <div>
         <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Prix (FCFA)</label>
         <input type="number" name="price" id="price" value="{{ old('price', $trajet->price) }}" required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             placeholder="Prix du trajet">
         @error('price')
             <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
         @enderror
     </div>

     <div>
         <label for="duree_moyenne" class="block text-gray-700 text-sm font-bold mb-2">Durée Moyenne
             (minutes)</label>
         <input type="number" name="duration" id="duration" value="{{ old('duration', $trajet->duration) }}" required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             placeholder="Durée moyenne du trajet en minutes">
         @error('duration')
             <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
         @enderror
     </div>

     <div class="flex justify-end">
         <button type="submit"
             class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
             <i class="fas fa-save mr-2"></i> Enregistrer
         </button>
         <a href="{{ route('admin.trajet.index') }}"
             class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
             <i class="fas fa-times mr-2"></i> Annuler
         </a>
     </div>
 </form>
