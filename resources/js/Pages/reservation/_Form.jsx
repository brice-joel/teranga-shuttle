// resources/js/Pages/Reservation/Form.jsx

import { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

import CalendarReservation from "../../components/calendar/CalendarReservation"; // Assurez-vous du chemin correct

import {
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogContent,
} from "@mui/material";

import {
    Phone as PhoneIcon,
    Luggage as LuggageIcon,
    Group as PeopleIcon,
    Event as DateIcon,
    AccessTime as TimeIcon,
    Comment as CommentIcon,
    CheckCircle as CheckIcon,
    CalendarMonth as CalendarIcon,
    Close as CloseIcon,
    LocalTaxi as ServiceIcon,
    ArrowForward as ArrowIcon,
    AttachMoney as PriceIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// ... (vos variantes Framer Motion : sectionVariants, titleVariants, cardVariants, inputVariants) ...
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const ReservationForm = ({ service, oldData = {} }) => {
    const { auth } = usePage().props;
    const phoneNumber = auth.user ? auth.user.phone : oldData.phone || "";

    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({
        phone: phoneNumber,
        luggage: oldData.luggage || "non",
        suitcase: oldData.suitcase || "1",
        places: oldData.places || "1",
        start_date: oldData.start_date || "",
        start_hour: oldData.start_hour || "",
        comment: oldData.comment || "",
        _service_id: service ? service.id : null,
    });

    const [showSuitcaseContainer, setShowSuitcaseContainer] = useState(
        data.luggage === "oui"
    );
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture/fermeture de la modale

    useEffect(() => {
        if (auth.user && auth.user.phone) {
            setData("phone", auth.user.phone);
        }
        if (service && service.id !== data._service_id) {
            setData("_service_id", service.id);
        }
    }, [auth.user, service, setData]);

    useEffect(() => {
        if (recentlySuccessful) {
            reset(
                "luggage",
                "suitcase",
                "places",
                "start_date",
                "start_hour",
                "comment"
            );
            if (!auth.user) {
                setData("phone", "");
            }
        }
    }, [recentlySuccessful, reset, setData, auth.user]); // Ajout des dépendances manquantes

    const handleLuggageChange = (e) => {
        const value = e.target.value;
        setData("luggage", value);
        setShowSuitcaseContainer(value === "oui");
        if (value === "non") {
            setData("suitcase", "0");
        }
    };
    const handlePlacesChange = (e) => {
        e.target.value >= 3
            ? setCurrentPrice(service.price * 2)
            : setCurrentPrice(service.price);
        setData("places", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données envoyées:", data);
        !auth.user
            ? toast.error("Veuillez vous connecter pour faire une reservation")
            : post(route("reservation.store"), {
                  onError: (formErrors) => {
                      const message = Object.values(formErrors)
                          .flat()
                          .join("\n");
                      toast.error(
                          `Erreur lors de la réservation : ${message}`,
                          {
                              position: "bottom-left",
                          }
                      );
                      console.log(formErrors);
                  },
                  onSuccess: () => {
                      // Le toast est déjà géré par useEffect si recentlySuccessful
                  },
                  preserveScroll: true,
                  preserveState: true,
              });
        console.log(data);
    };

    const generateHourOptions = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = String(i).padStart(2, "0");
                const minute = String(j).padStart(2, "0");
                hours.push(`${hour}:${minute}`);
            }
        }
        return hours;
    };

    const [currentPrice, setCurrentPrice] = useState(service.price);

    // *** NOUVEAU : Fonction pour gérer la sélection de date/heure du calendrier ***
    const handleCalendarDateSelect = (selectedDateTime) => {
        // Convertir l'objet Date en formats "YYYY-MM-DD" et "HH:MM"
        const year = selectedDateTime.getFullYear();
        const month = String(selectedDateTime.getMonth() + 1).padStart(2, "0"); // Mois est 0-indexé
        const day = String(selectedDateTime.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

        const hours = String(selectedDateTime.getHours()).padStart(2, "0");
        const minutes = String(selectedDateTime.getMinutes()).padStart(2, "0");
        const timeString = `${hours}:${minutes}`;

        // Mettre à jour l'état du formulaire avec les valeurs sélectionnées
        setData((prevData) => ({
            ...prevData,
            start_date: dateString,
            start_hour: timeString,
        }));

        // Fermer la modale du calendrier
        setIsModalOpen(false);

        // Optionnel : un toast pour confirmer que les champs ont été mis à jour
        toast.info(
            `Date et heure sélectionnées : ${dateString} à ${timeString}`,
            {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        );
    };

    return (
        <>
            <section className="bg-gradient-to-br from-teranga-cream to-teranga-light-gray py-16 md:py-24 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        sx={{
                            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                        }}
                    >
                        <motion.div
                            className="text-center mb-8"
                            variants={titleVariants}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    color: "text-teranga-dark",
                                    fontSize: "1em",
                                    fontWeight: "bold",
                                    mb: 2,
                                }}
                            >
                                Réservation de Trajet
                            </Typography>
                            <Typography
                                variant="body1"
                                className="text-teranga-medium-gray"
                            >
                                Veuillez remplir les détails de votre
                                réservation pour{" "}
                                {service?.type === "Location"
                                    ? "une location"
                                    : "un trajet"}
                                .
                            </Typography>
                        </motion.div>

                        {/* Service Summary Section */}
                        <motion.div
                            className="mb-8 p-6 bg-teranga-cream/50 border-l-4 border-teranga-gold rounded-lg flex items-center justify-between flex-wrap gap-4"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Typography
                                variant="h5"
                                className="font-semibold text-teranga-dark flex items-center"
                            >
                                <ServiceIcon
                                    sx={{ mr: 2, color: "teranga-gold" }}
                                />
                                {service?.type === "Location" ? (
                                    <>
                                        Location :{" "}
                                        <span className="font-bold uppercase ml-2">
                                            Véhicule
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className=" uppercase ml-1 text-sm">
                                            {service?.departure}
                                        </span>
                                        <ArrowIcon
                                            sx={{
                                                mx: 1,
                                                fontSize: "1.2rem",
                                                verticalAlign: "middle",
                                            }}
                                        />
                                        <span className="text-sm uppercase">
                                            {service?.destination}
                                        </span>
                                    </>
                                )}
                            </Typography>
                            <Typography
                                variant="h4"
                                className="font-extrabold text-teranga-gold flex items-center"
                            >
                                {typeof currentPrice === "number"
                                    ? currentPrice.toLocaleString("fr-FR")
                                    : currentPrice}
                                FCFA
                            </Typography>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Hidden service ID */}
                            <input
                                type="hidden"
                                name="_service_id"
                                value={data._service_id || ""}
                            />

                            {/* Téléphone (Pré-rempli et désactivé) */}
                            <motion.div variants={inputVariants}>
                                <TextField
                                    fullWidth
                                    label="Téléphone"
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    sx={{ display: "none" }}
                                    placeholder="Ex: +221 77 123 45 67"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    disabled={!!auth.user}
                                    required
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon
                                                    sx={{
                                                        color: "teranga-medium-gray",
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: "0.75rem",
                                            padding: "0.25rem",
                                        },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </motion.div>

                            {/* Bagages & Passagers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={inputVariants}>
                                    <FormControl
                                        fullWidth
                                        error={!!errors.luggage}
                                    >
                                        <InputLabel id="luggage-label">
                                            Bagages
                                        </InputLabel>
                                        <Select
                                            labelId="luggage-label"
                                            id="luggage"
                                            name="luggage"
                                            value={data.luggage}
                                            label="Bagages"
                                            onChange={handleLuggageChange}
                                            required
                                            sx={{ borderRadius: "0.75rem" }}
                                        >
                                            <MenuItem value="non">Non</MenuItem>
                                            <MenuItem value="oui">Oui</MenuItem>
                                        </Select>
                                        {errors.luggage && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
                                                {errors.luggage}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </motion.div>

                                {showSuitcaseContainer && (
                                    <motion.div variants={inputVariants}>
                                        <FormControl
                                            fullWidth
                                            error={!!errors.suitcase}
                                        >
                                            <InputLabel id="suitcase-label">
                                                Nombre de valises
                                            </InputLabel>
                                            <Select
                                                labelId="suitcase-label"
                                                id="suitcase"
                                                name="suitcase"
                                                value={data.suitcase}
                                                label="Nombre de valises"
                                                onChange={(e) =>
                                                    setData(
                                                        "suitcase",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ borderRadius: "0.75rem" }}
                                            >
                                                {[...Array(6)].map((_, i) => (
                                                    <MenuItem
                                                        key={i + 1}
                                                        value={i + 1}
                                                    >
                                                        {i + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.suitcase && (
                                                <Typography
                                                    color="error"
                                                    variant="caption"
                                                >
                                                    {errors.suitcase}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </motion.div>
                                )}

                                <motion.div variants={inputVariants}>
                                    <FormControl
                                        fullWidth
                                        error={!!errors.places}
                                    >
                                        <InputLabel id="places-label">
                                            Nombre de Passagers
                                        </InputLabel>
                                        <Select
                                            labelId="places-label"
                                            id="places"
                                            name="places"
                                            value={data.places}
                                            onChange={handlePlacesChange}
                                            label="Nombre de Passagers"
                                            required
                                            sx={{ borderRadius: "0.75rem" }}
                                        >
                                            {[...Array(8)].map((_, i) => (
                                                <MenuItem
                                                    key={i + 1}
                                                    value={i + 1}
                                                >
                                                    {i + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.places && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
                                                {errors.places}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </motion.div>
                            </div>

                            {/* Date et Heure */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={inputVariants}>
                                    <div className="grid grid-cols-2 gap-5">
                                        <TextField
                                            fullWidth
                                            label="Date de Réservation"
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            error={!!errors.start_date}
                                            helperText={errors.start_date}
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DateIcon
                                                            sx={{
                                                                color: "teranga-medium-gray",
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    borderRadius: "0.75rem",
                                                    padding: "0.25rem",
                                                },
                                            }}
                                        />
                                        <FormControl
                                            fullWidth
                                            error={!!errors.start_hour}
                                        >
                                            <InputLabel id="start_hour-label">
                                                Heure de Réservation
                                            </InputLabel>
                                            <Select
                                                labelId="start_hour-label"
                                                id="start_hour"
                                                name="start_hour"
                                                value={data.start_hour}
                                                label="Heure de Réservation"
                                                onChange={(e) =>
                                                    setData(
                                                        "start_hour",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                sx={{ borderRadius: "0.75rem" }}
                                            >
                                                <MenuItem value="">
                                                    -- Sélectionner l'heure --
                                                </MenuItem>
                                                {generateHourOptions().map(
                                                    (hour) => (
                                                        <MenuItem
                                                            key={hour}
                                                            value={hour}
                                                        >
                                                            {hour}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                            {errors.start_hour && (
                                                <Typography
                                                    color="error"
                                                    variant="caption"
                                                >
                                                    {errors.start_hour}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </div>
                                </motion.div>

                                {/* Durée du service (Lecture seule) */}
                                <motion.div variants={inputVariants}>
                                    <TextField
                                        fullWidth
                                        label="Durée (en minutes)"
                                        id="duration"
                                        value={
                                            service?.duration
                                                ? `${service.duration} min`
                                                : "N/A"
                                        }
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <TimeIcon
                                                        sx={{
                                                            color: "teranga-medium-gray",
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                borderRadius: "0.75rem",
                                                padding: "0.25rem",
                                            },
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </motion.div>
                            </div>

                            {/* Bouton Voir Disponibilité */}
                            <motion.div variants={inputVariants}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => setIsModalOpen(true)}
                                    startIcon={<CalendarIcon />}
                                    sx={{
                                        borderColor: "teranga-medium-gray",
                                        color: "teranga-medium-gray",
                                        "&:hover": {
                                            backgroundColor:
                                                "teranga-light-gray",
                                            borderColor: "teranga-dark",
                                            color: "teranga-dark",
                                        },
                                        borderRadius: "0.75rem",
                                        paddingY: "0.75rem",
                                        fontSize: "1rem",
                                        fontWeight: "medium",
                                        textTransform: "none",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                >
                                    Voir la disponibilité
                                </Button>
                            </motion.div>

                            {/* Commentaire */}
                            <motion.div variants={inputVariants}>
                                <TextField
                                    fullWidth
                                    label="Commentaire"
                                    id="comment"
                                    name="comment"
                                    multiline
                                    rows={4}
                                    placeholder="Ajouter un commentaire ou des requêtes spéciales..."
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    error={!!errors.comment}
                                    helperText={errors.comment}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{
                                                    alignSelf: "flex-start",
                                                    mt: 1,
                                                }}
                                            >
                                                <CommentIcon
                                                    sx={{
                                                        color: "teranga-medium-gray",
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: "0.75rem",
                                            padding: "0.25rem",
                                        },
                                    }}
                                />
                            </motion.div>

                            {/* Bouton Réserver */}
                            <motion.div variants={inputVariants}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    startIcon={
                                        processing ? (
                                            <CircularProgress
                                                size={20}
                                                color="inherit"
                                            />
                                        ) : (
                                            <CheckIcon />
                                        )
                                    }
                                    disabled={processing}
                                    sx={{
                                        backgroundColor: "teranga-gold",
                                        color: "teranga-dark",
                                        "&:hover": {
                                            backgroundColor: "#B58E2F",
                                            boxShadow:
                                                "0px 6px 12px rgba(212, 175, 55, 0.4)",
                                        },
                                        borderRadius: "0.75rem",
                                        paddingY: "1rem",
                                        fontSize: "1.25rem",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        boxShadow: "none",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                >
                                    {processing
                                        ? "Réservation en cours..."
                                        : "Confirmer la Réservation"}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>

                {/* Modal de disponibilité */}
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: "1.5rem",
                            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                            border: "1px solid #E0E0E0",
                            overflow: "hidden",
                        },
                    }}
                >
                    <DialogContent
                        sx={{ p: { xs: 2, sm: 4 }, minHeight: "400px" }}
                    >
                        {/* Passer la fonction onDateSelect au composant CalendarReservation */}
                        <CalendarReservation
                            onDateSelect={handleCalendarDateSelect}
                        />
                    </DialogContent>
                </Dialog>
            </section>
        </>
    );
};

export default ReservationForm;
