// resources/js/Components/bookings/BookingEngine.tsx
import React, { useState, useMemo } from "react";
import { router, useForm } from "@inertiajs/react";
import {
    Calendar,
    Clock,
    MapPin,
    Search,
    ChevronRight,
    ArrowRight,
} from "lucide-react";
import CalendarModal from "@/Components/ui/modals/CalendarModal";
import { formatDate } from "@/Utils/formatters";
import { toast } from "sonner";
import { Booking, Trip } from "@/types";

interface Props {
    trips: Trip[];
    bookings: Booking[];
}

export default function BookingEngine({ trips, bookings = [] }: Props) {
    const [bookingType, setBookingType] = useState<"course" | "event">(
        "course",
    );
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { data, setData } = useForm({
        trip_id: "",
        type: "course_fixed",
        pickup_address: "",
        start_time: "",
        duration_hours: 2,
        adults_count: 1,
        luggage_count: 0,
    });

    const filteredTrips = useMemo(() => {
        if (!searchQuery) return trips.slice(0, 5);
        return trips
            .filter((t) =>
                `${t.departure_city} ${t.arrival_city}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            )
            .slice(0, 8); // Limité à 8 pour l'esthétique
    }, [searchQuery, trips]);

    const handleSeeDetails = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.start_time) {
            toast.error("Veuillez sélectionner une date et heure.");
            return;
        }

        const routeName =
            bookingType === "course"
                ? "booking.trip.details"
                : "booking.event.details";
        router.get(route(routeName), { ...data });
    };

    return (
        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 w-full max-w-5xl mx-auto -mt-24 relative z-40">
            {/* Toggle Switcher */}
            <div className="flex p-1.5 bg-slate-100/80 rounded-2xl w-full md:w-fit mb-8 mx-auto md:mx-0 border border-slate-200/50">
                <button
                    onClick={() => {
                        setBookingType("course");
                        setData("type", "course_fixed");
                    }}
                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs md:text-sm font-black tracking-wider uppercase transition-all duration-300 ${
                        bookingType === "course"
                            ? "bg-white text-slate-900 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)]"
                            : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                    Transfert
                </button>
                <button
                    onClick={() => {
                        setBookingType("event");
                        setData("type", "event_hourly");
                    }}
                    className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs md:text-sm font-black tracking-wider uppercase transition-all duration-300 ${
                        bookingType === "event"
                            ? "bg-white text-slate-900 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)]"
                            : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                    Mise à disposition
                </button>
            </div>

            <form
                onSubmit={handleSeeDetails}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end"
            >
                {/* ─── INPUT : RECHERCHE ITINÉRAIRE / LIEU (Col 5) ─── */}
                <div className="md:col-span-5 relative group">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 pl-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {bookingType === "course"
                            ? "Votre Itinéraire"
                            : "Prise en charge"}
                    </label>

                    {bookingType === "course" ? (
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-amber-500" />
                            <input
                                type="text"
                                placeholder="Où allez-vous ? (ex: Dakar, AIBD...)"
                                className="w-full h-[60px] bg-slate-50/50 border border-slate-200 rounded-2xl py-4 pl-14 pr-4 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-bold text-slate-900 text-sm transition-all placeholder:text-slate-400 placeholder:font-medium"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setShowSuggestions(false),
                                        200,
                                    )
                                } // Délai pour permettre le clic
                                required
                            />

                            {/* Dropdown Suggestions */}
                            <div
                                className={`absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden z-[60] py-2 transition-all duration-300 origin-top ${showSuggestions ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                            >
                                {filteredTrips.map((trip) => (
                                    <button
                                        key={trip.id}
                                        type="button"
                                        className="w-full px-5 py-3.5 text-left hover:bg-slate-50 flex items-center justify-between group/item transition-colors"
                                        onClick={() => {
                                            setData("trip_id", trip.id);
                                            setSearchQuery(
                                                `${trip.departure_city} → ${trip.arrival_city}`,
                                            );
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-sm text-slate-900 group-hover/item:text-amber-600 transition-colors">
                                                {trip.departure_city} →{" "}
                                                {trip.arrival_city}
                                            </span>
                                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                                Prix fixe : {trip.fixed_price}{" "}
                                                FCFA
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all" />
                                    </button>
                                ))}
                                {filteredTrips.length === 0 && (
                                    <div className="px-5 py-4 text-sm text-slate-500 text-center italic">
                                        Aucun trajet trouvé.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Hôtel, Adresse, Ville..."
                            className="w-full h-[60px] bg-slate-50/50 border border-slate-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 font-bold text-slate-900 text-sm transition-all placeholder:text-slate-400 placeholder:font-medium"
                            onChange={(e) =>
                                setData("pickup_address", e.target.value)
                            }
                            required
                        />
                    )}
                </div>

                {/* ─── INPUT : DATE & HEURE (Col 4) ─── */}
                <div className="md:col-span-4 relative group">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 pl-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" /> Date
                        & Heure
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsCalendarOpen(true)}
                        className="w-full h-[60px] bg-slate-50/50 border border-slate-200 rounded-2xl py-4 px-6 text-left focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 flex items-center justify-between group transition-all"
                    >
                        <span
                            className={`text-sm ${data.start_time ? "font-bold text-slate-900" : "font-medium text-slate-400"}`}
                        >
                            {data.start_time
                                ? formatDate(data.start_time)
                                : "Quand partez-vous ?"}
                        </span>
                        <Clock
                            className={`w-5 h-5 transition-colors ${data.start_time ? "text-amber-500" : "text-slate-400 group-focus-within:text-amber-500"}`}
                        />
                    </button>
                </div>

                {/* ─── BOUTON SUBMIT (Col 3) ─── */}
                <div className="md:col-span-3">
                    <button
                        type="submit"
                        className="w-full h-[60px] bg-slate-950 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-xl shadow-slate-950/10 hover:shadow-amber-500/25 flex items-center justify-center gap-3 group active:scale-95"
                    >
                        Calculer le prix
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                </div>
            </form>

            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSelect={(date) => setData("start_time", date)}
                bookings={bookings}
            />
        </div>
    );
}
