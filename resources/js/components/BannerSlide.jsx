import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    ArrowForwardIos as ArrowRightIcon,
    ArrowBackIos as ArrowLeftIcon,
} from "@mui/icons-material";

// Importez vos images ici (assurez-vous que les chemins sont corrects)
//import slide1Image from "../assets/images/banner-taxi.jpg";
//import slide2Image from "../assets/images/banner-airport.jpg";
//import slide3Image from "../assets/images/banner-car-rental.jpg";

// Styles pour les flèches de navigation
const sliderArrowStyles = (theme) => ({
    "&.slick-prev, &.slick-next": {
        zIndex: 1,
        "&::before": {
            display: "none",
        },
        "&:hover": {
            color: theme.palette.terangaGold,
        },
        [theme.breakpoints.down("sm")]: {
            display: "none !important",
        },
    },
    "&.slick-prev": {
        left: "25px",
    },
    "&.slick-next": {
        right: "25px",
    },
});

// Composant de flèche personnalisée
const CustomArrow = ({ direction, onClick }) => {
    const Icon = direction === "next" ? ArrowRightIcon : ArrowLeftIcon;
    return (
        <Button
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            style={{
                left: direction === "prev" ? "15px" : "auto",
                right: direction === "next" ? "15px" : "auto",
            }}
        >
            <Icon />
        </Button>
    );
};

// Données des slides
const slidesData = [
    {
        // image: slide3Image,
        image: "https://mercedes-benz-media.co.uk/assets/images/hero/47963-mercedes-vclass-0076.jpg",
        title: "Louez la Voiture de vos Rêves",
        subtitle: "Contactez-nous pour louer la voiture de vos déplacements.",
        buttonText: "Contact",
        link: route("contact"),
    },

    {
        //image: slide2Image,
        // image: "https://voyagegenresenegal.home.blog/wp-content/uploads/2019/02/blog.png",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeXN4VOerTEW-jQhgjeoGW_XJWMwXS7vVlYQ&s",
        title: "Arrivées & Départs Sans Stress",
        subtitle:
            "Des chauffeurs qualifiés et ponctuels pour vos arrivées et départs au Sénégal.",
        buttonText: "Obtenir un dévis",
        link: route("devis.index"),
    },
    {
        // image: slide1Image,
        image: "https://discover-senegal.com/wp-content/uploads/2019/05/Transport-fluvial.jpg",
        title: "Des Tarifs flexibles",
        subtitle: "Des tarifs flexibles adaptés aux besoins de vos voyages.",
        buttonText: "Découvrir Nos Taris",
        link: route("tarifs"),
    },
];

export default function BannerSlide() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    return (
        <Box
            className="my-5"
            sx={{
                "& .slick-slider": {
                    ...sliderArrowStyles(theme),
                },
            }}
        >
            <Slider {...settings}>
                {slidesData.map((slide, index) => (
                    <div key={index}>
                        <Box
                            className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden"
                            sx={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundAttachment: "fixed",
                                color: "white",
                            }}
                        >
                            <motion.div
                                className="relative z-10 p-4 md:p-8 max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <Typography
                                    variant="h3"
                                    component="h2"
                                    className="font-extrabold mb-4"
                                    sx={{
                                        fontSize: { xs: "2rem", md: "3rem" },
                                    }}
                                >
                                    {slide.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    className="font-light max-w-2xl mx-auto mb-6"
                                    sx={{
                                        fontSize: { xs: "1rem", md: "1.25rem" },
                                    }}
                                >
                                    {slide.subtitle}
                                </Typography>
                                <Link
                                    href={slide.link}
                                    as="a"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            mt: 2,
                                            px: isSmallScreen ? 4 : 6,
                                            py: isSmallScreen ? 1.5 : 2,
                                            backgroundColor: "#FFD700",
                                            color: "#003366",
                                            fontWeight: "bold",
                                            borderRadius: "50px",
                                            textTransform: "none",
                                            fontSize: "1rem",
                                            boxShadow:
                                                "0 8px 25px rgba(0,0,0,0.2)",
                                            "&:hover": {
                                                backgroundColor: "#e6c200",
                                                boxShadow:
                                                    "0 12px 30px rgba(0,0,0,0.3)",
                                            },
                                        }}
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Link>
                            </motion.div>
                        </Box>
                    </div>
                ))}
            </Slider>
        </Box>
    );
}
