import React from "react";
import { Link } from "@inertiajs/react";
import {
    Box,
    Typography,
    Chip,
    Button,
    Grid,
    Paper,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Map as MapIcon,
    ArrowForward as ArrowIcon,
    CalendarMonth as CalendarIcon,
    AccessTime as ClockIcon,
    HourglassEmpty as HourglassIcon,
    AttachMoney as MoneyIcon,
    CheckCircle as CheckIcon,
    Schedule as PendingIcon,
    Cancel as CancelIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Person as PersonIcon, // Ajout de l'icône de personne
    Email as EmailIcon,
    PlaceRounded,
    SpaceBar, // Ajout de l'icône d'email
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Helper pour déterminer les classes et l'icône du statut
const getStatusProps = (status) => {
    switch (status) {
        case "confirmer":
            return {
                label: "Confirmé",
                color: "success",
                icon: <CheckIcon />,
            };
        case "en attente":
            return {
                label: "En attente",
                color: "warning",
                icon: <PendingIcon />,
            };
        case "annuler":
            return {
                label: "Annulé",
                color: "error",
                icon: <CancelIcon />,
            };
        default:
            return {
                label: status,
                color: "default",
                icon: null,
            };
    }
};

export default function ReservationCard({ reservation, onConfirm, onDelete }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const statusProps = getStatusProps(reservation.status);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                        boxShadow: 6,
                    },
                }}
            >
                {/* Section d'en-tête (Statut et date) */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Chip
                        label={statusProps.label}
                        icon={statusProps.icon}
                        color={statusProps.color}
                        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        <CalendarIcon
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                verticalAlign: "middle",
                            }}
                        />
                        {reservation.start_date}
                    </Typography>
                </Box>
                {/* Informations sur le client */}
                <Box mb={2} sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}>
                    <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ mb: 1 }}
                    >
                        <Box
                            component="span"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <PersonIcon
                                sx={{
                                    mr: 1,
                                    fontSize: "1.2rem",
                                    color: "text.primary",
                                }}
                            />
                            {reservation.user.name}
                        </Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Box
                            component="span"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <EmailIcon
                                sx={{
                                    mr: 1,
                                    fontSize: "1.2rem",
                                    color: "text.secondary",
                                }}
                            />
                            {reservation.user.email}
                        </Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Box
                            component="span"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <SpaceBar
                                sx={{
                                    mr: 1,
                                    fontSize: "1.2rem",
                                    color: "text.secondary",
                                }}
                            />
                            {reservation.places} Place(s)
                        </Box>
                    </Typography>
                </Box>

                {/* Informations sur le trajet */}
                <Box mb={2}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: "text.primary" }}
                    >
                        <Box
                            component="span"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <MapIcon sx={{ mr: 1, color: "primary.main" }} />
                            {reservation.service.departure}
                            <ArrowIcon sx={{ mx: 1, fontSize: "1rem" }} />
                            {reservation.service.destination}
                        </Box>
                    </Typography>
                </Box>

                <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">
                            <ClockIcon
                                sx={{
                                    fontSize: 16,
                                    mr: 1,
                                    verticalAlign: "middle",
                                }}
                            />
                            Heure:{" "}
                            <Box component="span" fontWeight="medium">
                                {reservation.start_hour}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">
                            <HourglassIcon
                                sx={{
                                    fontSize: 16,
                                    mr: 1,
                                    verticalAlign: "middle",
                                }}
                            />
                            Durée:{" "}
                            <Box component="span" fontWeight="medium">
                                {reservation.service.duration} min
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" color="text.secondary">
                            <MoneyIcon
                                sx={{
                                    fontSize: 16,
                                    mr: 1,
                                    verticalAlign: "middle",
                                }}
                            />
                            Prix:{" "}
                            <Box component="span" fontWeight="medium">
                                {reservation.service.price} FCFA
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>

                {/* Actions pour l'administrateur */}
                {reservation.status === "en attente" && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mt: 3,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<CheckIcon />}
                            onClick={() => onConfirm(reservation.id)}
                            disabled={reservation.status !== "en attente"}
                        >
                            Confirmer
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(reservation.id)}
                        >
                            Refuser
                        </Button>
                    </Box>
                )}
            </Paper>
        </motion.div>
    );
}
