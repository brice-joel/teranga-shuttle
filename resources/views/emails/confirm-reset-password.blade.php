<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de changement de mot de passe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #16191d;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }

        .content p {
            margin: 0 0 10px;
        }

        .content strong {
            color: #0c325c;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>Changement de mot de passe</h1>
        </div>
        <div class="content">
            <p>Bonjour ,</p>
            <p>Nous vous confirmons que le mot de passe de votre compte a été changé avec succès.</p>
            <p>Si ce changement a été effectué par vous, vous pouvez ignorer cet e-mail. Aucune autre action n'est
                requise de votre part.</p>
            <p>Si vous n'êtes pas à l'origine de ce changement, veuillez nous contacter immédiatement en répondant à cet
                e-mail.</p>
            <p>Pour votre sécurité, si vous pensez que votre compte a été compromis, nous vous recommandons de <a
                    href="{{ route('password.request') }}" style="color: #007BFF;">réinitialiser votre mot de passe à
                    nouveau.</a></p>
            <p>Cordialement,</p>
            <p>L'équipe de Authentica</p>
        </div>

    </div>
</body>

</html>
