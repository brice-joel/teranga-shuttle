import { Config } from "ziggy-js";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };

    auth: {
        user: User;
    };
    // Tu pourras ajouter ici des flash messages globaux
    flash: {
        success: string | null;
        error: string | null;
    };
};

export interface Trip {
    id: number;
    departure_city: string;
    arrival_city: string;
    fixed_price: number;
    estimated_duration_minutes: number;
    is_active: boolean;
}

export interface PricingRule {
    id: number;
    key: string;
    value: number;
    description?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    email_verified_at?: string;
}
export type BookingStatus =
    | "pending"
    | "validated"
    | "paid"
    | "cancelled"
    | "finished";
export type BookingType = "course_fixed" | "course_distance" | "event_hourly";

export interface Booking {
    id: number;
    user_id: number;
    user?: User; // Chargé via les relations Laravel
    trip_id: number | null;
    type: BookingType;
    status: BookingStatus;
    start_time: string; // Format ISO string
    end_time: string;
    pickup_address: string;
    dropoff_address?: string;
    adults_count: number;
    children_count: number;
    luggage_count: number;
    total_amount: number;
    notes?: string;
    stripe_session_id?: string;
    created_at: string;
}
export type PaymentStatus = "success";
export interface Payment {
    id: number;
    booking_id: number;
    stripe_session_id: string;
    amount: number;
    status: PaymentStatus;
    created_at: string;
    updated_at: string;

    booking?: Booking; // Chargé via les relations Laravel
    user?: User; // Chargé via les relations Laravel
}
interface DataPaymentProps {
    total_amount: number;
    booking_id: number;
    token: string;
}
