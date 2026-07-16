// resources/js/Pages/Devis/DevisPage.tsx
import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import DevisForm from "@/Components/ui/forms/DevisForm";
import { Head } from "@inertiajs/react";

interface DevisPageProps {
    queryParams: Record<string, string>;
}

export default function DevisPage({ queryParams }: DevisPageProps) {
    return (
        <UserLayout transparent={false}>
            <Head title="Demande de Devis Premium - Teranga Shuttle" />

            <div className="bg-slate-50 min-h-screen pt-28 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header de la page */}
                    <div className="text-center mb-10">
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-amber-100 rounded-full">
                            Service VIP
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mt-3">
                            Demande de Devis Personnalisé
                        </h1>
                        <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm md:text-base">
                            Planifiez votre déplacement en Mercedes Classe V
                            avec chauffeur privé au Sénégal. Recevez une
                            estimation claire sous 24h.
                        </p>
                    </div>

                    {/* Inclusion du formulaire */}
                    <DevisForm queryParams={queryParams} />
                </div>
            </div>
        </UserLayout>
    );
}
