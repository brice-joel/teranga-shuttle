// resources/js/Components/HeroCarousel.jsx

import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react"; // Pour les liens Inertia
import { Phone as PhoneIcon, Info as InfoIcon } from "@mui/icons-material";
import { useRouteContext } from "../contexts/RouteContext";

// --- Données des slides ---
const slidesData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1596499876793-1b0337d10e08?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image de voiture de luxe/confort
        alt: "Véhicule de luxe Teranga Shuttle avec vue sur la ville",
        slogan: "Votre Voyage, Notre Excellence",
        text: "Chaque trajet est une promesse de confort et de ponctualité. Avec Teranga Shuttle, redéfinissez l'élégance du voyage.",
        button1: null,
        button2: null,
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1629811568442-f38b25c345b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image d'un paysage sénégalais/personnes voyageant
        alt: "Paysage sénégalais avec un véhicule de transport au loin",
        slogan: "L'Engagement au Cœur de Nos Services",
        text: "Nous bâtissons la confiance à chaque kilomètre. Sécurité, fiabilité et un service client dédié, pour une tranquillité d'esprit inégalée.",
        button1: null,
        button2: null,
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1563600589635-47e2794c4892?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image de personnes interagissant/groupe/service
        alt: "Équipe de Teranga Shuttle en discussion avec un client",
        slogan: "Connectez-vous à une Expérience Unique",
        text: "Prêt(e) à découvrir la différence Teranga Shuttle ? Votre aventure commence ici. Des solutions de transport adaptées à chacun de vos besoins.",
        button1: {
            text: "Contactez-nous",
            href: route(""),
            icon: <PhoneIcon />,
        },
        button2: {
            text: "À Propos",
            href: route("service"),
            icon: <InfoIcon />,
        },
    },
];

// --- Paramètres du Slider ---
const sliderSettings = {
    dots: true, // Petits points de navigation
    infinite: true, // Boucle infinie
    speed: 1000, // Vitesse de transition (ms)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Lecture automatique
    autoplaySpeed: 6000, // Délai entre les slides (ms)
    fade: true, // Transition en fondu pour un effet plus doux
    cssEase: "ease-in-out", // Courbe d'animation CSS
    pauseOnHover: true, // Met en pause l'autoplay au survol
    arrows: false, // Cache les flèches de navigation par défaut
};

// --- Animations Framer Motion pour le texte ---
const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const sloganVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2, // Apparaît après le texte principal
        },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring", // Effet ressort
            stiffness: 200,
            damping: 15,
            delay: 0.8, // Apparaît après le texte
        },
    },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" },
    tap: { scale: 0.95 },
};

export default function Carousel() {
    const route = useRouteContext();
    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
            <Slider {...sliderSettings} className="w-full h-full">
                {slidesData.map((slide) => (
                    <div key={slide.id} className="relative w-full h-full">
                        {/* Image de fond */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay sombre pour la lisibilité du texte */}
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>

                        {/* Contenu du slide */}
                        <Box className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 lg:px-16">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={textVariants}
                            >
                                <Typography
                                    variant="h3"
                                    component="h1"
                                    className="text-white font-extrabold mb-4 drop-shadow-lg"
                                    sx={{
                                        fontSize: {
                                            xs: "2.5rem",
                                            sm: "3.5rem",
                                            md: "4.5rem",
                                            lg: "5.5rem",
                                        },
                                        lineHeight: { xs: "1.2", md: "1.1" },
                                        textShadow:
                                            "2px 2px 8px rgba(0,0,0,0.7)",
                                    }}
                                >
                                    {slide.slogan}
                                </Typography>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={sloganVariants}
                            >
                                <Typography
                                    variant="h6"
                                    component="p"
                                    className="text-teranga-cream max-w-2xl mx-auto mb-8 drop-shadow-md"
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.25rem",
                                            md: "1.5rem",
                                            lg: "1.75rem",
                                        },
                                        lineHeight: "1.5",
                                        textShadow:
                                            "1px 1px 4px rgba(0,0,0,0.5)",
                                    }}
                                >
                                    {slide.text}
                                </Typography>
                            </motion.div>

                            {/* Boutons CTA (seulement sur le dernier slide) */}
                            {slide.button1 && slide.button2 && (
                                <motion.div
                                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariants}
                                >
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Button
                                            component={Link} // Utilise Link d'Inertia
                                            href=""
                                            /* href={route(
                                                slide.button1.href.replace(
                                                    "/",
                                                    ""
                                                )
                                            )} // Adapter la route pour Inertia */
                                            variant="contained"
                                            size="large"
                                            startIcon={slide.button1.icon}
                                            sx={{
                                                backgroundColor: "teranga-gold",
                                                color: "teranga-dark",
                                                "&:hover": {
                                                    backgroundColor: "#B58E2F", // Un peu plus sombre que teranga-gold
                                                    boxShadow:
                                                        "0px 6px 12px rgba(212, 175, 55, 0.4)",
                                                },
                                                padding: {
                                                    xs: "12px 24px",
                                                    md: "14px 28px",
                                                },
                                                fontSize: {
                                                    xs: "1rem",
                                                    md: "1.1rem",
                                                },
                                                borderRadius: "50px", // Bouton arrondi
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                minWidth: {
                                                    xs: "180px",
                                                    sm: "auto",
                                                },
                                            }}
                                        >
                                            {slide.button1.text}
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Button
                                            component={Link} // Utilise Link d'Inertia
                                            href
                                            /* href={route(
                                                slide.button2.href.replace(
                                                    "/",
                                                    ""
                                                )
                                            )} // Adapter la route pour Inertia */
                                            variant="outlined"
                                            size="large"
                                            startIcon={slide.button2.icon}
                                            sx={{
                                                borderColor: "teranga-gold",
                                                color: "teranga-gold",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(212, 175, 55, 0.1)",
                                                    boxShadow:
                                                        "0px 6px 12px rgba(212, 175, 55, 0.2)",
                                                },
                                                padding: {
                                                    xs: "12px 24px",
                                                    md: "14px 28px",
                                                },
                                                fontSize: {
                                                    xs: "1rem",
                                                    md: "1.1rem",
                                                },
                                                borderRadius: "50px",
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                minWidth: {
                                                    xs: "180px",
                                                    sm: "auto",
                                                },
                                            }}
                                        >
                                            {slide.button2.text}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </Box>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
