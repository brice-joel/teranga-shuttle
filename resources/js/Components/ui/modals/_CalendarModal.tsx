// resources/js/Components/ui/modals/CalendarModal.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { X } from "lucide-react";
import { toast } from "sonner";
import { isDateInPast } from "@/Utils/formatters";
import { Booking } from "@/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: string) => void;
    bookings: Booking[];
}

export default function _CalendarModal({
    isOpen,
    onClose,
    onSelect,
    bookings = [],
}: Props) {
    if (!isOpen) return null;

    const handleDateSelect = (info: any) => {
        const selectedDate = new Date(info.dateStr);

        if (isDateInPast(selectedDate)) {
            toast.error("Veuillez choisir une date et une heure futures.");
            return;
        }

        onSelect(info.dateStr);
        onClose();
        toast.success("Date sélectionnée avec succès !");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <h3 className="text-xl font-bold text-slate-900">
                        Choisir votre créneau
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
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
                        allDaySlot={false}
                        slotMinTime="06:00:00"
                        slotMaxTime="23:00:00"
                        dateClick={handleDateSelect}
                        height="auto"
                        slotDuration="00:30:00"
                        nowIndicator={true}
                    />
                </div>
            </div>
        </div>
    );
}
