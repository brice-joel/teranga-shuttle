import { Link } from "@inertiajs/react";
import { Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import {
    Route as RouteIcon,
    AccessTime as TimeIcon,
    AttachMoney as PriceIcon,
    LocalTaxi as CarIcon,
    ArrowForward as ArrowIcon,
    Description as QuoteIcon,
    CheckCircle as CheckIcon,
    Star as StarIcon,
    Wifi as WifiIcon,
    Air as AirIcon,
    Luggage as LuggageIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useRouteContext } from "../../contexts/RouteContext";

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

const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const contentItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const DEFAULT_SERVICE_IMAGE =
    "https://placehold.co/1200x800/d4ac0d/ffffff?text=Teranga+Shuttle";
const DEFAULT_CAR_IMAGE =
    "https://www.topgear.com/sites/default/files/2024/11/Mercedes_VClass__0002.jpg";

const Show = ({ service }) => {
    const route = useRouteContext();
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const formatPrice = (price) => {
        if (typeof price === "number") {
            return price.toLocaleString("fr-FR");
        }
        return price;
    };

    if (!service) {
        return (
            <section className="py-16 md:py-24 bg-gray-50 text-gray-700 flex justify-center items-center min-h-[60vh]">
                <Typography variant="h5" className="text-center">
                    Service introuvable.
                </Typography>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Titre principal */}
                <motion.h1
                    className="text-xl font-extrabold text-center text-gray-900 dark:text-white mb-10 md:mb-12 leading-tight flex flex-col sm:flex-row items-center justify-center"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <span className="text-gray-900 dark:text-white">
                        {service.departure}
                    </span>
                    <ArrowIcon className="text-[#B58E2F] mx-2 sm:mx-4 text-xl " />
                    <span className="text-gray-900 dark:text-white">
                        {service.destination}
                    </span>
                </motion.h1>

                {/* Conteneur principal */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-200 dark:border-gray-700"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Section Image */}
                    <div className="relative w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:min-h-[600px] overflow-hidden">
                        <img
                            src="https://i.ytimg.com/vi/riE4VGZiOT4/maxresdefault.jpg"
                            alt={`Véhicule du service ${service.departure} vers ${service.destination}`}
                            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                        <div className="hidden absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute top-6 left-6 p-2 bg-[#B58E2F] rounded-full text-white shadow-lg">
                            <StarIcon />
                        </div>
                    </div>

                    {/* Section Contenu */}
                    <div className="p-6 md:p-12 w-full lg:w-1/2 flex flex-col justify-center space-y-8">
                        {/* Caractéristiques principales */}
                        <div className="grid grid-cols-2 gap-y-6">
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                                <CarIcon className="text-[#B58E2F] mr-2 text-2xl" />
                                <Typography
                                    variant="body1"
                                    className="font-semibold"
                                >
                                    Véhicule :{" "}
                                    <span className="font-normal">
                                        Mercedes V220D
                                    </span>
                                </Typography>
                            </div>
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                                <TimeIcon className="text-[#B58E2F] mr-2 text-2xl" />
                                <Typography
                                    variant="body1"
                                    className="font-semibold"
                                >
                                    Durée :{" "}
                                    <span className="font-normal">
                                        {service.duration || "N/A"} min
                                    </span>
                                </Typography>
                            </div>
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                                <PriceIcon className="text-[#B58E2F] mr-2 text-2xl" />
                                <Typography
                                    variant="body1"
                                    className="font-semibold"
                                >
                                    Tarif :{" "}
                                    <span className="font-normal">
                                        {formatPrice(service.price)} FCFA
                                    </span>
                                </Typography>
                            </div>
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                                <LuggageIcon className="text-[#B58E2F] mr-2 text-2xl" />
                                <Typography
                                    variant="body1"
                                    className="font-semibold"
                                >
                                    Bagages :{" "}
                                    <span className="font-normal">Inclus</span>
                                </Typography>
                            </div>
                        </div>

                        {/* Description du service */}
                        <motion.div
                            variants={contentItemVariants}
                            className="space-y-4"
                        >
                            <Typography
                                variant="h6"
                                className="font-bold text-gray-900 dark:text-white"
                            >
                                Description
                            </Typography>
                            <Typography
                                variant="body1"
                                className="text-gray-600 dark:text-gray-400 leading-relaxed"
                            >
                                {service.description ||
                                    `Optez pour un trajet en toute sérénité de ${service.departure} à ${service.destination} avec Teranga Shuttle. Profitez d'un véhicule confortable et d'un chauffeur professionnel pour un voyage sans stress.`}
                            </Typography>
                        </motion.div>

                        {/* Points forts */}
                        <motion.div variants={contentItemVariants}>
                            <Typography
                                variant="h6"
                                className="font-bold text-gray-900 dark:text-white mb-2"
                            >
                                Services inclus
                            </Typography>
                            <ul className="grid grid-cols-2 gap-y-2 text-gray-600 dark:text-gray-400">
                                <li className="flex items-center">
                                    <CheckIcon className="text-green-500 mr-2 text-xl" />
                                    Wi-Fi à bord
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="text-green-500 mr-2 text-xl" />
                                    Boissons rafraîchissantes
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="text-green-500 mr-2 text-xl" />
                                    Chauffeur expérimenté
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="text-green-500 mr-2 text-xl" />
                                    Trajet sécurisé
                                </li>
                            </ul>
                        </motion.div>

                        {/* Boutons d'action */}
                        <div className="space-y-4">
                            <Link
                                href={route("reservation.form", {
                                    service: service.id,
                                })}
                                className="block w-full"
                            >
                                <Button
                                    variant="contained"
                                    className="w-full py-4 text-lg font-semibold rounded-lg"
                                    sx={{
                                        backgroundColor: "#B58E2F",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#A47E29",
                                        },
                                        boxShadow:
                                            "0 4px 12px rgba(181, 142, 47, 0.2)",
                                        textTransform: "none",
                                    }}
                                    startIcon={<CheckIcon />}
                                >
                                    Réserver ce trajet
                                </Button>
                            </Link>

                            <Link
                                href={route("devis.index", {
                                    start: service.departure,
                                    destination: service.destination,
                                })}
                                className="block w-full"
                            >
                                <Button
                                    variant="outlined"
                                    className="w-full py-4 text-lg font-semibold rounded-lg"
                                    sx={{
                                        borderColor: "#B58E2F",
                                        color: "#B58E2F",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(181, 142, 47, 0.05)",
                                            borderColor: "#B58E2F",
                                        },
                                        textTransform: "none",
                                    }}
                                    startIcon={<QuoteIcon />}
                                >
                                    Demander un devis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Show;
