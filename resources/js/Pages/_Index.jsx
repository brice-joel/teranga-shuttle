import React, { use, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { useRouteContext } from "../contexts/RouteContext";
import Carousel from "../components/Carousel";
import LocationsList from "../components/LocationsList";
import TrajetsList from "../components/TrajetsList";
import { Wave } from "react-animated-text";
import landing_image from "../assets/images/landingpage.png";
import banner from "../assets/images/banner.png";
const Index = ({ trajets, locations }) => {
    const route = useRouteContext();
    // Données fictives pour les témoignages
    const testimonials = [
        {
            id: 1,
            name: "Alice Dubois",
            text: "Service exceptionnel et personnel très attentionné. Notre voyage a été parfait !",
            avatar: "https://www.thetrainline.com/cms/media/1360/france-eiffel-tower-paris.jpg?mode=crop&width=660&height=440&quality=70",
        },
        {
            id: 2,
            name: "Marc Dupont",
            text: "Facile à utiliser et une sélection incroyable. J'ai trouvé l'offre parfaite en un clic.",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: 3,
            name: "Sophie Martin",
            text: "Je recommande vivement Teranga Shuttle. Très professionnel et excellent rapport qualité-prix.",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
    ];

    return (
        <div>
            <img
                src={landing_image}
                className="w-full md:h-[40vw]"
                alt="teranga shuttle"
            />
            <hr className="h-10" />
            <img
                src={banner}
                alt="teranga shuttle"
                className="h-48 md:h-full"
            />

            {/*Trajets section */}
            <TrajetsList trajets={trajets} />

            {/*Locations setion */}
            <LocationsList locations={locations} />

            {/* Section Comment ça Marche ? */}
            <section className="py-16 bg-color-500 ">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700  mb-12 animate-fade-in-down">
                        Comment ça Marche ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-300  rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
                            <div className="text-gray-700  text-5xl mb-4">
                                <i className="fas fa-search"></i>{" "}
                                {/* Icône Font Awesome */}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900  mb-3">
                                1. Choisir un Trajet ou une Location
                            </h3>
                            <p className="text-gray-600 ">
                                Trouvez votre trajet ou faite une Location du
                                véhicule.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-300  rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
                            <div className="text-gray-700  text-5xl mb-4">
                                <i className="fas fa-book"></i>{" "}
                                {/* Icône Font Awesome */}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900  mb-3">
                                2. Réservez Facilement
                            </h3>
                            <p className="text-gray-600 ">
                                Confirmez votre réservation en quelques clics
                                via notre plateforme sécurisée.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-300  rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
                            <div className="text-gray-700  text-5xl mb-4">
                                <i className="fas fa-plane-departure"></i>{" "}
                                {/* Icône Font Awesome */}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                3. Profitez de votre Voyage
                            </h3>
                            <p className="text-gray-600 ">
                                Détendez-vous et laissez-nous vous emmener à
                                destination en toute sérénité.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Appel à l'Action */}
            <section className="py-16 bg-gray-200 text-gray-700 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 animate-fade-in-up">
                        Prêt à Planifier Votre Prochain Voyage ?
                    </h2>
                    <p className="text-lg md:text-xl mb-8">
                        Découvrez nos offres exceptionnelles et réservez votre
                        aventure dès aujourd'hui !
                    </p>
                    <Link
                        href={route("devis.index")} // Lien vers la page de contact ou de réservation
                        className="inline-block bg-white text-color-500 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
                    >
                        Contactez-Nous !
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Index;
