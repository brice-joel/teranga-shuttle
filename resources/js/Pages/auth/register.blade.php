@extends('template')
@section('title', 'Inscription')
@section('content')


    <section class="py-16 bg-gray-100 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <div
                class="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:border dark:border-gray-700">
                <form class="space-y-6" method="POST" action="">
                    @csrf
                    <h5 class="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">Créer votre compte</h5>
                    <div class="grid grid-cols-1 gap-6">
                        <!-- affiche le recaptcha -->
                        <div class="g-recaptcha" data-sitekey="6LdpHFErAAAAAOXzTXh3Mn4owqxyS1pidCD6mC0f">
                        </div>
                        @error('g-recaptcha-response')
                            <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                        @enderror
                        <div>
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Prenom Nom" required />
                            @error('name')
                                <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                            @enderror
                        </div>
                        <div>
                            <label for="phone"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                            <div class="flex">
                                <select name="phone_code" id="phone_code"
                                    class="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option value="+221">+229</option>
                                    <option value="+226">+226</option>
                                    <option value="+237">+237</option>
                                    <option value="+228">+228</option>
                                    <option value="+225">+225</option>
                                    <option value="+224">+224</option>
                                    <option value="+33">+33</option>
                                    <option value="+44">+44</option>
                                    <option value="+34">+34</option>
                                </select>
                                <input type="tel" name="phone" id="phone" value="{{ old('phone') }}"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>
                            @error('phone')
                                <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
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
                    <div>
                        <label for="password_confirmation"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer le mot de
                            passe</label>
                        <input type="password" name="password_confirmation" id="password_confirmation"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            required />
                        @error('password_confirmation')
                            <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <input id="link-checkbox" type="checkbox" value=""
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required>
                            <label for="link-checkbox"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">J'accepte les <a
                                    href="route('terms-and-conditions')"
                                    class="text-blue-600 dark:text-blue-500 hover:underline">termes et conditions
                                    d'utilisation</a>.</label>
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm py-3 transition-colors">Créer
                        votre compte</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                        Vous avez déjà un compte ? <a href="{{ route('auth.login') }}"
                            class="text-blue-700 text-sm hover:underline dark:text-blue-500">Connectez-vous à votre
                            compte</a>
                    </div>
                </form>
            </div>
        </div>
    </section>



@endsection

@section('script')
    <script>
        $(document).ready(function() {
            $.get('https://ipapi.co/json/', function(data) {
                let countryCode = data.country_code;
                let phoneCode = getPhoneCode(countryCode);
                if (phoneCode) {
                    $('#phone_code').val(phoneCode);
                }
            });

            function getPhoneCode(countryCode) {
                let phoneCodes = {
                    "US": "+1",
                    "FR": "+33",
                    "GB": "+44",
                    "CA": "+1",
                    "MX": "+52",
                    "ES": "+34",
                    "DE": "+49",
                    "IT": "+39",
                    "NL": "+31",
                    "BE": "+32",
                    "CH": "+41",
                    "AT": "+43",
                    "SE": "+46",
                    "CM": "+237",
                    // Ajoutez d'autres codes de pays et indicatifs téléphoniques ici
                };
                return phoneCodes[countryCode];
            }
        });
    </script>
@endsection
