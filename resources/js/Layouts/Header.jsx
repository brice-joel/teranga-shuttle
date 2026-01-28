import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import MenuIcon from "@mui/icons-material/Menu"; // Icône pour le menu mobile
import CloseIcon from "@mui/icons-material/Close"; // Icône pour fermer le menu mobile
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icône générique de profil
import PersonIcon from "@mui/icons-material/Person"; // Icône d'avatar par défaut si pas d'image
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icône de déconnexion
import BookmarksIcon from "@mui/icons-material/Bookmarks"; // Icône de réservations
import DescriptionIcon from "@mui/icons-material/Description"; // Icône de devis
import Image from "../components/images/Image";
import { useRouteContext } from "../contexts/RouteContext";
import logo from "../assets/images/logo.png";

const NavLink = ({ href, children }) => (
    <Link
        href={href}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300 ease-in-out lg:text-sm lg:px-4 lg:py-2 lg:mx-2 lg:inline-block lg:text-gray-600 lg:hover:text-blue-700 lg:hover:bg-transparent"
    >
        {children}
    </Link>
);

const Header = () => {
    const { auth } = usePage().props;
    const route = useRouteContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Ferme le menu de profil si le menu mobile s'ouvre
        if (!isMobileMenuOpen) setIsProfileMenuOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        // Ferme le menu mobile si le menu de profil s'ouvre
        if (!isProfileMenuOpen) setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        router.delete(route("auth.logout"));
    };

    return (
        <header className="bg-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300 ease-in-out">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo et Nom de l'entreprise */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-primary-100 hover:text-blue-700 transition duration-300 ease-in-out"
                        >
                            {/* Assurez-vous que le chemin de votre logo est correct */}

                            <img
                                src={logo}
                                alt="logo teranga"
                                className="w-15 h-15 mt-3"
                            />
                            <span className="font-extrabold text-xl tracking-tight">
                                {/*Teranga shuttle */}
                            </span>
                        </Link>
                    </div>

                    {/* Navigation principale (Desktop) */}
                    <nav className="hidden lg:flex flex-grow justify-center">
                        <NavLink href="/">Accueil</NavLink>
                        <NavLink href={route("service")}>Services</NavLink>
                        <NavLink href={route("tarifs")}>Tarifs</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </nav>

                    {/* Menu de droite (Connexion / Profil) */}
                    <div className="relative flex items-center space-x-4">
                        {auth.user ? (
                            <>
                                {/* Avatar de l'utilisateur connecté */}
                                <button
                                    onClick={toggleProfileMenu}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full transition duration-300 ease-in-out p-1"
                                    aria-expanded={
                                        isProfileMenuOpen ? "true" : "false"
                                    }
                                >
                                    {/* Ici, vous pouvez utiliser auth.user.profile_picture s'il existe */}
                                    {auth.user.profile_picture ? (
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={auth.user.profile_picture}
                                            alt={auth.user.name}
                                        />
                                    ) : (
                                        <PersonIcon
                                            className="text-gray-600"
                                            style={{ fontSize: 32 }}
                                        />
                                    )}
                                    <span className="hidden md:block font-medium text-sm">
                                        {auth.user.name}
                                    </span>
                                </button>

                                {/* Dropdown du menu utilisateur */}
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 top-full transform transition-all duration-300 ease-out origin-top-right scale-100 opacity-100">
                                        <Link
                                            href={route("account.reservation")}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out"
                                        >
                                            <BookmarksIcon
                                                className="mr-2"
                                                style={{ fontSize: 18 }}
                                            />
                                            Mes Réservations
                                        </Link>
                                        <Link
                                            href={route("account.index")}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out"
                                        >
                                            <AccountCircleIcon
                                                className="mr-2"
                                                style={{ fontSize: 18 }}
                                            />{" "}
                                            Mon Profil
                                        </Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Link
                                            href={route("devis.index")}
                                            className="w-full text-left flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-b-md transition duration-200 ease-in-out"
                                        >
                                            <DescriptionIcon
                                                className="mr-2"
                                                style={{ fontSize: 18 }}
                                            />
                                            <div className="border-t border-gray-100 my-1"></div>{" "}
                                            Demander un devis
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            as="button"
                                            className="w-full text-left flex items-center px-4 py-2 text-sm  text-red-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out"
                                        >
                                            <ExitToAppIcon
                                                className="mr-2"
                                                style={{ fontSize: 18 }}
                                            />
                                            Se déconnecter
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Icône de connexion pour utilisateur non connecté */}
                                <Link
                                    href={route("auth.login")}
                                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full transition duration-300 ease-in-out p-1"
                                >
                                    <AccountCircleIcon
                                        className="text-gray-600"
                                        style={{ fontSize: 32 }}
                                    />
                                    <span className="hidden md:block font-medium text-sm">
                                        Connexion
                                    </span>
                                </Link>
                                {/* Bouton "Demander un devis" pour non-connecté sur desktop */}
                                <Link
                                    href={route("devis.index")}
                                    className="hidden lg:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                >
                                    Demander un devis
                                </Link>
                            </>
                        )}

                        {/* Bouton de menu mobile (Hamburger) */}
                        <div className="-mr-2 flex lg:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-300 ease-in-out"
                                aria-expanded={
                                    isMobileMenuOpen ? "true" : "false"
                                }
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <CloseIcon style={{ fontSize: 28 }} />
                                ) : (
                                    <MenuIcon style={{ fontSize: 28 }} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            {isMobileMenuOpen && (
                <div className="lg:hidden animate-slideDown bg-white shadow-lg pb-4 pt-2 transition duration-300 ease-in-out">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink href="/">Accueil</NavLink>
                        <NavLink href={route("service")}>Services</NavLink>
                        <NavLink href={route("tarifs")}>Tarifs</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                        {!auth.user && (
                            <NavLink
                                href={route("devis.index")}
                                className="w-full text-center flex items-center justify-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Demander un devis
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
