@extends('admin.template')
@section('content')
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
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tel
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Inscrit le
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($users as $user)
                            <tr
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row"
                                    class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ $loop->iteration }}
                                </th>
                                <th scope="row"
                                    class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ $user->email }}
                                </th>
                                <td class="px-3 py-2">
                                    {{ $user->name }}
                                </td>
                                <td class="px-3 py-2">
                                    {{ $user->phone }}
                                </td>

                                <td class="px-3 py-2 ">
                                    {{ $user->created_at }}
                                </td>


                            </tr>
                        @endforeach



                    </tbody>
                </table>
            </div>
        </div>





    </section>
@endsection
