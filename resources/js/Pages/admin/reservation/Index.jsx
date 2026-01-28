import React, { use, useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    CircularProgress,
    Button,
} from "@mui/material";
import {
    List as ListIcon,
    CheckCircle as CheckIcon,
    Schedule as PendingIcon,
    Cancel as CancelIcon,
    Refresh as RefreshIcon,
} from "@mui/icons-material";
import ReservationCard from "./ReservationCard"; // Assurez-vous que le chemin est correct
import { useRouteContext } from "../../../contexts/RouteContext";
// Composant pour l'affichage de la liste
const ReservationList = ({ reservations, onConfirm, onDelete }) => (
    <Grid container spacing={4} sx={{ mt: 2 }}>
        {reservations.length > 0 ? (
            reservations.map((reservation) => (
                <Grid item xs={12} sm={6} md={4} key={reservation.id}>
                    <ReservationCard
                        reservation={reservation}
                        onConfirm={onConfirm}
                        onDelete={onDelete}
                    />
                </Grid>
            ))
        ) : (
            <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" align="center">
                    Aucune réservation dans cette catégorie.
                </Typography>
            </Grid>
        )}
    </Grid>
);

export default function ReservationIndex({
    reservations: initialReservations,
}) {
    const route = useRouteContext();
    const { props } = usePage();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleConfirm = (id) => {
        if (confirm("Êtes-vous sûr de vouloir confirmer cette réservation ?")) {
            router.put(
                route("admin.reservation.confirm", id),
                {},
                {
                    onSuccess: () => {
                        // Actualiser la page ou l'état local
                    },
                }
            );
        }
    };

    const handleDelete = (id) => {
        if (confirm("Êtes-vous sûr de vouloir refuser cette réservation ?")) {
            router.delete(route("admin.reservation.destroy", id), {
                onSuccess: () => {
                    // Actualiser la page ou l'état local
                },
            });
        }
    };

    // Filtrer les réservations en fonction de l'onglet sélectionné
    const filteredReservations = initialReservations.filter((res) => {
        if (selectedTab === 0) return true;
        if (selectedTab === 1) return res.status === "confirmer";
        if (selectedTab === 2) return res.status === "en attente";
        if (selectedTab === 3) return res.status === "annuler";
        return false;
    });

    const reservationCount = {
        all: initialReservations.length,
        confirmer: initialReservations.filter(
            (res) => res.status === "confirmer"
        ).length,
        enAttente: initialReservations.filter(
            (res) => res.status === "en attente"
        ).length,
        annuler: initialReservations.filter((res) => res.status === "annuler")
            .length,
    };

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: "#f5f7fa",
                minHeight: "100vh",
            }}
        >
            <Head title="Liste des Réservations" />
            <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                sx={{ mb: 4, color: "#333", fontSize: "20px" }}
            >
                Liste des Réservations
            </Typography>

            {/* Onglets */}
            <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                centered={false} // Désactivez le centrage pour un bon affichage en mode scrollable
                sx={{
                    border: "1px solid #ccc",
                    //maxWidth: "100vw",
                }}
            >
                <Tab
                    label={`Tout (${reservationCount.all})`}
                    icon={<ListIcon />}
                    iconPosition="start"
                    sx={{ fontSize: "10px" }}
                />
                <Tab
                    label={`Confirmé (${reservationCount.confirmer})`}
                    icon={<CheckIcon />}
                    iconPosition="start"
                    sx={{ fontSize: "10px" }}
                />
                <Tab
                    label={`En attente (${reservationCount.enAttente})`}
                    icon={<PendingIcon />}
                    iconPosition="start"
                    sx={{ fontSize: "10px" }}
                />
                <Tab
                    label={`Annulé (${reservationCount.annuler})`}
                    icon={<CancelIcon />}
                    iconPosition="start"
                    sx={{ fontSize: "10px" }}
                />
            </Tabs>
            {/* Liste des cartes */}
            <ReservationList
                reservations={filteredReservations}
                onConfirm={handleConfirm}
                onDelete={handleDelete}
            />
        </Box>
    );
}
