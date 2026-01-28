import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import CalendarReservation from "../../components/calendar/CalendarReservation";

import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogContent,
    useMediaQuery, // Ajouté pour la réactivité
    useTheme, // Ajouté pour la réactivité
} from "@mui/material";

import {
    Phone as PhoneIcon,
    Luggage as LuggageIcon,
    Group as GroupIcon,
    AccessTime as AccessTimeIcon,
    Comment as CommentIcon,
    CheckCircle as CheckCircleIcon,
    CalendarMonth as CalendarMonthIcon,
    LocalTaxi as LocalTaxiIcon,
    ArrowForward as ArrowForwardIcon,
    AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";

import { motion } from "framer-motion";

// Définition des variantes pour les animations Framer Motion
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

const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const ReservationForm = ({ reservations, service, oldData = {} }) => {
    const { auth } = usePage().props;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Détecte les petits écrans
    const userPhone = auth.user ? auth.user.phone : oldData.phone || "";

    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({
        phone: userPhone,
        luggage: oldData.luggage || "non",
        suitcase: oldData.suitcase || "0",
        places: oldData.places || "1",
        start_date: oldData.start_date || "",
        start_hour: oldData.start_hour || "",
        comment: oldData.comment || "",
        _service_id: service ? service.id : null,
    });

    const [showSuitcaseInput, setShowSuitcaseInput] = useState(
        data.luggage === "oui"
    );
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [price, setPrice] = useState(service?.price);

    useEffect(() => {
        if (auth.user && auth.user.phone) {
            setData("phone", auth.user.phone);
        }
        if (service && service.id !== data._service_id) {
            setData("_service_id", service.id);
        }
    }, [auth.user, service, setData, data._service_id]);

    useEffect(() => {
        if (recentlySuccessful) {
            reset(
                "luggage",
                "suitcase",
                "places",
                "start_date",
                "start_hour",
                "comment"
            );
            if (!auth.user) {
                setData("phone", "");
            }
        }
    }, [recentlySuccessful, reset, setData, auth.user]);

    // Gère le changement du champ "Bagages"
    const handleLuggageChange = (event) => {
        const value = event.target.value;
        setData("luggage", value);
        setShowSuitcaseInput(value === "oui");
        if (value === "non") {
            setData("suitcase", "0");
        }
    };

    // Gère le changement du champ "Nombre de Passagers"
    const handlePlacesChange = (event) => {
        const newPlaces = parseInt(event.target.value);
        let newPrice = service.price;
        if (newPlaces >= 3) {
            newPrice = service.price * 2;
        }
        setPrice(newPrice);
        setData("places", newPlaces);
    };

    // Soumet le formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Données envoyées:", data);
        if (!auth.user) {
            toast.error("Veuillez vous connecter pour faire une réservation.", {
                position: "bottom-left",
            });
            return;
        }

        post(route("reservation.store"), {
            onError(errors) {
                const errorMessage = Object.values(errors).flat().join("\n");
                toast.error(`Erreur lors de la réservation : ${errorMessage}`, {
                    position: "bottom-left",
                });
                console.error(errors);
            },
            onSuccess() {
                toast.success("Votre réservation a été envoyée avec succès !");
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Génère les heures de 00:00 à 23:30
    const generateHours = () => {
        const hours = [];
        for (let r = 0; r < 24; r++) {
            for (let a = 0; a < 60; a += 30) {
                const formattedHour = String(r).padStart(2, "0");
                const formattedMinute = String(a).padStart(2, "0");
                hours.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return hours;
    };

    // Gère la sélection d'une date depuis le calendrier
    const handleDateSelectFromCalendar = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        const formattedHour = date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        setData((prevData) => ({
            ...prevData,
            start_date: formattedDate,
            start_hour: formattedHour,
        }));
        setIsCalendarOpen(false); // Ferme la modal après la sélection
        toast.info(
            `Date et heure sélectionnées : ${formattedDate} à ${formattedHour}`,
            {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        );
    };

    return (
        <>
            <section className="bg-gradient-to-br from-teranga-cream to-teranga-light-gray py-16 md:py-24 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        sx={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                    >
                        <motion.div
                            className="text-center mb-8"
                            variants={titleVariants}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    color: "teranga-dark",
                                    fontWeight: "bold",
                                    mb: 2,
                                }}
                            >
                                Réservation de Trajet
                            </Typography>
                            <Typography
                                variant="body1"
                                className="text-teranga-medium-gray"
                            >
                                Veuillez remplir les détails de votre
                                réservation pour{" "}
                                {service?.type === "Location"
                                    ? "une location"
                                    : "un trajet"}
                                .
                            </Typography>
                        </motion.div>

                        {/* Carte de résumé du service */}
                        <motion.div
                            className="mb-8 p-6 bg-teranga-cream/50 border-l-4 border-teranga-gold rounded-lg flex items-center justify-between flex-wrap gap-4"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Typography
                                variant="h5"
                                className="font-semibold text-teranga-dark flex items-center"
                            >
                                <LocalTaxiIcon
                                    sx={{ mr: 2, color: "teranga-gold" }}
                                />
                                {service?.type === "Location" ? (
                                    <>
                                        Location :{" "}
                                        <span className="font-bold uppercase ml-2">
                                            Véhicule
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="uppercase ml-1 text-sm">
                                            {service?.departure}
                                        </span>
                                        <ArrowForwardIcon
                                            sx={{ mx: 1, fontSize: "1.2rem" }}
                                        />
                                        <span className="text-sm uppercase">
                                            {service?.destination}
                                        </span>
                                    </>
                                )}
                            </Typography>
                            <Typography
                                variant="h4"
                                className="font-extrabold text-teranga-gold flex items-center"
                            >
                                {typeof price === "number"
                                    ? price.toLocaleString("fr-FR")
                                    : price}{" "}
                                <span className="text-sm font-normal ml-1">
                                    FCFA
                                </span>
                            </Typography>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="hidden"
                                name="_service_id"
                                value={data._service_id || ""}
                            />

                            {/* Champ Téléphone (visible si l'utilisateur n'est pas connecté) */}
                            {!auth.user && (
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Téléphone"
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Ex: +221 77 123 45 67"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        required
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                borderRadius: "0.75rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </motion.div>
                            )}

                            {/* Section Bagages et passagers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={inputVariants}>
                                    <FormControl
                                        fullWidth
                                        error={!!errors.luggage}
                                    >
                                        <InputLabel id="luggage-label">
                                            Bagages
                                        </InputLabel>
                                        <Select
                                            labelId="luggage-label"
                                            id="luggage"
                                            name="luggage"
                                            value={data.luggage}
                                            label="Bagages"
                                            onChange={handleLuggageChange}
                                            required
                                            sx={{ borderRadius: "0.75rem" }}
                                        >
                                            <MenuItem value="non">Non</MenuItem>
                                            <MenuItem value="oui">Oui</MenuItem>
                                        </Select>
                                        {errors.luggage && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
                                                {errors.luggage}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </motion.div>

                                {showSuitcaseInput && (
                                    <motion.div variants={inputVariants}>
                                        <FormControl
                                            fullWidth
                                            error={!!errors.suitcase}
                                        >
                                            <InputLabel id="suitcase-label">
                                                Nombre de valises
                                            </InputLabel>
                                            <Select
                                                labelId="suitcase-label"
                                                id="suitcase"
                                                name="suitcase"
                                                value={data.suitcase}
                                                label="Nombre de valises"
                                                onChange={(e) =>
                                                    setData(
                                                        "suitcase",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ borderRadius: "0.75rem" }}
                                            >
                                                {[...Array(6)].map(
                                                    (_, index) => (
                                                        <MenuItem
                                                            key={index + 1}
                                                            value={index + 1}
                                                        >
                                                            {index + 1}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                            {errors.suitcase && (
                                                <Typography
                                                    color="error"
                                                    variant="caption"
                                                >
                                                    {errors.suitcase}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </motion.div>
                                )}

                                <motion.div variants={inputVariants}>
                                    <FormControl
                                        fullWidth
                                        error={!!errors.places}
                                    >
                                        <InputLabel id="places-label">
                                            Nombre de Passagers
                                        </InputLabel>
                                        <Select
                                            labelId="places-label"
                                            id="places"
                                            name="places"
                                            value={data.places}
                                            onChange={handlePlacesChange}
                                            label="Nombre de Passagers"
                                            required
                                            sx={{ borderRadius: "0.75rem" }}
                                        >
                                            {[...Array(8)].map((_, index) => (
                                                <MenuItem
                                                    key={index + 1}
                                                    value={index + 1}
                                                >
                                                    {index + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.places && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
                                                {errors.places}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </motion.div>
                            </div>

                            {/* Section Date et Heure */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={inputVariants}>
                                    {/* Simplification des champs de date et heure en un seul bouton pour le calendrier */}
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => setIsCalendarOpen(true)}
                                        startIcon={<CalendarMonthIcon />}
                                        sx={{
                                            borderColor: "teranga-medium-gray",
                                            color: "teranga-medium-gray",
                                            "&:hover": {
                                                backgroundColor:
                                                    "teranga-light-gray",
                                                borderColor: "teranga-dark",
                                                color: "teranga-dark",
                                            },
                                            borderRadius: "0.75rem",
                                            paddingY: "0.75rem",
                                            fontSize: "1rem",
                                            fontWeight: "medium",
                                            textTransform: "none",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                    >
                                        {data.start_date
                                            ? `Sélectionné: ${data.start_date} à ${data.start_hour}`
                                            : "Choisir la date et l'heure"}
                                    </Button>
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Durée estimée"
                                        id="duration"
                                        value={
                                            service?.duration
                                                ? `${service.duration} min`
                                                : "N/A"
                                        }
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccessTimeIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                            sx: { borderRadius: "0.75rem" },
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </motion.div>
                            </div>

                            {/* Champ Commentaire */}
                            <motion.div variants={inputVariants}>
                                <TextField
                                    fullWidth
                                    label="Commentaire"
                                    id="comment"
                                    name="comment"
                                    multiline
                                    rows={4}
                                    placeholder="Ajouter un commentaire ou des requêtes spéciales..."
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    error={!!errors.comment}
                                    helperText={errors.comment}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{
                                                    alignSelf: "flex-start",
                                                    mt: 1,
                                                }}
                                            >
                                                <CommentIcon
                                                    sx={{
                                                        color: "teranga-medium-gray",
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: "0.75rem",
                                            padding: "0.25rem",
                                        },
                                    }}
                                />
                            </motion.div>

                            {/* Bouton de soumission */}
                            <motion.div variants={inputVariants}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    startIcon={
                                        processing ? (
                                            <CircularProgress
                                                size={20}
                                                color="inherit"
                                            />
                                        ) : (
                                            <CheckCircleIcon />
                                        )
                                    }
                                    disabled={processing}
                                    sx={{
                                        backgroundColor: "teranga-gold",
                                        color: "teranga-dark",
                                        "&:hover": {
                                            backgroundColor: "#B58E2F",
                                            boxShadow:
                                                "0px 6px 12px rgba(212, 175, 55, 0.4)",
                                        },
                                        borderRadius: "0.75rem",
                                        paddingY: "1rem",
                                        fontSize: "1.25rem",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        boxShadow: "none",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                >
                                    {processing
                                        ? "Réservation en cours..."
                                        : "Confirmer la Réservation"}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

                {/* Modal du calendrier */}
                <Dialog
                    open={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{
                        sx: {
                            borderRadius: "1.5rem",
                            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                            border: "1px solid #E0E0E0",
                            overflow: "hidden",
                            height: "auto",
                            maxHeight: "90vh",
                        },
                    }}
                    sx={{
                        "& .MuiDialog-paperFullWidth": {
                            width: "90%",
                            maxWidth: "900px", // Limite la largeur sur les grands écrans
                            height: isSmallScreen ? "100%" : "auto",
                            margin: isSmallScreen ? "0" : "32px", // Pas de marge en mode plein écran sur mobile
                        },
                    }}
                >
                    <DialogContent
                        sx={{ p: { xs: 2, sm: 4 }, minHeight: "400px" }}
                    >
                        <CalendarReservation
                            onDateSelect={handleDateSelectFromCalendar}
                            reservations={reservations}
                        />
                    </DialogContent>
                </Dialog>
            </section>
        </>
    );
};

export default ReservationForm;
