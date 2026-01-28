// resources/js/Pages/Profile/MyAccount.jsx (ou un chemin similaire)

import React, { useState } from "react";
import { usePage, Link, useForm } from "@inertiajs/react"; // Pour récupérer les props Inertia et Link/useForm
import {
    Box,
    Typography,
    Avatar,
    Button,
    Modal,
    Fade,
    Backdrop,
    IconButton,
    CircularProgress,
} from "@mui/material";
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    Person as UserIcon, // Pour le rôle
    Edit as EditIcon,
    Delete as DeleteIcon,
    Warning as WarningIcon, // Pour l'icône de la modale d'avertissement
    Close as CloseIcon, // Pour le bouton fermer de la modale
    AccountCircle as AccountCircleIcon, // Icône principale du titre
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useRouteContext } from "../../contexts/RouteContext";

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

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

const cardVariants = {
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

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const pulseAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: [
        "0 0 0 0px rgba(212, 175, 55, 0.4)",
        "0 0 0 8px rgba(212, 175, 55, 0)",
        "0 0 0 0px rgba(212, 175, 55, 0.4)",
    ],
    transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
    },
};

export default function Index() {
    // Récupérer l'utilisateur authentifié via Inertia
    const { auth } = usePage().props;
    const user = auth.user;
    const route = useRouteContext();

    const [openModal, setOpenModal] = useState(false);
    const { delete: deleteUser, processing } = useForm();

    const handleDeleteAccount = () => {
        deleteUser(route(""), {
            // Assurez-vous que cette route est définie
            onSuccess: () => {
                toast.success("Votre compte a été supprimé avec succès.", {
                    position: "bottom-left",
                });
                // Redirection automatique après suppression (gérée par Inertia)
            },
            onError: (errors) => {
                const message = Object.values(errors).flat().join("\n");
                toast.error(`Erreur lors de la suppression : ${message}`, {
                    position: "bottom-left",
                });
            },
            preserveScroll: true,
        });
    };

    return (
        <>
            <section className="py-16 md:py-24 bg-gradient-to-br from-teranga-cream to-white min-h-screen flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        className="text-4xl lg:text-5xl font-extrabold text-center text-teranga-dark mb-12"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <AccountCircleIcon
                            sx={{
                                fontSize: { xs: "2.5rem", lg: "3.5rem" },
                                verticalAlign: "middle",
                                mr: 2,
                                color: "teranga-gold",
                            }}
                        />
                        Mon Compte
                    </motion.h1>

                    <motion.div
                        className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden md:max-w-2xl border border-gray-100"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        sx={{
                            boxShadow: "0 20px 50px rgba(0,0,0,0.15)", // Ombre plus prononcée
                            border: "1px solid teranga-light-gray",
                        }}
                    >
                        <Box className="md:flex">
                            <Box className="w-full p-8">
                                {/* Image de profil */}
                                <motion.div
                                    className="flex justify-center mb-8"
                                    animate={pulseAnimation}
                                >
                                    <Avatar
                                        {...stringAvatar(auth.user.name)}
                                        sx={{
                                            width: 128, // h-32 w-32
                                            height: 128,
                                            border: "4px solid",
                                            borderColor: "teranga-gold", // Couleur de la bordure
                                            boxShadow:
                                                "0 0 0 0px rgba(212, 175, 55, 0.4)", // Initial pulse shadow
                                            objectFit: "cover",
                                        }}
                                    />
                                </motion.div>

                                {/* Nom et Rôle */}
                                <div className="text-center mb-10">
                                    <motion.h2
                                        variants={itemVariants}
                                        className="text-3xl font-semibold text-teranga-dark mb-2"
                                    >
                                        {user.name}
                                    </motion.h2>
                                    <motion.p
                                        variants={itemVariants}
                                        className="text-lg text-teranga-medium-gray flex items-center justify-center"
                                    >
                                        <UserIcon
                                            sx={{
                                                mr: 1,
                                                color: "teranga-gold",
                                            }}
                                        />
                                        {user.role || "Client"}{" "}
                                        {/* Assurez-vous que le rôle existe sur l'objet user */}
                                    </motion.p>
                                </div>

                                {/* Informations de contact */}
                                <ul className="space-y-6">
                                    <motion.li
                                        variants={itemVariants}
                                        className="flex flex-col sm:flex-row sm:items-center"
                                    >
                                        <Typography
                                            variant="body1"
                                            className="w-full sm:w-32 font-medium text-teranga-dark flex items-center mb-1 sm:mb-0"
                                        >
                                            <EmailIcon
                                                sx={{
                                                    mr: 1,
                                                    color: "teranga-gold",
                                                }}
                                            />
                                            Email:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className="text-teranga-dark break-words"
                                        >
                                            {user.email}
                                        </Typography>
                                    </motion.li>

                                    <motion.li
                                        variants={itemVariants}
                                        className="flex flex-col sm:flex-row sm:items-center"
                                    >
                                        <Typography
                                            variant="body1"
                                            className="w-full sm:w-32 font-medium text-teranga-dark flex items-center mb-1 sm:mb-0"
                                        >
                                            <PhoneIcon
                                                sx={{
                                                    mr: 1,
                                                    color: "teranga-gold",
                                                }}
                                            />
                                            Téléphone:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className="text-teranga-dark"
                                        >
                                            {user.phone || "N/A"}{" "}
                                            {/* Assurez-vous que le téléphone existe */}
                                        </Typography>
                                    </motion.li>
                                </ul>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Boutons d'action */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6"
                        variants={itemVariants} // Animation pour les boutons aussi
                    >
                        <Link
                            className="inline-flex items-center justify-center text-gray-900 bg-color-500 hover:bg-[#B58E2F] focus:ring-4 focus:ring-teranga-light-gray font-medium rounded-xl text-lg px-8 py-4 transition-colors duration-300 shadow-md"
                            href={route("account.edit")}
                            sx={{
                                // Utilisation de sx pour des styles MUI/Tailwind plus granulaires si nécessaire
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow:
                                        "0 6px 15px rgba(212, 175, 55, 0.4)",
                                },
                            }}
                        >
                            <EditIcon sx={{ mr: 2 }} /> Modifier mon profil
                        </Link>
                        <Button
                            onClick={() => setOpenModal(true)}
                            variant="contained"
                            sx={{
                                backgroundColor: "error.main", // Rouge de MUI
                                "&:hover": {
                                    backgroundColor: "error.dark", // Rouge plus foncé au survol
                                    transform: "translateY(-2px)",
                                    boxShadow:
                                        "0 6px 15px rgba(244, 67, 54, 0.4)",
                                },
                                color: "white",
                                fontWeight: "medium",
                                borderRadius: "12px", // rounded-xl
                                paddingX: "2rem",
                                paddingY: "1rem", // px-6 py-3 devenu px-8 py-4
                                fontSize: "1.125rem", // text-lg
                                textTransform: "none",
                                transition: "all 0.3s ease-in-out",
                                boxShadow: "0 4px 10px rgba(244, 67, 54, 0.2)",
                                display: "none",
                            }}
                            startIcon={<DeleteIcon />}
                        >
                            Supprimer le compte
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Modale de confirmation de suppression */}
            <Modal
                aria-labelledby="delete-account-modal-title"
                aria-describedby="delete-account-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 text-center w-full max-w-md"
                        sx={{
                            border: "1px solid #E0E0E0",
                            outline: "none",
                            boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                        }}
                    >
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenModal(false)}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <WarningIcon
                            sx={{
                                color: "error.main",
                                fontSize: "4rem",
                                mx: "auto",
                                mb: 2,
                            }}
                        />
                        <Typography
                            id="delete-account-modal-title"
                            variant="h6"
                            component="h2"
                            className="mb-4 text-teranga-dark"
                        >
                            Êtes-vous sûr de vouloir supprimer votre compte ?
                        </Typography>
                        <Typography
                            id="delete-account-modal-description"
                            sx={{ mt: 2, mb: 4, color: "text.secondary" }}
                        >
                            Cette action est irréversible et supprimera toutes
                            vos données.
                        </Typography>
                        <Box className="flex justify-center gap-4 mt-6">
                            <Button
                                variant="contained"
                                onClick={handleDeleteAccount}
                                disabled={processing}
                                startIcon={
                                    processing ? (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    ) : null
                                }
                                sx={{
                                    backgroundColor: "error.main",
                                    "&:hover": {
                                        backgroundColor: "error.dark",
                                    },
                                    color: "white",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    paddingX: 4,
                                    paddingY: 1.5,
                                    borderRadius: "8px",
                                }}
                            >
                                {processing
                                    ? "Suppression..."
                                    : "Oui, je suis sûr"}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setOpenModal(false)}
                                sx={{
                                    borderColor: "teranga-medium-gray",
                                    color: "teranga-medium-gray",
                                    "&:hover": {
                                        backgroundColor: "teranga-light-gray",
                                        borderColor: "teranga-dark",
                                        color: "teranga-dark",
                                    },
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    paddingX: 4,
                                    paddingY: 1.5,
                                    borderRadius: "8px",
                                }}
                            >
                                Non, annuler
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
