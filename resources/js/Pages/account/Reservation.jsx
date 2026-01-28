// resources/js/Pages/Reservations/ReservationList.jsx (ou un autre chemin logique)

import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react"; // Pour récupérer les props Inertia si nécessaire
import {
    Box,
    Typography,
    Tabs,
    Tab,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    FormatListBulleted as ListIcon,
    CheckCircle as CheckIcon,
    AccessTime as ClockIcon,
    Cancel as CancelIcon,
    CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import ReservationCard from "./ReservationCard"; // Ajustez le chemin si nécessaire

// Variantes pour les animations Framer Motion
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function ReservationList({ reservations }) {
    // Dans une vraie application Inertia, vous recevriez 'reservations' via props:
    // const { reservations: initialReservations, auth } = usePage().props;
    // Pour l'exemple statique:
    const initialReservations = reservations;

    const [activeTab, setActiveTab] = useState(0);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuler un léger délai de chargement pour l'effet visuel
        const timer = setTimeout(() => {
            setLoading(false);
            filterReservations(activeTab, initialReservations);
        }, 800); // 800ms de chargement simulé

        return () => clearTimeout(timer); // Nettoyage du timer
    }, [activeTab, initialReservations]); // Re-filtre quand l'onglet ou les réservations changent

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
        // Le filtrage se fera via l'useEffect
    };

    const filterReservations = (tabIndex, reservations) => {
        if (!reservations) {
            setFilteredReservations([]);
            return;
        }

        let filtered = [];
        switch (tabIndex) {
            case 0: // Tout
                filtered = reservations;
                break;
            case 1: // Confirmé
                filtered = reservations.filter(
                    (res) => res.status === "confirmer"
                );
                break;
            case 2: // En attente
                filtered = reservations.filter(
                    (res) => res.status === "en attente"
                );
                break;
            case 3: // Annulé
                filtered = reservations.filter(
                    (res) => res.status === "annuler"
                );
                break;
            default:
                filtered = reservations;
        }
        setFilteredReservations(filtered);
    };

    return (
        <section className="bg-teranga-cream py-16 md:py-20 min-h-screen flex flex-col">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl lg:text-5xl font-extrabold text-teranga-dark text-center mb-10 leading-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    <CalendarIcon
                        sx={{
                            fontSize: { xs: "2.5rem", lg: "3.5rem" },
                            verticalAlign: "middle",
                            mr: 2,
                            color: "teranga-gold",
                        }}
                    />
                    Mes Réservations
                </motion.h1>

                <motion.div
                    className="mb-10 flex justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={handleChangeTab}
                        variant="scrollable" // Permet le défilement sur mobile
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="Onglets de réservation"
                        centered
                        sx={{
                            ".MuiTabs-indicator": {
                                backgroundColor: "teranga-gold",
                                height: "3px",
                            },
                            ".MuiTabs-flexContainer": {
                                gap: { xs: "8px", md: "16px" },
                                justifyContent: "center",
                            },
                        }}
                    >
                        <Tab
                            label={
                                <Box className="flex items-center">
                                    <ListIcon sx={{ mr: 1 }} />
                                    Tout(s)
                                </Box>
                            }
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "teranga-dark",
                                border: "1px solid",
                                borderColor: "teranga-medium-gray",
                                borderRadius: "9999px",
                                paddingX: 3,
                                paddingY: 1.5,
                                "&.Mui-selected": {
                                    color: "teranga-dark",
                                    backgroundColor: "teranga-gold",
                                    borderColor: "teranga-gold",
                                },
                                "&:hover": {
                                    backgroundColor:
                                        "teranga-light-gray-translucent",
                                },
                                transition: "all 0.3s ease-in-out",
                            }}
                            iconPosition="start"
                        />
                        <Tab
                            label={
                                <Box className="flex items-center">
                                    <CheckIcon sx={{ mr: 1 }} />
                                    Confirmé
                                </Box>
                            }
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "teranga-dark",
                                border: "1px solid",
                                borderColor: "success.main",
                                borderRadius: "9999px",
                                paddingX: 3,
                                paddingY: 1.5,
                                "&.Mui-selected": {
                                    color: "white",
                                    backgroundColor: "success.main",
                                    borderColor: "success.main",
                                },
                                "&:hover": { backgroundColor: "success.light" },
                                transition: "all 0.3s ease-in-out",
                            }}
                            iconPosition="start"
                        />
                        <Tab
                            label={
                                <Box className="flex items-center">
                                    <ClockIcon sx={{ mr: 1 }} />
                                    En attente
                                </Box>
                            }
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "teranga-dark",
                                border: "1px solid",
                                borderColor: "warning.main",
                                borderRadius: "9999px",
                                paddingX: 3,
                                paddingY: 1.5,
                                "&.Mui-selected": {
                                    color: "white",
                                    backgroundColor: "warning.main",
                                    borderColor: "warning.main",
                                },
                                "&:hover": { backgroundColor: "warning.light" },
                                transition: "all 0.3s ease-in-out",
                            }}
                            iconPosition="start"
                        />
                        <Tab
                            label={
                                <Box className="flex items-center">
                                    <CancelIcon sx={{ mr: 1 }} />
                                    Annulé
                                </Box>
                            }
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "teranga-dark",
                                border: "1px solid",
                                borderColor: "error.main",
                                borderRadius: "9999px",
                                paddingX: 3,
                                paddingY: 1.5,
                                "&.Mui-selected": {
                                    color: "white",
                                    backgroundColor: "error.main",
                                    borderColor: "error.main",
                                },
                                "&:hover": { backgroundColor: "error.light" },
                                transition: "all 0.3s ease-in-out",
                            }}
                            iconPosition="start"
                        />
                    </Tabs>
                </motion.div>

                <motion.div
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeTab}
                    className="p-6 rounded-lg bg-white shadow-lg border border-gray-100 min-h-[300px] flex flex-col justify-center items-center"
                >
                    {loading ? (
                        <Box className="flex justify-center items-center py-10">
                            <CircularProgress sx={{ color: "teranga-gold" }} />
                            <Typography ml={2} color="teranga-medium-gray">
                                Chargement des réservations...
                            </Typography>
                        </Box>
                    ) : filteredReservations.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                            variants={{
                                visible: {
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                        >
                            {filteredReservations.map((reservation) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <Alert
                            severity="info"
                            className="w-full animate-fadeIn"
                        >
                            Aucune réservation trouvée pour ce statut.
                        </Alert>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
