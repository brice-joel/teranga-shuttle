import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { CheckCircle, Clock, PhoneCall, ArrowRight } from "lucide-react";
import { Booking } from "@/types";
import { formatDate } from "@/Utils/formatters";

interface Props {
    booking: Booking;
}
export default function Confirmation({ booking }: Props) {
    return (
        <UserLayout>
            <Head title="Réservation reçue" />

            <section className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl w-full text-center space-y-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 animate-pulse"></div>
                        <CheckCircle
                            className="w-24 h-24 text-amber-500 relative mx-auto"
                            strokeWidth={1}
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
                            Demande{" "}
                            <span className="text-amber-500">Reçue !</span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
                            Votre réservation pour le{" "}
                            <span className="text-slate-900 font-bold">
                                {formatDate(booking.start_time)}
                            </span>{" "}
                            est en cours d'examen par notre équipe technique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <Clock className="w-8 h-8 text-amber-500 mb-4" />
                            <h4 className="font-black uppercase text-xs tracking-widest mb-2">
                                Prochaine étape
                            </h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Un chauffeur va valider la disponibilité. Dès
                                validation, vous recevrez un lien pour finaliser
                                votre paiement sécurisé.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                            <PhoneCall className="w-8 h-8 text-amber-500 mb-4" />
                            <h4 className="font-black uppercase text-xs tracking-widest mb-2 text-slate-400">
                                Besoin d'aide ?
                            </h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Notre équipe peut vous contacter par téléphone
                                d'ici quelques minutes pour confirmer les
                                détails de votre prise en charge.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            href="/"
                            className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-amber-500 transition-colors"
                        >
                            Retour à l'accueil
                        </Link>
                        <Link
                            href={route("booking.index")} // Ou la page "Mes réservations"
                            className="bg-amber-500 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-amber-500/20 hover:bg-white transition-all group"
                        >
                            Suivre ma réservation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
