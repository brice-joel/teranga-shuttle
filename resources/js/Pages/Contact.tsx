// resources/js/Pages/Contact.tsx
import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, useForm } from "@inertiajs/react";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("contact.form"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <UserLayout>
            <Head title="Contactez-nous - Teranga Shuttle" />

            {/* Header Page */}
            <section className="pt-32 pb-12 bg-slate-50/50 text-center px-6">
                <div className="inline-flex items-center gap-2 mb-4">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Support & Réservation
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Parlons de votre{" "}
                    <span className="italic font-serif text-amber-500 font-medium">
                        voyage.
                    </span>
                </h1>
                <p className="text-slate-500 max-w-lg mx-auto">
                    Notre équipe est à votre disposition 24/7 pour répondre à
                    vos demandes spécifiques et organiser vos déplacements
                    sur-mesure.
                </p>
            </section>

            {/* Main Content */}
            <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row border border-slate-100">
                    {/* Infos Contact (Dark Side) */}
                    <div className="bg-slate-950 p-10 md:p-16 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-10 tracking-tight">
                                Contact{" "}
                                <span className="italic font-serif text-amber-500">
                                    Direct
                                </span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                        <Phone className="w-5 h-5 text-amber-500 group-hover:text-slate-950" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                                            Téléphone & whatsapp
                                        </p>
                                        <p className="font-medium text-lg">
                                            +221 77 228 05 78
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                        <Mail className="w-5 h-5 text-amber-500 group-hover:text-slate-950" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                                            Email
                                        </p>
                                        <p className="font-medium text-lg">
                                            infos@terangashuttle.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                        <MapPin className="w-5 h-5 text-amber-500 group-hover:text-slate-950" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                                            Bureau
                                        </p>
                                        <p className="font-medium text-lg">
                                            Dakar Plateau, Sénégal
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire (Light Side) */}
                    <div className="p-10 md:p-16 md:w-3/5 bg-white">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    placeholder="Votre nom complet"
                                    className="w-full h-[60px] bg-slate-50 border border-slate-200 rounded-2xl px-6 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-medium text-sm transition-all placeholder:text-slate-400"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <input
                                    type="email"
                                    placeholder="Adresse email"
                                    className="w-full h-[60px] bg-slate-50 border border-slate-200 rounded-2xl px-6 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-medium text-sm transition-all placeholder:text-slate-400"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <textarea
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 h-40 resize-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-medium text-sm transition-all placeholder:text-slate-400"
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                    required
                                ></textarea>
                            </div>

                            <div className="md:col-span-2 pt-2">
                                <button
                                    disabled={processing}
                                    className="w-full h-[60px] bg-slate-950 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-xl shadow-slate-950/10 hover:shadow-amber-500/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-98"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Envoi en cours...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Envoyer la demande
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
