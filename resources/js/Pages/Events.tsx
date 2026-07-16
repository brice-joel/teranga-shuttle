// resources/js/Pages/Events.tsx
import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { Check } from "lucide-react";

export default function Events() {
    return (
        <UserLayout>
            <Head title="Événements VIP - Teranga Shuttle" />

            <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Contenu Texte */}
                    <div className="lg:col-span-5 relative z-10">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-8 h-[1px] bg-amber-500" />
                            <span className="text-amber-500 font-bold tracking-widest uppercase text-xs">
                                Prestige & Cérémonie
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
                            Rendez chaque moment <br />
                            <span className="text-amber-500 italic font-serif">
                                inoubliable.
                            </span>
                        </h1>

                        <p className="text-slate-500 text-lg leading-relaxed mb-10 font-light">
                            Pour un mariage, un gala ou une visite d'État, la
                            Mercedes Classe V est le choix ultime de l'élégance.
                            Nos chauffeurs en tenue protocolaire assurent un
                            service d'exception où chaque détail est maîtrisé.
                        </p>

                        <ul className="space-y-5 mb-10">
                            {[
                                "Décoration florale du véhicule sur demande",
                                "Chauffeur bilingue et formé au protocole",
                                "Accueil VIP personnalisé sur tapis rouge",
                                "Disponibilité totale 24/7 durant l'événement",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="mt-1 p-1 rounded-full bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium text-slate-700 leading-snug">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Grille d'images (Bento Style) */}
                    <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-[500px] sm:h-[600px]">
                        <div className="bg-slate-100 rounded-[2rem] overflow-hidden row-span-2 group relative shadow-lg">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Mariage de luxe"
                            />
                        </div>
                        <div className="bg-slate-100 rounded-[2rem] overflow-hidden group relative shadow-md">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Événement Gala"
                            />
                        </div>
                        <div className="bg-slate-100 rounded-[2rem] overflow-hidden group relative shadow-md">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Cérémonie VIP"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
