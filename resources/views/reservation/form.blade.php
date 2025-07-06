@php
    /* use Carbon\Carbon;

    function calculEndHour(string $heureDepart, int $minutesAAjouter): string
    {
        try {
            $dateTimeDepart = Carbon::createFromFormat('H:i', $heureDepart);
            $dateTimeArrivee = $dateTimeDepart->addMinutes($minutesAAjouter);
            return $dateTimeArrivee->format('H:i');
        } catch (\Exception $e) {
            return "Format d'heure de départ invalide (HH:MM)";
        }
    }

    // Exemple d'utilisation dans Laravel :
$heureDepart = '10:45';
$minutesAAjouter = 90;
$heureArrivee = calculEndHour($heureDepart, $minutesAAjouter);
echo "L'heure d'arrivée (Laravel) sera : " . $heureArrivee . "\n"; // Output: L'heure d'arrivée (Laravel) sera : 12:15
*/
@endphp

@extends('template')
@section('style')
    <style>
        .fc-header-toolbar {
            /*
                                                                                                                                                                                                                                                                                                                                                  the calendar will be butting up against the edges,
                                                                                                                                                                                                                                                                                                                                                  but let's scoot in the header's buttons
                                                                                                                                                                                                                                                                                                                                                  */
            padding-top: 1em;
            padding-left: 1em;
            padding-right: 1em;
        }
    </style>
