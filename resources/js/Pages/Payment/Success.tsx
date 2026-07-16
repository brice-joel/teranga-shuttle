import { Link } from "@inertiajs/react";
import React from "react";

export default function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-xl w-full bg-white shadow rounded-lg p-8 text-center">
                <h1 className="text-3xl font-semibold text-green-700 mb-4">
                    Paiement validé avec succès
                </h1>
                <p className="text-gray-600 mb-6">
                    Merci ! Votre paiement a été traité avec succès. Vous pouvez
                    fermer cette page ou revenir à l'accueil.
                </p>
                <Link
                    href={route("home")}
                    className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
