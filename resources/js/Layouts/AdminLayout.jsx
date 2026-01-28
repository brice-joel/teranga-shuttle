import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { toast } from "react-toastify";

const AdminLayout = ({ children }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }

        // Vous pouvez ajouter d'autres types de messages si nécessaire
    }, [flash]); // S'exécute à chaque changement de `flash` console.log(usePage().props);

    return (
        <div className="min-h-screen  bg-gray-100 flex">
            <div className="flex-1 flex flex-col">
                <HeaderAdmin />
                {/* Contenu de la page avec titre */}
                <main class="mt-16  sm:ml-64 w-[100vw]   ">{children}</main>

                {/* Optionnel: Footer spécifique à l'admin */}
                <footer className="bg-gray-800 text-white text-center p-4">
                    &copy; 2025 Espace Admin. Tous droits réservés.
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
