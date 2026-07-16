<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre demande de devis</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 24px 0;">
        <tr>
            <td align="center">
                <!-- Conteneur Principal -->
                <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0"
                    style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">

                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0f172a; padding: 32px; text-align: center;">
                            <h1
                                style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px;">
                                Teranga <span
                                    style="color: #f59e0b; font-style: italic; font-weight: 500;">Shuttle</span>
                            </h1>
                        </td>
                    </tr>

                    <!-- Corps du message -->
                    <tr>
                        <td style="padding: 40px 32px; color: #334155;">
                            <h2 style="margin-top: 0; font-size: 20px; color: #0f172a; font-weight: 700;">Bonjour
                                {{ $devis->user_name }},</h2>
                            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
                                Nous vous remercions pour votre confiance. Votre demande de devis a bien été enregistrée
                                et transmise à notre équipe de chauffeurs privés.
                            </p>
                            <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 32px;">
                                Un conseiller étudie actuellement votre itinéraire pour vous proposer le meilleur tarif
                                sous 24h.
                            </p>

                            <!-- Récapitulatif du Devis -->
                            <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px;">
                                <h3
                                    style="margin-top: 0; margin-bottom: 16px; font-size: 15px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Détails de votre demande :</h3>

                                <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                    style="font-size: 14px; line-height: 2;">
                                    <tr>
                                        <td width="40%" style="color: #64748b; font-weight: 600;">Prestation :</td>
                                        <td style="color: #0f172a; font-weight: bold;">
                                            {{ $devis->type === 'event_hourly'
                                                ? 'Location Horaire'
                                                : (($devis->type === 'course_fixed'
                                                        ? 'Course'
                                                        : $devis->type === 'event_hourly')
                                                    ? 'Location Horaire'
                                                    : '') }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #64748b; font-weight: 600;">Départ :</td>
                                        <td style="color: #0f172a;">{{ $devis->pickup_address }}</td>
                                    </tr>
                                    @if ($devis->type !== 'event_hourly')
                                        <tr>
                                            <td style="color: #64748b; font-weight: 600;">Destination :</td>
                                            <td style="color: #0f172a;">{{ $devis->dropoff_address }}</td>
                                        </tr>
                                    @endif
                                    <tr>
                                        <td style="color: #64748b; font-weight: 600;">Date & Heure :</td>
                                        <td style="color: #0f172a;">
                                            {{ \Carbon\Carbon::parse($devis->start_time)->format('d/m/Y à H:i') }}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #64748b; font-weight: 600;">Passagers :</td>
                                        <td style="color: #0f172a;">{{ $devis->adults_count }} personne(s)</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #64748b; font-weight: 600;">Bagages :</td>
                                        <td style="color: #0f172a;">{{ $devis->luggage_count }} valise(s)</td>
                                    </tr>
                                    @if ($devis->notes)
                                        <tr>
                                            <td valign="top"
                                                style="color: #64748b; font-weight: 600; padding-top: 4px;">Vos notes :
                                            </td>
                                            <td
                                                style="color: #475569; font-style: italic; line-height: 1.4; padding-top: 4px;">
                                                "{{ $devis->notes }}"</td>
                                        </tr>
                                    @endif
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #0f172a; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #1e293b;">
                            <p style="margin: 0;">© 2026 Teranga Shuttle Sénégal. Tous droits réservés.</p>
                            <p style="margin: 4px 0 0 0;">Besoin d'aide ? Contactez-nous à contact@teranga-shuttle.sn
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
