// resources/js/Pages/Reservations/ShowInvoice.jsx

import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import logo from "../../assets/images/logo.png";
import { useRouteContext } from "../../contexts/RouteContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
    Typography,
    Button,
    Box,
    Chip,
    Paper,
    Divider,
    CircularProgress,
} from "@mui/material";

import {
    LocalTaxi as TaxiIcon,
    ArrowForward as ArrowForwardIcon,
    CalendarMonth as CalendarIcon,
    AccessTime as TimeIcon,
    Group as GroupIcon,
    Luggage as LuggageIcon,
    AttachMoney as MoneyIcon,
    CheckCircleOutline as PaidIcon,
    Cancel as CancelIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Receipt as ReceiptIcon,
} from "@mui/icons-material";

// Variantes pour les animations Framer Motion
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const getStatusClasses = (status) => {
    switch (status) {
        case "en attente":
            return {
                label: "En attente",
                className: "bg-orange-100 text-orange-800",
            };
        case "confirmer":
            return {
                label: "Confirmée",
                className: "bg-green-100 text-green-800",
            };
        case "annuler":
            return {
                label: "Annulée",
                className: "bg-red-100 text-red-800",
            };
        default:
            return { label: "Inconnu", className: "bg-gray-100 text-gray-800" };
    }
};

