<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // if (!Auth::check()) {
        //     return redirect()->route('login');
        // }

        // Si c'est un admin, on lui interdit l'espace client
        if (Auth::check() && Auth::user()->role === 'admin') {
            return redirect()->route('admin.index')
                ->with('error', "Les administrateurs ne peuvent pas accéder à l'espace client.");
        }

        return $next($request);
    }
}
