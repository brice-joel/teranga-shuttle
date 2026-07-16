import React, { useState, useMemo, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Clock,
    ShieldCheck,
    Users,
    Briefcase,
    ChevronRight,
    Search,
    Calendar,
    MessageSquare,
    User,
    Sparkles,
    X,
    CheckCircle,
} from "lucide-react";
import { Trip, Booking } from "@/types";
import CalendarModal from "@/Components/ui/modals/CalendarModal";
import {
    calculateEndDate,
    formatDate,
    formatDuration,
    formatPrice,
} from "@/Utils/formatters";

interface Props {
    trip: Trip;
    bookingData: Booking;
    trips: Trip[];
    bookings: Booking[];
}

export default function TripDetails({
    trip: initialTrip,
    bookingData,
    trips,
    bookings,
}: Props) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [currentTrip, setCurrentTrip] = useState(initialTrip);
    const [searchQuery, setSearchQuery] = useState(
        `${initialTrip.departure_city} → ${initialTrip.arrival_city}`,
    );

    const [start_date, setStartDate] = useState(bookingData.start_time || "");
    const [end_date, setEndTime] = useState(
        calculateEndDate(
            bookingData.start_time,
            initialTrip.estimated_duration_minutes,
        ),
    );

    const { data, setData, post, processing, errors } = useForm({
        trip_id: currentTrip.id,
        type: bookingData.type,
        start_time: bookingData.start_time || "",
        end_time: end_date || "",
        adults_count: bookingData.adults_count || 1,
        pickup_address: currentTrip.departure_city,
        dropoff_address: currentTrip.arrival_city,
        luggage_count: bookingData.luggage_count || 0,
        notes: "",
        total_amount: currentTrip.fixed_price || 0,
    });

    // Recalcul automatique de la date de fin
    useEffect(() => {
        const calculatedEnd = calculateEndDate(
            start_date,
            currentTrip.estimated_duration_minutes,
        );
        setEndTime(calculatedEnd);
        setData("end_time", calculatedEnd);
    }, [start_date, currentTrip]);

    // Filtrage dynamique pour l'autocomplétion
    const filteredTrips = useMemo(() => {
        const currentLabel = `${currentTrip.departure_city} → ${currentTrip.arrival_city}`;
        if (!searchQuery || searchQuery === currentLabel) {
            return trips.slice(0, 4);
        }
        return trips
            .filter((t) =>
                `${t.departure_city} ${t.arrival_city}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            )
            .slice(0, 6);
    }, [searchQuery, trips, currentTrip]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("booking.store"));
    };

    const onSelectDateTime = (date: string) => {
        setData("start_time", date);
        setStartDate(date);
    };

    return (
        <UserLayout>
            <Head
                title={`Configurer mon trajet : ${currentTrip.departure_city} - ${currentTrip.arrival_city}`}
            />

            <section className="pt-28 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: CONFIGURATOR FORM */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Intro Headers */}
                        <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200/40">
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                                Personnalisation Privée
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                                Configurez votre{" "}
                                <span className="text-amber-500">
                                    transfert
                                </span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 max-w-lg">
                                Ajustez les détails de votre course exclusive.
                                Votre chauffeur privé s'adaptera rigoureusement
                                à vos exigences.
                            </p>
                        </div>

                        {/* 1. Trajet / Route Selector */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3 relative">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                <Search className="w-3.5 h-3.5 text-slate-600" />{" "}
                                Itinéraire sélectionné
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-semibold text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white transition-all"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                />

                                {showSuggestions && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() =>
                                                setShowSuggestions(false)
                                            }
                                        />
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100">
                                            {filteredTrips.map((t) => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between group transition-colors text-xs"
                                                    onClick={() => {
                                                        setCurrentTrip(t);
                                                        setData((prev) => ({
                                                            ...prev,
                                                            trip_id: t.id,
                                                            total_amount:
                                                                t.fixed_price,
                                                            pickup_address:
                                                                t.departure_city,
                                                            dropoff_address:
                                                                t.arrival_city,
                                                        }));
                                                        setSearchQuery(
                                                            `${t.departure_city} → ${t.arrival_city}`,
                                                        );
                                                        setShowSuggestions(
                                                            false,
                                                        );
                                                    }}
                                                >
                                                    <span className="font-semibold text-slate-800">
                                                        {t.departure_city}{" "}
                                                        &rarr; {t.arrival_city}
                                                    </span>
                                                    <span className="text-amber-600 font-bold flex items-center gap-1">
                                                        {Number(
                                                            t.fixed_price,
                                                        ).toLocaleString()}{" "}
                                                        CFA
                                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 2. Date/Time & Logistics Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Date Picker Button */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between gap-3">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-amber-500" />{" "}
                                    Prise en charge
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsCalendarOpen(true)}
                                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-semibold text-xs flex justify-between items-center shadow-sm transition-colors"
                                >
                                    <span>
                                        {data.start_time
                                            ? formatDate(data.start_time)
                                            : "Planifier la date & heure"}
                                    </span>
                                    <Clock className="w-4 h-4 text-slate-600" />
                                </button>
                                {errors.start_time && (
                                    <p className="text-[11px] text-red-500 font-medium">
                                        {errors.start_time}
                                    </p>
                                )}
                            </div>

                            {/* Logistics Counts */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between gap-3">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                    Capacité requise
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-600 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-[9px] font-bold uppercase text-slate-600 leading-none mb-0.5">
                                                Passagers
                                            </span>
                                            <input
                                                type="number"
                                                min="1"
                                                max="8"
                                                value={data.adults_count}
                                                onChange={(e) =>
                                                    setData(
                                                        "adults_count",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 1,
                                                    )
                                                }
                                                className="bg-transparent border-none p-0 w-full font-bold text-slate-900 text-xs focus:ring-0 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-slate-600 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-[9px] font-bold uppercase text-slate-600 leading-none mb-0.5">
                                                Bagages
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={data.luggage_count}
                                                onChange={(e) =>
                                                    setData(
                                                        "luggage_count",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="bg-transparent border-none p-0 w-full font-bold text-slate-900 text-xs focus:ring-0 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Special Requests / Notes */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                            <label className="text-[11px] font-bold text-slate-600 capitalize tracking-wider flex items-center gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5 text-slate-600" />{" "}
                                Consignes et exigences durant le transport
                                (Optionnel)
                            </label>
                            <textarea
                                placeholder=""
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white text-xs text-slate-800 min-h-[90px] resize-none transition-all placeholder:text-slate-600"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: STICKY PREMIUM SUMMARY CARD */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="bg-slate-950 rounded-2xl p-6 text-white shadow-xl shadow-slate-950/20 border border-slate-800 relative overflow-hidden">
                            {/* Decorative soft glow */}
                            <div className="absolute -right-16 -top-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                            <h3 className="text-amber-500 font-bold uppercase text-[11px] tracking-wider flex items-center gap-1.5 mb-6 border-b border-white/5 pb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                Récapitulatif de la course
                            </h3>

                            <div className="space-y-4 text-xs mb-8">
                                {/* Route Details */}
                                <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 space-y-3">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                            Itinéraire
                                        </p>
                                        <p className="font-semibold text-sm text-slate-100 mt-0.5">
                                            {currentTrip.departure_city} &rarr;{" "}
                                            {currentTrip.arrival_city}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                                        <span>
                                            Durée estimée :{" "}
                                            {formatDuration(
                                                currentTrip.estimated_duration_minutes,
                                            )}
                                        </span>
                                        <span className="text-amber-500 font-medium">
                                            Mercedez Benz class V220d
                                        </span>
                                    </div>
                                </div>

                                {/* Date and Time Summary */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                            Départ planifié
                                        </p>
                                        <p className="font-semibold text-slate-200 mt-0.5 ">
                                            {start_date
                                                ? formatDate(start_date)
                                                : "Non défini"}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                            Arrivée estimée
                                        </p>
                                        <p className="font-semibold text-slate-400 mt-0.5 ">
                                            {end_date && start_date
                                                ? formatDate(end_date)
                                                : "En attente"}
                                        </p>
                                    </div>
                                </div>

                                {/* Logistics summary */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                                        <span className="text-slate-400 text-[11px]">
                                            Passager(s)
                                        </span>
                                        <span className="font-bold text-slate-100">
                                            {data.adults_count}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                                        <span className="text-slate-400 text-[11px]">
                                            Bagage(s)
                                        </span>
                                        <span className="font-bold text-slate-100">
                                            {data.luggage_count}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Total Pricing Widget */}
                            <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Tarif Forfaitaire Fixe
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-amber-500 tracking-tight">
                                        {Number(
                                            currentTrip.fixed_price,
                                        ).toLocaleString()}
                                    </span>
                                    <span className="text-xs font-semibold text-amber-500">
                                        FCFA
                                    </span>
                                </div>
                                <p className="flex text-[10px] text-slate-400 mt-1.5 italic">
                                    <CheckCircle className=" w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />{" "}
                                    <span className="text-amber-500">
                                        Carburant et frais de route à la charge
                                        du client
                                    </span>
                                </p>
                            </div>

                            {/* ACTION ZONE (REFACTORED) */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing || !data.start_time}
                                    className="w-full bg-amber-500 text-slate-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-400 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 disabled:opacity-20 disabled:cursor-not-allowed group"
                                >
                                    {processing ? (
                                        <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                    ) : (
                                        <span>Confirmer la demande</span>
                                    )}
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest my-2">
                                    <span className="h-px bg-slate-800 flex-1"></span>
                                    <span>ou</span>
                                    <span className="h-px bg-slate-800 flex-1"></span>
                                </div>

                                <Link
                                    href={route("devis.index", { ...data })}
                                    type="button"
                                    as="button"
                                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                                >
                                    <span>Demander un devis personnalisé</span>
                                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* APPOINTMENT/CALENDAR DATETIME MODAL */}
            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSelect={(date) => onSelectDateTime(date)}
                bookings={bookings}
            />
        </UserLayout>
    );
}
