import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react"; // Importez Link et useForm d'Inertia
// Assurez-vous d'inclure Font Awesome dans votre projet HTML principal
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

// Composant Modal de suppression (peut être un composant séparé, ici inclus pour l'exemple)
const DeleteModal = ({ isOpen, onClose, routeToDelete, trajetId }) => {
    const { delete: inertiaDelete, processing } = useForm();

    const handleDelete = () => {
        inertiaDelete(routeToDelete, {
            preserveScroll: true,
            onSuccess: () => {
                onClose(); // Ferme le modal après suppression réussie
                // Vous pouvez ajouter ici une logique pour rafraîchir la liste ou afficher un message
            },
            onError: (errors) => {
                console.error("Erreur de suppression:", errors);
                // Gérer les erreurs, par exemple afficher un message d'erreur
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Confirmer la suppression
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer ce trajet (ID: {trajetId}
                    ) ? Cette action est irréversible.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                        disabled={processing}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                        disabled={processing}
                    >
                        {processing ? "Suppression..." : "Supprimer"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Index({ trajets }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrajetToDelete, setCurrentTrajetToDelete] = useState(null);

    const openDeleteModal = (trajet) => {
        setCurrentTrajetToDelete(trajet);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setCurrentTrajetToDelete(null);
    };

    return (
        <div className="py-10 bg-gray-100 min-h-screen font-sans">
            <section className="container mx-auto px-4 mb-8">
                <Link
                    href={route("admin.trajet.create")}
                    className="px-6 py-3 bg-blue-700 text-gray-100 rounded-xl hover:bg-blue-900 transition-colors duration-200 text-lg font-semibold shadow-md"
                >
                    Nouveau Trajet
                </Link>
            </section>

            <section className="container mx-auto px-4">
                <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Liste des Trajets
                    </h1>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Départ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Destination
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Prix
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Durée moyenne (min)
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {trajets.length > 0 ? (
                                    trajets.map((trajet, index) => (
                                        <tr
                                            key={trajet.id}
                                            className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-3 text-gray-900">
                                                {trajet.start}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900">
                                                {trajet.destination}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900">
                                                {trajet.price} €
                                            </td>
                                            <td className="px-6 py-3 text-gray-900">
                                                {trajet.duration}
                                            </td>
                                            <td className="px-4 py-3 text-center flex items-center justify-center space-x-2">
                                                {/* Bouton Voir - Vous devrez définir la route appropriée */}
                                                <Link
                                                    href=""
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center transition-colors duration-200"
                                                    title="Voir"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </Link>
                                                {/* Bouton Modifier */}
                                                <Link
                                                    href={route(
                                                        "admin.trajet.edit",
                                                        trajet.id
                                                    )}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center transition-colors duration-200"
                                                    title="Modifier"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                {/* Bouton Supprimer */}
                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(trajet)
                                                    }
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center transition-colors duration-200"
                                                    title="Supprimer"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-4 text-center text-gray-600"
                                        >
                                            Aucun trajet trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Modal de suppression */}
            <DeleteModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                routeToDelete={
                    currentTrajetToDelete
                        ? route("admin.trajet.delete", currentTrajetToDelete.id)
                        : ""
                }
                trajetId={
                    currentTrajetToDelete ? currentTrajetToDelete.id : null
                }
            />
        </div>
    );
}
