@extends('template')
@section('title', 'paiement')
@section('content')
    <section class="py-16 bg-gray-100 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                <div class="w-full md:w-1/3 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Prix à payer</h2>
                    <p class="text-5xl font-bold text-green-600 dark:text-green-400">129,99 €</p>
                </div>

                <div class="w-full md:w-2/3 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Informations de paiement</h2>
                    <form id="payment-form" class="space-y-6">
                        <div class="relative">
                            <label for="card_number"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Numéro de
                                carte</label>
                            <input type="text" id="card_number" name="card_number"
                                class="w-full px-4 py-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                placeholder="XXXX-XXXX-XXXX-XXXX">
                            <img id="card_logo" src="" alt="Logo de la carte" class="absolute top-10 right-4 h-6">
                        </div>
                        <div class="flex space-x-6">
                            <div class="w-1/2">
                                <label for="expiry_date"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date
                                    d'expiration</label>
                                <input type="text" id="expiry_date" name="expiry_date"
                                    class="w-full px-4 py-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                    placeholder="MM/AA">
                            </div>
                            <div class="w-1/2 relative">
                                <label for="cvv"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                                <input type="text" id="cvv" name="cvv"
                                    class="w-full px-4 py-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                    placeholder="123">
                                <img id="cvv_logo"
                                    src="https://media.istockphoto.com/vectors/credit-card-vector-glyph-icon-vector-id1195018036?k=20&m=1195018036&s=612x612&w=0&h=mQKkNQcIWGLthW9pdFoXfldyE_fwRDlS4yh8jaF-WY0="
                                    alt="Logo CVV" class="absolute top-10 right-4 h-6">
                            </div>
                        </div>
                        <div>
                            <label for="card_holder"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom du
                                titulaire</label>
                            <input type="text" id="card_holder" name="card_holder" value="{{ Auth::user()->name }}"
                                class="w-full px-4 py-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                placeholder="Nom complet">
                        </div>
                        <div>
                            <label for="country"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pays</label>
                            <select id="country" name="country"
                                class="w-full px-4 py-3 border rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                                <option value="" data-flag="">.......</option>
                                <option value="fr" data-flag="fr.png">France</option>
                                <option value="us" data-flag="us.png">États-Unis</option>
                                <option value="se" data-flag="se.png">Senegal</option>
                                <option value="uk" data-flag="uk.png">Royaume-Unis</option>
                                <option value="ge" data-flag="ge.png">Allemagne</option>
                                <option value="be" data-flag="be.png">Belgique</option>
                                <option value="it" data-flag="it.png">Italie</option>
                                <option value="ca" data-flag="ca.png">Canada</option>
                            </select>
                        </div>
                        <button type="submit" id="pay-button"
                            class="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">Payer</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <section class="">
        <div class="container mx-auto p-4">
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div class="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Prix à payer</h2>
                    <p class="text-4xl font-bold text-green-600 dark:text-green-400">129,99 €</p>
                </div>

                <div class="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Informations de paiement</h2>
                    <form id="payment-form">
                        <div class="mb-4 relative">
                            <label for="card_number" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Numéro de
                                carte</label>
                            <input type="text" id="card_number" name="card_number"
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                placeholder="XXXX-XXXX-XXXX-XXXX">
                            <img id="card_logo" src="" alt="Logo de la carte" class="absolute top-8 right-3 h-6">
                        </div>
                        <div class="flex space-x-4 mb-4">
                            <div class="w-1/2">
                                <label for="expiry_date"
                                    class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Date
                                    d'expiration</label>
                                <input type="text" id="expiry_date" name="expiry_date"
                                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                    placeholder="MM/AA">
                            </div>
                            <div class="w-1/2 relative">
                                <label for="cvv"
                                    class="block text-gray-700 dark:text-gray-300 font-bold mb-2">CVV</label>
                                <input type="text" id="cvv" name="cvv"
                                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                    placeholder="123">
                                <img id="cvv_logo"
                                    src="https://media.istockphoto.com/vectors/credit-card-vector-glyph-icon-vector-id1195018036?k=20&m=1195018036&s=612x612&w=0&h=mQKkNQcIWGLthW9pdFoXfldyE_fwRDlS4yh8jaF-WY0="
                                    alt="Logo CVV" class="absolute top-8 right-3 h-6">
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="card_holder" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Nom du
                                titulaire</label>
                            <input type="text" id="card_holder" name="card_holder" value="{{ Auth::user()->name }}"
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                                placeholder="Nom complet">
                        </div>
                        <div class="mb-4">
                            <label for="country"
                                class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Pays</label>
                            <select id="country" name="country"
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                                <option value="" data-flag="">.......</option>
                                <option value="fr" data-flag="fr.png">France</option>
                                <option value="us" data-flag="us.png">États-Unis</option>
                                <option value="se" data-flag="se.png">Senegal</option>
                                <option value="uk" data-flag="uk.png">Royaume-Unis</option>
                                <option value="ge" data-flag="ge.png">Allemagne</option>
                                <option value="be" data-flag="be.png">Belgique</option>
                                <option value="it" data-flag="it.png">Italie</option>
                                <option value="ca" data-flag="ca.png">Canada</option>
                            </select>
                        </div>
                        <button type="submit" id="pay-button"
                            class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">Payer</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('script')
    <!-- script for format payment form -->
    <script>
        $(document).ready(function() {
            $('#card_number').on('input', function() {
                var cardNumber = $(this).val().replace(/\D/g, '');
                var formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
                $(this).val(formattedCardNumber);

                let
                    logo_visa_card =
                    "https://th.bing.com/th/id/R.1ea18fabbba58ad1a238da160c3ff1c0?rik=KZpkmMmmGPSuHA&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2017%2f05%2fvisa_vector_logo-300x213.png&ehk=n%2ffXVHkbJVndMFowj4UKk%2bY%2bPOBXuK6Hwbscm8VvGQ0%3d&risl=&pid=ImgRaw&r=0";
                let
                    logo_master_card =
                    "https://th.bing.com/th/id/R.f2149d66202f3648b6dc2cd5c80bd22d?rik=isqp%2b22LjeFfcQ&pid=ImgRaw&r=0"

                if (cardNumber.startsWith('4')) {
                    $('#card_logo').attr('src', logo_visa_card).show();
                } else if (cardNumber.startsWith('5')) {
                    $('#card_logo').attr('src', logo_master_card).show();
                } else {
                    $('#card_logo').hide();
                }
            });

            $('#expiry_date').on('input', function() {
                var expiryDate = $(this).val().replace(/\D/g, '');
                if (expiryDate.length > 2 && expiryDate.indexOf('/') === -1) {
                    expiryDate = expiryDate.substring(0, 2) + '/' + expiryDate.substring(2);
                }
                $(this).val(expiryDate);
            });
        });
    </script>

    <!-- script for validate payment -->
    <script>
        $(document).ready(function() {
            $('#payment-form').submit(function(e) {
                e.preventDefault();

                var formData = $(this).serialize();
                var payButton = $('#pay-button');

                // Désactiver le bouton et afficher le chargement
                payButton.prop('disabled', true).html(
                    '<i class="fas fa-spinner fa-spin"></i> Chargement...');

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.ajax({
                    url: "{{ route('payment.store') }}",
                    type: 'POST',
                    data: formData,
                    success: function(response) {
                        // Réactiver le bouton et afficher le message de succès
                        payButton.prop('disabled', false).html('Payer');
                        toastr.success(response
                            .message); // Ou gérer la réponse comme vous le souhaitez
                    },
                    error: function(xhr, status, error) {
                        // Réactiver le bouton et afficher le message d'erreur
                        payButton.prop('disabled', false).html('Payer');

                        toastr.error('Une erreur est survenue.');
                        // Ou gérer l'erreur comme vous le souhaitez
                    }
                });
            });
        });
    </script>
@endsection