export default function ShowInvoice({ data_reservation }) {
    const { auth } = usePage().props;
    const {
        data,
        post: payReservation,
        processing: paying,
    } = useForm({
        amount: data_reservation.service.price,
        id_reservation: data_reservation.id,
    });
    const { put: cancelReservation, processing: canceling } = useForm({});

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
        if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
            cancelReservation(route("reservation.cancel", data_reservation));
        }
    };

    const formattedStartDate = format(
        new Date(data_reservation.start_date),
        "PPP",
        { locale: fr }
    );
    const reservationStatus = getStatusClasses(data_reservation.status);

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <Head title={`Facture N° ${data_reservation.id}`} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-12"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* En-tête de la facture */}
                    <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <Box className="flex items-center gap-4">
                            <img
                                src={logo}
                                alt="Logo teranga shuttle"
                                className="w-16 h-16 rounded-lg"
                            />
                            <Typography
                                variant="h4"
                                component="h1"
                                className="font-bold text-gray-900"
                            >
                                Facture de Réservation
                            </Typography>
                        </Box>
                        <Box className="text-right">
                            <Typography
                                variant="body2"
                                className="text-gray-600"
                            >
                                Date de la facture:{" "}
                                {format(new Date(), "dd/MM/yyyy")}
                            </Typography>
                            <Typography
                                variant="h6"
                                className="font-semibold text-gray-800 mt-1"
                            >
                                N° {data_reservation.id}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Informations du client */}
                    <Box mb={6}>
                        <Typography
                            variant="h5"
                            className="font-semibold text-gray-800 mb-4 flex items-center"
                        >
                            <PersonIcon className="text-gray-600 mr-2" />
                            Détails du Client
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <Box className="flex items-center">
                                <PersonIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Nom:
                                    </strong>{" "}
                                    {auth.user.name}
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <EmailIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Email:
                                    </strong>{" "}
                                    {auth.user.email}
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <PhoneIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Téléphone:
                                    </strong>{" "}
                                    {auth.user.phone}
                                </Typography>
                            </Box>
                        </div>
                    </Box>

                    {/* Informations de la réservation */}
                    <Box mb={6}>
                        <Typography
                            variant="h5"
                            className="font-semibold text-gray-800 mb-4 flex items-center"
                        >
                            <ReceiptIcon className="text-gray-600 mr-2" />
                            Détails de la Réservation
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <Box className="flex items-center">
                                <TaxiIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Service:
                                    </strong>{" "}
                                    {data_reservation.service.label}
                                </Typography>
                            </Box>
                            {data_reservation.service.type === "Trajet" && (
                                <>
                                    <Box className="flex items-center">
                                        <ArrowForwardIcon
                                            fontSize="small"
                                            className="mr-2 text-gray-500"
                                        />
                                        <Typography>
                                            <strong className="font-medium">
                                                Départ:
                                            </strong>{" "}
                                            {data_reservation.service.departure}
                                        </Typography>
                                    </Box>
                                    <Box className="flex items-center">
                                        <ArrowForwardIcon
                                            fontSize="small"
                                            className="mr-2 text-gray-500"
                                        />
                                        <Typography>
                                            <strong className="font-medium">
                                                Destination:
                                            </strong>{" "}
                                            {
                                                data_reservation.service
                                                    .destination
                                            }
                                        </Typography>
                                    </Box>
                                </>
                            )}
                            <Box className="flex items-center">
                                <CalendarIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Date:
                                    </strong>{" "}
                                    {formattedStartDate}
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <TimeIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Heure:
                                    </strong>{" "}
                                    {data_reservation.start_hour}
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <GroupIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Passagers:
                                    </strong>{" "}
                                    {data_reservation.places}
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <LuggageIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography>
                                    <strong className="font-medium">
                                        Bagages:
                                    </strong>{" "}
                                    {data_reservation.luggage}
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <MoneyIcon
                                    fontSize="small"
                                    className="mr-2 text-gray-500"
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold text-gray-900 mt-2"
                                >
                                    Total:{" "}
                                    {data_reservation.service.price.toLocaleString(
                                        "fr-FR"
                                    )}{" "}
                                    FCFA
                                </Typography>
                            </Box>
                            <Box className="flex items-center">
                                <Chip
                                    label={reservationStatus.label}
                                    size="small"
                                    className={`${reservationStatus.className} text-xs font-semibold uppercase`}
                                />
                            </Box>
                        </div>
                    </Box>

                    {/* Actions */}
                    <Box className="text-center mt-8">
                        {(data_reservation.status === "en attente" ||
                            data_reservation.payment_status ===
                                "en attente") && (
                            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                                <form onSubmit={handlePayment}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            backgroundColor: "#B58E2F",
                                            "&:hover": {
                                                backgroundColor: "#A47E29",
                                            },
                                            color: "white",
                                            fontWeight: "bold",
                                            borderRadius: "12px",
                                            padding: "12px 32px",
                                            textTransform: "none",
                                        }}
                                        disabled={paying}
                                        startIcon={
                                            paying ? (
                                                <CircularProgress
                                                    size={24}
                                                    color="inherit"
                                                />
                                            ) : (
                                                <PaidIcon />
                                            )
                                        }
                                    >
                                        {paying
                                            ? "Paiement en cours..."
                                            : "Payer maintenant"}
                                    </Button>
                                </form>

                                <form onSubmit={handleCancel}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            borderColor: "red",
                                            color: "red",
                                            "&:hover": {
                                                borderColor: "darkred",
                                                backgroundColor:
                                                    "rgba(255, 0, 0, 0.04)",
                                            },
                                            fontWeight: "bold",
                                            borderRadius: "12px",
                                            padding: "12px 32px",
                                            textTransform: "none",
                                        }}
                                        disabled={canceling}
                                        startIcon={
                                            canceling ? (
                                                <CircularProgress
                                                    size={24}
                                                    color="inherit"
                                                />
                                            ) : (
                                                <CancelIcon />
                                            )
                                        }
                                    >
                                        {canceling
                                            ? "Annulation en cours..."
                                            : "Annuler la réservation"}
                                    </Button>
                                </form>
                            </div>
                        )}
                        {data_reservation.status === "confirmer" &&
                            data_reservation.payment_status ===
                                "en attente" && (
                                <Typography
                                    variant="h6"
                                    className="text-green-600 font-bold"
                                >
                                    <PaidIcon className="mr-2" />
                                    Réservation confirmée.
                                </Typography>
                            )}
                        {data_reservation.payment_status === "paid" && (
                            <Typography
                                variant="h6"
                                className="text-green-600 font-bold"
                            >
                                <PaidIcon className="mr-2" />
                                Réservation confirmée et payée.
                            </Typography>
                        )}
                        {data_reservation.status === "annuler" && (
                            <Typography
                                variant="h6"
                                className="text-red-600 font-bold"
                            >
                                <CancelIcon className="mr-2" />
                                Cette réservation a été annulée.
                            </Typography>
                        )}
                    </Box>
                </motion.div>
            </div>
        </section>
    );
}
