// resources/js/Components/CarouselBanner.jsx

import React from "react";
import Slider from "react-slick";
// Importez ces icônes si vous les avez installées via @heroicons/react
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const CarouselBanner = () => {
    // Les données de vos slides : image, titre, description
    const slides = [
        {
            id: 1,
            image: "https://way-plan.fr/wp-content/uploads/2022/09/accesoires-vtc.jpg", //"/images/banner-car1.webp", // Chemin vers votre image 1
            title: "Votre Destination, Notre Priorité",
            description: "Trouvez et réservez votre VTC en quelques clics.",
            buttonText: "Réservez maintenant",
            buttonLink: "/booking", // Lien vers votre page de réservation
        },
        {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRrCzLfV2oiQm__ZJuGHRCHSvdOKVn0MSL-Lcu7hNj7jSzllBuLYm0hCPfQm0e8ZecY8c&usqp=CAU", // "/images/banner-car2.webp", // Chemin vers votre image 2
            title: "Voyagez en Toute Sérénité",
            description:
                "Des chauffeurs professionnels pour une expérience sécurisée.",
            buttonText: "Découvrez nos services",
            buttonLink: "/services", // Lien vers votre page de services
        },
        {
            id: 3,
            image: "https://www.tourisme-salies-du-salat.com/wp-content/uploads/2022/03/0.jpg", //"/images/banner-car3.webp", // Chemin vers votre image 3
            title: "Profitez de Chaque Instant",
            description: "Confort et ponctualité pour tous vos déplacements.",
            buttonText: "Créez votre compte",
            buttonLink: "/register", // Lien vers la page d'inscription
        },
    ];

    // Paramètres de React-Slick
    const settings = {
        dots: true, // Affiche les points de navigation
        infinite: true, // Défilement infini
        speed: 800, // Vitesse de transition (ms)
        slidesToShow: 1, // Nombre de slides visibles à la fois
        slidesToScroll: 1, // Nombre de slides à défiler
        autoplay: true, // Lecture automatique
        autoplaySpeed: 5000, // Vitesse de lecture automatique (ms)
        fade: true, // Effet de fondu entre les images
        cssEase: "linear", // Type d'animation
        arrows: false, // Cache les flèches de navigation par défaut (on peut en ajouter des custom si besoin)
        // Si vous voulez des flèches personnalisées, vous pouvez les définir ici
        // nextArrow: <CustomNextArrow />,
        // prevArrow: <CustomPrevArrow />,
    };

    // Exemple de flèches personnalisées (décommenter si utilisé)
    // function CustomNextArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={`${className} absolute right-4 z-10 cursor-pointer`}
    //             style={{ ...style, display: "block" }}
    //             onClick={onClick}
    //         >
    //             <ChevronRightIcon className="h-10 w-10 text-white" />
    //         </div>
    //     );
    // }

    // function CustomPrevArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={`${className} absolute left-4 z-10 cursor-pointer`}
    //             style={{ ...style, display: "block" }}
    //             onClick={onClick}
    //         >
    //             <ChevronLeftIcon className="h-10 w-10 text-white" />
    //         </div>
    //     );
    // }

    return (
        <div className="relative w-full overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative h-[400px] md:h-[550px] lg:h-[700px]"
                    >
                        {/* Image de fond */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay sombre pour la lisibilité du texte */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4">
                            {/* Contenu du texte publicitaire */}
                            <div className="max-w-3xl text-white space-y-4">
                                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-2xl font-medium drop-shadow-md">
                                    {slide.description}
                                </p>
                                {slide.buttonText && slide.buttonLink && (
                                    <a
                                        href={slide.buttonLink}
                                        className="inline-block mt-6 px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                                    >
                                        {slide.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarouselBanner;
