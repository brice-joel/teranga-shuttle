<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message - Teranga Shuttle</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #333333; margin: 0; padding: 0; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f6f8; padding-bottom: 40px; padding-top: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .header { background-color: #0f172a; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
        .header span { color: #38bdf8; font-weight: bold; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .content h2 { color: #0f172a; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .info-table td { padding: 10px 0; vertical-align: top; }
        .info-table td.label { font-weight: bold; color: #64748b; width: 120px; }
        .info-table td.value { color: #0f172a; }
        .message-box { background-color: #f8fafc; border-left: 4px solid #38bdf8; padding: 20px; border-radius: 0 4px 4px 0; font-style: italic; color: #334155; }
        .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>Teranga <span>Shuttle</span></h1>
            </div>

            <!-- Content -->
            <div class="content">
                <h2>Nouveau message reçu</h2>
                <p>Vous avez reçu une nouvelle demande depuis le formulaire de contact de votre site web.</p>
                
                <table class="info-table">
                    <tr>
                        <td class="label">Nom :</td>
                        <td class="value">{{ $data['name'] }}</td>
                    </tr>
                    <tr>
                        <td class="label">Adresse e-mail :</td>
                        <td class="value"><a href="mailto:{{ $data['email'] }}" style="color: #38bdf8; text-decoration: none;">{{ $data['email'] }}</a></td>
                    </tr>
                </table>

                <div class="message-box">
                    <strong>Message :</strong><br>
                    {!! nl2br(e($data['message'])) !!}
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                Ce message a été généré automatiquement par le site Teranga Shuttle.<br>
                &copy; {{ date('Y') }} Teranga Shuttle. Tous droits réservés.
            </div>
        </div>
    </div>
</body>
</html>
