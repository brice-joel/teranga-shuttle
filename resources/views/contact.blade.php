@extends('template')
@section('title', 'teranga-shuttle contact')
@section('content')

    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-semibold text-center mb-10 text-gray-800">Contactez-nous</h1>


            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="p-6 bg-white rounded-2xl shadow-md">
                    <h2 class="text-3xl font-semibold mb-6 text-gray-900">Informations de contact</h2>
                    <p class="text-gray-700 mb-4 flex items-center">
                        <i class="fa-solid fa-map-marker-alt mr-3 text-gray-500"></i> Dakar, Sénégal
                    </p>
                    <p class="text-gray-700 mb-4 flex items-center">
                        <i class="fa-solid fa-phone mr-3 text-gray-500"></i> +221 78 293 64 12
                    </p>
                    <p class="text-gray-700 mb-6 flex items-center">
                        <i class="fa-solid fa-envelope mr-3 text-gray-500"></i> info@terangashuttle.com
                    </p>
                    <div class="mt-8">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800">Suivez-nous</h3>
                        <div class="flex space-x-6">
                            <a href="#" class="text-blue-500 hover:text-blue-700 transition-colors">
                                <i class="fa-brands fa-facebook-f text-2xl"></i>
                            </a>
                            <a href="#" class="text-blue-400 hover:text-blue-600 transition-colors">
                                <i class="fa-brands fa-twitter text-2xl"></i>
                            </a>
                            <a href="#" class="text-red-500 hover:text-red-700 transition-colors">
                                <i class="fa-brands fa-instagram text-2xl"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-white rounded-2xl shadow-md">
                    <h2 class="text-3xl font-semibold mb-6 text-gray-900">Envoyez-nous un message</h2>
                    <form action="{{ route('mail.form_contact') }}" method="POST" class="space-y-6">
                        @csrf
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
                            <input type="text" name="name" id="name" value="{{ Auth::user()->name ?? '' }}"
                                class="mt-1 p-3 w-full border rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                required>
                            @error('name')
                                <br>
                                <span class="text-red-700 text-sm">{{ $message }}</span>
                            @enderror
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" value="{{ Auth::user()->email ?? '' }}"
                                class="mt-1 p-3 w-full border rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                required>
                            @error('email')
                                <br>
                                <span class="text-red-700 text-sm">{{ $message }}</span>
                            @enderror
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                            <textarea name="message" id="message" rows="4" required
                                class="mt-1 p-3 w-full border rounded-xl focus:ring-blue-500 focus:border-blue-500">{{ old('message') }}</textarea>
                        </div>
                        <div>
                            <button type="submit"
                                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full">
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <div class="p-6 bg-white rounded-2xl shadow-md">
                    <h2 class="text-3xl font-semibold mb-6 text-gray-900">Obtenir un dévis</h2>
                    <p class="text-gray-700 mb-4 flex items-center">
                        <a href="{{ route('devis.index') }}" class="text-blue-500 hover:text-blue-700 transition-colors ">
                            demande de dévis pour un trajet</a>
                    </p>

                </div>
            </div>
        </div>
    </section>





@endsection
