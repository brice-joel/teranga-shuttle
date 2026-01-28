// resources/js/Pages/Contact/ContactUs.jsx (ou un chemin similaire)

import React from "react";
import { usePage, Link, useForm } from "@inertiajs/react"; // Pour récupérer les props Inertia et Link/useForm
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    Send as SendIcon, // Pour le bouton envoyer
    ContactSupport as ContactIcon, // Pour le titre principal
    Description as DevisIcon, // Pour le lien Devis
} from "@mui/icons-material";
import { motion } from "framer-motion";

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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
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

export default function Contact() {
    const { auth } = usePage().props;
    const user = auth.user; // Accès à l'utilisateur authentifié

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name || "", // Pré-rempli si l'utilisateur est connecté
        email: user?.email || "", // Pré-rempli si l'utilisateur est connecté
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("mail.form_contact"), {
            // Assurez-vous que cette route est définie
            onSuccess: () => {
                toast.success("Votre message a été envoyé avec succès !", {
                    position: "bottom-left",
                });
                reset("message"); // Réinitialise seulement le champ message
            },
            onError: (formErrors) => {
                const message = Object.values(formErrors).flat().join("\n");
                toast.error(`Erreur lors de l'envoi du message : ${message}`, {
                    position: "bottom-left",
                });
            },
            preserveScroll: true,
        });
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-teranga-cream to-teranga-light-gray min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl lg:text-5xl font-extrabold text-center text-teranga-dark mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <ContactIcon
                        sx={{
                            fontSize: { xs: "2.5rem", lg: "3.5rem" },
                            verticalAlign: "middle",
                            mr: 2,
                            color: "teranga-gold",
                        }}
                    />
                    Contactez-nous
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Section Informations de contact */}
                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            className="font-semibold mb-6 text-teranga-dark"
                        >
                            Informations de contact
                        </Typography>
                        <motion.p
                            variants={itemVariants}
                            className="text-teranga-dark mb-4 flex items-center"
                        >
                            <LocationIcon
                                sx={{ mr: 2, color: "teranga-medium-gray" }}
                            />{" "}
                            Dakar, Sénégal
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-teranga-dark mb-4 flex items-center"
                        >
                            <PhoneIcon
                                sx={{ mr: 2, color: "teranga-medium-gray" }}
                            />{" "}
                            +221 78 293 64 12
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-teranga-dark mb-6 flex items-center"
                        >
                            <EmailIcon
                                sx={{ mr: 2, color: "teranga-medium-gray" }}
                            />{" "}
                            info@terangashuttle.com
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8">
                            <Typography
                                variant="h6"
                                component="h3"
                                className="font-semibold mb-4 text-teranga-dark"
                            >
                                Suivez-nous
                            </Typography>
                            <Box className="flex space-x-6">
                                <motion.a
                                    href="#"
                                    className="text-teranga-medium-gray hover:text-teranga-gold transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FacebookIcon sx={{ fontSize: "2rem" }} />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="text-teranga-medium-gray hover:text-teranga-gold transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <TwitterIcon sx={{ fontSize: "2rem" }} />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="text-teranga-medium-gray hover:text-teranga-gold transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <InstagramIcon sx={{ fontSize: "2rem" }} />
                                </motion.a>
                            </Box>
                        </motion.div>
                    </motion.div>

                    {/* Section Envoyez-nous un message (Formulaire) */}
                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            className="font-semibold mb-6 text-teranga-dark"
                        >
                            Envoyez-nous un message
                        </Typography>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {" "}
                                                <PersonIcon
                                                    sx={{
                                                        color: "teranga-medium-gray",
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem", // rounded-xl
                                            padding: "0.5rem", // p-3
                                        },
                                    }}
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
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
                                    variant="outlined"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem",
                                            padding: "0.5rem",
                                        },
                                    }}
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="Message"
                                    id="message"
                                    name="message"
                                    multiline
                                    rows={4}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                    required
                                    error={!!errors.message}
                                    helperText={errors.message}
                                    variant="outlined"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem",
                                            padding: "0.5rem",
                                        },
                                    }}
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
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
                                        paddingY: "1rem", // py-3
                                        paddingX: "1.5rem", // px-6
                                        fontSize: "1.125rem", // text-lg
                                        borderRadius: "0.75rem", // rounded-xl
                                        boxShadow:
                                            "0 4px 15px rgba(212, 175, 55, 0.3)",
                                        transition: "all 0.3s ease-in-out",
                                        "&:hover": {
                                            backgroundColor: "#B58E2F", // Un peu plus sombre que teranga-gold
                                            transform: "translateY(-2px)",
                                            boxShadow:
                                                "0 6px 20px rgba(212, 175, 55, 0.5)",
                                        },
                                    }}
                                >
                                    {processing
                                        ? "Envoi en cours..."
                                        : "Envoyer"}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Section Obtenir un devis */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
                    variants={sectionVariants} // Utilise la même animation pour le conteneur
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            className="font-semibold mb-6 text-teranga-dark"
                        >
                            Obtenir un devis
                        </Typography>
                        <motion.p
                            variants={itemVariants}
                            className="text-teranga-dark mb-4 flex items-center"
                        >
                            <DevisIcon sx={{ mr: 2, color: "teranga-gold" }} />
                            <Link
                                href={route("devis.index")} // Assurez-vous que cette route est définie
                                className="text-teranga-gold hover:text-teranga-dark font-medium transition-colors underline"
                            >
                                Demande de devis pour un trajet
                            </Link>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
