import { useState } from "react";
import {
    Modal,
    Button,
    Backdrop,
    Fade,
    Box,
    Typography,
    Link,
} from "@mui/material";
import DoorbellSharpIcon from "@mui/icons-material/DoorbellSharp";
const ChoiceReservationModalButton = ({ className }) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            {/* Bouton pour ouvrir la modale */}
            <div className={className}>
                {" "}
                <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    sx={{
                        backgroundColor: "gray",
                        "&:hover": {
                            backgroundColor: "#D4AF37", // Rouge plus foncé au survol
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(244, 67, 54, 0.4)",
                        },

                        borderRadius: "12px", // rounded-xl
                        paddingX: "1em",
                        paddingY: "0.5em", // px-6 py-3 devenu px-8 py-4
                        fontSize: "1em", // text-lg
                        textTransform: "none",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0 4px 10px rgba(244, 67, 54, 0.2)",
                    }}
                    startIcon={<DoorbellSharpIcon />}
                >
                    Réserver
                </Button>
            </div>

            {/* Modale de confirmation de suppression */}
            <Modal
                aria-labelledby="delete-account-modal-title"
                aria-describedby="delete-account-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 text-center w-full max-w-md"
                        sx={{
                            border: "1px solid #E0E0E0",
                            outline: "none",
                            boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                        }}
                    >
                        <Typography
                            id="choice-reservation-modal-title"
                            variant="h6"
                            component="h2"
                            className="mb-4 text-teranga-dark"
                        >
                            Réservation pour
                        </Typography>
                        <Box className="flex justify-center gap-4 mt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href={route("services.trajets")}
                                    onClick={() => setOpenModal(false)}
                                    className="px-8 py-4  bg-color-900 text-gray-900 rounded-xl hover:bg-color-800  transition duration-300 ease-in-out "
                                >
                                    <span className="mx-1"> Un Trajet</span>
                                </Link>
                                <Link
                                    href={route("services.locations")}
                                    onClick={() => setOpenModal(false)}
                                    className="px-8 py-4 bg-color-900 text-gray-900 rounded-xl hover:bg-color-800  transition duration-300 ease-in-out "
                                >
                                    <span className="mx-1"> Une course</span>
                                </Link>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ChoiceReservationModalButton;
