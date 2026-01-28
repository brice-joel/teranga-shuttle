@php
    function minutesToHoursMinutes($minutes)
    {
        $heures = floor($minutes / 60);
        $minutesRestantes = $minutes % 60;

        return sprintf('%d heure(s) %d minute(s)', $heures, $minutesRestantes);
    }
@endphp


@extends('emails.template')
@section('title', 'confirmation de réservation')

@section('style')
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #97690d;
            border-bottom: 2px solid #eee;
            padding-bottom: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .section-title {
            color: #97690d;
            margin-top: 25px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .info {
            margin-bottom: 20px;
        }

        .info strong {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .details {
            background-color: #f0f8ff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            color: #777;
        }
    </style>
@endsection

@section('app-title')
    <span>Confirmation de réservation </span>
@endsection

@section('content')


    <div class="container">

        <div class="details">
            <h2 class="section-title">Informations de Réservation</h2>
            <div class="info"><strong>Numéro de Réservation:</strong> {{ $data_reservation->id }}</div>
            <div class="info"><strong>Réservation:</strong>
                @if ($data_reservation->type == 'trajet')
                    {{ $data_reservation->start }} -> {{ $data_reservation->destination }}
                @endif
                @if ($data_reservation->type == 'ride')
                    {{ $data_reservation->label }}
                @endif
            </div>
            <div class="info"><strong>Type de Réservation:</strong> {{ $data_reservation->type }}</div>
            <div class="info"><strong>Date:</strong> {{ $data_reservation->start_date }} </div>
            <div class="info"><strong>Heure:</strong> {{ $data_reservation->start_hour }} </div>
            <div class="info"><strong>Durée:</strong> {{ minutesToHoursMinutes($data_reservation->duration) }} </div>
            <div class="info"><strong>Prix :</strong> {{ $data_reservation->price }} XOF</div>
        </div>

        <div class="details">
            <h2 class="section-title">Informations Client</h2>
            <div class="info"><strong>Nom du Client:</strong> {{ $data_reservation->name }}</div>
            <div class="info"><strong>Téléphone:</strong> {{ $data_reservation->phone }}</div>
            <div class="info"><strong>Email:</strong>{{ $data_reservation->email }}</div>
        </div>

        <div class="details">
            <h2 class="section-title">Détails Supplémentaires</h2>
            <div class="info"><strong>Nombre de Personnes:</strong> {{ $data_reservation->places }} personnes</div>
            <div class="info"><strong>Bagages:</strong> {{ $data_reservation->luggage }} </div>
            <div class="info"><strong>Voiture:</strong> Mercedez Classe V220 </div>
        </div>

        <div class="footer">
            <p>Merci pour votre réservation !</p>
        </div>
    </div>

@endsection
