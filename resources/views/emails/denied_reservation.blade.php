<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Réservation Refusée</title>
</head>

<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6fb; padding: 32px;">
    <div
        style="max-width: 520px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 16px rgba(44,62,80,0.08); padding: 36px 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" alt="Refusé" width="56"
                style="margin-bottom: 12px;">
            <h2 style="color: #d32f2f; margin: 0 0 8px 0; font-weight: 600; font-size: 1.6rem;">Réservation refusée</h2>
        </div>
        <p style="font-size: 1.08rem; color: #333; margin-bottom: 18px;">
            Bonjour <span style="font-weight: 500;">{{ $data_reservation->user->name ?? 'Client' }}</span>,
        </p>
        <p style="color: #555; margin-bottom: 14px;">
            Nous sommes au regret de vous informer que votre demande de réservation n'a pas pu être acceptée.
        </p>
        <p style="color: #555; margin-bottom: 18px;">
            Merci de l'intérêt que vous portez à nos services. N'hésitez pas à nous contacter pour toute question ou à
            effectuer une nouvelle demande à une autre date.
        </p>
        <div style="border-top: 1px solid #eee; margin-top: 28px; padding-top: 16px; color: #888; font-size: 0.98rem;">
            Cordialement,<br>
            <span style="color: #2d3e50; font-weight: 500;">L'équipe Teranga Shuttle</span>
        </div>
    </div>
</body>

</html>
