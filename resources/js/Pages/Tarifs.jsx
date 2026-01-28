import { formatPrice } from "../utils/Utils";
import { FaCarSide } from "react-icons/fa"; // Importez une icône de voiture

const Tarifs = () => {
    const data = [
        {
            title: "Aéroport international de Dakar-Blaise Diagne (AIBD)",
            price: 50000,
        },
        { title: "Dakar Saly", price: 60000 },
        { title: "Formule AR", price: 100000 },
        { title: "Dakar Popenguine (huites de Dayana)", price: 75000 },
        { title: "Dakar Saint Louis", price: 250000 },
        { title: "Dakar Sine Saloum", price: 200000 },
    ];

    return (
        <div className="p-4 sm:p-8 md:p-12 min-h-screen bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                Nos Tarifs
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400">
                            <FaCarSide className="text-4xl" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center leading-tight">
                            {item.title}
                        </h2>
                        <p className="text-center">
                            <span className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 leading-none">
                                {formatPrice(item.price)}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tarifs;
