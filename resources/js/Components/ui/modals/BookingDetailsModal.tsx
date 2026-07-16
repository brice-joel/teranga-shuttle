import React, { useState } from "react";
import {
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Clock,
    Users,
    Briefcase,
    CreditCard,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
    Loader2,
} from "lucide-react";
import { Booking, BookingStatus } from "@/types";
import { formatDate, formatPrice } from "@/Utils/formatters";
import { router } from "@inertiajs/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export default function BookingDetailModal({
    isOpen,
    onClose,
    booking,
}: Props) {
    if (!isOpen || !booking) return null;

    const MySwal = withReactContent(Swal);

    const [processing, setProcessing] = useState(false);

    const updateStatus = async (newStatus: BookingStatus) => {
        // Déclenchement de l'alerte de confirmation
        const result = await MySwal.fire({
            title: "Opération de changement de statut de la reservation",
            text: `${newStatus === "validated" ? "Accepter" : "Refuser"} la reservation du client ?. Cette operation est irréversible.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je confirme !",
            cancelButtonText: "Annuler",
            reverseButtons: true, // Place le bouton de confirmation à droite
        });

        // Gestion du résultat
        if (result.isConfirmed) {
            try {
                router.patch(
                    route("admin.booking.update", booking.id),
                    {
                        status: newStatus,
                    },
                    {
                        onSuccess: () => onClose(),
                        onStart: () => setProcessing(true),
                        onFinish: () => {
                            setProcessing(false);
                            //reload
                            window.location.reload();
                        },
                    },
                );
            } catch (error) {}
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 italic uppercase">
                            Fiche Réservation{" "}
                            <span className="text-amber-500">
                                #{booking.id}
                            </span>
                        </h2>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">
                            Créée le {formatDate(booking.created_at)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-full border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Section Client */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <User className="w-3 h-3" /> Informations Client
                            </h3>
                            <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        <User className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="font-bold text-slate-800 text-sm">
                                        {booking.user?.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm text-slate-600">
                                        {booking.user?.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm text-slate-600">
                                        {booking.user?.phone || "Non renseigné"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        <Info className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <span className="text-sm text-slate-600">
                                        {booking.notes ||
                                            "Aucune note supplémentaire"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Section Logistique (Passagers/Bagages) */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Briefcase className="w-3 h-3" /> Logistique &
                                Capacité
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                                    <Users className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                                    <p className="text-lg font-black text-slate-900">
                                        {booking.adults_count +
                                            booking.children_count}
                                    </p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">
                                        Passagers
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                                    <Briefcase className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                                    <p className="text-lg font-black text-slate-900">
                                        {booking.luggage_count}
                                    </p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">
                                        Bagages
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section Trajet (Pleine largeur) */}
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> Détails du Trajet
                            </h3>
                            <div className="border border-slate-100 rounded-3xl p-6 relative">
                                <div className="flex flex-col gap-6 relative">
                                    {/* Ligne pointillée décorative */}
                                    <div className="absolute left-4 top-5 bottom-5 w-0.5 border-l-2 border-dashed border-slate-200" />

                                    <div className="flex gap-4 relative z-10">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 border-4 border-white shadow-sm shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
                                            A
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                                Prise en charge
                                            </p>
                                            <p className="font-bold text-slate-800 italic">
                                                {booking.pickup_address}
                                            </p>
                                            <p className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" />{" "}
                                                {formatDate(booking.start_time)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 relative z-10">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 border-4 border-white shadow-sm shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
                                            B
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                                Destination
                                            </p>
                                            <p className="font-bold text-slate-800 italic">
                                                {booking.dropoff_address ||
                                                    "Mise à disposition (Fin de service)"}
                                            </p>
                                            <p className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" />{" "}
                                                {formatDate(booking.end_time)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Résumé financier */}
                    <div className="mt-8 bg-slate-900 rounded-3xl p-6 flex items-center justify-between text-white shadow-xl shadow-slate-900/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                                    Total à payer
                                </p>
                                <p className="text-2xl font-black italic">
                                    {formatPrice(booking.total_amount, false)}{" "}
                                    <span className="text-sm not-italic text-amber-500">
                                        CFA
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">
                                Statut Actuel
                            </p>
                            <span className="text-[10px] font-black uppercase px-3 py-1 bg-white/10 rounded-full border border-white/20">
                                {booking.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
                    {booking.status === "pending" && (
                        <button
                            onClick={() => updateStatus("validated")}
                            disabled={processing}
                            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all"
                        >
                            {processing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Valider la demande</span>
                                </>
                            )}
                        </button>
                    )}

                    {booking.status !== "cancelled" &&
                        booking.status !== "finished" && (
                            <button
                                onClick={() => updateStatus("cancelled")}
                                disabled={processing}
                                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-100 py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all"
                            >
                                {processing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4" />{" "}
                                        <span>Annuler la réservation</span>
                                    </>
                                )}
                            </button>
                        )}

                    {booking.status === "validated" && (
                        <div className="w-full text-center py-2 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 rounded-xl border border-blue-100">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase">
                                En attente du paiement client
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
