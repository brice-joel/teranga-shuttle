// resources/js/Components/Locations.jsx (ou un chemin pertinent)

import React from "react";
import { Box, Link, Typography } from "@mui/material";
import {
    LocationOn as LocationIcon,
    AttachMoney as PriceIcon, // Ou CurrencyFranc pour les francs CFA si vous avez un custom icon
    AccessTime as DurationIcon,
    Category as TypeIcon, // Pour le type de service
    LocalTaxi as ServiceIcon, // Pour le titre principal
    Description as DescriptionIcon, // Pour le texte de description
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { formatPrice } from "../utils/Utils";

// Image placeholder si aucune image n'est fournie pour une localisation
const DEFAULT_LOCATION_IMAGE =
    "https://images.unsplash.com/photo-1549877452-f67e2792c300?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
            staggerChildren: 0.15, // Délai entre l'apparition des cartes
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
    hover: {
        scale: 1.03, // Effet de zoom au survol
        boxShadow: "0 15px 30px rgba(0,0,0,0.15)", // Ombre plus prononcée
        transition: {
            duration: 0.3,
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

const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const LocationsList = ({ locations }) => {
    // Vérifie si locations est un tableau et n'est pas vide
    if (!locations || !Array.isArray(locations) || locations.length === 0) {
        return (
            <section className="py-16 md:py-24 bg-teranga-cream text-teranga-dark flex justify-center items-center min-h-[40vh]">
                <Typography variant="h5" className="text-center">
                    Aucune localisation disponible pour le moment.
                </Typography>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-br from-teranga-cream to-teranga-light-gray py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl lg:text-5xl font-extrabold text-center text-teranga-dark mb-10 md:mb-12 leading-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <ServiceIcon
                        sx={{
                            fontSize: { xs: "2.5rem", lg: "3.5rem" },
                            verticalAlign: "middle",
                            mr: 2,
                            color: "teranga-gold",
                        }}
                    />
                    <span className="text-teranga-gold">Locations</span>{" "}
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {locations.map((location) => (
                        <motion.div
                            key={location.id}
                            className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden transform flex flex-col border border-gray-100"
                            variants={cardVariants}
                            whileHover="hover"
                            sx={{
                                // Ajout de styles MUI si nécessaire, par exemple pour une ombre plus prononcée
                                boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                            }}
                        >
                            <motion.div
                                className="relative overflow-hidden"
                                variants={imageVariants}
                            >
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    className="absolute bottom-0 left-0 p-4 text-white font-bold drop-shadow-md"
                                >
                                    {location.label}
                                </Typography>
                            </motion.div>

                            <Box className="p-6 flex-grow flex flex-col justify-between">
                                <motion.div variants={itemVariants}>
                                    <Typography
                                        variant="body1"
                                        className="text-teranga-dark mb-4 flex items-start"
                                    >
                                        <DescriptionIcon
                                            sx={{
                                                mr: 1.5,
                                                mt: 0.5,
                                                color: "teranga-medium-gray",
                                                fontSize: "1.2rem",
                                            }}
                                        />
                                        <span className="flex-1">
                                            {location.label}
                                        </span>
                                    </Typography>
                                </motion.div>

                                <ul className="space-y-3 mt-4">
                                    <motion.li
                                        variants={itemVariants}
                                        className="flex items-center text-teranga-dark"
                                    >
                                        <PriceIcon
                                            sx={{
                                                mr: 1.5,
                                                color: "teranga-gold",
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="font-semibold"
                                        >
                                            Prix :
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="ml-2"
                                        >
                                            {formatPrice(location.price)}
                                        </Typography>
                                    </motion.li>
                                    <motion.li
                                        variants={itemVariants}
                                        className="flex items-center text-teranga-dark"
                                    >
                                        <DurationIcon
                                            sx={{
                                                mr: 1.5,
                                                color: "teranga-gold",
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="font-semibold"
                                        >
                                            Durée :
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="ml-2"
                                        >
                                            {location.duration} H
                                        </Typography>
                                    </motion.li>
                                    <motion.li
                                        variants={itemVariants}
                                        className="flex items-center text-teranga-dark"
                                    >
                                        <TypeIcon
                                            sx={{
                                                mr: 1.5,
                                                color: "teranga-gold",
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="font-semibold"
                                        >
                                            Véhicule:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="ml-2"
                                        >
                                            Mercedes CLASSE V220D
                                        </Typography>
                                    </motion.li>
                                    <motion.li
                                        variants={itemVariants}
                                        className=" text-center"
                                    >
                                        <Link
                                            href={route(
                                                "reservation.form",
                                                location.id
                                            )}
                                            className="inline-block w-full text-center font-semibold rounded-full py-3 px-6 transition-colors"
                                            sx={{
                                                backgroundColor: "#B58E2F",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#A47E29",
                                                },
                                            }}
                                        >
                                            Réserver
                                        </Link>
                                    </motion.li>
                                </ul>
                            </Box>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LocationsList;
