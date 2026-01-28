// resources/js/Pages/Auth/Register.jsx

import React, { useEffect, useRef } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { toast } from "react-toastify";
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    CircularProgress,
} from "@mui/material";
// Importation des icônes pour les champs
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Variantes Framer Motion
const formVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function Register() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: "",
        phone_code: "+221",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        "g-recaptcha-response": "",
        terms: false,
    });

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const recaptchaRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.grecaptcha && recaptchaRef.current) {
                window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: "6LdpHFErAAAAAOXzTXh3Mn4owqxyS1pidCD6mC0f",
                    callback: (response) =>
                        setData("g-recaptcha-response", response),
                    "expired-callback": () =>
                        setData("g-recaptcha-response", ""),
                });
            }
        };
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (recentlySuccessful) {
            reset();
        }
    }, [recentlySuccessful]);

    const submit = (e) => {
        e.preventDefault();

        // Ajout de la validation pour les termes d'utilisation
        if (!data.terms) {
            toast.error("Vous devez accepter les termes et conditions.", {
                position: "bottom-left",
            });
            return;
        }

        post(route("auth.do_register"), {
            onFinish: () =>
                reset(
                    "password",
                    "password_confirmation",
                    "g-recaptcha-response"
                ),
            onError: (formErrors) => {
                const message = Object.values(formErrors).flat().join("\n");
                toast.error(`Erreur lors de l'inscription : ${message}`, {
                    position: "bottom-left",
                });
                if (
                    window.grecaptcha &&
                    typeof window.grecaptcha.reset === "function"
                ) {
                    window.grecaptcha.reset();
                }
            },
        });
    };

    return (
        <>
            <Head title="Créer un compte" />
            <section className="py-16 bg-gray-100 ">
                <div className="container mx-auto px-4">
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={formVariants}
                        className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8  "
                    >
                        <form onSubmit={submit} className="space-y-6">
                            <motion.h5
                                variants={itemVariants}
                                className="text-2xl font-semibold text-gray-900  text-center mb-6"
                            >
                                Créer votre compte
                            </motion.h5>

                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Prénom Nom"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem",
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography className="block mb-2 text-sm font-medium text-gray-900"></Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        color: "red",
                                    }}
                                >
                                    <FormControl
                                        sx={{ minWidth: 100 }}
                                        error={!!errors.phone_code}
                                    >
                                        <InputLabel id="phone_code-label">
                                            Code
                                        </InputLabel>
                                        <Select
                                            labelId="phone_code-label"
                                            id="phone_code"
                                            name="phone_code"
                                            value={data.phone_code}
                                            label="Code"
                                            onChange={(e) =>
                                                setData(
                                                    "phone_code",
                                                    e.target.value
                                                )
                                            }
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "0.75rem",
                                                },
                                            }}
                                        >
                                            {/* Liste simplifiée de codes de pays */}
                                            <MenuItem value="+221">
                                                Sénégal (+221)
                                            </MenuItem>
                                            <MenuItem value="+229">
                                                Bénin (+229)
                                            </MenuItem>
                                            <MenuItem value="+237">
                                                Cameroun (+237)
                                            </MenuItem>
                                        </Select>
                                        {errors.phone_code && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                            >
                                                {errors.phone_code}
                                            </Typography>
                                        )}
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        label="Numéro de téléphone"
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        required
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhoneOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0.75rem",
                                            },
                                        }}
                                    />
                                </Box>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="E-mail"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nom@gmail.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem",
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="Mot de passe"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem",
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    label="Confirmer le mot de passe"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="••••••••"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0.75rem",
                                        },
                                    }}
                                />
                            </motion.div>

                            {/* reCAPTCHA a été déplacé avant le bouton pour une meilleure visibilité */}
                            <motion.div variants={itemVariants}>
                                <div
                                    ref={recaptchaRef}
                                    className="g-recaptcha"
                                ></div>
                                {errors["g-recaptcha-response"] && (
                                    <Typography
                                        color="error"
                                        variant="caption"
                                        className="mt-1"
                                    >
                                        {errors["g-recaptcha-response"]}
                                    </Typography>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-start justify-between"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="terms-checkbox"
                                            checked={data.terms}
                                            onChange={(e) =>
                                                setData(
                                                    "terms",
                                                    e.target.checked
                                                )
                                            }
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 20,
                                                },
                                                color: "#B58E2F", // Couleur Teranga
                                                "&.Mui-checked": {
                                                    color: "#B58E2F",
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            className="text-sm font-medium text-gray-900 "
                                        >
                                            J'accepte les{" "}
                                            <Link
                                                href={route(
                                                    "terms-and-conditions"
                                                )}
                                                className="text-blue-600 hover:underline"
                                            >
                                                termes et conditions
                                                d'utilisation
                                            </Link>
                                            .
                                        </Typography>
                                    }
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={processing}
                                    sx={{
                                        backgroundColor: "#B58E2F", // Couleur Teranga
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#A47E29",
                                        },
                                        borderRadius: "0.75rem",
                                        paddingY: "0.75rem",
                                        fontSize: "1rem",
                                        fontWeight: "semibold",
                                        textTransform: "none",
                                        boxShadow: "none",
                                        transition: "all 0.3s ease-in-out",
                                        "&:disabled": { opacity: 0.7 },
                                    }}
                                >
                                    {processing ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Créer votre compte"
                                    )}
                                </Button>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="text-sm font-medium text-gray-500 text-center"
                            >
                                Vous avez déjà un compte ?{" "}
                                <Link
                                    href={route("auth.login")}
                                    className="text-blue-700 text-sm hover:underline"
                                >
                                    Connectez-vous à votre compte
                                </Link>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
