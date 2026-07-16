// resources/js/Pages/Services.tsx
import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    Plane,
    Clock,
    ShieldCheck,
    Gem,
    Users,
    Coffee,
    Map,
} from "lucide-react";

const services = [
    {
        title: "Transferts Aéroport",
        desc: "Accueil personnalisé à l'AIBD (DSS) avec pancarte nominative, assistance bagages et transfert rapide.",
        icon: Plane,
    },
    {
        title: "Mise à Disposition",
        desc: "Location horaire flexible pour vos rendez-vous d'affaires, shopping ou vos courses en ville sans contrainte.",
        icon: Clock,
    },
    {
        title: "Événements VIP",
        desc: "Un transport d'exception pour vos mariages, sommets diplomatiques, conventions et soirées de gala.",
        icon: Gem,
    },
    {
        title: "Tourisme de Luxe",
        desc: "Découvrez les joyaux du Sénégal (Lac Rose, Île de Gorée, Réserve de Bandia) dans un confort absolu.",
        icon: Map,
    },
];

export default function Services() {
    return (
        <UserLayout>
            <Head title="Nos Services - Teranga Shuttle" />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 bg-slate-950 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Nos Services{" "}
                        <span className="text-amber-500 italic font-serif">
                            Exclusifs
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg font-light leading-relaxed">
                        L'excellence du transport privé au Sénégal, pensée
                        sur-mesure pour s'adapter à chacune de vos exigences.
                    </p>
                </div>
            </section>

            {/* Grid Services */}
            <section className="max-w-7xl mx-auto px-6 py-24 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="flex flex-col sm:flex-row gap-6 p-8 md:p-10 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] group hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:border-amber-500/20 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:-translate-y-1 transition-all duration-300">
                                <s.icon className="w-7 h-7 text-amber-500 group-hover:text-slate-950 transition-colors" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-amber-600 transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </UserLayout>
    );
}
