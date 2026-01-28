<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmResetPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    /**
     * Affiche le formulaire de mot de passe oublié.
     */
    public function showLinkRequestForm()
    {
        return Inertia::render('auth/ForgotPassword');
    }

    /**
     * Envoie le lien de réinitialisation.
     */
    public function sendResetLinkEmail(Request $request)
    {
        // Validation de l'e-mail
        $request->validate(['email' => 'required|email']);

        // On utilise la fonction 'sendResetLink' de Laravel
        $response = Password::broker()->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
            ? back()->with('success', __($response) . ' verify your email at ' . $request->email)
            : back()->withErrors(['email' => __($response)]);
    }

    public function showResetForm(Request $request)
    {
        return inertia('auth/ResetPassword', [
            'email' => $request->query('email'),
            'token' => $request->route('token'),
        ]);
    }

    public function reset(Request $request)
    {
        // 1. Validation des données
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        // 2. Utilisation du broker de mot de passe de Laravel
        $response = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                Mail::to($user->email)->send(new ConfirmResetPasswordMail());
            }
        );

        if ($response == Password::PASSWORD_RESET) {
            return redirect()->route('auth.login')->with('success', __($response));
        }

        return back()->withErrors(['email' => __($response)]);
    }
}
