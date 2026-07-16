import React, { FormEvent } from "react";
import { useForm, Head } from "@inertiajs/react";
import { Lock, Mail, Loader2, LogIn } from "lucide-react";

export default function Login() {
    // Initialisation du formulaire avec le hook d'Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Envoi des données vers la méthode login du AuthController
        post(route("admin.auth.do-login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Connexion Administration" />

            <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-800 p-8 shadow-xl border border-slate-700">
                    {/* En-tête */}
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                            <LogIn className="h-6 w-6" />
                        </div>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                            Espace Client
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Connectez-vous pour accéder au tableau de bord
                        </p>
                    </div>

                    {/* Formulaire */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 rounded-md">
                            {/* Champ Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-300"
                                >
                                    Adresse Email
                                </label>
                                <div className="relative mt-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className={`block w-full rounded-lg border bg-slate-900 py-2.5 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
                                            errors.email
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-slate-700 focus:border-indigo-500"
                                        }`}
                                        placeholder="admin@exemple.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Champ Mot de passe */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-300"
                                >
                                    Mot de passe
                                </label>
                                <div className="relative mt-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`block w-full rounded-lg border bg-slate-900 py-2.5 pl-10 pr-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
                                            errors.password
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-slate-700 focus:border-indigo-500"
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-400">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Se souvenir de moi */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-800"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-slate-400"
                                >
                                    Se souvenir de moi
                                </label>
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition-colors duration-200"
                            >
                                {processing ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    "Se connecter"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
