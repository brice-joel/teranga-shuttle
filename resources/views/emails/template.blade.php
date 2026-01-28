<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 10px;
            background-color: #000000;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
        }

        .code {
            display: block;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #000000;
            margin: 20px 0;
        }

        .btn {
            display: block;
            width: 100%;
            text-align: center;
            padding: 10px 0;
            background-color: #000000;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 16px;
        }

        .text-gray-500 {
            color: #6b7280;
        }

        .text-gray-700 {
            color: #374151;
        }

        .text-2xl {
            font-size: 1.5rem;
        }

        .text-center {
            text-align: center;
        }

        footer {
            text-align: center;
            padding: 10px;
        }
    </style>

    @yield('style')
</head>

<body>
    <div class="container">
        <div class="text-center mb-6">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo de l'entreprise" class="mx-auto mb-4">
            <h1 class="text-2xl  text-gray-700">@yield('app-title')</h1>
            <p class="text-gray-500">Teranga Shuttle</p>
            <p class="text-gray-500">Dakar, Sénégal</p>
            <p class="text-gray-500">Email: info@teranga-shuttle.com | Téléphone: +225 123 456 789</p>
        </div>
        <div class="header">
            <h1>@yield('app-title')</h1>
        </div>
        <div class="content">
            @yield('content')
            <hr>
            <hr>
            <hr>
            <p>Si vous n'avez pas initié cette action, veuillez ignorer cet email.</p>
        </div>
    </div>
    <footer>
        Cordialement,<br>L'équipe de support
    </footer>
</body>

</html>
