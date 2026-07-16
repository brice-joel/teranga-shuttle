<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annulation de votre réservation - Teranga Shuttle</title>
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
                            <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 20px; font-weight: 700;">
                                Bonjour {{ $booking->user->name }},
                            </h2>

                            <!-- Bloc Alerte Annulation -->
                            <div
                                style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                                <p style="margin: 0; font-size: 15px; color: #991b1b; line-height: 1.6;">
                                    Nous vous informons que votre réservation <strong
                                        style="color: #7f1d1d;">#{{ $booking->id }}</strong> pour le trajet du
                                    <strong>{{ \Carbon\Carbon::parse($booking->start_time)->format('d/m/Y') }}</strong>
                                    a été <strong>annulée</strong>.
                                </p>
                            </div>

                            <!-- Message d'assistance -->
                            <p style="margin: 0 0 32px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                                Si cette annulation ne provient pas de votre propre initiative ou si vous souhaitez
                                obtenir plus de précisions, notre service client reste à votre entière disposition pour
                                vous assister.
                            </p>

                            <!-- Bouton d'action principal -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                style="margin-bottom: 32px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ route('home') }}"
                                            style="display: inline-block; padding: 14px 28px; background-color: #1e293b; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(30, 41, 59, 0.2);">
                                            Réserver un autre trajet
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Formule de politesse -->
                            <p style="margin: 0 0 4px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                                Nous espérons avoir le plaisir de vous revoir bientôt à bord de nos véhicules.
                            </p>
                            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1e293b;">
                                Cordialement,<br>
                                <span style="color: #f59e0b;">L'équipe Teranga Shuttle</span>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                Besoin d'aide immédiate ? Contactez notre support via votre espace client.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
