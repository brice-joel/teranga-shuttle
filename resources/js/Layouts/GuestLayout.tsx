import ApplicationLogo from "@/Components/ApplicationLogo";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function Guest({ children }: PropsWithChildren) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 relative overflow-hidden">
            {/* Effet de lumière premium en arrière-plan */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center">
                <Link href="/" className="mb-8 group">
                    <ApplicationLogo className="h-16 w-auto text-slate-900 transition-transform duration-300 group-hover:scale-105" />
                </Link>

                <div className="w-full sm:max-w-md bg-white px-8 py-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem]">
                    {children}
                </div>
            </div>

            <Toaster position="top-right" richColors closeButton />
        </div>
    );
}
