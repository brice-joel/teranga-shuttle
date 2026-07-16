import React, { useState, PropsWithChildren, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { toast, Toaster } from "sonner";
import {
    LayoutDashboard,
    CalendarDays,
    LogOut,
    Menu,
    X,
    Car,
    RoadIcon,
    Wallet,
} from "lucide-react";
import { PageProps } from "@/types";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { auth, flash } = usePage<PageProps>().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const navigation = [
        {
            name: "Dashboard",
            href: route("admin.index"),
            icon: LayoutDashboard,
        },
        {
            name: "Réservations",
            href: route("admin.booking.index"),
            icon: CalendarDays,
        },
        { name: "Trajets", href: route("admin.trips.index"), icon: RoadIcon },
        { name: "Paiements", href: route("admin.payment.index"), icon: Wallet },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Backdrop mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <Link href="/" className="flex items-center gap-2">
                            <Car className="text-amber-500 w-7 h-7" />
                            <span className="text-lg font-black tracking-tight uppercase">
                                Teranga
                            </span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navigation.map((item) => {
                            const active = route().current(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                        active
                                            ? "bg-amber-500 text-slate-900"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <Link
                            href={route("admin.auth.logout")}
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-4 py-2 text-slate-400 hover:text-red-400 text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Déconnexion
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-900">
                                {auth.user.name}
                            </p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                {auth.user.email}
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-sm">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>

            <Toaster position="top-right" richColors closeButton />
        </div>
    );
}
