@extends('template')
@section('title', 'Connexion')
@section('content')




    <section class="py-16 bg-gray-100 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <div
                class="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:border dark:border-gray-700">
                <form class="space-y-6" method="POST" action="">
                    @csrf
                    <h5 class="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">Connectez-vous</h5>
                    <div>
                        <label for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input type="email" name="email" id="email" value="{{ old('email') }}"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="nom@gmail.com" required />
                        @error('email')
                            <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                        @enderror
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de
                            passe</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required />
                        @error('password')
                            <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                        @enderror

                    </div>
                    <!-- affiche le recaptcha -->

                    <div class="g-recaptcha" data-sitekey="6LdpHFErAAAAAOXzTXh3Mn4owqxyS1pidCD6mC0f">
                    </div>
                    @error('g-recaptcha-response')
                        <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                    @enderror


                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <input type="checkbox" name="remember" id="remember"
                                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Se
                                souvenir de moi</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe
                            oublié ?</a>
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm py-3 transition-colors">Se
                        connecter</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                        Vous n'avez pas de compte ? <a href="{{ route('auth.register') }}"
                            class="text-blue-700 hover:underline dark:text-blue-500">Créer un compte</a>
                    </div>
                </form>
            </div>
        </div>
    </section>

@endsection
