// resources/js/Components/OurServices.jsx (ou un chemin pertinent)

import React from "react";
import { Box, Typography } from "@mui/material";
import {
    DirectionsCar as CarIcon,
    Celebration as CelebrationIcon, // pour Événements Spéciaux
    Explore as ExploreIcon, // pour Aventures Sur Mesure
    LocalAirport as AirportIcon, // pour Transferts Aéroports
    ArrowRightAlt as ArrowRightIcon, // pour la flèche des liens
    Stars as StarsIcon, // Pour le titre principal
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Définition des services en tant qu'array de données
const servicesData = [
    {
        icon: CarIcon,
        title: "Transfert Privé VIP",
        description:
            "Profitez d'un service de chauffeur privé sur mesure pour tous vos déplacements. Confort, ponctualité et discrétion garantis pour une expérience exclusive.",
        linkText: "En savoir plus",
        href: "#", // Remplacez par la route réelle (ex: route('services.private'))
    },
    {
        icon: CelebrationIcon,
        title: "Événements Spéciaux",
        description:
            "Conférences, mariages, soirées... Nous assurons le transport de vos invités avec élégance et professionnalisme, pour que chaque détail compte.",
        linkText: "Organiser mon événement",
        href: "#", // Remplacez par la route réelle
    },
    {
        icon: ExploreIcon,
        title: "Aventures Sur Mesure",
        description:
            "Partez à la découverte des plus beaux sites avec nos excursions personnalisées. Confort et sécurité pour une expérience mémorable et unique.",
        linkText: "Planifier mon aventure",
        href: "#", // Remplacez par la route réelle
    },
    {
        icon: AirportIcon,
        title: "Transferts Aéroports",
        description:
            "Voyagez sereinement vers et depuis les aéroports. Service rapide, fiable et sans stress, disponible 24h/24 et 7j/7.",
        linkText: "Réserver mon transfert",
        href: "#", // Remplacez par la route réelle
    },
    // Vous pouvez ajouter d'autres services ici facilement
    // {
    //     icon: CommuteIcon, // Exemple d'une autre icône
    //     title: "Location avec chauffeur",
    //     description: "Besoin d'un véhicule avec chauffeur pour une longue durée ? Nos solutions flexibles s'adaptent à vos besoins professionnels ou personnels.",
    //     linkText: "Demander un devis",
    //     href: "#"
    // },
];

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

export default function Service() {
    return (
        <section className="bg-gradient-to-r from-teranga-cream to-teranga-light-gray py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl lg:text-5xl font-extrabold text-center text-teranga-dark mb-10 md:mb-12 leading-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <StarsIcon
                        sx={{
                            fontSize: { xs: "2.5rem", lg: "3.5rem" },
                            verticalAlign: "middle",
                            mr: 2,
                            color: "teranga-gold",
                        }}
                    />
                    Découvrez Nos{" "}
                    <span className="text-teranga-gold">
                        Services d'Exception
                    </span>
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {servicesData.map((service, index) => {
                        const IconComponent = service.icon; // Récupère le composant d'icône
                        return (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform flex flex-col border border-gray-100"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <Box className="p-6 md:p-8 flex-grow flex flex-col">
                                    <Typography
                                        variant="h6" // Equivalent à text-2xl
                                        component="h2"
                                        className="font-bold text-teranga-dark mb-3 flex items-center"
                                    >
                                        <IconComponent
                                            sx={{
                                                color: "teranga-gold",
                                                mr: 2,
                                                fontSize: "2rem",
                                            }}
                                        />
                                        {service.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="text-base text-teranga-medium-gray mb-4 flex-grow"
                                    >
                                        {service.description}
                                    </Typography>
                                    <a
                                        href={service.href}
                                        className="inline-flex items-center text-teranga-gold hover:text-teranga-dark font-semibold text-base mt-auto transition-colors duration-300"
                                    >
                                        {service.linkText}{" "}
                                        <ArrowRightIcon
                                            sx={{ ml: 1, fontSize: "1rem" }}
                                        />
                                    </a>
                                </Box>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
