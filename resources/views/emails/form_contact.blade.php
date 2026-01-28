<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de Contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #c09407;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }

        .info {
            margin-bottom: 20px;
        }

        .info strong {
            display: block;
            margin-bottom: 5px;
        }

        .message {
            background-color: #f8f8f8;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #eee;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Nouveau Message de Contact</h1>

        <div class="info">
            <strong>Nom:</strong> {{ $data['name'] }}
        </div>

        <div class="info">
            <strong>Email:</strong> {{ $data['email'] }}
        </div>

        <div class="info">
            <strong>Téléphone:</strong> {{ $data['phone'] }}
        </div>


        <div class="message">
            <strong>Message:</strong>
            <p>{{ $data['message'] }}</p>
        </div>

        <div class="footer">
            <p>Cet email a été envoyé via le formulaire de contact de teranga-shuttle.</p>
        </div>
    </div>
</body>

</html>
