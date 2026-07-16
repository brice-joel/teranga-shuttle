import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatPrice } from "@/Utils/formatters";
import { Head } from "@inertiajs/react";
import React from "react";
interface PageProps {
    count_users: number;
    count_bookings: number;
    total_revenue: number;
    total_payments: number;
}
export default function Index({
    count_users,
    count_bookings,
    total_revenue,
    total_payments,
}: PageProps) {
    console.log(total_payments);

    return (
        <AuthenticatedLayout>
            <Head title="Tableau de Bord" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Bienvenue sur Teranga Shuttle
                </h1>
                <p className="text-slate-500">
                    Gérez vos réservations de Mercedes Classe V en toute
                    simplicité.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">
                        Revenu total
                    </p>
                    <p className="text-xl font-bold text-slate-900 mt-2">
                        {formatPrice(total_revenue)}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">
                        Total réservations
                    </p>
                    <p className="text-xl font-bold text-slate-900 mt-2">
                        {count_bookings}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">
                        Total transactions paiements
                    </p>
                    <p className="text-xl font-bold text-slate-900 mt-2">
                        {formatPrice(total_payments)}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">
                        Utilisateurs
                    </p>
                    <p className="text-xl font-bold text-slate-900 mt-2">
                        {count_users}
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
