import React, { useState, useMemo } from "react";
import { useForm, router } from "@inertiajs/react";
import { Edit, Trash2, Eye, Plus, Search, X, Loader2 } from "lucide-react";
import { formatDuration, formatPrice } from "@/Utils/formatters";
import { Trip } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// --- Interfaces ---

interface Props {
    trips: Trip[];
}

type ModalType = "create" | "edit" | "view" | "delete" | null;

export default function Trips({ trips }: Props) {
    // --- États pour la recherche et les modales ---
    const [search, setSearch] = useState("");
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    // --- Formulaire Inertia (Création & Modification) ---
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            departure_city: "",
            arrival_city: "",
            fixed_price: "",
            estimated_duration_minutes: "",
            is_active: true,
        });

    // --- Filtrage des trajets en temps réel ---
    const filteredTrips = useMemo(() => {
        return trips.filter(
            (trip) =>
                trip.departure_city
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                trip.arrival_city.toLowerCase().includes(search.toLowerCase()),
        );
    }, [trips, search]);

    // --- Gestionnaires d'actions ---
    const openModal = (type: ModalType, trip: Trip | null = null) => {
        setActiveModal(type);
        setSelectedTrip(trip);
        clearErrors();

        if (type === "edit" && trip) {
            setData({
                departure_city: trip.departure_city,
                arrival_city: trip.arrival_city,
                fixed_price: trip.fixed_price.toString(),
                estimated_duration_minutes:
                    trip.estimated_duration_minutes.toString(),
                is_active: trip.is_active,
            });
        } else {
            reset();
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedTrip(null);
        reset();
    };

    // --- Soumissions des formulaires (Requêtes Inertia) ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeModal === "create") {
            post(route("admin.trips.store"), { onSuccess: () => closeModal() });
        } else if (activeModal === "edit" && selectedTrip) {
            put(route("admin.trips.update", selectedTrip.id), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = () => {
        if (!selectedTrip) return;
        router.delete(route("admin.trips.destroy", selectedTrip.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* --- Barre supérieure: Titre & Ajout --- */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestion des trajets
                    </h1>
                    <button
                        onClick={() => openModal("create")}
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Ajouter un trajet
                    </button>
                </div>

                {/* --- Barre de recherche --- */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher une ville de départ ou d'arrivée..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>

                {/* --- Tableau des trajets --- */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <th className="p-4">Départ</th>
                                    <th className="p-4">Arrivée</th>
                                    <th className="p-4">Prix Fixe</th>
                                    <th className="p-4">Durée Estimée</th>
                                    <th className="p-4">Statut</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                                {filteredTrips.length > 0 ? (
                                    filteredTrips.map((trip) => (
                                        <tr
                                            key={trip.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-4 font-medium text-gray-900">
                                                {trip.departure_city}
                                            </td>
                                            <td className="p-4 font-medium text-gray-900">
                                                {trip.arrival_city}
                                            </td>
                                            <td className="p-4">
                                                {formatPrice(
                                                    trip.fixed_price,
                                                    false,
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {formatDuration(
                                                    trip.estimated_duration_minutes,
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trip.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                                >
                                                    {trip.is_active
                                                        ? "Actif"
                                                        : "Inactif"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() =>
                                                        openModal("view", trip)
                                                    }
                                                    className="text-gray-500 hover:text-gray-700 p-1 inline-flex"
                                                    title="Voir"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal("edit", trip)
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 p-1 inline-flex"
                                                    title="Modifier"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal(
                                                            "delete",
                                                            trip,
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 p-1 inline-flex"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-8 text-center text-gray-500"
                                        >
                                            Aucun trajet trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- MODALE : FORMULAIRE (Création / Modification) --- */}
                {(activeModal === "create" || activeModal === "edit") && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {activeModal === "create"
                                        ? "Ajouter un nouveau trajet"
                                        : "Modifier le trajet"}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="p-6 space-y-4"
                            >
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Départ
                                    </label>
                                    <input
                                        type="text"
                                        value={data.departure_city}
                                        onChange={(e) =>
                                            setData(
                                                "departure_city",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.departure_city && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.departure_city}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Arrivée
                                    </label>
                                    <input
                                        type="text"
                                        value={data.arrival_city}
                                        onChange={(e) =>
                                            setData(
                                                "arrival_city",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.arrival_city && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.arrival_city}
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Prix (FCFA)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.fixed_price}
                                            onChange={(e) =>
                                                setData(
                                                    "fixed_price",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.fixed_price && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors.fixed_price}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Durée (minutes)
                                        </label>
                                        <input
                                            type="number"
                                            value={
                                                data.estimated_duration_minutes
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "estimated_duration_minutes",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.estimated_duration_minutes && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {
                                                    errors.estimated_duration_minutes
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                "is_active",
                                                e.target.checked,
                                            )
                                        }
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="text-sm font-medium text-gray-700 select-none"
                                    >
                                        Trajet actif
                                    </label>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 min-w-[100px]"
                                    >
                                        {processing ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            "Enregistrer"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- MODALE : VOIR DETAILS --- */}
                {activeModal === "view" && selectedTrip && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Détails du trajet
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <span className="text-gray-500 font-medium">
                                        Ville départ :
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {selectedTrip.departure_city}
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        Ville arrivée :
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {selectedTrip.arrival_city}
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        Prix du Trajet :
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {formatPrice(
                                            selectedTrip.fixed_price,
                                            true,
                                        )}
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        Durée estimée :
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {formatDuration(
                                            selectedTrip.estimated_duration_minutes,
                                        )}
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        Statut :
                                    </span>
                                    <span>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedTrip.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                        >
                                            {selectedTrip.is_active
                                                ? "Actif"
                                                : "Inactif"}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MODALE : CONFIRMATION SUPPRESSION --- */}
                {activeModal === "delete" && selectedTrip && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-xl  max-w-sm overflow-hidden">
                            <div className="p-6 text-center space-y-4">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                                    <Trash2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Confirmer la suppression
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Êtes-vous sûr de vouloir supprimer le
                                        trajet de{" "}
                                        <span className="font-semibold">
                                            {selectedTrip.departure_city}
                                        </span>{" "}
                                        à{" "}
                                        <span className="font-semibold">
                                            {selectedTrip.arrival_city}
                                        </span>{" "}
                                        ? Cette action est irréversible.
                                    </p>
                                </div>
                                <div className="flex justify-center gap-3 pt-2">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
