<?php

use Illuminate\Support\Facades\Auth;

?>
@extends('template')
@section('title', 'Modifier mon profil')
@section('content')

    <!--  -->
    <section class="py-16 bg-gray-100 ">
        <div class="container mx-auto px-4">
            <div class="justify-center items-center w-full md:inset-0 max-h-full">
                <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl max-h-full mx-auto dark:bg-gray-800">
                    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-8">Modifier le profil</h3>
                    <div class="space-y-6">
                        <form method="POST" action="{{ route('account.update') }}" class="space-y-6" id="formEditProfile">
                            @csrf
                            @method('PUT')
                            <div>
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value="{{ Auth::user()->name }}" required />
                                @error('name')
                                    <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                                @enderror
                            </div>
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" placeholder="Ex: 7gH9T@example.com"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value="{{ Auth::user()->email }}" required />
                                @error('email')
                                    <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                                @enderror
                            </div>
                            <button type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm py-3 transition-colors">Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>


@endsection

@section('script')
    <script></script>
@endsection
