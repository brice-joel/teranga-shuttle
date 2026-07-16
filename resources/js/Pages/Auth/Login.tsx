import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { LogIn } from "lucide-react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion - Teranga Shuttle" />

            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    Bon retour parmi{" "}
                    <span className="italic font-serif text-amber-500">
                        Nous
                    </span>
                </h1>
                <p className="text-sm text-slate-500 font-light">
                    Connectez-vous à votre espace client
                </p>
            </div>

            {status && (
                <div className="mb-6 text-center text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2"
                    >
                        Adresse Email
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 shadow-sm transition-colors"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder=""
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2"
                    >
                        Mot de passe
                    </label>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 shadow-sm transition-colors"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                        />
                        <span className="ms-2 text-sm text-slate-500 group-hover:text-slate-800 transition-colors">
                            Se souvenir de moi
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors"
                        >
                            Mot de passe oublié ?
                        </Link>
                    )}
                </div>

                <div className="pt-2 space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 bg-slate-950 text-white rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg shadow-slate-950/10 disabled:opacity-50 active:scale-95"
                    >
                        {processing ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <LogIn className="w-4 h-4" />
                                Se connecter
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Pas encore inscrit ?{" "}
                        <Link
                            href={route("register")}
                            className="font-bold text-slate-900 hover:text-amber-500 transition-colors"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
