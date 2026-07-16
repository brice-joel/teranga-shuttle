import { useMemo, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { X, Circle } from "lucide-react";
import { toast } from "sonner";
import { isDateInPast } from "@/Utils/formatters";
import { Booking } from "@/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: string) => void;
    bookings: Booking[];
}

export default function CalendarModal({
    isOpen,
    onClose,
    onSelect,
    bookings = [],
}: Props) {
    const [isMobile, setIsMobile] = useState(false);

    // Détection du mode mobile (écrans inférieurs à 768px)
    useEffect(() => {
        if (!isOpen) return;
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    // Transformer les bookings en événements FullCalendar
    const events = useMemo(() => {
        return bookings.map((booking) => {
            const isConfirmed =
                booking.status === "paid" || booking.status === "validated";
            const isPending = booking.status === "pending";

            return {
                id: String(booking.id),
                title: isConfirmed ? "Réservé" : "En cours...",
                start: booking.start_time,
                end: booking.end_time,
                backgroundColor: isConfirmed
                    ? "#22c55e"
                    : isPending
                      ? "#f97316"
                      : "#94a3b8",
                borderColor: "transparent",
                editable: false,
                display: "block",
            };
        });
    }, [bookings]);

    if (!isOpen) return null;

    const handleDateSelect = (info: any) => {
        const selectedDate = new Date(info.dateStr);

        if (isDateInPast(selectedDate)) {
            toast.error("Veuillez choisir une date et une heure futures.");
            return;
        }

        const isOverlap = bookings.some((b) => {
            const start = new Date(b.start_time);
            const end = new Date(b.end_time);
            return (
                selectedDate >= start &&
                selectedDate < end &&
                b.status !== "cancelled"
            );
        });

        if (isOverlap) {
            toast.error("Ce créneau est déjà occupé.");
            return;
        }

        onSelect(info.dateStr);
        onClose();
        toast.success("Date sélectionnée !");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[95vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh]">
                {/* Header Adaptatif */}
                <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50 relative">
                    <div className="w-full pr-10 sm:pr-0">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            Choisir votre créneau
                        </h3>
                        {/* Légende en grille sur mobile */}
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-4 mt-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5">
                                <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                                <span className="text-slate-600">
                                    Déjà réservé
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Circle className="w-3 h-3 fill-orange-500 text-orange-500" />
                                <span className="text-slate-600">En cours</span>
                            </div>
                            <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                                <div className="w-3 h-3 border border-slate-300 bg-white rounded-full" />
                                <span className="text-slate-600">
                                    Disponible
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full absolute top-4 right-4 sm:relative sm:top-0 sm:right-0"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                    </button>
                </div>

                {/* Conteneur du calendrier avec injection de styles responsives */}
                <div className="p-2 sm:p-6 overflow-y-auto flex-1 global-fc-responsive">
                    <FullCalendar
                        key={isMobile ? "mobile" : "desktop"} // Force le re-render si l'écran change
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
                        locale={frLocale}
                        headerToolbar={{
                            left: "prev,next,today",
                            center: "title",
                            right: isMobile
                                ? "timeGridWeek,timeGridDay"
                                : "timeGridWeek,timeGridDay",
                        }}
                        selectable={true}
                        selectMirror={true}
                        allDaySlot={false}
                        slotMinTime="06:00:00"
                        slotMaxTime="23:00:00"
                        dateClick={handleDateSelect}
                        height="auto"
                        slotDuration="00:30:00"
                        nowIndicator={true}
                        events={events}
                        eventOverlap={false}
                        selectOverlap={false}
                        dayMaxEvents={true}
                        handleWindowResize={true}
                    />
                </div>
            </div>

            {/* Styles injectés pour écraser le CSS interne de FullCalendar sur Mobile */}
            <style>{`
                @media (max-width: 767px) {
                    .global-fc-responsive .fc .fc-toolbar {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        gap: 0.5rem;
                        margin-bottom: 1rem !important;
                    }
                    .global-fc-responsive .fc .fc-toolbar-title {
                        font-size: 1.1rem !important;
                        font-weight: 700;
                    }
                    .global-fc-responsive .fc .fc-button {
                        padding: 0.35rem 0.5rem !important;
                        font-size: 0.85rem !important;
                    }
                    .global-fc-responsive .fc .fc-timegrid-slot-text {
                        font-size: 0.75rem !important;
                    }
                    .global-fc-responsive .fc .fc-col-header-cell-cushion {
                        font-size: 0.85rem !important;
                        padding: 4px 0 !important;
                    }
                    .global-fc-responsive .fc .fc-event-title {
                        font-size: 0.75rem !important;
                        padding: 0 2px !important;
                    }








                    .fc-direction-ltr .fc-toolbar > * > :not(:first-child){
                        margin-left: 0rem !important;
                        margin-top: 0.1rem !important;
                    }

                      .global-fc-responsive .fc .fc-timeGridDay-button {
                        width: 100%;
                        margin-top: 0.2rem;
                    }
                    .global-fc-responsive .fc .fc-timeGridWeek-button{
                        width: 100%;
                    }
                        
                    .global-fc-responsive .fc .fc-button-group{
                        display: block;
                          width: 100%;
                    }
                    .global-fc-responsive .fc .fc-today-button{
                        width: 100%;
                        margin-top: 0.2rem;
                    }
                }
            `}</style>
        </div>
    );
}
