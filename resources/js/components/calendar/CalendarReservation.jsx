import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import frLocale from "@fullcalendar/core/locales/fr";

import {
    Box,
    Typography,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import { toast } from "react-toastify";

// Mock data for unavailable events - Use current date for better testing
const mockUnavailableEvents = [
    {
        id: "unavail-1",
        title: "Indisponible (Maintenance)",
        start: "2025-08-27T09:00:00",
        end: "2025-08-27T12:00:00",
        color: "#EF5350",
        display: "",
        allDay: false,
    },
    {
        id: "unavail-2",
        title: "Réservé (Trajet Long)",
        start: "2025-07-24T14:00:00",
        end: "2025-07-24T18:00:00",
        color: "#EF5350",
        display: "background",
        allDay: false,
    },
    {
        id: "unavail-3",
        title: "Entretien Véhicule",
        start: "2025-07-26",
        end: "2025-07-27",
        color: "#EF5350",
        display: "background",
        allDay: true,
    },
    {
        id: "unavail-4",
        title: "Réservé (Dakar)",
        start: "2025-07-25T08:00:00",
        end: "2025-07-25T10:30:00",
        color: "#EF5350",
        display: "background",
        allDay: false,
    },
    {
        id: "unavail-5",
        title: "Indisponible",
        start: "2025-07-28T10:00:00",
        end: "2025-07-28T12:00:00",
        color: "#EF5350",
        display: "",
        allDay: false,
    },
];

export default function CalendarReservation({ onDateSelect, reservations }) {
    // Ajout d'une prop onDateSelect
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const calendarRef = useRef(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const theme = useTheme();
    // Détecte si l'écran est petit (moins de md)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        // Simule le chargement des événements depuis une API
        setTimeout(() => {
            setEvents(reservations); // Utilisez des données mockées ou chargez depuis votre backend
            setLoading(false);
        }, 1500);
    }, []);

    // Fonction pour styliser les événements indisponibles (background events)
    const handleEventContent = (arg) => {
        if (arg.event.display === "background") {
            return (
                <div
                    style={{
                        backgroundColor: arg.event.color,
                        opacity: 0.15, // Opacité réduite
                        height: "100%",
                        width: "100%",
                        borderRadius: "4px",
                        pointerEvents: "none", //bloque le clic
                        cursor: "not-allowed",
                        "cursor-pointer": "none",
                    }}
                >
                    {arg.event.title}
                </div>
            );
        }
        // Pour les autres types d'événements (si vous en avez)
        return (
            <Box
                sx={{
                    backgroundColor: "pink",
                    color: "black",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.75rem",
                }}
            >
                {arg.event.title}
            </Box>
        );
    };

    // Gère le clic sur une plage horaire vide (disponible)

    const handleDateClick = (arg) => {
        const clickedDateTime = arg.date; // Objet Date
        const clickedDateStr = arg.dateStr; // Chaîne ISO (ex: "2025-07-23T10:00:00")

        // Ici, vous pouvez vérifier si la date est dans le futur, etc.
        if (clickedDateTime < new Date()) {
            toast.warn("Vous ne pouvez pas sélectionner une date passée.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (
            //si la plage est indisponible (donc non remplie)
            false
        ) {
            console.log(clickedDateStr, clickedDateTime);
            //si la plage est indisponible (donc non remplie)
        } else {
            // Appeler la fonction passée en prop pour communiquer la sélection au parent
            if (onDateSelect) {
                onDateSelect(clickedDateTime);
                console.log(clickedDateTime);
            }
        }
    };
    // Gère le clic sur un événement existant (indisponible)
    const handleEventClick = (clickInfo) => {
        console.log(clickInfo);

        toast.error(`Cette plage horaire  est indisponible.`, {
            position: "bottom-right", // Position plus discrète
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
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
            className="p-4 md:p-8 bg-white rounded-lg shadow-xl text-teranga-dark border border-gray-100"
            sx={{
                // Styles spécifiques pour FullCalendar pour correspondre au thème Teranga
                "& .fc-button-primary": {
                    backgroundColor: "teranga-dark !important", // Boutons du calendrier
                    borderColor: "teranga-dark !important",
                    color: "white !important",
                    "&:hover": {
                        backgroundColor: "teranga-gold !important",
                        borderColor: "teranga-gold !important",
                        color: "teranga-dark !important",
                    },
                    "&:active": {
                        backgroundColor: "teranga-gold !important",
                        borderColor: "teranga-gold !important",
                        boxShadow: "none !important",
                    },
                    "&:focus": {
                        boxShadow: "none !important",
                    },
                },
                "& .fc-button-active": {
                    // Bouton de vue active
                    backgroundColor: "teranga-gold !important",
                    borderColor: "teranga-gold !important",
                    color: "teranga-dark !important",
                },
                "& .fc-toolbar-title": {
                    color: "teranga-dark !important", // Titre du mois/semaine
                    fontWeight: "bold !important",
                    fontSize: { xs: "1.2rem", md: "1.75rem" },
                },
                "& .fc-col-header-cell-cushion": {
                    color: "teranga-dark !important", // Jours de la semaine (Lun, Mar...)
                    fontWeight: "bold !important",
                },
                "& .fc-daygrid-day-number": {
                    color: "teranga-medium-gray !important", // Numéros des jours
                },
                "& .fc-timegrid-slot-label": {
                    color: "teranga-medium-gray !important", // Heures de la grille
                },
                "& .fc-event": {
                    // Styles généraux pour les événements
                    cursor: "pointer !important",
                    backgroundColor: "teranga-gold !important", // Couleur par défaut des événements (si non background)
                    borderColor: "teranga-gold !important",
                    color: "teranga-dark !important",
                    borderRadius: "4px",
                },
                "& .fc-event-title": {
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                },
                "& .fc-event-time": {
                    fontSize: "0.7rem",
                    fontWeight: "normal",
                },
                "& .fc-day-today": {
                    // Jour actuel
                    backgroundColor: "teranga-cream !important",
                    opacity: 0.8,
                },
                "& .fc-highlight": {
                    // Sélection de plage horaire
                    backgroundColor: "teranga-gold !important",
                    opacity: 0.2,
                },
                // Styles pour les événements de fond
                "& .fc-bg-event": {
                    opacity: 0.15, // Plus subtil
                },
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                className="font-bold text-center mb-6 text-teranga-dark"
                sx={{ fontSize: "20px" }}
            >
                Calendrier des Disponibilités Teranga Shuttle
            </Typography>

            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 300,
                        gap: 2,
                    }}
                >
                    <CircularProgress
                        sx={{ color: "teranga-gold" }}
                        size={50}
                    />
                    <Typography variant="h6" color="teranga-medium-gray">
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
                    initialView={
                        isSmallScreen ? "timeGridFiveDay" : "timeGridWeek"
                    } // Vue initiale adaptative
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "timeGridDay,timeGridFiveDay",

                        /* right: isSmallScreen
                            ? "dayGridMonth,timeGridFiveDay,listWeek"
                            : "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                            */
                    }}
                    locales={[frLocale]}
                    locale="fr"
                    events={events}
                    eventDisplay="auto"
                    eventContent={handleEventContent}
                    //eventColor="red"
                    //eventBackgroundColor="green"
                    slotMinTime="06:00:00" // Début des heures affichées
                    slotMaxTime="22:00:00" // Fin des heures affichées
                    expandRows={true} // Permet aux cellules de s'étendre pour remplir la hauteur
                    height="auto" // Hauteur automatique pour la réactivité
                    contentHeight="auto"
                    aspectRatio={isSmallScreen ? 0.8 : 2} // Ajuste le ratio pour petit écran
                    eventOverlap={false} // Empêche les événements de se chevaucher visuellement
                    selectOverlap={false} // Empêche la sélection de chevaucher les événements
                    nowIndicator={true} // Affiche une ligne pour l'heure actuelle
                    selectable={true} // Permet la sélection de plages horaires
                    eventClick={handleEventClick} // Gère le clic sur un événement existant
                    dateClick={handleDateClick} // Gère le clic sur une plage horaire vide
                    views={{
                        dayGridMonth: {
                            titleFormat: { year: "numeric", month: "long" },
                            weekends: true,
                        },
                        timeGridWeek: {
                            weekends: true,
                        },
                        timeGridFiveDay: {
                            // Nouvelle vue pour 5 jours
                            type: "timeGrid",
                            duration: { days: 5 },
                            buttonText: "Week", // Texte du bouton
                            weekends: true, // Inclure les weekends si souhaité, ou false
                        },
                        timeGridDay: {
                            weekends: true,
                        },
                        listWeek: {
                            buttonText: "Liste",
                        },
                    }}
                    buttonText={{
                        today: "Aujourd'huit",
                        month: "Mois",
                        week: "Semaine", // Renommé de "Sem."
                        day: "Jour",
                        list: "Liste",
                    }}
                />
            )}
            <Typography
                variant="body2"
                className="mt-6 text-center text-teranga-medium-gray"
            >
                <Box
                    component="span"
                    sx={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        borderRadius: "4px",
                        backgroundColor: "pink",
                        opacity: 0.6,
                        verticalAlign: "middle",
                        mr: 1,
                    }}
                ></Box>
                Les plages horaires ombrées en rose indiquent des
                indisponibilités.
            </Typography>
        </motion.div>
    );
}
