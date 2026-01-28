import React from "react";
import { Head, Link } from "@inertiajs/react";
import { useRouteContext } from "../contexts/RouteContext";
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    useMediaQuery,
    useTheme,
} from "@mui/material";

// Importations des icônes de Material UI
import {
    GpsFixed as GpsIcon,
    CalendarMonth as CalendarIcon,
    LocalTaxi as TaxiIcon,
    AttachMoney as MoneyIcon,
    SupportAgent as SupportIcon,
    HourglassEmpty as HourglassIcon,
    FlightTakeoff as FlightIcon,
    CheckCircle as CheckIcon,
} from "@mui/icons-material";

// Importation des images locales
import landing_image from "../assets/images/landingpage.png";

// Composants listes existants
import TrajetsList from "../components/TrajetsList";
import LocationsList from "../components/LocationsList";
import Hero from "../components/Hero";
import BannerSlide from "../components/BannerSlide";

// Définition des variantes pour les animations
const sectionVariants = {
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

const Index = ({ trajets, locations }) => {
    const route = useRouteContext();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box>
            <Head title="Accueil - Teranga Shuttle" />
            <Hero />
            <BannerSlide />

            {/* Section d'En-tête avec image de fond et texte */}
            <Box
                className="hidden relative h-screen flex items-center justify-center text-center overflow-hidden"
                sx={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${landing_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 p-4 md:p-8"
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        className="font-extrabold mb-4"
                        sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
                    >
                        Voyagez en toute sérénité au Sénégal
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        className="font-medium max-w-2xl mx-auto"
                        sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                    >
                        Teranga Shuttle vous offre des services de transport et
                        de location de véhicules fiables et confortables pour
                        vos trajets.
                    </Typography>
                    <Link href={route("devis.index")} passHref>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 4,
                                backgroundColor: "teranga-gold",
                                color: "teranga-dark",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "teranga-gold",
                                    opacity: 0.9,
                                },
                            }}
                        >
                            Contactez-Nous
                        </Button>
                    </Link>
                </motion.div>
            </Box>

            {/* Section des Services (Trajets et Locations) */}
            <motion.section
                className="py-16 bg-white"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <Typography
                        variant="h3"
                        component="h2"
                        className="font-bold text-center mb-12 text-gray-800"
                    >
                        Nos Services
                    </Typography>
                    <TrajetsList trajets={trajets} />
                    <Box mt={8}>
                        <LocationsList locations={locations} />
                    </Box>
                </div>
            </motion.section>

            {/* Section Pourquoi nous choisir ? */}
            <motion.section
                className="py-16 bg-gray-100"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-4 text-center">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="font-bold mb-12 text-gray-800"
                    >
                        Pourquoi nous choisir ?
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                className="p-6 h-full rounded-xl"
                            >
                                <TaxiIcon
                                    sx={{ fontSize: 60, color: "teranga-gold" }}
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold mt-4 mb-2"
                                >
                                    Professionnalisme
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-600"
                                >
                                    Des chauffeurs expérimentés et courtois pour
                                    un service de qualité supérieure.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                className="p-6 h-full rounded-xl"
                            >
                                <MoneyIcon
                                    sx={{ fontSize: 60, color: "teranga-gold" }}
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold mt-4 mb-2"
                                >
                                    Tarifs Compétitifs
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-600"
                                >
                                    Des prix justes et transparents, sans frais
                                    cachés.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                className="p-6 h-full rounded-xl"
                            >
                                <SupportIcon
                                    sx={{ fontSize: 60, color: "teranga-gold" }}
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold mt-4 mb-2"
                                >
                                    Support Client 24/7
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-600"
                                >
                                    Notre équipe est toujours disponible pour
                                    répondre à vos questions.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </motion.section>

            {/* Section Comment ça Marche ? */}
            <motion.section
                className="py-16 bg-white"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <Typography
                        variant="h4"
                        component="h2"
                        className="font-bold text-gray-800 mb-12"
                    >
                        Comment ça Marche ?
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <motion.div
                                className="p-6 bg-gray-200 rounded-xl shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <GpsIcon
                                    sx={{ fontSize: 60, color: "teranga-gold" }}
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold mt-4 mb-2"
                                >
                                    1. Choisir
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-600"
                                >
                                    Trouvez votre trajet ou faites une location
                                    de véhicule.
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <motion.div
                                className="p-6 bg-gray-200 rounded-xl shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <CalendarIcon
                                    sx={{ fontSize: 60, color: "teranga-gold" }}
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold mt-4 mb-2"
                                >
                                    2. Réserver
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-600"
                                >
                                    Confirmez votre réservation en quelques
                                    clics via notre plateforme sécurisée.
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <motion.div
                                className="p-6 bg-gray-200 rounded-xl shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <FlightIcon
                                    sx={{ fontSize: 60, color: "teranga-gold" }}
                                />
                                <Typography
                                    variant="h6"
                                    className="font-bold mt-4 mb-2"
                                >
                                    3. Profiter
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-600"
                                >
                                    Détendez-vous et laissez-nous vous emmener à
                                    destination en toute sérénité.
                                </Typography>
                            </motion.div>
                        </Grid>
                    </Grid>
                </div>
            </motion.section>

            {/* Section Témoignages (si un composant existe) */}
            {/* J'ai commenté cette section car vous n'avez pas fourni un composant TestimonialsCarousel,
            mais cela montre où elle pourrait être insérée pour une page complète.
            <TestimonialsCarousel testimonials={testimonials} />
            */}
        </Box>
    );
};

export default Index;
