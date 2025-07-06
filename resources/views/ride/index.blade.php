@extends('template')

@section('content')
    <section class="bg-gradient-to-r from-gray-100 to-gray-200 py-20">
        <div class="container mx-auto px-4">
            <h1 class="text-5xl font-extrabold text-center text-blue-800 mb-12">
                Trouvez Votre Location Idéale
            </h1>

            {{-- Affichage du trajet sélectionné (initialement caché) --}}
            <section id="showRide" class="bg-white rounded-3xl shadow-2xl overflow-hidden p-10 mb-10 hidden">
                <div class="max-w-md mx-auto text-center">
                    <img src="{{ asset('assets/images/mercedez-bleu.png') }}" class="w-64 mx-auto mb-8" alt="Teranga Shuttle">
                    <h2 class="text-3xl font-semibold text-indigo-700 mb-6"><span class="label"></span></h2>
                    <p class="text-2xl text-gray-700 mb-8">Prix : <span class="price"></span> XOF</p>
                    <a href="#" id="reserver"
                        class="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors text-lg">
                        <i class="fas fa-calendar-check mr-2"></i> Réserver maintenant
                    </a>
                </div>
            </section>

            {{-- Formulaire de recherche de location --}}
            <section class="bg-white rounded-3xl shadow-2xl overflow-hidden p-10">
                <h2 class="text-3xl font-semibold text-indigo-700 mb-8 text-center">
                    <i class="fas fa-search text-indigo-500 mr-2"></i> Rechercher une Location
                </h2>

                <form id="rideForm" class="space-y-8">
                    <div>
                        <label for="ride" class="block text-lg font-medium text-gray-700 mb-2">Choisissez votre
                            Location</label>
                        <select id="ride" name="ride"
                            class="mt-1 block w-full bg-gray-300 rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg">
                            <option value=""></option>
                            @foreach ($rides as $ride)
                                <option value="{{ $ride->id }}">{{ $ride->label }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="flex justify-center">
                        <button type="submit" id="searchButton"
                            class="inline-flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors text-lg">
                            <i class="fas fa-search mr-2"></i> Rechercher
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </section>
@endsection

@section('script')
    <script>
        $(document).ready(function() {
            $('#rideForm').submit(function(event) {
                event.preventDefault();

                const ride_id = $('#ride').val();
                const searchButton = $('#searchButton');

                const price = $('.price');
                const label = $('.label');

                const reservateLink = $('#reserver')



                searchButton.html('Loading...').prop('disabled', true);


                $.ajax({
                    url: "{{ route('ride.search') }}",
                    method: 'POST',
                    data: {
                        ride_id: ride_id,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        price.html(response.price);
                        label.html(response.label);

                        // Construction de l'URL complète en JavaScript
                        let baseUrl =
                            "{{ route('reservation.form', ['type' => 'ride', 'type_id' => $ride->id]) }}";
                        let fullUrl = baseUrl + "?price=" + response.price;

                        reservateLink.attr('href', fullUrl);

                        $('#showRide').removeClass('hidden').addClass('block');
                        searchButton.html('Rechercher').prop('disabled', false);
                    },
                    error: function() {
                        alert('Une erreur est survenue.');
                        searchButton.html('Rechercher').prop('disabled', false);
                    }
                });
            });
        });
    </script>
@endsection
