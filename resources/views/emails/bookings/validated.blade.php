<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réservation validée - Teranga Shuttle</title>
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
                        </td>
                    </tr>

                    <!-- Contenu -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            <!-- Salutations -->
                            <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 22px; font-weight: 700;">
                                🎉 Félicitations, {{ $booking->user->name }} !
                            </h2>

                            <!-- Message de validation -->
                            <p style="margin: 0 0 24px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                                Votre demande de réservation chez <strong>Teranga Shuttle</strong> a été examinée et
                                <strong style="color: #16a34a;">validée</strong> par notre équipe. Nous sommes ravis de
                                vous accompagner pour votre prochain trajet.
                            </p>

                            <!-- Sous-titre Détails -->
                            <h3
                                style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                Détails du trajet
                            </h3>

                            <!-- Tableau récapitulatif -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 14px; color: #334155;">
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;" width="35%">Type de
                                        service</td>
                                    <td style="padding: 6px 0; font-weight: 600; color: #1e293b; text-align: right;">
                                        {{ $booking->type === 'course_fixed' ? 'Course' : ($booking->type === 'event_hourly' ? "Location à l'heure" : '') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b; vertical-align: top;">
                                        Départ</td>
                                    <td style="padding: 6px 0; color: #1e293b; text-align: right;">
                                        📍 {{ $booking->pickup_address }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b; vertical-align: top;">
                                        Destination</td>
                                    <td style="padding: 6px 0; color: #1e293b; text-align: right;">
                                        🏁 {{ $booking->dropoff_address }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Date & Heure</td>
                                    <td style="padding: 6px 0; color: #1e293b; text-align: right; font-weight: 600;">
                                        📅
                                        {{ \Carbon\Carbon::parse($booking->start_time)->locale('fr')->isoFormat('LLLL') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding-top: 12px; border-top: 1px solid #e2e8f0;"></td>
                                </tr>
                                <tr>
                                    <td style="font-size: 15px; font-weight: 700; color: #0f172a;">Montant total</td>
                                    <td style="font-size: 16px; font-weight: 800; color: #1e293b; text-align: right;">
                                        {{ number_format($booking->total_amount, 0, ',', ' ') }} CFA
                                    </td>
                                </tr>
                            </table>

                            <!-- Bloc Note de Paiement Recommandé -->
                            <div
                                style="background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 14px; margin-bottom: 28px;">
                                <p
                                    style="margin: 0; font-size: 14px; color: #b45309; line-height: 1.5; font-weight: 500;">
                                    ⚠️ <strong>Action requise :</strong> Pour confirmer définitivement votre
                                    réservation, merci de procéder au règlement via votre tableau de bord.
                                </p>
                            </div>

                            <!-- Bouton de paiement -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="margin-bottom: 32px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ route('booking.index') }}"
                                            style="display: inline-block; padding: 14px 32px; background-color: #f59e0b; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);">
                                            Procéder au paiement
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Questions & Signature -->
                            <p style="margin: 0 0 16px 0; font-size: 14px; color: #64748b;">
                                Si vous avez des questions, n'hésitez pas à nous contacter.
                            </p>
                            <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;">
                                Merci de nous faire confiance,<br>
                                <span style="font-weight: 600; color: #1e293b;">L'équipe <span
                                        style="color: #f59e0b;">Teranga Shuttle</span></span>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                Teranga Shuttle — Votre confort, notre priorité.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
