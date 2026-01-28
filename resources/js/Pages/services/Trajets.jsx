import React from "react";
import { Box, Typography } from "@mui/material";
import TrajetCard from "../../components/TrajetCard";
import { motion } from "framer-motion";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15,
        },
    },
};

const Trajets = ({ trajets }) => {
    if (!trajets || trajets.length === 0) {
        return (
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <Box className="container mx-auto px-4 text-center">
                    <Typography
                        variant="h5"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        Aucun trajet exclusif disponible pour le moment.
                    </Typography>
                </Box>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-10 md:mb-12 leading-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <span className="text-[#B58E2F]">Nos</span>{" "}
                    <span className="text-gray-900 dark:text-white">
                        trajets
                    </span>
                    <span className="text-[#B58E2F]"> exclusifs</span>
                </motion.h1>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {trajets.map((trajet) => (
                        <TrajetCard key={trajet.id} trajet={trajet} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Trajets;
