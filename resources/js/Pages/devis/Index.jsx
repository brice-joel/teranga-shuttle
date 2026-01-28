// resources/js/Pages/Quote/QuoteRequestForm.jsx (ou un chemin similaire)

import React, { useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
} from "@mui/material";
import {
    LocationOn as LocationIcon,
    DirectionsCar as CarAltIcon, // Pour le titre principal
    AccountCircle as IdCardIcon, // Pour les coordonnées
    Route as RouteIcon, // Pour les détails de trajet
    Send as SendIcon, // Pour le bouton d'envoi
    Person as PersonIcon, // Pour le nom
    Email as EmailIcon, // Pour l'email
    Phone as PhoneIcon, // Pour le téléphone
    DateRange as DateIcon, // Pour la date
    AccessTime as TimeIcon, // Pour l'heure
    People as PeopleIcon, // Pour le nombre de passagers
    Luggage as LuggageIcon, // Pour les bagages
    Info as InfoIcon, // Pour les informations complémentaires
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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

const formCardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const sectionHeaderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
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

export default function Index({ requestData }) {
    // `requestData` pour $request->start, $request->destination
    const { auth } = usePage().props;
    const user = auth.user;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        start: requestData?.start || "", // Pré-rempli si des données viennent d'une autre page
        destination: requestData?.destination || "", // Pré-rempli si des données viennent d'une autre page
        start_date: "",
        start_hour: "",
        places: 1,
        luggages: 0,
        subject: "", // Informations complémentaires
    });

    useEffect(() => {
        if (recentlySuccessful) {
            reset(
                "start",
                "destination",
                "start_date",
                "start_hour",
                "places",
                "luggages",
                "subject"
            ); // Réinitialise les champs spécifiques au devis
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("devis.store"), {
            preserveScroll: true,
            onError: (formErrors) => {
                const message = Object.values(formErrors).flat().join("\n");
                toast.error(`Erreur lors de l'envoi du devis : ${message}`, {
                    position: "bottom-left",
                });
            },
        });
    };

    return (
        <section className="bg-gradient-to-br from-teranga-cream to-teranga-light-gray py-16 md:py-24 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto border border-gray-100"
                    variants={formCardVariants}
                    initial="hidden"
                    animate="visible"
                    sx={{
                        boxShadow: "0 20px 50px rgba(0,0,0,0.15)", // Ombre plus prononcée
                        border: "1px solid teranga-light-gray",
                    }}
                >
                    <motion.h1
                        className="text-4xl lg:text-5xl font-extrabold text-teranga-dark mb-6 text-center"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <CarAltIcon
                            sx={{
                                fontSize: { xs: "2.5rem", lg: "3.5rem" },
                                verticalAlign: "middle",
                                mr: 2,
                                color: "teranga-gold",
                            }}
                        />
                        Demande de{" "}
                        <span className="text-teranga-gold">Devis</span> pour
                        Votre Trajet
                    </motion.h1>

                    <motion.p
                        className="text-teranga-medium-gray mb-8 text-center max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        Besoin d'un chauffeur pour votre prochain déplacement ?
                        Remplissez ce formulaire et obtenez un devis
                        personnalisé rapidement.
                    </motion.p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Vos Coordonnées */}
                        <motion.div
                            className="p-6 bg-teranga-cream/50 border-l-4 border-teranga-gold rounded-lg shadow-sm"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h2
                                className="text-2xl font-bold text-teranga-dark mb-4 flex items-center"
                                variants={sectionHeaderVariants}
                            >
                                <IdCardIcon
                                    sx={{ color: "teranga-gold", mr: 2 }}
                                />{" "}
                                Vos Coordonnées
                            </motion.h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Nom Complet"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Adresse E-mail"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Numéro de Téléphone"
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
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
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Détails de Votre Trajet */}
                        <motion.div
                            className="p-6 bg-blue-50 border-l-4 border-teranga-gold rounded-lg shadow-sm" // Couleur de la bordure aussi en gold
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h2
                                className="text-2xl font-bold text-teranga-dark mb-4 flex items-center"
                                variants={sectionHeaderVariants}
                            >
                                <RouteIcon
                                    sx={{ color: "teranga-gold", mr: 2 }}
                                />{" "}
                                Détails de Votre Trajet
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Lieu de Départ"
                                        id="start"
                                        name="start"
                                        value={data.start}
                                        onChange={(e) =>
                                            setData("start", e.target.value)
                                        }
                                        required
                                        error={!!errors.start}
                                        helperText={errors.start}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Destination"
                                        id="destination"
                                        name="destination"
                                        value={data.destination}
                                        onChange={(e) =>
                                            setData(
                                                "destination",
                                                e.target.value
                                            )
                                        }
                                        required
                                        error={!!errors.destination}
                                        helperText={errors.destination}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Date du Trajet"
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                        required
                                        error={!!errors.start_date}
                                        helperText={errors.start_date}
                                        InputLabelProps={{ shrink: true }} // Pour que le label ne chevauche pas la date
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Heure de Prise en Charge"
                                        id="start_hour"
                                        name="start_hour"
                                        type="time"
                                        value={data.start_hour}
                                        onChange={(e) =>
                                            setData(
                                                "start_hour",
                                                e.target.value
                                            )
                                        }
                                        required
                                        error={!!errors.start_hour}
                                        helperText={errors.start_hour}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <TimeIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de Passagers"
                                        id="places"
                                        name="places"
                                        type="number"
                                        value={data.places}
                                        onChange={(e) =>
                                            setData("places", e.target.value)
                                        }
                                        inputProps={{ min: 1, max: 15 }}
                                        required
                                        error={!!errors.places}
                                        helperText={errors.places}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PeopleIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de Bagages (grandes valises)"
                                        id="luggages"
                                        name="luggages"
                                        type="number"
                                        value={data.luggages}
                                        onChange={(e) =>
                                            setData("luggages", e.target.value)
                                        }
                                        inputProps={{ min: 0, max: 20 }}
                                        error={!!errors.luggages}
                                        helperText={errors.luggages}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LuggageIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.5rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                    />
                                </motion.div>
                            </div>

                            <motion.div variants={inputVariants}>
                                <TextField
                                    fullWidth
                                    label="Informations Complémentaires ou Requêtes Spéciales"
                                    id="subject"
                                    name="subject"
                                    multiline
                                    rows={4}
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                    error={!!errors.subject}
                                    helperText={errors.subject}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{
                                                    alignSelf: "flex-start",
                                                    mt: 1,
                                                }}
                                            >
                                                <InfoIcon
                                                    sx={{
                                                        color: "teranga-medium-gray",
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.5rem",
                                            padding: "0.25rem",
                                        },
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Bouton de soumission */}
                        <motion.div
                            className="text-center mt-8"
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={processing}
                                startIcon={
                                    processing ? (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    ) : (
                                        <SendIcon />
                                    )
                                }
                                sx={{
                                    backgroundColor: "teranga-gold",
                                    color: "teranga-dark",
                                    "&:hover": {
                                        backgroundColor: "#B58E2F", // Un peu plus sombre que teranga-gold
                                        boxShadow:
                                            "0px 6px 12px rgba(212, 175, 55, 0.4)",
                                    },
                                    paddingY: "0.75rem", // py-3
                                    fontSize: "1.25rem", // text-lg
                                    borderRadius: "0.75rem", // rounded-lg
                                    fontWeight: "medium",
                                    textTransform: "none",
                                    boxShadow:
                                        "0 4px 10px rgba(212, 175, 55, 0.2)",
                                    transition: "all 0.3s ease-in-out",
                                    maxWidth: { xs: "100%", md: "300px" }, // Limite la largeur du bouton
                                    mx: "auto", // Centre le bouton
                                    display: "block", // Nécessaire pour mx:auto sur Button MUI
                                }}
                            >
                                {processing
                                    ? "Envoi en cours..."
                                    : "Demander mon Devis"}
                            </Button>
                        </motion.div>
                    </form>

                    <motion.p
                        className="text-center text-teranga-medium-gray text-sm mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.4,
                        }}
                    >
                        En soumettant ce formulaire, vous recevrez un devis
                        détaillé par e-mail dans les plus brefs délais.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
