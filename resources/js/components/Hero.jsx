import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    FlightTakeoff as FlightIcon,
    LocalTaxi as TaxiIcon,
} from "@mui/icons-material";

// Assurez-vous d'avoir une image de haute qualité dans ce chemin
//import heroImage from "../assets/images/hero_senegal.jpg";

// Variantes pour les animations Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.5,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export default function Hero() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <motion.div
            className="relative h-screen min-h-[600px] flex items-center justify-center my-5 text-center overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("https://images1.bovpg.net/r/back/fr/sale/5b1e3712e8a67o.jpg") `, //url(${heroImage})
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                color: "white",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Box className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto">
                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h1"
                        className="font-extrabold mb-4 leading-tight"
                        sx={{
                            fontSize: {
                                xs: "2.5rem",
                                sm: "3.5rem",
                                md: "4.5rem",
                            },
                        }}
                    >
                        Voyagez au cœur de la **Téranga**
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h5"
                        component="p"
                        className="font-light mb-8 max-w-3xl mx-auto"
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                sm: "1.25rem",
                                md: "1.5rem",
                            },
                        }}
                    >
                        Teranga Shuttle vous offre des services de transport et
                        de location de véhicules fiables, sécurisés et
                        confortables pour vos trajets au Sénégal.
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link
                        href={route("services.trajets")}
                        as="a"
                        style={{ textDecoration: "none" }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<FlightIcon />}
                            sx={{
                                mt: 2,
                                px: isSmallScreen ? 4 : 8,
                                py: isSmallScreen ? 1.5 : 2,
                                backgroundColor: "#FFD700", // Or "teranga-gold"
                                color: "#003366", // Or "teranga-dark"
                                fontWeight: "bold",
                                borderRadius: "50px",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                transition:
                                    "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#e6c200",
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
                                },
                            }}
                        >
                            Réservez votre trajet
                        </Button>
                    </Link>
                </motion.div>
            </Box>
        </motion.div>
    );
}
