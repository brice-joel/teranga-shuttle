// resources/js/Pages/Trips.tsx
import React, { useState, useMemo } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { MapPin, ArrowRight, Clock, Search, X, Compass } from "lucide-react";
import { Trip } from "@/types";

interface Props {
    trips: Trip[];
}

export default function Trips({ trips }: Props) {
    const [search, setSearch] = useState("");

    const filteredTrips = useMemo(() => {
        return trips.filter(
            (trip) =>
                trip.departure_city
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                trip.arrival_city.toLowerCase().includes(search.toLowerCase()),
        );
    }, [trips, search]);

    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    };

    return (
        <UserLayout>
            <Head title="Trajets Forfaitaires - Teranga Shuttle" />

            <section className="pt-32 pb-24 bg-slate-50/50 px-4 sm:px-6 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col mb-10">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Catalogue de prix
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                            Tarifs &{" "}
                            <span className="italic font-serif text-amber-500">
                                Trajets Forfaitaires
                            </span>
                        </h1>
                        <p className="text-slate-500 max-w-2xl font-light">
                            Découvrez nos itinéraires prédéfinis avec des tarifs
                            fixes et transparents. Pas de mauvaise surprise, le
                            prix est garanti à la réservation.
                        </p>
                    </div>

                    {/* Search Toolbar */}
                    <div className="bg-white border border-slate-200 rounded-[1.5rem] p-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative w-full sm:max-w-md group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Rechercher une ville (ex: Saly, AIBD)..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-12 pl-14 pr-10 bg-slate-50/50 border-none rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="text-xs font-bold text-slate-400 tracking-wider uppercase px-4">
                            {filteredTrips.length} résultat
                            {filteredTrips.length > 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* Trips Grid */}
                    {filteredTrips.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTrips.map((trip) => (
                                <div
                                    key={trip.id}
                                    className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group relative"
                                >
                                    <div>
                                        {/* Tag */}
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider mb-6">
                                            <Compass className="w-3.5 h-3.5" />
                                            Prix Garanti
                                        </div>

                                        {/* Visual Timeline Route */}
                                        <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-slate-100 mb-8">
                                            {/* Departure */}
                                            <div className="relative">
                                                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-[3px] border-amber-500 bg-white shadow-sm" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                                                    Départ
                                                </p>
                                                <p className="text-base font-bold text-slate-900">
                                                    {trip.departure_city}
                                                </p>
                                            </div>

                                            {/* Arrival */}
                                            <div className="relative">
                                                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-[3px] border-slate-300 bg-white shadow-sm group-hover:border-slate-900 transition-colors" />
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
                                                    Destination
                                                </p>
                                                <p className="text-base font-bold text-slate-900">
                                                    {trip.arrival_city}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer: Pricing & Action */}
                                    <div className="pt-5 border-t border-slate-100">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                                Durée : ~
                                                {formatDuration(
                                                    trip.estimated_duration_minutes,
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xl font-black text-slate-900 tracking-tight">
                                                    {Number(
                                                        trip.fixed_price,
                                                    ).toLocaleString()}
                                                    <span className="text-xs font-bold text-amber-500 ml-1">
                                                        FCFA
                                                    </span>
                                                </p>
                                            </div>

                                            <Link
                                                href={route(
                                                    "booking.trip.details",
                                                    {
                                                        trip_id: trip.id,
                                                        type: "course_fixed",
                                                    },
                                                )}
                                                className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-950 hover:text-white transition-all active:scale-90"
                                            >
                                                <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="bg-white border border-dashed border-slate-200 rounded-[2rem] py-20 text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Aucun itinéraire trouvé
                            </h3>
                            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                                Nous ne disposons pas de tarif forfaitaire pour
                                cette recherche. Vous pouvez tout de même
                                demander un devis personnalisé.
                            </p>
                            <button
                                onClick={() => setSearch("")}
                                className="px-6 py-2.5 bg-slate-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-colors"
                            >
                                Afficher tous les trajets
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </UserLayout>
    );
}
