import React from "react";
import { useForm } from "@inertiajs/react"; // Cette ligne est la source de l'erreur précédente
import { useRouteContext } from "../../../contexts/RouteContext";
const Login = () => {
    // Initialise l'état du formulaire en utilisant le hook useForm d'Inertia
    // Il gère les données du formulaire, l'état de traitement et les erreurs du backend
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });
    const route = useRouteContext();
    // Gère les changements des champs de saisie, mettant à jour les données du formulaire
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoie une requête POST à la route 'admin/do_login'
        // Cela suppose que vous avez une route nommée 'admin.do_login'
        // Sinon, vous pouvez utiliser une URL directe comme '/admin/do_login'
        post(route("admin.auth.do_login"), {
            onError: () => {
                console.log("Error");
            },
            onSuccess: () => {
                console.log("Success");
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
            <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Connexion au Dashboard
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Champ de saisie Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200
                                ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }
                            `}
                        />
                        {/* Affiche l'erreur de validation de l'email */}
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Champ de saisie Mot de passe */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200
                                ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }
                            `}
                        />
                        {/* Affiche l'erreur de validation du mot de passe */}
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Erreur générale du formulaire (ex: "Identifiants invalides") */}
                    {errors.message && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Erreur : </strong>
                            <span className="block sm:inline">
                                {errors.message}
                            </span>
                        </div>
                    )}

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        disabled={processing} // Désactive le bouton pendant la soumission du formulaire
                        className={`w-full py-2.5 font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200
                            ${processing && "opacity-75 cursor-not-allowed"}
                        `}
                    >
                        {processing ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
