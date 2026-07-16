// resources/js/Components/bookings/BookingEngine.tsx
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Car, Calendar, Clock, MapPin, Users, Briefcase } from "lucide-react";
import CalendarModal from "@/Components/ui/modals/CalendarModal";
import { formatFrenchDate } from "@/Utils/formatters";

interface Props {
    trips: any[];
}

export default function BookingEngine({ trips }: Props) {
    const [bookingType, setBookingType] = useState<"course" | "event">(
        "course",
    );

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        type: bookingType,
        trip_id: "",
        pickup_address: "",
        dropoff_address: "",
        start_time: "",
        duration: 2, // Heures min pour événement
        adults: 1,
        luggage: 0,
    });

    return (
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-5xl mx-auto -mt-24 relative z-10">
            {/* Toggle Type */}
            <div className="flex p-1 bg-slate-100 rounded-2xl w-fit mb-8 mx-auto md:mx-0">
                <button
                    onClick={() => setBookingType("course")}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${bookingType === "course" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Course / Transfert
                </button>
                <button
                    onClick={() => setBookingType("event")}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${bookingType === "event" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Mise à disposition (Événement)
                </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Ligne 1: Lieux ou Trajets */}
                <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {bookingType === "course"
                            ? "Itinéraire"
                            : "Lieu de prise en charge"}
                    </label>
                    {bookingType === "course" ? (
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-3 focus:ring-2 focus:ring-amber-500 font-medium"
                            onChange={(e) => setData("trip_id", e.target.value)}
                        >
                            <option value="">
                                Sélectionnez un trajet ou tapez une adresse
                            </option>
                            {trips.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.departure_city} → {trip.arrival_city}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            placeholder="Ex: Almadies, Dakar"
                            className="w-full bg-slate-50 border-none rounded-xl py-3 focus:ring-2 focus:ring-amber-500"
                            onChange={(e) =>
                                setData("pickup_address", e.target.value)
                            }
                        />
                    )}
                </div>

                {/* Ligne 2: Date & Heure */}
                <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" /> Date
                        & Heure
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsCalendarOpen(true)}
                        className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-left focus:ring-2 focus:ring-amber-500 flex items-center justify-between group"
                    >
                        <span
                            className={
                                data.start_time
                                    ? "text-slate-900 font-medium"
                                    : "text-slate-400"
                            }
                        >
                            {data.start_time
                                ? formatFrenchDate(data.start_time)
                                : "Sélectionner..."}
                        </span>
                        <Clock className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </button>

                    {/* La Modale */}
                    <CalendarModal
                        isOpen={isCalendarOpen}
                        onClose={() => setIsCalendarOpen(false)}
                        onSelect={(date) => setData("start_time", date)}
                    />
                </div>

                {/* Ligne 3: Passagers/Détails */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            <Users className="w-3.5 h-3.5 text-amber-500" />{" "}
                            Places
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="8"
                            className="w-full bg-slate-50 border-none rounded-xl py-3 focus:ring-2 focus:ring-amber-500"
                            value={data.adults}
                            onChange={(e) =>
                                setData("adults", parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="flex-1">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            <Briefcase className="w-3.5 h-3.5 text-amber-500" />{" "}
                            Bagages
                        </label>
                        <input
                            type="number"
                            min="0"
                            className="w-full bg-slate-50 border-none rounded-xl py-3 focus:ring-2 focus:ring-amber-500"
                            onChange={(e) =>
                                setData("luggage", parseInt(e.target.value))
                            }
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-4 flex items-center justify-between border-t border-slate-100 pt-6 mt-2">
                    <div className="hidden md:block">
                        <p className="text-sm text-slate-400 italic">
                            Paiement sécurisé via Stripe après validation
                        </p>
                    </div>
                    <button
                        disabled={processing}
                        className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-500 hover:text-slate-900 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
                    >
                        {processing
                            ? "Chargement..."
                            : "Vérifier la disponibilité"}
                        <Car className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
