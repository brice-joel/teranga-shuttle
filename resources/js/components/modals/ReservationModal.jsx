// resources/js/Pages/Home/components/ReservationModal.jsx
import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid,
    CircularProgress, // Pour un indicateur de chargement
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm } from "@inertiajs/react"; // Pour la soumission du formulaire Inertia
import { ToastContainer, toast } from "react-toastify"; // Pour les notifications
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs"; // N'oubliez pas d'installer dayjs si ce n'est pas fait

// Style de la modale MUI
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", sm: 600, md: 700 }, // Largeur responsive
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 3, sm: 4 },
    maxHeight: "90vh",
    overflowY: "auto",
    animation: "fadeInScale 0.4s ease-out forwards", // Animation d'ouverture
};

export default function ReservationModal({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        pickup_location: "",
        destination: "",
        date_time: null, // Utilisez Day.js ou un objet Date
        service_type: "",
        passengers: 1,
        special_requests: "",
    });

    const handleFormChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleDateTimeChange = (newValue) => {
        setData("date_time", newValue ? newValue.toISOString() : null); // Sauvegarde en ISO string
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission avec Inertia
        post(route("reservations.store"), {
            // Assurez-vous que cette route existe
            onSuccess: () => {
                toast.success(
                    "Votre demande de réservation a été envoyée avec succès !",
                    {
                        position: "bottom-left",
                    }
                );
                reset(); // Réinitialise le formulaire
                onClose(); // Ferme la modale
            },
            onError: (formErrors) => {
                const message = Object.values(formErrors).flat().join("\n");
                toast.error(`Erreur de réservation : ${message}`, {
                    position: "bottom-left",
                });
            },
            preserveScroll: true,
        });
    };

    // Placeholder pour les types de service réels
    const serviceTypes = [
        { value: "airport_transfer", label: "Transfert Aéroport" },
        { value: "hourly_rental", label: "Mise à disposition (Heure)" },
        { value: "daily_rental", label: "Mise à disposition (Journée)" },
        {
            value: "event_wedding",
            label: "Événement Spécial (Mariage, Deuil, Soirée)",
        },
        { value: "city_tour", label: "Tour de Ville / Tourisme" },
        { value: "vtc", label: "VTC / Déplacement Urbain" },
    ];

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="reservation-modal-title"
            aria-describedby="reservation-modal-description"
            closeAfterTransition // Permet les animations de fermeture
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={modalStyle}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography
                        id="reservation-modal-title"
                        variant="h5"
                        component="h2"
                        className="font-bold text-teranga-dark"
                    >
                        Réservez Votre Trajet avec Teranga Shuttle
                    </Typography>
                    <IconButton onClick={onClose} aria-label="fermer la modale">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography
                    id="reservation-modal-description"
                    sx={{ mt: 0, mb: 3, color: "teranga-medium-gray" }}
                >
                    Remplissez ce formulaire pour une réservation rapide. Nous
                    vous recontacterons pour confirmer les détails.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lieu de Départ"
                                name="pickup_location"
                                value={data.pickup_location}
                                onChange={handleFormChange}
                                required
                                error={!!errors.pickup_location}
                                helperText={errors.pickup_location}
                                InputProps={{
                                    startAdornment: (
                                        <LocationOnIcon
                                            sx={{
                                                color: "action.active",
                                                mr: 1,
                                            }}
                                        />
                                    ),
                                }}
                                className="transition-all duration-300 transform hover:scale-[1.01]"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Destination"
                                name="destination"
                                value={data.destination}
                                onChange={handleFormChange}
                                required
                                error={!!errors.destination}
                                helperText={errors.destination}
                                InputProps={{
                                    startAdornment: (
                                        <LocationOnIcon
                                            sx={{
                                                color: "action.active",
                                                mr: 1,
                                            }}
                                        />
                                    ),
                                }}
                                className="transition-all duration-300 transform hover:scale-[1.01]"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date et Heure du Trajet"
                                    value={
                                        data.date_time
                                            ? dayjs(data.date_time)
                                            : null
                                    }
                                    onChange={handleDateTimeChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            required
                                            error={!!errors.date_time}
                                            helperText={errors.date_time}
                                            InputProps={{
                                                startAdornment: (
                                                    <CalendarTodayIcon
                                                        sx={{
                                                            color: "action.active",
                                                            mr: 1,
                                                        }}
                                                    />
                                                ),
                                                ...params.InputProps, // Important pour fusionner les props
                                            }}
                                            className="transition-all duration-300 transform hover:scale-[1.01]"
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                required
                                error={!!errors.service_type}
                            >
                                <InputLabel>Type de Service</InputLabel>
                                <Select
                                    label="Type de Service"
                                    name="service_type"
                                    value={data.service_type}
                                    onChange={handleFormChange}
                                    startAdornment={
                                        <DirectionsCarIcon
                                            sx={{
                                                color: "action.active",
                                                mr: 1,
                                            }}
                                        />
                                    }
                                    className="transition-all duration-300 transform hover:scale-[1.01]"
                                >
                                    {serviceTypes.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.service_type && (
                                    <Typography color="error" variant="caption">
                                        {errors.service_type}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre de Passagers"
                                name="passengers"
                                type="number"
                                value={data.passengers}
                                onChange={handleFormChange}
                                inputProps={{ min: 1 }}
                                required
                                error={!!errors.passengers}
                                helperText={errors.passengers}
                                className="transition-all duration-300 transform hover:scale-[1.01]"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Demandes Spéciales (si applicable)"
                                name="special_requests"
                                value={data.special_requests}
                                onChange={handleFormChange}
                                multiline
                                rows={3}
                                className="transition-all duration-300 transform hover:scale-[1.01]"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                endIcon={
                                    processing ? (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    ) : (
                                        <SendIcon />
                                    )
                                }
                                disabled={processing}
                                sx={{
                                    backgroundColor: "teranga-gold",
                                    color: "teranga-dark",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    paddingY: 1.5,
                                    fontSize: "1.1rem",
                                    boxShadow:
                                        "0 4px 15px rgba(212, 175, 55, 0.3)",
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        backgroundColor: "#B58E2F",
                                        transform: "scale(1.01)",
                                        boxShadow:
                                            "0 6px 20px rgba(212, 175, 55, 0.5)",
                                    },
                                }}
                            >
                                {processing
                                    ? "Envoi en cours..."
                                    : "Envoyer la Demande"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <ToastContainer />
            </motion.div>
        </Modal>
    );
}
