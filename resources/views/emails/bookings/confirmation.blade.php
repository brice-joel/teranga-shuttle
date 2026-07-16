<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de Réservation - Teranga Shuttle</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            width: 100% !important;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        .wrapper {
            background-color: #f4f6f8;
            padding: 30px 15px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .header {
            background-color: #1a2530;
            padding: 30px;
            text-align: center;
            color: #ffffff;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #f39c12;
        }

        .content {
            padding: 30px;
        }

        .welcome-text {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 15px;
            font-weight: 700;
            color: #1a2530;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #f4f6f8;
            padding-bottom: 8px;
            margin-top: 25px;
            margin-bottom: 15px;
        }

        .info-table td {
            padding: 8px 0;
            font-size: 14px;
            vertical-align: top;
        }

        .label {
            color: #7f8c8d;
            width: 40%;
            font-weight: 500;
        }

        .value {
            color: #2c3e50;
            font-weight: 600;
            width: 60%;
        }

        .badge {
            background-color: #e8f8f5;
            color: #2ecc71;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 700;
            display: inline-block;
        }

        .invoice-table {
            margin-top: 25px;
            background-color: #f8f9fa;
            border-radius: 6px;
        }

        .invoice-table td {
            padding: 15px 20px;
        }

        .total-label {
            font-size: 16px;
            color: #1a2530;
            font-weight: 700;
        }

        .total-amount {
            font-size: 18px;
            color: #1a2530;
            font-weight: 800;
            text-align: right;
        }

        .secure-text {
            font-size: 11px;
            color: #95a5a6;
            font-style: italic;
            margin-top: 2px;
            text-align: right;
        }

        .footer {
            background-color: #f4f6f8;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            color: #7f8c8d;
            line-height: 1.5;
        }

        .footer a {
            color: #1a2530;
            text-decoration: underline;
        }
    </style>
</head>

<body>

    <table class="wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table class="container" cellspacing="0" cellpadding="0">

                    <!-- HEADER -->
                    <tr>
                        <td class="header">
                            <h1>TERANGA SHUTTLE</h1>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8; color: #ffffff;">Votre chauffeur
                                privé en toute sérénité</p>
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td class="content">
                            <p class="welcome-text">
                                Bonjour <strong>{{ $data['user_name'] }}</strong>,<br><br>
                                Merci pour votre confiance ! Votre réservation auprès de <strong>Teranga
                                    Shuttle</strong> a été enregistrée avec succès. Vous trouverez ci-dessous le
                                récapitulatif complet de votre voyage.
                            </p>

                            <!-- DETAILS DU TRANSPORT -->
                            <div class="section-title">🚗 Détails du Transport</div>
                            <table class="info-table" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="label">Type de réservation</td>
                                    <td class="value">{{ $data['booking_type'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Véhicule</td>
                                    <td class="value"><span class="badge">Mercedes-Benz V-Class 220D</span></td>
                                </tr>
                                <tr>
                                    <td class="label">Départ</td>
                                    <td class="value">{{ $data['booking_pickup_address'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Arrivée</td>
                                    <td class="value">{{ $data['booking_dropoff_address'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Type de service</td>
                                    <td class="value">{{ $data['booking_type'] }}</td>
                                </tr>
                            </table>

                            <!-- HORAIRES -->
                            <div class="section-title">📅 Horaires & Durée</div>
                            <table class="info-table" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="label">Heure de début</td>
                                    <td class="value">{{ $data['booking_start_time'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Heure de fin</td>
                                    <td class="value">{{ $data['booking_end_time'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Durée totale</td>
                                    <td class="value">{{ $data['booking_duration'] }} min</td>
                                </tr>
                            </table>

                            <!-- PASSAGERS -->
                            <div class="section-title">👥 Passagers & Bagages</div>
                            <table class="info-table" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="label">Nombre de personnes</td>
                                    <td class="value">{{ $data['nombre_personnes'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Nombre de bagages</td>
                                    <td class="value">{{ $data['nombre_bagages'] }}</td>
                                </tr>
                            </table>

                            <!-- COORDONNEES -->
                            <div class="section-title">📞 Vos Coordonnées</div>
                            <table class="info-table" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="label">Téléphone</td>
                                    <td class="value">{{ $data['user_phone'] }}</td>
                                </tr>
                                <tr>
                                    <td class="label">Email</td>
                                    <td class="value">{{ $data['user_email'] }}</td>
                                </tr>
                            </table>

                            <!-- PAIEMENT -->
                            <table class="invoice-table" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="total-label">Montant Total Payé</td>
                                    <td class="total-amount">
                                        {{ number_format($data['total_amount'], 0, ',', ' ') }} FCFA
                                        <div class="secure-text">🔒 Paiement Sécurisé</div>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td class="footer">
                            Pour toute modification ou annulation, veuillez contacter notre support client dès que
                            possible.<br><br>
                            Cordialement,<br>
                            <strong>L'équipe Teranga Shuttle</strong>
                            <p style="margin-top: 20px; font-size: 11px; color: #b3b3b3;">
                                Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>
