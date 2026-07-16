<?php

namespace App\Http\Middleware\Admin;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    /**
     * Gérer une requête entrante.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Vérifier si l'utilisateur est connecté
        if (!Auth::check()) {
            return redirect()->route('admin.auth.login');
        }

        // 2. Vérifier si l'utilisateur connecté possède le rôle 'admin'
        if (Auth::user()->role !== 'admin') {
            // Si c'est un utilisateur standard ('user'), redirection vers son interface
            return redirect()->route('login')
                ->with('error', "Vous n'avez pas l'autorisation d'accéder à cet espace.");
        }

        // 3. Autoriser la requête si l'utilisateur est admin
        return $next($request);
    }
}
