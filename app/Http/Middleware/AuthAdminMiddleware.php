<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {

            /*
            if (!$request->expectsJson()) {
                // Stocker l'URL précédente dans la session
                session(['url.intended' => $request->fullUrl()]);
            }
                */

            // L'utilisateur n'est pas connecté, redirigez vers la page de connexion
            return redirect()->route('admin.auth.login');
        }
        // L'utilisateur est connecté, continuez la requête
        return $next($request);
    }
}
