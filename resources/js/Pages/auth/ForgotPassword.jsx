import React from "react";
import { useForm } from "@inertiajs/react";
import SubmitButton from "../../components/buttons/SubmitButton";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div className="mt-8 bg-gray-200 text-justify md:w-1/2 mx-auto p-4">
            <h1 className="text-xl text-center font-semibold">
                Mot de passe oublié ?
            </h1>
            <p>
                Entrez votre adresse email et nous vous enverrons un lien de
                réinitialisation.
            </p>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="">
                <div className="mt-4 ">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-end mt-4">
                    <SubmitButton
                        processing={processing}
                        textBefore="Envoyer le lien"
                        textAfter="Envoi en cours"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>
    );
}
