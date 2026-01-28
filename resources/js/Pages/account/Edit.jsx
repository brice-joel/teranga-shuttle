// resources/js/Pages/Profile/EditProfile.jsx (ou un chemin similaire)

import React, { useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react"; // Pour récupérer les props Inertia et useForm
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
} from "@mui/material";
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Save as SaveIcon, // Pour le bouton enregistrer
    AccountCircle as AccountCircleIcon, // Pour le titre
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    useEffect(() => {
        if (recentlySuccessful) {
            console.log("Profil mis à jour avec succès !");
        }
    }, [recentlySuccessful]);

    const submit = (e) => {
        e.preventDefault();
        put(route("account.update")); // Inertia gère la méthode PUT via la route
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-teranga-cream to-teranga-light-gray min-h-screen flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto border border-gray-100"
                    variants={formCardVariants}
                    initial="hidden"
                    animate="visible"
                    sx={{
                        boxShadow: "0 20px 50px rgba(0,0,0,0.15)", // Ombre plus prononcée
                        border: "1px solid teranga-light-gray",
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h3"
                        className="font-semibold text-teranga-dark text-center mb-8"
                    >
                        <AccountCircleIcon
                            sx={{
                                fontSize: "2rem",
                                verticalAlign: "middle",
                                mr: 1,
                                color: "teranga-gold",
                            }}
                        />
                        Modifier le profil
                    </Typography>

                    <form onSubmit={submit} className="space-y-6">
                        <motion.div variants={inputVariants}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Nom"
                                type="text"
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
                                        padding: "0.25rem", // Ajustement du padding interne
                                    },
                                    ".MuiInputLabel-root": {
                                        color: "teranga-medium-gray", // Couleur du label
                                    },
                                    ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: "teranga-light-gray", // Couleur de la bordure par défaut
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "teranga-gold", // Couleur de la bordure au survol
                                        },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "teranga-gold", // Couleur de la bordure au focus
                                            borderWidth: "2px", // Bordure plus épaisse au focus
                                        },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={inputVariants}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
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
                                        borderRadius: "0.75rem", // rounded-xl
                                        padding: "0.25rem",
                                    },
                                    ".MuiInputLabel-root": {
                                        color: "teranga-medium-gray",
                                    },
                                    ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: "teranga-light-gray",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "teranga-gold",
                                        },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "teranga-gold",
                                            borderWidth: "2px",
                                        },
                                }}
                            />
                        </motion.div>

                        <motion.div variants={inputVariants}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={processing}
                                startIcon={
                                    processing ? (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    ) : (
                                        <SaveIcon />
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
                                    fontSize: "1rem", // text-sm
                                    borderRadius: "0.75rem", // rounded-xl
                                    fontWeight: "medium",
                                    textTransform: "none",
                                    boxShadow:
                                        "0 4px 10px rgba(212, 175, 55, 0.2)",
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
                                {processing ? "Mise à jour..." : "Modifier"}
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
