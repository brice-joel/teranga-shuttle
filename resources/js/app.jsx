// resources/js/app.jsx

import "./bootstrap";
import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { RouteProvider } from "./contexts/RouteContext";
import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout"; // <-- Importez le nouveau layout Admin

// Importation de react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createInertiaApp({
    title: (title) => `${title} - Teranga Shuttle`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // --- Logique pour choisir le layout ---
        if (name.startsWith("admin/")) {
            // Par convention, les pages admin sont dans le dossier Admin/
            page.default.layout =
                page.default.layout ||
                ((page) => <AdminLayout children={page} />);
        } else {
            // Pour toutes les autres pages, utilisez le UserLayout
            page.default.layout =
                page.default.layout ||
                ((page) => <UserLayout children={page} />);
        }
        // --- Fin de la logique de choix du layout ---

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <React.StrictMode>
                <RouteProvider>
                    {/** Mon application */}
                    <App {...props} />

                    <ToastContainer
                        position="bottom-left"
                        autoClose={4000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </RouteProvider>
            </React.StrictMode>
        );
    },
    progress: {
        color: "blue",
        showSpinner: true,
    },
});
