import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import SubmitButton from "../../components/buttons/SubmitButton";
export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("password.update"));
    };
    console.log(errors);

    return (
        <div className="bg-gray-200">
            <h1 className="mt-10 text-xl text-center font-semibold">
                Réinitialiser le mot de passe
            </h1>

            <form onSubmit={submit} className=" md:w-1/3 mx-auto p-4">
                <div className="mt-4 hidden">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-500 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("email", e.target.value)}
                        disabled
                        required
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-500 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="password_confirmation">
                        Confirmer le mot de passe
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    {errors.password_confirmation && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.password_confirmation}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-end mt-4">
                    <SubmitButton
                        processing={processing}
                        textBefore="Réinitialiser le mot de passe"
                        textAfter="Réinitialisation"
                        className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>
    );
}
