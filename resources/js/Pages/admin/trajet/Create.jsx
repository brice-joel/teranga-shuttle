import React from "react";
import { useForm, Link } from "@inertiajs/react";
// Assurez-vous d'inclure Font Awesome dans votre projet HTML principal
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

export default function Create({ trajet }) {
    // Détermine si nous sommes en mode édition (si un trajet est passé)
    const isEditing = !!trajet.id;

    // Initialisation du formulaire avec useForm d'Inertia
    const { data, setData, post, put, processing, errors } = useForm({
        start: trajet.start || "",
        destination: trajet.destination || "",
        price: trajet.price || "",
        duration: trajet.duration || "",
    });

    // Gère les changements de valeurs dans les champs du formulaire
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // Si c'est une édition, utilise la méthode PUT d'Inertia
            put(route("admin.trajet.update", trajet.id), {
                onError: (err) => console.error("Erreur mise à jour:", err),
            });
        } else {
            // Si c'est une création, utilise la méthode POST d'Inertia
            post(route("admin.trajet.store"), {
                onError: (err) => console.error("Erreur création:", err),
            });
        }
    };

    return (
        <div className="py-10 bg-gray-100 min-h-screen font-sans">
            <section className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        {isEditing
                            ? `Modifier le Trajet: ${trajet.start} - ${trajet.destination}`
                            : "Créer un Trajet"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Champ Départ */}
                        <div>
                            <label
                                htmlFor="start"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Départ
                            </label>
                            <input
                                type="text"
                                name="start"
                                id="start"
                                value={data.start}
                                onChange={handleChange}
                                required
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${
                                        errors.start
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }
                                `}
                                placeholder="Ville de départ"
                            />
                            {errors.start && (
                                <p className="text-red-500 text-xs italic mt-1">
                                    {errors.start}
                                </p>
                            )}
                        </div>

                        {/* Champ Destination */}
                        <div>
                            <label
                                htmlFor="destination"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Destination
                            </label>
                            <input
                                type="text"
                                name="destination"
                                id="destination"
                                value={data.destination}
                                onChange={handleChange}
                                required
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${
                                        errors.destination
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }
                                `}
                                placeholder="Ville de destination"
                            />
                            {errors.destination && (
                                <p className="text-red-500 text-xs italic mt-1">
                                    {errors.destination}
                                </p>
                            )}
                        </div>

                        {/* Champ Prix */}
                        <div>
                            <label
                                htmlFor="price"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Prix (FCFA)
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={data.price}
                                onChange={handleChange}
                                required
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${
                                        errors.price
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }
                                `}
                                placeholder="Prix du trajet"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs italic mt-1">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Champ Durée Moyenne */}
                        <div>
                            <label
                                htmlFor="duration"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Durée Moyenne (minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                id="duration"
                                value={data.duration}
                                onChange={handleChange}
                                required
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${
                                        errors.duration
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }
                                `}
                                placeholder="Durée moyenne du trajet en minutes"
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-xs italic mt-1">
                                    {errors.duration}
                                </p>
                            )}
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200
                                    ${
                                        processing &&
                                        "opacity-75 cursor-not-allowed"
                                    }
                                `}
                            >
                                <i className="fas fa-save mr-2"></i>{" "}
                                {isEditing ? "Mettre à jour" : "Enregistrer"}
                            </button>
                            <Link
                                href={route("admin.trajet.index")}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 flex items-center"
                            >
                                <i className="fas fa-times mr-2"></i> Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
