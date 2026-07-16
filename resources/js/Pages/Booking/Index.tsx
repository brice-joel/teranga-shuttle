import React, { useState, useMemo } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    CreditCard,
    ChevronRight,
    Calendar,
    AlertCircle,
    CheckCircle2,
    XCircle,
    X,
    Car,
} from "lucide-react";
import { formatDate, formatPrice } from "@/Utils/formatters";
import { Booking, BookingStatus, DataPaymentProps } from "@/types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface Props {
    bookings: Booking[];
}

const STATUS_CONFIG: Record<
    string,
    { label: string; bg: string; text: string; border: string; icon: any }
> = {
    pending: {
        label: "En attente",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200/60",
        icon: AlertCircle,
    },
    validated: {
        label: "À payer",
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200/60",
        icon: CreditCard,
    },
    paid: {
        label: "Confirmé",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200/60",
        icon: CheckCircle2,
    },
    cancelled: {
        label: "Annulé",
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200",
        icon: XCircle,
    },
    finished: {
        label: "Terminé",
        bg: "bg-green-100",
        text: "text-purple-600",
        border: "border-purple-200",
        icon: XCircle,
    },
};

export default function Index({ bookings }: Props) {
    const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">(
        "all",
    );
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const filteredBookings = useMemo(() => {
        if (activeFilter === "all") return bookings;
        return bookings.filter((b) => b.status === activeFilter);
    }, [bookings, activeFilter]);

    const handlePayment = (e: React.FormEvent, booking: Booking) => {
        e.preventDefault();
        const data: DataPaymentProps = {
            total_amount: booking.total_amount,
            booking_id: booking.id,
            token:
                document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content") || "",
        };

        router.post(route("payment.checkout"), data, {
            onStart: () => setLoadingId(booking.id),
            onFinish: () => setLoadingId(null),
        });
    };

    const MySwal = withReactContent(Swal);
    const [processing, setProcessing] = useState(false);

    const handleCancel = async (bookingId: number) => {
        // Déclenchement de l'alerte de confirmation
        const result = await MySwal.fire({
            title: "Êtes-vous sûr de vouloir annuler cette réservation ?",
            text: `Cette operation est irréversible.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je confirme !",
            cancelButtonText: "Annuler",
            reverseButtons: true, // Place le bouton de confirmation à droite
        });

        let newStatus: BookingStatus = "cancelled";

        // Gestion du résultat
        if (result.isConfirmed) {
            try {
                router.patch(
                    route("booking.update", bookingId),
                    {
                        status: newStatus,
                    },
                    {
                        onStart: () => setProcessing(true),
                        onFinish: () => {
                            setProcessing(false);
                            //reload
                            //window.location.reload();
                        },
                    },
                );
            } catch (error) {}
        }
    };

    const filters: { label: string; value: BookingStatus | "all" }[] = [
        { label: "Tous", value: "all" },
        { label: "En attente", value: "pending" },
        { label: "À payer", value: "validated" },
        { label: "Payés", value: "paid" },
        { label: "Annulés", value: "cancelled" },
        { label: "Terminés", value: "finished" },
    ];

    return (
        <UserLayout>
            <Head title="Mes Réservations - Teranga Shuttle" />

            <section className="pt-28 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                        Mes <span className="text-amber-500">réservations</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5 max-w-xl">
                        Suivez vos trajets planifiés, gérez vos paiements
                        sécurisés et accédez à l'historique de vos déplacements.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center overflow-x-auto pb-3 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/40 min-w-max">
                        {filters.map((filter) => {
                            const count =
                                filter.value === "all"
                                    ? bookings.length
                                    : bookings.filter(
                                          (b) => b.status === filter.value,
                                      ).length;

                            return (
                                <button
                                    key={filter.value}
                                    onClick={() =>
                                        setActiveFilter(filter.value)
                                    }
                                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                                        activeFilter === filter.value
                                            ? "bg-white text-slate-950 shadow-sm font-bold"
                                            : "text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    {filter.label}
                                    <span
                                        className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                                            activeFilter === filter.value
                                                ? "bg-slate-950 text-white"
                                                : "bg-slate-200/70 text-slate-600"
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Logic */}
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 sm:p-16 text-center border border-slate-200/60 shadow-sm flex flex-col items-center justify-center">
                        <div className="bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-slate-100">
                            <Calendar className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            Aucune réservation trouvée
                        </h3>
                        <p className="text-sm text-slate-400 mb-6 max-w-xs">
                            Il n'y a aucun trajet enregistré sous cette
                            catégorie pour le moment.
                        </p>
                        <Link
                            href={route("trips")}
                            className="inline-flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl font-medium text-xs hover:bg-amber-500 hover:text-slate-950 transition-all shadow-sm active:scale-98"
                        >
                            Réserver un véhicule
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => {
                            const config =
                                STATUS_CONFIG[booking.status] ||
                                STATUS_CONFIG.pending;
                            const Icon = config.icon;
                            const isCurrentlyLoading = loadingId === booking.id;

                            return (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-2xl border border-slate-200/60 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-6 hover:shadow-md hover:border-slate-300/80 transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Left Column: Date & Type */}
                                    <div className="flex items-center justify-between lg:flex-col lg:items-start lg:justify-center lg:w-44 shrink-0 gap-2 border-b lg:border-b-0 pb-4 lg:pb-0 border-slate-100">
                                        <div>
                                            <p className="text-xs font-semibold text-slate-900">
                                                {formatDate(booking.start_time)}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 font-medium">
                                                <Car className="w-3 h-3 text-amber-500" />
                                                <span>
                                                    {booking.type ===
                                                    "course_fixed"
                                                        ? "Course"
                                                        : booking.type ===
                                                            "event_hourly"
                                                          ? "Location horaire"
                                                          : ""}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${config.bg} ${config.text} ${config.border}`}
                                        >
                                            <Icon className="w-3 h-3 shrink-0" />
                                            {config.label}
                                        </div>
                                    </div>

                                    {/* Middle Column: Route Timeline */}
                                    <div className="flex-1 min-w-0">
                                        <div className="relative pl-6 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                            {/* Pickup */}
                                            <div className="relative">
                                                <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full border-2 border-amber-500 bg-white flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                </div>
                                                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none mb-0.5">
                                                    Départ
                                                </p>
                                                <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                                                    {booking.pickup_address}
                                                </p>
                                            </div>
                                            {/* Dropoff */}
                                            <div className="relative">
                                                <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                                </div>
                                                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none mb-0.5">
                                                    Arrivée
                                                </p>
                                                <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                                                    {booking.dropoff_address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Pricing & Action Buttons */}
                                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center lg:w-52 gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                                        <div className="lg:text-right">
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                                Tarif TTC
                                            </p>
                                            <p className="text-xl font-bold text-slate-950 tracking-tight">
                                                {formatPrice(
                                                    booking.total_amount,
                                                    false,
                                                )}
                                                <span className="text-xs font-semibold text-amber-500 ml-1">
                                                    CFA
                                                </span>
                                            </p>
                                        </div>

                                        {/* Action Buttons Container */}
                                        <div className="flex items-center gap-2 w-auto">
                                            {/* Cancel Button for pending or validated states */}
                                            {(booking.status === "pending" ||
                                                booking.status ===
                                                    "validated") && (
                                                <button
                                                    onClick={() =>
                                                        handleCancel(booking.id)
                                                    }
                                                    disabled={processing}
                                                    className="inline-flex items-center justify-center p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors disabled:opacity-40"
                                                    title="Annuler la réservation"
                                                >
                                                    {processing ? (
                                                        <span className="w-3.5 h-3.5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <X className="w-4 h-4 sm:mr-1.5" />
                                                            <span className=" inline">
                                                                Annuler
                                                            </span>
                                                        </>
                                                    )}
                                                </button>
                                            )}

                                            {/* Primary Action: Payment */}
                                            {booking.status === "validated" && (
                                                <button
                                                    onClick={(e) =>
                                                        handlePayment(
                                                            e,
                                                            booking,
                                                        )
                                                    }
                                                    disabled={
                                                        isCurrentlyLoading
                                                    }
                                                    className="bg-blue-950 text-white px-4 py-2 rounded-xl font-semibold text-xs hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-1.5"
                                                >
                                                    {isCurrentlyLoading ? (
                                                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <CreditCard className="w-3.5 h-3.5" />
                                                    )}
                                                    <span>Payer</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </UserLayout>
    );
}
