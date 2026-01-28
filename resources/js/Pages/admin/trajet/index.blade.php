@extends('admin.template')
@section('content')
    <section>
        <a href="{{ route('admin.trajet.create') }}"
            class="px-4 py-2 bg-blue-700 text-gray-100 rounded-xl hover:bg-blue-900">Nouveau</a>
    </section>
    <section>
        <div class="mb-5">

            <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">Les clients ayant
                réservé le plus de réservations</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Depart
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Destination
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Prix
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Durée moyenne (min)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($trajets as $trajet)
                            <tr
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row"
                                    class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ $loop->iteration }}
                                </th>
                                <th scope="row"
                                    class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ $trajet->start }}
                                </th>
                                <td class="px-3 py-2">
                                    {{ $trajet->destination }}
                                </td>
                                <td class="px-3 py-2">
                                    {{ $trajet->price }}
                                </td>

                                <td class="px-3 py-2 ">
                                    {{ $trajet->duration }}
                                </td>
                                <td class="px-4 py-2 text-center flex  space-x-2">
                                    <button
                                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded flex items-center">
                                        <i class="fas fa-eye mr-1"></i>
                                    </button>
                                    <a href="{{ route('admin.trajet.edit', $trajet) }}"
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center">
                                        <i class="fas fa-edit mr-1"></i>
                                    </a>
                                    <button data-modal-target="delete-modal" data-modal-toggle="delete-modal"
                                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center">
                                        <i class="fas fa-trash-alt mr-1"></i>
                                    </button>
                                    @include('admin.trajet.modal', [
                                        'route' => route('admin.trajet.delete', $trajet),
                                    ])
                                </td>


                            </tr>
                        @endforeach



                    </tbody>
                </table>
            </div>
        </div>





    </section>
@endsection
