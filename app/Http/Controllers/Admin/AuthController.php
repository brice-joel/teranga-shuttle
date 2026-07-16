<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class AuthController extends Controller
{
    //
    public function login()
    {
        return inertia('Admin/Auth/Login');
    }
    /**
     * Traiter la tentative de connexion d'un administrateur.
     */
    public function doLogin(Request $request): RedirectResponse
    {
        // Validation des champs reçus depuis React
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'L\'adresse email doit être valide.',
            'password.required' => 'Le mot de passe est obligatoire.',
        ]);

        $remember = $request->boolean('remember');

        // Tentative de connexion via le guard par défaut
        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            // Vérification stricte du rôle
            if (Auth::user()->role === 'admin') {
                return redirect()->intended(route('admin.index'))->with('success', 'Connexion réussie. Bienvenue dans votre espace d\'administration !');
            }

            // Si un client tente de se connecter ici, déconnexion forcée et redirection vers son espace
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('user.home')
                ->with('error', 'Accès refusé : cet espace est réservé aux administrateurs.');
        }

        // Retourner une erreur d'authentification à l'interface React
        return back()->withErrors([
            'email' => 'Erreur d\'authentification.',
        ])->onlyInput('email');
    }

    /**
     * Déconnecter l'administrateur.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        // Sécurisation de la session après déconnexion
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.auth.login')->with('success', 'Vous avez été déconnecté avec succès.');
    }
}
