import { Link } from "@mui/material";
import { MdOutlineRoute, MdArrowRightAlt } from "react-icons/md";
import { formatPrice } from "../utils/Utils";
import { motion } from "framer-motion";

const cardVariants = {
    hover: {
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
        transition: {
            duration: 0.3,
        },
    },
};

export default function TrajetCard({ trajet }) {
    const hasDeparture = trajet.departure && trajet.departure.trim() !== "";

    return (
        <motion.div
            className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 transform"
            variants={cardVariants}
            whileHover="hover"
        >
            <div className="flex items-center text-[#B58E2F] mb-4">
                <MdOutlineRoute className="text-3xl" />
                <div className="flex items-center text-xl font-bold text-gray-800 dark:text-white ml-2">
                    {hasDeparture && (
                        <>
                            <span>{trajet.departure}</span>
                            <MdArrowRightAlt className="text-2xl text-gray-400 dark:text-gray-600 mx-3" />
                        </>
                    )}
                    <span className={!hasDeparture ? "ml-0" : ""}>
                        {trajet.destination}
                    </span>
                </div>
            </div>
            <div className="mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    à partir de
                </span>
                <p className="text-3xl font-extrabold text-[#B58E2F] leading-tight mt-1">
                    {formatPrice(trajet.price)}
                </p>
            </div>
            <Link
                href={route("service.show", trajet.id)}
                className="inline-block w-full text-center font-semibold rounded-full py-3 px-6 transition-colors mt-4"
                sx={{
                    backgroundColor: "#B58E2F",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#A47E29",
                    },
                }}
            >
                Découvrir le trajet
            </Link>
        </motion.div>
    );
}