@endsection
@section('content')
    <section class="bg-gradient-to-r from-blue-100 to-gold-100 py-12 px-4 min-h-screen">
        <div class="flex justify-center items-center w-full md:inset-0 max-h-full">
            <div class="w-full  max-w-2xl max-h-full">
                <div class="bg-gray-300 rounded-3xl shadow-2xl p-8 md:p-12">

                    <div class="text-center  mb-8">
                        <h3 class="text-3xl font-extrabold text-indigo-700 mb-4">
                            <i class="fas fa-calendar-alt mr-2"></i> Réservation
                        </h3>
                        <p class="text-gray-600">Veuillez remplir les détails de votre réservation.</p>
                    </div>

                    <div class="mb-8 border-b border-gray-200">
                        @if ($type == 'ride')
                            <h3 class="text-2xl font-semibold text-gray-800 pb-4">
                                <i class="fas fa-car mr-2"></i> Location :
                                <span class="font-bold uppercase">{{ request()->query('label') }}</span>
                                <span class="text-4xl font-bold text-blue-600 ml-2">
                                    <strong class="price">{{ request()->query('price') }}</strong> XOF
                                </span>
                            </h3>
                        @elseif ($type == 'trajet')
                            <h3 class="text-2xl font-semibold text-gray-800 pb-4">
                                <i class="fas fa-route mr-2"></i> Trajet :
                                <span class="font-bold uppercase">{{ request()->query('start') }}</span>
                                <i class="fas fa-arrow-right mx-2"></i>
                                <span class="font-bold uppercase">{{ request()->query('destination') }}</span>
                                <span class="text-4xl font-bold text-blue-600 ml-2">
                                    <strong class="price">{{ request()->query('price') }}</strong> XOF
                                </span>
                            </h3>
                        @endif
                    </div>

                    <form method="POST" action="{{ route('reservation.store') }}" class="space-y-6" id="formReservation">
                        @csrf

                        <input type="hidden" name="type" readonly value="{{ $type }}">
                        <input type="hidden" name="type_id" readonly value="{{ $type_id }}">
                        <input type="hidden" name="price" readonly class="price"
                            value="{{ request()->query('price') }}">

                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">
                                <i class="fas fa-phone mr-2"></i> Téléphone
                            </label>
                            <input type="tel" name="phone" id="phone" placeholder="Ex: +243 999 999 999"
                                class="bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full"
                                value="{{ Auth::user()->phone }}" readonly disabled required />
                            @error('phone')
                                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                            @enderror
                        </div>



                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label for="luggage" class="block mb-2 text-sm font-medium text-gray-900">
                                    <i class="fas fa-suitcase mr-2"></i> Bagages
                                </label>
                                <select id="luggage" name="luggage"
                                    class="w-full border rounded-xl px-4 py-3 text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">---------</option>
                                    <option value="non">Non</option>
                                    <option value="oui">Oui</option>
                                </select>
                                @error('luggage')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>

                            <div id="suitcase_container" style="display: none;">
                                <label for="suitcase">Nombre de valises :</label>
                                <select name="suitcase" id="suitcase"
                                    class="w-full border rounded-xl px-4 py-3 text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">

                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>

                            <div>
                                <label for="places" class="block mb-2 text-sm font-medium text-gray-900">
                                    <i class="fas fa-users mr-2"></i> Nombre de Passagers
                                </label>
                                <select name="places" id="places"
                                    class="w-full border rounded-xl bg-gray-50 px-4 py-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                                    @for ($i = 1; $i <= 8; $i++)
                                        <option value="{{ $i }}">{{ $i }}</option>
                                    @endfor
                                </select>
                                @error('places')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>


                        </div>



                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex-1">
                                <label for="start_date" class="block mb-2 text-sm font-medium text-gray-900">
                                    <i class="fas fa-calendar-day mr-2"></i> Date de Réservation
                                </label>
                                <input type="date" name="start_date" id="start_date" data-modal-target="static-modal"
                                    data-modal-toggle="static-modal"
                                    class="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                    value="{{ old('start_date') }}" required />
                                @error('start_date')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>



                            <div class="flex-1">
                                <label for="start_hour" class="block mb-2 text-sm font-medium text-gray-900">
                                    <i class="fas fa-clock mr-2"></i> Heure de Réservation
                                </label>
                                <select name="start_hour" id="start_hour"
                                    class="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                    required>
                                    @if (old('start_hour'))
                                        <option value="{{ old('start_hour') }}" selected>{{ old('start_hour') }}</option>
                                    @endif
                                </select>
                                @error('start_hour')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="flex-1">
                                <label for="end_hour" class="block mb-2 text-sm font-medium text-gray-900">
                                    <i class="fas fa-calendar-day mr-2"></i> heure de fin de reservation
                                </label>
                                <input type="time" name="end_hour" id="end_hour"
                                    class="w-full bg-gray-50 border border-gray-300 px-4 py-3 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                    value="{{ old('end_hour') }}" required />
                                @error('end_hour')
                                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <button type="button" data-modal-target="static-modal" data-modal-toggle="static-modal"
                            class="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-3 transition-colors">
                            <i class="fas fa-calendar-alt mr-2"></i> Voir la disponibilité
                        </button>



                        <div>
                            <label for="comment" class="block mb-2 text-sm font-medium text-gray-900">
                                <i class="fas fa-comment-alt mr-2"></i> Commentaire
                            </label>
                            <textarea name="comment" id="comment" placeholder="Ajouter un commentaire"
                                class="w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>



                        <button type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-3 transition-colors">
                            <i class="fas fa-check mr-2"></i> Réserver
                        </button>
                    </form>



                </div>
            </div>
        </div>
    </section>

    <section>
        <!-- Main modal -->


        <div id="static-modal" data-modal-backdrop="static" tabindex="-1"
            class="fixed top-[-20px] right-0 left-0 z-50 flex-start w-full h-full overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-75  flex justify-center items-start md:top-0">
            <div class="relative p-4 w-full max-w-full max-h-full">
                <div id="cal" class="relative bg-white rounded-lg shadow-sm h-full">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900 ">
                            Selectionnez la date et heure de départ
                        </h3>
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="static-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div id="calendar-container" class="p-1 md:p-5 space-y-4 h-full">
                        <div id='calendar' class=""></div>
                    </div>
                </div>
            </div>
        </div>


    </section>
@endsection

