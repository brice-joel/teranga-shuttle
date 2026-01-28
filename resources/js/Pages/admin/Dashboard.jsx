import React, { useEffect, useRef } from "react";

// Importez Chart.js et ses éléments nécessaires
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Importez les icônes Material UI équivalentes aux icônes Font Awesome
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Dashboard({
    reservations,
    data,
    data_statistics,
    data_circular_chart,
    data_total_reservations_price_by_trajet,
}) {
    // Données statiques pour le tableau de bord (à remplacer par des props dynamiques plus tard)
    const nb_users = data.total_clients;
    const nb_reservations = data.total_reservations;
    const total_reservations_price = data.total_revenus; // FCFA

    const static_users_with_most_reservations =
        data_statistics.users_with_most_reservations;

    const user_with_most_expensive_reservations =
        data_statistics.user_with_most_expensive_reservations;

    const most_popular_trajet = data_statistics.most_popular_trajet;

    const circular_chart_datas = data_circular_chart;

    const total_reservations_price_by_trajet =
        data_total_reservations_price_by_trajet;
    console.log(data_total_reservations_price_by_trajet);

    // Références pour les éléments canvas des graphiques
    const reservationsChartRef = useRef(null);
    const trajetsHistogramRef = useRef(null);
    // Ces variables seront utilisées pour stocker les instances de Chart.js
    // et doivent être gérées dans les `useEffect` pour éviter les fuites de mémoire.
    let reservationsChartInstance = null;
    let trajetsHistogramInstance = null;

    // Effet pour le graphique circulaire des réservations
    useEffect(() => {
        if (reservationsChartRef.current) {
            // Détruit l'instance précédente si elle existe pour éviter les doublons
            if (reservationsChartInstance) {
                reservationsChartInstance.destroy();
            }

            const ctxReservations =
                reservationsChartRef.current.getContext("2d");
            reservationsChartInstance = new Chart(ctxReservations, {
                type: "pie",
                data: {
                    labels: ["Confirmées", "Annulées", "En Attente"],
                    datasets: [
                        {
                            label: "Réservations",
                            data: [
                                circular_chart_datas.confirmedReservationsCount,
                                circular_chart_datas.cancelledReservationsCount,
                                circular_chart_datas.pendingReservationsCount,
                            ],
                            backgroundColor: [
                                "rgba(0, 200, 0, 0.5)", // Vert
                                "rgba(200, 0, 0, 0.5)", // Rouge
                                "rgba(255, 255, 0, 0.5)", // Jaune
                            ],
                            borderColor: [
                                "rgba(56, 189, 248, 1)", // Bleu clair
                                "rgba(244, 114, 182, 1)", // Rose
                                "rgba(252, 211, 77, 1)", // Jaune clair
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                color: "#6b7280", // Couleur du texte de la légende
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            titleColor: "#fff",
                            bodyColor: "#fff",
                            borderColor: "#cbd5e0",
                            borderWidth: 1,
                            displayColors: true,
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || "";
                                    if (context.parsed !== null) {
                                        label +=
                                            ": " +
                                            context.parsed +
                                            " (" +
                                            context.dataset.data[
                                                context.dataIndex
                                            ] +
                                            ")";
                                    }
                                    return label;
                                },
                            },
                        },
                    },
                },
            });
        }

        // Fonction de nettoyage pour détruire l'instance du graphique lorsque le composant est démonté
        return () => {
            if (reservationsChartInstance) {
                reservationsChartInstance.destroy();
                reservationsChartInstance = null;
            }
        };
    }, [circular_chart_datas]); // Dépendances : Mettre à jour si les données statiques changent (bien que statiques, c'est une bonne pratique)

    // Effet pour l'histogramme des trajets
    useEffect(() => {
        if (trajetsHistogramRef.current) {
            // Détruit l'instance précédente si elle existe
            if (trajetsHistogramInstance) {
                trajetsHistogramInstance.destroy();
            }

            const trajetLabels = Object.keys(
                total_reservations_price_by_trajet
            );
            const trajetData = Object.values(
                total_reservations_price_by_trajet
            );
            console.log(trajetData, trajetLabels);

            const ctxHistogram = trajetsHistogramRef.current.getContext("2d");
            trajetsHistogramInstance = new Chart(ctxHistogram, {
                type: "bar",
                data: {
                    labels: trajetLabels,
                    datasets: [
                        {
                            label: "Somme Totale des Réservations (FCFA)",
                            data: trajetData,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)",
                                "rgba(75, 192, 192, 0.6)",
                                "rgba(153, 102, 255, 0.6)",
                                "rgba(255, 159, 64, 0.6)",
                                "rgba(199, 232, 90, 0.6)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                                "rgba(199, 232, 90, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Trajet",
                                font: { size: 14, family: "Inter" },
                                color: "#6b7280",
                            },
                            ticks: { font: { family: "Inter" } },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Somme Totale des Réservations (FCFA)",
                                font: { size: 14, family: "Inter" },
                                color: "#6b7280",
                            },
                            beginAtZero: true,
                            ticks: { font: { family: "Inter" } },
                        },
                    },
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                color: "#6b7280",
                                font: { family: "Inter" },
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            titleColor: "#fff",
                            bodyColor: "#fff",
                            borderColor: "#cbd5e0",
                            borderWidth: 1,
                            displayColors: true,
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || "";
                                    if (context.parsed.y !== null) {
                                        label +=
                                            ": " + context.parsed.y + " FCFA";
                                    }
                                    return label;
                                },
                            },
                        },
                    },
                    font: { family: "Inter" },
                },
            });
        }

        // Fonction de nettoyage
        return () => {
            if (trajetsHistogramInstance) {
                trajetsHistogramInstance.destroy();
                trajetsHistogramInstance = null;
            }
        };
    }, [total_reservations_price_by_trajet]); // Dépendances : Mettre à jour si les données statiques changent

    return (
        <>
            <section className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {/* Carte Clients */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <PeopleIcon
                                className="text-blue-500 text-2xl mr-4"
                                sx={{ fontSize: "2rem" }}
                            />{" "}
                            {/* Icône Material UI */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    Clients Totaux
                                </h2>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    {nb_users}
                                </p>
                            </div>
                        </div>
                        <span className="inline-block py-1 px-2 rounded bg-blue-100 text-blue-600 text-xs font-semibold">
                            <ArrowUpwardIcon className="mr-1 text-xs" />
                            {circular_chart_datas.clientPercentageChange}%
                        </span>
                    </div>

                    {/* Carte Réservations */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <EventAvailableIcon
                                className="text-green-500 text-2xl mr-4"
                                sx={{ fontSize: "2rem" }}
                            />{" "}
                            {/* Icône Material UI */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    Réservations Totales
                                </h2>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    {nb_reservations}
                                </p>
                            </div>
                        </div>
                        <span className="inline-block py-1 px-2 rounded bg-green-100 text-green-600 text-xs font-semibold">
                            <ArrowUpwardIcon className="mr-1 text-xs" />
                            {circular_chart_datas.reservationPercentageChange}%
                        </span>
                    </div>

                    {/* Carte Revenus */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <MonetizationOnIcon
                                className="text-purple-500 text-2xl mr-4"
                                sx={{ fontSize: "2rem" }}
                            />{" "}
                            {/* Icône Material UI */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    Revenu Total Généré
                                </h2>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    {total_reservations_price} FCFA
                                </p>
                            </div>
                        </div>
                        <span className="inline-block py-1 px-2 rounded bg-purple-100 text-purple-600 text-xs font-semibold">
                            <ArrowUpwardIcon className="mr-1 text-xs" />
                            {circular_chart_datas.revenuePercentageChange}%
                        </span>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h1 className="text-xl font-semibold text-gray-900 mb-4 md:mb-6 lg:mb-8">
                    Les clients ayant le plus de réservations
                </h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nom
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tel
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NB de réservations
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Prix total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {static_users_with_most_reservations.map(
                                (user, index) => (
                                    <tr
                                        key={user.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                    >
                                        <th
                                            scope="row"
                                            className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {index + 1}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {user.email}
                                        </th>
                                        <td className="px-3 py-2">
                                            {user.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.phone}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.reservations_count}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.total_price} FCFA
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-6 lg:mb-8">
                    Les réservations les plus coûteuses
                </h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nom
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tel
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Prix Total
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nb Réservations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {user_with_most_expensive_reservations.map(
                                (user, index) => (
                                    <tr
                                        key={user.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                    >
                                        <th scope="row" className="px-3 py-2">
                                            {index + 1}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {user.email}
                                        </th>
                                        <td className="px-3 py-2">
                                            {user.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.phone}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.total_spent} FCFA
                                        </td>{" "}
                                        {/* Ajout de FCFA */}
                                        <td className="px-3 py-2">
                                            {user.reservations_count}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8">
                <div className="container mx-auto p-4 md:p-6 lg:p-8">
                    <h1 className="text-xl font-semibold text-gray-900 mb-4 md:mb-6 lg:mb-8">
                        Trajet le Plus Emprunté
                    </h1>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                        {most_popular_trajet ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {most_popular_trajet.departure && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                            Départ:
                                        </h2>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {most_popular_trajet.departure}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Destination:
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {most_popular_trajet.destination}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Nombre de fois emprunté:
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {most_popular_trajet.reservations_count}{" "}
                                        fois
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Prix:
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {most_popular_trajet.price} FCFA
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Durée Moyenne:
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {most_popular_trajet.duration} min
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                Aucun trajet n'a été emprunté pour le moment.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <div className="container mx-auto p-4 md:p-6 lg:p-8">
                    <h1 className="text-xl font-semibold text-gray-900 mb-4 md:mb-6 lg:mb-8">
                        Somme Totale des Réservations par Trajet
                    </h1>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Histogramme
                        </h2>
                        <div className="flex justify-center">
                            <div className="w-full">
                                <canvas
                                    id="trajetsHistogram"
                                    ref={trajetsHistogramRef}
                                    className="w-full h-64"
                                ></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <div className="container mx-auto p-4 md:p-6 lg:p-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-6 lg:mb-8">
                        Statistiques Générales
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {/* Carte Clients (répétée pour les données du circular_chart_datas) */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <PeopleIcon
                                    className="text-blue-500 text-2xl mr-4"
                                    sx={{ fontSize: "2rem" }}
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Clients Totaux
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {circular_chart_datas.totalClients}
                                    </p>
                                </div>
                            </div>
                            <span className="inline-block py-1 px-2 rounded bg-blue-100 text-blue-600 text-xs font-semibold">
                                <ArrowUpwardIcon className="mr-1 text-xs" />
                                {circular_chart_datas.clientPercentageChange}%
                            </span>
                        </div>

                        {/* Carte Réservations (répétée) */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <EventAvailableIcon
                                    className="text-green-500 text-2xl mr-4"
                                    sx={{ fontSize: "2rem" }}
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Réservations Totales
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {circular_chart_datas.totalReservations}
                                    </p>
                                </div>
                            </div>
                            <span className="inline-block py-1 px-2 rounded bg-green-100 text-green-600 text-xs font-semibold">
                                <ArrowUpwardIcon className="mr-1 text-xs" />
                                {
                                    circular_chart_datas.reservationPercentageChange
                                }
                                %
                            </span>
                        </div>

                        {/* Carte Revenus (répétée) */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <MonetizationOnIcon
                                    className="text-purple-500 text-2xl mr-4"
                                    sx={{ fontSize: "2rem" }}
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Revenu Total
                                    </h2>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {circular_chart_datas.totalRevenue} FCFA
                                    </p>
                                </div>
                            </div>
                            <span className="inline-block py-1 px-2 rounded bg-purple-100 text-purple-600 text-xs font-semibold">
                                <ArrowUpwardIcon className="mr-1 text-xs" />
                                {circular_chart_datas.revenuePercentageChange}%
                            </span>
                        </div>
                    </div>

                    {/* Diagramme Circulaire Réservations */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Pourcentage des Réservations par Statut
                        </h2>
                        <div className="flex justify-center">
                            <div className="w-full md:w-1/2">
                                <canvas
                                    id="reservationsChart"
                                    ref={reservationsChartRef}
                                    width="400"
                                    height="400"
                                ></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
