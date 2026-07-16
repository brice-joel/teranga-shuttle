import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { X, Circle } from "lucide-react"; // Import Circle pour la légende
import { toast } from "sonner";
import { isDateInPast } from "@/Utils/formatters";
import { Booking } from "@/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: string) => void;
    bookings: Booking[];
}
export default function __CalendarModal({
    isOpen,
    onClose,
    onSelect,
    bookings = [],
}: Props) {
    if (!isOpen) return null;
    console.log("bookings", bookings);

    // 1. Transformer les bookings en événements FullCalendar
    const events = useMemo(() => {
        return bookings.map((booking) => {
            // Logique de couleur
            // Vert si payé/validé, Orange si en attente, Gris si annulé
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

    const handleDateSelect = (info) => {
        const selectedDate = new Date(info.dateStr);

        if (isDateInPast(selectedDate)) {
            toast.error("Veuillez choisir une date et une heure futures.");
            return;
        }

        // Vérifier si le créneau est déjà pris (optionnel mais recommandé)
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">
                            Choisir votre créneau
                        </h3>
                        {/* 2. La Légende */}
                        <div className="flex gap-4 mt-2 text-sm">
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
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 border border-slate-300 bg-white rounded-full" />
                                <span className="text-slate-600">
                                    Disponible
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full"
                    >
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        locale={frLocale}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridWeek,timeGridDay",
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
                        // 3. Intégration des événements
                        events={events}
                        eventOverlap={false} // Empêche de sélectionner par dessus un événement
                        selectOverlap={false}
                    />
                </div>
            </div>
        </div>
    );
}
