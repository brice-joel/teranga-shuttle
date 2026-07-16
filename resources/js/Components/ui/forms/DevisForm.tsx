// resources/js/Components/DevisForm.tsx
import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import {
    MapPin,
    Calendar,
    Users,
    Briefcase,
    FileText,
    LayoutGrid,
} from "lucide-react";
import StepperInput from "@/Components/ui/forms/StepperInput";

interface DevisFormProps {
    queryParams: Record<string, string>;
}

export default function DevisForm({ queryParams }: DevisFormProps) {
    const { auth } = usePage().props as any;
    console.log("auth", auth);

    // Initialisation du formulaire avec priorités : URL params -> Auth User -> Valeurs par défaut
    const { data, setData, post, processing, errors, transform } = useForm({
        user_name: queryParams.user_name || auth.user?.name || "",
        user_email: queryParams.user_email || auth.user?.email || "",
        pickup_address:
            queryParams.pickup_address || queryParams.pickup_address || "",
        dropoff_address:
            queryParams.dropoff_address || queryParams.dropoff_address || "",
        type: (queryParams.type || "course_fixed") as
            | "course_fixed"
            | "event_hourly",
        start_time: queryParams.start_time || queryParams.start_time || "",
        adults_count: queryParams.adults_count
            ? parseInt(queryParams.adults_count)
            : 1,
        large_luggage_count: 0,
        small_luggage_count: 0,
        luggage_count: queryParams.luggage_count
            ? parseInt(queryParams.luggage_count)
            : 0,
        notes: queryParams.notes || "",
    });

    // Si le type passe à 'event_hourly', on vide le champ destination automatiquement
    useEffect(() => {
        if (data.type === "event_hourly") {
            setData("dropoff_address", "");
        }
    }, [data.type]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            luggage_count: data.large_luggage_count + data.small_luggage_count,
            notes: data.notes + `\n\n[Bagages : ${data.large_luggage_count} grandes (23kg), ${data.small_luggage_count} petites]`,
        }));
        post(route("devis.store"));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
        >
            {/* Section Client */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-6">
                <div>
                    <InputLabel
                        htmlFor="user_name"
                        value="Votre Nom "
                        className="font-semibold text-slate-700"
                    />
                    <TextInput
                        id="user_name"
                        type="text"
                        value={data.user_name}
                        onChange={(e) => setData("user_name", e.target.value)}
                        className="mt-1 block w-full bg-slate-50 border-slate-200 focus:bg-white"
                        disabled={!!auth.user} // Bloqué si l'utilisateur est connecté
                        placeholder="Votre Nom"
                    />
                    <InputError message={errors.user_name} className="mt-1" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="user_email"
                        value="Adresse Email"
                        className="font-semibold text-slate-700"
                    />
                    <TextInput
                        id="user_email"
                        type="email"
                        value={data.user_email}
                        onChange={(e) => setData("user_email", e.target.value)}
                        className="mt-1 block w-full bg-slate-50 border-slate-200 focus:bg-white"
                        disabled={!!auth.user}
                        placeholder="votre adresse mail"
                    />
                    <InputError message={errors.user_email} className="mt-1" />
                </div>
            </div>

            {/* Type de Réservation */}
            <div>
                <InputLabel
                    htmlFor="type"
                    value="Type de prestation"
                    className="font-semibold text-slate-700 mb-2"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        { id: "course_fixed", label: "Course Forfaitaire" },

                        {
                            id: "event_hourly",
                            label: "Location Horaire",
                        },
                    ].map((item) => (
                        <label
                            key={item.id}
                            className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all font-bold text-sm ${
                                data.type === item.id
                                    ? "border-amber-500 bg-amber-50/50 text-slate-900 shadow-sm"
                                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
                            }`}
                        >
                            <input
                                type="radio"
                                name="type"
                                value={item.id}
                                checked={data.type === item.id}
                                onChange={() => setData("type", item.id as any)}
                                className="sr-only"
                            />
                            {item.label}
                        </label>
                    ))}
                </div>
                <InputError message={errors.type} className="mt-1" />
            </div>

            {/* Adresses Départ / Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel
                        htmlFor="pickup_address"
                        value="Lieu de départ"
                        className="font-semibold text-slate-700"
                    />
                    <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <TextInput
                            id="pickup_address"
                            type="text"
                            value={data.pickup_address}
                            onChange={(e) =>
                                setData("pickup_address", e.target.value)
                            }
                            className="pl-11 block w-full border-slate-200"
                            placeholder="Ex: Aéroport Blaise Diagne (AIBD)"
                        />
                    </div>
                    <InputError
                        message={errors.pickup_address}
                        className="mt-1"
                    />
                </div>

                {/* Conditionnel : Masqué si Location Horaire */}
                {data.type !== "event_hourly" && (
                    <div>
                        <InputLabel
                            htmlFor="dropoff_address"
                            value="Lieu de destination"
                            className="font-semibold text-slate-700"
                        />
                        <div className="relative mt-1">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                            <TextInput
                                id="dropoff_address"
                                type="text"
                                value={data.dropoff_address}
                                onChange={(e) =>
                                    setData("dropoff_address", e.target.value)
                                }
                                className="pl-11 block w-full border-slate-200"
                                placeholder="Ex: Hôtel Terrou-Bi, Dakar"
                            />
                        </div>
                        <InputError
                            message={errors.dropoff_address}
                            className="mt-1"
                        />
                    </div>
                )}
            </div>

            {/* Date, Passagers, Bagages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <InputLabel
                        htmlFor="start_time"
                        value="Date & Heure de départ"
                        className="font-semibold text-slate-700"
                    />
                    <div className="relative mt-1">
                        <TextInput
                            id="start_time"
                            type="datetime-local"
                            value={data.start_time}
                            onChange={(e) =>
                                setData("start_time", e.target.value)
                            }
                            className=" block w-full border-slate-200"
                            required
                        />
                    </div>
                    <InputError message={errors.start_time} className="mt-1" />
                </div>

                <div>
                    <InputLabel
                        value="Nombre de personnes"
                        className="font-semibold text-slate-700 mb-2"
                    />
                    <div className="flex items-center">
                        <StepperInput
                            value={data.adults_count}
                            onChange={(v) => setData("adults_count", v)}
                            min={1}
                            max={7}
                        />
                    </div>
                    <InputError
                        message={errors.adults_count}
                        className="mt-1"
                    />
                </div>

                <div>
                    <InputLabel
                        value="Bagages"
                        className="font-semibold text-slate-700 mb-2"
                    />
                    <div className="flex flex-col gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 font-medium">Grand (23kg max)</span>
                            <StepperInput
                                value={data.large_luggage_count}
                                onChange={(v) => setData("large_luggage_count", v)}
                                min={0}
                                max={5}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 font-medium">Petit</span>
                            <StepperInput
                                value={data.small_luggage_count}
                                onChange={(v) => setData("small_luggage_count", v)}
                                min={0}
                                max={4}
                            />
                        </div>
                    </div>
                    <InputError
                        message={errors.luggage_count}
                        className="mt-1"
                    />
                </div>
            </div>

            {/* Notes Additionnelles */}
            <div>
                <InputLabel
                    htmlFor="notes"
                    value="Instructions spéciales ou notes"
                    className="font-semibold text-slate-700"
                />
                <div className="relative mt-1">
                    <textarea
                        id="notes"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        className="block w-full rounded-lg  border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 min-h-[100px]"
                        placeholder="Ex: Besoin d'accueil personnalisé avec pancarte..."
                    />
                </div>
                <InputError message={errors.notes} className="mt-1" />
            </div>

            {/* Bouton de Soumission */}
            <div className="pt-2">
                <PrimaryButton
                    className="w-full justify-center py-3.5 bg-amber-500 text-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-500/10"
                    disabled={processing}
                >
                    {processing
                        ? "Envoi de votre demande..."
                        : "Demander mon devis gratuit"}
                </PrimaryButton>
            </div>
        </form>
    );
}
