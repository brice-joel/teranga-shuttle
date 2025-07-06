<?php

use Illuminate\Support\Facades\Auth;
?>

@extends('template')
@section('content')
    <section class="py-16 bg-gray-100">
        <div class="justify-center items-center w-full md:inset-0 max-h-full">
            <div class="p-6 w-full max-w-2xl max-h-full mx-auto">
                <div class="bg-white rounded-2xl shadow-lg dark:bg-gray-800">

                    <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                            Réservation du trajet <br>
                            <span class="font-bold uppercase">Paris ---> Marseille</span>
                        </h3>
                    </div>

                    <div class="p-8 space-y-6">
                        <form method="POST" action="{{ route('reservation.store') }}" class="space-y-6" id="formReservation">
                            @csrf

                            <input type="hidden" name="trajet_id" value="{{ $trajet_id }}" />

                            <div>
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Ex: John Katanga" value="{{ Auth::user()->name }}" readonly disabled
                                    required />
                                @error('name')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" placeholder="Ex: 7gH9T@example.com"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value="{{ Auth::user()->email }}" disabled readonly required />
                                @error('email')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="phone"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                                <input type="tel" name="phone" id="phone" placeholder="Ex: +243 999 999 999"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value="{{ Auth::user()->phone }}" readonly disabled required />
                                @error('phone')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label for="date"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de
                                        Réservation</label>
                                    <input type="date" name="date" id="date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        required />
                                    @error('date')
                                        <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div>
                                    <label for="hour"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heure de
                                        Réservation</label>
                                    <input type="time" name="hour" id="hour"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        required />
                                    @error('hour')
                                        <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>

                            <button type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-3 transition-colors">
                                Réserver
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </section>
@endsection

@section('script')
    <script>
        // script that allows the calendar to be displayed from today's date
        document.addEventListener('DOMContentLoaded', function() {
            var today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
            document.getElementById('date').value = today;
        });
    </script>
@endsection



<script>
    $(document).ready(function() {
            $('#formReservation').on('submit', function(e) {
                e.preventDefault();

                $.ajax({
                    url: "{{ route('reservation.store') }}",
                    method: "POST",
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
                    dataType: "json",
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}' // permet d'envoyer la requete avec le token csrf
                    },


                    success: function(response) {

                        if (!response.status == 'success') {
                            toastr.error(response.message);
                        }
                        //$('#static-modal').modal('hide');
                        //$('#formReservation')[0].reset();
                        toastr.success(response.message);


                        console.log('success');

                    },
                    error: function({
                        xhr,
                        status,
                        error
                    }) {
                        console.log({
                            xhr,
                            status,
                            error
                        });
                        toastr.error('Impposible de réserver', 'Erreur ' + status, );
                    }
                })

            })
        }) *
        /
</script>
