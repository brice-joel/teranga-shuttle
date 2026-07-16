import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { UserPlus } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription - Teranga Shuttle" />

            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    Créer un{" "}
                    <span className="italic font-serif text-amber-500">
                        Compte
                    </span>
                </h1>
                <p className="text-sm text-slate-500 font-light">
                    Rejoignez Teranga Shuttle pour réserver vos trajets
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2"
                    >
                        Nom complet
                    </label>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 shadow-sm transition-colors"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Jean Dupont"
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

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
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="jean.dupont@exemple.com"
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2"
                    >
                        Confirmer le mot de passe
                    </label>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-slate-900 focus:ring-slate-900 shadow-sm transition-colors"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        placeholder="••••••••"
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-4 space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 bg-slate-950 text-white rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg shadow-slate-950/10 disabled:opacity-50 active:scale-95"
                    >
                        {processing ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4" />
                                S'inscrire
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Vous avez déjà un compte ?{" "}
                        <Link
                            href={route("login")}
                            className="font-bold text-slate-900 hover:text-amber-500 transition-colors"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
