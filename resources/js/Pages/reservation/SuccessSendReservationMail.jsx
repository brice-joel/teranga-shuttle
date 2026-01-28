import React from "react";
import { MdCheckCircleOutline } from "react-icons/md"; // Importe l'icône de Material Design

const SuccessSendReservationMail = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-2xl text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <div className="mb-6 flex flex-col items-center">
                    <MdCheckCircleOutline className="text-green-500 w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 animate-bounce" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
                        Demande de réservation envoyée !
                    </h1>
                </div>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                    Merci pour votre demande. Un e-mail de confirmation vous
                    sera envoyé pour confirmation
                    <br className="hidden sm:inline" />
                    Nous vous contacterons dans les plus brefs délais.
                </p>
                <div className="mt-4">
                    <a
                        href="/"
                        className="inline-block px-8 py-3  text-gray-900 font-semibold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
                    >
                        Retourner à l'accueil
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SuccessSendReservationMail;
