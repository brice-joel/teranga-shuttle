// resources/js/Pages/Reservations/ShowInvoice.jsx

import React from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale"; // Import French locale for date formatting
import logo from "../../assets/images/logo.png";
import { useRouteContext } from "../../contexts/RouteContext";

export default function Index({ data_reservation }) {
    const route = useRouteContext();
    const { auth } = usePage().props;

    // Format current date for the invoice date
    const currentDate = format(new Date(), "dd/MM/yyyy");

    // Use useForm for the payment action
    const {
        data,
        post: payReservation,
        processing: paying,
    } = useForm({
        amount: data_reservation.service.price,
        id_reservation: data_reservation.id,
    });

    // Use useForm for the cancellation action
    const { put: cancelReservation, processing: canceling } = useForm({});
    const [isPaying, setIsPaying] = React.useState(false);

    /* const handlePayment = (e) => {
        e.preventDefault();
        console.log(data);
        router.post(route("payment.create-checkout-session", data), {
            onSuccess: (page) => {
                
                console.log(page.props.url);
                window.location.href = page.data.url;
            },
            onError: (formErrors) => {
                const message = Object.values(formErrors).flat().join("\n");
                toast.error(`Erreur lors de paiement : ${message}`, {
                    position: "bottom-left",
                });
            },
        });
        // payReservation(route("payment.create-checkout-session", data));
    };
*/
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                route("payment.create-checkout-session"),
                data
            );

            // ✅ Redirection manuelle vers Stripe
            window.location.href = response.data.url;
        } catch (error) {
            console.error(error);

            const message =
                error?.response?.data?.message || "Erreur inattendue";
            toast.error(`Erreur lors de paiement : ${message}`, {
                position: "bottom-left",
            });
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        // You might want to add a confirmation dialog here before canceling
        if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
            cancelReservation(route("reservation.cancel", data_reservation)); //data_reservation.id
        }
    };

    // Helper to get status class
    const getStatusClasses = (status) => {
        switch (status) {
            case "en attente":
                return "bg-yellow-100 text-yellow-800";
            case "confirmer":
                return "bg-green-100 text-green-800";
            case "annuler":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    console.log(data_reservation);

    return (
        <section className="py-16 bg-gray-100">
            <Head title={`Facture N° ${data_reservation.id}`} />

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                                <i className="fas fa-file-invoice mr-2 text-color-500"></i>{" "}
                                Facture N° {data_reservation.id}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Date : {data_reservation.start_date}
                            </p>
                        </div>
                        <div className="text-right">
                            {/* In React with Inertia, you'd use the asset helper or a direct path */}
                            {/* Assuming your logo is in public/images/logo.png */}
                            <img
                                src={logo}
                                alt="Logo teranga shuttle"
                                className="w-20 h-20 rounded-xl  mx-auto"
                            />
                        </div>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                            <i className="fas fa-user mr-2 text-color-500"></i>{" "}
                            Informations du Client
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="text-gray-700">
                                <strong className="font-medium">Nom :</strong>{" "}
                                {auth.user.name}
                            </p>
                            <p className="text-gray-700">
                                <strong className="font-medium">Email :</strong>{" "}
                                {auth.user.email}
                            </p>
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Téléphone :
                                </strong>{" "}
                                {auth.user.phone}
                            </p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                            <i className="fas fa-info-circle mr-2 text-color-500"></i>{" "}
                            Informations de la Réservation
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Type de réservation :
                                </strong>{" "}
                                {data_reservation.service.label}
                            </p>
                            {data_reservation.service.type === "Trajet" ? (
                                <>
                                    <p className="text-gray-700">
                                        <strong className="font-medium">
                                            Départ :
                                        </strong>{" "}
                                        {data_reservation.service.departure}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong className="font-medium">
                                            Destination :
                                        </strong>{" "}
                                        {data_reservation.service.destination}
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-700">
                                    <strong className="font-medium">
                                        Course :
                                    </strong>{" "}
                                    {data_reservation.service.label}
                                </p>
                            )}
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Date de Réservation :
                                </strong>{" "}
                                {data_reservation.start_date}
                            </p>
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Heure de Réservation :
                                </strong>{" "}
                                {data_reservation.start_hour}
                            </p>
                            <div className="uppercase">
                                <strong className="font-medium">
                                    Statut :
                                </strong>
                                <span
                                    className={`${getStatusClasses(
                                        data_reservation.status
                                    )} text-xs font-medium me-2 px-2.5 py-1 rounded-full`}
                                >
                                    {data_reservation.status}
                                </span>
                            </div>
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Durée moyenne :
                                </strong>{" "}
                                {data_reservation.service.duration} Minutes
                            </p>
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Nb Passagers :
                                </strong>{" "}
                                {data_reservation.places}
                            </p>
                            <p className="text-gray-700">
                                <strong className="font-medium">
                                    Baggages :
                                </strong>{" "}
                                {data_reservation.luggage}
                            </p>

                            <p className="text-xl font-bold text-gray-800">
                                <strong className="font-medium">Prix :</strong>{" "}
                                <span className="underline">
                                    {data_reservation.service.price} FCFA
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        {data_reservation.status === "en attente" && (
                            <div className="flex flex-col md:flex-row justify-center items-center gap-4 ">
                                <form onSubmit={handlePayment}>
                                    {/* CSRF token is not needed in Inertia React forms */}
                                    {/* Hidden inputs for amount and id_reservation are handled in useForm data */}
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors text-lg flex items-center"
                                        disabled={paying} // Disable button while paying
                                    >
                                        <i className="fas fa-credit-card mr-2"></i>{" "}
                                        {paying
                                            ? "Traitement..."
                                            : "Payer maintenant"}
                                    </button>
                                </form>

                                <form onSubmit={handleCancel}>
                                    {/* CSRF token and method spoofing handled by Inertia's useForm.put */}
                                    <button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors text-sm flex items-center"
                                        disabled={canceling} // Disable button while canceling
                                    >
                                        <i className="fas fa-times-circle mr-2"></i>{" "}
                                        {canceling
                                            ? "Annulation..."
                                            : "Annuler la réservation"}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
