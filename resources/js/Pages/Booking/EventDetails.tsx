// resources/js/Pages/Booking/EventDetails.tsx
import React, { useState, useMemo } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Clock,
    Calendar as CalendarIcon,
    MapPin,
    Users,
    Briefcase,
    Star,
    ChevronRight,
    MessageSquare,
    CheckCircle,
} from "lucide-react";

import dayjs from "dayjs";
import { formatDate } from "@/Utils/formatters";
import CalendarModal from "@/Components/ui/modals/CalendarModal";
import StepperInput from "@/Components/ui/forms/StepperInput";
import { Booking } from "@/types";

interface Props {
    bookingData: any;
    pricing: {
        hourly_rate: number;
    };
    bookings?: Booking[];
}

export default function EventDetails({
    bookingData,
    pricing,
    bookings,
}: Props) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const { data, setData, post, processing, transform } = useForm({
        type: "event_hourly",
        pickup_address: bookingData.pickup_address || "",
        start_time: bookingData.start_time || "",
        duration_hours: bookingData.duration_hours || 2,
        adults_count: bookingData.adults_count || 1,
        large_luggage_count: 0,
        small_luggage_count: 0,
        luggage_count: bookingData.luggage_count || 0,
        notes: "",
    });

    const endTime = useMemo(() => {
        if (!data.start_time) return null;
        return dayjs(data.start_time).add(data.duration_hours, "hour").format();
    }, [data.start_time, data.duration_hours]);

    //const totalPrice = data.duration_hours * pricing.hourly_rate;ù
    const totalPrice = calculerPrixReservation(
        data.duration_hours,
        data.start_time,
        pricing.hourly_rate,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            luggage_count: data.large_luggage_count + data.small_luggage_count,
            notes: data.notes + `\n\n[Bagages : ${data.large_luggage_count} grandes (23kg), ${data.small_luggage_count} petites]`,
        }));
        post(route("bookings.store"));
    };

    const onSelectDateTime = (date: string) => {
        setData("start_time", date);
    };

    return (
        <UserLayout>
            <Head title="Location vehicule - Teranga Shuttle" />

            <section className="pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* CONFIGURATION DE L'ÉVÉNEMENT (GAUCHE) */}
                    <div className="lg:col-span-7 space-y-5">
                        {/* Header condensé */}
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 text-[10px] font-black uppercase tracking-widest">
                                <Star className="w-3 h-3 fill-amber-600 text-amber-600" />{" "}
                                Service Conciergerie VIP
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-slate-950">
                                Location{" "}
                                <span className="text-amber-500">Horaire</span>
                            </h1>
                        </div>

                        {/* 1. Lieu & Planification (Fusionnés sur une ligne pour sauver de l'espace) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Lieu de prise en charge */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between gap-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-amber-500" />{" "}
                                    Prise en charge
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Aéroport AIBD, Hôtel Terrou-Bi..."
                                    value={data.pickup_address}
                                    onChange={(e) =>
                                        setData(
                                            "pickup_address",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 font-semibold text-xs text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white transition-all"
                                />
                            </div>

                            {/* Planification Date & Heure */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between gap-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                    <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />{" "}
                                    Date & Heure de départ
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsCalendarOpen(true)}
                                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100/70 text-slate-900 border border-slate-200 rounded-xl font-semibold text-xs flex justify-between items-center transition-all group"
                                >
                                    <span
                                        className={
                                            data.start_time
                                                ? "text-slate-900 font-semibold"
                                                : "text-slate-400 font-medium"
                                        }
                                    >
                                        {data.start_time
                                            ? formatDate(data.start_time)
                                            : "Planifier le départ"}
                                    </span>
                                    <Clock className="w-4 h-4 text-slate-500 group-hover:text-amber-500 transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* 2. Sélecteur de Durée réajusté */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[11px] font-bold uppercase text-slate-600 tracking-wider">
                                    Durée souhaitée
                                </label>
                                <div className="text-2xl font-black italic text-slate-900">
                                    {data.duration_hours}{" "}
                                    <span className="text-xs font-bold text-amber-500 uppercase not-italic">
                                        Heures
                                    </span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="24"
                                step="1"
                                value={data.duration_hours}
                                onChange={(e) =>
                                    setData(
                                        "duration_hours",
                                        parseInt(e.target.value),
                                    )
                                }
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>

                        {/* 3. Logistique & Notes */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                        <Users className="w-3.5 h-3.5 text-amber-500" />{" "}
                                        Passagers
                                    </label>
                                    <StepperInput
                                        value={data.adults_count}
                                        onChange={(v) => setData("adults_count", v)}
                                        min={1}
                                        max={7}
                                    />
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5 text-amber-500" />{" "}
                                        Bagages
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600 font-medium">Grand (23kg max)</span>
                                            <StepperInput
                                                value={data.large_luggage_count}
                                                onChange={(v) => setData("large_luggage_count", v)}
                                                min={0}
                                                max={5}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600 font-medium">Petit</span>
                                            <StepperInput
                                                value={data.small_luggage_count}
                                                onChange={(v) => setData("small_luggage_count", v)}
                                                min={0}
                                                max={4}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />{" "}
                                    Consignes et exigences (Optionnel)
                                </label>
                                <textarea
                                    placeholder="Besoins spécifiques, instructions de vol, etc..."
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white text-xs text-slate-800 min-h-[90px] resize-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RÉCAPITULATIF DROITE (STICKY PREMIUM CARD) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="bg-slate-950 rounded-2xl p-6 shadow-xl text-white border border-slate-800 relative overflow-hidden">
                            <div className="absolute -right-16 -top-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                            <h3 className="text-amber-500 font-bold uppercase text-[11px] tracking-wider mb-6 pb-4 border-b border-white/5">
                                Récapitulatif de la commande
                            </h3>

                            <div className="space-y-4 text-xs mb-6">
                                <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                                Début
                                            </p>
                                            <p className="font-semibold text-slate-200 mt-0.5 ">
                                                {data.start_time
                                                    ? formatDate(
                                                          data.start_time,
                                                      )
                                                    : "Non défini"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                                Fin estimée
                                            </p>
                                            <p className="font-semibold text-amber-500 mt-0.5 ">
                                                {endTime
                                                    ? formatDate(endTime)
                                                    : "--:--"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Adresse dynamique */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px]">
                                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                        <p className="italic  text-slate-300">
                                            {data.pickup_address ||
                                                "Lieu à préciser"}
                                        </p>
                                    </div>
                                </div>

                                {/* Compteurs logistiques compacts */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center justify-between">
                                        <span className="text-slate-400 text-[11px]">
                                            Passager(s)
                                        </span>
                                        <span className="font-bold text-slate-100">
                                            {data.adults_count}
                                        </span>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center justify-between">
                                        <span className="text-slate-400 text-[11px]">
                                            Bagage(s)
                                        </span>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-slate-100">
                                                {data.large_luggage_count + data.small_luggage_count}
                                            </span>
                                            {(data.large_luggage_count > 0 || data.small_luggage_count > 0) && (
                                                <span className="text-[9px] text-slate-400 mt-0.5 text-right">
                                                    {data.large_luggage_count} grand(s), {data.small_luggage_count} petit(s)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bloc Tarif Horaire */}
                            <div className="mb-2 bg-white/5 p-4 rounded-xl border border-white/5">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Estimation forfaitaire (
                                    {data.duration_hours}h)
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-amber-500 tracking-tight">
                                        {totalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-xs font-semibold text-amber-500 uppercase">
                                        FCFA
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1.5 italic">
                                    Taux horaire appliqué :{" "}
                                    {Number(
                                        pricing.hourly_rate,
                                    ).toLocaleString()}{" "}
                                    FCFA/h
                                </p>

                                <p className="flex text-[10px] text-slate-400 mt-1.5 italic">
                                    <CheckCircle className="w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />{" "}
                                    <span className="text-amber-500">
                                        Carburant et frais de route à la charge
                                        du client
                                    </span>
                                </p>
                            </div>

                            {/* ACTIONS ZONE */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleSubmit}
                                    disabled={
                                        processing ||
                                        !data.start_time ||
                                        !data.pickup_address
                                    }
                                    className="w-full bg-amber-500 text-slate-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-400 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 disabled:opacity-20 disabled:cursor-not-allowed group"
                                >
                                    {processing ? (
                                        <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                                    ) : (
                                        <span>Confirmer la réservation</span>
                                    )}
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest my-1">
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

            {/* MODAL DE SÉLECTION DATE & HEURE */}
            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSelect={(date) => onSelectDateTime(date)}
                bookings={bookings}
            />
        </UserLayout>
    );
}

/**
 * Calcule le prix d'une réservation.
 * @param {number} dureeHeures - Durée en heures
 * @param {string} dateReservation - Date au format ISO (ex: '2026-06-10T08:00:00+02:00')
 * @param {number} prixParHeure - Prix de base par défaut (15000)
 * @returns {number} - Prix total en FCFA
 */
function calculerPrixReservation(
    dureeHeures,
    dateReservation,
    prixParHeure = 15000,
) {
    // Conversion de la chaîne en objet Date
    const dateObj = new Date(dateReservation);
    const heureDebut = dateObj.getHours();

    // 1. Règle des 24h (priorité maximale)
    if (dureeHeures >= 24) {
        return 200000;
    }

    // 2. Règle des 10h (entre 08h et 18h)
    if (dureeHeures >= 10) {
        if (heureDebut >= 8 && heureDebut < 18) {
            return 100000;
        }
        // Si hors tranche horaire, on applique le tarif classique
        return dureeHeures * prixParHeure;
    }

    // 3. Règle des 4h
    if (dureeHeures >= 4) {
        return 50000;
    }

    // 4. Règle par défaut
    return dureeHeures * prixParHeure;
}
