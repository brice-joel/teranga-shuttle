<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Devis Reçu</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 24px 0;">
        <tr>
            <td align="center">
                <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0"
                    style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">

                    <!-- Header Alerte -->
                    <tr>
                        <td style="background-color: #f59e0b; padding: 24px; text-align: center;">
                            <h1
                                style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                                🚖 Nouvelle Demande de Devis
                            </h1>
                        </td>
                    </tr>

                    <!-- Corps -->
                    <tr>
                        <td style="padding: 32px; color: #334155;">
                            <p style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0;">
                                Bonjour l'équipe Teranga,
                            </p>
                            <p style="font-size: 15px; color: #475569; line-height: 1.5;">
                                Un nouveau client vient de soumettre une demande de devis sur la plateforme. Voici ses
                                coordonnées et les critères de sa réservation :
                            </p>

                            <!-- Infos Client -->
                            <h3
                                style="font-size: 14px; color: #f59e0b; text-transform: uppercase; margin-top: 24px; margin-bottom: 8px;">
                                Informations Client</h3>
                            <table width="100%"
                                style="background-color: #fafafa; padding: 16px; border-radius: 8px; font-size: 14px; border-left: 4px solid #0f172a;">
                                <tr>
                                    <td width="30%" style="color: #64748b;">Nom :</td>
                                    <td style="font-weight: bold; color: #0f172a;">{{ $devis->user_name }}</td>
                                </tr>
                                <tr>
                                    <td style="color: #64748b;">Email :</td>
                                    <td><a href="mailto:{{ $devis->user_email }}"
                                            style="color: #2563eb; text-decoration: none;">{{ $devis->user_email }}</a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Infos Course -->
                            <h3
                                style="font-size: 14px; color: #f59e0b; text-transform: uppercase; margin-top: 24px; margin-bottom: 8px;">
                                Détails de la Course</h3>
                            <table width="100%"
                                style="background-color: #fafafa; padding: 16px; border-radius: 8px; font-size: 14px; border-left: 4px solid #f59e0b;">
                                <tr>
                                    <td width="30%" style="color: #64748b;">Type :</td>
                                    <td style="font-weight: bold;">
                                        {{ ($devis->type === 'course_fixed' ? 'Course' : $devis->type === 'event_hourly') ? 'Location Horaire' : '' }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #64748b;">Départ :</td>
                                    <td style="color: #0f172a; font-weight: 500;">{{ $devis->pickup_address }}</td>
                                </tr>
                                @if ($devis->type !== 'event_hourly')
                                    <tr>
                                        <td style="color: #64748b;">Destination :</td>
                                        <td style="color: #0f172a; font-weight: 500;">{{ $devis->dropoff_address }}</td>
                                    </tr>
                                @endif
                                <tr>
                                    <td style="color: #64748b;">Date prévue :</td>
                                    <td style="color: #b45309; font-weight: bold;">
                                        {{ \Carbon\Carbon::parse($devis->start_time)->format('d/m/Y à H:i') }}</td>
                                </tr>
                                <tr>
                                    <td style="color: #64748b;">Logistique :</td>
                                    <td>👥 {{ $devis->adults_count }} Pax | 🧳 {{ $devis->luggage_count }} Baggages</td>
                                </tr>
                            </table>

                            @if ($devis->notes)
                                <h3
                                    style="font-size: 14px; color: #f59e0b; text-transform: uppercase; margin-top: 24px; margin-bottom: 8px;">
                                    Message Particulier</h3>
                                <div
                                    style="background-color: #fffbeb; border: 1px solid #fef3c7; padding: 16px; border-radius: 8px; font-size: 14px; font-style: italic; color: #78350f;">
                                    "{{ $devis->notes }}"
                                </div>
                            @endif

                            <!-- CTA Dashboard (Optionnel) -->
                            <div style="text-align: center; margin-top: 32px;">
                                <a href="{{ route('admin.index') }}"
                                    style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 14px;">
                                    Ouvrir le Dashboard
                                </a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
