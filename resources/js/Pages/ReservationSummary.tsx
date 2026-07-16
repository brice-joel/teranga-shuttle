import { useForm } from "@inertiajs/react";

export default function ReservationSummary() {
    let vehicle = {
        id: 1,
        name: "Mercedes Classe C",
        daily_rate: 3333.33,
    };
    const { post, processing } = useForm({
        vehicle_id: vehicle.id,
        vehicle_name: vehicle.name,
        total_price: vehicle.daily_rate * 3, // Exemple pour 3 jours
    });

    const handlePayment = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post(route("payment.checkout"));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold">{vehicle.name}</h2>
            <p className="mt-2 text-gray-600">
                Total : {vehicle.daily_rate * 3} €
            </p>

            <button
                onClick={handlePayment}
                disabled={processing}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? "Chargement..." : "Payer par Carte"}
            </button>
        </div>
    );
}
