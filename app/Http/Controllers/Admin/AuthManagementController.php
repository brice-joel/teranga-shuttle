<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginManagementFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthManagementController extends Controller
{
    //
    public function login()
    {

        return inertia('admin/auth/Login');
    }
    public function doLogin(LoginManagementFormRequest $request)
    {

        $credentials = $request->validated();

        // dd($credentials);

        if (Auth::attempt($credentials)) {

            if (Auth::user()->role != 'admin') {
                return back()->withErrors([
                    'password' => "Vous n'êtes pas autorisé à vous connecté",
                ])->onlyInput('password', 'email');
            } else {
                $request->session()->regenerate();
                return redirect()->intended(route('admin.dashboard'))->with('success', 'Connexion réussie !');
            }
        }

        return back()->withErrors([
            'password' => 'Identifiant ou mot de passe incorrect',
        ])->onlyInput('password', 'email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.auth.login')->with('success', 'Déconnexion réussie !');
    }
}
