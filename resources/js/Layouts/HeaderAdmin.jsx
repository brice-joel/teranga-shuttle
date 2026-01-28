// resources/js/Layouts/HeaderAdmin.jsx (ou Components/HeaderAdmin.jsx)

import React, { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

// Importez les icônes Material UI
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Pour les trajets
import EventNoteIcon from "@mui/icons-material/EventNote"; // Pour les réservations
import GroupIcon from "@mui/icons-material/Group"; // Pour les utilisateurs
import LogoutIcon from "@mui/icons-material/Logout"; // Pour la déconnexion

export default function HeaderAdmin() {
    const { auth } = usePage().props; // Récupère l'objet auth de Inertia

    // États pour gérer la visibilité du menu utilisateur et de la sidebar
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Références pour les éléments du DOM (pour fermer le dropdown/sidebar au clic extérieur)
    const userDropdownRef = useRef(null);
    const sidebarRef = useRef(null);
    const sidebarToggleButtonRef = useRef(null);

    // Gérer la fermeture du dropdown utilisateur au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target) &&
                !event.target.closest('[data-dropdown-toggle="dropdown-user"]')
            ) {
                setIsUserDropdownOpen(false);
            }
            // Gérer la fermeture de la sidebar au clic extérieur sur mobile
            if (
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                sidebarToggleButtonRef.current &&
                !sidebarToggleButtonRef.current.contains(event.target)
            ) {
                // Seulement si l'écran est petit (sm:hidden)
                if (window.innerWidth < 640) {
                    // Tailwind's 'sm' breakpoint is 640px
                    setIsSidebarOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isUserDropdownOpen, isSidebarOpen]); // Dépendances pour re-exécuter l'effet

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen((prev) => !prev);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <header>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            {/* Bouton pour ouvrir/fermer la sidebar (visible sur mobile) */}
                            <button
                                ref={sidebarToggleButtonRef}
                                onClick={toggleSidebar}
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="logo-sidebar"
                                aria-expanded={isSidebarOpen ? "true" : "false"}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <MenuIcon className="w-6 h-6" />
                            </button>
                            <Link
                                href={route("admin.dashboard")}
                                className="flex ms-2 md:me-24"
                            >
                                {/* Remplacez l'image Flowbite par votre logo si vous en avez un */}
                                <img
                                    src="/images/logo.svg"
                                    className="h-8 hidden me-3"
                                    alt="Teranga shuttle Logo"
                                />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    Admin - Teranga Shuttle
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3 relative">
                                {" "}
                                {/* Ajout de relative pour le positionnement du dropdown */}
                                <div>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded={
                                            isUserDropdownOpen
                                                ? "true"
                                                : "false"
                                        }
                                        data-dropdown-toggle="dropdown-user"
                                        onClick={toggleUserDropdown}
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        {/* Remplacez l'image Flowbite par l'avatar de l'utilisateur ou une icône générique */}
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                {/* Dropdown utilisateur */}
                                <div
                                    ref={userDropdownRef}
                                    className={`absolute right-0 mt-3 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-lg dark:bg-gray-700 dark:divide-gray-600 ${
                                        isUserDropdownOpen ? "block" : "hidden"
                                    }`}
                                    id="dropdown-user"
                                >
                                    {auth.user && ( // Affiche si l'utilisateur est authentifié
                                        <div className="px-4 py-3" role="none">
                                            <p
                                                className="text-sm text-gray-900 dark:text-white"
                                                role="none"
                                            >
                                                {auth.user.name}
                                            </p>
                                            <p
                                                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                role="none"
                                            >
                                                {auth.user.email}
                                            </p>
                                        </div>
                                    )}
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                href={route("admin.dashboard")}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            {/* Utilisation de Link pour la déconnexion avec méthode DELETE */}
                                            <Link
                                                href={route(
                                                    "admin.auth.logout"
                                                )}
                                                method="delete"
                                                as="button"
                                                type="button" // Important pour les boutons dans les formulaires
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Déconnexion
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href={route("admin.dashboard")}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <DashboardIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route("admin.reservation.index")}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <EventNoteIcon className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Réservations
                                </span>
                                {/* Le badge de notification (si dynamique, doit être passé en prop) */}
                                {/* <span className="hidden inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </Link>
                        </li>
                        {/* Les éléments 'hidden' sont laissés tels quels pour l'instant */}
                        <li className="hidden">
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* Icône Material UI équivalente si nécessaire */}
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Transactions
                                </span>
                            </a>
                        </li>
                        <li className="hidden">
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* Icône Material UI équivalente si nécessaire */}
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Sign In
                                </span>
                            </a>
                        </li>
                        <li className="hidden">
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* Icône Material UI équivalente si nécessaire */}
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Sign Up
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </header>
    );
}
