export const formatDate = (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;

    return new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);
};

export const isDateInPast = (date: Date): boolean => {
    return date < new Date();
};

/**
 * Additionne des minutes à une date de debut  au format base de données et une durée et retourne une date de fin.
 * @param {string} dateDebut - Format 'YYYY-MM-DD HH:mm:ss'
 * @param {number} dureeMinutes - Durée en minutes
 * @returns {string} - Nouvelle date formatée 'YYYY-MM-DD HH:mm:ss'
 */
export function calculateEndDate(
    dateDebut: string,
    dureeMinutes: number,
): string {
    if (!dateDebut || isNaN(dureeMinutes)) {
        // throw new Error(
        //     "dateDebut et dureeMinutes sont requis et doivent être valides",
        // );
        return ""; // Retourne une chaîne vide en cas d'erreur
    }
    // 1. Créer un objet Date à partir de la chaîne (remplacement de l'espace par T pour le format ISO)
    let date = new Date(dateDebut.replace(" ", "T"));

    // 2. Additionner les minutes en utilisant setMinutes et getMinutes
    // setMinutes gère automatiquement le passage à l'heure/jour suivant
    date.setMinutes(date.getMinutes() + dureeMinutes);

    // 3. Formater la date en 'YYYY-MM-DD HH:mm:ss'
    const pad = (n: number) => n.toString().padStart(2, "0");

    const annee = date.getFullYear();
    const mois = pad(date.getMonth() + 1); // Les mois commencent à 0
    const jour = pad(date.getDate());
    const heures = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const secondes = pad(date.getSeconds());

    return `${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`;
}

export function formatDuration(totalMinutes: number) {
    const heures = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let resultat = "";

    // Si on a au moins une heure, on affiche les heures
    if (heures > 0) {
        resultat += heures + "h";
    }

    // On affiche les minutes si elles sont supérieures à 0
    // OU si le total est de 0 (pour ne pas avoir une chaîne vide)
    if (minutes > 0) {
        resultat += minutes + "min";
    } else if (totalMinutes === 0) {
        resultat = "0min";
    }

    return resultat;
}

export function formatPrice(price: number, showCurrency = true) {
    // Crée un formateur de nombres pour la langue et le style monétaire
    const formatter = new Intl.NumberFormat("fr-FR", {
        style: "decimal", // Utilise le style décimal
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Formate le prix avec l'espacement des milliers
    const formattedPrice = formatter.format(price);

    // Retourne le prix formaté avec ou sans la devise
    return formattedPrice + (showCurrency ? ` FCFA` : "");
}
