@extends('emails.template')

@section('title', 'Nouvelle Demande de Devis')

@section('style')
    <style>
        /* Styles généraux pour le corps de l'e-mail - déjà dans le template body */
        /* .container est déjà stylisé dans le template */

        /* Titre principal (déjà dans le template, mais peut être surchargé si besoin) */
        h1 {
            color: #1d4ed8;
            /* blue-700 */
            border-bottom: 1px solid #e5e7eb;
            /* gray-200 */
            padding-bottom: 16px;
            /* p-4 */
            margin-bottom: 24px;
            /* mb-6 */
            text-align: center;
            font-size: 28px;
            /* text-3xl */
            font-weight: 700;
            /* font-bold */
        }

        .section-title {
            color: #1f2937;
            /* gray-900 */
            margin-top: 24px;
            /* mt-6 */
            margin-bottom: 12px;
            /* mb-3 */
            font-weight: 600;
            /* font-semibold */
            font-size: 20px;
            /* text-xl */
            border-bottom: 1px solid #e5e7eb;
            /* border-b border-gray-200 */
            padding-bottom: 8px;
            /* pb-2 */
        }

        .info {
            margin-bottom: 8px;
            /* mb-2 */
            font-size: 16px;
            /* text-base */
            color: #374151;
            /* gray-700 */
        }

        .info strong {
            display: inline-block;
            min-width: 140px;
            /* Augmenté pour aligner les valeurs */
            font-weight: 600;
            /* font-semibold */
            color: #1f2937;
            /* gray-900 */
        }

        .details-card {
            /* Renommé de .details pour plus de clarté */
            background-color: #eff6ff;
            /* blue-50 */
            padding: 20px;
            /* p-5 */
            border-radius: 8px;
            /* rounded-lg */
            border: 1px solid #bfdbfe;
            /* border-blue-200 */
            margin-bottom: 24px;
            /* mb-6 */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            /* shadow-sm */
        }

        .paragraph {
            margin-bottom: 20px;
            /* mb-5 */
            font-size: 16px;
            /* text-base */
            color: #374151;
            /* gray-700 */
        }

        .footer-text {
            text-align: center;
            color: #6b7280;
            /* gray-500 */
            margin-top: 24px;
            /* mt-6 */
            font-size: 14px;
            /* text-sm */
        }

        /* Responsive adjustments (limited for email clients) */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                border-radius: 0 !important;
                box-shadow: none !important;
            }

            td[align="center"] {
                padding: 0 !important;
            }

            td[style*="padding"] {
                padding: 16px !important;
            }

            .section-title {
                font-size: 18px !important;
            }

            .info {
                font-size: 15px !important;
            }
        }
    </style>
@endsection

@section('app-title')
    <span>Nouvelle demande de devis</span>
@endsection

@section('content')
    <p class="paragraph" style="margin-bottom: 20px; font-size: 16px; color: #374151;">Une nouvelle demande de devis a été
        soumise via le site web. Voici les détails :</p>

    <div class="details-card"
        style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe; margin-bottom: 24px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
        <h2 class="section-title"
            style="color: #1f2937; margin-top: 0; margin-bottom: 12px; font-weight: 600; font-size: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            Informations du Trajet</h2>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Numéro de devis:</strong>
            {{ $devis->id }}</div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Départ:</strong>
            {{ $devis->start }} </div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Destination:</strong>
            {{ $devis->destination }} </div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Date:</strong>
            {{ $devis->start_date }} </div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Heure:</strong>
            {{ $devis->start_hour }} </div>
    </div>

    <div class="details-card"
        style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe; margin-bottom: 24px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
        <h2 class="section-title"
            style="color: #1f2937; margin-top: 0; margin-bottom: 12px; font-weight: 600; font-size: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            Informations Client</h2>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Nom du Client:</strong>
            {{ $devis->user->name }}</div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Téléphone:</strong>
            {{ $devis->user->phone }}</div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Email:</strong>
            {{ $devis->user->email }}</div>
    </div>

    <div class="details-card"
        style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe; margin-bottom: 24px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
        <h2 class="section-title"
            style="color: #1f2937; margin-top: 0; margin-bottom: 12px; font-weight: 600; font-size: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            Détails Supplémentaires</h2>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Nombre de
                Places:</strong> {{ $devis->places }} </div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Bagages:</strong>
            {{ $devis->luggages }} </div>
        <div class="info" style="margin-bottom: 8px; font-size: 16px; color: #374151;"><strong
                style="display: inline-block; min-width: 140px; font-weight: 600; color: #1f2937;">Plus d'infos:</strong>
            {{ $devis->subject }} </div>
    </div>

    <p class="footer-text" style="text-align: center; color: #6b7280; margin-top: 24px; font-size: 14px;">Nous vous
        contacterons sous peu pour discuter de votre demande !</p>
@endsection
