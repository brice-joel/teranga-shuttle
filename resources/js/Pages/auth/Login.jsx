// resources/js/Pages/Auth/Login.jsx

import React from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { useRouteContext } from "../../contexts/RouteContext";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        "g-recaptcha-response": "", // Add reCAPTCHA response field
    });
    const route = useRouteContext();

    // Handle reCAPTCHA callback
    const handleRecaptchaChange = (value) => {
        setData("g-recaptcha-response", value);
    };

    const submit = (e) => {
        e.preventDefault();

        // Ensure the reCAPTCHA script is loaded before trying to execute grecaptcha.
        // This is a basic way to ensure it exists. For more robust solutions,
        // consider a dedicated react-recaptcha package or checking window.grecaptcha.
        if (typeof grecaptcha !== "undefined" && grecaptcha.getResponse) {
            setData("g-recaptcha-response", grecaptcha.getResponse());
        }

        post(route("auth.login"), {
            onFinish: () => reset("password"),
        });
    };

    // Effect to load reCAPTCHA script
    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Render reCAPTCHA once the script is loaded
            if (typeof grecaptcha !== "undefined") {
                grecaptcha.ready(function () {
                    grecaptcha.render("recaptcha-container", {
                        sitekey: "6LdpHFErAAAAAOXzTXh3Mn4owqxyS1pidCD6mC0f", // Your site key
                        callback: handleRecaptchaChange,
                        theme: "light", // You can choose 'light' or 'dark'
                    });
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            // Clean up: remove the script if the component unmounts
            document.body.removeChild(script);
            // You might also need to explicitly reset reCAPTCHA if you plan
            // to dynamically load/unload this component frequently.
            if (typeof grecaptcha !== "undefined" && grecaptcha.reset) {
                // grecaptcha.reset(); // Consider if necessary for your specific use case
            }
        };
    }, []);

    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <Head title="Connexion" />

            <div className="container mx-auto px-4">
                <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:border dark:border-gray-700">
                    <form className="space-y-6" onSubmit={submit}>
                        <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
                            Connectez-vous
                        </h5>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="nom@gmail.com"
                                required
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* reCAPTCHA container */}
                        <div id="recaptcha-container"></div>
                        {errors["g-recaptcha-response"] && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors["g-recaptcha-response"]}
                            </span>
                        )}

                        <div className="flex items-start justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Se souvenir de moi
                                </label>
                            </div>
                            <Link
                                href={route("password.request")}
                                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm py-3 transition-colors"
                            disabled={processing}
                        >
                            Se connecter
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                            Vous n'avez pas de compte ?{" "}
                            <Link
                                href={route("auth.register")}
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Créer un compte
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
