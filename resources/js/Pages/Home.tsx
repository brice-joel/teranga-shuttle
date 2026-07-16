// resources/js/Pages/Home.tsx
import React from "react";
import { Head } from "@inertiajs/react";
import { ShieldCheck, Star, Award, Sparkles, ChevronDown } from "lucide-react";
import BookingEngine from "@/Components/bookings/BookingEngine";
import UserLayout from "@/Layouts/UserLayout";
import { Booking, Trip } from "@/types";

interface Props {
    trips: Trip[];
    bookings: Booking[];
}

export default function Home({ trips, bookings }: Props) {
    return (
        <UserLayout transparent={true}>
            <div className="bg-white">
                <Head title="Teranga Shuttle - L'Élégance du Transport VIP" />

                {/* ─── HERO SECTION PREMIUM ─── */}
                <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Overlay Dégradé pour lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/90 z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1554672408-730436b60dde?auto=format&fit=crop&q=80&w=2000"
                        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[slow-zoom_20s_ease-in-out_infinite_alternate]"
                        alt="Mercedes Classe V VIP"
                    />

                    <div className="relative z-20 text-center px-4 max-w-5xl mt-16 md:mt-0">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2.5 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-5 py-2.5 rounded-full mb-8 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]">
                            <Award className="w-4 h-4" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                                L'Excellence du Transport au Sénégal
                            </span>
                        </div>

                        {/* Titre */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
                            L'Élégance de vos <br className="hidden md:block" />
                            déplacements{" "}
                            <span className="text-amber-500 italic font-serif font-medium pr-2">
                                privés.
                            </span>
                        </h1>

                        {/* Sous-titre */}
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                            Profitez du confort inégalé d'une Mercedes Classe V
                            avec chauffeur privé pour vos transferts, mariages
                            et événements professionnels.
                        </p>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                            Réserver
                        </span>
                        <ChevronDown className="w-5 h-5 text-white animate-bounce" />
                    </div>
                </section>

                {/* ─── BOOKING ENGINE INTEGRATION ─── */}
                <section className="px-4 sm:px-6 relative z-30 pb-24">
                    <BookingEngine trips={trips} bookings={bookings} />
                </section>

                {/* ─── FEATURES SECTION ─── */}
                <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Pourquoi nous choisir
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Un service sans{" "}
                            <span className="italic font-serif text-slate-500 font-medium">
                                compromis
                            </span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                title: "Confort Premium",
                                icon: Star,
                                desc: "Mercedes Classe V 220d : 8 places, intérieur cuir étendu, sièges massants et climatisation tri-zone personnalisable.",
                            },
                            {
                                title: "Sécurité Maximale",
                                icon: ShieldCheck,
                                desc: "Chauffeurs professionnels formés à la conduite défensive. Véhicules rigoureusement entretenus selon les standards allemands.",
                            },
                            {
                                title: "Discrétion Totale",
                                icon: Award,
                                desc: "Service sur-mesure et confidentialité absolue pour nos personnalités, délégations diplomatiques et événements privés.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group relative p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-amber-500/20 transition-all duration-500"
                            >
                                <div className="absolute top-0 left-10 w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                                    <feature.icon className="w-8 h-8 text-amber-500" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Le footer est géré automatiquement par UserLayout */}
            </div>
        </UserLayout>
    );
}
