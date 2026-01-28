import { Box, Typography, Button, IconButton } from "@mui/material";

import {
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    WhatsApp as WhatsAppIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    LocalTaxi as LogoIcon, // Pour le logo textuel ou visuel
    Description as QuoteIcon, // Icône pour le bouton de devis
} from "@mui/icons-material";
import { Link } from "@inertiajs/react";
import { useRouteContext } from "../contexts/RouteContext";

export default function Footer() {
    // const currentYear = new Date().getFullYear();
    const route = useRouteContext();

    return (
        <>
            <footer className="bg-color-500 text-gray-900 py-12 md:py-16">
                <hr className="h-10" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Section "À Propos" */}
                        <Box>
                            <Typography
                                variant="h6"
                                className="font-bold mb-4 text-teranga-gold flex items-center"
                            >
                                <LogoIcon
                                    sx={{ mr: 1, color: "teranga-gold" }}
                                />
                                Teranga Shuttle
                            </Typography>
                            <Typography
                                variant="body2"
                                className="text-teranga-light-gray leading-relaxed mb-4"
                            >
                                Teranga Shuttle est votre partenaire de
                                confiance pour des déplacements confortables et
                                sécurisés au Sénégal. Nous offrons des services
                                de transfert aéroport, de trajets inter-villes
                                et d'excursions personnalisées, avec un
                                engagement total envers la satisfaction de nos
                                clients.
                            </Typography>
                            <Link
                                href={route("devis.index")}
                                className="mt-4 inline-block bg-color-100 px-4 py-2 rounded-lg hover:border"
                            >
                                Demander un dévis
                            </Link>
                        </Box>

                        {/* Section Contact */}
                        <Box className=" ">
                            <Typography
                                variant="h6"
                                className="font-bold mb-4 text-teranga-gold"
                            >
                                Contact
                            </Typography>
                            <ul className="space-y-3">
                                <li className="flex items-center text-teranga-light-gray">
                                    <EmailIcon
                                        sx={{
                                            mr: 1.5,
                                            color: "teranga-medium-gray",
                                        }}
                                    />
                                    <Typography variant="body2">
                                        info@terangashuttle.com
                                    </Typography>
                                </li>
                                <li className="flex items-center text-teranga-light-gray">
                                    <PhoneIcon
                                        sx={{
                                            mr: 1.5,
                                            color: "teranga-medium-gray",
                                        }}
                                    />
                                    <Typography variant="body2">
                                        +221 78 293 64 12
                                    </Typography>
                                </li>
                                <li className="flex items-start text-teranga-light-gray">
                                    <LocationIcon
                                        sx={{
                                            mr: 1.5,
                                            color: "teranga-medium-gray",
                                            mt: "2px",
                                        }}
                                    />
                                    <Typography variant="body2">
                                        Lotissement Darou Rahmane 1, <br />
                                        Rue 11 x 10, Dakar, Sénégal
                                    </Typography>
                                </li>
                            </ul>
                        </Box>

                        {/* Section Réseaux Sociaux */}
                        <Box className=" ">
                            <Typography
                                variant="h6"
                                className="font-bold mb-4 text-teranga-gold"
                            >
                                Suivez-nous
                            </Typography>
                            <div className="flex space-x-4">
                                <IconButton
                                    component="a"
                                    href="https://www.facebook.com/teranga_shuttle/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    sx={{
                                        color: "teranga-light-gray",
                                        "&:hover": { color: "teranga-gold" },
                                    }}
                                >
                                    <FacebookIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    component="a"
                                    href="https://www.instagram.com/teranga_shuttle/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    sx={{
                                        color: "teranga-light-gray",
                                        "&:hover": { color: "teranga-gold" },
                                    }}
                                >
                                    <InstagramIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    component="a"
                                    href="https://wa.me/221782936412" // Remplacez par votre numéro WhatsApp
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    sx={{
                                        color: "teranga-light-gray",
                                        "&:hover": { color: "teranga-gold" },
                                    }}
                                >
                                    <WhatsAppIcon fontSize="large" />
                                </IconButton>
                            </div>
                        </Box>

                        {/* Section Liens Rapides (Optionnel, mais courant pour un footer) */}
                        {/* J'ajoute une section de liens rapides pour remplir la 4ème colonne, vous pouvez l'adapter */}
                        <Box>
                            <Typography
                                variant="h6"
                                className="font-bold mb-4 text-teranga-gold"
                            >
                                Liens Rapides
                            </Typography>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href={route("index")}
                                        className="text-teranga-light-gray hover:text-teranga-gold transition-colors duration-200"
                                    >
                                        <Typography variant="body2">
                                            Accueil
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("service")}
                                        className="text-teranga-light-gray hover:text-teranga-gold transition-colors duration-200"
                                    >
                                        <Typography variant="body2">
                                            Nos Services
                                        </Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("contact")}
                                        className="text-teranga-light-gray hover:text-teranga-gold transition-colors duration-200"
                                    >
                                        <Typography variant="body2">
                                            Contact
                                        </Typography>
                                    </Link>
                                </li>
                            </ul>
                        </Box>
                    </div>

                    {/* Copyright */}
                    <Box className="mt-12 pt-8 border-t border-teranga-medium-gray text-center">
                        <Typography
                            variant="body2"
                            className="text-teranga-light-gray"
                        >
                            &copy; 2025 Teranga Shuttle. Tous droits réservés.
                        </Typography>
                        <Typography
                            variant="body2"
                            className="text-teranga-light-gray mt-2"
                        >
                            {/*Développé avec ❤️ par [Votre Nom/Agence] */}
                        </Typography>
                    </Box>
                </div>
            </footer>
        </>
    );
}
