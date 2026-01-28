import dayjs from "dayjs";
import "dayjs/locale/fr"; // Importer la locale française pour dayjs
// Configuration dayjs en français
import customParseFormat from "dayjs/plugin/customParseFormat"; // Requis pour parser des formats spécifiques

dayjs.extend(customParseFormat); // Étendre dayjs avec le plugin

dayjs.locale("fr");

export const formatPrice = (price) => {
    if (!price) return "N/A";
    const format_price = new Intl.NumberFormat("fr-SN", {
        style: "currency",
        currency: "XOF",
    }).format(price);

    return format_price;
};

export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    return dayjs(dateTimeString).format("DD MMMM YYYY à HH:mm");
};

export const formatDate = (date) => {
    if (!date) return "N/A";
    return dayjs(date).format("DD MMMM YYYY");
};

/*
export const formatTime = (time) => {
    if (!time) return "N/A";
    return dayjs(time).format("HH:mm");
};*/
export function getEndTime(startTimeString, durationHours) {
    // Parse l'heure de départ en utilisant le format HH:MM:SS
    // 'HH:mm:ss' est le format par défaut de dayjs pour le parsing, mais 'customParseFormat' le rend plus robuste
    const startTime = dayjs(startTimeString, "HH:mm:ss");

    // Vérifier si le parsing a échoué
    if (!startTime.isValid()) {
        console.error(
            "Erreur: L'heure de départ n'est pas valide. Format attendu: HH:MM:SS"
        );
        return "Heure invalide";
    }

    // Ajoute la durée en heures
    const newTime = startTime.add(durationHours, "minutes");

    // Retourne la nouvelle heure sous un format lisible par l'utilisateur
    // 'HH[h]mm' affichera par exemple '09h30', 'H[h]mm' affichera '9h30' (sans zéro en tête pour l'heure)
    // Choisissez le format qui convient le mieux à vos utilisateurs.
    return newTime.format("HH[h]mm"); // Exemple: "09h30"
    // Ou si vous préférez sans zéro en tête pour les heures inférieures à 10:
    // return newTime.format('H[h]mm'); // Exemple: "9h30"
}

export function formatTime(_time) {
    // Parse l'heure de la BDD
    const time = dayjs(_time, "HH:mm:ss");

    // Vérifier si le parsing a échoué
    if (!time.isValid()) {
        console.error(
            "Erreur: L'heure de la base de données n'est pas valide. Format attendu: HH:MM:SS"
        );
        return "Heure invalide";
    }

    // Retourne l'heure sous un format lisible par l'utilisateur
    // Encore une fois, 'HH[h]mm' pour "09h30" ou 'H[h]mm' pour "9h30"
    return time.format("HH[h]mm"); // Exemple: "09h30"
}
