// resources/js/Components/ReservationCard.jsx (ou Pages/Reservations/components/ReservationCard.jsx)

import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import {
    AccessTime,
    CalendarToday,
    DirectionsCar,
    Place,
    CheckCircleOutline,
    PendingActions,
    Cancel,
    LocalOffer, // Pour le prix
    Payment, // Pour le statut de paiement
} from "@mui/icons-material";
import { motion } from "framer-motion";

import {
    formatPrice,
    formatDateTime,
    formatDate,
    formatTime,
    getEndTime,
} from "../../utils/Utils";
import { Link } from "@inertiajs/react";

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }, // Animation au survol
};

export default function ReservationCard({ reservation }) {
    if (!reservation) {
        return null; // Gérer le cas où la réservation est null ou undefined
    }

    // Définir les couleurs et icônes en fonction du statut
    let statusColor, statusIcon, statusText;
    switch (reservation.status) {
        case "confirmer":
            statusColor = "success"; // MUI color palette
            statusIcon = <CheckCircleOutline />;
            statusText = "Confirmée";
            break;
        case "en attente":
            statusColor = "warning";
            statusIcon = <PendingActions />;
            statusText = "En attente";
            break;
        case "annuler":
            statusColor = "error";
            statusIcon = <Cancel />;
            statusText = "Annulée";
            break;
        default:
            statusColor = "info";
            statusIcon = <DirectionsCar />; // Icône par défaut
            statusText = "Statut Inconnu";
            break;
    }

    let paymentStatusColor;
    switch (reservation.payment_status) {
        case "paye":
            paymentStatusColor = "success";
            break;
        case "en attente":
            paymentStatusColor = "warning";
            break;
        case "annuler":
            paymentStatusColor = "error";
            break;
        default:
            paymentStatusColor = "info";
            break;
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="rounded-lg shadow-lg bg-white overflow-hidden p-6 border border-gray-100 transform transition-all duration-300"
            sx={{
                "&:hover": {
                    borderColor: "teranga-gold", // Ajoute une bordure dorée au survol
                },
            }}
        >
            <Box className="flex justify-between items-start mb-4">
                <Typography
                    variant="h6"
                    component="h3"
                    className="font-semibold text-teranga-dark"
                >
                    <DirectionsCar
                        sx={{
                            verticalAlign: "bottom",
                            mr: 1,
                            color: "teranga-gold",
                        }}
                    />
                    {reservation.service.type} #{reservation.id}
                </Typography>
                <Chip
                    label={statusText}
                    icon={statusIcon}
                    color={statusColor}
                    size="small"
                    className="font-medium"
                    sx={{
                        fontWeight: "bold",
                        backgroundColor: (theme) =>
                            theme.palette[statusColor]?.main || "grey", // Utilise la couleur MUI ou gris
                        color: "white", // Texte blanc pour un meilleur contraste
                        "& .MuiChip-icon": {
                            color: "white !important", // Icône blanche
                        },
                    }}
                />
            </Box>

            {/* Détails du trajet */}
            <Box className="mb-4 space-y-2 text-teranga-medium-gray">
                <Typography
                    variant="body1"
                    className="flex  items-center"
                    sx={{ marginBottom: "20px" }}
                >
                    <Place fontSize="small" sx={{ mr: 1 }} />
                    <div className="">
                        {reservation.service.departure && (
                            <div>
                                {" "}
                                De{" "}
                                <span className="block font-medium text-teranga-dark ml-2">
                                    {reservation.service.departure}
                                </span>
                                à
                            </div>
                        )}
                        <span className="block font-medium text-teranga-dark ml-2">
                            {reservation.service.destination}
                        </span>
                    </div>
                </Typography>

                <Typography variant="body1" className="flex items-center">
                    <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                    Le{" "}
                    <span className="font-medium text-teranga-dark ml-2">
                        {formatDate(reservation.start_date)}
                    </span>
                    <span className="font-medium text-teranga-dark ml-2">
                        {formatTime(reservation.start_hour)}
                    </span>{" "}
                    à
                    <span className="font-medium text-teranga-dark ml-2">
                        {getEndTime(
                            reservation.start_hour,
                            reservation.service.duration
                        )}
                    </span>
                </Typography>

                {reservation.service.duration && (
                    <Typography variant="body1" className="flex items-center">
                        <AccessTime fontSize="small" sx={{ mr: 1 }} />
                        Durée:{" "}
                        <span className="font-medium text-teranga-dark ml-1">
                            {reservation.service.duration} min
                        </span>
                    </Typography>
                )}
            </Box>

            {/* Prix et statut de paiement */}
            <Box className="flex justify-between items-center mb-4 pt-4 border-t border-dashed border-gray-200">
                <Typography
                    variant="body1"
                    className="flex items-center text-teranga-gold font-bold text-lg"
                >
                    <LocalOffer sx={{ mr: 1 }} />
                    {formatPrice(reservation.service.price)}
                </Typography>
                <Chip
                    className="font-medium"
                    label={reservation.payment_status || "Non renseigné"}
                    icon={<Payment />}
                    color={paymentStatusColor}
                    size="small"
                    sx={{
                        fontWeight: "bold",
                        backgroundColor: (theme) =>
                            theme.palette[paymentStatusColor]?.main || "grey",
                        color: "white",
                        "& .MuiChip-icon": {
                            color: "white !important",
                        },
                        display: "none",
                    }}
                />
            </Box>

            {/* Actions (exemple) */}
            <Link
                href={route("reservation.index", reservation.id)}
                className="mt-4"
            >
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        borderColor: "teranga-gold",
                        color: "teranga-gold",
                        "&:hover": {
                            backgroundColor: "teranga-gold",
                            color: "white",
                        },
                        width: "100%",
                    }}
                >
                    Plus de détails
                </Button>
            </Link>
        </motion.div>
    );
}
