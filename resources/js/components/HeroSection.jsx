import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Button, Typography, Box } from "@mui/material"; // Ajout de Box pour plus de flexibilité
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "@inertiajs/react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const heroSlides = [
    {
        id: 1,
        image: "/images/hero-car-luxury.jpg", // Image de votre Mercedes V220d ou une voiture de luxe similaire
        title: "Voyagez en Première Classe, Parcourez le Sénégal.",
        subtitle:
            "Teranga Shuttle : L'élégance et le confort suprême pour tous vos déplacements à Dakar, Saly et au-delà.",
        ctaText: "Découvrir Nos Services",
        ctaLink: route("service"),
    },
    {
        id: 2,
        image: "/images/hero-airport-transfer.jpg", // Image d'un aéroport ou d'un transfert
        title: "Transferts Aéroportuaires : Votre Sérénité, Notre Destination.",
        subtitle:
            "Arrivez ou partez de l'Aéroport de Diass (DSS) en toute quiétude. Ponctualité et discrétion garanties.",
        ctaText: "Réserver un Transfert",
        ctaLink: route("", { type: "airport_transfer" }), // Exemple de paramètre de route
    },
    {
        id: 3,
        image: "/images/hero-event-wedding.jpg", // Image d'un événement (mariage, soirée)
        title: "Vos Événements, Magnifiés par Notre Service.",
        subtitle:
            "Mariages, deuils, soirées privées, voyages d'affaires... Chaque occasion mérite un transport d'exception.",
        ctaText: "Demander un Devis Personnalisé",
        ctaLink: route(""),
    },
    {
        id: 4,
        image: "/images/hero-city-tour.jpg", // Image d'un lieu touristique au Sénégal
        title: "Explorez le Sénégal : Confort et Découverte.",
        subtitle:
            "Des visites guidées personnalisées aux escapades relaxantes, laissez-vous transporter vers les trésors du pays.",
        ctaText: "Planifier Votre Excursion",
        ctaLink: route(""), // Rediriger vers le contact ou une page de demande de tourisme
    },
];

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3, // Délai pour l'apparition globale du texte
        },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: "backOut", // Effet rebondissant
            delay: 0.7, // Délai après l'apparition du texte
        },
    },
};

export default function HeroSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1200, // Vitesse de transition plus lente pour l'élégance
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000, // Changement toutes les 7 secondes
        fade: true, // Effet de fondu
        cssEase: "ease-in-out",
        arrows: false,
        pauseOnHover: false,
        customPaging: (i) => (
            <div className="w-3 h-3 rounded-full bg-white opacity-50 transition-all duration-300 transform hover:scale-125"></div>
        ),
    };

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className="relative w-full h-[calc(100vh_-_80px)] overflow-hidden"
        >
            {" "}
            {/* Ajustez la hauteur par rapport au Header */}
            <Slider {...settings}>
                {heroSlides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative w-full h-[calc(100vh_-_80px)]"
                    >
                        <motion.img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover brightness-[0.5] z-0"
                            initial={{ scale: 1.05 }} // Commence légèrement zoomé
                            animate={{ scale: 1 }} // Zoom arrière subtil
                            transition={{ duration: 7, ease: "linear" }} // Transition très longue
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-center justify-center text-center p-4">
                            <motion.div
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={{
                                    visible: {
                                        transition: { staggerChildren: 0.2 }, // Délai entre l'animation des titres et CTA
                                    },
                                }}
                                className="max-w-4xl text-white"
                            >
                                <motion.div variants={textVariants}>
                                    <Typography
                                        variant="h3"
                                        component="h1"
                                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight text-shadow-lg"
                                        sx={{
                                            "&::selection": {
                                                backgroundColor: "teranga-gold",
                                                color: "teranga-dark",
                                            },
                                        }}
                                    >
                                        {slide.title}
                                    </Typography>
                                </motion.div>
                                <motion.div variants={textVariants}>
                                    <Typography
                                        variant="h5"
                                        component="p"
                                        className="text-lg md:text-xl lg:text-2xl mb-10 font-light opacity-90"
                                    >
                                        {slide.subtitle}
                                    </Typography>
                                </motion.div>
                                <motion.div variants={ctaVariants}>
                                    <Button
                                        component={Link}
                                        href={slide.ctaLink}
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                        className="
                                            bg-teranga-gold text-teranga-dark hover:bg-yellow-600 hover:text-white
                                            rounded-full px-8 py-3 text-lg font-bold shadow-xl
                                            transition-all duration-300 ease-in-out transform hover:scale-105
                                        "
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "#B58E2F", // Nuance de l'or au hover
                                            },
                                        }}
                                    >
                                        {slide.ctaText}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
