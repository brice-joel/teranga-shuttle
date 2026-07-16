import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import {
    Search,
    Eye,
    MoreHorizontal,
    ArrowUpDown,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    FilterX,
} from "lucide-react";
import { formatDate, formatPrice } from "@/Utils/formatters"; // En supposant que ces utilitaires existent
import { Booking, BookingStatus, Payment, PaymentStatus } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookingDetailModal from "@/Components/ui/modals/BookingDetailsModal";

export default function Index({ payments }: { payments: Payment[] }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    console.log("paiements", payments);

    // Filtrage simple pour la démo
    const filteredPayments = useMemo(() => {
        return payments.filter(
            (p) =>
                p.booking?.user?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                p.booking?.user?.email
                    .toLowerCase()
                    .includes(search.toLowerCase()),
        );
    }, [search]);

    const getStatusBadge = (status: PaymentStatus) => {
        const styles = {
            success: "bg-emerald-50 text-emerald-700 border-emerald-100",
        };
        const labels = {
            success: "Succès",
        };
        return (
            <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${styles[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    //modal booking
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
        null,
    );
    const handleOpenModal = async (payment: Payment) => {
        setSelectedPayment(payment);
        setIsOpen(true);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Paiements" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    {/* HEADER */}
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">
                                Gestion des Paiements
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Gérez et consultez tous les paiements clients.
                            </p>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-auto">
                            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                                <p className="text-xs font-medium text-slate-400 uppercase">
                                    Total
                                </p>

                                <h3 className="text-2xl font-black text-slate-900 mt-1">
                                    {payments.length}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* TOOLBAR */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                            {/* SEARCH */}
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder="Rechercher un client, email "
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="
                                    w-full
                                    pl-11
                                    pr-4
                                    py-3
                                    bg-slate-50
                                    border
                                    border-slate-200
                                    rounded-xl
                                    text-sm
                                    text-slate-700
                                    placeholder:text-slate-400
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-amber-500/10
                                    focus:border-amber-500
                                    transition-all
                                "
                                />
                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center justify-between lg:justify-end gap-3">
                                <span className="text-sm text-slate-500">
                                    {filteredPayments.length} résultat(s)
                                </span>

                                <button
                                    className="
                                    px-4 py-2.5
                                    rounded-xl
                                    border border-slate-200
                                    bg-white
                                    hover:bg-slate-50
                                    text-slate-600
                                    text-sm
                                    font-medium
                                    transition-all
                                "
                                >
                                    Filtres
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div
                        className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    shadow-sm
                    overflow-hidden
                "
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                {/* HEADER */}
                                <thead className="bg-slate-50 sticky top-0 z-10">
                                    <tr className="border-b border-slate-200">
                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Client
                                        </th>

                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Type
                                        </th>

                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Statut
                                        </th>

                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Date
                                        </th>

                                        <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Trajet
                                        </th>

                                        <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Montant
                                        </th>

                                        <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {/* BODY */}
                                <tbody className="divide-y divide-slate-100">
                                    {filteredPayments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            className="
                                            hover:bg-amber-50/40
                                            transition-all
                                            duration-200
                                            group
                                        "
                                        >
                                            {/* USER */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className="
                                                    w-11 h-11
                                                    rounded-2xl
                                                    bg-gradient-to-br
                                                    from-amber-400
                                                    to-amber-500
                                                    text-white
                                                    flex
                                                    items-center
                                                    justify-center
                                                    font-bold
                                                    shadow-sm
                                                "
                                                    >
                                                        {payment.booking?.user?.name.charAt(
                                                            0,
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-slate-900">
                                                            {
                                                                payment.booking
                                                                    ?.user?.name
                                                            }
                                                        </p>

                                                        <p className="text-sm text-slate-500">
                                                            {
                                                                payment.booking
                                                                    ?.user
                                                                    ?.email
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* TYPE */}
                                            <td className="px-6 py-5">
                                                <span
                                                    className="
                                                inline-flex
                                                items-center
                                                px-3 py-1
                                                rounded-full
                                                bg-slate-100
                                                text-slate-700
                                                text-xs
                                                font-semibold
                                            "
                                                >
                                                    {payment.booking?.type ===
                                                    "course_fixed"
                                                        ? "Course fixe"
                                                        : payment.booking
                                                                ?.type ===
                                                            "event_hourly"
                                                          ? "Location Horaire"
                                                          : ""}
                                                </span>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-5">
                                                {getStatusBadge(payment.status)}
                                            </td>

                                            {/* DATE */}
                                            <td className="px-6 py-5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                                        <CalendarIcon className="w-4 h-4 text-amber-500" />

                                                        {formatDate(
                                                            payment.created_at,
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* TRAJET */}
                                            <td className="px-6 py-5 max-w-[260px]">
                                                <div className="space-y-2">
                                                    <div className="flex gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />

                                                        <p className="text-sm text-slate-700 truncate">
                                                            {
                                                                payment.booking
                                                                    ?.pickup_address
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5" />

                                                        <p className="text-sm text-slate-400 truncate">
                                                            {payment.booking
                                                                ?.dropoff_address ||
                                                                "Location horaire"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* PRICE */}
                                            <td className="px-6 py-5 text-right">
                                                <div>
                                                    <p className="font-black text-slate-900 text-lg">
                                                        {payment.amount.toLocaleString()}
                                                    </p>

                                                    <span className="text-xs text-amber-600 font-semibold">
                                                        FCFA
                                                    </span>
                                                </div>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-5 text-right">
                                                <button
                                                    // onClick={() =>console.log(payment);

                                                    //     //handleOpenModal(payment)
                                                    // }
                                                    className="
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    w-10 h-10
                                                    rounded-xl
                                                    border border-slate-200
                                                    bg-white
                                                    text-slate-500
                                                    hover:bg-amber-500
                                                    hover:text-white
                                                    hover:border-amber-500
                                                    transition-all
                                                    shadow-sm
                                                "
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* FOOTER */}
                        <div
                            className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        justify-between
                        gap-4
                        px-6
                        py-5
                        border-t
                        border-slate-200
                        bg-slate-50
                    "
                        >
                            <p className="text-sm text-slate-500">
                                Affichage de{" "}
                                <span className="font-semibold text-slate-700">
                                    {filteredPayments.length}
                                </span>{" "}
                                paiement(s)
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    className="
                                w-10 h-10
                                rounded-xl
                                border border-slate-200
                                bg-white
                                text-slate-500
                                hover:bg-slate-100
                                transition-all
                            "
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <button
                                    className="
                                w-10 h-10
                                rounded-xl
                                bg-amber-500
                                text-white
                                font-bold
                                shadow-sm
                            "
                                >
                                    1
                                </button>

                                <button
                                    className="
                                w-10 h-10
                                rounded-xl
                                border border-slate-200
                                bg-white
                                text-slate-500
                                hover:bg-slate-100
                                transition-all
                            "
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* EMPTY */}
                    {filteredPayments.length === 0 && (
                        <div
                            className="
                        mt-6
                        bg-white
                        border border-dashed border-slate-300
                        rounded-3xl
                        py-20
                        text-center
                    "
                        >
                            <FilterX className="w-14 h-14 text-slate-200 mx-auto mb-4" />

                            <h3 className="text-lg font-bold text-slate-700">
                                Aucun résultat trouvé
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Essayez une autre recherche ou modifiez vos
                                filtres.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {/* <PaymentDetailModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                payment={selectedPayment}
            /> */}
        </AuthenticatedLayout>
    );
}
