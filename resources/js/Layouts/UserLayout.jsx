import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, usePage } from "@inertiajs/react";

import { toast } from "react-toastify";
import ChoiceReservationModalButton from "../components/buttons/ChoiceReservationModalButton";

const LayoutContent = ({ children }) => {
    const { auth, flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
        // Vous pouvez ajouter d'autres types de messages si nécessaire
    }, [flash]); // S'exécute à chaque changement de `flash`

    return (
        <div className="">
            <Header auth={auth} />
            <div className="mx-auto ">{children}</div>

            <ChoiceReservationModalButton className=" bg-color-900  rounded-xl hover:bg-color-800   transition duration-300 ease-in-out fixed bottom-4 left-4 z-50" />

            <Footer />
        </div>
    );
};
const UserLayout = ({ children }) => {
    return <LayoutContent>{children}</LayoutContent>;
};

export default UserLayout;