@section('script')
    <script>
        // script for time field and date field
        //document.addEventListener('DOMContentLoaded', function() {});

        $(document).ready(function() {
            function populateHours() {
                var select = $('#start_hour');
                select.empty();

                var now = new Date();
                var currentHour = now.getHours();
                var currentMinute = now.getMinutes();
                var next30Minutes = new Date(now.getTime() + 30 * 60 * 1000); // Ajoute 30 minutes
                var nextHour = next30Minutes.getHours();
                var nextMinute = next30Minutes.getMinutes();

                for (var hour = 4; hour < 22; hour++) {
                    for (var minute = 0; minute < 60; minute += 30) {
                        var formattedHour = (hour < 10 ? '0' : '') + hour;
                        var formattedMinute = (minute < 10 ? '0' : '') + minute;
                        var time = formattedHour + ':' + formattedMinute;
                        select.append('<option value="' + time + '">' + time + '</option>');
                    }
                }

                // Définir l'heure par défaut sur l'heure actuelle + 30 minutes
                if (!"{{ old('start_hour') }}") {
                    var defaultHour = (nextHour < 10 ? '0' : '') + nextHour;
                    var defaultMinute = (nextMinute < 10 ? '0' : '') + nextMinute;
                    var defaultTime = defaultHour + ':' + defaultMinute;
                    select.val(defaultTime);
                }

            }

            populateHours();
        });

        $(document).ready(function() {
            var today = new Date().toISOString().split('T')[0];
            $('#start_date').attr('min', today);
        });
    </script>

    <script>
        /* script for update price */
        $(document).ready(function() {
            $('#places').change(function() {
                var selectedPlaces = parseInt($(this).val());
                var originalPrice = parseInt("{{ request()->query('price') }}");
                var newPrice = originalPrice;

                if (selectedPlaces > 4) {
                    newPrice += 50000;
                }

                $('.price').text(newPrice); //for title
                $('.price').val(newPrice); // for input
            });

        });
    </script>

    <script>
        $(document).ready(function() {
            const calendarEl = document.getElementById("calendar");
            let startDateInput = document.getElementById("start_date");
            let startHourInput = document.getElementById("start_hour");
            let endHourInput = document.getElementById("end_hour");
            const duration = parseInt(getUrlParams("duration")) // récuperer la durer dans l'url


            const calendarModal = $("#static-modal"); // Sélectionner la modal jQuery

            const calendar = new FullCalendar.Calendar(calendarEl, {

                initialView: 'cinqJours', // Nom de votre vue personnalisée
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'cinqJours,dayGridMonth' // Ajoutez votre vue personnalisée ici
                },
                views: {
                    cinqJours: {
                        type: 'timeGrid', // Ou 'dayGrid' si vous n'avez pas besoin des heures
                        duration: {
                            days: 5
                        },
                        buttonText: 'Jours' // Texte du bouton pour cette vue dans la barre d'outils
                    }
                },
                /*
                   initialView: "timeGridWeek",
                 headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "timeGridWeek,timeGridDay",
                },
                */
                // les heures s'affichent a partir de 4h a 22h
                slotMinTime: "04:00",
                slotMaxTime: "23:00",

                locale: "fr",
                longPressDelay: 1,


                buttonText: {
                    today: "Today",
                    week: "Semaine",
                    day: "Jour",
                },
                monthNames: [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                ],
                monthNamesShort: [
                    "Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin",
                    "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."
                ],
                dayNames: [
                    "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
                ],
                dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
                selectable: true,
                select: function(info) {
                    const selectedStart = info.start;
                    const selectedEnd = info.end;
                    const formattedDate = formatDate(selectedStart);
                    const formattedTime = formatTime(selectedStart);
                    let isFullDayBooked = false;

                    calendar.getEvents().forEach(function(event) {
                        if (event.allDay && formatDate(event.start) === formattedDate) {
                            isFullDayBooked = true;
                        }

                    });

                    if (isFullDayBooked) {
                        toastr.error("La réservation est indisponible toute cette journée du " +
                            formattedDate);
                    } else {
                        console.log("Date de réservation sélectionnée :", formattedDate);
                        console.log("Heure de réservation sélectionnée :", formattedTime);


                        startDateInput.value = formattedDate;
                        startHourInput.value = formattedTime;
                        endHourInput.value = getEndHour(formattedTime, duration);
                        $('#end_hour').val(endHourInput.value);
                        console.log(getEndHour(formattedTime, duration));

                        console.log(
                            `Heure de fin de réservation: ${getEndHour(formattedTime, duration)}`)

                        toastr.success(" Date: " + formattedDate + " Heure: " + formattedTime);
                        // calendarModal.modal('hide'); // Cacher la modal après la sélection
                        // calendar.unselect();
                    }



                },
                events: getReservations(),
            });

            calendar.render();

            // Afficher la modal au clic sur l'input de date
            $(startDateInput).on("click", function() {
                calendarModal.modal('show');
            });



            function generateRandomReservations() {
                /* this function is create to generate random reservations liste for test reservations */
                const reservations = [];
                const startDate = new Date("2025-04-14T00:00:00+01:00");
                const endDate = new Date("2025-05-01T00:00:00+01:00");

                while (startDate < endDate) {
                    if (Math.random() < 0.6) {
                        if (Math.random() < 0.2) {
                            reservations.push({
                                title: "Réservation (Jour Entier)",
                                start: startDate.toISOString().slice(0, 10),
                                allDay: true,
                                color: "red",
                            });
                        } else {
                            const startHour = Math.floor(Math.random() * 24);
                            const startMinute = Math.random() < 0.5 ? 0 : 30;
                            const
                                start = new Date(startDate);
                            start.setHours(startHour, startMinute, 0, 0);
                            const
                                durationMinutes = Math.floor(Math.random() * (24 * 60 - 30 + 1)) + 30;
                            const end = new Date(start.getTime() +
                                durationMinutes * 60 * 1000);
                            reservations.push({
                                title: "Réservation",
                                start: start.toISOString(),
                                end: end.toISOString(),
                                color: "orange",
                            });
                        }
                    }
                    startDate.setDate(startDate.getDate() + 1);
                }
                return reservations;
            }


            // Fonction pour formater la date (YYYY-MM-DD)
            function formatDate(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            }

            // Fonction pour formater l'heure (HH:MM)
            function formatTime(date) {
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return `${hours}:${minutes}`;
            }

            function getReservations() {
                const reservationsFromController = @json($reservations);
                const events = [];

                reservationsFromController.forEach(reservation => {
                    // Combine start_date and start_hour to create a FullCalendar-compatible start time
                    const startDateTimeString = `${reservation.start_date}T${reservation.start_hour}`;
                    const endDateTimeString = `${reservation.start_date}T${reservation.end_hour}`;
                    console.log(startDateTimeString);

                    events.push({
                        title: 'Réservation', // Utilisez la destination comme titre ou un titre par défaut
                        start: startDateTimeString,
                        // end: '2025-04-16T10:30', // startDateTimeString,
                        // FullCalendar peut inférer l'heure de fin si elle n'est pas fournie,
                        // ou vous pouvez ajouter une colonne 'end' à votre table si nécessaire.
                        // Exemple si vous aviez une colonne 'end_date' et 'end_hour':
                        //end: `${reservation.end_date}T${reservation.end_hour}`,
                        end: endDateTimeString,
                        allDay: false, // Indique que ce n'est pas un événement sur toute la journée
                        // Vous pouvez ajouter d'autres propriétés comme 'color', 'description', etc.
                        id: reservation
                            .id, // Si vous avez besoin de manipuler les événements par leur ID
                    });
                });

                return events;
            }

            const startDate = new Date("2025-04-14T00:00:00+01:00");
            const start = new Date(startDate)
            const end = new Date(start.getTime() + 30 * 60 * 1000);
            console.log(start);

            console.log(start.toISOString().slice(0, 10));


        });
    </script>


    <script>
        $(document).ready(function() {
            // Fonction pour vérifier si on est sur un écran mobile (largeur maximale de 767px est une convention)
            function isMobile() {
                return window.innerWidth <= 767;
            }

            // Vérifier si on est sur mobile avant d'exécuter le script
            if (isMobile()) {
                console.log("Mode mobile détecté, application des styles FullCalendar...");


                // Sélectionner les éléments
                var contentCalendar = $('.fc-view-harness.fc-view-harness-active');
                var fc_toolbar_chunk = $(".fc-toolbar-chunk");
                var button_today = $(".fc-today-button.fc-button.fc-button-primary");
                var fc_button_group = $(".fc-button-group");


                /* Content calendar */
                if (contentCalendar.length) {
                    contentCalendar.css('height', '65vh');
                    console.log("Hauteur de contentCalendar définie à 65vh.");
                } else {
                    console.log("L'élément .fc-view-harness.fc-view-harness-active n'a pas été trouvé.");
                }

                /* fc_toolbar_chunk calendar */
                if (fc_toolbar_chunk.length) {
                    fc_toolbar_chunk.css('width', '100px');
                    console.log("Largeur de fc_toolbar_chunk définie à 100px.");
                } else {
                    console.log("L'élément .fc-toolbar-chunk n'a pas été trouvé.");
                }

                /* button_today calendar */
                if (button_today.length) {
                    button_today.css('margin-top', '2px');
                    button_today.css('margin-left', '0');
                    console.log("Marges de button_today modifiées.");
                } else {
                    console.log("L'élément .fc-today-button.fc-button.fc-button-primary n'a pas été trouvé.");
                }
                /* button_today calendar */
                if (fc_button_group.length) {
                    fc_button_group.css('flex-wrap', 'wrap');
                    console.log("Marges de button_today modifiées.");
                } else {
                    console.log("L'élément .fc-today-button.fc-button.fc-button-primary n'a pas été trouvé.");
                }


                /* other style with jquery */
                $('#fc-dom-1').css('font-size', '1em');
                $('#cal').css('height', '90vh');

            } else {
                console.log(
                    "Mode non-mobile détecté, les styles FullCalendar spécifiques au mobile ne sont pas appliqués."
                );
            }
        });
    </script>
    <script>
        // script qui affiche ou cache le champ du nombre de valise en fonction de la valeur (ouui ou non) des baggages
        $(document).ready(function() {
            $('#luggage').change(function() {
                if ($(this).val() === 'oui') {
                    $('#suitcase_container').show();
                } else {
                    $('#suitcase_container').hide();
                }
            });
        });
    </script>
    <script>
        // cette fonction qui permet de calculer et dafficher lheure d'arriver en fonction de l'heure de depart
        function getEndHour(heureDepart, minutesAAjouter) {
            // Vérifier le format de l'heure de départ avec une expression régulière
            if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(heureDepart)) {
                return "Format d'heure de départ invalide (HH:MM)";
            }

            // Séparer les heures et les minutes
            const [heuresStr, minutesStr] = heureDepart.split(':');
            let heures = parseInt(heuresStr, 10);
            let minutes = parseInt(minutesStr, 10);

            // Ajouter les minutes
            const totalMinutes = heures * 60 + minutes + minutesAAjouter;

            // Calculer les nouvelles heures et minutes
            const nouvellesHeures = Math.floor(totalMinutes / 60) % 24;
            const nouvellesMinutes = totalMinutes % 60;

            // Formatter le résultat en HH:MM avec des zéros initiaux si nécessaire
            const heureArriveeFormattee =
                `${String(nouvellesHeures).padStart(2, '0')}:${String(nouvellesMinutes).padStart(2, '0')}`;

            return heureArriveeFormattee;
        }

        //cette fonction recupere et retourne la durée passé en url 
        function getUrlParams(variable_name) {
            const urlParams = new URLSearchParams(window.location.search)
            const variable = urlParams.get(variable_name);
            return variable;
        }


        $('#start_hour').on('change', function() {
            const start_hour = $(this).val();
            const duration = parseInt(getUrlParams("duration"));

            const end_hour = getEndHour(start_hour, duration);
            $('#end_hour').val(end_hour);
        });
    </script>
@endsection
