<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormResquest;
use App\Http\Requests\RegisterFormRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;



class AuthController extends Controller
{
    //
    public function register()
    {
        return inertia('auth/Register');
    }

    public function doRegister(RegisterFormRequest $request)
    {
        // La validation est gérée par RegisterFormRequest.
        // Si la validation échoue (y compris le reCAPTCHA), le code s'arrête ici
        // et redirige avec les erreurs.
        $validatedData = $request->validated();

        // Créer un nouvel utilisateur.
        // Note : 'g-recaptcha-response' n'est pas inclus ici car il n'est pas une colonne de la table 'users'.
        // Il est géré par la validation dans RegisterFormRequest.
        $user = User::create([
            'name' => $validatedData['name'], // Assurez-vous que 'name' est validé dans RegisterFormRequest
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'phone' => $validatedData['phone'] ?? null, // Assurez-vous que 'phone' est validé ou optionnel
        ]);

        // Connecter l'utilisateur nouvellement créé
        Auth::login($user);

        // Rediriger vers la page d'accueil ou une autre page après inscription réussie
        return redirect()->route('index')->with('success', 'Inscription réussie !');
    }

    public function login()
    {
        return inertia('auth/Login');
    }
    public function doLogin(LoginFormResquest $request)
    {
        // Les données sont validées ici, y compris 'g-recaptcha-response'
        // Si la validation échoue (y compris le reCAPTCHA), le code s'arrête ici
        // et redirige avec les erreurs.
        $validatedData = $request->validated();


        // Exclure 'g-recaptcha-response' des identifiants
        // car ce n'est pas une colonne de la table 'users'.
        $credentials = [
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ];

        // Récupérer la valeur du champ 'remember'
        $remember = $request->has('remember');

        // Tenter l'authentification avec les identifiants corrects
        if (Auth::attempt($credentials, $remember)) {
            // Régénérer la session pour des raisons de sécurité
            $request->session()->regenerate();

            // Rediriger l'utilisateur vers la page prévue ou l'index
            return redirect()->intended(route('index'))->with('success', 'Connexion réussie !');
        }

        // Si l'authentification échoue, rediriger avec des erreurs
        return back()->withErrors([
            'password' => 'Identifiant ou mot de passe incorrect',
        ])->onlyInput('password', 'email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('index')->with('success', 'Deconnexion réussie !');
    }
}
