// resources/js/Pages/Home/components/Calendar.jsx

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // Pour interaction si vous voulez la sélection par exemple
import momentPlugin from "@fullcalendar/moment"; // Pour le formatage avec moment.js si désiré
import momentTimezonePlugin from "@fullcalendar/moment-timezone"; // Pour la gestion des fuseaux horaires
import frLocale from "@fullcalendar/core/locales/fr"; // Import de la localisation française

import { Box, Typography, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Mock data pour les indisponibilités
// En production, ces données viendraient de votre backend
const mockUnavailableEvents = [
    {
        id: "unavail-1",
        title: "Indisponible (Maintenance)",
        start: "2025-07-17T09:00:00",
        end: "2025-07-17T12:00:00",
        color: "#EF5350", // Rouge pour l'indisponibilité
        display: "background", // Affiche en arrière-plan sans bloquer l'événement
        allDay: false,
    },
    {
        id: "unavail-2",
        title: "Réservé (Trajet Long)",
        start: "2025-07-18T14:00:00",
        end: "2025-07-18T18:00:00",
        color: "#EF5350",
        display: "background",
        allDay: false,
    },
    {
        id: "unavail-3",
        title: "Entretien Véhicule",
        start: "2025-07-20",
        end: "2025-07-21", // Indisponible toute la journée du 20
        color: "#EF5350",
        display: "background",
        allDay: true,
    },
    {
        id: "unavail-4",
        title: "Réservé (Dakar)",
        start: "2025-07-22T08:00:00",
        end: "2025-07-22T10:30:00",
        color: "#EF5350",
        display: "background",
        allDay: false,
    },
    // Ajoutez d'autres périodes d'indisponibilité ici
];

export default function CalendarReservation() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const calendarRef = useRef(null); // Pour accéder à l'instance FullCalendar
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Déclenche l'animation quand 10% du composant est visible
    });

    useEffect(() => {
        // Simuler un chargement de données depuis une API
        setTimeout(() => {
            setEvents(mockUnavailableEvents);
            setLoading(false);
        }, 1500); // Délai de 1.5 secondes
    }, []);

    const handleDatesSet = (dateInfo) => {
        // Cette fonction peut être utilisée pour charger dynamiquement des événements
        // en fonction de la plage de dates affichée par le calendrier.
        // Pour l'instant, nous utilisons des événements statiques.
        // console.log('Dates set:', dateInfo.startStr, dateInfo.endStr);
    };

    const handleEventContent = (arg) => {
        // Personnalise l'affichage des événements.
        // Ici, nous voulons juste nous assurer que les 'background' events sont bien affichés.
        if (arg.event.display === "background") {
            return (
                <div
                    style={{
                        backgroundColor: arg.event.color,
                        opacity: 0.2, // Légèrement transparent
                        height: "100%",
                        width: "100%",
                        borderRadius: "4px",
                        pointerEvents: "none", // Empêche le clic sur l'arrière-plan
                    }}
                ></div>
            );
        }
        return (
            <Box
                sx={{
                    backgroundColor: arg.event.color || "#3788d8", // Couleur par défaut si non définie
                    color: "white",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.75rem", // Petite taille de police
                }}
            >
                {arg.event.title}
            </Box>
        );
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                },
            }}
            className="p-4 md:p-8 bg-white rounded-lg shadow-xl text-teranga-dark"
            sx={{
                "& .fc-button-primary": {
                    // Styles pour les boutons de FullCalendar
                    backgroundColor: "teranga-gold !important",
                    borderColor: "teranga-gold !important",
                    color: "teranga-dark !important",
                    "&:hover": {
                        backgroundColor: "#B58E2F !important",
                        borderColor: "#B58E2F !important",
                    },
                },
                "& .fc-button:focus": {
                    boxShadow: "none !important", // Supprime le focus outline par défaut
                },
                "& .fc-toolbar-title": {
                    // Styles pour le titre du mois/année
                    color: "teranga-dark !important",
                    fontWeight: "bold !important",
                },
                "& .fc-col-header-cell-cushion": {
                    // Styles pour les noms de jours (Lun, Mar...)
                    color: "teranga-dark !important",
                    fontWeight: "bold !important",
                },
                "& .fc-daygrid-day-number": {
                    // Numéros de jour dans la grille
                    color: "teranga-medium-gray !important",
                },
                "& .fc-event-title": {
                    // Titre des événements si vous en avez qui s'affichent
                    fontSize: "0.8rem",
                },
                // Styles spécifiques pour les événements d'arrière-plan (indisponibilités)
                "& .fc-bg-event": {
                    opacity: 0.1, // Plus transparent pour les blocs
                },
                "& .fc-event": {
                    cursor: "default !important", // Pas de curseur de pointeur pour les événements
                },
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                className="font-bold text-center mb-6"
            >
                Calendrier des Disponibilités Teranga Shuttle
            </Typography>

            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 300,
                    }}
                >
                    <CircularProgress sx={{ color: "teranga-gold" }} />
                    <Typography ml={2} color="teranga-medium-gray">
                        Chargement du calendrier...
                    </Typography>
                </Box>
            ) : (
                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                        interactionPlugin,
                        momentPlugin,
                        momentTimezonePlugin,
                    ]}
                    initialView="dayGridMonth" // Vue par défaut
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // Boutons des vues
                    }}
                    locales={[frLocale]} // Importation de la locale française
                    locale="fr" // Utilisation de la locale française
                    events={events} // Vos événements d'indisponibilité
                    eventDisplay="auto" // Gère comment les événements sont affichés (important pour 'background')
                    eventContent={handleEventContent} // Pour personnaliser le rendu des événements
                    slotMinTime="06:00:00" // Heure de début d'affichage des créneaux
                    slotMaxTime="23:00:00" // Heure de fin d'affichage des créneaux
                    expandRows={true} // Étend les lignes pour remplir la hauteur disponible
                    height="auto" // Rendre la hauteur responsive
                    contentHeight="auto" // Idem
                    aspectRatio={2} // Ratio pour les grands écrans, s'ajuste pour les petits
                    eventOverlap={false} // Les événements ne se superposent pas si bloquants (pour le futur)
                    selectOverlap={false} // Idem pour la sélection
                    nowIndicator={true} // Affiche la ligne de l'heure actuelle
                    datesSet={handleDatesSet} // Callback quand la plage de dates change
                    // Pour la responsivité : ajuster la vue par défaut en fonction de la largeur
                    views={{
                        dayGridMonth: {
                            // name of view
                            titleFormat: { year: "numeric", month: "long" },
                            weekends: true, // Affiche les week-ends
                        },
                        timeGridWeek: {
                            weekends: true,
                        },
                        timeGridDay: {
                            weekends: true,
                        },
                        listWeek: {
                            // Pour une meilleure expérience mobile
                            buttonText: "Liste",
                        },
                    }}
                    buttonText={{
                        today: "Aujourd'hui",
                        month: "Mois",
                        week: "Semaine",
                        day: "Jour",
                        list: "Liste", // Texte pour la vue liste
                    }}
                    // Ajout d'une gestion plus granulaire de la responsivité
                    // Si vous voulez des vues différentes selon la taille d'écran
                    // (nécessite un état ou des breakpoints CSS)
                    // Par exemple, passer en `listWeek` pour les petits écrans
                    // windowResize={(view) => {
                    //     if (window.innerWidth < 768) {
                    //         calendarRef.current.getApi().changeView('listWeek');
                    //     } else {
                    //         calendarRef.current.getApi().changeView('dayGridMonth');
                    //     }
                    // }}
                />
            )}
            <Typography
                variant="body2"
                className="mt-4 text-center text-teranga-medium-gray"
            >
                Les plages horaires en rouge indiquent les périodes où Teranga
                Shuttle est déjà réservé ou en maintenance.
            </Typography>
        </motion.div>
    );
}
