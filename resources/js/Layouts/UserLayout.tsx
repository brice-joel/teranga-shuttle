// resources/js/Layouts/UserLayout.tsx
import React, { useState, useEffect, PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    Car,
    Phone,
    Mail,
    LogOut,
    MessageCircle,
    FileText,
    Home,
    Map,
    Briefcase,
    Calendar,
    Compass,
    User,
    ArrowUpRight,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { PageProps } from "@/types";

interface Props extends PropsWithChildren {
    transparent?: boolean;
}

export default function UserLayout({ children, transparent = false }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isFabOpen, setIsFabOpen] = useState(false);

    const { auth } = usePage().props as any;
    const { url } = usePage();

    // Gestion du scroll dynamique
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Accueil", href: route("home"), icon: Home },
        { name: "Nos Trajets", href: route("trips"), icon: Map },
        { name: "Services", href: route("services"), icon: Briefcase },
        { name: "Événements", href: route("events"), icon: Calendar },
        { name: "Contact", href: route("contact"), icon: Compass },
    ];

    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    // Vérifie si un lien est actif pour l'UI active
    const isActive = (href: string) => url === new URL(href).pathname;

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col antialiased text-slate-900 font-sans">
            {/* ─── NAVBAR / HEADER PREMIUM ─── */}
            <header
                className={`fixed top-0 w-full z-[80] transition-all duration-500 ${
                    isScrolled
                        ? "bg-white/75 backdrop-blur-xl border-b border-slate-200/40 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.03)] py-3"
                        : transparent
                          ? "bg-transparent py-5"
                          : "bg-white border-b border-slate-100 py-4"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
                    {/* Logo Premium */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group transition-transform active:scale-98"
                    >
                        <div
                            className={`p-2 rounded-xl transition-all duration-300 ${
                                isScrolled || !transparent
                                    ? "bg-slate-950 text-amber-500"
                                    : "bg-white/10 text-white backdrop-blur-md"
                            }`}
                        >
                            <Car className="w-5 h-5 group-hover:rotate-[-4deg] transition-transform" />
                        </div>
                        <span
                            className={`text-xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                                isScrolled || !transparent
                                    ? "text-slate-950"
                                    : "text-white"
                            }`}
                        >
                            Teranga
                            <span className="text-amber-500 italic font-serif font-medium lowercase tracking-normal pl-0.5">
                                shuttle
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Link Effect */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-xs font-bold uppercase tracking-widest py-2 transition-all duration-300 hover:text-amber-500 ${
                                        active
                                            ? "text-amber-500"
                                            : isScrolled || !transparent
                                              ? "text-slate-600"
                                              : "text-white/80 hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                    {active && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-amber-500 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions d'authentification Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route("bookings.index")}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border active:scale-98 ${
                                        isScrolled || !transparent
                                            ? "bg-slate-950 hover:bg-slate-900 border-transparent text-white shadow-md shadow-slate-950/10"
                                            : "bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white hover:text-slate-950"
                                    }`}
                                >
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                    Mes réservations
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50/50 transition-all active:scale-95"
                                    title="Déconnexion"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-5">
                                <Link
                                    href={route("login")}
                                    className={`text-xs font-black uppercase tracking-wider transition-colors hover:text-amber-500 ${
                                        isScrolled || !transparent
                                            ? "text-slate-900"
                                            : "text-white"
                                    }`}
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-slate-950 hover:text-white transition-all duration-300 shadow-md shadow-amber-500/10 active:scale-98"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Déclencheur Mobile Menu */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`md:hidden p-2 rounded-xl transition-all active:scale-90 ${
                            isScrolled || !transparent
                                ? "text-slate-950 bg-slate-100"
                                : "text-white bg-white/10 backdrop-blur-md"
                        }`}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* ─── SIDEBAR SIDE DRAWER MOBILE ─── */}
            <div
                className={`fixed inset-0 z-[100] transition-all duration-500 ${
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Overlay flouté */}
                <div
                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <aside
                    className={`absolute right-0 top-0 h-full w-full sm:w-85 bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Header Drawer */}
                    <div className="p-5 flex justify-between items-center border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="bg-amber-500/10 p-1.5 rounded-lg text-amber-600">
                                <Car className="w-4 h-4" />
                            </div>
                            <span className="font-black text-sm uppercase tracking-wider text-slate-950">
                                Menu Teranga Shuttle
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all active:scale-90"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Liens Drawer */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navLinks.map((link) => {
                            const LinkIcon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                                        active
                                            ? "bg-amber-500/10 text-amber-600"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LinkIcon
                                        className={`w-4 h-4 ${active ? "text-amber-500" : "text-slate-400"}`}
                                    />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions Drawer Foot */}
                    <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route("bookings.index")}
                                    className="flex items-center justify-between w-full px-4 py-3.5 bg-slate-950 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-98 shadow-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" />
                                        Mes réservations
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-amber-500" />
                                </Link>
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center justify-between w-full px-4 py-3.5 bg-slate-950 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-98 shadow-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" />
                                        Mon profil
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-amber-500" />
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-bold text-red-600 border border-red-100 bg-red-50 rounded-xl transition-all active:scale-98"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Déconnexion
                                </Link>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href={route("login")}
                                    className="flex items-center justify-center py-3.5 font-bold text-xs uppercase tracking-wider border border-slate-200 text-slate-700 bg-white rounded-xl transition-all active:scale-98"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="flex items-center justify-center py-3.5 font-black text-xs uppercase tracking-wider bg-amber-500 text-slate-950 rounded-xl transition-all shadow-md shadow-amber-500/5 active:scale-98"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {/* ─── COMPOSANT ENFANT CONTENT ─── */}
            <main className="flex-grow">{children}</main>

            {/* ─── FOOTER LUXE MODERNE ─── */}
            <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 pb-12 border-b border-slate-900">
                        {/* Identité */}
                        <div className="md:col-span-4 space-y-4">
                            <div className="text-xl font-black uppercase tracking-tighter">
                                Teranga
                                <span className="text-amber-500 italic font-serif font-medium lowercase tracking-normal pl-0.5">
                                    shuttle
                                </span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                                L'excellence globale du transport VIP au
                                Sénégal. Voyagez en toute sérénité dans le
                                confort absolu de nos flottes premium.
                            </p>
                        </div>

                        {/* Liens Services */}
                        <div className="md:col-span-3 md:pl-8">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200 mb-4">
                                Services
                            </h4>
                            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                                {[
                                    "Transferts Aéroport",
                                    "Location Horaire",
                                    "Événements VIP",
                                    "Tourisme de Luxe",
                                ].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="hover:text-amber-500 transition-all inline-block hover:translate-x-0.5"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Liens Support */}
                        <div className="md:col-span-2">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200 mb-4">
                                Support
                            </h4>
                            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                                {[
                                    "Aide & FAQ",
                                    "Réservations",
                                    "Conditions Générales",
                                    "Confidentialité",
                                ].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="hover:text-amber-500 transition-all inline-block hover:translate-x-0.5"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contacts */}
                        <div className="md:col-span-3 space-y-3.5">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-200 mb-4">
                                Contact
                            </h4>
                            <ul className="space-y-3 text-xs text-slate-400 font-medium">
                                <li className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-lg bg-slate-900 text-amber-500">
                                        <Phone className="w-3.5 h-3.5" />
                                    </div>
                                    <span>+221 77 000 00 00</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-lg bg-slate-900 text-amber-500">
                                        <Mail className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="truncate">
                                        contact@teranga-shuttle.sn
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Mentions de fin */}
                    <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium text-slate-500">
                        <p>
                            © 2026 Teranga Shuttle Sénégal. Façonné avec soin.
                        </p>
                        <div className="flex gap-4 font-bold uppercase tracking-wider text-slate-600">
                            <span>Sénégal</span>
                            <span className="text-amber-500/40">•</span>
                            <span>Afrique</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ─── MENU FLOTTANT MULTI-ACTIONS (FAB VIP) ─── */}
            <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2.5 pm-safe">
                {/* Options sub-menu adaptatif */}
                <div
                    className={`flex flex-col gap-2.5 transition-all duration-300 origin-bottom transform ${
                        isFabOpen
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
                    }`}
                >
                    {/* Devis Capsule */}
                    <Link
                        href={route("devis.index")}
                        className="flex items-center gap-3 bg-white/90 backdrop-blur-md text-slate-900 pl-4 pr-2.5 py-1.5 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:bg-white hover:border-slate-300 transition-all font-bold text-xs group active:scale-95"
                        onClick={() => setIsFabOpen(false)}
                    >
                        <span className="text-slate-600 font-semibold group-hover:text-slate-900">
                            Demande de devis
                        </span>
                        <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                            <FileText className="w-3.5 h-3.5" />
                        </div>
                    </Link>

                    {/* WhatsApp Capsule */}
                    <a
                        href="https://wa.me/+41763233400"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white/90 backdrop-blur-md text-slate-900 pl-4 pr-2.5 py-1.5 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] border border-slate-200/50 hover:bg-white hover:border-slate-300 transition-all font-bold text-xs group active:scale-95"
                        onClick={() => setIsFabOpen(false)}
                    >
                        <span className="text-slate-600 font-semibold group-hover:text-slate-900">
                            WhatsApp VIP
                        </span>
                        <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </div>
                    </a>
                </div>

                {/* Bouton Maitre FAB */}
                <button
                    onClick={() => setIsFabOpen(!isFabOpen)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 active:scale-90 ${
                        isFabOpen
                            ? "bg-slate-950 text-white rotate-90 shadow-slate-950/20"
                            : "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20"
                    }`}
                    aria-label="Menu de contact"
                >
                    {isFabOpen ? (
                        <X className="w-4 h-4" />
                    ) : (
                        <MessageCircle className="w-4.5 h-4.5" />
                    )}
                </button>
            </div>

            {/* Toaster Notification Provider */}
            <Toaster position="top-right" richColors closeButton />
        </div>
    );
}
