// resources/js/types/forms.ts

export interface BookingFormData {
    type: 'course_fixed' | 'course_distance' | 'event_hourly';
    start_time: string;
    end_time?: string; // Optionnel si c'est une course fixe (calculé par le serveur)
    pickup_address: string;
    dropoff_address?: string;
    adults_count: number;
    children_count: number;
    luggage_count: number;
    trip_id?: number; // Si l'utilisateur choisit un trajet préétabli
}