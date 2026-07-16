<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Réservation - Teranga Shuttle</title>
</head>

<body
    style="margin: 0; padding: 0; width: 100%; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0"
        style="background-color: #f8fafc; padding: 20px 10px;">
        <tr>
            <td align="center">
                <!-- Conteneur Principal (Max width 600px pour emails) -->
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0"
                    style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0;">

                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1e293b; padding: 32px 24px; text-align: center;">
                            <h1
                                style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                                Teranga Shuttle
                            </h1>
                            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">
                                Notification Administrative
                            </p>
                        </td>
                    </tr>

                    <!-- Contenu -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            <!-- Titre de l'alerte -->
                            <h2
                                style="margin: 0 0 24px 0; color: #0f172a; font-size: 22px; font-weight: 700; text-align: center;">
                                🔔 Nouvelle demande de réservation
                            </h2>

                            <!-- Informations Client -->
                            <div
                                style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                                <p
                                    style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">
                                    Client</p>
                                <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1e293b;">
                                    {{ $booking->user->name }}
                                </p>
                                <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">
                                    {{ $booking->user->email }}
                                </p>
                            </div>

                            <!-- Détails de la course -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="margin-bottom: 24px; font-size: 15px; color: #334155; line-height: 1.6;">
                                <!-- Type de service -->
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;"
                                        width="35%">Type de service</td>
                                    <td
                                        style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; text-align: right;">
                                        @if ($booking->type === 'course_fixed')
                                            Trajet Fixe
                                        @elseif($booking->type === 'event_hourly')
                                            Location à l'heure
                                        @else
                                            Sur mesure
                                        @endif
                                    </td>
                                </tr>

                                <!-- Date & Heures -->
                                <tr>
                                    <td
                                        style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">
                                        Début</td>
                                    <td
                                        style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; text-align: right; font-size: 14px;">
                                        {{ \Carbon\Carbon::parse($booking->start_time)->locale('fr')->isoFormat('LLLL') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">
                                        Fin</td>
                                    <td
                                        style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; text-align: right; font-size: 14px;">
                                        {{ \Carbon\Carbon::parse($booking->end_time)->locale('fr')->isoFormat('LLLL') }}
                                    </td>
                                </tr>

                                <!-- Itinéraire -->
                                <tr>
                                    <td
                                        style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b; vertical-align: top;">
                                        Départ</td>
                                    <td
                                        style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; text-align: right; font-size: 14px;">
                                        📍 {{ $booking->pickup_address }}
                                    </td>
                                </tr>
                                @if ($booking->dropoff_address)
                                    <tr>
                                        <td
                                            style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b; vertical-align: top;">
                                            Destination</td>
                                        <td
                                            style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; text-align: right; font-size: 14px;">
                                            🏁 {{ $booking->dropoff_address }}
                                        </td>
                                    </tr>
                                @endif

                                <!-- Montant -->
                                <tr>
                                    <td
                                        style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0f172a; font-size: 16px;">
                                        Montant estimé</td>
                                    <td
                                        style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-weight: 800; color: #d97706; font-size: 18px; text-align: right;">
                                        {{ number_format($booking->total_amount, 0, ',', ' ') }} FCFA
                                    </td>
                                </tr>
                            </table>

                            <!-- Note additionnelle -->
                            @if ($booking->notes)
                                <div
                                    style="background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 12px 16px; margin-bottom: 32px;">
                                    <p
                                        style="margin: 0 0 4px 0; font-size: 12px; font-weight: 700; color: #b45309; text-transform: uppercase;">
                                        Note du client :</p>
                                    <p style="margin: 0; font-size: 14px; color: #78350f; font-style: italic;">
                                        "{{ $booking->notes }}"
                                    </p>
                                </div>
                            @endif

                            <!-- Bouton d'action principal -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="margin-top: 24px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ route('admin.index') }}"
                                            style="display: inline-block; padding: 14px 32px; background-color: #f59e0b; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3); transition: background-color 0.2s;">
                                            Accéder au Dashboard pour valider
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                Cet e-mail a été généré automatiquement par l'application Teranga Shuttle.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
