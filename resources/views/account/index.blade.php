<?php
use Illuminate\Support\Facades\Auth;
?>

@extends('template')
@section('title', 'mon compte')
@section('content')
    <section class="py-16 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-12 animate__animated animate__fadeInDown">Mon
                Compte</h1>

            <div
                class="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden md:max-w-2xl dark:bg-gray-800 dark:border dark:border-gray-700 animate__animated animate__fadeInUp">
                <div class="md:flex">
                    <div class="w-full p-8">
                        <div class="flex justify-center mb-8">
                            <img class="h-32 w-32 rounded-full object-cover border-4 border-blue-200 animate__animated animate__pulse animate__infinite"
                                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                alt="Profil de l'utilisateur">
                        </div>

                        <div class="text-center mb-10">
                            <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">{{ Auth::user()->name }}</h2>
                            <p class="text-lg text-gray-500 dark:text-gray-300"><i
                                    class="fas fa-user-tag mr-2"></i>{{ Auth::user()->role }}</p>
                        </div>

                        <ul class="space-y-6">
                            <li class="flex items-center">
                                <span class="w-32 font-medium text-gray-900 dark:text-gray-300"><i
                                        class="fas fa-envelope mr-2"></i>Email:</span>
                                <span class="text-gray-700 dark:text-gray-100">{{ Auth::user()->email }}</span>
                            </li>

                            <li class="flex items-center">
                                <span class="w-32 font-medium text-gray-900 dark:text-gray-300"><i
                                        class="fas fa-phone mr-2"></i>Téléphone:</span>
                                <span class="text-gray-700 dark:text-gray-100">{{ Auth::user()->phone }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-10 space-x-6">
                <a href="{{ route('account.edit') }}"
                    class="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-colors duration-300">
                    <i class="fas fa-edit mr-2"></i> Modifier
                </a>
                <button id="deleteAccountButton"
                    class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-6 py-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-colors duration-300">
                    <i class="fas fa-trash mr-2"></i> Supprimer le compte
                </button>
            </div>
        </div>

        <div id="deleteAccountModal" tabindex="-1"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="deleteAccountModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6-6M7 7l6-6M7 7l-6-6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg class="mx-auto mb-4 text-red-500 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Êtes-vous sûr de vouloir
                            supprimer votre compte ?</h3>
                        <button data-modal-hide="deleteAccountModal" type="button"
                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Oui, je suis sûr
                        </button>
                        <button data-modal-hide="deleteAccountModal" type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Non,
                            annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </section>



@endsection

@section('script')
    <script>
        $(document).ready(function() {
            $('#deleteAccountButton').click(function() {
                $('#deleteAccountModal').removeClass('hidden').addClass('flex');
            });
        });
    </script>
@endsection
