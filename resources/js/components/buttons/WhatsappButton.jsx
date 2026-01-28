import React from "react";

const WhatsappButton = () => {
    return (
        <a
            href="https://wa.me/+41763233400?text=R%C3%A9servation%20d'une%20course%20sur%20Teranga%20Shuttle%0ABonjour%2C%20J'aimerai%20prendre%20une%20r%C3%A9servation"
            target="_blank"
            class="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out animate-pulse hover:animate-none"
        >
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>
    );
};

export default WhatsappButton;
