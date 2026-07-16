import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import {
    Search,
    Eye,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    FilterX,
    Car,
} from "lucide-react";
import { Booking, BookingStatus } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookingDetailModal from "@/Components/ui/modals/BookingDetailsModal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { formatPrice } from "@/Utils/formatters";

// Configuration centralisée des statuts pour la cohérence visuelle
const STATUS_CONFIG: Record<string, { label: string; style: string }> = {
    pending: {
        label: "En attente",
        style: "bg-amber-50 text-amber-700 border-amber-200/60",
    },
    validated: {
        label: "À payer",
        style: "bg-blue-50 text-blue-700 border-blue-200/60",
    },
    paid: {
        label: "Payé",
        style: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    },
    cancelled: {
        label: "Annulé",
        style: "bg-slate-100 text-slate-600 border-slate-200",
    },
    finished: {
        label: "Terminé",
        style: "bg-slate-100 text-slate-600 border-slate-200",
    },
};

export default function AdminBookingsIndex({
    bookings,
}: {
    bookings: Booking[];
}) {
    const [search, setSearch] = useState("");
    const [activeStatus, setActiveStatus] = useState<BookingStatus | "all">(
        "all",
    );
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null,
    );

    const MySwal = withReactContent(Swal);

    // Filtrage combiné : Recherche textuelle + Filtre de statut
    const filteredBookings = useMemo(() => {
        return bookings.filter((b) => {
            const matchesSearch =
                b.user?.name.toLowerCase().includes(search.toLowerCase()) ||
                b.user?.email.toLowerCase().includes(search.toLowerCase()) ||
                b.pickup_address.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                activeStatus === "all" || b.status === activeStatus;

            return matchesSearch && matchesStatus;
        });
    }, [bookings, search, activeStatus]);

    const handleOpenModal = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsOpen(true);
    };

    // Configuration des onglets de filtrage
    const filterTabs: { label: string; value: BookingStatus | "all" }[] = [
        { label: "Tous", value: "all" },
        { label: "À confirmer", value: "pending" },
        { label: "À payer", value: "validated" },
        { label: "Payés", value: "paid" },
        { label: "Annulés", value: "cancelled" },
        { label: "Terminés", value: "finished" },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Configuration des Réservations" />

            <div className="min-h-screen bg-slate-50/50">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    {/* HEADER & STATS */}
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                                Gestion des Réservations
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Suivez, validez et consultez l'ensemble des
                                trajets et réservations clients.
                            </p>
                        </div>

                        {/* STATS CARDS */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto">
                            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm">
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                    Total
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 mt-1">
                                    {bookings.length}
                                </h3>
                            </div>
                            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm">
                                <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                                    En attente
                                </p>
                                <h3 className="text-xl font-bold text-amber-600 mt-1">
                                    {
                                        bookings.filter(
                                            (b) => b.status === "pending",
                                        ).length
                                    }
                                </h3>
                            </div>
                            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm">
                                <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                                    Payées
                                </p>
                                <h3 className="text-xl font-bold text-emerald-600 mt-1">
                                    {
                                        bookings.filter(
                                            (b) => b.status === "paid",
                                        ).length
                                    }
                                </h3>
                            </div>
                            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm">
                                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Annulées
                                </p>
                                <h3 className="text-xl font-bold text-slate-700 mt-1">
                                    {
                                        bookings.filter(
                                            (b) => b.status === "cancelled",
                                        ).length
                                    }
                                </h3>
                            </div>

                            <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm">
                                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Terminées
                                </p>
                                <h3 className="text-xl font-bold text-slate-700 mt-1">
                                    {
                                        bookings.filter(
                                            (b) => b.status === "finished",
                                        ).length
                                    }
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* TOOLBAR: SEARCH & STATUS SWITCHER */}
                    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm mb-6 space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                            {/* SEARCH BAR */}
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un client, email ou adresse..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                                />
                            </div>

                            {/* STATUS SWITCHER (TABS style) */}
                            <div className="flex items-center overflow-x-auto pb-1 lg:pb-0 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/40 min-w-max">
                                    {filterTabs.map((tab) => {
                                        const count =
                                            tab.value === "all"
                                                ? bookings.length
                                                : bookings.filter(
                                                      (b) =>
                                                          b.status ===
                                                          tab.value,
                                                  ).length;

                                        return (
                                            <button
                                                key={tab.value}
                                                onClick={() =>
                                                    setActiveStatus(tab.value)
                                                }
                                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                                                    activeStatus === tab.value
                                                        ? "bg-white text-slate-950 shadow-sm font-bold"
                                                        : "text-slate-500 hover:text-slate-800"
                                                }`}
                                            >
                                                {tab.label}
                                                <span
                                                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                                                        activeStatus ===
                                                        tab.value
                                                            ? "bg-slate-950 text-white"
                                                            : "bg-slate-200 text-slate-600"
                                                    }`}
                                                >
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RESULTS COUNTER */}
                        <div className="text-xs text-slate-400 font-medium pt-1 border-t border-slate-50 flex items-center justify-between">
                            <span>
                                Filtre actif :{" "}
                                <span className="text-slate-700 font-semibold">
                                    {
                                        filterTabs.find(
                                            (t) => t.value === activeStatus,
                                        )?.label
                                    }
                                </span>
                            </span>
                            <span>
                                {filteredBookings.length} résultat(s) trouvé(s)
                            </span>
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    {filteredBookings.length > 0 ? (
                        <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px]">
                                    <thead className="bg-slate-50/70 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                                N*
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Client
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Statut
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Trajet
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Type
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Date & Heure
                                            </th>

                                            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Montant (FCFA)
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {filteredBookings.map((booking) => {
                                            const config =
                                                STATUS_CONFIG[booking.status] ||
                                                STATUS_CONFIG.pending;

                                            return (
                                                <tr
                                                    key={booking.id}
                                                    className="hover:bg-slate-50/80 transition-colors group"
                                                >
                                                    <td className="px-6 py-4.5">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm font-semibold text-slate-900">
                                                                {booking.id}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    {/* USER INFO */}
                                                    <td className="px-6 py-4.5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                                                                {booking.user?.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-slate-900 text-sm truncate">
                                                                    {
                                                                        booking
                                                                            .user
                                                                            ?.name
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-slate-400 truncate">
                                                                    {
                                                                        booking
                                                                            .user
                                                                            ?.email
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* STATUS BADGE */}
                                                    <td className="px-6 py-4.5">
                                                        <span
                                                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.style}`}
                                                        >
                                                            {config.label}
                                                        </span>
                                                    </td>

                                                    {/* TIMELINE TRIPS */}
                                                    <td className="px-6 py-4.5 max-w-[240px]">
                                                        <div className="relative pl-4 space-y-1.5 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-100">
                                                            <div className="relative flex items-center">
                                                                <div className="absolute -left-[14.5px] w-2 h-2 rounded-full bg-emerald-500" />
                                                                <p className="text-xs text-slate-700 truncate font-medium">
                                                                    {
                                                                        booking.pickup_address
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="relative flex items-center">
                                                                <div className="absolute -left-[14.5px] w-2 h-2 rounded-full bg-slate-300" />
                                                                <p className="text-xs text-slate-400 truncate">
                                                                    {booking.dropoff_address ||
                                                                        "Mise à disposition"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* BOOKING TYPE */}
                                                    <td className="px-6 py-4.5">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                                                            {booking.type ===
                                                            "course_fixed"
                                                                ? "Course"
                                                                : booking.type ===
                                                                    "event_hourly"
                                                                  ? "Location"
                                                                  : "Distance"}
                                                        </span>
                                                    </td>

                                                    {/* DATE & TIME */}
                                                    <td className="px-6 py-4.5">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                                                                <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                                                                {new Date(
                                                                    booking.start_time,
                                                                ).toLocaleDateString(
                                                                    "fr-FR",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                    },
                                                                )}
                                                            </div>
                                                            <span className="text-[11px] text-slate-400 mt-0.5 pl-5">
                                                                {new Date(
                                                                    booking.start_time,
                                                                ).toLocaleTimeString(
                                                                    "fr-FR",
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    },
                                                                )}
                                                                {" - "}
                                                                {new Date(
                                                                    booking.end_time,
                                                                ).toLocaleTimeString(
                                                                    "fr-FR",
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    },
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* AMOUNT */}
                                                    <td className="px-6 py-4.5 text-right">
                                                        <span className="font-bold text-slate-950 text-base">
                                                            {formatPrice(
                                                                booking.total_amount,
                                                                false,
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* DETAILS ACTION */}
                                                    <td className="px-6 py-4.5 text-right">
                                                        <button
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    booking,
                                                                )
                                                            }
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all shadow-sm"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* TABLE FOOTER / PAGINATION */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                                <p className="text-xs text-slate-400 font-medium">
                                    Affichage de{" "}
                                    <span className="font-semibold text-slate-700">
                                        {filteredBookings.length}
                                    </span>{" "}
                                    réservation(s)
                                </p>

                                <div className="flex items-center gap-1.5">
                                    <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 rounded-lg bg-slate-950 text-white font-bold text-xs shadow-sm flex items-center justify-center">
                                        1
                                    </button>
                                    <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* EMPTY STATE */
                        <div className="mt-6 bg-white border border-dashed border-slate-200 rounded-2xl py-16 text-center shadow-sm">
                            <FilterX className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-base font-semibold text-slate-800">
                                Aucune réservation correspondante
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                                Modifiez les termes de votre recherche ou
                                changez de filtre de statut pour trouver le
                                trajet désiré.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* DETAILS MODAL */}
            <BookingDetailModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                booking={selectedBooking}
            />
        </AuthenticatedLayout>
    );
}
